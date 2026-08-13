export function normalizeEnvironment(environment) {
    return {
        HOST_NAME: environment.HOST_NAME.trim(),
        NODE_ENV: environment.NODE_ENV,
        PORT: environment.PORT,
        TENANT_IS_ENABLED: environment.TENANT_IS_ENABLED,
        DATABASE_HOST: environment.DATABASE_HOST.trim(),
        DATABASE_PORT: environment.DATABASE_PORT,
        DATABASE_NAME: environment.DATABASE_NAME.trim(),
        DATABASE_USER: environment.DATABASE_USER.trim(),
        DATABASE_PASSWORD: environment.DATABASE_PASSWORD,
        REDIS_HOST: environment.REDIS_HOST.trim(),
        REDIS_PORT: environment.REDIS_PORT
    };
}
