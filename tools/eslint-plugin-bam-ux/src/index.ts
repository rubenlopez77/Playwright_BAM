import type { Rule } from "eslint";
import uxmapValid from "./rules/uxmap-valid";
import testEnforcePattern from "./rules/test-enforce-pattern";

/**
 * 🧩 Plugin BAM-UX
 * Exporta las reglas para ESLint (Flat Config compatible)
 */
export const rules: Record<string, Rule.RuleModule> = {
  "uxmap-valid": uxmapValid,
  "test-enforce-pattern": testEnforcePattern,
};
