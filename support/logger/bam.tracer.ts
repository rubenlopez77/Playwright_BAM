// support/logger/bam.tracer.ts
import fs from "node:fs/promises";
import {
  BamEvent,
  ScenarioStartEvent,
  ScenarioEndEvent,
  BamExecution,
  BamMetadata,
  BamAction,
  BamStep,
  BamMetrics,
  BamExecutionReport,
  BamTestSession
} from "./bam.tracer.types";

import { BmsTagParser } from "./bms.tag-parser";

export class BamTracer {
  private readonly events: BamEvent[] = [];
  private readonly browserName: string;
  private readonly workerId: number;

  constructor(browserName: string, workerId: number) {
    this.browserName = browserName;
    this.workerId = workerId;
  }

  // ============================================================
  // EVENT RECORDERS
  // ============================================================

  recordComponentAction(
    component: string,
    action: string,
    selector: string,
    duration: number,
    success: boolean
  ) {
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

  recordScenarioStart(name: string, feature?: string, tags?: string[]) {
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

  recordScenarioEnd(name: string, status: string) {
    this.events.push({
      timestamp: new Date().toISOString(),
      type: "scenario-end",
      scenario: name,
      status,
      browser: this.browserName,
      worker: this.workerId
    });
  }

  recordStepEnd(text: string, status: string) {
    this.events.push({
      timestamp: new Date().toISOString(),
      type: "step",
      text,
      status,
      browser: this.browserName,
      worker: this.workerId
    });
  }

  getEvents() {
    return this.events;
  }

  // ============================================================
  // WRITE RAW / STRUCTURED LOGS
  // ============================================================

  async writeRaw(path: string) {
    await fs.writeFile(path, JSON.stringify(this.events, null, 2));
  }

  async writeStructured(path: string) {
    const structured = {
      browser: this.browserName,
      worker: this.workerId,
      totalEvents: this.events.length,
      events: this.events
    };

    await fs.writeFile(path, JSON.stringify(structured, null, 2));
  }

  // ============================================================
  // BUILD BMS REPORTS (uno por escenario)
  // ============================================================

  async writeBmsReports(baseDir: string) {
    const reports = this.buildExecutionReports();

    for (const [index, report] of reports.entries()) {
      const id = report.metadata.id || `scenario-${index + 1}`;
      const safeId = id.replace(/[^\w-]+/g, "_"); // seguro para filenames
      const path = `${baseDir}/${safeId}.json`;

      await fs.writeFile(path, JSON.stringify(report, null, 2));
    }
  }

  // ============================================================
  // PRIVATE – HIGH-LEVEL REPORT BUILDER
  // ============================================================

  public buildExecutionReports(): BamExecutionReport[] {
    const reports: BamExecutionReport[] = [];
    const events = this.events;

    const scenarioStarts = events.filter(e => e.type === "scenario-start") as ScenarioStartEvent[];

    for (const startEvt of scenarioStarts) {
      const endEvt = this.findScenarioEnd(startEvt.scenario);

      const scenarioEvents = this.events.filter(
        e => e.timestamp >= startEvt.timestamp &&
             (!endEvt || e.timestamp <= endEvt.timestamp)
      );

      const metadata = this.buildMetadata(startEvt);
      const execution = this.buildExecution(startEvt, endEvt);
      const steps = this.buildSteps(scenarioEvents);
      const actions = this.buildActions(scenarioEvents, startEvt.scenario);
      const metrics = this.buildMetrics(metadata, actions, steps);

      const report: BamExecutionReport = {
        testSession: this.buildTestSession(),
        metadata,
        execution,
        steps,
        actions,
        metrics
      };

      reports.push(report);
    }

    return reports;
  }

  // ============================================================
  // PRIVATE HELPERS
  // ============================================================

  private findScenarioEnd(name: string): ScenarioEndEvent | undefined {
    const matches = this.events.filter(
      e => e.type === "scenario-end" && (e as ScenarioEndEvent).scenario === name
    ) as ScenarioEndEvent[];

    return matches.at(-1); // Prefer .at() over [...].length - 1
  }

  private buildMetadata(startEvt: ScenarioStartEvent): BamMetadata {
    const metadata: BamMetadata = BmsTagParser.fromTags(
      startEvt.tags ?? [],
      startEvt.scenario,
      startEvt.feature
    );

    // Inferencia de Test Oracle si no existe
    if (!metadata.testOracle && metadata.acceptanceCriteria && metadata.acceptanceCriteria.length > 0) {
      metadata.testOracle = `Primary oracle: ${metadata.acceptanceCriteria[0]}`;
    }

    return metadata;
  }

  private buildExecution(startEvt: ScenarioStartEvent, endEvt?: ScenarioEndEvent): BamExecution {
    const startTime = startEvt.timestamp;
    const endTime = endEvt?.timestamp ?? startTime;
    const duration = new Date(endTime).getTime() - new Date(startTime).getTime();

    return {
      browser: this.browserName,
      worker: this.workerId,
      status: this.mapStatus(endEvt?.status),
      startTime,
      endTime,
      durationMs: duration
    };
  }

  private mapStatus(status?: string): "PASSED" | "FAILED" | "SKIPPED" {
    if (!status) return "UNKNOWN" as any;
    const st = status.toUpperCase();
    if (st.includes("PASSED")) return "PASSED";
    if (st.includes("FAILED")) return "FAILED";
    if (st.includes("SKIPPED")) return "SKIPPED";
    return "UNKNOWN" as any;
  }

  private buildSteps(events: BamEvent[]): BamStep[] {
    return events
      .filter(e => e.type === "step")
      .map(e => ({
        text: (e as any).text,
        status: (e as any).status,
        timestamp: e.timestamp
      }));
  }

  private buildActions(events: BamEvent[], scenario: string): BamAction[] {
    return events
      .filter(e => e.type === "component")
      .map(e => ({
        component: (e as any).component,
        action: (e as any).action,
        selector: (e as any).selector,
        duration: (e as any).duration,
        success: (e as any).success,
        timestamp: e.timestamp,
        boundStep: scenario
      }));
  }

  private buildMetrics(
    metadata: BamMetadata,
    actions: BamAction[],
    steps: BamStep[]
  ): BamMetrics {
    const totalDuration = actions.reduce((acc, a) => acc + a.duration, 0);
    const avgDuration = actions.length > 0 ? totalDuration / actions.length : 0;

    // Coverage context for AC
    const acTotal = metadata.acceptanceCriteria?.length ?? 0;
    const acCovered = acTotal; // 1 escenario = 1 caso = cubre todos sus AC

    return {
      performance: {
        totalDurationMs: totalDuration,
        avgActionDurationMs: avgDuration
      },
      efficiency: {
        actionsCount: actions.length,
        stepsCount: steps.length
      },
      maintainability: {
        componentsUsed: [...new Set(actions.map(a => a.component))]
      },
      reliability: {
        status: actions.some(a => !a.success) ? "UNSTABLE" : "STABLE",
        failRate: actions.filter(a => !a.success).length / (actions.length || 1)
      },
      functionalSuitability: {
        requirementsCovered: metadata.requirements ?? [],
        acCovered,
        coverageContext: acTotal > 0
          ? {
              acTotal,
              acCovered,
              acCoveragePercentage: (acCovered / acTotal) * 100
            }
          : undefined
      }
    };
  }

  private buildTestSession(): BamTestSession {
    return {
      testPlan: process.env.BAM_PLAN,
      testCycle: process.env.BAM_CYCLE,
      testRun: process.env.BAM_RUN_ID,
      tester: process.env.BAM_TESTER,
      executionEnvironment:
        process.env.TEST_ENV ||
        process.env.BAM_ENV ||
        "LOCAL"
    };
  }
}
