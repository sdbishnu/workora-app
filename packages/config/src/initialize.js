import { loadEnvironment } from "./environment/load.js";
import { createAppConfig } from "./domains/app.config.js";
import { createAuthConfig } from "./domains/auth.config.js";
import { createDatabaseConfig } from "./domains/database.config.js";
import { createRedisConfig } from "./domains/redis.config.js";
import { createTenantConfig } from "./domains/tenant.config.js";
import { getInitializedConfig, setInitializedConfig } from "./state.js";
export function initializeConfig() {
    const existingConfig = getInitializedConfig();
    if (existingConfig) {
        return existingConfig;
    }
    const environment = loadEnvironment();
    const APP_CONFIG = createAppConfig(environment);
    const DATABASE_CONFIG = createDatabaseConfig(environment);
    const REDIS_CONFIG = createRedisConfig();
    const AUTH_CONFIG = createAuthConfig();
    const TENANT_CONFIG = createTenantConfig(environment);
    const config = Object.freeze({
        APP_CONFIG,
        DATABASE_CONFIG,
        REDIS_CONFIG,
        AUTH_CONFIG,
        TENANT_CONFIG
    });
    setInitializedConfig(config);
    return config;
}
