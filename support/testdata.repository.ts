// support/testdata.repository.ts
import { credentials } from "../data/credentials.data";

export class TestDataRepository {

  private static readonly sources: Record<string, Record<string, unknown>> = {
    credentials,
  };

  static register(name: string, data: Record<string, unknown>): void {
    this.sources[name] = data;
  }

  static resolve(identifier: string): unknown {
    const [sourceName, entryName] = identifier.split(".");

    if (!sourceName || !entryName) {
      throw new Error(
        `Invalid test data identifier '${identifier}'. Expected 'source.key' format (e.g. 'credentials.invalid').`
      );
    }

    const source = this.sources[sourceName];
    if (!source) {
      throw new Error(`Test data source '${sourceName}' not found.`);
    }

    if (!(entryName in source)) {
      throw new Error(`Test data entry '${entryName}' not found in source '${sourceName}'.`);
    }

    return source[entryName];
  }

  static listIdentifiers(): string[] {
    return Object.entries(this.sources).flatMap(([sourceName, data]) =>
      Object.keys(data).map((key) => `${sourceName}.${key}`)
    );
  }
}
