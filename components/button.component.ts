import { BaseComponent } from './base.component';

export class ButtonComponent extends BaseComponent {

  click() {
    this.run('click()', async (page) => {
      await page.click(this.selector);
    });
  }
}
