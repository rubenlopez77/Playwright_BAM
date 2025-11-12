"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 🧩 Rule: uxmap-valid
 * Valida que los archivos *.ux.ts exporten un objeto válido de mapeo de UI.
 */
const rule = {
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
                const hasExport = node.body?.some((n) => n.type === "ExportNamedDeclaration" &&
                    n.declaration?.declarations?.some((d) => d.id?.name?.endsWith("Locators") ||
                        d.id?.name?.endsWith("Map"))) ?? false;
                if (!hasExport)
                    context.report({ node, messageId: "invalidUx" });
            },
        };
    },
};
exports.default = rule;
