import pino from "pino";
export function createLogger(config) {
    const logger = pino({
        level: config.level,
        base: {
            service: config.serviceName,
            environment: config.environment
        }
    });
    const write = (level, message, metadata) => {
        if (metadata) {
            logger[level](metadata, message);
            return;
        }
        logger[level](message);
    };
    return Object.freeze({
        trace: (message, metadata) => write("trace", message, metadata),
        debug: (message, metadata) => write("debug", message, metadata),
        info: (message, metadata) => write("info", message, metadata),
        warn: (message, metadata) => write("warn", message, metadata),
        error: (message, metadata) => write("error", message, metadata),
        fatal: (message, metadata) => write("fatal", message, metadata)
    });
}
