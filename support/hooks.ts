// support/hooks.ts
import { Before, After, AfterAll, setDefaultTimeout } from "@cucumber/cucumber";
import fs from "node:fs/promises";

import { EnvConfig } from "./env";
import { ExecutionContextFactory } from "./world";
import { BamLogger } from "./logger/bam.logger";

setDefaultTimeout(EnvConfig.CUCUMBER_TIMEOUT);

Before(async function () {
  await this.init();
});

After(async function () {
  await this.flush();
});

AfterAll(async () => {

  if (!EnvConfig.TRACE) return;
  if (!ExecutionContextFactory.wasInitialized()) return;

  const ctx = ExecutionContextFactory.getCurrent();
  const tracer = ctx.logger;

  const workerId = ctx.workerId;
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const dir = `reports/${timestamp}`;

  await fs.mkdir(dir, { recursive: true });

  await tracer.writeRaw(`${dir}/worker-${workerId}-raw.json`);
  await tracer.writeStructured(`${dir}/worker-${workerId}-structured.json`);


  if (tracer.getEvents().length === 0) {
    BamLogger.printWorkerSkipped(workerId, ctx.browserName);
  }
});
