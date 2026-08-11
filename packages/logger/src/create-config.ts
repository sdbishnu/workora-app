import type { LoggerConfig, LogLevel } from "./logger.config.js";

export interface LoggerConfigInput {
  readonly level: LogLevel;
  readonly serviceName: string;
  readonly environment: string;
}

export function createLoggerConfig(input: LoggerConfigInput): LoggerConfig {
  return Object.freeze({
    level: input.level,
    serviceName: input.serviceName,
    environment: input.environment
  });
}
