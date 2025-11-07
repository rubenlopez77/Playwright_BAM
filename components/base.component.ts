import { CustomWorld } from '../support/world';

export abstract class BaseComponent {
  protected readonly world: CustomWorld;
  protected readonly selector: string;
  protected readonly name: string;

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

  /**
   * Espera a que un elemento visible contenga un texto esperado.
   * Evita falsos negativos en validaciones de contenido dinámico.
   */
  waitForText(expected: string, timeoutMs = 5000) {
    this.enqueue(async () => {
      const { page } = this.world;
      const start = performance.now();
      const endTime = start + timeoutMs;

      await page.waitForSelector(this.selector, { state: 'visible' });

      let success = false;
      while (performance.now() < endTime) {
        const text = await page.textContent(this.selector);
        if (text && text.includes(expected)) {
          success = true;
          break;
        }
        await page.waitForTimeout(250);
      }

      const duration = performance.now() - start;
      this.world.logger.logAction(
        this.name,
        `waitForText("${expected}")`,
        this.selector,
        duration,
        success
      );

      if (!success) {
        throw new Error(`Expected text "${expected}" not found in element ${this.selector}`);
      }
    }, `waitForText("${expected}")`);
  }
}
