import { BaseHelper } from '../../support/baseHelper';
import { logger } from '../../support/logger';
import { expect } from '@playwright/test';

/**
 * UserPage actúa como fachada de alto nivel para operaciones del usuario,
 * delegando internamente en los mismos mecanismos de LoginPage (open, loginWith, etc.)
 * pero manteniendo la semántica de this.user.open(), this.user.loginWith(), etc.
 */
export class UserPage extends BaseHelper {
  /**
   * Abre la página principal definida en BASE_URL
   */
  open() {
    this.run(async () => {
      const url = process.env.BASE_URL!;
      if (process.env.LOG === 'true') logger.info(`🌍 [User] Navegando a: ${url}`);
      await this.page.goto(url, { waitUntil: 'domcontentloaded' });
      logger.info(`✅ [User] Página cargada: ${this.page.url()}`);
    });
  }

    goHome() {
    this.run(async () => {
      const url = process.env.BASE_URL!;
      if (process.env.LOG === 'true') logger.info(`🌍 [User] Navegando a: ${url}`);
      await this.page.goto(url, { waitUntil: 'domcontentloaded' });
   
    });
  }

  /**
   * Inicia sesión usando las credenciales dadas
   */
  loginWith(username: string, password: string) {
    this.run(async () => {
      if (process.env.LOG === 'true') logger.info(`🔐 [User] Iniciando sesión como ${username}...`);
      await this.page.click('#login2');
      await this.page.fill('#loginusername', username);
      await this.page.fill('#loginpassword', password);
      await this.page.click('button[onclick="logIn()"]');
    });
  }


  expectLoggedIn() {
    this.run(async () => {
      if (process.env.LOG === 'true') logger.info('🧾 [User] Verificando login visible...');
      await expect(this.page.locator('#nameofuser')).toBeVisible({ timeout: 10000 });
    });
  }
}
