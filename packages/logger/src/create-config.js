export function createLoggerConfig(input) {
    return Object.freeze({
        level: input.level,
        serviceName: input.serviceName,
        environment: input.environment
    });
}
