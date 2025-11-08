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
 * Logger BAM v1.2
 * - logAction: guarda trazabilidad JSON pero NO imprime
 * - logTiming: imprime UNA única línea en consola
 * - logError: imprime en rojo
 */
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

  /** Guarda la acción para trazabilidad pero NO imprime */
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
    // NO console.log — BAM v1.2 recommendation
  }

  /** ÚNICA salida a consola por acción (bonita y verde) */
  logTiming(component: string, action: string, duration: number, success = true) {
    const seconds = this.formatDuration(duration);
    const msg = `${component}.${action} : ${seconds}`;
    console.log(success ? chalk.green(`--> ${msg}`) : chalk.red(`!! ${msg}`));
  }

  /** Errores a consola + almacenados */
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

  /** Trazabilidad completa JSON */
  getTrace(): LogEvent[] {
    return this.trace;
  }

  /** Steps BDD (Given/When/Then) */
  printStep(stepType: string, text: string) {
    if (!this.enabled) {
      const colorMap: Record<string, chalk.Chalk> = {
        Given: chalk.green,
        When: chalk.cyan,
        Then: chalk.yellow
      };

      const color = colorMap[stepType] ?? chalk.white;
      console.log(color(`${stepType} ${text}`));
    }
  }
}
