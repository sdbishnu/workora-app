import type { AppConfig } from "./domains/app.config.js";
import type { AuthConfig } from "./domains/auth.config.js";
import type { DatabaseConfig } from "./domains/database.config.js";
import type { RedisConfig } from "./domains/redis.config.js";
import type { TenantConfig } from "./domains/tenant.config.js";

export interface WorkoraConfig {
  readonly APP_CONFIG: AppConfig;
  readonly DATABASE_CONFIG: DatabaseConfig;
  readonly REDIS_CONFIG: RedisConfig;
  readonly AUTH_CONFIG: AuthConfig;
  readonly TENANT_CONFIG: TenantConfig;
}
