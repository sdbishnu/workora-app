export type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal";

export interface LoggerConfig {
  readonly level: LogLevel;
  readonly serviceName: string;
  readonly environment: string;
}
