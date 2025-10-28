import { Page, expect } from '@playwright/test';
import { BaseHelper } from '../../support/baseHelper';
import { logger } from '../../support/logger';

export class LoginPage extends BaseHelper {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    const url = process.env.BASE_URL || 'https://www.demoblaze.com';
    logger.info(`🌍 Navegando a: ${url}`);

    if (this.page.isClosed()) {
      console.warn('⚠️ Intento de navegar con página cerrada — abortando.');
      return;
    }

    try {
      await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      logger.info(`✅ Página cargada: ${this.page.url()}`);
    } catch (err: any) {
      console.warn(`⚠️ Error en goto: ${err.message}`);
      console.warn(`📄 URL actual: ${this.page.url()}`);
    }
  }

  async login(username: string, password: string) {
    logger.info(`🔐 Iniciando sesión como ${username}...`);
    await this.page.click('#login2');
    await this.page.fill('#loginusername', username);
    await this.page.fill('#loginpassword', password);
    await this.page.click('button[onclick="logIn()"]');
  }

  async expectLoggedIn() {
  
  }
}
