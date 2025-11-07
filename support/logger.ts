import chalk from 'chalk';

export interface LogEvent {
  timestamp: string;
  component: string;
  action: string;
  selector?: string;
  duration?: number;
  success?: boolean;
  error?: string;
}

/**
 * Logger BAM v1.2.1
 * - Muestra duraciones formateadas (s)
 * - Permite logging visual y JSON estructurado
 */
export class Logger {
  private enabled: boolean;
  private trace: LogEvent[] = [];

  constructor(enabled: boolean) {
    this.enabled = enabled;
  }

  private formatDuration(ms?: number): string {
    if (ms === undefined) return '';
    const seconds = (ms / 1000).toFixed(2);
    return chalk.gray(`(${seconds}s)`);
  }

  logAction(
    component: string,
    action: string,
    selector?: string,
    duration?: number,
    success = true
  ) {
    const entry: LogEvent = {
      timestamp: new Date().toISOString(),
      component,
      action,
      selector,
      duration,
      success,
    };

    this.trace.push(entry);

    const symbol = success ? chalk.green('✔') : chalk.red('✖');
    const durationText = this.formatDuration(duration);

    if (this.enabled) {
      console.log(
        chalk.gray(`[${entry.timestamp}]`),
        symbol,
        chalk.cyan(`${component}.${action}`),
        selector ? chalk.white(selector) : '',
        durationText
      );
    }
  }

  logTiming(component: string, action: string, duration: number, success = true) {
    const seconds = (duration / 1000).toFixed(2);
    const msg = `${component}.${action} : ${seconds}s`;
    console.log(success ? chalk.green(`--> ${msg}`) : chalk.red(`!! ${msg}`));
  }

  logError(component: string, action: string, error: any) {
    const entry: LogEvent = {
      timestamp: new Date().toISOString(),
      component,
      action,
      success: false,
      error: error?.message || String(error),
    };
    this.trace.push(entry);
    console.log(chalk.red(`[ERROR] ${component}.${action}: ${entry.error}`));
  }

  getTrace(): LogEvent[] {
    return this.trace;
  }

  printStep(stepType: string, text: string) {
    if (!this.enabled) {
      const color =
        stepType === 'Given'
          ? chalk.green
          : stepType === 'When'
          ? chalk.cyan
          : chalk.yellow;
      console.log(color(`${stepType} ${text}`));
    }
  }
}
