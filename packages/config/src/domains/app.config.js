export function createAppConfig(environment) {
    return Object.freeze({
        hostName: environment.HOST_NAME,
        nodeEnv: environment.NODE_ENV,
        port: environment.PORT
    });
}
