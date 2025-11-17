## Roadmap

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
