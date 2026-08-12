import type { DatabaseConfig } from "@workora/config"; 
import { drizzle } from "drizzle-orm/postgres-js"; 
import postgres from "postgres"; 

export interface DatabaseClient {
  readonly client: postgres.Sql;
  readonly db: ReturnType<typeof drizzle>;
}

export function createDatabaseClient(config: DatabaseConfig): DatabaseClient {
  const client = postgres({
    host: config.host,
    port: config.port,
    database: config.database,
    username: config.username,
    password: config.password
  });

  const db = drizzle(client);

  return Object.freeze({ client, db });
}
