import type { WorkoraErrorCategory } from "./categories.js";
import type { WorkoraErrorCode } from "./codes.js";

export interface WorkoraErrorOptions {
  readonly category?: WorkoraErrorCategory;
  readonly cause?: unknown;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class WorkoraError extends Error {
  readonly code: WorkoraErrorCode;
  readonly category: WorkoraErrorCategory;
  readonly metadata: Readonly<Record<string, unknown>>;

  constructor(code: WorkoraErrorCode, message: string, options: WorkoraErrorOptions = {}) {
    super(message, { cause: options.cause });
    this.name = "WorkoraError";
    this.code = code;
    this.category = options.category ?? "system";
    this.metadata = Object.freeze({ ...(options.metadata ?? {}) });
  }
}
