export class ToolsTexts {
  
  //
    public async cleanText(str : string): Promise<string> {

      if (!str) return '';

const g = str
  .replaceAll(/\s*\(.*?\)\s*/g, '') // elimina cualquier "(...)" con espacios
  .replaceAll('\n', ' ')            // reemplaza saltos de línea por espacios
  .replaceAll(/\s+/g, ' ')          // colapsa múltiples espacios en uno
  .trim();


      return g;
    }
   
  
}