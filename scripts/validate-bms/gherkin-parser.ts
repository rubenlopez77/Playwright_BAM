// scripts/validate-bms/gherkin-parser.ts
import fs from "node:fs";
import { FeatureDocument, ScenarioTagMap } from "./types";

// ------------------------------------------------------------
// Loads the file as text
// ------------------------------------------------------------
export function loadFeature(path: string): string {
  return fs.readFileSync(path, "utf8");
}

// ------------------------------------------------------------
// Parse feature by reading line-by-line
// Extract:
//   - Scenario names
//   - Their tags (raw @XYZ=value)
// ------------------------------------------------------------
export function parseFeature(path: string): FeatureDocument {
  const content = loadFeature(path);
  const lines = content.split(/\r?\n/);

  const scenarios: FeatureDocument["scenarios"] = [];

  let pendingTags: ScenarioTagMap = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // -----------------------------
    // Read tags
    // -----------------------------
    if (line.startsWith("@")) {
      const tagList = line.split(/\s+/);

      for (const raw of tagList) {
        const tag = raw.replace(/^@/, "");

        // @Key=Value or @Key
        const [k, v] = tag.split("=", 2);
        pendingTags[k] = v ?? "";
      }

      continue;
    }

    // -----------------------------
    // Detect Scenario
    // -----------------------------
    if (/^Scenario:/i.test(line)) {
      const name = line.replace(/^Scenario:\s*/i, "").trim();

      scenarios.push({
        name,
        line: i + 1,
        tags: { ...pendingTags }
      });

      // clear tag buffer for next scenario
      pendingTags = {};
    }
  }

  return {
    uri: path,
    scenarios
  };
}
