export function createDatabaseConfig(environment) {
    return Object.freeze({
        configured: true,
        host: environment.DATABASE_HOST,
        port: environment.DATABASE_PORT,
        database: environment.DATABASE_NAME,
        username: environment.DATABASE_USER,
        password: environment.DATABASE_PASSWORD
    });
}
