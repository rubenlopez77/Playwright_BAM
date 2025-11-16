// scripts/validate-bms/types.ts

export interface ValidationError {
  file: string;
  line: number;
  message: string;
}

export interface ValidationResult {
  errors: ValidationError[];
  warnings: ValidationError[];
}

export interface ParsedGherkin {
  file: string;
  featureName: string;
  scenarios: ParsedScenario[];
}

export interface ParsedScenario {
  name: string;
  line: number;
  tags: Record<string, string | string[]>;
}
