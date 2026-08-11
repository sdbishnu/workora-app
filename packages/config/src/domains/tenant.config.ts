import type { Environment } from "../environment/schema.js";

export interface TenantConfig {
  readonly isEnabled: boolean;
}

export function createTenantConfig(environment: Environment): TenantConfig {
  return Object.freeze({
    isEnabled: environment.TENANT_IS_ENABLED
  });
}
