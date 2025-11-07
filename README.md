# 🧪 Behavior Annotation Model (BAM) · Playwright + Cucumber + TypeScript

**Versión:** 0.1.3 (PoC)  
**Estado:** Experimental / No productivo  

---

Framework de automatización diseñado para garantizar **trazabilidad, mantenibilidad y determinismo** en pruebas funcionales con Playwright + Cucumber + TypeScript.  
Inspirado en principios **ISTQB 2023+**, **IEEE 29119**, **ISO 25010** y **SQuaRE 25002**, busca unificar las buenas prácticas QA en una arquitectura declarativa y verificable.

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
CustomWorld (Cola Secuencial + Contexto)
   ↓
Logger (Métricas + Trazabilidad)
   ↳ Playwright (Driver Navegador)
</pre>

### 🧮 Comparativa de Modelos 

| **Criterio** | **BDD Clásico** | **POM** | **BAM v0.1.3** |
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
 ```
Puntos de mejora: Observabilidad, AI, Velocidad
 ```
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

## ⚙️ Arquitectura Actual (v0.1.3)

| Módulo | Responsabilidad principal |
|---------|-----------------------------|
| **World** | Control del ciclo de vida de navegador y page por escenario. Gestiona la cola de acciones y asegura ejecución determinista. |
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

✔ Arquitectura modular y determinista  
✔ ISTQB Compliant: separación por capas y auto-verificación  
✔ Developer Experience: tipado estricto, errores claros y logs medibles  
✔ Performance: lazy loading y control de contexto por escenario

---

## 🎯 Roadmap 

### ✅ Implementado
- [x] Arquitectura multicapa (Components/Pages/Steps)
- [x] Sistema de colas determinista
- [x] Logger con métricas de tiempo
- [x] Data layer para credenciales

### 🚧 En Desarrollo
- [ ] Sistema de métricas
- Medir duración, éxito y número de acciones por escenario.  
- Generar `BAMMetrics.json` con KPIs agregados (avg_duration, success_rate).  
- Base para dashboards de rendimiento y calidad (a futuro).
---

- [ ] Trazabilidad formal test ↔ requisito (decoradores)
- Decoradores por Scenario:  
  ```ts
  @Requirement('REQ-A-1234', 'Login with valid credentials')
  @Risk('HIGH')
  @Owner('QA-Lead')
  @SET('Smoke')
  ```
- Exportar matriz **Requisito ↔ Test ↔ Resultado ↔ Riesgo**.
---
- [ ] Integración CI/CD
- Publicación automática y Quality Gates (SonarQube) en pipelines GitHub / GitLab / Azure.
---
- [ ] Refinamiento del sistema de logs
- Introducir **EventBusLogger** con niveles `compact | standard | verbose`.  
- Auto-detección de `component` y `action`.  
- Centralización total del formato de salida (sin duplicación en Pages, demasiado verbose actualmente).  
---
- [ ]  Dashboards
- JSON Lines / Prometheus / Elastic.  
- Dashboards  HTML con tiempos medios, éxito por requisito y tendencia temporal.

### 🚧 Mas adelante...
###  Mas adelante... (v1.0)**
- [ ]   Generación automática de **BAMReport HTML/PDF**.  
- [ ]   Export a Xray, TestRail o Kiwi TCMS.  
- [ ]   Revisión automatizada de cobertura de requisitos.

---

## 👨‍💻 Autor


🧑‍🔬 **Rubén López**  
[GitHub](https://github.com/rubenlopez77) | [LinkedIn](https://www.linkedin.com/in/ruben-lopez-qa/)
