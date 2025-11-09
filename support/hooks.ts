import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { EnvConfig } from './env';

setDefaultTimeout(EnvConfig.CUCUMBER_TIMEOUT);

Before(async function (scenario) {
  await this.init();
  if (!EnvConfig.LOG) console.log(`\n[-] Scenario: ${scenario.pickle.name}`);
});

After(async function () {
  await this.close();
});

