# 🧪 Behavior Annotation Model (BAM!) 


> ### ⚠️ Aviso importante — Community Edition (PoC)
> Esta edición es una **Proof of Concept (PoC)** diseñada para explorar arquitecturas QA alineadas con **ISTQB**, **IEEE 29119** e **ISO/IEC 25010**.
> Su objetivo es académico y de arquitectura: demostrar la viabilidad de un **Single Source of Truth** en QA.

![BAM Community Edition](https://img.shields.io/badge/BAM_Community_Edition-v0.1.5-blueviolet?logo=testcafe&logoColor=white&style=flat-square)

---

> *"La función del QA ya no es 'ver si funciona', sino orquestar la calidad desde la intención del negocio hasta la evidencia técnica."*

---

## 🎯 Propósito: ¿Por qué BAM?

Los frameworks de automatización tradicionales comparten tres problemas estructurales:

❌ Fragilidad: 

Los tests dependen de selectores, lógica repetida y flujos inconsistentes. Tests imperativos, alto acoplamiento y alta deuda.

❌ Silos de evidencia: 

Playwright genera su reporte, Cucumber otro, k6 otro… sin un estándar común.

❌ Ausencia de trazabilidad real

No se sabe:
- Qué requisito cubre cada test
- Qué AC se ha validado
- Qué dato se ha usado
- Qué componente ha fallado ni por qué

❌ Desconexión entre negocio y QA

> Los steps suelen describir cómo se hace algo, no qué se valida.

## 🟣 Un Single Source of Truth para gobernarlos a todos.

Un ecosistema unificado en el que todas las pruebas —funcionales, API y rendimiento— comparten un metamodelo común de evidencia.
Ese metamodelo es el BMS (Behavioral Metadata Standard).

>BAM no ejecuta pruebas: gobierna calidad.

## 🏛️ 2. Arquitectura en 3 capas (alineada con ISTQB)

BAM organiza todo el sistema de pruebas en tres capas bien definidas:

#### 2.1 Capa de Intención (Business / BDD)
-  Escenarios escritos en Gherkin puro.
-  Metadata BMS vía tags (@ID, @Module, @Risk, @AC1, @Data…).
-  Lenguaje entendible por negocio, QA y desarrollo.

> Aquí se define qué comportamiento queremos validar.

#### 2.2 Capa de Componentes (Design / Abstracción Técnica)

La Capa de Componentes es el corazón del diseño:

- Componentes atómicos: encapsulan selectores e interacciones.
- Pages declarativas: solo declaran qué componentes contienen.
- Helpers: orquestan flujos reutilizables (login, navegación, etc.).

> Aquí se define cómo interactuamos con el sistema, sin contaminar los tests.


#### 2.3 Capa de Ejecución (Runner / Orquestación)

BAM orquesta diferentes motores bajo un mismo estándar:

🖥️ UI: Playwright 

🔌 API: Axios / Playwright API

🚀 Performance: k6

> Independientemente del motor (se podría usar Selenium, Cypress, Appium, JMeter, Supertest.. ), el resultado se normaliza en un **BMS JSON común**.

## 🟦 3. Modelo de Componentes — Eliminando fragilidad estructural

El Component Model garantiza que toda interacción técnica está centralizada.

###  3.1 Componentes Atómicos

Cada interacción UI/API se encapsula en un componente o clase:

-  click, fill, waitFor, modal, alert, llamadas API…

Ventajas:

-  Un selector → un único lugar.

-  Reutilización masiva.

-  Cambios en la UI afectan al mínimo código posible.

-  Control de errores más preciso (componente, acción, selector).

###  3.2 Pages Declarativas
Una Page solo declara qué componentes contiene y cómo se combinan. Sin lógica “de negocio”.

```typescript
// Ejemplo de Page Object Declarativo en BAM
  async loginWith(set: CredentialSet) {
    await this.loginButton.click();
    await this.modal.waitVisible();
    await this.username.fill(set.username);
    await this.password.fill(set.password);
    await this.submitButton.click();
  }
```
>Esto reduce la deuda técnica y simplifica radicalmente la experiencia de desarrollo (DX).

### 3.3 Steps declarativos → Intención funcional
El Step representa intención funcional, no detalles técnicos.
```typescript
// Test declarativos. Prácticamente Gherkin
When('the user logs in with invalid credentials', async function () {
  const user = this.getPage(LoginPage);
  await user.loginWith(credentials.invalid);
});
```

✔ Onboarding rápido: Fácil de leer para nuevos miembros.
✔ Arquitectura modular y determinista.
✔ Alineado con principios ISTQB (separación por capas, auto-verificación).
✔ Mejor Developer Experience: tipado estricto, errores claros, logs medibles.
✔ Performance: lazy loading y control de contexto por escenario.

### 3.5 Robustez y manejo de errores
✔️ Lo que ya está disponible
- Cada acción registra: componente, selector, duración, error.
- El trace JSON es consistente y fácil de analizar.
- Contexto aislado por escenario.

⚠️ Lo que aún NO está implementado
- Retries inteligentes.
- Estrategias por entorno.
- Clasificación de errores.
- Recovery flows.
- Severidad técnica.

🔜 Lo que habilita la arquitectura

Como toda la lógica pasa por componentes, es posible implementar:
- Retries centralizados.
- Fallbacks por entorno.
- Manejo de UI volátil.
- Recuperación de estado.

➡️ T**odo sin modificar tests.**

## 🧬 4. BMS — Behavioral Metadata Standard
La pieza que permite trazabilidad completa

Los escenarios Gherkin incluyen metadata estructurada y auditable:
```gherkin
@ID=TC-002
@Title=Valid_login_shows_username
@Module=Authentication
@Component=Login
@AC1=Welcome_message_includes_username
@Data=credentials.valid
@Priority=HIGH
@Risk=LOW
Scenario: Successful login
```

BMS resuelve:
- Qué requisito cubre cada test
- Qué criterios de aceptación se validan.
- Qué datos se usaron
- Qué se ejecutó realmente y dónde falló.

### 4.1 Ejemplo SIMPLIFCADO de salida JSON 
```json
{
  "metadata": {
    "id": "TC-002",
    "title": "Valid_login_shows_username",
    "module": "Authentication",
    "component": "Login",
    "priority": "HIGH",
    "risk": "LOW",
    "acceptanceCriteria": [
      "Welcome_message_includes_username",
      "Login_modal_should_disappear_after_success"
    ],
    "requirements": ["AUTH-101"]
  },
  "execution": {
    "status": "PASSED",
    "durationMs": 2450,
    "steps": [
      { "component": "Navigation", "action": "openHomePage", "status": "PASSED" },
      { "component": "Login", "action": "loginWith", "status": "PASSED" }
    ]
  }
}

```

### 4.2 Governance BMS (cómo escala en equipos grandes)

**Naming conventions**
- @ID = prefijo + número.
- @REQ = ID de requisito (JIRA / ALM).
- Módulos y componentes definidos por equipo.

**Roles responsables**

- QA Lead / QA Architect definen convenciones.
- Cambios controlados por PR.
- Evolución gradual del estándar.
- Evolución gradual del estándar.

### 4.3 Validador BMS (CI/CD)

Los scripts de validación (/scripts/validate-bms.ts) pueden:
- Bloquear merges si la metadata es incorrecta.
- Comprobar formato y campos obligatorios.
- Detectar duplicados de ID.
- Verificar coherencia de prioridades y riesgos.

### 4.4 Relación con JIRA/ALM

En la versión actual:
- @REQ es un string libre que puede mapear a JIRA/Xray/Zephyr.
- Validación posible vía ficheros locales o convenciones de equipo.
- Exporters formales (JIRA, Xray, Zephyr) → en desarrollo.

>No se promete una integración que aún no existe, pero la arquitectura ya está preparada para ello.

### 📊 5. Reporting — Claro para negocio y técnico

El reporting parte de:
- Metadata BMS.
- Trace técnico.
- Pasos ejecutados.
- Duración.
- Componente / acción.
- Resultado y errores.

Esto permite construir:

- Informes funcionales para negocio.
- Informes técnicos para QA/Dev.
- Exportadores ALM.
- Dashboards (BAM Radar).
- Métricas de cobertura y riesgo.

Y todo esto unificado.

## 🚦 6. Quality Gates (CI/CD)

| Gate               | Regla               | Acción                |
| ------------------ | ------------------- | --------------------- |
| **Smoke Gate**     | 100% Critical Flows | 🟢 Deploy QA          |
| **Perf Gate**      | p95 < 200ms         | 🟡 Warning / 🔴 Block |
| **Stability Gate** | 0% flaky tests      | 🔴 Block release      |

Es posible definir reglas personalizadas de quality gate en el pipeline de CI/CD

## 🔧 7. Estado actual
| Área                      | Estado           |
| ------------------------- | ---------------- |
| Arquitectura base         | ✔️ Estable       |
| BMS Standard              | ✅ Completo       |
| Component Model           | ✔️ Estable       |
| Dual Reporting (JSON)     | ✔️ Estable       |
| BAM Radar (Dashboard Gobernanza) | ⚠️ En desarrollo |
| Error Handling Enterprise | ⚠️ En desarrollo |
| Exporters ALM             | ⚠️ Roadmap       |
| Self-Healing              | 🔜 Próxima fase  |

## 🦕 8. DINO — IA Declarativa para potenciar BAM (opcional)

**DINO** (Declarative Intelligence Orchestration) es un proyecto complementario a BAM, aún en fase inicial (PoC).

- 🚧 Estado: fase inicial.
- 🧠 Foco: modelos locales (Ollama, LM Studio).
- 💬 Rol: asistencia, no sustitución del QA.
- 🔒 Privacidad: no envía datos a la nube.

Objetivo: automatizar tareas repetitivas alrededor de BAM:
- Generación de escenarios.
- Generación/validación de metadata BMS.
- Análisis de errores.
- Sugerencia de nuevos casos.


## 📏 9. Alineación con estándares de calidad

BAM no “certifica” cumplimiento, pero su diseño se alinea con:
| Norma / Marco     | Estado | Alineación                                    |
| ----------------- | ------ | --------------------------------------------- |
| **ISTQB 2023+**   | ✅      | Capas separadas, autochecking, mantenibilidad |
| **IEEE 29119-3**  | 🚧     | Avance hacia IDs/artefactos formales          |
| **ISO/IEC 25010** | ✅      | Mantenibilidad + analizabilidad               |
| **ISO/IEC 25002** | ✅      | Base para métricas cuantitativas              |

> Estos estados reflejan alineación de diseño, no una auditoría oficial ni una certificación formal.

## ⚔️ 10. Comparativa de modelos
| Criterio            | BDD clásico                | POM tradicional         | **BAM (PoC Beta)**                                 |
| ------------------- | -------------------------- | ----------------------- | -------------------------------------------------- |
| Trazabilidad        | ⚙️ Buena (escenarios)      | ❌ Limitada (UI técnica) | ✅ Alta (BMS: requisito ↔ escenario ↔ ejecución)    |
| Mantenibilidad      | ❌ Media/Baja (“step hell”) | ✅ Buena (BOs claros)    | ✅ Alta (componentes atómicos + pages declarativas) |
| Velocidad           | ❌ Menor (overhead BDD)     | ✅ Alta                  | ⚙️ Media (capa extra + trazas)                     |
| Visibilidad negocio | ✅ Alta                     | ❌ Baja                  | ✅ Alta (Gherkin + metadata BMS)                    |
| Deuda técnica       | ❌ Alta                     | ⚙️ Media                | ✅ Reducida (selectores en componentes)             |
| Compatibilidad IA   | ✅ Buena                    | ❌ Baja                  | ⚙️ Muy buena (estructura clara para DINO)          |
| Escalabilidad       | ⚙️ Media                   | ✅ Buena                 | ✅ Alta (component model + BMS + reporting)         |
| Observabilidad      | ❌ Baja                     | ❌ Baja                  | ✅ Mejorada (logger + tracer JSON integrados)       |



🧩 11. Flujo Completo (Arquitectura)
Gherkin (Intención de negocio)
       ↓
Capa de Componentes y Pages (Modelo de diseño)
       ↓
BAM Runner — Playwright / Axios / k6 (Ejecución)
       ↓
BMS JSON v2.1 (Single Source of Truth)
       ↓
Quality Gates (CI/CD)
       ↓
BAM Radar (Reporting unificado para negocio y técnico)



## 🧑‍🔬 Contacto
**Rubén López**  - ruben@rulope.com
[GitHub](https://github.com/rubenlopez77) 
[LinkedIn](https://www.linkedin.com/in/ruben-lopez-qa/)
