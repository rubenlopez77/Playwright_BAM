/**
 * Centralización de localizadores para HomePage.
 * Mejora la mantenibilidad y permite trazabilidad de elementos UI.
 */
import { ExecutionContext } from '../support/execution-context';
import { NavigationComponent } from '../components/navigation.component';
import { GenericComponent } from '../components/generic.component';
import { EnvConfig } from '../support/env';

export const HomeLocators = {
  MAIN_BANNER: { selector: '#carouselExampleIndicators', type: 'banner' } as const,
  NAVBAR: { selector: '.navbar-nav', type: 'navigation' } as const,
} as const;

export class HomePage {
  private readonly world: ExecutionContext;
  private readonly nav: NavigationComponent;
  private readonly mainBanner: GenericComponent;
  private readonly navbar: GenericComponent;

  constructor(world: ExecutionContext) {
    this.world = world;

    this.nav = new NavigationComponent(world, '', 'Navigator');
    this.mainBanner = new GenericComponent(world, HomeLocators.MAIN_BANNER.selector, 'MainBanner');
    this.navbar = new GenericComponent(world, HomeLocators.NAVBAR.selector, 'Navbar');
  }

   // Accedemos a la portada
  goHome() {
    this.nav.goto(EnvConfig.BASE_URL);
    this.mainBanner.waitVisible();
  }

  //Verifica que la página de inicio ha cargado correctamente
  expectLoaded() {
    this.mainBanner.waitVisible();
    this.navbar.waitVisible();
  }
}







