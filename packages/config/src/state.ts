import type { WorkoraConfig } from "./config.js";

let initializedConfig: WorkoraConfig | undefined;

export function getInitializedConfig(): WorkoraConfig | undefined {
  return initializedConfig;
}

export function setInitializedConfig(config: WorkoraConfig): void {
  initializedConfig = config;
}
