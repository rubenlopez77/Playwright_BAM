import { Page } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { BaseComponent } from './base.component';

export class NavigationComponent extends BaseComponent {
    constructor(page: Page, world: CustomWorld) {
        super(page, world, { selector: 'body', name: 'Page body' });
    }

    async goto(url: string) {
        await this.page.goto(url);
    }

    async reload() {
        await this.page.reload();
    }
}