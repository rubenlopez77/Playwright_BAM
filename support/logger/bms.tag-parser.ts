// support/logger/bms.tag-parser.ts
import { BamMetadata } from "./bms.types";

export class BmsTagParser {

  static fromTags(
    tags: string[] | undefined,
    scenarioName: string,
    feature?: string
  ): BamMetadata {

    const meta: BamMetadata = {
      id: scenarioName, // fallback si no hay @ID
      title: scenarioName,
      description: feature
        ? `Scenario "${scenarioName}" in feature "${feature}"`
        : `Scenario "${scenarioName}"`,
      requirements: [],
      userStories: [],
      acceptanceCriteria: [],
      preconditions: [],
      testData: [],
      labels: [],
    };

    if (!tags || tags.length === 0) {
      return meta;
    }

    for (const rawTag of tags) {
      // ej: "@ID=TC-001"  |  "@Title=\"Valid login\""
      const tag = rawTag.startsWith("@") ? rawTag.substring(1) : rawTag;
      const [keyRaw, ...rest] = tag.split("=");
      const key = keyRaw.trim().toUpperCase();
      const valueRaw = rest.join("=").trim();
      const value = valueRaw.replace(/^"|"$/g, ""); // quita comillas

      switch (true) {
        case key === "ID":
          meta.id = value;
          break;

        case key === "TITLE":
          meta.title = value;
          break;

        case key === "DESCRIPTION":
          meta.description = value;
          break;

        case key === "REQ":
          meta.requirements!.push(value);
          break;

        case key === "USR":
          meta.userStories!.push(value);
          break;

        case key.startsWith("AC"):
          meta.acceptanceCriteria!.push(value);
          break;

        case key === "PRIORITY":
          meta.priority = value as any;
          break;

        case key === "RISK":
          meta.risk = value as any;
          break;

        case key === "BUSINESS":
          meta.businessImpact = value as any;
          break;

        case key === "PRE":
          meta.preconditions!.push(value);
          break;

        case key === "DATA":
        meta.testData!.push(value);
        break;

        case key === "COMPONENT":
          meta.component = value;
          break;

        case key === "MODULE":
          meta.module = value;
          break;

        case key === "OWNER":
          meta.owner = value;
          break;

        case key === "LABEL":
          meta.labels!.push(value);
          break;

        default:
          // Ignoramos por ahora ENV, BROWSER, SEVERITY aquí.
          break;
      }
    }

    return meta;
  }
}
