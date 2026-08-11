export interface RedisConfig {
  readonly configured: boolean;
}

export function createRedisConfig(): RedisConfig {
  return Object.freeze({
    configured: false
  });
}
