// support/world.ts
import { setWorldConstructor } from '@cucumber/cucumber';
import { chromium, firefox, webkit, Browser, BrowserContext, Page } from 'playwright';
import { EnvConfig } from './env';
import { BamTracer } from './logger/bam.tracer';
import { BamLogger } from './logger/bam.logger';

// =======================================================================
//                      EXECUTION CONTEXT (por worker)
// =======================================================================

export class ExecutionContext {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  readonly browserName: string;
  readonly logger: BamTracer;

  private queue: Array<() => Promise<void>> = [];
  private readonly pageInstances = new Map<string, any>();
  private initialized = false;

  constructor(browserName: string) {
    this.browserName = browserName;
    this.logger = new BamTracer(browserName);
  }

  // Ejecutado 1 vez por worker
  async init() {
    if (this.initialized) return;

    const browserMap: Record<string, any> = { chromium, firefox, webkit };
    const browserType = browserMap[this.browserName] ?? chromium;

    // Logging opcional del worker
    if (BamLogger.enabled) {
      BamLogger.printWorkerInit(Number(process.env.CUCUMBER_WORKER_ID ?? 0), this.browserName);
    }

    this.browser = await browserType.launch({ headless: EnvConfig.HEADLESS });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    // Navegación inicial
    await this.page.goto(EnvConfig.BASE_URL);

    this.initialized = true;
  }

  enqueue(action: () => Promise<void>) {
    this.queue.push(action);
  }

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

  async close() {
    if (!this.initialized) return;

    try {
      await this.flush();
    } finally {
      await this.browser?.close();
      this.initialized = false;
    }
  }

  getPage<T>(PageClass: new (ctx: ExecutionContext) => T): T {
    const key = PageClass.name;

    if (!this.pageInstances.has(key)) {
      this.pageInstances.set(key, new PageClass(this));
    }

    return this.pageInstances.get(key);
  }
}

// =======================================================================
//                   FACTORY (1 ExecutionContext por worker)
// =======================================================================

export class ExecutionContextFactory {
  private static instance: ExecutionContext | null = null;

  static async getOrCreate(): Promise<ExecutionContext> {
    if (this.instance) return this.instance;

    const workerId = Number(process.env.CUCUMBER_WORKER_ID ?? '0');

    const browser =
      EnvConfig.BROWSER[workerId] ??
      EnvConfig.MAIN_BROWSER ??
      'chromium';

    const ctx = new ExecutionContext(browser);
    await ctx.init();

    this.instance = ctx;
    return ctx;
  }

  static getCurrent(): ExecutionContext {
    if (!this.instance) {
      throw new Error('ExecutionContext no inicializado.');
    }
    return this.instance;
  }

  static wasInitialized(): boolean {
    return this.instance !== null;
  }

  static async close(): Promise<void> {
    if (this.instance) {
      await this.instance.close();
      this.instance = null;
    }
  }
}

// =======================================================================
//                    BAM WORLD (por escenario)
// =======================================================================

export class BamWorld {
  private _context?: ExecutionContext;

  // NOSONAR - Cucumber necesita constructor explícito
  constructor() {
    /*  
      El World de Cucumber necesita un constructor síncrono explícito
      para que el runner pueda instanciarlo correctamente.
      La inicialización real debe hacerse en hooks async, 
      por eso el constructor queda vacío por diseño.
      Es parte del modelo de ejecución del framework.
    */
  }

  async init(): Promise<void> {
    this._context = await ExecutionContextFactory.getOrCreate();
  }

  get context(): ExecutionContext {
    if (!this._context) {
      throw new Error('ExecutionContext no está inicializado (falta Before hook).');
    }
    return this._context;
  }

  get page(): Page {
    return this.context.page;
  }

  get logger(): BamTracer {
    return this.context.logger;
  }

  enqueue(fn: () => Promise<void>) {
    this.context.enqueue(fn);
  }

  async flush(): Promise<void> {
    await this.context.flush();
  }

  getPage<T>(PageClass: new (ctx: ExecutionContext) => T): T {
    return this.context.getPage(PageClass);
  }
}

// Registrar BamWorld como World de Cucumber
setWorldConstructor(BamWorld as any);
