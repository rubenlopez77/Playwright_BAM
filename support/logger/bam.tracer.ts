// support/logger/bam.tracer.ts
import fs from "node:fs/promises";

export class BamTracer {

  private readonly events: any[] = [];
  private readonly browserName: string;
  private readonly workerId: number;

  constructor(browserName: string, workerId: number) {
    this.browserName = browserName;
    this.workerId = workerId;
  }

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

  async writeRaw(path: string) {
    await fs.writeFile(path, JSON.stringify(this.events, null, 2));
  }

  async writeStructured(path: string) {
    const structured = {
      browser: this.browserName,
      worker: this.workerId,
      totalEvents: this.events.length,
      events: this.events,
    };

    await fs.writeFile(path, JSON.stringify(structured, null, 2));
  }
}
