import { chromium, firefox, webkit, Browser, BrowserContext } from '@playwright/test';
import { logger } from './logger';

export class DriverFactory {
  private static browser: Browser | null = null;

  static async getBrowser(): Promise<Browser> {
    if (this.browser?.isConnected()) {
      return this.browser;
    }

    const browserName = process.env.BROWSER || 'chromium';
    const headless = process.env.HEADLESS !== 'false';
    const slowMo = Number(process.env.SLOWMO ?? 0);

    if (process.env.LOG === 'true') {
      logger.info(`🚀 Browser: ${browserName} | headless=${headless} | slowMo=${slowMo}`);
    }

    switch (browserName) {
      case 'firefox':
        this.browser = await firefox.launch({ headless, slowMo });
        break;
      case 'webkit':
        this.browser = await webkit.launch({ headless, slowMo });
        break;
      default:
        this.browser = await chromium.launch({ headless, slowMo });
        break;
    }

    return this.browser;
  }

  /**
   * Crea un nuevo contexto de navegador (para cada escenario).
   */
  static async createContext(): Promise<BrowserContext> {
    const browser = await this.getBrowser();
    const context = await browser.newContext();

    if (process.env.LOG === 'true') {
      logger.info(`✅ Contexto creado (ID: ${Date.now()})`);
    }

    return context;
  }

  /**
   * Cierra el navegador si está activo.
   */
  static async closeBrowser(): Promise<void> {
    if (!this.browser) {
      if (process.env.LOG === 'true') logger.info('🟡 Ningún navegador activo, nada que cerrar.');
      return;
    }

    if (this.browser.isConnected()) {
      try {
        await this.browser.close();
        if (process.env.LOG === 'true') logger.info('🚪 Navegador cerrado correctamente.');
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        logger.warn(`⚠️ Error al cerrar el navegador: ${message}`);
      } finally {
        this.browser = null;
      }
    } else {
      if (process.env.LOG === 'true') logger.info('⚙️ El navegador ya estaba cerrado o desconectado.');
      this.browser = null;
    }
  }
}
