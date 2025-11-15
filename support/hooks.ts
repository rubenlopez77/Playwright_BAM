
import { Before, After, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { EnvConfig } from './env';
import { BamWorld, ExecutionContextFactory } from './world';
import fs from 'node:fs/promises';
import { BamLogger } from './logger/bam.logger';

setDefaultTimeout(EnvConfig.CUCUMBER_TIMEOUT);

let runDir: string | null = null;

// ======================================================
//                 BEFORE SCENARIO
// ======================================================
Before(async function (this: BamWorld, scenario) {
  await this.init();

  const ctx = this.context;

  // Reset básico por aislamiento
  ctx.enqueue(async () => {
    await ctx.context.clearCookies();
    await ctx.page.goto(EnvConfig.BASE_URL);
  });

  await ctx.flush();
});

// ======================================================
//                  AFTER SCENARIO
// ======================================================
After(async function (this: BamWorld) {
  await this.context.flush();
});

// ======================================================
//                  AFTER ALL WORKER
// ======================================================
AfterAll(async () => {

  if (!EnvConfig.TRACE) return;

  // ¿El worker ejecutó escenarios?
  if (!ExecutionContextFactory.wasInitialized()) return;

  const ctx = ExecutionContextFactory.getCurrent();
  const tracer = ctx.logger;

  if (!runDir) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    runDir = `reports/${timestamp}`;
    await fs.mkdir(runDir, { recursive: true });
  }

  const workerId = process.env.CUCUMBER_WORKER_ID ?? '0';

  const rawPath        = `${runDir}/worker-${workerId}-events.json`;
  const structuredPath = `${runDir}/worker-${workerId}-structured.json`;

  await tracer.writeRaw(rawPath);
  await tracer.writeStructuredReport(structuredPath);

  if (BamLogger.enabled) {
    console.log(`\nTrace guardada para WORKER ${workerId}:`);
    console.log(` - ${rawPath}`);
    console.log(` - ${structuredPath}`);
  }

  await ExecutionContextFactory.close();
});
