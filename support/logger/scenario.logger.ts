// support/logger/scenario.logger.ts
import {
  Before,
  After,
  BeforeStep,
  AfterStep
} from "@cucumber/cucumber";

import { BamWorld } from "../world";
import { BamLogger } from "./bam.logger";

Before(function (this: BamWorld, scenario) {
  const tracer  = this.tracer;        // antes: this.logger
  const browser = this.browserName;
  const wid     = this.workerId;

  const name    = scenario.pickle.name;
  const tags    = scenario.pickle.tags?.map(t => t.name) ?? [];
  const feature = scenario.gherkinDocument?.feature?.name ?? "";

  tracer.recordScenarioStart(name, feature, tags);

  BamLogger.printScenarioStart(name, browser, wid, feature, tags);
});

BeforeStep(async function (this: BamWorld) {
  await this.flush();
});

AfterStep(async function (this: BamWorld, step) {
  const tracer  = this.tracer;        // antes: this.logger
  const browser = this.browserName;
  const wid     = this.workerId;

  const text   = step.pickleStep?.text ?? "";
  const status = step.result?.status?.toUpperCase() ?? "UNKNOWN";

  tracer.recordStepEnd(text, status);

  BamLogger.printStepEnd(text, status, browser, wid);

  await this.flush();
});

After(function (this: BamWorld, scenario) {
  const tracer  = this.tracer;        // antes: this.logger
  const browser = this.browserName;
  const wid     = this.workerId;

  const name   = scenario.pickle.name;
  const status = scenario.result?.status?.toUpperCase() ?? "UNKNOWN";

  tracer.recordScenarioEnd(name, status);
  BamLogger.printScenarioEnd(name, status, browser, wid);
});
