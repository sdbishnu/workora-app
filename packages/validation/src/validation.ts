import type { ZodType } from "zod";
import type { ValidationErrorDetails, ValidationIssue } from "./validation-error.js";

export type ValidationSchema<T> = ZodType<T>;

export type ValidationResult<T> = {
  readonly success: true;
  readonly data: T;
} | {
  readonly success: false;
  readonly error: ValidationErrorDetails;
};

export function validate<T>(schema: ValidationSchema<T>, input: unknown): T {
  return schema.parse(input);
}

export function safeValidate<T>(schema: ValidationSchema<T>, input: unknown): ValidationResult<T> {
  const result = schema.safeParse(input);
  if (result.success) {
    return Object.freeze({ success: true, data: result.data });
  }
  const issues: ValidationIssue[] = [];
  for (const issue of result.error.issues) {
    issues.push(Object.freeze({
      path: Object.freeze(Array.from(issue.path)),
      message: issue.message
    }));
  }
  const error: ValidationErrorDetails = Object.freeze({
    issues: Object.freeze(issues)
  });
  return Object.freeze({ success: false, error });
}
