import { BaseComponent } from './base.component';
import { TodoItemComponent } from './todo-item.component';
import { expect } from '@playwright/test';

import { TodoLocators } from '../ux/todo.ux';

export class TodoListComponent extends BaseComponent {

    private createItem(locator = this.locator.first()): TodoItemComponent {
        return new TodoItemComponent(this.page, this.world, locator);
    }

    getItem(index: number): TodoItemComponent {
        return this.createItem(this.locator.nth(index));
    }

    async getItemByText(text: string): Promise<TodoItemComponent> {
        const normalized = text.trim();
        const candidates = this.locator.filter({
            has: this.page.locator(TodoLocators.LABEL.selector, { hasText: normalized }),
        });

        await expect(candidates, `Todo item "${normalized}" should exist`).toHaveCount(1);
        return this.createItem(candidates.first());
    }

    async count(): Promise<number> {
        return await this.locator.count();
    }

    async isEmpty(): Promise<boolean> {
        return (await this.count()) === 0;
    }

    async clearAll(): Promise<void> {
        while (await this.count()) {
            await this.deleteFirstItem();
        }

        await expect(this.locator).toHaveCount(0);
    }

    private async deleteFirstItem(): Promise<void> {
        const remaining = await this.count();
        const item = this.createItem();

        await item.delete();
        await expect(this.locator).toHaveCount(remaining - 1);
    }

    async expectIsEmpty(): Promise<void> {
        await expect(this.locator).toHaveCount(0);
    }

    async completeItem(text: string): Promise<void> {
        const item = await this.getItemByText(text);
        await item.toggle();
    }

    async verifyItemCompleted(text: string): Promise<void> {
        const item = await this.getItemByText(text);
        await item.expectCompleted();
    }

}
