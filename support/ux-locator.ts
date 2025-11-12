/**
 * Definición tipada de localizadores UI.
 * Estándar global del modelo BAM para trazabilidad y mantenibilidad.
 */
export type LocatorType = 'banner' | 'navigation' | 'form' | 'button' | 'input' | 'link' | 'modal' | 'card';

export interface UILocator {
  selector: string;
  type: LocatorType;
  timeout?: number;
  description?: string;
}
