/**
 * Logger BAM 
 * - logAction: guarda trazabilidad JSON pero NO imprime
 * - logTiming: imprime UNA única línea en consola
 * - logError: imprime en rojo
 */
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

  // ✅ NO imprime nunca
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

  // ✅ SOLO imprime si LOG=true
  logTiming(component: string, action: string, duration: number, success = true) {
    if (!this.enabled) return;

    const seconds = this.formatDuration(duration);
    const msg = `${component}.${action} : ${seconds}`;
    console.log(success ? chalk.green(`--> ${msg}`) : chalk.red(`!! ${msg}`));
  }

  // ✅ SOLO imprime si LOG=true
  logError(component: string, action: string, error: any) {
    this.trace.push({
      timestamp: new Date().toISOString(),
      component,
      action,
      success: false,
      error: error?.message || String(error),
    });

    if (this.enabled) {
      console.log(chalk.red(`[ERROR] ${component}.${action}: ${error?.message || error}`));
    }
  }

  getTrace(): LogEvent[] {
    return this.trace;
  }

  printStep(stepType: string, text: string) {
    if (this.enabled) return; // <-- FIX

    const colorMap: Record<string, chalk.Chalk> = {
      Given: chalk.green,
      When: chalk.cyan,
      Then: chalk.yellow
    };

    const color = colorMap[stepType] ?? chalk.white;

    console.log(color(`${stepType} ${text}`));
  }
}
