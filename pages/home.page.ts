/**
 * Centralización de localizadores para HomePage.
 * Mejora la mantenibilidad y permite trazabilidad de elementos UI.
 */
import { ExecutionContext } from '../support/execution-context';
import { NavigationComponent } from '../components/navigation.component';
import { WaitComponent } from '../components/wait.component';
import { EnvConfig } from '../support/env';
import { HomeLocators } from '../ux/home.ux'; 


export class HomePage {
  private readonly context: ExecutionContext;
  private readonly nav: NavigationComponent;
  private readonly mainBanner: WaitComponent;
  private readonly navbar: WaitComponent;


  constructor(world: ExecutionContext) {
    this.context = world;
    this.nav = new NavigationComponent(world, '', 'Navigator');
    this.mainBanner = new WaitComponent(world, HomeLocators.MAIN_BANNER.selector, 'MainBanner');
    this.navbar = new WaitComponent(world, HomeLocators.NAVBAR.selector, 'Navbar');
  }

   // Accedemos a la portada
  goHome() {
    this.nav.goto(EnvConfig.BASE_URL);
  }

  //Verifica que la página de inicio ha cargado correctamente
  expectLoaded() {
    this.mainBanner.waitVisible();
    this.navbar.waitVisible();

  }
}







