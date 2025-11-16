// support/logger/bms.tag-parser.ts
import {
  BamMetadata,
  BamTestDesign,
  BamTestLevel,
  BamTestType
} from "./bms.types";

export class BmsTagParser {

  static fromTags(
    tags: string[] | undefined,
    scenarioName: string,
    feature?: string
  ): BamMetadata {

    const metadata: BamMetadata = {
      id: scenarioName,
      title: scenarioName,
      description: feature
        ? `Scenario "${scenarioName}" in feature "${feature}"`
        : `Scenario "${scenarioName}"`,

      requirements: [],
      userStories: [],
      acceptanceCriteria: [],

      preconditions: [],
      postconditions: [],
      testConditions: [],
      testData: [],
      labels: [],
    };

    if (!tags || tags.length === 0) {
      return metadata;
    }

    for (const rawTag of tags) {
      const raw = rawTag.startsWith("@") ? rawTag.slice(1) : rawTag;
      if (!raw) continue;

      const sepIndexEq = raw.indexOf("=");
      const sepIndexColon = raw.indexOf(":");
      let sepIndex = -1;

      if (sepIndexEq !== -1 && sepIndexColon !== -1) {
        sepIndex = Math.min(sepIndexEq, sepIndexColon);
      } else if (sepIndexEq !== -1) {
        sepIndex = sepIndexEq;
      } else if (sepIndexColon !== -1) {
        sepIndex = sepIndexColon;
      }

      // Tag sin valor → label libre
      if (sepIndex === -1) {
        metadata.labels!.push(raw);
        continue;
      }

      const keyRaw = raw.slice(0, sepIndex).trim();
      let value = raw.slice(sepIndex + 1).trim();
      if (!keyRaw) continue;

      // Quitar comillas externas si existen
      if (value.startsWith('"') && value.endsWith('"') && value.length > 1) {
        value = value.slice(1, -1);
      }

      const key = keyRaw.toUpperCase();

      switch (true) {
        case key === "ID":
          metadata.id = value;
          break;

        case key === "TITLE":
          metadata.title = this.normalizeText(value);
          break;

        case key === "DESCRIPTION":
          metadata.description = this.normalizeText(value);
          break;

        case key === "REQ":
          metadata.requirements.push(value);
          break;

        case key === "US":
        case key === "USR":
          metadata.userStories.push(value);
          break;

        case key.startsWith("AC"):
          metadata.acceptanceCriteria.push(this.normalizeText(value));
          break;

        case key === "PRIORITY":
          metadata.priority = value.toUpperCase() as any;
          break;

        case key === "RISK":
          metadata.risk = value.toUpperCase() as any;
          break;

        case key === "BUSINESS":
          metadata.businessImpact = value.toUpperCase() as any;
          break;

        case key === "PRE":
          metadata.preconditions!.push(this.normalizeText(value));
          break;

        case key === "POST":
          metadata.postconditions!.push(this.normalizeText(value));
          break;

        case key === "DATA":
          metadata.testData!.push(value);
          break;

        case key === "COMPONENT":
          metadata.component = value;
          break;

        case key === "MODULE":
          metadata.module = value;
          break;

        case key === "OWNER":
          metadata.owner = value;
          break;

        case key === "LABEL":
          metadata.labels!.push(value);
          break;

        case key === "LEVEL":
          metadata.testLevel = value.toUpperCase() as BamTestLevel;
          break;

        case key === "TYPE":
          metadata.testType = value.toUpperCase() as BamTestType;
          break;

        case key === "TESTTECHNIQUE":
        case key === "TECHNIQUE":
          metadata.testTechnique = value.toUpperCase();
          break;

        case key === "DESIGNTECHNIQUE": {
          const design: BamTestDesign = metadata.testDesign ?? {};
          design.technique = value.toUpperCase();
          metadata.testDesign = design;
          break;
        }

        case key === "COVERAGE": {
          const design: BamTestDesign = metadata.testDesign ?? {};
          design.coverage = value.toUpperCase();
          metadata.testDesign = design;
          break;
        }

        case key === "OBJECTIVE":
          metadata.testCaseObjective = this.normalizeText(value);
          break;

        case key === "ORACLE":
          metadata.testOracle = this.normalizeText(value);
          break;

        case key === "EXPECTED" || key.startsWith("EXPECTED"):
        
        case key.startsWith("EXP"):
        {
          if (!metadata.expectedResults) {
            metadata.expectedResults = [];
          }
          metadata.expectedResults.push(this.normalizeText(value));
          break;
}
        case key === "CONDITIONS":
        case key === "TESTCONDITIONS":
          metadata.testConditions!.push(this.normalizeText(value));
          break;

        case key === "INCIDENTTEMPLATE":
          metadata.incidentTemplate = value;
          break;

        case key === "SEVERITYLEVELS":
          metadata.incidentSeverityLevels = value
            .split(",")
            .map((v) => v.trim().toUpperCase())
            .filter(Boolean);
          break;

        default:
          // Otros tags no BMS → labels libres (ej: @SMOKE, @REGRESSION)
          metadata.labels!.push(raw);
          break;
      }
    }

    return metadata;
  }

  /**
   * Convierte "Login_fails_with_invalid_credentials"
   * → "Login fails with invalid credentials"
   */
  private static normalizeText(value: string): string {
    if (!value) return value;
    const spaced = value.replace(/[_-]+/g, " ").trim();
    if (!spaced) return value;
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
  }
}
