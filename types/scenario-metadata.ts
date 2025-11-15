/**
 * ScenarioMetadata — BAM 0.1.6
 * ----------------------------------------------------------
 * Representa la información mínima necesaria de un escenario
 * para soportar:
 *   - paralelismo determinista
 *   - planificación por workers (RunnerManager)
 *   - trazabilidad por escenario
 *   - logging y reporting
 *   - asignación round-robin totalmente reproducible
 *
 * Esto es intencionadamente minimalista.
 *
 * FUTURO (BAM 0.1.8+ — Scheduling Inteligente con IA/DINO):
 * ----------------------------------------------------------
 * Este modelo podrá ampliarse con:
 *   - prioridad por tags (@critical, @regression, @slow…)
 *   - agrupación por feature o dominio
 *   - pesos dinámicos para optimizar tiempos de ejecución
 *   - ordenación por impacto funcional / riesgo
 *   - señales del historial de ejecución
 *   - sugerencias del agente DINO para orden óptimo
 *
 * Pero la versión 0.1.6 debe ser inmutable, simple y
 * perfectamente determinista.
 */

export interface ScenarioMetadata {
  /** identificador único: file:line */
  id: string;

  /** nombre del escenario */
  name: string;

  /** path del archivo .feature */
  file: string;

  /** línea exacta donde está definido */
  line: number;

  /** lista de tags asociados */
  tags: string[];
}
