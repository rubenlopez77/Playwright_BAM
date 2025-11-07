import { BaseComponent } from './base.component';

/**
 * Componente genérico de solo validación o presencia visual.
 * Ideal para banners, contenedores o elementos estáticos.
 */
export class GenericComponent extends BaseComponent {
  async isVisible(): Promise<void> {
    this.enqueue(async () => {
      await this.world.page.waitForSelector(this.selector, { state: 'visible' });
    }, 'isVisible');
  }
}
