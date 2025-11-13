# 🧪 Behavior Annotation Model (BAM!) · Playwright + Cucumber + TypeScript

> 🧩 **Nota importante**
> Este repositorio forma parte de una **Proof of Concept (BAM!)** desarrollada para explorar
> arquitecturas de automatización QA basadas en principios **ISTQB, IEEE 29119 e ISO 25010**.
>  
> Su objetivo es **mostrar capacidad de diseño y razonamiento arquitectónico**, no entregar un framework productivo.
>  
> Se comparte públicamente para **análisis, revisión y crítica técnica** como parte del proceso de madurez del modelo.
>
> Aunque mi stack principal es C#/Selenium, he desarrollado este POC en TypeScript para validar ideas sobre trazabilidad y arquitectura BAM

![BAM](https://img.shields.io/badge/BAM_Framework-v0.1.4-blueviolet?logo=testcafe&logoColor=white&style=flat-square) 

**Estado:** Experimental / No productivo  

---

Framework de automatización diseñado para garantizar **trazabilidad, mantenibilidad y determinismo** en pruebas funcionales con Playwright + Cucumber + TypeScript.  
Inspirado en principios **ISTQB 2023+**, **IEEE 29119**, **ISO 25010** y **SQuaRE 25002**, busca unificar las buenas prácticas QA en una arquitectura declarativa y verificable.


[![CI](https://github.com/rubenlopez77/Playwright_BAM/actions/workflows/bam.yml/badge.svg)](https://github.com/rubenlopez77/Playwright_BAM/actions/workflows/bam.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=bugs)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)

---
## ¿Que es BAM (Behavior Annotation Model) ?
La filosofía BAM  nace como una respuesta a la fragmentación existente entre frameworks de automatización que priorizan la ejecución técnica frente a la trazabilidad, la mantenibilidad y la comprensión del comportamiento.

BAM combina la legibilidad del BDD Cucumber con la robustez de una arquitectura multicapa. Su objetivo no es sustituir los modelos existentes como POM o BDD, sino unificarlos bajo un principio fundamental: la prueba es una anotación del comportamiento, no un script imperativo.

Cada test debe describir qué se valida, no cómo se ejecuta, y debe ser trazable hasta su requisito de origen.

No busca solo automatizar pruebas, sino garantizar la calidad del propio proceso de prueba, integrando trazabilidad, métricas y diseño limpio dentro de un mismo lenguaje declarativo.

<pre align="center">
Cucumber Steps (Gherkin)
   ↓
Page Objects (Orquestación)
   ↓
Components (Textbox, Modal, Button...)
   ↓
ExecutionContext (Cola Secuencial + Contexto)
   ↓
Logger (Métricas + Trazabilidad)
   ↳ Playwright (Driver Navegador)
</pre>

### 🧩 BAM en distintos frameworks
El modelo BAM (Behavior Annotation Model) es independiente del lenguaje y del framework de automatización.
Puede aplicarse a cualquier stack que permita estructurar las pruebas de forma declarativa y reproducible.

Playwright + TypeScript (implementación BAM en este repositorio)

- Selenium + Spectrum ✅ 
- Selenium + C# / JUnit / TestNG ✅ 
- WebdriverIO + JavaScript ✅
- Cypress ⚠️ - BDD No nativo, con limitaciones.
- Robot Framework ⚠️ - Parcial  
- API Testing: REST Assured, Bruno, Pact, Supertest… ⚠️ - Parcial

> Estos frameworks son candidatos interesantes para aplicar BAM, aunque su implementación óptima requiere investigación y experimentación adicionales.

## 🤖 Integración con IA: DINO (En fase experimental)
BAM se integra dentro del ecosistema con DINO, un agente IA diseñado para generar, validar y orquestar artefactos declarativos:

DINO analiza features, steps, requisitos y ejecución para complementar BAM con:

- Generación inteligente de pruebas
- Validación automática de reglas
- detección de gaps
- Documentación viva
- QA del QA

➡️ Conoce mas en el repo de DINO [GitHub](https://github.com/rubenlopez77/DINO)


### 🧮 Comparativa de Modelos 

| **Criterio** | **BDD Clásico** | **POM** | **BAM v0.1.x** |
|---------------|-----------------|----------|-----------------|
| **Trazabilidad** | ⚙️ Buena (solo escenarios) | ❌ Limitada (técnica) | ✅ Excelente (requisito ↔ acción) |
| **Mantenibilidad** | ❌ Media/Baja (step duplication) | ✅ Alta (POM claro) | ✅ Alta (capas separadas) |
| **Velocidad** | ❌ Lenta (overhead Cucumber) | ✅ Rápida (directo) | ⚙️ Media (cola + determinismo) |
| **Business Visibility** | ✅ Alta (Gherkin) | ❌ Baja (técnico) | ✅ Alta (Gherkin + semántica) |
| **Technical Debt** | ❌ Alta (step hell) | ⚙️ Media (acoplamiento UI) | ✅ Baja (abstracción) |
| **AI Compatibility** | ✅ Alta (lenguaje natural) | ❌ Baja (código técnico) | ⚙️ Media (estructura mejorada) |
| **Compliance QA** | ⚙️ Media (solo BDD) | ⚙️ Media (estructural) | ✅ Alta (estándares múltiples) |
| **Escalabilidad** | ⚙️ Media (complexity steps) | ✅ Alta (modular) | ✅ Alta (multi-actor) |
| **Observabilidad** | ❌ Baja (logging manual) | ❌ Baja (manual) | ⚙️ Buena (Logger integrado) |

## Puntos de mejora (en análsis)
- Observabilidad: Exportar métricas y logs en formato estructurado (JSON Lines / Prometheus / Elastic) y generar dashboards HTML con KPIs de rendimiento y éxito por requisito.

- Velocidad / Parallelismo: Implementar BAM Runner Pool y Browser Context reuse para ejecución concurrente y reducción del tiempo total sin perder determinismo.

---

## ✅ Verificación de Cumplimiento

Cumple los principios **ISTQB 2023+** e **IEEE 29119**:

🔹 **Cola secuencial** → ejecución determinista y sin race conditions  
🔹 **Independencia** → cada actor tiene su flujo controlado  
🔹 **Tests declarativos** → sin `await` visibles ni pérdida de control  

| Norma / Marco | Cumplimiento | Descripción |
|----------------|---------------|--------------|
| **ISTQB (2023+)** | ✅ | Independencia de pruebas, abstracción por capas, auto-verificación explícita |
| **IEEE 29119-3** | 🚧 | En desarrollo - Sistema de IDs JSON planeado para v0.2|
| **ISO/IEC 25010 : 2023** | ✅ | Refuerza mantenibilidad, usabilidad y eficiencia |
| **ISO/IEC 25002 : 2024 (SQuaRE)** | ✅ | Medición y evaluación de calidad del software |

---

## ⚙️ Arquitectura Actual

| Módulo | Responsabilidad principal |
|---------|-----------------------------|
| **ExecutionContext** | Control del ciclo de vida del navegador y la page por escenario. Gestiona la cola determinista de acciones, centraliza logging y métricas, y asegura aislamiento total entre escenarios. |
| **Hooks** | Inicialización y cierre de entorno (Before/After) integrados con Cucumber. |
| **Logger** | Registro centralizado de acciones, errores y métricas de duración formateadas. |
| **Components Layer** | Abstracción mínima sobre elementos UI (textbox, modal, button...). |
| **Pages Layer POM** | Orquestación de componentes. Define flujo de negocio. |
| **Data Layer** | Datos simulados (mocked), credenciales y datasets configurables. |


 ``` ts
When('the user logs in with valid credentials', function () {
  const user = this.getPage(LoginPage);
  user.loginWith(credentials.valid);
});
 ```
 
**DSL Declarativo:** `user.loginWith(credentials.valid)`

✔ Arquitectura modular y determinista.
✔ ISTQB Compliant: separación por capas y auto-verificación  
✔ Developer Experience: tipado estricto, errores claros y logs medibles  
✔ Performance: lazy loading y control de contexto por escenario

---

## 🧩 Plugin ESLint BAM 

El proyecto integra un plugin ESLint propio llamado  
**eslint-plugin-bam-ux**, diseñado como parte del ecosistema **BAM – Behavior Annotation Model**.

- `bam-ux/test-enforce-pattern` valida la **estructura declarativa BAM** mostrando errores si no se cumple.
- `bam-ux/uxmap-valid` valida la **consistencia de los mapas UX**.

Instalación del plugin

``` bash
npm install ./tools/eslint-plugin-bam-ux --save-dev
```
---
### 📜 Changelog
- Se unifica toda la lógica de esperas (`waitVisible`, `waitForText`, `waitForNonEmptyText`) dentro de `GenericComponent`.
- `ModalComponent` pasa a heredar de `GenericComponent` en lugar de `BaseComponent`.
- `ModalComponent.open()` ahora usa directamente `waitVisible()` heredado.
- `LoginPage` se actualiza para usar esperas declarativas desde los propios componentes.

Histórico completo de cambios  en [CHANGES.md](CHANGES.md).

## 🎯 Roadmap 

### ✅ Implementado
- [x] Arquitectura multicapa (Components/Pages/Steps)
- [x] Sistema de colas determinista
- [x] Logger con métricas de tiempo
- [x] Data layer para credenciales
- [x] Integración simple CI/CD en Actions y Quality Gates (SonarQube)
- [x] Integración plugin ESLint BAM

### 🚧 En Desarrollo
- [ ] **Paralelismo controlado** (BAM Runner Pool o similar. Sin mezclar contextos!)
      - Ejecución concurrente de Worlds aislados.
      - Sincronización de métricas y logger.
---      
- [ ] **Sistema de métricas**
      - Medir duración, éxito y número de acciones por escenario.    
      - Generar `BAMMetrics.json` con KPIs agregados (avg_duration, success_rate).  
      - Base para dashboards de rendimiento y calidad (a futuro).
---

- [ ] **Trazabilidad** formal test ↔ requisito (decoradores)
      - Decoradores por Scenario:  
      ```ts
      @Requirement('REQ-A-1234', 'Login with valid credentials')
      @Risk('HIGH')
      @Owner('QA-Lead')
      @SET('Smoke')
      ```
      - Exportar matriz **Requisito ↔ Test ↔ Resultado ↔ Riesgo**.
---
- [ ] **Integración CI/CD**
      - Publicación automática avanzada en pipelines GitHub / GitLab / Azure / (Jenkins?).
---
- [ ] **Refinamiento del sistema de logs**
      - Mejorar **Logger** con niveles `compact | standard | verbose`.  
      - Auto-detección de `component` y `action`.  
      - Centralización total del formato de salida (sin duplicación en Pages, demasiado verboso actualmente).  
---
- [ ]  **Dashboards**
      - JSON Lines / Prometheus / Elastic.  
      - Dashboards  HTML con tiempos medios, éxito por requisito y tendencia temporal.
---

### 🚧 **Mas adelante...** 
- [ ]   Generación automática de **BAMReport HTML/PDF**.  
- [ ]   Export a Xray, TestRail o Kiwi TCMS.  
- [ ]   Revisión automatizada de cobertura de requisitos.
- [ ]   Inteligencia Artificial: Integrar análisis predictivo y priorización automática de escenario
- [ ]   Inteligencia Artificial: (Es posible?) **Escritura generativa de pruebas manteniendo la estructura BAM** (DSL declarativo + trazabilidad formal)

---

🧑‍🔬 **Rubén López**  
[GitHub](https://github.com/rubenlopez77) | [LinkedIn](https://www.linkedin.com/in/ruben-lopez-qa/)
