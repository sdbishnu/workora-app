export type LoggerContext = Readonly<Record<string, unknown>>;

export function createLoggerContext(context: LoggerContext = {}): LoggerContext {
  return Object.freeze({ ...context });
}
