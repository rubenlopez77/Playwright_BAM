import type { Rule } from "eslint";

/**
 * BAM Rule: test-enforce-pattern
 * Enforce Declarative Pattern y prohíbe el uso de 'await' en steps.
 * Compatible con Gherkin (Given/When/Then) y Jest (test/it/scenario)
 */

const STEP_KEYWORDS = [
  "test",
  "it",
  "scenario",
  "Given",
  "When",
  "Then",
  "And",
  "But",
] as const;

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


 // Extrae el cuerpo de la función callback si es Arrow o FunctionExpression.
 
function extractFunctionBody(callback: any): any[] {
  if (!callback) return [];
  if (
    callback.type !== "ArrowFunctionExpression" &&
    callback.type !== "FunctionExpression"
  )
    return [];
  return callback.body?.type === "BlockStatement" ? callback.body.body : [];
}


// Valida que el primer statement siga el patrón BAM: const <user> = this.getPage(Clase);
function validateFirstStatement(
  context: any,
  node: any,
  first: any
): string | null {
  if (
    first?.type === "VariableDeclaration" &&
    first.kind === "const" &&
    first.declarations?.length === 1 &&
    isGetPageCall(first.declarations[0].init)
  ) {
    const id = first.declarations[0].id;
    return id?.type === "Identifier" ? id.name : "user";
  }
  context.report({ node: first ?? node, messageId: "firstStmtPattern" });
  return null;
}

 // Busca awaits.
function containsAwaitExpression(node: any): boolean {
  if (!node || typeof node !== "object") return false;
  if (node.type === "AwaitExpression") return true;
  return Object.values(node).some((child) =>
    Array.isArray(child)
      ? child.some((c) => containsAwaitExpression(c))
      : containsAwaitExpression(child)
  );
}


 // Regla principal: test-enforce-pattern

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "BAM declarative test pattern enforcement.",
      recommended: false,
    },
    messages: {
      firstStmtPattern:
        "El primer statement debe ser const <var> = this.getPage(Clase);",
      onlyUserCalls:
        "Solo se permiten user.metodo() o expect() después de obtener la página.",
      noAwait:
        "No se permite el uso de 'await' en tests declarativos BAM. Las acciones se gestionan en el Runner.",
    },
    schema: [],
  },

  create(context) {
    return {
      CallExpression(node) {
        if (
        node.callee?.type !== "Identifier" ||
        !STEP_KEYWORDS.includes(node.callee.name as (typeof STEP_KEYWORDS)[number])
         )
        return;

        const callback = node.arguments?.[1];
        const body = extractFunctionBody(callback);
        if (!body.length) return;

        const first = body[0];
        const userVar = validateFirstStatement(context, node, first) ?? "user";

        for (const stmt of body.slice(1)) {
          // Prohíbe cualquier Await
          if (containsAwaitExpression(stmt)) {
            context.report({ node: stmt, messageId: "noAwait" });
            continue;
          }

          if (stmt.type !== "ExpressionStatement") {
            context.report({ node: stmt, messageId: "onlyUserCalls" });
            continue;
          }

          const expr = stmt.expression;
          const isUserCall =
            expr?.type === "CallExpression" &&
            expr.callee?.type === "MemberExpression" &&
            expr.callee.object?.type === "Identifier" &&
            expr.callee.object.name === userVar;

          if (isUserCall || isExpectCall(expr)) continue;

          context.report({ node: stmt, messageId: "onlyUserCalls" });
        }
      },
    };
  },
};

export default rule;
