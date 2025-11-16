// support/logger/bms.types.ts

export type BamStatus = "PASSED" | "FAILED" | "SKIPPED" | "UNKNOWN";

export type BamPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type BamRisk = "LOW" | "MEDIUM" | "HIGH";
export type BamBusinessImpact = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type BamSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | "BLOCKER";
export type BamReproducibility = "ALWAYS" | "SOMETIMES" | "RARE" | "UNKNOWN";

export type BamTestLevel = "UNIT" | "INTEGRATION" | "SYSTEM" | "ACCEPTANCE";
export type BamTestType =
  | "FUNCTIONAL"
  | "NON_FUNCTIONAL"
  | "SECURITY"
  | "USABILITY"
  | "PERFORMANCE";

export interface BamTestDesign {
  technique?: string;
  coverage?: string;
}

export interface BamResolvedTestDataEntry {
  parameter: string;
  value: unknown;
  source: string;   // p.ej. "credentials.invalid"
  masked: boolean;  // true para password/token/etc.
}

export interface BamTestSession {
  testPlan?: string;
  testCycle?: string;
  testRun?: string;
  tester?: string;
  executionEnvironment?: string;
  startTime?: string; // ISO
  endTime?: string;   // ISO
}

export interface BamMetadata {
  id: string;
  title: string;
  description: string;

  requirements: string[];
  userStories: string[];
  acceptanceCriteria: string[];

  priority?: BamPriority;
  risk?: BamRisk;
  businessImpact?: BamBusinessImpact;

  preconditions?: string[];
  postconditions?: string[];

  testData?: string[];
  resolvedTestData?: BamResolvedTestDataEntry[];

  component?: string;
  module?: string;
  labels?: string[];
  owner?: string;

  // IEEE 29119-3 / ISTQB
  testOracle?: string;
  testConditions?: string[];
  testCaseObjective?: string;

  testLevel?: BamTestLevel;
  testType?: BamTestType;
  testTechnique?: string;
  testDesign?: BamTestDesign;

  // Incident reporting / IEEE 29119
  incidentTemplate?: string;
  incidentSeverityLevels?: string[];
}

export interface BamExecution {
  browser: string;
  worker: number;
  status: BamStatus;
  startTime: string;  // ISO
  endTime: string;    // ISO
  durationMs: number;
}

export interface BamStep {
  keyword?: string;   // Given/When/Then/And/But (futuro)
  text: string;
  status: BamStatus;
  timestamp: string;  // ISO
}

export interface BamAction {
  component: string;
  action: string;
  selector: string;
  duration: number;
  success: boolean;
  timestamp: string;   // ISO
  boundStep?: string;
}

export type BamEvidenceType = "screenshot" | "video" | "log" | "trace" | "custom";

export interface BamEvidence {
  type: BamEvidenceType;
  name: string;
  path: string;
}

export interface BamDefectRef {
  defectId: string;
  defectStatus: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  severity: BamSeverity;
  reproducibility: BamReproducibility;
}

export interface BamIncident {
  step: string;
  expected: string;
  actual: string;
  errorMessage: string;
  timestamp: string;  // ISO
  severity: BamSeverity;
  reproducibility: BamReproducibility;
  defect?: BamDefectRef;
}

export interface BamPerformanceMetrics {
  totalDurationMs?: number;
  avgActionDurationMs?: number;
}

export interface BamReliabilityMetrics {
  status?: string;   // "STABLE" / "UNSTABLE"...
  failRate?: number; // 0..1
}

export interface BamEfficiencyMetrics {
  actionsCount?: number;
  stepsCount?: number;
}

export interface BamMaintainabilityMetrics {
  componentsUsed?: string[];
}

export interface BamFunctionalSuitabilityMetrics {
  requirementsCovered?: string[];
  acCovered?: number;
}

export interface BamMetrics {
  performance?: BamPerformanceMetrics;
  reliability?: BamReliabilityMetrics;
  efficiency?: BamEfficiencyMetrics;
  maintainability?: BamMaintainabilityMetrics;
  functionalSuitability?: BamFunctionalSuitabilityMetrics;
}

export interface BamExecutionReport {
  testSession?: BamTestSession;
  metadata: BamMetadata;
  execution: BamExecution;
  steps: BamStep[];
  actions: BamAction[];
  evidences?: BamEvidence[];
  incidents?: BamIncident[];
  metrics?: BamMetrics;
}
