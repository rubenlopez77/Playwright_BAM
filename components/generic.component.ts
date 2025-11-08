/**
 * Componente genérico de solo validación.
 * Ideal para banners, contenedores o elementos estáticos.
 */
import { BaseComponent } from './base.component';

export class GenericComponent extends BaseComponent {

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
}
