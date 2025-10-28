// support/world.ts
import { setWorldConstructor, World } from '@cucumber/cucumber';
import { PageFactory } from './pageFactory';
import { DriverFactory } from './driverFactory';
import { logger } from './logger';

export class CustomWorld extends World {
  browser: any;
  context: any;
  page: any;
  // 👇 añade esta línea
  pages!: Record<string, any>;

  async init() {
    this.browser = await DriverFactory.getBrowser();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    const factory = new PageFactory(this.page);

    // guarda referencia para cleanup (flush, etc.)
    this.pages = factory;

    // y además inyecta acceso directo: this.login, this.home, etc.
    Object.assign(this, factory);

    if (process.env.LOG === 'true') {
      logger.info('🌍 World inicializado con inyección directa de páginas');
    }
  }

  async cleanup() {
    try {
      // espera a que terminen tareas pendientes de todas las pages
      if (this.pages) {
        for (const [name, pageInstance] of Object.entries(this.pages)) {
          if (typeof (pageInstance as any).flush === 'function') {
            await (pageInstance as any).flush();
          }
        }
      }
      await new Promise(r => setTimeout(r, 200));
      await this.context?.close();
      if (process.env.LOG === 'true') logger.info('🧹 Contexto cerrado correctamente.');
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.warn(`⚠️ Error al cerrar contexto: ${msg}`);
    }
  }
}

setWorldConstructor(CustomWorld);
