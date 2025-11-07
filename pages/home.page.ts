import { CustomWorld } from '../support/world';
import { GenericComponent } from '../components/generic.component';
import { EnvConfig } from '../support/env';

/**
 * Centralización de localizadores para HomePage.
 * Mejora la mantenibilidad y permite trazabilidad de elementos UI.
 */
export const HomeLocators = {
  MAIN_BANNER: { selector: '#carouselExampleIndicators', type: 'banner' } as const,
  NAVBAR: { selector: '.navbar-nav', type: 'navigation' } as const,
} as const;

/**
 * Page Object: HomePage
 * Encapsula las acciones del inicio de Demoblaze.
 * Usa componentes reutilizables y logging trazable.
 */
export class HomePage {
  private readonly world: CustomWorld;
  private readonly mainBanner: GenericComponent;
  private readonly navbar: GenericComponent;

  constructor(world: CustomWorld) {
    this.world = world;
    this.mainBanner = new GenericComponent(world, HomeLocators.MAIN_BANNER.selector, 'MainBanner');
    this.navbar = new GenericComponent(world, HomeLocators.NAVBAR.selector, 'Navbar');
  }

  /** Navega a la página principal */
  goHome() {
    this.world.enqueue(async () => {
      const start = performance.now();

      await this.world.page.goto(EnvConfig.BASE_URL);
      await this.world.page.waitForSelector(HomeLocators.MAIN_BANNER.selector, { state: 'visible' });

      const duration = performance.now() - start;
      this.world.logger.logAction(
        'HomePage',
        'navigateToHome',
        HomeLocators.MAIN_BANNER.selector,
        duration,
        true
      );
    });
  }

  /** Verifica que la página de inicio ha cargado correctamente */
  expectLoaded() {
    this.world.enqueue(async () => {
      const bannerVisible = await this.world.page.isVisible(HomeLocators.MAIN_BANNER.selector);
      const navbarVisible = await this.world.page.isVisible(HomeLocators.NAVBAR.selector);

      const success = bannerVisible && navbarVisible;

      this.world.logger.logAction(
        'HomePage',
        'expectLoaded',
        `${HomeLocators.MAIN_BANNER.selector}, ${HomeLocators.NAVBAR.selector}`,
        0,
        success
      );

      if (!success) {
        throw new Error('Home page did not load correctly (missing banner or navbar).');
      }
    });
  }
}
