/**
 * Components layer (in addition to Page Objects)
 *
 * Components encapsulate small, reusable UI building blocks (locators + actions + assertions).
 * This reduces duplication, limits the blast radius of UI changes, and keeps Pages focused on
 * higher-level flows. It also creates a clean place to standardize logging/telemetry later.
 * 
 * Each component action can emit a structured JSON event (what action, on which element, 
 * input data, result, duration) and attach evidence (screenshots / DOM snapshots). 
 * With this, it is easy to build consistent reports and quality metrics without adding 
 * logging code inside steps.
 */

import { Locator, Page, expect } from 'playwright/test';
import { CustomWorld } from '../support/world';
import { UiElementDefinition } from '../ux/ux.types';

export abstract class BaseComponent {
    protected locator: Locator;

    constructor(
        protected page: Page,
        protected world: CustomWorld,
        target: UiElementDefinition | Locator
    ) {
        if (this.isUiElementDefinition(target)) {
            this.locator = page.locator(target.selector);
            return;
        }

        this.locator = target;
    }

    private isUiElementDefinition(target: UiElementDefinition | Locator): target is UiElementDefinition {
        return 'selector' in target;
    }

    async isVisible(): Promise<boolean> {
        return await this.locator.isVisible();
    }

    async expectVisible(options?: { timeout?: number }) {
        await expect(this.locator).toBeVisible(options);
    }

    async expectVisibleSoft(options?: { timeout?: number }) {
        await expect.soft(this.locator).toBeVisible(options);
    }

    async waitReady() {
        await this.locator.waitFor({ state: 'visible' });
    }
}
