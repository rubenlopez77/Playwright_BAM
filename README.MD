# 🧪 Behavior Annotation Model (BAM!) — Community Edition (PoC)

> ### ⚠️ Aviso importante — Proof of Concept  
> Esta edición es un **PoC evolutivo**, creado para explorar cómo podría estructurarse la gobernanza de calidad en automatización según principios **ISTQB**, **IEEE 29119** e **ISO/IEC 25010**.  
> No pretende ser un framework “cerrado”, sino una **propuesta arquitectónica** para experimentar con diseño declarativo, trazabilidad y telemetría unificada.

![BAM Community Edition](https://img.shields.io/badge/BAM_Community_Edition-v0.1.5-blueviolet?style=flat-square)

---

> *"La función del QA ya no es 'ver si funciona', sino orquestar la calidad desde la intención del negocio hasta la evidencia técnica."*

---

# 🎯 1. Propósito: ¿Qué intenta resolver BAM?

BAM nace para explorar cómo un equipo QA podría **gobernar** —no solo ejecutar— la automatización.  
En la práctica, intenta responder a cuatro problemas habituales:

### ❌ 1. Falta de fiabilidad  
Tests frágiles, flaky tests, reintentos, ruido.  
La suite “verde” en apariencia, pero poco confiable.

### ❌ 2. Evidencia dispersa  
Playwright genera un tipo de reporte, Cucumber otro, k6 otro.  
No existe *una única fuente de verdad*.

### ❌ 3. Ausencia de trazabilidad funcional  
Los frameworks tradicionales no responden a:

- Qué requisito cubre cada escenario  
- Qué AC fueron validados  
- Qué datos se usaron  
- Qué módulo o componente falló realmente  

### ❌ 4. Desconexión entre intención de negocio y ejecución técnica  
Los steps suelen describir *cómo* interactuar con la UI, no *qué comportamiento* se está validando.

---

# 🟣 2. BAM como modelo: un Single Source of Truth para QA

BAM propone una visión simple:

> **Tests funcionales, API y rendimiento pueden compartir un metamodelo común de evidencias.**

Ese metamodelo es el **BMS (Behavior Metadata Standard)**:  
un JSON canónico que representa cada ejecución con semántica clara y trazable.

BAM **no es un runner**.  
BAM no reemplaza Playwright ni Cypress.  
BAM **gobierna** la estructura, la intención y la telemetría.

---

# 🏛️ 3. Arquitectura en 3 capas (alineada con ISTQB)

El diseño se basa en la separación clásica de responsabilidades, pero aplicada con rigor QA:

---

## 3.1 Capa de Intención (Business / Declarativa)

- Escenarios legibles por negocio (pseudo-Gherkin).  
- Metadatos estructurados: `@REQ`, `@AC`, `@Risk`, `@Data`…  
- Define **qué** se quiere validar, no *cómo*.

---

## 3.2 Capa de Componentes (Abstracción Técnica)

Una capa totalmente encapsulada:

- Componentes UI/API atómicos  
- Pages declarativas  
- Helpers reutilizables  
- Selectores centralizados  

> La intención funcional queda aislada de los detalles técnicos.

---

## 3.3 Capa de Ejecución (+ Telemetría BMS)

La ejecución la realiza el motor elegido (Playwright, Axios, k6…).  
BAM solo añade:

- trazabilidad,  
- metadatos,  
- taxonomía de fallos,  
- estructura común para todos los tipos de pruebas.  

El resultado es siempre un **BMS JSON** homogéneo.

---

# 🟦 4. Modelo de Componentes — Eliminando fragilidad


🟦 Componentes atómicos

Cada interacción (click, fill, wait, modal, alert…) se centraliza en un componente o clase.
```ts
async fill(value: string) {
    return this.world.interactionService.run(
      "Textbox.fill",
      { selector: this.selector, value },
      async () => {
        await this.loc.waitFor({ state: "visible" });
        await this.loc.click();
        await this.loc.fill(value);
        await this.page.waitForLoadState("domcontentloaded");
      }
    );
  }
```
Ventajas:

Un selector → un único lugar
Reutilización masiva
Cambios UI afectan al mínimo código posible
Control de errores

🟦 Pages declarativas

Una página solo indica qué componentes contiene.
Sin lógica técnica.
```ts
  async loginWith(set: CredentialSet) {
    await this.loginButton.click();
    await this.modal.waitVisible();
    await this.username.fill(set.username);
    await this.password.fill(set.password);
    await this.submitButton.click();
  }
```

🟦 Steps declarativos y limpios

El Step representa intención funcional:
```ts
When('the user logs in with valid credentials', function () {
  const user = this.getPage(LoginPage);
  user.loginWith(credentials.valid);
});
```
✔ Arquitectura modular y determinista.
✔ Alineado con principios ISTQB: separación por capas y auto-verificación
✔ Developer Experience: tipado estricto, errores claros y logs medibles
✔ Performance: lazy loading y control de contexto por escenario


---

# 🧬 5. BMS — Behavioral Metadata Standard

Es la pieza clave del modelo BAM.

### BMS permite responder a:

- Qué requisito se validó  
- Qué AC concretos  
- Qué datos  
- Qué componentes intervinieron  
- Qué falló y por qué (taxonomía)  
- Cuánto duró  
- Qué evidencias se generaron

### Ejemplo simplificado:

```json
{
  "metadata": {
    "id": "TC-002",
    "requirements": ["AUTH-101"],
    "risk": "LOW",
    "acceptanceCriteria": ["Welcome_message_includes_username"]
  },
  "execution": {
    "status": "PASSED",
    "durationMs": 2450
  }
}
```

### Relación con ALM (JIRA, Xray, Zephyr)

Actualmente:  
- tags libres `@REQ=AUTH-101`  
- validación local de formato  

Roadmap (PoC):  
- exporters,  
- validadores externos,  
- sincronización ligera.

---

# 📊 6. Reporting y BAM Radar

BAM Radar es un experimento de dashboard local (en desarrollo) que consume BMS para:

- detectar flaky tests,  
- encontrar requisitos “verde pero débiles”,  
- visualizar métricas temporales,  
- ayudar en Root Cause Analysis.  

> Objetivo: ayudar a un QA Lead a **gobernar la suite**, no solo visualizarla.

---

# 🚦 7. Quality Gates (PoC)

Ejemplos posibles:

| Gate               | Regla                     |
| ------------------ | ------------------------- |
| Stability Gate     | 0% flaky tests            |
| Perf Gate          | p95 < umbral definido     |
| Risk Gate          | Criticidad 100% cubierta  |

---

# 🔧 8. Estado actual del PoC

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

---

# 🦕 9. DINO (Opcional): IA Declarativa

Proyecto complementario (PoC) cuyo objetivo es permitir:

- sugerencia de escenarios,  
- validación de metadata BMS,  
- análisis de patrones de error,  
- explicabilidad técnica.

No forma parte del core BAM actual.

---

# 📏 10. Alineación con estándares de calidad

BAM no “certifica” cumplimiento, pero su diseño se inspira en los principios de varios marcos reconocidos:

| Norma / Marco     | Estado | Alineación                                                                 |
| ----------------- | ------ | --------------------------------------------------------------------------- |
| **ISTQB 2023+**   | ✅     | Separación por capas, mantenibilidad, diseño declarativo, autochecking      |
| **IEEE 29119-3**  | 🚧     | Avance hacia IDs formales, trazabilidad estructurada y artefactos controlados |
| **ISO/IEC 25010** | ✅     | Mantenibilidad, analizabilidad, estructura modular                          |
| **ISO/IEC 25002** | ✅     | Base para métricas cuantitativas y criterios de evaluación                  |


---

# ⚔️ 11. Comparativa de modelos

| Criterio              | BDD clásico              | POM tradicional          | **BAM (PoC)**                                           |
| --------------------- | ------------------------ | ------------------------ | -------------------------------------------------------- |
| **Trazabilidad**      | ⚙️ Media                 | ❌ Baja                  | ✅ Alta (BMS: requisito ↔ escenario ↔ ejecución)          |
| **Mantenibilidad**    | ❌ Media/Baja (“step hell”) | ⚙️ Media/Alta           | ✅ Muy alta (componentes atómicos + pages declarativas)  |
| **Ruido / Fragilidad**| ❌ Alta                  | ⚙️ Media                 | 🟢 Baja (interacciones centralizadas)                    |
| **Observabilidad**    | ❌ Baja                  | ❌ Baja                  | 🟦 Alta (JSON estructurado + taxonomía de fallos)        |
| **Compatibilidad IA** | ⚙️ Media                | ❌ Baja                  | 🤖 Alta (estructura declarativa + metadatos BMS)         |
| **Escalabilidad**     | ⚙️ Media                | ⚙️ Media/Alta            | 🟢 Alta (arquitectura en 3 capas + estandarización)      |
| **Experiencia QA Lead**| ⚙️ Variable             | ⚙️ Buen control técnico  | ⭐ Excelente (gobernanza, métricas, raíz de fallos clara) |


---

# 🧩 12. Flujo completo (visión conceptual)

```
Intención (pseudo-Gherkin)
       ↓
Componentes / Pages
       ↓
Ejecución Playwright / Axios / k6
       ↓
BMS JSON (Single Source of Truth)
       ↓
Quality Gates (CI/CD)
       ↓
BAM Radar (Gobernanza)
```

---

# 🧑‍🔬 Contacto

**Rubén López**  
ruben@rulope.com  
GitHub: https://github.com/rubenlopez77  
LinkedIn: https://www.linkedin.com/in/ruben-lopez-qa/
