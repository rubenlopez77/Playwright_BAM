import { Page } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { TodoLocators } from '../ux/todo.ux';
import { TextboxComponent } from '../components/textbox.component';
import { TextComponent } from '../components/text.component';
import { TodoListComponent } from '../components/todo-list.component';
import { BasePage } from './base.page';

export class TodoPage extends BasePage {
    private readonly inputBox: TextboxComponent;
    private readonly todoItems: TodoListComponent;
    private readonly todoCount: TextComponent;

    constructor(page: Page, world: CustomWorld) {
        super(page, world);

        this.inputBox = new TextboxComponent(page, world, TodoLocators.INPUT_BOX);
        this.todoItems = new TodoListComponent(page, world, TodoLocators.TODO_ITEMS);
        this.todoCount = new TextComponent(page, world, TodoLocators.TODO_COUNT);
    }

    async addTask(text: string) {
        await this.inputBox.fill(text);
        await this.inputBox.press('Enter');
    }

    async completeTask(text: string) {
        await this.todoItems.completeItem(text);
    }

    async verifyExpectedText(text: string) {
        await this.todoCount.expectText(text);
    }

    async verifyTaskCompleted(text: string) {
        await this.todoItems.verifyItemCompleted(text);
    }

    async deleteAllTasks() {
        await this.todoItems.clearAll();
    }

    async shouldBeEmpty() {
        await this.todoItems.expectIsEmpty();
    }
}
