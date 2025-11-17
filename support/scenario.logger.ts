// support/scenario.logger.ts
import {
  Before,
  After,
  BeforeStep,
  AfterStep,
  AfterAll,
  ITestCaseHookParameter,
  ITestStepHookParameter
} from '@cucumber/cucumber';
import type { ExecutionContext } from '../support/execution-context';
import fs from 'node:fs';

let lastLogger: any = null; // referencia al logger del último ExecutionContext

Before(function (this: ExecutionContext, scenario: ITestCaseHookParameter) {
  const name    = scenario.pickle.name;
  const tags    = scenario.pickle.tags?.map(t => t.name) ?? [];
  const feature = scenario.gherkinDocument?.feature?.name ?? '';

  this.logger?.printScenarioStart(name, feature, tags);
  lastLogger = this.logger; // guarda referencia global
});

BeforeStep(async function (this: ExecutionContext) {
  await this.flush();
});

AfterStep(async function (this: ExecutionContext, step: ITestStepHookParameter) {
  const text   = step.pickleStep?.text ?? '';
  const status = step.result?.status?.toUpperCase() ?? 'UNKNOWN';

  await this.flush(); // ahora sí puede lanzar

  this.logger?.printStepEnd(text, status);
});

After(function (this: ExecutionContext, scenario: ITestCaseHookParameter) {
  const name   = scenario.pickle.name;
  const status = scenario.result?.status?.toUpperCase() ?? 'UNKNOWN';
  this.logger?.printScenarioEnd(name, status);
});

AfterAll(async function () {
  if (!lastLogger) return;
  const trace = lastLogger.getTrace();
  const out = `reports/log-${Date.now()}.json`;
  await fs.promises.mkdir('reports', { recursive: true });
  await fs.promises.writeFile(out, JSON.stringify(trace, null, 2));
  console.log(`\nTrace guardada en ${out}`);
});
