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

export class Logger {
  private enabled: boolean;
  private trace: LogEvent[] = [];

  constructor(enabled: boolean) {
    this.enabled = enabled;
  }

  logAction(component: string, action: string, selector?: string, duration?: number, success = true) {
    const entry: LogEvent = {
      timestamp: new Date().toISOString(),
      component,
      action,
      selector,
      duration,
      success,
    };

    this.trace.push(entry);

    if (this.enabled) {
      const status = success ? chalk.green('✔') : chalk.red('✖');
      console.log(chalk.gray(`[${entry.timestamp}]`), status, chalk.cyan(`${component}.${action}`), selector || '');
    }
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

  // Al finalizar los escenarios, exportar la traza si se requiere
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
