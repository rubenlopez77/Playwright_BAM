// support/logger/bms.types.ts

export type BamStatus = "PASSED" | "FAILED" | "SKIPPED" | "UNKNOWN";

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
  id: string;                // @ID=TC-001
  title: string;             // @Title="..."
  description: string;       // @Description="..."

  requirements?: string[];   // @REQ=...
  userStories?: string[];    // @USR=...
  acceptanceCriteria?: string[]; // @AC1=..., @AC2=...

  priority?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";  // @PRIORITY
  risk?: "LOW" | "MEDIUM" | "HIGH";                   // @RISK
  businessImpact?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"; // @BUSINESS

  preconditions?: string[];  // @PRE
  testData?: string[];          // identificadores, p.e.: ["credentials.invalid"]
  
  resolvedTestData?: Record<string, any>[]; // Data resolved from identifiers (e.g. credentials.invalid → { username, pass }) 
  component?: string;        // @COMPONENT
  module?: string;           // @MODULE
  labels?: string[];         // @LABEL
  owner?: string;            // @OWNER
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
  keyword?: string;   // Given/When/Then/And... (por ahora lo dejamos opcional)
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
  boundStep?: string;  // futuro: enlace acción-step
}

export type BamEvidenceType = "screenshot" | "video" | "log" | "trace" | "custom";

export interface BamEvidence {
  type: BamEvidenceType;
  name: string;
  path: string;
}

export type BamSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | "BLOCKER";
export type BamReproducibility = "ALWAYS" | "SOMETIMES" | "RARE" | "UNKNOWN";

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
  status?: string;   // texto libre, p.e. "STABLE"
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

