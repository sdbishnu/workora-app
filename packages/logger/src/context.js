export function createLoggerContext(context = {}) {
    return Object.freeze({ ...context });
}
