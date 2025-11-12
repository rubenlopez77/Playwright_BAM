# BAM - Changelog

> Registro cronológico de cambios relevantes del framework BAM  
> No existen versiones distribuidas. Este documento actúa como evidencia evolutiva de arquitectura y calidad.

```log

v0.1.4

```
- ESLint Plugin "BAM Test Enforcer"
 • Detecta 'await' en steps declarativos
 • Valida formato Given/When/Then	
 • Valida la consistencia de los mapas UX
 • Promueve el uso de const user = this.getPage(Clase)

- Logger: Bug corregido: la propiedad enabled en printStep estaba invertida, impidiendo imprimir los pasos
- Mejoras en el logger OK/KO! en consola, manteniendo PASSED / FAILED en trazabilidad JSON (alineado con ISTQB / ISO 29119)
- Components: Refinamiento de Alert AlertComponent.expectTexts()
```