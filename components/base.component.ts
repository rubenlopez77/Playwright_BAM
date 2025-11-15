// components/base.component.ts
import { ExecutionContext } from '../support/world';
import { BamLogger } from '../support/logger/bam.logger';

export abstract class BaseComponent {
  protected readonly context: ExecutionContext;
  protected readonly selector: string;
  protected readonly name: string;

  constructor(world: ExecutionContext, selector: string, name: string) {
    this.context = world;
    this.selector = selector;
    this.name = name;
  }

  public get selectorValue(): string {
    return this.selector;
  }

  // -------------------------------
  // Alias compatible con BAM v1.x
  // -------------------------------
  public execute(actionName: string, fn: (page: any) => Promise<void>) {
    this.run(actionName, fn);
  }

  // -------------------------------
  // Core BAM v2 runner
  // -------------------------------
  protected run(actionName: string, actionFn: (page: any) => Promise<void>) {

    this.context.enqueue(async () => {
      const ctx     = this.context;
      const tracer  = ctx.logger;
      const browser = ctx.browserName;
      const page    = ctx.page;

      const start = performance.now();

      try {
        await actionFn(page);
        const duration = performance.now() - start;

        // JSON (siempre)
        tracer.recordComponentAction(
          this.name,
          actionName,
          this.selector,
          duration,
          true
        );

        // LOG opcional
        if (BamLogger.enabled) {
          BamLogger.printComponentAction(this.name, actionName, duration, browser, true);
        }

      } catch (error) {

        const duration = performance.now() - start;

        tracer.recordComponentAction(
          this.name,
          actionName,
          this.selector,
          duration,
          false
        );

        if (BamLogger.enabled) {
          BamLogger.printComponentAction(this.name, actionName, duration, browser, false);
        }

        throw error;
      }
    });
  }
}
