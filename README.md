# 🧪 Behavior Annotation Model (BAM) · Playwright + Cucumber + TypeScript

**Versión:** 0.1.3 (PoC)  
**Estado:** Experimental / No productivo  
**Autor:** Rubén López – QA Lead · Arquitectura de Automatización

---

Framework de automatización diseñado para garantizar **trazabilidad, mantenibilidad y determinismo** en pruebas funcionales con Playwright + Cucumber + TypeScript.  
Inspirado en principios **ISTQB 2023+**, **IEEE 29119**, **ISO 25010** y **SQuaRE 25002**, busca unificar las buenas prácticas QA en una arquitectura declarativa y verificable.

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=bugs)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)

---

## ✅ Verificación de Cumplimiento

Cumple los principios **ISTQB 2023+** e **IEEE 29119**:

🔹 **Cola secuencial** → ejecución determinista y sin race conditions  
🔹 **Independencia** → cada actor tiene su flujo controlado  
🔹 **Tests limpios** → sin `await` visibles, sin pérdida de control  

| Norma / Marco | Cumplimiento | Descripción |
|----------------|---------------|--------------|
| **ISTQB (2023+)** | ✅ | Independencia de pruebas, abstracción por capas, auto-verificación explícita |
| **IEEE 29119-3** | ✅ | Especificaciones trazables mediante IDs JSON |
| **ISO/IEC 25010 : 2023** | ✅ | Refuerza mantenibilidad, usabilidad y eficiencia |
| **ISO/IEC 25002 : 2024 (SQuaRE)** | ✅ | Medición y evaluación de calidad del software |

---

## ⚙️ Arquitectura Actual (v0.1.3)

| Módulo | Responsabilidad principal |
|---------|-----------------------------|
| **World** | Control del ciclo de vida de navegador y page por escenario. Gestiona la cola de acciones y asegura ejecución determinista. |
| **Hooks** | Inicialización y cierre de entorno (Before/After) integrados con Cucumber. |
| **Runner** | Ejecuta acciones encoladas secuencialmente, garantizando aislamiento entre escenarios. |
| **Logger** | Registro centralizado de acciones, errores y métricas de duración formateadas. |
| **Components Layer** | Abstracción mínima sobre elementos UI (textbox, modal, button...). |
| **Pages Layer** | Orquestación de componentes. Define flujo de negocio. |
| **Data Layer** | Datos simulados (mocked), credenciales y datasets configurables. |

**DSL Declarativo:** `user.loginWith(credentials.valid)`

✔ Arquitectura modular y determinista  
✔ ISTQB Compliant: separación por capas y auto-verificación  
✔ Developer Experience: tipado estricto, errores claros y logs medibles  
✔ Performance: lazy loading y control de contexto por escenario

---

## 🧭 Roadmap BAM v1.3 – v1.4

### **1️⃣ Sistema de agregación de métricas (suite-level)**
- Consolidar duración, éxito y número de acciones por escenario.  
- Generar `BAMMetrics.json` con KPIs agregados (avg_duration, success_rate).  
- Base para dashboards de rendimiento y calidad.

### **2️⃣ Trazabilidad formal test ↔ requisito (decoradores)**
- Decoradores por Scenario:  
  ```ts
  @Requirement('REQ-A-1234', 'Login with valid credentials')
  @Risk('HIGH')
  @Owner('QA-Lead')
  ```
- Exportar matriz **Requisito ↔ Test ↔ Resultado ↔ Riesgo**.

### **3️⃣ Exportación para dashboards empresariales**
- JSON Lines / Prometheus / Elastic.  
- Dashboards con tiempos medios, éxito por requisito y tendencia temporal.

### **4️⃣ Integración CI/CD**
- Exportadores `JUnit XML` y `JSON`.  
- Variables de control de calidad (`BAM_QUALITY_GATE_FAIL_ON_ERROR`, `BAM_MIN_SUCCESS_RATE`).  
- Publicación automática y gates en pipelines GitHub / GitLab / Jenkins.

### **5️⃣ Refinamiento del sistema de logs**
- Introducir **EventBusLogger** con niveles `compact | standard | verbose`.  
- Auto-detección de `component` y `action`.  
- Centralización total del formato de salida (sin duplicación en Pages).  

### **6️⃣ Futuro (v1.4.x)**
- Generación automática de **BAMReport HTML/PDF**.  
- Export a Xray, TestRail o Kiwi TCMS.  
- Revisión automatizada de cobertura de requisitos.

---

## 👨‍💻 Autor

**Rubén López**  
🧑‍🔬 QA Lead · Arquitectura de Automatización  
[GitHub](https://github.com/rubenlopez77) | [LinkedIn](https://www.linkedin.com/in/ruben-lopez-qa/)
