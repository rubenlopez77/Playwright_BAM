// support/logger/bam.logger.ts
import chalk from 'chalk';
import { EnvConfig } from '../env';

export class BamLogger {

  static enabled = EnvConfig.LOG === true;

  static readonly icons = {
    ok: '✅',
    fail: '❌',
    warn: '⚠️',
    step: '→',
    scenario: '◆',
    worker: '🚀',
    skip: '⚪',
  };

  static readonly colors = {
    scenario: chalk.hex('#9b6df2'),
    worker: chalk.cyan,
    warn: chalk.yellow,
    error: chalk.red,
    ok: chalk.green,
    neutral: chalk.white,
  };

  // ================================
  // WORKERS (solo si LOG=true)
  // ================================
  static printWorkerInit(workerId: number, browser: string) {
    if (!this.enabled) return;
    console.log(
      this.colors.worker(
        `\n${this.icons.worker} [WORKER ${workerId}] Inicializando ExecutionContext`
      )
    );
    console.log(`   → Navegador asignado: ${browser}`);
  }

  static printWorkerSkipped(workerId: number, browser: string) {
    if (!this.enabled) return;
    console.log(
      this.colors.warn(
        `${this.icons.skip} [WORKER ${workerId}] SKIPPED — browser="${browser}", no scenarios executed`
      )
    );
  }

  // ================================
  // SCENARIOS (solo si LOG=true)
  // ================================
  static printScenarioStart(name: string, browser: string, feature?: string, tags?: string[]) {
    if (!this.enabled) return;

    const line =
      `\n[SCENARIO START] ${name}` +
      (feature ? ` — feature="${feature}"` : '') +
      (tags?.length ? ` tags="${tags.join(' ')}"` : '') +
      ` — browser="${browser}"`;

    console.log(this.colors.scenario(line));
  }

  static printScenarioEnd(name: string, status: string, browser: string) {
    if (!this.enabled) return;

    const ok  = status.toUpperCase() === 'PASSED';
    const icon = ok ? this.icons.ok : this.icons.fail;
    const txt  = ok ? 'OK' : 'KO!';

    const line = `${icon} [SCENARIO END]   ${name} → ${txt} — browser="${browser}"`;
    console.log(ok ? this.colors.scenario(line) : this.colors.error(line));
  }

  // ================================
  // STEPS (solo if LOG=true)
  // ================================
  static printStepEnd(text: string, status: string, browser: string) {
    if (!this.enabled) return;

    const line = `[STEP] ${text} → ${status.toUpperCase()} — browser="${browser}"`;
    console.log(this.colors.neutral(line));
  }

  // ================================
  // COMPONENT ACTIONS (solo if LOG=true)
  // ================================
  static printComponentAction(name: string, action: string, duration: number, browser: string, success = true) {
    if (!this.enabled) return;

    const msg = `${name}.${action} : ${(duration / 1000).toFixed(2)}s [${browser}]`;
    console.log(
      success
        ? this.colors.ok(`--> ${msg}`)
        : this.colors.error(`⚠️ ${msg}`)
    );
  }
}
