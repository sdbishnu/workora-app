export function createRedisConfig(environment) {
    return Object.freeze({
        configured: true,
        host: environment.REDIS_HOST,
        port: environment.REDIS_PORT
    });
}
