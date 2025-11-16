// support/logger/bam.logger.ts
import chalk from "chalk";
import { EnvConfig } from "../env";

export class BamLogger {

  static readonly enabled = EnvConfig.LOG === true;

  static readonly icons = {
    ok: "✅",
    fail: "❌",
    warn: "⚠️",
    step: "→",
    scenario: "◆",
    worker: "🚀",
    skip: "⚠️",
  };

  static readonly colors = {
    scenario: chalk.hex("#9b6df2"),
    worker: chalk.cyan,
    warn: chalk.yellow,
    error: chalk.red,
    ok: chalk.green,
    neutral: chalk.white,
  };

  static printWorkerInit(workerId: number, browser: string) {
    if (!this.enabled) return;
    console.log(
      this.colors.worker(
        `\n${this.icons.worker} [WORKER ${workerId}]  →  ${browser}`
      )
    );

  }

  static printWorkerSkipped(workerId: number, browser: string) {
    if (!this.enabled) return;
    console.log(
      this.colors.warn(
        `${this.icons.skip}  [WORKER ${workerId}] SKIPPED — browser="${browser}", no scenarios executed`
      )
    );
  }

  // ============================================================
  // SCENARIOS
  // ============================================================
  static printScenarioStart(name: string, browser: string, wid: number, feature?: string, tags?: string[]) {
    if (!this.enabled) return;

    const line =
      `\n[SCENARIO START] ${name}` +
      (feature ? ` — feature="${feature}"` : "") +
      (tags?.length ? ` tags="${tags.join(" ")}"` : "") +
      ` — browser="${browser}|W${wid}"`;

    console.log(this.colors.scenario(line));
  }

  static printScenarioEnd(name: string, status: string, browser: string, wid: number) {
    if (!this.enabled) return;

    const ok = status.toUpperCase() === "PASSED";
    const icon = ok ? this.icons.ok : this.icons.fail;
    const msg = ok ? "OK" : "KO!";

    const line = `${icon} [SCENARIO END]   ${name} → ${msg} — browser="${browser}|W${wid}"`;

    console.log(ok ? this.colors.scenario(line) : this.colors.error(line));
  }

  // ============================================================
  // STEPS
  // ============================================================
  static printStepEnd(text: string, status: string, browser: string, wid: number) {
    if (!this.enabled) return;
    console.log(
      this.colors.neutral(`[STEP] ${text} → ${status.toUpperCase()} — browser="${browser}|W${wid}"`)
    );
  }

  // ============================================================
  // COMPONENT ACTIONS
  // ============================================================
  static printComponentAction(
    component: string,
    action: string,
    duration: number,
    browser: string,
    wid: number,
    success: boolean
  ) {
    if (!this.enabled) return;

    const msg = `${component}.${action} : ${(duration / 1000).toFixed(2)}s [${browser}|W${wid}]`;

    console.log(
      success
        ? this.colors.ok(`--> ${msg}`)
        : this.colors.error(`⚠️ ${msg}`)
    );
  }
}
