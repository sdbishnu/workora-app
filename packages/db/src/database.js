import { createDatabaseClient } from "./client.js";
export function createDatabase(config) {
    if (!config.configured) {
        throw new Error("Workora database configuration is not configured.");
    }
    const client = createDatabaseClient(config);
    return Object.freeze({
        client,
        config
    });
}
export async function checkDatabaseConnection(database) {
    await database.client.client `SELECT 1`;
}
export async function closeDatabase(database) {
    await database.client.client.end();
}
