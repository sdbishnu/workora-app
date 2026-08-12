import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
export function createDatabaseClient(config) {
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
