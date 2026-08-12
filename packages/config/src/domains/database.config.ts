import type { Environment } from "../environment/schema.js";

export interface DatabaseConfig {
  readonly configured: boolean;
  readonly host: string;
  readonly port: number;
  readonly database: string;
  readonly username: string;
  readonly password: string;
}

export function createDatabaseConfig(environment: Environment): DatabaseConfig {
  return Object.freeze({
    configured: true,
    host: environment.DATABASE_HOST,
    port: environment.DATABASE_PORT,
    database: environment.DATABASE_NAME,
    username: environment.DATABASE_USER,
    password: environment.DATABASE_PASSWORD
  });
}
