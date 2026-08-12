import type { DatabaseConfig } from "@workora/config"; 
import { createDatabaseClient, type DatabaseClient } from "./client.js"; 

export interface WorkoraDatabase {
  readonly client: DatabaseClient;
  readonly config: DatabaseConfig;
}

export function createDatabase(config: DatabaseConfig): WorkoraDatabase {
  if (!config.configured) {
    throw new Error("Workora database configuration is not configured.");
  }

  const client = createDatabaseClient(config);

  return Object.freeze({
    client,
    config
  });
}

export async function checkDatabaseConnection(database: WorkoraDatabase): Promise<void> {
  await database.client.client`SELECT 1`;
}

export async function closeDatabase(database: WorkoraDatabase): Promise<void> {
  await database.client.client.end();
}
