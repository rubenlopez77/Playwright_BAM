import type { Rule } from "eslint";

/**
 * Rule: uxmap-valid
 * Valida que los archivos *.ux.ts exporten un objeto válido de mapeo de UI.
 */

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description: "Valida que los UX Maps tengan un formato correcto.",
      recommended: false,
    },
    messages: {
      invalidUx: "El archivo UX Map debe exportar un objeto constante llamado LoginLocators o similar.",
    },
    schema: [],
  },

  create(context) {
    return {
      Program(node) {
        const hasExport =
          node.body?.some(
            (n: any) =>
              n.type === "ExportNamedDeclaration" &&
              n.declaration?.declarations?.some(
                (d: any) =>
                  d.id?.name?.endsWith("Locators") ||
                  d.id?.name?.endsWith("Map")
              )
          ) ?? false;

        if (!hasExport)
          context.report({ node, messageId: "invalidUx" });
      },
    };
  },
};

export default rule;
