import { Redis } from "ioredis"; 
export interface RedisConnectionOptions { 
  host: string; 
  port: number; 
} 
export function createRedisClient(connection: RedisConnectionOptions): Redis { 
  return new Redis({ 
    host: connection.host, 
    port: connection.port 
  }); 
} 
