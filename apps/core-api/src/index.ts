import { initializeConfig } from "@workora/config"; 
import { createDatabase, checkDatabaseConnection } from "@workora/db"; 
import { createRedisClient } from "@workora/cache"; 
import { WorkoraError, WORKORA_ERROR_CODES, WORKORA_ERROR_CATEGORIES, serializeWorkoraError } from "@workora/errors"; 
import { createLogger, createLoggerConfig } from "@workora/logger"; 
import { safeValidate } from "@workora/validation"; 
import { z } from "zod"; 
const config = initializeConfig(); 
const loggerConfig = createLoggerConfig({ 
  level: "info", 
  serviceName: "core-api", 
  environment: config.APP_CONFIG.nodeEnv 
}); 
const logger = createLogger(loggerConfig); 
const database = createDatabase(config.DATABASE_CONFIG); 
await checkDatabaseConnection(database); 
logger.info("Core API database connection verified"); 
const redis = createRedisClient({ 
  host: config.REDIS_CONFIG.host, 
  port: config.REDIS_CONFIG.port 
}); 
await redis.ping(); 
logger.info("Core API Redis connection verified"); 
const startupError = new WorkoraError(WORKORA_ERROR_CODES.UNKNOWN, "Core API error foundation initialized.", { 
  category: WORKORA_ERROR_CATEGORIES.SYSTEM, 
  metadata: { service: "core-api" } 
}); 
logger.info("Core API error foundation initialized", serializeWorkoraError(startupError)); 
const startupSchema = z.object({ 
  service: z.string().min(1), 
  port: z.number().positive() 
}); 
const validationResult = safeValidate(startupSchema, { 
  service: "core-api", 
  port: config.APP_CONFIG.port 
}); 
if (!validationResult.success) { 
  throw new Error("Core API startup validation failed."); 
} 
logger.info("Core API validation foundation initialized", validationResult.data); 
export { config, database, redis, logger }; 
export { WorkoraError, WORKORA_ERROR_CODES, WORKORA_ERROR_CATEGORIES, serializeWorkoraError }; 
export { safeValidate }; 
