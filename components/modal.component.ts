import { BaseComponent } from './base.component';

export class ModalComponent extends BaseComponent {
    /**
   * Abnre el modal y espera a que esté visible en la página
   * Llama internamente a waitVisible()
   */
   open() {
    this.run('open', async (page) => {
      await page.click(this.selector);
    });

    
    this.waitVisible();
  }
    /**
   * Espera implícita de visibilidad.
   * Garantiza que el elemento esté visible antes de interactuar sin usar esperas explícitas.
   */
  waitVisible(timeoutMs = 5000) {
    this.run(`waitVisible(${timeoutMs})`, async (page) => {
      await page.waitForSelector(this.selector, { state: 'visible', timeout: timeoutMs });
    });
  }
}
