export type LoggerContext = object;

export function createLoggerContext(context: LoggerContext = {}): LoggerContext {
  return Object.freeze({ ...context });
}
