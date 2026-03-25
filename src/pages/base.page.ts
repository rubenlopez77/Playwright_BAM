import { Page } from 'playwright/test';
import { CustomWorld } from '../support/world';
import { NavigationComponent } from '../components/navigation.component';

export abstract class BasePage {
  protected readonly navigation: NavigationComponent;

  constructor(
    protected readonly page: Page,
    protected readonly world: CustomWorld
  ) {
    this.navigation = new NavigationComponent(page, world);
  }

  protected async goto(url: string): Promise<void> {
    await this.navigation.goto(url);
  }

  async reload(): Promise<void> {
    await this.navigation.reload();
  }
}