// support/testdata.repository.ts
import { credentials } from "../data/credentials.data";

export class TestDataRepository {

  private static readonly sources: Record<string, any> = {
    credentials
  };

  /** Permite registrar nuevas colecciones externas */
  static register(name: string, data: Record<string, any>) {
    this.sources[name] = data;
  }

  /** Devuelve un dataset por clave "source.key" → credentials.invalid */
  static resolve(identifier: string): any {
    const [sourceName, entryName] = identifier.split(".");

    const source = this.sources[sourceName];
    if (!source) {
      throw new Error(`TestData source '${sourceName}' not found`);
    }

    const entry = source[entryName];
    if (!entry) {
      throw new Error(`TestData entry '${entryName}' missing in '${sourceName}'`);
    }

    return entry;
  }

  /** Lista de todas las claves disponibles */
  static list(): string[] {
    return Object.entries(this.sources).flatMap(([src, data]) =>
      Object.keys(data).map(key => `${src}.${key}`)
    );
  }
}
