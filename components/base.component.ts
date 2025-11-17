import { ExecutionContext } from '../support/execution-context';

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
  public execute(actionName: string, fn: (page: any) => Promise<void>) {
    this.run(actionName, fn);
  }

  /**
   * Método universal BAM para ejecutar acciones de Component Layer.
   * - Aísla await dentro del runner determinista
   * - Mantiene API declarativa sin await en Pages
   */
  protected run(actionName: string, actionFn: (page: any) => Promise<void>) {
    this.context.enqueue(async () => {
      const { page, logger } = this.context;
      const start = performance.now();

      try {
        await actionFn(page);

        const duration = performance.now() - start;

        // JSON / métricas
        logger.logAction(this.name, actionName, this.selector, duration, true);

        // Log
        logger.logTiming(this.name, actionName, duration, true);

      } catch (error) {
        const duration = performance.now() - start;
 
        logger.logAction(this.name, actionName, this.selector, duration, false);

        // En caso de error lo muestra en terminal
        logger.logError(this.name, actionName, error);

        throw error;
      }
    });
  }
  

}