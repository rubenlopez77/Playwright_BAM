/**
 * Interface: UxElement
 * Define el contrato semántico de cada elemento UX en BAM.
 * Formaliza la trazabilidad (selector + tipo funcional).
 */
export interface UxElement {
  selector: string;
  type: 'button' | 'textbox' | 'modal' | 'user-info'| 'banner'| 'navigation';
  description: string;
}