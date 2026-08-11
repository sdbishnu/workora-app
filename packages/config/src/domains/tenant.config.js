export function createTenantConfig(environment) {
    return Object.freeze({
        isEnabled: environment.TENANT_IS_ENABLED
    });
}
