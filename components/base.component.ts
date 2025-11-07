import { CustomWorld } from '../support/world';

export abstract class BaseComponent {
  protected world: CustomWorld;
  protected selector: string;
  protected name: string;

  constructor(world: CustomWorld, selector: string, name: string) {
    this.world = world;
    this.selector = selector;
    this.name = name;
  }

  protected enqueue(action: () => Promise<void>, actionName: string) {
    this.world.enqueue(async () => {
      const start = performance.now();
      try {
        await action();
        const duration = performance.now() - start;
        this.world.logger.logAction(this.name, actionName, this.selector, duration, true);
      } catch (error) {
        this.world.logger.logError(this.name, actionName, error);
        throw error;
      }
    });
  }
}
