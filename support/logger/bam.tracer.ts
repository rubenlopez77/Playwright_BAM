// support/logger/bam.tracer.ts
import fs from "node:fs/promises";
import { IBamTracer } from "./bam.tracer.types";

import {
  BamAction,
  BamExecution,
  BamExecutionReport,
  BamMetadata,
  BamMetrics,
  BamStatus,
  BamStep
} from "./bms.types";

import { BmsTagParser } from "./bms.tag-parser";
import { TestDataRepository } from "../testdata.repository";

// ============================================================
// EVENT TYPES
// ============================================================

type BamEventType = "component" | "scenario-start" | "scenario-end" | "step";

interface BaseEvent {
  timestamp: string;
  type: BamEventType;
  browser: string;
  worker: number;
}

interface ComponentEvent extends BaseEvent {
  type: "component";
  component: string;
  action: string;
  selector: string;
  duration: number;
  success: boolean;
}

interface ScenarioStartEvent extends BaseEvent {
  type: "scenario-start";
  scenario: string;
  feature?: string;
  tags?: string[];
}

interface ScenarioEndEvent extends BaseEvent {
  type: "scenario-end";
  scenario: string;
  status: string;
}

interface StepEvent extends BaseEvent {
  type: "step";
  text: string;
  status: string;
}

type BamEvent =
  | ComponentEvent
  | ScenarioStartEvent
  | ScenarioEndEvent
  | StepEvent;

interface ScenarioContext {
  start: ScenarioStartEvent;
  end?: ScenarioEndEvent;
  steps: StepEvent[];
  actions: ComponentEvent[];
}

// ============================================================
// TRACER IMPLEMENTATION
// ============================================================

export class BamTracer implements IBamTracer {

  private readonly events: BamEvent[] = [];
  private readonly browserName: string;
  private readonly workerId: number;

  constructor(browserName: string, workerId: number) {
    this.browserName = browserName;
    this.workerId = workerId;
  }

  // ============================================================
  // RECORD EVENTS
  // ============================================================

  recordComponentAction(
    component: string,
    action: string,
    selector: string,
    duration: number,
    success: boolean
  ): void {
    this.events.push({
      timestamp: new Date().toISOString(),
      type: "component",
      component,
      action,
      selector,
      duration,
      success,
      browser: this.browserName,
      worker: this.workerId
    });
  }

  recordScenarioStart(name: string, feature?: string, tags?: string[]): void {
    this.events.push({
      timestamp: new Date().toISOString(),
      type: "scenario-start",
      scenario: name,
      feature,
      tags,
      browser: this.browserName,
      worker: this.workerId
    });
  }

  recordScenarioEnd(name: string, status: string): void {
    this.events.push({
      timestamp: new Date().toISOString(),
      type: "scenario-end",
      scenario: name,
      status,
      browser: this.browserName,
      worker: this.workerId
    });
  }

  recordStepEnd(text: string, status: string): void {
    this.events.push({
      timestamp: new Date().toISOString(),
      type: "step",
      text,
      status,
      browser: this.browserName,
      worker: this.workerId
    });
  }

  getEvents(): BamEvent[] {
    return this.events;
  }

  // ============================================================
  // RAW + STRUCTURED WRITERS
  // ============================================================

  async writeRaw(path: string): Promise<void> {
    await fs.writeFile(path, JSON.stringify(this.events, null, 2));
  }

  async writeStructured(path: string): Promise<void> {
    const structured = {
      browser: this.browserName,
      worker: this.workerId,
      totalEvents: this.events.length,
      events: this.events,
    };
    await fs.writeFile(path, JSON.stringify(structured, null, 2));
  }

  // ============================================================
  // BUILD EXECUTION REPORTS (BMS)
  // ============================================================

  buildExecutionReports(): BamExecutionReport[] {
    const reports: BamExecutionReport[] = [];
    let current: ScenarioContext | undefined;

    for (const event of this.events) {

      if (this.isScenarioStart(event)) {
        current = this.handleScenarioStart(event, current, reports);
        continue;
      }

      if (!current) continue;

      if (this.isStep(event)) {
        current.steps.push(event);
        continue;
      }

      if (this.isComponent(event)) {
        current.actions.push(event);
        continue;
      }

      if (this.isScenarioEnd(event, current)) {
        this.handleScenarioEnd(event, current, reports);
        current = undefined;
      }
    }

    // Cerrar escenario no finalizado
    if (current) {
      reports.push(this.buildReportFromContext(current));
    }

    return reports;
  }

  // ============================================================
  // HELPERS (Predicates)
  // ============================================================

  private isScenarioStart(e: BamEvent): e is ScenarioStartEvent {
    return e.type === "scenario-start";
  }

  private isScenarioEnd(e: BamEvent, ctx: ScenarioContext): e is ScenarioEndEvent {
    return e.type === "scenario-end" && e.scenario === ctx.start.scenario;
  }

  private isStep(e: BamEvent): e is StepEvent {
    return e.type === "step";
  }

  private isComponent(e: BamEvent): e is ComponentEvent {
    return e.type === "component";
  }

  // ============================================================
  // HELPERS (Context management)
  // ============================================================

  private handleScenarioStart(
    evt: ScenarioStartEvent,
    current: ScenarioContext | undefined,
    reports: BamExecutionReport[]
  ): ScenarioContext {
    if (current) {
      reports.push(this.buildReportFromContext(current));
    }
    return {
      start: evt,
      steps: [],
      actions: []
    };
  }

  private handleScenarioEnd(
    evt: ScenarioEndEvent,
    current: ScenarioContext,
    reports: BamExecutionReport[]
  ): void {
    current.end = evt;
    reports.push(this.buildReportFromContext(current));
  }

  // ============================================================
  // BUILD ONE SCENARIO REPORT
  // ============================================================

  private buildReportFromContext(ctx: ScenarioContext): BamExecutionReport {
    const startEvt = ctx.start;
    const startTime = startEvt.timestamp;
    const endTime = this.resolveEndTime(ctx);

    const durationMs = this.safeDurationMs(startTime, endTime);

    // Metadata from tags (BMS)
    const metadata: BamMetadata = BmsTagParser.fromTags(
      startEvt.tags,
      startEvt.scenario,
      startEvt.feature
    );

    // Resolve test data identifiers → full data
    let resolved: any[] = [];
    if (metadata.testData && metadata.testData.length > 0) {
      resolved = metadata.testData.map(id => {
        try {
          return TestDataRepository.resolve(id);
        } catch (err) {
          return { id, error: (err as Error).message };
        }
      });
    }

    metadata.resolvedTestData = resolved;

    const status = this.computeScenarioStatus(ctx);

    const execution: BamExecution = {
      browser: this.browserName,
      worker: this.workerId,
      status,
      startTime,
      endTime,
      durationMs
    };

    const steps: BamStep[] = ctx.steps.map(s => ({
      text: s.text,
      status: this.mapStatus(s.status),
      timestamp: s.timestamp
    }));

    const actions: BamAction[] = ctx.actions.map(a => ({
      component: a.component,
      action: a.action,
      selector: a.selector,
      duration: a.duration,
      success: a.success,
      timestamp: a.timestamp
    }));

    const metrics: BamMetrics = this.buildMetrics(
      metadata,
      steps,
      actions,
      durationMs
    );

    return {
      metadata,
      execution,
      steps,
      actions,
      metrics
    };
  }

  // ============================================================
  // METRICS & STATUS
  // ============================================================

  private resolveEndTime(ctx: ScenarioContext): string {
    if (ctx.end?.timestamp) return ctx.end.timestamp;

    // Usamos .at(-1) (recomendado por Sonar)
    const timestamps = [
      ...ctx.steps.map(s => s.timestamp),
      ...ctx.actions.map(a => a.timestamp)
    ];

    return timestamps.at(-1) ?? ctx.start.timestamp;
  }

  private safeDurationMs(startIso: string, endIso: string): number {
    const start = Date.parse(startIso);
    const end = Date.parse(endIso);
    if (Number.isNaN(start) || Number.isNaN(end)) return 0;
    return Math.max(0, end - start);
  }

  private mapStatus(status: string): BamStatus {
    const n = status.toUpperCase();
    if (n === "PASSED") return "PASSED";
    if (n === "FAILED") return "FAILED";
    if (n === "SKIPPED") return "SKIPPED";
    return "UNKNOWN";
  }

  private computeScenarioStatus(ctx: ScenarioContext): BamStatus {
    if (ctx.end?.status) {
      return this.mapStatus(ctx.end.status);
    }

    const steps = ctx.steps.map(s => s.status.toUpperCase());
    if (steps.includes("FAILED")) return "FAILED";
    if (steps.includes("PASSED")) return "PASSED";
    if (steps.includes("SKIPPED")) return "SKIPPED";
    return "UNKNOWN";
  }

  private buildMetrics(
    metadata: BamMetadata,
    steps: BamStep[],
    actions: BamAction[],
    durationMs: number
  ): BamMetrics {
    const actionsCount = actions.length;
    const stepsCount = steps.length;

    const avgActionDurationMs = actionsCount
      ? actions.reduce((acc, a) => acc + a.duration, 0) / actionsCount
      : 0;

    const componentsUsed = Array.from(new Set(actions.map(a => a.component)));

    return {
      performance: {
        totalDurationMs: durationMs,
        avgActionDurationMs
      },
      efficiency: {
        actionsCount,
        stepsCount
      },
      maintainability: {
        componentsUsed
      },
      functionalSuitability: {
        requirementsCovered: metadata.requirements,
        acCovered: metadata.acceptanceCriteria?.length
      }
    };
  }

  // ============================================================
  // WRITE BMS REPORTS PER SCENARIO
  // ============================================================

  async writeBmsReports(baseDir: string): Promise<void> {
    const reports = this.buildExecutionReports();
    if (reports.length === 0) return;

    await fs.mkdir(baseDir, { recursive: true });

    for (const [index, report] of reports.entries()) {
      const id = report.metadata.id || `scenario-${index + 1}`;

      // Sin escape innecesario → Sonar OK
      const safeId = id.replace(/[^\w-]+/g, "_");

      const path = `${baseDir}/${safeId}.json`;
      await fs.writeFile(path, JSON.stringify(report, null, 2));
    }
  }
}
