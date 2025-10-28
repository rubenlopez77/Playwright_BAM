import { After, AfterAll, Before } from '@cucumber/cucumber';
import { DriverFactory } from './driverFactory';
import { logger } from './logger';

Before(async function () {
  if (process.env.LOG === 'true') logger.info('🟦 [Before] Inicio de escenario');
  await this.init();
  if (process.env.LOG === 'true') logger.info('🟩 [Before] Contexto inicializado');
});

After(async function () {
  if (process.env.LOG === 'true') logger.info('🟧 [After] Escenario terminado');

  // ✅ Delega limpieza de contexto al CustomWorld
  await this.cleanup?.();
});

AfterAll(async function () {
  if (process.env.LOG === 'true') logger.info('🟥 [AfterAll] Intentando cerrar navegador...');
  await DriverFactory.closeBrowser();
  if (process.env.LOG === 'true') logger.info('✅ [AfterAll] Cierre global completo');
});
