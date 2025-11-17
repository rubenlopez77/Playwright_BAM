/**
 * Centralización de localizadores para HomePage.
 * Mejora la mantenibilidad y permite trazabilidad de elementos UI.
 * Para este ejemplo se separa intencionadamente Login de Home por cuestiones demostrativas.
 */
import { ExecutionContext } from '../support/execution-context';
import { NavigationComponent } from '../components/navigation.component';
import { WaitComponent } from '../components/wait.component';
import { EnvConfig } from '../support/env';
import { HomeLocators } from '../ux/home.ux'; 
export class HomePage {
  constructor(
    private readonly context: ExecutionContext,
    private readonly nav = new NavigationComponent(context, '', 'Navigator'),
    private readonly mainBanner = new WaitComponent(context, HomeLocators.MAIN_BANNER.selector, 'MainBanner'),
    private readonly navbar = new WaitComponent(context, HomeLocators.NAVBAR.selector, 'Navbar')
  ) {}

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







