import { logger } from '@support/logger';
import {
  chromium,
  firefox,
  webkit,
  type Browser,
  type BrowserContext,
  type Page,
  devices,
} from '@playwright/test';



export class DriverFactory {
  private static browser: Browser | undefined;
  private static isClosing = false;

  private static async launchBrowser(): Promise<Browser> {
    if (DriverFactory.browser) return DriverFactory.browser;

    const browserName = process.env.BROWSER ?? 'chromium';
    const headless = (process.env.HEADLESS ?? 'true') === 'true';
    const slowMo = process.env.SLOWMO ? Number(process.env.SLOWMO) : 100;
    logger.info(`🚀 Browser: ${browserName} | headless=${headless} | slowMo=${slowMo}`);

    switch (browserName) {
      case 'firefox':
        DriverFactory.browser = await firefox.launch({ headless, slowMo });
        break;
      case 'webkit':
        DriverFactory.browser = await webkit.launch({ headless, slowMo });
        break;
      default:
        DriverFactory.browser = await chromium.launch({ headless, slowMo });
        break;
    }

    return DriverFactory.browser;
  }

  static async createContext(): Promise<{ context: BrowserContext; page: Page }> {
    const browser = await DriverFactory.launchBrowser();
    const context = await browser.newContext({
      ...devices['Desktop Chrome'],
      viewport: { width: 1920, height: 1080 },
    });
    const page = await context.newPage();

    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    logger.info(`✅ Contexto y página creados (ID: ${id}) - URL inicial: ${page.url()}`);
    return { context, page };
  }

  // 🧩 Espera a que no se esté cerrando
  static async safeWait(ms = 250) {
    if (DriverFactory.isClosing) {
      logger.info('⏳ Esperando a que termine el cierre del navegador...');
      while (DriverFactory.isClosing) {
        await new Promise(r => setTimeout(r, ms));
      }
    }
  }

  static async closeBrowser(): Promise<void> {
    const browser = DriverFactory.browser;
    if (!browser) {
      logger.info('🟡 Ningún navegador activo, nada que cerrar.');
      return;
    }

    try {
      DriverFactory.isClosing = true;

      if (typeof browser.isConnected === 'function' && !browser.isConnected()) {
        logger.info('⚙️ El navegador ya estaba cerrado o desconectado.');
        DriverFactory.browser = undefined;
        DriverFactory.isClosing = false;
        return;
      }

      await browser.close();
      logger.info('🚪 Navegador cerrado correctamente.');
      DriverFactory.browser = undefined;
    } catch (err: any) {
      console.warn('⚠️ Error cerrando navegador:', err.message);
    } finally {
      DriverFactory.isClosing = false;
    }
  }
}
