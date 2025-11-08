// src/components/visibility.component.ts
import { BaseComponent } from './base.component';

export class VisibilityComponent extends BaseComponent {

  visible(timeoutMs = 5000) {
    this.enqueue(async () => {
      const { page } = this.world;
      await page.waitForSelector(this.selector, {
        state: 'visible',
        timeout: timeoutMs
      });
    }, 'visible');
  }

  hidden(timeoutMs = 5000) {
    this.enqueue(async () => {
      const { page } = this.world;
      await page.waitForSelector(this.selector, {
        state: 'hidden',
        timeout: timeoutMs
      });
    }, 'hidden');
  }
}
