// support/world.ts
import { setWorldConstructor } from "@cucumber/cucumber";
import { chromium, firefox, webkit } from "playwright";

import { EnvConfig } from "./env";
import { BamLogger } from "./logger/bam.logger";
import { BamTracer } from "./logger/bam.tracer";

//
// -----------------------------------------------------------------------------
// EXECUTION CONTEXT (Core runtime for BAM)
// -----------------------------------------------------------------------------
export class ExecutionContext {

  browser!: any;
  context!: any;
  page!: any;

  // 🔹 Ahora el tracer tiene tipo concreto (no interfaz)
  tracer!: BamTracer;

  browserName!: string;
  workerId!: number;

  private queue: Array<() => Promise<void>> = [];
  private initialized = false;
  private readonly pageInstances = new Map<string, any>();

  constructor(browserName: string, workerId: number) {
    this.browserName = browserName;
    this.workerId = workerId;
  }

  async init() {
    if (this.initialized) return;

    // Inyección de implementación real
    this.tracer = new BamTracer(this.browserName, this.workerId);

    const map = { chromium, firefox, webkit };
    const type = map[this.browserName] ?? chromium;

    this.browser = await type.launch({ headless: EnvConfig.HEADLESS });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    await this.page.goto(EnvConfig.BASE_URL);

    this.initialized = true;
  }

  enqueue(fn: () => Promise<void>) {
    this.queue.push(fn);
  }

  async flush() {
    for (const fn of this.queue) await fn();
    this.queue = [];
  }

  async close() {
    await this.flush();
    await this.browser?.close();
    this.initialized = false;
  }

  getPage<T>(PageClass: new (ctx: ExecutionContext) => T): T {
    const key = PageClass.name;
    if (!this.pageInstances.has(key)) {
      this.pageInstances.set(key, new PageClass(this));
    }
    return this.pageInstances.get(key)!;
  }

  // Compatibilidad hacia atrás: this.logger sigue funcionando
  get logger(): BamTracer {
    return this.tracer;
  }
}

//
// -----------------------------------------------------------------------------
// EXECUTION CONTEXT FACTORY (Singleton per worker)
// -----------------------------------------------------------------------------
export class ExecutionContextFactory {
  private static instance: ExecutionContext | null = null;

  static wasInitialized(): boolean {
    return this.instance !== null;
  }

  static async getOrCreate(): Promise<ExecutionContext> {
    if (!this.instance) {
      const workerId = Number(process.env.CUCUMBER_WORKER_ID ?? "0");
      const browser = EnvConfig.BROWSER[workerId] ?? EnvConfig.MAIN_BROWSER;

      BamLogger.printWorkerInit(workerId, browser);

      const ctx = new ExecutionContext(browser, workerId);
      await ctx.init();

      this.instance = ctx;
    }

    return this.instance;
  }

  static getCurrent(): ExecutionContext {
    if (!this.instance) throw new Error("ExecutionContext not initialized");
    return this.instance;
  }

  static async close() {
    if (!this.instance) return;
    await this.instance.close();
    this.instance = null;
  }
}

//
// -----------------------------------------------------------------------------
// BAM WORLD (Cucumber World)
// -----------------------------------------------------------------------------

export class BamCucumberWorld {

  private _ctx?: ExecutionContext;

  // NOSONAR — Cucumber exige constructor síncrono vacío
  constructor() {}

  async init() {
    this._ctx = await ExecutionContextFactory.getOrCreate();
  }

  get context(): ExecutionContext {
    if (!this._ctx) throw new Error("ExecutionContext not initialized");
    return this._ctx;
  }

  get page() { return this.context.page; }

  // 🔹 Nuevo acceso explícito
  get tracer() { return this.context.tracer; }

  // 🔹 Compatibilidad hacia atrás
  get logger() { return this.context.tracer; }

  get browserName() { return this.context.browserName; }
  get workerId() { return this.context.workerId; }

  enqueue(fn: () => Promise<void>) { this.context.enqueue(fn); }
  flush() { return this.context.flush(); }

  getPage<T>(PageClass: new (ctx: ExecutionContext) => T): T {
    return this.context.getPage(PageClass);
  }
}

//
// Alias de compatibilidad
//
export { BamCucumberWorld as BamWorld };

setWorldConstructor(BamCucumberWorld);
