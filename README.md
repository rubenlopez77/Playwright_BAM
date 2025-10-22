# 🎭 Playwright_fun (Experimental) 🧪

Proyecto personal para **experimentar** con **Playwright + TypeScript**, con el objetivo de replicar la flexibilidad lograda previamente con Selenium, y explorar nuevas posibilidades en testing moderno orientado a mantenibilidad, paralelización y trazabilidad, incorporando además un enfoque experimental con **inteligencia artificial** para optimizar la generación, análisis y priorización de pruebas. (en proceso)


[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=bugs)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)



---


## 🤖  Experimentación con IA

La integración de herramientas de inteligencia artificial (IA) en entornos de pruebas automatizadas puede aportar velocidad y asistencia en la generación de escenarios o casos de prueba.  
Sin embargo, la mayoría de las soluciones actuales de IA que generan código o tests a partir de descripciones en texto libre **no respetan las buenas prácticas de diseño QA** como el **Page Object Model (POM)** ni la **capa de componentes**.

Estas herramientas tienden a generar código de prueba acoplado a la interfaz (clics, selectores y esperas directas), lo que **rompe la arquitectura modular** y dificulta el mantenimiento a largo plazo.  
El resultado son *tests “chorizo”* — largos, repetitivos y con alta deuda técnica — que contradicen los principios de encapsulación y reutilización propios de un framework de testing profesional.

### Enfoque actual

Estoy experimentando con la integración de **IA locales (on-premise)** mediante **Ollama** y modelos propios, con el objetivo de:

- Mantener **la privacidad y confidencialidad** del código fuente y los datos de pruebas.  
- Usar la IA únicamente para **generar o asistir en la redacción de escenarios Gherkin (BDD)**, sin que invada la capa de automatización.  
- Evaluar la posibilidad de que la IA lea la estructura del proyecto y proponga escenarios **alineados con la arquitectura POM existente**, evitando romper la abstracción de UI.

El propósito de esta experimentación es **incluir IA como apoyo semántico y generativo**, sin comprometer la calidad ni la trazabilidad de las pruebas automatizadas.

---

## 🚩 Roadmap


El objetivo de esta línea de trabajo es consolidar un entorno de pruebas E2E robusto, modular y alineado con las mejores prácticas ISQTB.

A continuación se describen los principales hitos técnicos y objetivos de evolución del framework:

✅ **E2E Testing con Playwright:**  
Ejecución de pruebas funcionales completas en navegadores reales (Chromium, Firefox y WebKit).

✅ **TypeScript:**  
Uso de tipado estático y estructura de código escalable para mejorar mantenibilidad y control de tipos.

✅ **Ejecución en paralelo y cross-browser:**  
Configuración avanzada en `playwright.config.ts` para optimizar tiempos y cobertura de ejecución.

✅ **Page Object Model (POM) y Component Layer:**  
Encapsulación de la lógica de UI, favoreciendo la reutilización y reduciendo la deuda técnica.

✅ **Arquitectura por capas:**  
Diseño modular (Tests → Fixtures → Page Objects → Core Utilities) que mejora la trazabilidad, mantenibilidad y separación de responsabilidades.

✅ **Soporte para entornos múltiples:**  
Gestión de variables y configuraciones mediante archivos `.env.dev` y `.env.qa`.

✅ **Capturas automáticas, trazas y grabación de video:**  
Facilita el diagnóstico post-ejecución y la trazabilidad de incidencias.

✅ **Integración con SonarQube:**  
Control de cobertura, detección de bugs, code smells y evaluación de mantenibilidad del código de test.

✅ **Pipeline CI/CD (GitHub Actions en desarrollo):**  
Ejecución continua, análisis estático y generación automática de reportes de calidad.

🎯 **Integración BDD con Cucumber:**  
Implementación de escenarios Gherkin para mejorar la legibilidad de las pruebas y la trazabilidad entre requisitos, escenarios y pasos automatizados.

🤖 **Automatización asistida con IA local:**  
Experimentación con agentes de IA locales para generar y mantener escenarios BDD en Cucumber a partir de casos de prueba en texto libre,  preservando la arquitectura POM y garantizando la privacidad de los datos y del código fuente.


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
