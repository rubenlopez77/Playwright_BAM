import { BaseComponent } from './base.component';

export class NavigationComponent extends BaseComponent {

  goto(url: string) {
    this.run(`goto("${url}")`, async (page) => {
      await page.goto(url);
    });
  }

  waitFor(selector: string, timeoutMs = 5000) {
    this.run(`waitFor("${selector}")`, async (page) => {
      await page.waitForSelector(selector, { state: 'visible', timeout: timeoutMs });
    });
  }
}
