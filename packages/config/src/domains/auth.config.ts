export interface AuthConfig {
  readonly configured: boolean;
}

export function createAuthConfig(): AuthConfig {
  return Object.freeze({
    configured: false
  });
}
