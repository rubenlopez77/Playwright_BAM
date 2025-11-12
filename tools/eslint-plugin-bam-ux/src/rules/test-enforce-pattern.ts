
import type { Rule } from "eslint";

/**
 * Rule: test-enforce-pattern (BAM v1.9 - modo exhaustivo)
 * Enforce Declarative Pattern y reporta múltiples errores en un solo step.
 * Compatible con Gherkin (Given/When/Then) y Jest (test/it/scenario)
 */

const STEP_KEYWORDS = ["test", "it", "scenario", "Given", "When", "Then", "And", "But"];

const isIdentifier = (node: any, name?: string) =>
  node?.type === "Identifier" && (!name || node.name === name);

const isGetPageCall = (node: any) =>
  node?.type === "CallExpression" &&
  node.callee?.type === "MemberExpression" &&
  node.callee.object?.type === "ThisExpression" &&
  isIdentifier(node.callee.property, "getPage");

const isExpectCall = (node: any) =>
  node?.type === "CallExpression" &&
  (isIdentifier(node.callee, "expect") ||
    (node.callee?.type === "MemberExpression" &&
      node.callee.object?.type === "CallExpression" &&
      isIdentifier(node.callee.object?.callee, "expect")));

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "BAM declarative test pattern enforcement (modo exhaustivo).",
      recommended: false,
    },
    messages: {
      firstStmtPattern:
        "El primer statement debe ser const <var> = this.getPage(Clase);",
      onlyUserCalls:
        "Solo se permiten user.metodo() o expect() después de obtener la página.",
    },
    schema: [],
  },

  create(context) {
    return {
      CallExpression(node) {
        // ✅ Detecta test(), it(), scenario(), Given(), When(), Then(), etc.
        if (
          node.callee?.type !== "Identifier" ||
          !STEP_KEYWORDS.includes(node.callee.name)
        )
          return;

        // 🔹 Captura la función del step (callback)
        const callback = node.arguments?.[1];
        if (
          !callback ||
          (callback.type !== "ArrowFunctionExpression" &&
            callback.type !== "FunctionExpression")
        )
          return;

        // 🔹 Extrae el cuerpo de la función
        const body =
          callback.body?.type === "BlockStatement"
            ? callback.body.body
            : [];
        if (!body.length) return;

        let validFirstStatement = false;
        let userVar = "user";

        // 🔹 Primer statement: const user = this.getPage(Clase);
        const first = body[0];
        if (
          first?.type === "VariableDeclaration" &&
          first.kind === "const" &&
          first.declarations?.length === 1 &&
          isGetPageCall(first.declarations[0].init)
        ) {
          const id = first.declarations[0].id;
          if (id?.type === "Identifier") {
            userVar = id.name;
          }
          validFirstStatement = true;
        } else {
          context.report({ node: first ?? node, messageId: "firstStmtPattern" });
        }

        // 🔹 Valida el resto del cuerpo (aunque falle el primero)
        for (let i = 1; i < body.length; i++) {
          const stmt = body[i];

          if (stmt.type !== "ExpressionStatement") {
            context.report({ node: stmt, messageId: "onlyUserCalls" });
            continue;
          }

          const expr = stmt.expression;
          if (
            expr?.type === "CallExpression" &&
            expr.callee?.type === "MemberExpression" &&
            expr.callee.object?.type === "Identifier" &&
            expr.callee.object.name === userVar
          ) {
            continue; // ✅ permitido: user.metodo()
          }

          if (isExpectCall(expr)) continue; // ✅ permitido: expect()

          // ❌ Cualquier otra cosa es una infracción
          context.report({ node: stmt, messageId: "onlyUserCalls" });
        }
      },
    };
  },
};

export default rule;
