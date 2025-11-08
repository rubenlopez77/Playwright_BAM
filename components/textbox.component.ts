import { BaseComponent } from './base.component';

export class TextboxComponent extends BaseComponent {

  fill(value: string) {
    this.run(`fill("${value}")`, async (page) => {
      await page.fill(this.selector, value);
    });
  }

  clear() {
    this.run('clear', async (page) => {
      await page.fill(this.selector, '');
    });
  }
}
