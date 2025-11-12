import chalk from 'chalk';

export interface LogEvent {
  timestamp: string;
  component: string;
  action: string;
  selector?: string;
  duration?: number;
  success?: boolean;
  error?: string;
  scenarioName?: string;
  featureName?: string;
  tags?: string[];
  stepText?: string;
  status?: string;
}

export class Logger {
  private readonly enabled: boolean;
  private readonly trace: LogEvent[] = [];

  constructor(enabled: boolean) {
    this.enabled = enabled;
  }

  private formatDuration(ms?: number): string {
    if (ms === undefined) return '';
    const seconds = (ms / 1000).toFixed(2);
    return `${seconds}s`;
  }

  // ==== COMPONENT ACTIONS ====

  logAction(component: string, action: string, selector?: string, duration?: number, success = true) {
    this.trace.push({
      timestamp: new Date().toISOString(),
      component,
      action,
      selector,
      duration,
      success
    });
  }

  logTiming(component: string, action: string, duration: number, success = true) {
    this.logAction(component, action, undefined, duration, success);
    if (!this.enabled) return;

    const msg = `${component}.${action} : ${this.formatDuration(duration)}`;
    console.log(success ? chalk.green(`--> ${msg}`) : chalk.red(`⚠️ ${msg}`));
  }

  logError(component: string, action: string, error: any) {
    this.trace.push({
      timestamp: new Date().toISOString(),
      component,
      action,
      success: false,
      error: error?.message || String(error),
    });

    if (this.enabled) {
      console.log(chalk.red(` [ERROR] ${component}.${action}: ${error?.message || error}`));
    }
  }

  getTrace(): LogEvent[] {
    return this.trace;
  }

  // ==== BDD SCENARIOS / STEPS ====

  printScenarioStart(name: string, feature?: string, tags?: string[]) {
    const color = chalk.hex('#9b6df2'); // morado elegante
    const line =
      ` [SCENARIO START] ${name}` +
      (feature ? ` — feature="${feature}"` : '') +
      (tags?.length ? ` tags="${tags.join(' ')}"` : '');
    this.trace.push({
      timestamp: new Date().toISOString(),
      component: 'BDD',
      action: 'ScenarioStart',
      scenarioName: name,
      featureName: feature,
      tags
    });
    if (this.enabled) console.log(color(line));
  }

  printScenarioEnd(name: string, status: string) {
    const passed = status.toUpperCase() === 'PASSED';
    const icon = passed ? '✅' : '❌';
    const text = passed ? 'OK' : 'KO!';
    const color = passed ? chalk.hex('#9b6df2') : chalk.red;

    const line = `${icon} [SCENARIO END]   ${name} → ${text}`;
    this.trace.push({
      timestamp: new Date().toISOString(),
      component: 'BDD',
      action: 'ScenarioEnd',
      scenarioName: name,
      status 
    });

    if (this.enabled) console.log(color(line));
  }

  printStepEnd(text: string, status: string) {
    const color = chalk.white; // neutro, sin iconos
    const line = `[STEP] ${text} → ${status.toUpperCase()}`;
    this.trace.push({
      timestamp: new Date().toISOString(),
      component: 'BDD',
      action: 'StepEnd',
      stepText: text,
      status
    });
    if (this.enabled) console.log(color(line));
  }
}
