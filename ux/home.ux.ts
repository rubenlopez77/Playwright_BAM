import { UxElement } from '../ux/ux-element';
/**
 * UX Map: Login Page
 * Artefacto declarativo que describe los elementos del flujo de login.
 */
export const HomeLocators = {
  MAIN_BANNER: { selector: '#carouselExampleIndicators', type: 'banner', description: 'Carrusel principal de portada' },
  NAVBAR: { selector: '.navbar-nav', type: 'navigation', description: 'Menú principal de navegación' },
} satisfies Record<string, UxElement>; 

