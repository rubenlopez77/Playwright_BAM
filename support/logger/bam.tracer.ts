
import fs from 'node:fs/promises';

export interface TraceEvent {
  timestamp: string;
  type: 'scenario-start' | 'scenario-end' | 'step-end' | 'component-action';
  
  // BDD fields
  scenario?: string;
  feature?: string;
  tags?: string[];
  status?: string;

  // Step fields
  step?: string;

  // Component layer fields
  component?: string;
  action?: string;
  selector?: string;
  duration?: number;
  success?: boolean;

  // Browser
  browser: string;
}

export class BamTracer {
  
  private readonly events: TraceEvent[] = [];
  private readonly browser: string;

  constructor(browser: string) {
    this.browser = browser;
  }

  // ============================================================
  //                    RECORD EVENT HELPERS
  // ============================================================

  recordScenarioStart(name: string, feature?: string, tags?: string[]) {
    this.events.push({
      timestamp: new Date().toISOString(),
      type: 'scenario-start',
      scenario: name,
      feature,
      tags,
      browser: this.browser
    });
  }

  recordScenarioEnd(name: string, status: string) {
    this.events.push({
      timestamp: new Date().toISOString(),
      type: 'scenario-end',
      scenario: name,
      status,
      browser: this.browser
    });
  }

  recordStepEnd(text: string, status: string) {
    this.events.push({
      timestamp: new Date().toISOString(),
      type: 'step-end',
      step: text,
      status,
      browser: this.browser
    });
  }

  recordComponentAction(
    component: string,
    action: string,
    selector: string | undefined,
    duration: number,
    success: boolean
  ) {
    this.events.push({
      timestamp: new Date().toISOString(),
      type: 'component-action',
      component,
      action,
      selector,
      duration,
      success,
      browser: this.browser
    });
  }

  // ============================================================
  //                    RAW OUTPUT
  // ============================================================
  
  getRawEvents(): TraceEvent[] {
    return this.events;
  }

  async writeRaw(path: string): Promise<void> {
    await fs.writeFile(path, JSON.stringify(this.events, null, 2));
  }

  // ============================================================
  //             STRUCTURED REPORT (AGGREGATED PER SCENARIO)
  // ============================================================

  async writeStructuredReport(path: string): Promise<void> {
    const structured: any[] = [];

    // Agrupar eventos por escenario
    const scenarioMap: Record<string, TraceEvent[]> = {};

    for (const ev of this.events) {
      const scenario = ev.scenario ?? '__NO_SCENARIO__';
      if (!scenarioMap[scenario]) scenarioMap[scenario] = [];
      scenarioMap[scenario].push(ev);
    }

    // Construcción de bloques
    for (const [scenarioName, list] of Object.entries(scenarioMap)) {
      const start  = list.find(e => e.type === 'scenario-start');
      const end    = list.find(e => e.type === 'scenario-end');
      const steps  = list.filter(e => e.type === 'step-end');
      const comps  = list.filter(e => e.type === 'component-action');

      structured.push({
        scenario: scenarioName,
        feature: start?.feature ?? null,
        tags: start?.tags ?? [],
        browser: this.browser,
        status: end?.status ?? 'UNKNOWN',
        steps: steps.map(s => ({
          text: s.step,
          status: s.status,
          timestamp: s.timestamp
        })),
        actions: comps.map(c => ({
          component: c.component,
          action: c.action,
          selector: c.selector,
          duration: c.duration,
          success: c.success,
          timestamp: c.timestamp
        }))
      });
    }

    await fs.writeFile(path, JSON.stringify(structured, null, 2));
  }
}
