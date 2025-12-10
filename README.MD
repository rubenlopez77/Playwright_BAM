# 🧪 BAM! (Behavior Annotation Model) — Community Edition (PoC)

> ### ⚠️ Aviso importante — Proof of Concept
> Esta edición es un **PoC evolutivo**, creado para explorar cómo podría estructurarse la gobernanza de calidad en automatización según principios **ISTQB**, **IEEE 29119** e **ISO/IEC 25010**.
> No pretende ser un framework “cerrado”, sino una **propuesta arquitectónica** para experimentar con diseño declarativo, trazabilidad y telemetría unificada.

![BAM Community Edition](https://img.shields.io/badge/BAM_Community_Edition-v0.1.5-blueviolet?style=flat-square) ![Status](https://img.shields.io/badge/Status-Experimental-orange?style=flat-square) ![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

> *"La función del QA ya no es 'ver si funciona', sino orquestar la calidad desde la intención del negocio hasta la evidencia técnica."*

---

# 🎯 1. Propósito: ¿Qué intenta resolver BAM?

BAM nace para explorar cómo un equipo QA podría **gobernar** —no solo ejecutar— la automatización. En la práctica, ataca cuatro disfunciones habituales en equipos Agile:

### ❌ 1. Falta de fiabilidad (Flakiness)
Tests frágiles, reintentos infinitos y ruido. La suite está "verde", pero nadie confía en ella para desplegar un viernes.

### ❌ 2. Evidencia dispersa (Silos de datos)
Playwright, K6 y Cucumber generan reportes aislados. No existe *una única fuente de verdad* para responder: "¿Cuál es la calidad actual del producto?".

### ❌ 3. Ausencia de trazabilidad funcional
Los frameworks tradicionales ejecutan código, no requisitos. Es difícil responder:
- ¿Qué requisito cubre este test?
- ¿Qué Criterios de Aceptación (AC) han sido validados?
- ¿Qué módulo técnico es el más inestable?

### ❌ 4. Desconexión Negocio vs Técnica
Los steps suelen describir *cómo* interactuar con la UI ("Click en botón azul"), no *qué comportamiento* se valida ("Usuario se autentica con rol Admin").

---

# 📈 2. Impacto Esperado (KPIs)

El objetivo de BAM no es estético, es económico. Busca resultados medibles:

| Objetivo | KPI Estimado |
| :--- | :--- |
| **Reducción de Ruido** | **30-50%** menos tiempo investigando falsos positivos. |
| **Trazabilidad** | **100%** de trazabilidad (Requisito ↔ Test ↔ Fallo) en módulos críticos. |
| **Análisis de Fallos (RCA)** | Reducción del **40%** en el tiempo medio de diagnóstico gracias a la taxonomía unificada. |

---

# 🟣 3. BAM como modelo: Single Source of Truth

BAM propone una visión simple:

> **Tests funcionales, API y rendimiento pueden compartir un metamodelo común de evidencias.**

Ese metamodelo es el **BMS (Behavior Metadata Standard)**: un JSON canónico que representa cada ejecución con semántica clara.

* **BAM no es un runner.**
* **BAM no reemplaza Playwright ni Cypress.**
* **BAM gobierna** la estructura, la intención y la telemetría.

---

# 🏛️ 4. Arquitectura en 3 capas (Alineada con ISTQB)

El diseño aplica una separación estricta de responsabilidades para garantizar mantenibilidad a largo plazo:

## 4.1 Capa de Intención (Business / Declarativa)
Define **QUÉ** se quiere validar.
- Escenarios legibles por negocio (pseudo-Gherkin).
- Metadatos estructurados: `@REQ`, `@AC`, `@Risk`, `@Data`.

## 4.2 Capa de Componentes (Abstracción Técnica)
Define **CÓMO** se interactúa.
- Componentes UI/API atómicos y aislados.
- Pages declarativas sin lógica de control.
- Selectores centralizados (Single Point of Maintenance).

## 4.3 Capa de Ejecución (+ Telemetría BMS)
El motor (Playwright, Axios, k6) ejecuta la acción. BAM intercepta la ejecución para inyectar:
- Trazabilidad y Metadatos.
- Taxonomía de fallos automática.
- Generación del **BMS JSON**.

---

# 🟦 5. Eliminando fragilidad

### 🟦 Componentes Atómicos (Interaction Wrapper)
Cada interacción (click, fill, wait) se centraliza para inyectar estabilidad y telemetría automática.

```typescript
async fill(value: string) {
    // El 'InteractionService' maneja la espera, el reintento y el log de negocio
    return this.world.interactionService.run(
      "Textbox.fill",
      { selector: this.selector, value },
      async () => {
        await this.loc.waitFor({ state: "visible" });
        await this.loc.click();
        await this.loc.fill(value);
      }
    );
}

```

## 🟦 Pages declarativas

Una página solo indica qué componentes contiene.
Sin lógica técnica.

```ts
loginWith(set: CredentialSet) {
  this.loginButton.click();
  this.modal.waitVisible();
  this.username.fill(set.username);
  this.password.fill(set.password);
  this.submitButton.click();
}
```

### 🟦 Steps declarativos y limpios

El Step representa intención funcional:
``` ts
When('the user logs in with valid credentials', function () {
  const user = this.getPage(LoginPage);
  user.loginWith(credentials.valid);
});
```

✔ Arquitectura modular y determinista.

✔ Alineado con principios ISTQB: separación por capas y auto-verificación 

✔ Developer Experience: tipado estricto, errores claros y logs medibles  

✔ Performance: lazy loading y control de contexto por escenario

### 🟦 Onboarding inmediato

Nuevos miembros solo deben conocer:

- Componentes
- Páginas
- Steps declarativos

No necesitan entender lógica interna.

# 🧬 5. BMS — Behavioral Metadata Standard

Es la pieza clave del modelo BAM.
BMS permite responder a:

- Qué requisito se validó
- Qué AC concretos
- Qué datos
- Qué componentes intervinieron
-  Qué falló y por qué (taxonomía)
-  Cuánto duró
-  Qué evidencias se generaron

Ejemplo simplificado:

```json
{
  "scenario": {
    "id": "TC-002",
    "name": "Successful login",
    "feature": "Login",
    "tags": [
      "@PRIORITY=HIGH",
      "@RISK=LOW",
      "@AC1=Welcome_message_includes_username"
    ]
  },
  "execution": {
    "durationMs": 2754,
    "timeline": [
      {
        "gherkin": "the user logs in with valid credentials",
        "status": "PASSED",
        "durationMs": 750,
        "actions": [
          {
            "name": "Button.click",
            "selector": { "value": "#login2" },
            "timing": { "actionMs": 53 }
          },
          // ... (actions continue)
        ]
      },
      {
        "gherkin": "the user should see his name in the top bar",
        "status": "PASSED",
        "actions": [
          {
            "name": "Wait.text(\"admin\")",
            "selector": { "value": "#nameofuser" },
            "status": "PASSED"
          }
        ]
      }
    ]
  }
}
```

# ✔️ 6. BAM Garantiza la Calidad en la Escritura de Pruebas
El Modelo BAM establece un marco unificado para diseñar, ejecutar y gobernar pruebas con trazabilidad total, alta mantenibilidad y métricas operativas alineadas con estándares ISTQB. 
- Un escenario expresa una única intención de negocio.
El título debe describir claramente el resultado esperado, no la secuencia de acciones.
- Steps basados en comportamiento, no en implementación
Gracias a su arquitectura por capas (Steps → Helpers → Components), BAM aísla la lógica técnica fuera del escenario.
- Lenguaje preciso y conciso, sin ambigüedades.
Cada frase debe ser verificable y comprensible por cualquier lector, incluso no técnico.
- Consistencia editorial en todo el proyecto.
Misma forma de nombrar, mismo estilo, mismas reglas. Las pruebas deben parecer escritas por una única persona.

Tanto el plugin ESLint como BAM Radar actúan como mecanismos de control para asegurar la calidad del modelo BAM

# 🚀 7. Estrategia de Adopción 

BAM está diseñado para la realidad de los equipos, no para laboratorios. Permite una adopción progresiva:

- Fase 1 (Telemetría): Ingesta de resultados actuales (JUnit/Cucumber) para generar BMS básico sin reescribir tests.

- Fase 2 (Diseño): Migración de módulos críticos a la arquitectura de 3 capas y componentes atómicos.

- Fase 3 (Gobernanza): Despliegue de Quality Gates basados en datos (e.g., "Bloquear release si Risk Coverage < 80%")


# 🤖 8. AI-Ready por Diseño

La Inteligencia Artificial necesita contexto estructurado, no logs de texto plano. Al formalizar el diseño (Capas) y la ejecución (BMS), BAM proporciona a la IA los datos limpios que necesita para:

- Sugerir nuevos escenarios basados en riesgos no cubiertos.
- Detectar patrones de flakiness invisibles al ojo humano.
- Auto-reparación de selectores (Self-Healing) con contexto semántico
- Propuestas de mejoras en assertions o diseño
- Evoluciona la estabilidad

# 📊 9. Reporting: BAM Radar


BAM Radar es un dashboard de análisis desplegable localmente que consume BMS y ayuda al QA en el día a día. Permite:
- Detectar y priorizar flaky tests
- Identificar requisitos “verde pero poco cubiertos"
- Apoyar el Root Cause Analysis
- Decidir dónde invertir esfuerzo de refactorización en cada sprint
- Visualizar métricas temporales,  


> Objetivo: ayudar a un QA Lead a **gobernar la suite**, no solo visualizarla.

---
# 🚦 10. Quality Gates (PoC)

Ejemplos posibles:

| Gate               | Regla                     |
| ------------------ | ------------------------- |
| Stability Gate     | 0% flaky tests            |
| Perf Gate          | p95 < umbral definido     |
| Risk Gate          | Criticidad 100% cubierta  |

---

# 🔧 11. Estado actual del PoC

| Área                          | Estado         |
| ----------------------------- | -------------- |
| Arquitectura base             | ✔️ Estable     |
| BMS Standard                  | ✔️ Operativo   |
| Component Model               | ✔️ Estable     |
| Dual Reporting JSON           | ✔️ Activo      |
| BAM Radar                     | 🚧 En desarrollo |
| Error Taxonomy avanzado       | 🚧 Parcial     |
| Exporters ALM                 | 🚧 Roadmap     |
| Self-Healing                  | 🔜 Futura fase |




# ⚔️ 12. Comparativa de modelos

| Criterio              | BDD clásico              | POM tradicional          | **BAM (PoC)**                                           |
| --------------------- | ------------------------ | ------------------------ | -------------------------------------------------------- |
| **Trazabilidad**      | ⚙️ Media                 | ❌ Baja                  | ✅ Alta (BMS: requisito ↔ escenario ↔ ejecución)          |
| **Mantenibilidad**    | ❌ Media/Baja (“step hell”) | ⚙️ Media/Alta           | ✅ Muy alta (componentes atómicos + pages declarativas)  |
| **Ruido / Fragilidad**| ❌ Alta                  | ⚙️ Media                 | 🟢 Baja (interacciones centralizadas)                    |
| **Observabilidad**    | ❌ Baja                  | ❌ Baja                  | 🟦 Alta (JSON estructurado + taxonomía de fallos)        |
| **Compatibilidad IA** | ⚙️ Media                | ❌ Baja                  | 🤖 Alta (estructura declarativa + metadatos BMS)         |
| **Escalabilidad**     | ⚙️ Media                | ⚙️ Media/Alta            | 🟢 Alta (arquitectura en 3 capas + estandarización)      |
| **Experiencia QA Lead**| ⚙️ Variable             | ⚙️ Buen control técnico  | ⭐ Excelente (gobernanza, métricas, raíz de fallos clara) |

# Autor 
He diseñado e implementado BAM a partir de mi experiencia creando frameworks de 
automatización y acompañando el trabajo diario de QA: estabilizando suites UI/API,  
entendiendo por qué fallan las pruebas y dónde se genera deuda de QA, priorizando qué refactorizar en cada sprint, y explorando cómo estructurar los datos de pruebas para que una IA pueda trabajar con ellos sin perder gobernanza.

**Rubén López**  
ruben@rulope.com  
GitHub: https://github.com/rubenlopez77  
LinkedIn: https://www.linkedin.com/in/ruben-lopez-qa/
