import { BaseComponent } from './base.component';

export class TextboxComponent extends BaseComponent {
  fill(value: string) {
    this.enqueue(async () => {
      await this.world.page.fill(this.selector, value);
    }, `fill("${value}")`);
  }
}
