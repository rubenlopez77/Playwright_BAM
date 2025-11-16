// scripts/validate-bms/rules.ts
import { FeatureDocument, ValidationError } from "./types";

// ------------------------------------------------------------
// Anti-ReDoS DATA tag validator (deterministic, safe)
// ------------------------------------------------------------
function isSafeDataTag(v: string): boolean {
  if (!v.includes(".")) return false;

  const [left, right] = v.split(".");
  if (!left || !right) return false;

  // Allowed characters: A-Z a-z 0-9 _ -
  const SAFE = /^[A-Za-z0-9_-]+$/u;

  return SAFE.test(left) && SAFE.test(right);
}

// ------------------------------------------------------------
// Required BMS tags
// ------------------------------------------------------------
const REQUIRED_SCENARIO_TAGS = ["ID", "Title"];

// ------------------------------------------------------------
// Validate a full feature
// ------------------------------------------------------------
export function validateFeatureTags(doc: FeatureDocument): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const scenario of doc.scenarios) {
    const { name, tags, line } = scenario;

    // 1. Required tag validation
    for (const req of REQUIRED_SCENARIO_TAGS) {
      if (!tags[req]) {
        errors.push({
          type: "MISSING_TAG",
          message: `Scenario "${name}" is missing required tag @${req}`,
          line
        });
      }
    }

    // 2. DATA tag validation (secure)
    if (tags["DATA"]) {
      const v = String(tags["DATA"]);
      if (!isSafeDataTag(v)) {
        errors.push({
          type: "INVALID_DATA_TAG",
          message: `@DATA value '${v}' must follow safe pattern <repo>.<key> (letters, digits, _ and - only).`,
          line
        });
      }
    }

    // 3. Oracle: recommended but not mandatory
    if (!tags["AC1"] && !tags["AC2"]) {
      errors.push({
        type: "MISSING_ORACLE",
        message: `Scenario "${name}" has no acceptance criteria. Add @AC1= or @AC2= for better IEEE 29119 compliance.`,
        line
      });
    }
  }

  return errors;
}
