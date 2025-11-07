import { CustomWorld } from '../support/world';
import { GenericComponent } from '../components/generic.component';
import { EnvConfig } from '../support/env';

export class HomePage {
  private world: CustomWorld;
  private mainBanner: GenericComponent;

  constructor(world: CustomWorld) {
    this.world = world;
    this.mainBanner = new GenericComponent(world, '#carouselExampleIndicators', 'MainBanner');
  }

  goHome() {
    this.world.enqueue(async () => {
      await this.world.page.goto(EnvConfig.BASE_URL);
      this.world.logger.logAction('HomePage', 'navigate', EnvConfig.BASE_URL, 0, true);
    });
  }

  expectLoaded() {
    this.mainBanner.isVisible();
  }
}
