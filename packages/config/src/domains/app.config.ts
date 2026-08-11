import type { Environment } from "../environment/schema.js";

export interface AppConfig {
  readonly hostName: string;
  readonly nodeEnv: Environment["NODE_ENV"];
  readonly port: number;
}

export function createAppConfig(environment: Environment): AppConfig {
  return Object.freeze({
    hostName: environment.HOST_NAME,
    nodeEnv: environment.NODE_ENV,
    port: environment.PORT
  });
}
