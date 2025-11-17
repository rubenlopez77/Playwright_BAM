/**
 * Componente genérico de solo validación.
 * Ideal para banners, contenedores o elementos estáticos.
 */
import { BaseComponent } from './base.component';



export class WaitComponent extends BaseComponent {

  readonly timeout = Number(process.env.CUCUMBER_TIMEOUT);
  
  waitVisible() {
    this.run('waitVisible', async (page) => {
      await page.waitForSelector(this.selector, { 
        state: 'visible', 
        timeout: this.timeout 
      });
    });
  }


  waitNotVisible() {
    this.run(`waitNotVisible`, async (page) => {
      await page.waitForSelector(this.selector, { state: 'hidden', timeout:  this.timeout  });
    });
  }

    /**
   * Verifica que este componente visible contenga un texto esperado.
   */
  waitForText(expected: string) {
    this.execute(`waitForText("${expected}")`, async (page) => {
      const endTime = performance.now() +  this.timeout ;
      let found = false;

      await page.waitForSelector(this.selectorValue, {
        state: 'visible',
        timeout: this.timeout
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
  waitForNonEmptyText() {
      this.run(`waitForNonEmptyText`, async (page) => {
      await page.waitForFunction(
        (selector: string) => {
          const el = document.querySelector(selector);
          return !!el?.textContent?.trim()?.length;
        },
        this.selectorValue,
        { timeout: this.timeout }
      );
    });
  }
}
