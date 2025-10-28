import { expect, Page } from '@playwright/test';
import { BaseHelper } from '../../support/baseHelper';
import { logger } from '../../support/logger';

export class HomePage extends BaseHelper {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Abre la página principal definida en las variables de entorno.
   */
  async open() {
    const url = process.env.BASE_URL || 'https://www.demoblaze.com/';
    logger.info(`🌍 Navegando a: ${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });

    // Esperar a que el elemento clave esté visible para confirmar carga
    await expect(this.page.locator('#login2')).toBeVisible({ timeout: 10000 });
    logger.info(`✅ Página cargada: ${this.page.url()}`);
  }

  /**
   * Comprueba si el usuario ya está logueado.
   */
  async isLoggedIn() {
    const logoutVisible = await this.page.locator('#logout2').isVisible().catch(() => false);
    return logoutVisible;
  }

  /**
   * Hace logout si el usuario está logueado.
   */
  async logoutIfNeeded() {
    const loggedIn = await this.isLoggedIn();
    if (loggedIn) {
      logger.info('🚪 Cerrando sesión actual...');
      await this.page.click('#logout2');
      await expect(this.page.locator('#login2')).toBeVisible({ timeout: 10000 });
      logger.info('✅ Sesión cerrada correctamente.');
    }
  }

  /**
   * Verifica que el nombre de usuario se muestra en la barra superior.
   */
  async expectUserVisible(username: string) {
    const userLocator = this.page.locator('#nameofuser');
    await expect(userLocator).toContainText(username, { timeout: 15000 });
    logger.info(`👤 Usuario visible en barra: ${username}`);
  }
}
