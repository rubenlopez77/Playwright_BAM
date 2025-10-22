import {  Page } from '@playwright/test';

export class Home {
     constructor(private readonly page: Page) {}

  /// <summary>                   
  /// Navega a la home
  /// </summary>
  public async goto(): Promise<void> {
    await this.page.goto('/');
  }

}
