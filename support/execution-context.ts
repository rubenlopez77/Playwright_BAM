import { setWorldConstructor } from '@cucumber/cucumber';
import { chromium, firefox, webkit, Browser, BrowserContext, Page } from 'playwright';
import { EnvConfig } from './env';
import { Logger } from './logger';

export class ExecutionContext {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  logger!: Logger;

  private queue: Array<() => Promise<void>> = [];
  private readonly pageInstances = new Map<string, any>();

  async init() {
    this.logger = new Logger(EnvConfig.LOG);

    const browserMap: Record<string, any> = { firefox, webkit, chromium };
    const browserType = browserMap[EnvConfig.BROWSER] ?? chromium;

    this.browser = await browserType.launch({ headless: EnvConfig.HEADLESS });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    if (EnvConfig.TRACE) {
      await this.context.tracing.start({ screenshots: true, snapshots: true });
    }

    await this.page.goto(EnvConfig.BASE_URL);
  }

  /**
   * Encola una acción asincrónica para su ejecución secuencial.
   * No se ejecuta inmediatamente; se procesa en flush().
   */
  enqueue(action: () => Promise<void>) {
    this.queue.push(action);
  }

  /**
   * Ejecuta secuencialmente todas las acciones encoladas.
   * - Mide tiempos y registra errores.
   * - Si alguna acción falla, se re-lanza el error para que Cucumber marque el step como FAILED.
   */
    async flush() {
      let lastError: any = null;

      for (const action of this.queue) {
        try {
          await action();
        } catch (err) {
          lastError = err;
          break;
        }
      }

      this.queue = [];

      if (lastError) throw lastError;
    }

  /**
   * Cierra el navegador y finaliza el contexto de ejecución.
   * Incluye el cierre de la traza Playwright si está activa.
   */
  async close() {
    try {
      await this.flush();
      if (EnvConfig.TRACE) {
        await this.context.tracing.stop({ path: `reports/trace-${Date.now()}.zip` });
      }
    } finally {
      await this.browser?.close();
    }
  }

  /**
   * Obtiene una instancia singleton de una Page Object.
   * Si no existe, la crea y la cachea para este contexto.
   */
  getPage<T>(PageClass: new (world: ExecutionContext) => T): T {
    const key = PageClass.name;
    if (!this.pageInstances.has(key)) {
      this.pageInstances.set(key, new PageClass(this));
    }
    return this.pageInstances.get(key);
  }
}

// Define este ExecutionContext como World de Cucumber
setWorldConstructor(ExecutionContext);
