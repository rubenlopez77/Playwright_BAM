// support/logger/bam.tracer.types.ts

// ============================================================================
// EVENT TYPES
// ============================================================================

export interface BaseEvent {
  timestamp: string;
  browser: string;
  worker: number;
  type: string;
}

export interface ScenarioStartEvent extends BaseEvent {
  type: "scenario-start";
  scenario: string;
  feature?: string;
  tags?: string[];
}

export interface ScenarioEndEvent extends BaseEvent {
  type: "scenario-end";
  scenario: string;
  status: string;
}

export interface StepEvent extends BaseEvent {
  type: "step";
  text: string;
  status: string;
}

export interface ComponentEvent extends BaseEvent {
  type: "component";
  component: string;
  action: string;
  selector: string;
  duration: number;
  success: boolean;
}

export type BamEvent =
  | ScenarioStartEvent
  | ScenarioEndEvent
  | StepEvent
  | ComponentEvent;

// ============================================================================
// METADATA
// ============================================================================

export interface BamMetadata {
  id?: string;
  title?: string;
  description?: string;

  requirements?: string[];
  userStories?: string[];

  acceptanceCriteria?: string[];
  preconditions?: string[];
  postconditions?: string[];

  testOracle?: string;
  testCaseObjective?: string;
  expectedResults?: string[];

  testConditions?: string[];
  testLevel?: string;
  testType?: string;

  testData?: string[];
  resolvedTestData?: Record<string, any>[];

  component?: string;
  module?: string;

  priority?: string;
  risk?: string;
  businessImpact?: string;

  labels?: string[];
  owner?: string;
}

// ============================================================================
// EXECUTION
// ============================================================================

export interface BamExecution {
  browser: string;
  worker: number;
  status: "PASSED" | "FAILED" | "SKIPPED" | "UNKNOWN";
  startTime: string;
  endTime: string;
  durationMs: number;
}

// ============================================================================
// STEPS and ACTIONS
// ============================================================================

export interface BamStep {
  text: string;
  status: string;
  timestamp: string;
}

export interface BamAction {
  component: string;
  action: string;
  selector: string;
  duration: number;
  success: boolean;
  timestamp: string;
  boundStep?: string;
}

// ============================================================================
// TEST SESSION / GOVERNANCE
// ============================================================================

export interface BamTestSession {
  testPlan?: string;
  testCycle?: string;
  testRun?: string;
  tester?: string;
  executionEnvironment?: string;
}

// ============================================================================
// METRICS
// ============================================================================

export interface BamPerformanceMetrics {
  totalDurationMs: number;
  avgActionDurationMs: number;
}

export interface BamEfficiencyMetrics {
  actionsCount: number;
  stepsCount: number;
}

export interface BamMaintainabilityMetrics {
  componentsUsed: string[];
}

export interface BamReliabilityMetrics {
  status: string;
  failRate: number;
}

export interface BamFunctionalSuitabilityMetrics {
  requirementsCovered?: string[];
  acCovered?: number;

  coverageContext?: {
    acTotal?: number;
    acCovered?: number;
    acCoveragePercentage?: number;
  };
}

export interface BamMetrics {
  performance?: BamPerformanceMetrics;
  efficiency?: BamEfficiencyMetrics;
  maintainability?: BamMaintainabilityMetrics;
  reliability?: BamReliabilityMetrics;
  functionalSuitability?: BamFunctionalSuitabilityMetrics;
}

// ============================================================================
// FINAL REPORT TYPE
// ============================================================================

export interface BamExecutionReport {
  testSession?: BamTestSession;
  metadata: BamMetadata;
  execution: BamExecution;
  steps: BamStep[];
  actions: BamAction[];
  metrics?: BamMetrics;
}
