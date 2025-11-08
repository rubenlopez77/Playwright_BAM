import { BaseComponent } from './base.component';

export class WaiterComponent extends BaseComponent {
  open() {
    this.enqueue(async () => {
      await this.world.page.click(this.selector);
      await this.world.page.waitForSelector('#logInModal', { state: 'visible' });
    }, 'open');
  }

  close() {
    this.enqueue(async () => {
      await this.world.page.click(`${this.selector} .btn-close`);
      await this.world.page.waitForSelector('#logInModal', { state: 'hidden' });
    }, 'close');
  }
}
