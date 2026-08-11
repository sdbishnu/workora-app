export interface DatabaseConfig {
  readonly configured: boolean;
}

export function createDatabaseConfig(): DatabaseConfig {
  return Object.freeze({
    configured: false
  });
}
