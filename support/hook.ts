import { Before, After, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { DriverFactory } from './driverFactory';
import { BaseHelper } from './baseHelper';
import { logger } from './logger';

setDefaultTimeout(Number(process.env.CUCUMBER_TIMEOUT ?? 60_000));

Before(async function () {
  logger.info('🟦 [Before] Inicio de escenario');
  await this.init();
  logger.info('🟩 [Before] Contexto inicializado');
});

After(async function ({ result, pickle }) {
  logger.info(`🟧 [After] Escenario terminado: ${pickle?.name}`);

  // Espera a que se completen las acciones en segundo plano
  await BaseHelper.waitForPendingActions();

  logger.info('🧹 [After] Cerrando contexto...');
  try {
    if (this.page && !this.page.isClosed()) await this.page.close();
    if (this.context) await this.context.close();
  } catch (err) {
    console.warn('⚠️ [After] Error cerrando contexto:', (err as Error).message);
  }
});

AfterAll(async () => {
  logger.info('🟥 [AfterAll] Intentando cerrar navegador...');
  await DriverFactory.closeBrowser();
  logger.info('✅ [AfterAll] Cierre global completo');
});
