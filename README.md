# 🎭 Playwright_fun (Experimental) 🧪

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=bugs)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)


Proyecto personal para **experimentar** con **Playwright + TypeScript**, con el objetivo de replicar la flexibilidad lograda previamente con Selenium, y explorar nuevas posibilidades en testing moderno orientado a mantenibilidad, paralelización y trazabilidad, incorporando además un enfoque experimental con **inteligencia artificial** para optimizar la generación, análisis y priorización de pruebas. (en proceso)

[![Playwright Tests](https://github.com/rubenlopez77/Playwright_fun/actions/workflows/playwright.yml/badge.svg)](https://github.com/rubenlopez77/Playwright_fun/actions/workflows/playwright.yml)
---

🚀 Objetivo

Demostrar cómo implementar pruebas automatizadas E2E con Playwright + TypeScript, aplicando principios de arquitectura modular, mantenibilidad y paralelización avanzada, alineados con las mejores prácticas de ingeniería de calidad:

✅ E2E Testing con Playwright: pruebas funcionales en browsers reales (Chromium, Firefox, WebKit)

✅ TypeScript: tipado estático y estructura escalable del código de test

✅ Experimentar con la integración de IA en los pipelines de calidad, orientada al análisis inteligente de logs, la detección temprana de anomalías y la generación automatizada de escenarios de prueba en Gherkin, como parte de una estrategia de optimización continua del ciclo de validación.

✅ Ejecución en paralelo y cross-browser mediante configuración en playwright.config.ts

✅ Page Object Model (POM) y Component Layer para encapsular la lógica de UI

✅ Arquitectura por capas (Tests → Fixtures → Page Objects → Core Utilities) que mejora la trazabilidad y mantenibilidad

✅ Soporte para entornos múltiples mediante variables .env.dev y .env.qa

✅ Capturas automáticas, trazas y video recordings para diagnóstico post-ejecución

✅ Integración con SonarQube para control de cobertura, bugs y maintainability rating

✅ Pipeline CI/CD (GitHub Actions en desarrollo) para ejecución continua y reporte automático

---

## 🧩 Estado del proyecto

- [ ] **SonarQube:** Quality Gate pending  (coverage & maintainability thresholds met)
- [ ]  AI-assisted QA: Explorar el uso de inteligencia artificial en generación de tests, análisis de logs y detección de patrones de fallos para optimizar la cobertura y reducir tiempo de diagnóstico
- [ ] **CI/CD:** Integrar GitHub Actions para ejecución automática de tests
- [ ] **Reporting:** Incorporar Allure / Mochawesome
- [ ] **Videos & Traces:** Capturas automáticas y análisis post-ejecución
- [ ] **Fixtures:** Implementar inyección de datos y paralelización avanzada
- [ ] Quality Metrics Dashboard: Consolidar métricas de cobertura, defect density y flakiness rate
	  
---

## 📁 Estructura del proyecto

```plaintext
.
├── .github/
│   └── workflows/           # Configuraciones de CI / pipelines
├── .vscode/                 # Configuraciones locales del editor
├── namespace/
│   ├── pruebas/             # Tests organizados por módulo / funcionalidad
│   │   ├── user/
│   │   │   └── login/       # Flujos de login, etc.
│   │   └── …                # Otros módulos
├── .env.dev                 # Variables de entorno para desarrollo
├── .env.qa                  # Variables de entorno para QA / entorno de pruebas
├── connect-cdp.js           # Script auxiliar para debugging (Chrome DevTools Protocol)
├── package.json
├── package-lock.json
└── playwright.config.ts     # Configuración de Playwright (browsers, timeouts, etc.)
```



---

## 📈 Beneficios clave

💬 Sintaxis legible y expresiva gracias al uso de TypeScript y funciones asíncronas claras (async/await)

🧩 Arquitectura modular y escalable, con separación clara entre tests, fixtures, page objects y utilidades

🔁 Alta reutilización de componentes, reduciendo duplicación y esfuerzo de mantenimiento

⚙️ Configuración centralizada en playwright.config.ts para entornos, timeouts, browsers y reporter

🧠 Ejecución en paralelo y cross-browser integrada de forma nativa (Chromium, Firefox, WebKit)

📸 Capturas automáticas, trazas y videos disponibles tras cada ejecución para facilitar el debugging

🚀 Integración continua (CI/CD) sencilla mediante GitHub Actions o Azure Pipelines

📊 Visibilidad de calidad con métricas en SonarQube (coverage, code smells, maintainability)

🔒 Entornos aislados y configurables mediante .env para distintos stages (DEV, QA, STAGING)

---

## 🚀 Cómo ejecutar los tests

1. Instala dependencias:
   ```bash
   npm install
   ```

2. Configura las variables de entorno (`.env.dev` / `.env.qa`):
   ```bash
   URL=https://tu-app.com
   USER=usuario
   PASS=contraseña
   ```

3. Ejecuta los tests en modo headless:
   ```bash
   npx playwright test
   ```

4. O bien en modo interactivo (UI):
   ```bash
   npx playwright test --ui
   ```

---


---

## ⚙️ Configuración / Variables de entorno

- **.env.dev** → entorno de desarrollo  
- **.env.qa** → entorno de QA / pruebas  

Variables típicas:
```bash
URL=https://example.com
USER=test_user
PASS=super_secret
```

---

## 📈 Próximos pasos

- [x] SonarQube Quality Gate ✅
- [ ]  **BDD:** Escenarios escritos en **Gherkin (.feature)**
- [ ] Integrar **Allure Reporting**  
- [ ] Añadir **gráficas de cobertura y métricas** en pipeline  
- [ ] Incluir **capturas y trazas automáticas**  
- [ ] Implementar **fixtures dinámicas y data-driven testing**

---

## 📚 Recursos útiles

- [Documentación oficial de Playwright](https://playwright.dev)
- Ejemplos de suites Playwright + TypeScript
- Comparativas **Selenium vs Playwright**
- Blogs y experiencias de migración entre frameworks

---

## 📝 Notas adicionales

Este repositorio es de carácter **experimental / personal** y se utiliza para validar patrones, buenas prácticas y rendimiento en automatización moderna con Playwright. **No pretende** presentar una versión funciona

---

## 🧠 Autor

**Rubén López**  
🔗 [linkedin.com/in/ruben-lopez-qa](https://linkedin.com/in/ruben-lopez-qa)
