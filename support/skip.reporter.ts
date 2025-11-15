import { AfterAll } from '@cucumber/cucumber';
import { BamLogger } from './logger/bam.logger';
import { ExecutionContextFactory } from './world';
import { EnvConfig } from './env';

AfterAll(function () {
  const workerId = Number(process.env.CUCUMBER_WORKER_ID ?? '0');
  const browserName = EnvConfig.BROWSER[workerId] ?? EnvConfig.MAIN_BROWSER;

  if (!ExecutionContextFactory.wasInitialized()) {
    BamLogger.printWorkerSkipped(workerId, browserName);
  }
});
