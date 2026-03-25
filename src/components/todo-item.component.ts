import { BaseComponent } from './base.component';
import { Page, Locator, expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

import { TodoLocators } from '../ux/todo.ux';

export class TodoItemComponent extends BaseComponent {
    private readonly toggleLocator: Locator;
    private readonly destroyLocator: Locator;
    private readonly labelLocator: Locator;

    constructor(page: Page, world: CustomWorld, locator: Locator) {
        super(page, world, locator);
        this.toggleLocator = this.locator.locator(TodoLocators.TOGGLE.selector);
        this.destroyLocator = this.locator.locator(TodoLocators.DESTROY.selector);
        this.labelLocator = this.locator.locator(TodoLocators.LABEL.selector);
    }

    async toggle() {
        await this.toggleLocator.check();
    }

    async isCompleted(): Promise<boolean> {
        return await this.toggleLocator.isChecked();
    }

    async expectCompleted() {
        await expect(this.toggleLocator).toBeChecked();
    }

    async delete() {
        await this.locator.hover();
        await expect(this.destroyLocator).toBeVisible();
        await this.destroyLocator.click();
    }

    async getText(): Promise<string> {
        return (await this.labelLocator.textContent()) || '';
    }
}
