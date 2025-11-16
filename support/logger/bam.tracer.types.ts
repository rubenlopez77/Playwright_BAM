// support/logger/bam.tracer.types.ts
import { BamExecutionReport } from "./bms.types";

export interface IBamTracer {
  // COMPONENT ACTIONS
  recordComponentAction(
    component: string,
    action: string,
    selector: string,
    duration: number,
    success: boolean
  ): void;

  // SCENARIOS
  recordScenarioStart(
    name: string,
    feature?: string,
    tags?: string[]
  ): void;

  recordScenarioEnd(
    name: string,
    status: string
  ): void;

  // STEPS
  recordStepEnd(
    text: string,
    status: string
  ): void;

  // REPORTING
  writeRaw(path: string): Promise<void>;
  writeStructured(path: string): Promise<void>;
  getEvents(): any[];

  // 🔹 NUEVO: construir el modelo BMS por escenario
  buildExecutionReports(): BamExecutionReport[];

  // 🔹 NUEVO: escribir un JSON por escenario (futuro exporters)
  writeBmsReports(baseDir: string): Promise<void>;
}
