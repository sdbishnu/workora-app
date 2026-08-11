import { initializeConfig } from "@workora/config";
import { createLogger, createLoggerConfig } from "@workora/logger";

const config = initializeConfig();

const loggerConfig = createLoggerConfig({
  level: "info",
  serviceName: "core-api",
  environment: config.APP_CONFIG.nodeEnv
});

const logger = createLogger(loggerConfig);

logger.info("Core API configuration initialized");

export { config, logger };
