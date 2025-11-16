// scripts/validate-bms/rules.ts

import { ParsedGherkin, ValidationError, ValidationResult } from "./types";

const ALLOWED_PRIORITY = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
const ALLOWED_RISK = ["LOW", "MEDIUM", "HIGH"];
const ALLOWED_TESTLEVEL = ["UNIT", "INTEGRATION", "SYSTEM", "ACCEPTANCE"];
const ALLOWED_TESTTYPE = ["FUNCTIONAL", "NON_FUNCTIONAL", "SECURITY", "USABILITY"];

export function validateFeatureTags(doc: ParsedGherkin, file: string): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  for (const scenario of doc.scenarios) {
    const tags = scenario.tags;

    // ------------------------------------------------------
    // REQUIRED: @ID
    // ------------------------------------------------------
    if (!tags["ID"]) {
      errors.push({
        file,
        line: scenario.line,
        message: `Scenario "${scenario.name}" is missing required tag @ID`,
      });
    } else {
      // validate no spaces
      if (/\s/.test(tags["ID"] as string)) {
        errors.push({
          file,
          line: scenario.line,
          message: `@ID value "${tags["ID"]}" cannot contain spaces`,
        });
      }
    }

    // ------------------------------------------------------
    // REQUIRED: @TITLE
    // ------------------------------------------------------
    if (!tags["TITLE"]) {
      errors.push({
        file,
        line: scenario.line,
        message: `Scenario "${scenario.name}" is missing required tag @Title`,
      });
    } else if (/\s/.test(tags["TITLE"] as string)) {
      errors.push({
        file,
        line: scenario.line,
        message: `Tag @Title has whitespace in value "${tags["TITLE"]}". Use underscores instead of spaces.`,
      });
    }

    // ------------------------------------------------------
    // CHECK ACCEPTANCE CRITERIA
    // ------------------------------------------------------
    if (!tags["ACCEPTANCECRITERIA"]) {
      warnings.push({
        file,
        line: scenario.line,
        message: `Scenario "${scenario.name}" has no Acceptance Criteria (@AC1, @AC2...)`,
      });
    }

    // ------------------------------------------------------
    // PRIORITY
    // ------------------------------------------------------
    if (tags["PRIORITY"]) {
      const v = String(tags["PRIORITY"]).toUpperCase();
      if (!ALLOWED_PRIORITY.includes(v)) {
        errors.push({
          file,
          line: scenario.line,
          message: `@PRIORITY=${v} is not valid. Allowed: ${ALLOWED_PRIORITY.join(", ")}`,
        });
      }
    }

    // ------------------------------------------------------
    // RISK
    // ------------------------------------------------------
    if (tags["RISK"]) {
      const v = String(tags["RISK"]).toUpperCase();
      if (!ALLOWED_RISK.includes(v)) {
        errors.push({
          file,
          line: scenario.line,
          message: `@RISK=${v} is not valid. Allowed: ${ALLOWED_RISK.join(", ")}`,
        });
      }
    }

    // ------------------------------------------------------
    // TEST LEVEL
    // ------------------------------------------------------
    if (tags["LEVEL"]) {
      const v = String(tags["LEVEL"]).toUpperCase();
      if (!ALLOWED_TESTLEVEL.includes(v)) {
        errors.push({
          file,
          line: scenario.line,
          message: `@Level=${v} is not valid. Allowed: ${ALLOWED_TESTLEVEL.join(", ")}`,
        });
      }
    }

    // ------------------------------------------------------
    // TEST TYPE
    // ------------------------------------------------------
    if (tags["TYPE"]) {
      const v = String(tags["TYPE"]).toUpperCase();
      if (!ALLOWED_TESTTYPE.includes(v)) {
        errors.push({
          file,
          line: scenario.line,
          message: `@Type=${v} is not valid. Allowed: ${ALLOWED_TESTTYPE.join(", ")}`,
        });
      }
    }

    // ------------------------------------------------------
    // DATA FORMAT CHECK
    // ------------------------------------------------------
    if (tags["DATA"]) {
      const v = String(tags["DATA"]);
      if (!/^[a-zA-Z0-9_.-]+\.[a-zA-Z0-9_.-]+$/.test(v)) {
        errors.push({
          file,
          line: scenario.line,
          message: `@Data=${v} must follow "source.key" format (example: credentials.invalid)`,
        });
      }
    }

    // ------------------------------------------------------
    // DESCRIPTION WARNING
    // ------------------------------------------------------
    if (!tags["DESCRIPTION"]) {
      warnings.push({
        file,
        line: scenario.line,
        message: `Scenario "${scenario.name}" missing @Description`,
      });
    }
  }

  return { errors, warnings };
}
