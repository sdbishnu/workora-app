export type LogMetadata = object;

export interface Logger {
  readonly trace: (message: string, metadata?: LogMetadata) => void;
  readonly debug: (message: string, metadata?: LogMetadata) => void;
  readonly info: (message: string, metadata?: LogMetadata) => void;
  readonly warn: (message: string, metadata?: LogMetadata) => void;
  readonly error: (message: string, metadata?: LogMetadata) => void;
  readonly fatal: (message: string, metadata?: LogMetadata) => void;
}
