import { logger } from './logger';

export class BaseHelper {
  protected page: any;
  private chain: Promise<void> = Promise.resolve(); // 👈 cola interna de ejecución

  constructor(page: any) {
    this.page = page;
  }

  /**
   * Ejecuta una tarea asincrónica en secuencia.
   * Esto permite que los tests funcionen sin `await` en los steps.
   */
  protected run(task: () => Promise<void>, name?: string): void {
    this.chain = this.chain
      .then(async () => {
        if (process.env.LOG === 'true' && name) {
          logger.info(`▶️ Ejecutando: ${name}`);
        }
        await task();
      })
      .catch((err) => {
        const msg = err instanceof Error ? err.message : String(err);
        logger.error(`❌ Error en ${name || 'tarea'}: ${msg}`);
      });
  }

  /**
   * Espera a que todas las tareas pendientes de la cola se completen.
   * Se usa antes de cerrar el contexto o navegador.
   */
  async flush(): Promise<void> {
    try {
      await this.chain;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.warn(`⚠️ Error en flush(): ${msg}`);
    }
  }
}
