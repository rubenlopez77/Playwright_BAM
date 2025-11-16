// scripts/validate-bms/types.ts

export interface ScenarioTagMap {
  [key: string]: string | undefined;
}

export interface ParsedScenario {
  name: string;
  line: number;
  tags: ScenarioTagMap;
}

export interface FeatureDocument {
  uri: string;
  scenarios: ParsedScenario[];
}

export interface ValidationError {
  type: string;
  message: string;
  line: number;
}
