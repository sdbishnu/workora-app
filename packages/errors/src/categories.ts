export const WORKORA_ERROR_CATEGORIES = Object.freeze({
  SYSTEM: "system",
  CONFIGURATION: "configuration",
  VALIDATION: "validation",
  AUTHENTICATION: "authentication",
  AUTHORIZATION: "authorization",
  RESOURCE: "resource",
  CONFLICT: "conflict"
});

export type WorkoraErrorCategory = typeof WORKORA_ERROR_CATEGORIES[keyof typeof WORKORA_ERROR_CATEGORIES];
