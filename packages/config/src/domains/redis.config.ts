import type { Environment } from "../environment/schema.js"; 
export interface RedisConfig { 
  readonly configured: boolean; 
  readonly host: string; 
  readonly port: number; 
} 
export function createRedisConfig(environment: Environment): RedisConfig { 
  return Object.freeze({ 
    configured: true, 
    host: environment.REDIS_HOST, 
    port: environment.REDIS_PORT 
  }); 
} 
