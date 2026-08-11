import type { Environment } from "./schema.js";

export function normalizeEnvironment(environment: Environment): Environment {
  return {
    HOST_NAME: environment.HOST_NAME.trim(),
    NODE_ENV: environment.NODE_ENV,
    PORT: environment.PORT,
    TENANT_IS_ENABLED: environment.TENANT_IS_ENABLED
  };
}
