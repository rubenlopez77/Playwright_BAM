v0.1.5
- Se unifica toda la lógica de esperas (`waitVisible`, `waitForText`, `waitForNonEmptyText`) dentro de `GenericComponent`.
- `ModalComponent` pasa a heredar de `GenericComponent` en lugar de `BaseComponent`.
- `ModalComponent.open()` ahora usa directamente `waitVisible()` heredado.
- `LoginPage` se actualiza para usar esperas declarativas desde los propios componentes.

v0.1.4
- ESLint Plugin "BAM Test Enforcer"
 • Detecta 'await' en steps declarativos
 • Valida formato Given/When/Then	
 • Valida la consistencia de los mapas UX
 • Promueve el uso de const user = this.getPage(Clase)

- Logger: Bug corregido: la propiedad enabled en printStep estaba invertida, impidiendo imprimir los pasos
- Mejoras en el logger OK/KO! en consola, manteniendo PASSED / FAILED en trazabilidad JSON (alineado con ISTQB / ISO 29119)
- Components: Refinamiento de Alert AlertComponent.expectTexts()