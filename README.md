# 🧪 Playwright + Cucumber + TypeScript Automation Framework + IA

**PoC** Proyecto personal para **experimentar** con **Playwright + TypeScript**, con el objetivo de replicar la flexibilidad lograda previamente con Selenium, y explorar nuevas posibilidades en testing moderno orientado a mantenibilidad, paralelización y trazabilidad, incorporando además un enfoque experimental con **inteligencia artificial** para optimizar la generación, análisis y priorización de pruebas. 

(En proceso...)


[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=bugs)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)


---

📊 Estado actual

✅ BAM implementado en 3 pruebas sencillas
✅ Hooks + Runner + PageFactory operativos
✅ Pruebas declarativas funcionales
✅ Trazabilidad automatizada vía extractor JSON/MD

🔜 Próximos pasos

Implementar la tercera capa de Helpers: Componentes
Integración con SonarQube
Pipelines Github Actions (CI/CD)
Añadir exportador HTML interactivo del informe de trazabilidad.
Integrar métricas de cobertura de requisitos (mapa @ID ↔ resultado).
Automatizar el pipeline de publicación de reportes.

----

## 🚀 2. Ventajas del modelo BAM

| Categoría | Beneficio | Descripción |
| --- | --- | --- |
| 🧠 **Legibilidad** | ✅ Natural y semántica | Las pruebas se leen como historias de usuario: `user.loginWith()` |
| 🧩 **Modularidad** | ✅ Alta | Separación estricta de capas (component, page, test) |
| 🧪 **Trazabilidad** | ✅ Integrada | Anotaciones `@ID`, `@Title`, `@Priority`, `@Tags` enlazan cada test a un requisito |
| 🧱 **Mantenibilidad** | ✅ Elevada | Los cambios de UI afectan solo a helpers, no a la lógica de negocio |
| ⚡ **Ligereza** | ✅ Sin Gherkin ni Cucumber | Mantiene trazabilidad formal con sintaxis nativa de TypeScript |
| 🔎 **Formalidad QA** | ✅ Cumple IEEE 29119 e ISO 25010 | Estandariza estructura, trazabilidad, documentación y calidad |
| 🔁 **Reusabilidad** | ✅ Alta | PageFactory autoinstancia todas las páginas (DRY) |
| 📊 **Reportabilidad** | ✅ Automática | Generación de informes JSON / Markdown de trazabilidad |
| 🤝 **Alineación negocio-QA** | ✅ Total | PO y cliente pueden leer y entender las pruebas directamente |
| 🧩 **Escalabilidad** | ✅ Alta | Soporta nuevos módulos con solo añadir `.page.ts` |

* * *

📊 \*\*Matriz de Evaluación\*\*  
| Criterio | BDD Clásico | Arquitectura Multicapa | BAM! |  
|-----------|-------------|------------------------|-----|  
| \*\*Trazabilidad\*\* | ✅ Excelente | ❌ Limitada | ✅ Excelente |  
| \*\*Mantenibilidad\*\* | ❌ Baja | ✅ Alta | ✅ Alta |  
| \*\*Velocidad Ejecución\*\* | ❌ Lenta | ✅ Rápida | ✅ Rápida |  
| \*\*Business Visibility\*\* | ✅ Alta | ❌ Nula | ⚙️ Media‑Alta |  
| \*\*Technical Debt\*\* | ❌ Alta | ✅ Baja | ✅ Baja |  
| \*\*AI Compatibility\*\* | ❌ Difícil | ⚙️ Media | ✅ Alta |

---

## 📐 3. Cumplimiento con IEEE 29119 / ISO 25010

El modelo BAM se alinea directamente con **los estándares internacionales de calidad y pruebas** al cubrir los elementos normativos clave.

| Norma | Cumplimiento | Justificación |
| --- | --- | --- |
| **IEEE 29119-3 – Test Documentation** | ✅   | Cada test incluye anotaciones formales (`@ID`, `@Title`, `@Description`, `@Priority`, `@Tags`) equivalentes a los *Test Case Specifications* y *Test Procedure Specifications* del estándar. |
| **IEEE 29119-4 – Test Techniques** | ✅   | Se estructura por capas (equivalente a *keyword-driven* y *model-based testing*). Las técnicas de validación y espera se centralizan en helpers reutilizables. |
| **IEEE 29119-2 – Test Process** | ✅   | Integra fases de diseño, ejecución y documentación trazable, con hooks que garantizan la repetibilidad del entorno de prueba. |
| **ISO 25010 – Product Quality Model** | ✅   | BAM mejora las características de *Maintainability*, *Usability*, *Reliability* y *Portability* del producto de pruebas. |
| **ISO 9126 / ISO 25000 – Software Quality Requirements** | ✅   | Los tests documentan explícitamente los requisitos funcionales mediante metadatos. |
| **ISTQB Best Practices** | ✅   | Cumple “Single Level of Abstraction per Layer”, modularidad POM y separación de responsabilidades. |

* * *

## 🤖  Experimentación con IA

La integración de herramientas de inteligencia artificial (IA) en entornos de pruebas automatizadas puede aportar velocidad y asistencia en la generación de escenarios o casos de prueba.  

Sin embargo, la mayoría de las soluciones actuales de IA que generan código o tests a partir de descripciones en texto libre **no respetan las buenas prácticas de diseño QA** como el **Page Object Model (POM)** ni la **capa de componentes**.

El propósito de esta experimentación es **incluir IA como apoyo semántico y generativo**, sin comprometer la calidad ni la trazabilidad de las pruebas automatizadas.

---

## 📋 Índice
1. [Arquitectura del proyecto](#arquitectura-del-proyecto)
2. [Requisitos previos](#requisitos-previos)
3. [Instalación](#instalación)
4. [Ejecución de pruebas](#ejecución-de-pruebas)
5. [Configuración de entornos](#configuración-de-entornos)
6. [Estrategia de calidad](#buenas-prácticas)
6. [Capas de Abstracción y Arquitectura de Automatización](#buenas-prácticas) 
7. [Reportes y trazas](#reportes-y-trazas)
8. [Estructura de carpetas](#estructura-de-carpetas)
9. [Integración continua](#integración-continua)
10. [Roadmap](#roadmap)

---

## 🧱 Arquitectura del proyecto

El framework sigue el patrón **Page Object Model (POM)** y utiliza **fixtures reutilizables** para manejo de datos y contexto de pruebas.  
Los escenarios están definidos en **Gherkin (BDD)** para permitir colaboración entre QA, desarrollo y negocio.

```
Playwright (core) + Cucumber (BDD) + TypeScript (strong typing)
```

- **Playwright** → Ejecución de tests en múltiples navegadores.
- **Cucumber** → Escenarios BDD legibles por negocio.
- **TypeScript** → Tipado estático y calidad de código.
- **GitHub Actions** → Integración continua y generación de reportes.

---

## ⚙️ Requisitos previos

- Node.js >= 18  
- npm o yarn  
- Playwright CLI  
- Git

Instalar Playwright browsers (una sola vez):
```bash
npx playwright install
```

---

## 📦 Instalación

```bash
git clone https://github.com/rubenlopez77/Playwright_fun.git
cd Playwright_fun
npm install
```

---

## 🚀 Ejecución de pruebas

### Modo consola
```bash
npx playwright test
```

### Modo UI
```bash
npx playwright test --ui
```

### Ejecución BDD (Cucumber)
```bash
npx cucumber-js --require-module ts-node/register --require ./tests/steps/**/*.ts --format progress
```

---

## 🌐 Configuración de entornos

Variables sensibles se gestionan mediante ficheros `.env`.  
**No se versionan**, solo se provee un ejemplo genérico:

```bash
# .env.example
BASE_URL=https://
USER_EMAIL=test@example.com
USER_PASSWORD=secret
```

Selecciona entorno con:
```bash
ENV=qa npx playwright test
```

---

## 🧩 Estrategia de Calidad y Mejores Prácticas

- **Page Objects:** una clase por página con acciones claras `home()`, `login(user,pass)` etc  con el mismo nombre del botón o enlace.  “El código se lee como una historia.”
- **Selectors:** usar siempre `data-test` o atributos específicos del DOM.  
- **Fixtures:** inicializar datos y estados en `beforeAll` o `beforeEach`.  
- **Tests atómicos:** cada escenario debe validar un único flujo de negocio.  
- **Linting & Types:** ejecuta `npm run lint` y `npm run typecheck` antes de subir cambios.  
- **Commits limpios:** convención `feat/test/fix/chore`.  
- **Quality Gate con SonarQube:** define umbrales mínimos de cobertura, duplicación y deuda técnica antes de aceptar merges.  
- **Ejecución en paralelo y cross-browser:** aprovechar la capacidad nativa de Playwright para correr tests simultáneamente en **Chromium**, **Firefox** y **WebKit**.  
- **Alta reutilización de componentes:** promover abstracción y modularidad en fixtures, utilidades y Page Objects para minimizar duplicación y facilitar mantenimiento.  
- **AI-assisted QA:** explorar el uso de inteligencia artificial en **generación automática de tests**, **análisis de logs** y **detección de patrones de fallos** para optimizar la cobertura y reducir el tiempo de diagnóstico.

---

## 🧱 Capas de Abstracción y Arquitectura de Automatización

El framework sigue una **arquitectura multicapa** basada en el patrón **Page Object Model (POM)** y en principios de **bajo acoplamiento y alta cohesión**, de acuerdo con las recomendaciones de **ISTQB** para frameworks de automatización sostenibles.

🧬 **Estructura de capas**

Helper de componente → Helper de página (POM) → Prueba (feature / test)

Este ejemplo muestra cómo una prueba sencilla de login en `www.demoblaze.com` utiliza la arquitectura propuesta, separando responsabilidades entre la prueba, el helper de página y los helpers de componentes.

#### 🧩 1. Helper de componente
- Contiene la lógica de interacción con **elementos** de la web (botones, inputs, selectores, modales, tooltips, etc.).
- Se encarga de las esperas `await expect(...)`, selectores y validaciones específicas de ese componente. `Single level of abstraction per layer`

  ```typescript

	export class TextBoxHelper {
	constructor(private readonly page: Page, private readonly selector: string) {}
	
	 async fillTextBox(value: string) {
	 const field = this.page.locator(this.selector);
	 await expect(field).toBeVisible();
	 await field.fill(value);
	 }
  	}


#### 🧩 2. Helper de página (POM)
- Representa una página completa o una vista funcional.
- **No repite lógica de bajo nivel**, sino que **utiliza los helpers de componentes** para mantener la capa limpia.

  ```typescript

	async doLogin(user: string, pass: string) {
	 const username = new TextBoxHelper(this.page, '#loginusername');
	 const password = new TextBoxHelper(this.page, '#loginpassword');
	 const button = new ButtonHelper(this.page);
	
	 username.fillTextBox(user);
	 password.fillTextBox(pass);
     button.press('login');
  	}

#### 🧪 3. Prueba 
- El test es **declarativo**, solo indica *qué* se valida, no *cómo*.

  ```typescript

  When('I enter invalid credentials', async function () {
   login.doLogin('login', 'KO');
   });

####  🥒 4. Escenario BDD (Cucumber)
El nivel más alto de abstracción: describe el comportamiento del usuario en lenguaje natural, sin código técnico

```gherkin
Feature: Login functionality
  In order to access the application
  As a registered user
  I want to log in and handle errors correctly

  Scenario Outline: Unsuccessful login
    Given I am on the login page
    When I enter invalid credentials
    Then I should see the error message
```

## 🧾 Reportes y trazas 

Tras cada ejecución se genera automáticamente:
- **HTML Report:** `/playwright-report/index.html`
- **Trace Viewer:** `/test-results/**/trace.zip`
- **Screenshots & Videos:** capturados en fallos

Para abrir el reporte:
```bash
npx playwright show-reportEn CI se publican como artefactos automáticamente.

---

## 📂 Estructura de carpetas

```bash
Playwright_fun/
├── .github/workflows/           # Pipelines de CI/CD
├── .vscode/                     # Configuración del entorno de desarrollo
├── tests/
│   ├── features/                # Escenarios Gherkin (.feature)
│   ├── steps/                   # Definiciones de pasos de Cucumber
│   ├── helpers /
│   │   ├── pages/               # Page Objects
│   │   ├── fixtures/            # Fixtures y hooks comunes
│   │   └── utils/               # Funciones utilitarias
│   └── data/                    # Datos estáticos o JSON de prueba
├── playwright.config.ts         # Configuración global de Playwright
├── cucumber.js                  # Configuración de Cucumber
├── package.json                 # Scripts, dependencias y comandos
├── .env.example                 # Plantilla de configuración de entorno
└── README.md
```

---

## 🧩 Integración continua

Pipeline automatizado con **GitHub Actions** que ejecuta:
1. Lint & type check  
2. Ejecución de tests en matrix (Chrome, Firefox, WebKit)  
3. Generación de reportes HTML + trazas  
4. Publicación de artefactos (`playwright-report`, `traces`, `videos`)

```yaml
# .github/workflows/ci.yml
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        browser: [chromium, firefox, webkit]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --browser ${{ matrix.browser }}
      - uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report
```

---

## 🧭 Roadmap
- [ ] Implementar Helper de **componentes**
- [x]  SonarQube Quality Gate ✅
- [ ]  **BDD:** Escenarios escritos en **Gherkin (.feature)**
- [ ] Conectar con pipelines de despliegue  
- [ ] **Añadir** tests de regresión completa  
- [ ] Integrar **allure-report**
- [ ] Generar coverage report  
- [ ] Integrar con Slack / Notificaciones CI
- [ ] Añadir pruebas visuales y de **accesibilidad**

---

## 👨‍💻 Autor

**Rubén López**  
🧑‍🔬 QA Senior 📦 [GitHub](https://github.com/rubenlopez77)🔗 [LinkedIn](https://www.linkedin.com/in/ruben-lopez-qa/)

---
