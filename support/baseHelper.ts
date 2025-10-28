import type { Page } from '@playwright/test';

export abstract class BaseHelper {
  protected readonly page: Page;
  private static promiseChain: Promise<void> = Promise.resolve();

  constructor(page: Page) {
    this.page = page;

    return new Proxy(this, {
      get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value !== 'function') return value;

        return (...args: any[]) => {
          BaseHelper.promiseChain = BaseHelper.promiseChain
            .then(() => value.apply(target, args))
            .catch(err => {
              console.error(`❌ Error en ${String(prop)}:`, err);
              throw err;
            });

          return BaseHelper.promiseChain;
        };
      },
    });
  }

  /** Espera a que toda la cadena de promesas haya terminado */
  static async waitForPendingActions() {
    await BaseHelper.promiseChain.catch(() => {});
  }
}
