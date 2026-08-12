export interface ValidationIssue {
  readonly path: readonly PropertyKey[];
  readonly message: string;
}

export interface ValidationErrorDetails {
  readonly issues: readonly ValidationIssue[];
}
