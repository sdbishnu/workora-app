# Workora Configuration Architecture

## Environment Schema

The environment schema defines the approved environment inputs consumed by the configuration initialization layer.

## Configuration Domains

### APP_CONFIG
HOST_NAME is an application host configuration value.
NODE_ENV is the application environment value.
PORT is the application port value.

### DATABASE_CONFIG
The database configuration domain exists as an architectural boundary.
The concrete database environment variable contract is not yet defined by the approved architecture.
No database environment variable names are invented at this stage.

### REDIS_CONFIG
The Redis configuration domain exists as an architectural boundary.
The concrete Redis environment variable contract is not yet defined by the approved architecture.
No Redis environment variable names are invented at this stage.

### AUTH_CONFIG
The authentication configuration domain exists as an architectural boundary.
The concrete authentication environment variable contract is not yet defined by the approved architecture.
No authentication environment variable names are invented at this stage.

### TENANT_CONFIG
TENANT_IS_ENABLED is the tenant configuration enablement value.

## Environment Contract Rules
Environment variables must be explicitly defined before they are consumed by application code.
Undefined environment variables must not silently become configuration properties.
Environment values will be validated through Zod during configuration initialization.
Configuration defaults must be explicitly approved before implementation.

## Configuration Pipeline
.env > process.env > Zod validation > normalized environment > frozen configuration > @workora/config > application

## Environment Loading

### Loading Responsibility
Environment loading belongs exclusively to the configuration initialization layer.

### Environment Source
Environment values are loaded from the runtime environment and supported .env configuration.

### process.env Boundary
process.env may only be accessed inside the configuration initialization layer.
Application modules and shared packages must not directly access process.env.

### Validation Handoff
Loaded environment values must be passed through Zod validation before becoming application configuration.

### Normalization Handoff
Validated environment values must be normalized before configuration objects are constructed.

### Loading Failure
Configuration initialization must fail when required environment configuration cannot be validated.
Configuration failures must occur before application startup continues.

### Loading Principle
Environment loading is an initialization concern and must not be repeated throughout the application.

## APP_CONFIG

APP_CONFIG owns application-level runtime configuration.

### APP_CONFIG Fields
HOST_NAME defines the application host configuration.
NODE_ENV defines the application runtime environment.
PORT defines the application listening port.

### APP_CONFIG Rules
APP_CONFIG values are obtained from the validated environment.
APP_CONFIG is normalized during configuration initialization.
APP_CONFIG is immutable after initialization.
Application code consumes APP_CONFIG through @workora/config.

## DATABASE_CONFIG

DATABASE_CONFIG owns database-related application configuration.

### DATABASE_CONFIG Responsibility
DATABASE_CONFIG receives validated database environment values.
DATABASE_CONFIG normalizes database configuration during initialization.
DATABASE_CONFIG is immutable after initialization.
Application code consumes DATABASE_CONFIG through @workora/config.

### DATABASE_CONFIG Implementation Boundary
DATABASE_CONFIG must not establish database connections.
DATABASE_CONFIG must not create Sequelize instances.
DATABASE_CONFIG must not execute database queries.
DATABASE_CONFIG must not contain migrations or repository logic.

### DATABASE_CONFIG Environment Contract
The concrete database environment variable names are not yet defined by the approved architecture.
No database environment variable names are invented during this step.

## REDIS_CONFIG

REDIS_CONFIG owns Redis-related application configuration.

### REDIS_CONFIG Responsibility
REDIS_CONFIG receives validated Redis environment values.
REDIS_CONFIG normalizes Redis configuration during initialization.
REDIS_CONFIG is immutable after initialization.
Application code consumes REDIS_CONFIG through @workora/config.

### REDIS_CONFIG Implementation Boundary
REDIS_CONFIG must not create Redis clients.
REDIS_CONFIG must not establish Redis connections.
REDIS_CONFIG must not execute Redis commands.
REDIS_CONFIG must not contain cache logic.
REDIS_CONFIG must not contain queue logic.

### REDIS_CONFIG Environment Contract
The concrete Redis environment variable names are not yet defined by the approved architecture.
No Redis environment variable names are invented during this step.

## AUTH_CONFIG

AUTH_CONFIG owns authentication-related application configuration.

### AUTH_CONFIG Responsibility
AUTH_CONFIG receives validated authentication environment values.
AUTH_CONFIG normalizes authentication configuration during initialization.
AUTH_CONFIG is immutable after initialization.
Application code consumes AUTH_CONFIG through @workora/config.

### AUTH_CONFIG Implementation Boundary
AUTH_CONFIG must not generate JWTs.
AUTH_CONFIG must not hash passwords.
AUTH_CONFIG must not authenticate requests.
AUTH_CONFIG must not manage sessions.
AUTH_CONFIG must not implement RBAC.
AUTH_CONFIG must not access the database directly.

### AUTH_CONFIG Environment Contract
The concrete authentication environment variable names are not yet defined by the approved architecture.
No authentication environment variable names are invented during this step.

## TENANT_CONFIG

TENANT_CONFIG owns tenant-related application configuration.

### TENANT_CONFIG Responsibility
TENANT_CONFIG receives validated tenant environment values.
TENANT_CONFIG normalizes tenant configuration during initialization.
TENANT_CONFIG is immutable after initialization.
Application code consumes TENANT_CONFIG through @workora/config.

### TENANT_CONFIG Fields
TENANT_IS_ENABLED controls whether tenant functionality is enabled.

### TENANT_CONFIG Implementation Boundary
TENANT_CONFIG must not resolve the current tenant.
TENANT_CONFIG must not load tenant records from the database.
TENANT_CONFIG must not validate tenant membership.
TENANT_CONFIG must not resolve tenant permissions.
TENANT_CONFIG must not store tenant runtime state.
TENANT_CONFIG must not perform tenant database operations.

## Configuration Domain Immutability

All configuration domains are immutable after successful initialization.

### Immutable Domains
APP_CONFIG must be frozen after initialization.
DATABASE_CONFIG must be frozen after initialization.
REDIS_CONFIG must be frozen after initialization.
AUTH_CONFIG must be frozen after initialization.
TENANT_CONFIG must be frozen after initialization.

### Immutability Pipeline
Environment values are validated before configuration construction.
Configuration values are normalized before freezing.
Object.freeze() is applied after configuration construction and normalization.
Frozen configuration objects must not be mutated by applications or packages.

### Immutability Boundary
Configuration consumers receive configuration values but do not modify configuration state.
Runtime state must not be stored inside immutable configuration objects.

## Public @workora/config API

The public configuration API is exposed through the @workora/config package boundary.

### Public Configuration Domains
APP_CONFIG is publicly consumable through @workora/config.
DATABASE_CONFIG is publicly consumable through @workora/config.
REDIS_CONFIG is publicly consumable through @workora/config.
AUTH_CONFIG is publicly consumable through @workora/config.
TENANT_CONFIG is publicly consumable through @workora/config.

### Public API Boundary
Consumers must import configuration through @workora/config.
Consumers must not import internal configuration source files directly.
Consumers must not use relative paths to access configuration internals.
The public API must expose only approved configuration contracts.

## Configuration Initialization

Configuration initialization occurs once during application startup before normal application operation begins.

### Initialization Sequence
Environment loading occurs first.
Environment values are validated with Zod.
Validated values are normalized.
Configuration domains are constructed from the normalized values.
Each configuration domain is frozen after construction.
The frozen configuration is exposed through @workora/config.
Application startup continues only after configuration initialization succeeds.

### Validation Failure Behavior
Invalid required environment configuration causes configuration initialization to fail.
Application startup must not continue with invalid configuration.
Partial configuration initialization must not be exposed to consumers.

### Configuration Normalization
Normalization occurs after successful validation and before configuration freezing.
Environment-specific conversions must be explicitly defined by the approved environment contract.

### Domain Construction
APP_CONFIG, DATABASE_CONFIG, REDIS_CONFIG, AUTH_CONFIG, and TENANT_CONFIG are constructed as separate configuration domains.

### Configuration Freezing
Every configuration domain is frozen after successful construction and normalization.
Configuration consumers must not mutate configuration domains.

### Initialization Timing
Configuration initialization is a startup concern and must not execute per request or per operation.

### Re-initialization Policy
Configuration is initialized once for the application runtime.
Runtime consumers use the existing initialized configuration.
Configuration must not be silently rebuilt during normal runtime operation.
