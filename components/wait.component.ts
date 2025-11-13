/**
 * Componente genérico de solo validación.
 * Ideal para banners, contenedores o elementos estáticos.
 */
import { BaseComponent } from './base.component';

export class WaitComponent extends BaseComponent {

  waitVisible(timeoutMs = 5000) {
    this.run(`waitVisible(${timeoutMs})`, async (page) => {
      await page.waitForSelector(this.selector, { state: 'visible', timeout: timeoutMs });
    });
  }

  isVisible(timeoutMs = 500) {
    this.run(`isVisible(${timeoutMs})`, async (page) => {
      await page.waitForSelector(this.selector, { state: 'visible', timeout: timeoutMs });
    });
  }


    /**
   * Verifica que este componente visible contenga un texto esperado.
   */
  waitForText(expected: string, timeoutMs = 5000) {
    this.execute(`waitForText("${expected}")`, async (page) => {
      const endTime = performance.now() + timeoutMs;
      let found = false;

      await page.waitForSelector(this.selectorValue, {
        state: 'visible',
        timeout: timeoutMs
      });

      while (performance.now() < endTime) {
        const text = await page.textContent(this.selectorValue);

        if (text?.includes(expected)) {
          found = true;
          break;
        }

        await page.waitForTimeout(150);
      }

      if (!found) {
        throw new Error(
          `Expected text "${expected}" not found in element ${this.selectorValue}`
        );
      }
    });
  }

  /**
   * Verifica que este componente tenga texto no vacío.
   */
  waitForNonEmptyText(timeoutMs = 3000) {
    this.execute(`waitForNonEmptyText(${timeoutMs})`, async (page) => {
      await page.waitForFunction(
        (selector: string) => {
          const el = document.querySelector(selector);
          return !!el?.textContent?.trim()?.length;
        },
        this.selectorValue,
        { timeout: timeoutMs }
      );
    });
  }
}
