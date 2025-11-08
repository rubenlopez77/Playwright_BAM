import { BaseComponent } from './base.component';

export class ModalComponent extends BaseComponent {

  open() {
    this.run('open', async (page) => {
      await page.click(this.selector);
    });
  }

  waitVisible(timeoutMs = 5000) {
    this.run(`waitVisible(${timeoutMs})`, async (page) => {
      await page.waitForSelector(this.selector, { state: 'visible', timeout: timeoutMs });
    });
  }
}
