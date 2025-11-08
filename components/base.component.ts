import { ExecutionContext } from '../support/execution-context';

export abstract class BaseComponent {
  protected readonly world: ExecutionContext;
  protected readonly selector: string;
  protected readonly name: string;

  constructor(world: ExecutionContext, selector: string, name: string) {
    this.world = world;
    this.selector = selector;
    this.name = name;
  }

  /**
   * Método universal BAM v1.2 para ejecutar acciones de Component Layer.
   * - Centraliza logging (action + timing + error)
   * - Aísla await dentro del runner determinista
   * - Mantiene API declarativa sin await en Pages
   */
  protected run(actionName: string, actionFn: (page: any) => Promise<void>) {
    this.world.enqueue(async () => {
      const { page, logger } = this.world;
      const start = performance.now();

      try {
        await actionFn(page);

        const duration = performance.now() - start;

        // ✅ Guardar trazabilidad interna (JSON / métricas)
        logger.logAction(this.name, actionName, this.selector, duration, true);

        // ✅ ÚNICO log visible en consola
        logger.logTiming(this.name, actionName, duration, true);

      } catch (error) {
        const duration = performance.now() - start;

        // ❌ Guardar error para métricas
        logger.logAction(this.name, actionName, this.selector, duration, false);

        // ❌ Mostrar error en consola
        logger.logError(this.name, actionName, error);

        throw error;
      }
    });
  }

  /**
   * Verifica que un elemento visible contenga un texto esperado.
   */
  waitForText(expected: string, timeoutMs = 5000) {
    this.run(`waitForText("${expected}")`, async (page) => {
      const endTime = performance.now() + timeoutMs;
      let found = false;

      await page.waitForSelector(this.selector, { state: 'visible', timeout: timeoutMs });

      while (performance.now() < endTime) {
        const text = await page.textContent(this.selector);

        if (text?.includes(expected)) {
          found = true;
          break;
        }

        // Pequeño delay controlado, NO logic en Page Layer
        await page.waitForTimeout(150);
      }

      if (!found) {
        throw new Error(`Expected text "${expected}" not found in element ${this.selector}`);
      }
    });
  }

  /**
   * Verifica que el elemento tenga texto no vacío.
   */
  waitForNonEmptyText(timeoutMs = 3000) {
    this.run(`waitForNonEmptyText(${timeoutMs})`, async (page) => {
      await page.waitForFunction(
        (selector: string) => {
          const el = document.querySelector(selector);
          return !!el?.textContent?.trim()?.length;
        },
        this.selector,
        { timeout: timeoutMs }
      );
    });
  }
}
