import type { RedisConfig } from "@workora/config"; 
import { Queue } from "bullmq"; 
export interface QueueConnection { 
  host: string; 
  port: number; 
} 
export function createQueue(name: string, connection: QueueConnection): Queue { 
  return new Queue(name, { connection }); 
} 
export function createQueueFromRedisConfig(name: string, config: RedisConfig): Queue { 
  if (!config.configured) { 
    throw new Error("Workora Redis configuration is not configured."); 
  } 
  return createQueue(name, { 
    host: config.host, 
    port: config.port 
  }); 
} 
