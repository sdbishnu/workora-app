import type { WorkoraError } from "./error.js";

export interface SerializedWorkoraError {
  readonly name: string;
  readonly code: string;
  readonly category: string;
  readonly message: string;
  readonly metadata: Readonly<Record<string, unknown>>;
}

export function serializeWorkoraError(error: WorkoraError): SerializedWorkoraError {
  return Object.freeze({
    name: error.name,
    code: error.code,
    category: error.category,
    message: error.message,
    metadata: error.metadata
  });
}
