// components/base.component.ts
import { ExecutionContext } from "../support/world";
import { BamLogger } from "../support/logger/bam.logger";

export abstract class BaseComponent {

  protected readonly context: ExecutionContext;
  protected readonly selector: string;
  protected readonly name: string;

  constructor(world: ExecutionContext, selector: string, name: string) {
    this.context = world;
    this.selector = selector;
    this.name = name;
  }

  get selectorValue() {
    return this.selector;
  }

  execute(actionName: string, fn: (page: any) => Promise<void>) {
    this.run(actionName, fn);
  }

  protected run(actionName: string, actionFn: (page: any) => Promise<void>) {

    this.context.enqueue(async () => {

      const tracer  = this.context.logger;
      const browser = this.context.browserName;
      const wid     = this.context.workerId;
      const page    = this.context.page;

      const start = performance.now();

      try {
        await actionFn(page);
        const duration = performance.now() - start;

        tracer.recordComponentAction(
          this.name,
          actionName,
          this.selector,
          duration,
          true
        );

        BamLogger.printComponentAction(
          this.name,
          actionName,
          duration,
          browser,
          wid,
          true
        );

      } catch (error) {

        const duration = performance.now() - start;

        tracer.recordComponentAction(
          this.name,
          actionName,
          this.selector,
          duration,
          false
        );

        BamLogger.printComponentAction(
          this.name,
          actionName,
          duration,
          browser,
          wid,
          false
        );

        throw error;
      }
    });
  }
}
