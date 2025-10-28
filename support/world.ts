import { logger } from './logger';
import { setWorldConstructor } from '@cucumber/cucumber';
import { BrowserContext, Page } from '@playwright/test';
import { DriverFactory } from './driverFactory';
import { PageFactory } from './pageFactory';

export class CustomWorld {
  page!: Page;
  context!: BrowserContext;
  pages!: PageFactory;

  async init() {
    const { context, page } = await DriverFactory.createContext();
    this.context = context;
    this.page = page;
    this.pages = new PageFactory(page);
    logger.info(`🌍 World constructor ejecutado: CustomWorld ID ${Math.random().toString(36).slice(2, 6)}`);
  }
}

setWorldConstructor(CustomWorld);
