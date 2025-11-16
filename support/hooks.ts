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
  const tracer = ctx.tracer;

  const workerId = ctx.workerId;
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

  const baseDir = `reports/${timestamp}`;
  const bmsDir = `${baseDir}/bms`;

  // 🔹 Crear directorios necesarios
  await fs.mkdir(baseDir, { recursive: true });
  await fs.mkdir(bmsDir, { recursive: true });

  // 🔹 Escritos seguros sin fallar
  await tracer.writeRaw(`${baseDir}/execution-trace.json`);
  await tracer.writeStructured(`${baseDir}/structured.json`);
  await tracer.writeBmsReports(bmsDir);

  // 🔹 Worker sin escenarios → mostrar skipped
  if (tracer.getEvents().length === 0) {
    BamLogger.printWorkerSkipped(workerId, ctx.browserName);
  }
});
