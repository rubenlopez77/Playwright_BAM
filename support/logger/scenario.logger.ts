// support/logger/scenario.logger.ts

import {
  Before,
  After,
  BeforeStep,
  AfterStep
} from '@cucumber/cucumber';

import { BamWorld } from '../world';
import { BamLogger } from './bam.logger';

// ===========================================================
//             BEFORE SCENARIO
// ===========================================================

Before(function (this: BamWorld, scenario) {
  const ctx     = this.context;          // ExecutionContext real
  const tracer  = ctx.logger;            // BamTracer
  const browser = ctx.browserName;

  const name    = scenario.pickle.name;
  const tags    = scenario.pickle.tags?.map(t => t.name) ?? [];
  const feature = scenario.gherkinDocument?.feature?.name ?? '';

  tracer.recordScenarioStart(name, feature, tags);

  if (BamLogger.enabled) {
    BamLogger.printScenarioStart(name, browser, feature, tags);
  }
});

// ===========================================================
//             BEFORE STEP
// ===========================================================

BeforeStep(async function (this: BamWorld) {
  await this.context.flush();
});

// ===========================================================
//             AFTER STEP
// ===========================================================

AfterStep(async function (this: BamWorld, step) {
  const ctx     = this.context;
  const tracer  = ctx.logger;
  const browser = ctx.browserName;

  const text   = step.pickleStep?.text ?? '';
  const status = step.result?.status?.toUpperCase() ?? 'UNKNOWN';

  tracer.recordStepEnd(text, status);

  if (BamLogger.enabled) {
    BamLogger.printStepEnd(text, status, browser);
  }

  await ctx.flush();
});

// ===========================================================
//             AFTER SCENARIO
// ===========================================================

After(function (this: BamWorld, scenario) {
  const ctx     = this.context;
  const tracer  = ctx.logger;
  const browser = ctx.browserName;

  const name   = scenario.pickle.name;
  const status = scenario.result?.status?.toUpperCase() ?? 'UNKNOWN';

  tracer.recordScenarioEnd(name, status);

  if (BamLogger.enabled) {
    BamLogger.printScenarioEnd(name, status, browser);
  }
});
