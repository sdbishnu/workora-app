import pino from "pino";
import type { Logger, LogMetadata } from "./logger.js";
import type { LoggerConfig } from "./logger.config.js";

export function createLogger(config: LoggerConfig): Logger {
  const logger = pino({
    level: config.level,
    base: {
      service: config.serviceName,
      environment: config.environment
    }
  });

  const write = (level: "trace" | "debug" | "info" | "warn" | "error" | "fatal", message: string, metadata?: LogMetadata): void => {
    if (metadata) {
      logger[level](metadata, message);
      return;
    }
    logger[level](message);
  };

  return Object.freeze({
    trace: (message: string, metadata?: LogMetadata) => write("trace", message, metadata),
    debug: (message: string, metadata?: LogMetadata) => write("debug", message, metadata),
    info: (message: string, metadata?: LogMetadata) => write("info", message, metadata),
    warn: (message: string, metadata?: LogMetadata) => write("warn", message, metadata),
    error: (message: string, metadata?: LogMetadata) => write("error", message, metadata),
    fatal: (message: string, metadata?: LogMetadata) => write("fatal", message, metadata)
  });
}
