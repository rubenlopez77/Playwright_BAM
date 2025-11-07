import { setWorldConstructor } from '@cucumber/cucumber';
import { chromium, firefox, webkit, Browser, BrowserContext, Page } from 'playwright';
import { EnvConfig } from './env';
import { Logger } from './logger';

export class CustomWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  logger!: Logger;

  private queue: Array<() => Promise<void>> = [];
  private readonly pageInstances = new Map<string, any>();

  async init() {
    this.logger = new Logger(EnvConfig.LOG);

    const browserType =
      EnvConfig.BROWSER === 'firefox' ? firefox : EnvConfig.BROWSER === 'webkit' ? webkit : chromium;

    this.browser = await browserType.launch({ headless: EnvConfig.HEADLESS });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    if (EnvConfig.TRACE) {
      await this.context.tracing.start({ screenshots: true, snapshots: true });
    }

    await this.page.goto(EnvConfig.BASE_URL);
  }

  enqueue(action: () => Promise<void>) {
    this.queue.push(action);
  }

  async flush() {
    for (const action of this.queue) {
      try {
        await action();
      } catch (err) {
        console.error('Error in queued action:', err);
        throw err;
      }
    }
    this.queue = [];
  }

  async close() {
    try {
      await this.flush();
      if (EnvConfig.TRACE) await this.context.tracing.stop({ path: `reports/trace-${Date.now()}.zip` });
    } finally {
      await this.browser?.close();
    }
  }

  getPage<T>(PageClass: new (world: CustomWorld) => T): T {
    const key = PageClass.name;
    if (!this.pageInstances.has(key)) {
      this.pageInstances.set(key, new PageClass(this));
    }
    return this.pageInstances.get(key);
  }
}

setWorldConstructor(CustomWorld);
