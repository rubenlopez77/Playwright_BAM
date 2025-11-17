# 🧪 Behavior Annotation Model (BAM!) · Playwright + Cucumber + TypeScript

> ### ⚠️ Aviso importante — Community Edition (PoC)
>
> Esta edición del repositorio es una **versión recortada y demostrativa** del modelo  
> **BAM – Behavioral Automation Model**. Su objetivo es mostrar la arquitectura,  
> la organización por componentes y el estándar BMS, **no entregar un framework productivo**.
>
> Forma parte de una **Proof of Concept** diseñada para explorar arquitecturas QA
> alineadas con principios **ISTQB (2023+), IEEE 29119**, **ISO/IEC 25010**  
> y **ISO/IEC 25002 (SQuaRE)**.
>
> Se publica únicamente para **análisis, revisión y crítica técnica** como parte del
> proceso de madurez del modelo.

>
![BAM Community Edition](https://img.shields.io/badge/BAM_Community_Edition-v0.1.5-blueviolet?logo=testcafe&logoColor=white&style=flat-square)



**Estado:** Experimental / No productivo  / 

[![CI](https://github.com/rubenlopez77/Playwright_BAM/actions/workflows/bam.yml/badge.svg)](https://github.com/rubenlopez77/Playwright_BAM/actions/workflows/bam.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=bugs)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=rubenlopez77_Playwright_fun&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=rubenlopez77_Playwright_fun)

---

> <div align="center">
> <em>La función del QA ya no es “ver si funciona”, sino orquestar la calidad desde la intención del negocio hasta la evidencia técnica de ejecución.</em>
> </div>


---

## ℹ️ Sobre este proyecto 

Este repositorio forma parte de una **Proof of Concept (BAM!)** diseñada para explorar
arquitecturas de automatización QA alineadas con principios **ISTQB**, **IEEE 29119**,
**ISO/IEC 25010** e **ISO/IEC 25002 (SQuaRE)**.

Se comparte públicamente para **análisis, revisión y crítica técnica** como parte del proceso
de madurez del modelo.

Aunque mi stack principal es C#/Selenium, este PoC está implementado en TypeScript para validar
ideas relacionadas con trazabilidad, estandarización y orquestación unificada dentro de BAM.


## ⚙️ ¿Qué es BAM?

BAM no es “otro framework más” por encima de Playwright o Selenium.  

Es un **modelo de orquestación de calidad** diseñado para unir:

- La intención del negocio
- El diseño de pruebas
- La ejecución técnica
- La evidencia final

La función del QA ya no es validar si “algo funciona”, sino **orquestar la calidad** desde los requisitos hasta la traza de ejecución.  

BAM estructura cómo debe hacerse esa orquestación.

---

## 📌 ¿Por qué existe BAM?

Los frameworks tradicionales se centran en *cómo automatizar*, pero no en *cómo gobernar la calidad*.  

BAM aborda los problemas reales que sufren equipos QA cuando las suites crecen y la automatización se convierte en deuda técnica.

---

## 🧪 ¿Por qué una Community Edition?
>Este repositorio muestra una **versión recortada del modelo BAM**, centrada en:
>- Arquitectura por componentes
>- Metadata BMS (BAM Metadata Standard)
>- Reporting unificado básico
>- Ejemplos de estructura.
>No incluye la implementación completa (paralelismo determinista, tracer empresarial,
error handling avanzado, self-healing, exporters ALM...).

>La versión completa se desarrolla en repositorios privados.

---


# 2. ¿Qué problemas resuelve BAM?

Su objetivo  es **poner orden** donde mejor se necesita: cómo se diseñan, organizan y ejecutan las pruebas dentro de un equipo.

La mayoría de frameworks de automatización empiezan bien y terminan acumulando:

- Duplicación de código,  
- Steps difíciles de leer,  
- Selectores por todos lados,  
- Reporting inconsistente,  
- Trazabilidad nula entre requisitos y pruebas.

BAM aborda directamente los problemas más comunes.

---

### ❌ Problemas habituales en automatización UI

### 1. Pruebas difíciles de leer y mantener
- Steps mezclan lógica técnica y de negocio  
- Page Objects gigantes  
- Un flujo simple requiere navegar por varios archivos  

### 2. Mantenimiento inviable cuando la suite crece
- Selectores duplicados  
- Lógica repetida  
- Cascada de fallos tras cualquier cambio UI  

### 3. Imposibilidad de saber qué cubren las pruebas
- Steps ambiguos  
- Escenarios poco expresivos  
- Sin conexión con AC o requisitos  

### 4. Onboarding lento
- Nuevos miembros tardan semanas en entender el framework  
- Mucho boilerplate y patrones inconsistentes  

### 5. Reporting pobre
- Logs dispersos  
- Fallos difíciles de rastrear  
- No se sabe qué componente falló  

### 6. Desconexión entre negocio y QA
Los steps representan *cómo* se hace algo, no *qué se valida*.

---

## ✔️ ¿Cómo lo resuelve BAM?

### 🟦 Componentes atómicos
Cada interacción (click, fill, wait, modal, alert…) se centraliza en **un componente** o clase.

Ventajas:

- Un selector → un único lugar
- Reutilización masiva
- Cambios UI afectan al mínimo código posible
- Control de errores

### 🟦 Pages declarativas

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

### 🟦 Robustez y manejo de errores (estado actual y roadmap)
✔️ Lo que ya está disponible
- Cada acción registra: componente, selector, duración, error.
-  El trace JSON es consistente y fácil de analizar.

⚠️ Lo que aún NO está implementado 
- Retries inteligentes
- Estrategias por entorno
- Clasificación de errores
- Recovery flows
- Severidad

🔜 Lo que habilita la arquitectura

Como toda la lógica pasa por componentes, es posible implementar:

- Retries centralizados
- Fallbacks
- Manejo de UI volátil
- Recuperación de estado

Todo sin modificar tests.
# 4. Trazabilidad real mediante BMS ( BAM Metadata Standard ) 
Los escenarios suelen ser ambiguos.
BMS aporta estructura, claridad y trazabilidad.

❌ Problemas reales:
- No se sabe qué requisito cubre un test
- No se sabe qué AC valida
- Estimaciones de cobertura son especulativas
- Reporting pobre
- Integración con negocio complicada

✔️ Declaración simple mediante tags Gherkin
``` gherkin
@ID=TC-002
@Title=Valid_login_shows_username
@Description=Valid_user_logs_in_and_sees_his_name_in_the_navbar
@Module=Authentication
@Component=Login
@Pre=User_not_authenticated
@AC1=Welcome_message_includes_username
@AC2=Login_modal_should_disappear_after_success
@Data=credentials.valid
@Priority=HIGH
@Risk=LOW
@Label=DEBUG
Scenario: Successful login
  Given the user opens the home page
  When the user logs in with valid credentials
  Then the user should see his name in the top bar

```


###  🟦 Governance BMS (cómo escala en equipos grandes)
### Naming conventions

- @ID = prefijo + número
- @REQ = Requirement ID
- Módulos y componentes definidos por equipo

### Roles responsables

- QA Lead / QA Architect definirá las convenciones
- Cambios controlados
- Cambios a través de PR

Validador evita metadata incorrecta

###  🟦 Validador BMS (CI/CD)
- **Impide merges** si falla
- El validador /scripts/validate-bms.ts:
- Comprueba formato
- Detecta duplicados
- Verifica prioridades y riesgos


###  🟦 Relación con JIRA / ALM 

Hoy por hoy:

- @REQ es un string libre
- Puede validarse via fichero local
- Exporters JIRA/Xray/Zephyr → en desarrollo

No se promete una integración que aún no existe. Pero existirá.

###  🟦 Ejemplo salida JSON 

```json
{
  "metadata": {
    "id": "TC-002",
    "title": "Valid_login_shows_username",
    "description": "Valid_user_logs_in_and_sees_his_name_in_the_navbar",
    "module": "Authentication",
    "component": "Login",
    "priority": "HIGH",
    "risk": "LOW",
    "preconditions": ["User_not_authenticated"],
    "acceptanceCriteria": [
      "Welcome_message_includes_username",
      "Login_modal_should_disappear_after_success"
    ],
    "testData": "credentials.valid",
    "requirements": ["AUTH-101"]
  },
  "execution": {
    "status": "PASSED",
    "durationMs": 2450,
    "steps": [
      { "component": "Navigation", "action": "openHomePage", "status": "PASSED" },
      { "component": "Login", "action": "loginWith", "status": "PASSED" },
      { "component": "Wait", "action": "waitForUserDisplay", "status": "PASSED" }
    ]
  }
}

```

---

# 5. Reporting claro para negocio y técnico

El reporting parte de:
- metadata BMS
- trace técnico
- pasos ejecutados
- duración
- componente
- resultado

Esto permite crear:
- informes funcionales
- informes técnicos
- exportadores ALM
- dashboards
- métricas de cobertura

Sin estar atado a herramientas externas

---

# 6. Estado actual

| Área                      | Estado           |
| ------------------------- | ---------------- |
| Arquitectura base         | ✔️ Estable       |
| BMS Standard              | ✅ Completado    |
| Component Model           | ✔️ Estable       |
| Dual Reporting (JSON)     | ✔️ Estable       |
| Error Handling Enterprise | ⚠️ En desarrollo |
| Exporters ALM             | ⚠️ Roadmap       |
| Self-Healing              | 🔜 Próxima fase  |

---
# 7. DINO – IA local opcional para potenciar BAM

DINO (*Declarative Intelligence Orchestration*) es un **proyecto complementario** a BAM, todavía en fase inicial (PoC).  
No forma parte del núcleo del framework; es una herramienta opcional para equipos que quieran **automatizar tareas repetitivas alrededor de BAM**, manteniendo siempre la **privacidad** mediante modelos IA locales.

🦕 [Repositorio de DINO](https://github.com/rubenlopez77/DINO)

### Estado actual
- 🚧 Fase inicial (Proof of Concept)
- 🧠 Enfocado en modelos locales (Ollama, LM Studio)
- 💬 Asistencia, no sustitución del QA
- 🔒 No envía datos a la nube

---

## Objetivos funcionales de DINO

> Algunos están implementados parcialmente, otros en fase de diseño.

- ✔ Decorar features Gherkin con metadata BMS
- ✔ Validar que los tests cumplen las reglas BAM (sin `await`, estructura declarativa, runner correcto)
- ✔ Detectar huecos entre requisitos, AC, features y pasos implementados
- ✔ Ayudar a generar documentación viva (Test Plan, matrices de cobertura, trazabilidad)
- ✔ Reducir tiempo de diseño de pruebas y elevar su calidad
- ✔ Funcionar 100% offline mediante IA local

---

## Ejemplos de uso (conceptuales)

### 🟦 1. Generación automática de steps/tests BAM (característica clave)

DINO puede analizar un feature Gherkin y sugerir:

- El método de página a invocar  
- El componente BAM apropiado (Button, Wait, Modal, Navigation…)  
- El nombre del step  
- La estructura declarativa correcta (sin `await`)  
- El patrón recomendado según las reglas del plugin ESLint BAM UX  

Ejemplo conceptual:

Entrada:

```gherkin
Scenario: User searches for a product
  Given the user is on the home page
  When the user searches for "Laptop"
  Then the results should contain "Laptop"
```

Salida sugerida:
``` ts
When('the user searches for {string}', function (query: string) {
  const user = this.getPage(HomePage);
  user.searchesFor(query);
});

```

Esto no sustituye al QA, pero acelera el diseño y la escritura 
 de nuevas pruebas. El QA Como orquestador.

### 🟦 1. Añadir metadata BMS a un feature Gherkin

Entrada:

```gherkin
Feature: Login
  Scenario: User logs in successfully
    Given the user opens the home page
    When the user logs in with valid credentials
    Then the user should see his name in the top bar

```

Salida sugerida por DINO:

```
@ID=TC-002
@Title=Valid_login_shows_username
@Description=Valid_user_logs_in_and_sees_his_name_in_the_navbar
@Module=Authentication
@Component=Login
@Pre=User_not_authenticated
@AC1=Welcome_message_includes_username
@AC2=Login_modal_should_disappear_after_success
@Data=credentials.valid
@Priority=HIGH
@Risk=LOW
Scenario: User logs in successfully
```

### 🟦  2. Analizar trazas de ejecución BAM

DINO puede interpretar un JSON BAM para:
- Identificar el componente responsable del fallo
- Sugerir la causa probable (selector, timing, transición, datos…)
- Proponer mejoras sobre el componente afectado
- Señalar patrones de flakiness

### 🟦  3. Construir documentación viva

A partir de:
- Features con BMS
- Resultados JSON de ejecución
- Módulos y componentes
- Prioridades y riesgos
- DINO puede generar borradores de:
- Matrices de cobertura
- Secciones de un Test Plan
- Informes de calidad para PO/negocio
- Resúmenes agrupados por módulo o componente

>Importante:
DINO es un asistente para acelerar el trabajo del QA, no una capa mágica ni un sustituto del juicio humano.
# 8. Preguntas frecuentes (FAQ)

### ❓ ¿Puede migrarse a Selenium/WebdriverIO/Cypress/X?

Sí!
El modelo es desacoplado del motor de automatización. 

La arquitectura de BAM es portable a otros stacks (Selenium, WebdriverIO, etc.), siempre que se respete el modelo de componentes + metadata + reporting.

Este repositorio solo contiene el PoC en TypeScript/Playwright.

### ❓ ¿Es BAM solo otra capa de abstracción encima de Playwright?

No.  
BAM no envuelve Playwright “porque sí”, sino que define una **arquitectura de componentes + metadata BMS + reporting estructurado**:

- Los selectores viven en componentes atómicos, no repartidos por steps.
- La trazabilidad se basa en BMS, no en convenciones ad-hoc.
- El reporting parte de un modelo de datos JSON unificado.

Playwright sigue siendo el motor de automatización; BAM define *cómo* organizar las pruebas alrededor de él.

---

### ❓¡¡Esto es over-engineering!!

Para suites pequeñas, obviamente sí. Para 500+ tests con múltiples equipos la estructura paga el overhead con creces en mantenibilidad.

---

### ❓ ¿Tengo que reescribir todo mi framework para usar BAM?

No.  
BAM está pensado para adoptarse **de forma incremental**:

- Puedes empezar usando solo BMS (metadata) en tus features actuales.
- Después, extraer componentes atómicos en nuevas áreas del producto.
- Progresivamente, mover lógica de Page Objects a componentes BAM.
- Mantener en paralelo partes antiguas (POM clásico) y nuevas (BAM) durante la transición.

No es un “todo o nada”, ni requiere un rewrite completo para aportar valor.

---

### ❓ ¿Cómo asegura BAM la consistencia de los tests en un equipo distribuido?

Mediante:

- **BMS (BAM Metadata Standard)**: todos los escenarios siguen la misma estructura de tags.
- **Governance BMS**: naming conventions, roles claros (QA Lead/Architect) y cambios mediante PR.
- **Validador BMS en CI**: bloquea merges si la metadata no cumple el estándar.
- **Modelo de componentes**: todos los flujos UI reutilizan el mismo set de componentes, evitando divergencias locales.

El objetivo es que un escenario escrito por una persona de un equipo remoto se parezca mucho a uno escrito por otra persona en otro equipo.

---

### ❓ ¿Cómo se integra BAM con nuestro ALM actual (JIRA, Xray, etc.)?

Hoy:

- `@REQ` y otros campos BMS se pueden mapear a IDs de JIRA/Xray/Xray/TestRail.
- El JSON de ejecución expone la metadata necesaria para construir integraciones.
- Es posible crear scripts propios que lean el JSON y actualicen el ALM.

En el roadmap público:

- Exporters específicos para Xray, Zephyr y TestRail.

BAM no impone un ALM concreto, pero está diseñado para trabajar bien con cualquiera.

---

### ❓ ¿Qué métricas de calidad de automatización proporciona BAM?

Con la implementación actual se pueden obtener:

- Duración por escenario y por componente.
- Estado de cada test (passed/failed) asociado a su metadata BMS.
- Distribución de pruebas por módulo, prioridad, riesgo, etc.
- Componentes más utilizados (y, por tanto, más críticos).

En el roadmap se incluye:

- Flakiness score por escenario/componente.
- Hotspots de errores.
- Tendencias en el tiempo.

---

### ❓ ¿Cómo maneja BAM iframes, ventanas emergentes y otros elementos complejos?

A nivel de arquitectura:

- Se crean componentes específicos para iframes, modales, popups, etc.
- La lógica de cambio de contexto (por ejemplo, `frameLocator`) vive dentro del componente, no en cada test.

El PoC actual está más centrado en flujos UI estándar, pero el patrón de componentes está preparado para encapsular también casos complejos.

---

### ❓ ¿Puedo usar BAM para pruebas de API y UI en el mismo test?

La arquitectura de BAM es agnóstica al tipo de interacción.  
Aunque el PoC está orientado a UI con Playwright, los mismos principios (componentes + BMS + reporting) pueden aplicarse a:

- Componentes de API.
- Componentes de servicios internos.
- Otros tipos de verificación.

La combinación UI + API en un mismo escenario es posible siempre que se mantenga la claridad de intención en el Gherkin.

---

### ❓ ¿Cómo puedo ver qué user stories tienen pruebas automatizadas y su estado?

Aquí entran en juego BMS y el reporting JSON:

- `@REQ` y otros campos BMS permiten vincular escenarios a user stories o requisitos.
- El JSON de ejecución incluye tanto la metadata como el estado de cada escenario.
- A partir de ahí, se pueden generar vistas o informes:

  - “US → escenarios asociados → últimos resultados”
  - Matrices de trazabilidad (REQ ↔ Test ↔ Resultado)

En el futuro, los exporters ALM y herramientas como DINO podrán ayudar a construir estos informes de forma más automática.


---
### ❓ ¿Cuánta curva de aprendizaje requiere?

Menor en steps, media en arquitectura.
Es más simple que un POM tradicional a largo plazo.

---
### ❓ ¿Requiere integraciones externas?

No.
Funciona con cualquier ALM mediante scripts o exporters.

### ❓ ¿Es “enterprise-ready”?

No en este momento.

---
### ❓¿Por qué TypeScript si tu expertise es C#?"
Elegí TypeScript para validar la arquitectura en stack moderno y demostrar adaptabilidad. El modelo es portable a C#/Selenium.

Tambien  sirve para actualizarme a mi mismo :)

--- 

#  9. ✅ Alineación con estándares de calidad

BAM no pretende “certificar” el cumplimiento de normas, pero sí está **diseñado para alinearse** con principios reconocidos como **ISTQB 2023+**, **IEEE 29119** e **ISO/IEC 25010 / 25002**.

A nivel de arquitectura favorece:

🔹 **Ejecución secuencial controlada** → reduce condiciones de carrera y hace el resultado más determinista  
🔹 **Independencia de pruebas** → cada escenario tiene su contexto y flujo definido  
🔹 **Tests declarativos** → sin `await` visibles en los tests, delegando la asincronía al runner

| Norma / Marco           | Estado actual          | Descripción breve                                                   |
|-------------------------|------------------------|----------------------------------------------------------------------|
| **ISTQB (2023+)**       | ✅ Alineado            | Capas separadas, auto-verificación explícita, foco en mantenibilidad |
| **IEEE 29119-3**        | 🚧 En exploración      | BMS y trazabilidad avanzan hacia un modelo de IDs y artefactos más formales |
| **ISO/IEC 25010:2023**  | ✅ Alineado            | La arquitectura está orientada a mejorar mantenibilidad y analizabilidad |
| **ISO/IEC 25002:2024**  | ✅ Alineado            | El reporting JSON permite construir métricas y evaluaciones de calidad |

> Estos estados reflejan **alineación de diseño**, no una auditoría oficial ni un cumplimiento certificado.

##  10.  🧮 Comparativa de modelos

| **Criterio**           | **BDD clásico**                         | **POM tradicional**                       | **BAM (PoC Beta)**                                          |
|------------------------|-----------------------------------------|-------------------------------------------|-------------------------------------------------------------|
| **Trazabilidad**       | ⚙️ Buena (escenarios)                  | ❌ Limitada (enfocada a UI técnica)       | ✅ Alta (BMS: requisito ↔ escenario ↔ ejecución)            |
| **Mantenibilidad**     | ❌ Media/Baja (duplicación de steps)   | ✅ Buena (responsabilidades claras)       | ✅ Alta (componentes atómicos + pages declarativas)         |
| **Velocidad**          | ❌ Menor (overhead BDD)                | ✅ Alta (llamadas directas)               | ⚙️ Media (capa extra de orquestación y trazas estructuradas) |
| **Visibilidad negocio**| ✅ Alta (Gherkin legible)              | ❌ Baja (código técnico)                  | ✅ Alta (Gherkin + metadata BMS)                            |
| **Deuda técnica**      | ❌ Alta (“step hell”)                  | ⚙️ Media (riesgo de crecer en BOs)        | ✅ Reducida (selectores y lógica aislados en componentes)   |
| **Compatibilidad IA**  | ✅ Buena (lenguaje natural)            | ❌ Baja (código disperso)                 | ⚙️ Buena (estructura clara para herramientas como DINO)    |
| **Escalabilidad**      | ⚙️ Media (steps complejos)            | ✅ Buena (si se gobierna bien)            | ✅ Alta (component model + BMS + reporting unificado)       |
| **Observabilidad**     | ❌ Baja (logging manual)               | ❌ Baja (logs ad-hoc)                     | ✅ Mejorada (logger + tracer JSON integrados)               |

> La tabla refleja **tendencias arquitectónicas**, no benchmarks de rendimiento.  
> BAM introduce una capa adicional de estructura a cambio de mayor claridad, trazabilidad y gobernanza.

## 131 Limitaciones del repositorio (Edición "Community")

Este repositorio publica la **arquitectura conceptual BAM**, ejemplos de features, 
el estándar BMS y los scripts necesarios para validar la metadata.

Sin embargo, **no incluye deliberadamente**:

- El `ExecutionContext` completo  
- El `Runner` determinista  
- El sistema de **paralelización por workers**  
- El `Component Model` avanzado  
- El `Logger/Tracer` empresarial  
- La gestión de errores centralizada  
- El scheduler interno de acciones  
- Arquitectura multi-actor  
- Integración con CI intensiva  
- Heurísticas de self-healing  
- Implementación interna del sistema de reporting avanzado  

### ¿Por qué?

Porque este repositorio representa la **edición Community**, destinada a:

- Difundir el modelo conceptual BAM  
- Mostrar capacidad de diseño arquitectónico  
- Recoger feedback técnico  
- Facilitar ejemplos de BMS y estructura  

Pero la implementación completa forma parte de la **edición privada**, mantenida en un repositorio privado.

### ¿Qué sí puedes encontrar aquí?

- El estándar BMS (BAM Metadata Standard)  
- Features Gherkin con ejemplos reales  
- Scripts de validación (`validate-bms.ts`)  
- Estructura recomendada de carpetas  
- Documentación, arquitectura y roadmap  
- El plugin ESLint BAM UX (ver siguiente sección)  

Esta edición sirve como una **referencia conceptual**, no como framework instalable de producción.

## 11. Roadmap Público

### Fase 1 – Error Handling Enterprise (en progreso)
- Clasificación de errores (UI / red / estado / selector)
- Retries inteligentes configurables por entorno
- Recovery flows básicos
- Matriz de severidad y fallos tolerables
- Captura ampliada de contexto en el tracer

---

### Fase 2 – Exportadores ALM (en diseño)
- Xray (mapeo REQ ↔ BMS ↔ ejecución)
- Zephyr (sincronización bidireccional opcional)
- TestRail (generación de resultados a partir del JSON)
- Normalización de estructuras de reporting

---

### Fase 3 – Self-Healing controlado (PoC experimental)
- Heurísticas de estabilidad en componentes
- Fallbacks de selectores no intrusivos
- Registro de causas probables (selector, timing, transición)
- Detección de puntos frágiles a partir de trazas reales

---

### Fase 4 – CI Analytics (observabilidad técnica)
- Hotspot detection (componentes más fallones)
- Flakiness score por escenario y componente
- Tendencias temporales de duración y estabilidad
- Conversión del JSON en dashboards (Grafana / Datadog opcional)

---

### Fase 5 – DINO (IA local opcional)
- Asistente para decorar features Gherkin con metadata BMS
- Identificación de huecos (requisito → AC → test → ejecución)
- Análisis de trazas BAM (causas probables + sugerencias)
- Generación asistida de documentación viva (TestPlan, matriz de cobertura)
- Operación 100% local (Ollama / LM Studio)
- Evaluación de calidad del diseño de pruebas (Good/Smell)

## 12. Contacto
🧑‍🔬 **Rubén López**  - ruben@rulope.com
[GitHub](https://github.com/rubenlopez77) 
[LinkedIn](https://www.linkedin.com/in/ruben-lopez-qa/)