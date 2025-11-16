// scripts/validate-bms/gherkin-parser.ts

import { ParsedGherkin, ParsedScenario } from "./types";

/**
 * Parser ligero de Gherkin para BMS:
 * - Lee Feature, Scenarios y Tags
 * - NO depende de @cucumber/gherkin
 * - Devuelve un AST simplificado para el validador
 */
export function parseGherkinDocument(content: string, file: string): ParsedGherkin {
  const lines = content.split(/\r?\n/);

  let featureName = "";
  const scenarios: ParsedScenario[] = [];
  let pendingTagTokens: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    // Feature
    if (line.toLowerCase().startsWith("feature:")) {
      featureName = line.split(":").slice(1).join(":").trim();
      // descartamos tags anteriores como tags de feature (de momento BMS trabaja a nivel de escenario)
      pendingTagTokens = [];
      continue;
    }

    // Línea de tags (puede tener varios)
    if (line.startsWith("@")) {
      const tokens = line
        .split(/\s+/)
        .filter((t) => t.startsWith("@") && t.length > 1);
      pendingTagTokens.push(...tokens);
      continue;
    }

    // Scenario / Scenario Outline
    const lower = line.toLowerCase();
    if (lower.startsWith("scenario:") || lower.startsWith("scenario outline:")) {
      const name = line.split(":").slice(1).join(":").trim();
      const tags = buildTagsRecord(pendingTagTokens);
      const lineNumber = i + 1;

      scenarios.push({
        name,
        line: lineNumber,
        tags,
      });

      pendingTagTokens = [];
      continue;
    }

    // Cualquier otra línea: no nos afecta a BMS; si había tags pendientes,
    // los mantenemos hasta ver el siguiente Scenario/Scenario Outline.
  }

  return {
    file,
    featureName,
    scenarios,
  };
}

// ------------------------------------------------------------
// TAG PARSER
// ------------------------------------------------------------
function buildTagsRecord(tagTokens: string[]): Record<string, string | string[]> {
  const tags: Record<string, string | string[]> = {};

  for (const token of tagTokens) {
    const name = token.replace(/^@/, "").trim();
    if (!name) continue;

    const eqIndex = name.indexOf("=");
    const colonIndex = name.indexOf(":");
    let sepIndex = -1;

    if (eqIndex !== -1 && colonIndex !== -1) {
      sepIndex = Math.min(eqIndex, colonIndex);
    } else if (eqIndex !== -1) {
      sepIndex = eqIndex;
    } else if (colonIndex !== -1) {
      sepIndex = colonIndex;
    }

    // Tag sin valor → label
    if (sepIndex === -1) {
      tags[name.toUpperCase()] = "true";
      continue;
    }

    const keyRaw = name.slice(0, sepIndex).trim();
    const value = name.slice(sepIndex + 1).trim();
    if (!keyRaw) continue;

    const key = keyRaw.toUpperCase();

    // AC1, AC2, AC3… → ACCEPTANCECRITERIA[]
    if (/^AC\d+$/i.test(key)) {
      if (!tags["ACCEPTANCECRITERIA"]) {
        tags["ACCEPTANCECRITERIA"] = [];
      }
      (tags["ACCEPTANCECRITERIA"] as string[]).push(value);
      continue;
    }

    tags[key] = value;
  }

  return tags;
}
