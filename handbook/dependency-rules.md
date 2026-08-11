# Workora Dependency Rules

## Purpose

This document defines the initial dependency direction for Workora applications and shared packages.

## Dependency Layers

### Layer 1 - Applications

Applications contain product-specific orchestration and domain behavior.

Applications:
- @workora/admin-app
- @workora/auth-service
- @workora/core-api
- @workora/marketing
- @workora/tenant-app
- @workora/worker

### Layer 2 - Shared Workora Packages

Shared packages provide reusable capabilities and architectural boundaries for applications.

Packages:
- @workora/config
- @workora/logger
- @workora/errors
- @workora/validation
- @workora/http-client
- @workora/auth
- @workora/db
- @workora/cache
- @workora/queue
- @workora/rbac
- @workora/shared-types
- @workora/ui

### Layer 3 - External Infrastructure

External infrastructure libraries provide implementation details behind Workora package boundaries.

Examples include database, cache, queue, HTTP, authentication, and other infrastructure libraries.

## Initial Direction

Application code may depend on appropriate Workora packages.
Workora packages may depend on lower-level Workora packages when required by their responsibility.
Infrastructure implementation details must remain behind the appropriate Workora package boundary.

## Architectural Flow

Applications > Workora package boundaries > infrastructure implementations

This is the initial dependency-layer model and does not authorize arbitrary package dependencies.

## Allowed Package Relationships

### Shared Types
@workora/shared-types may be consumed by application and shared packages.
@workora/shared-types must remain dependency-light.

### Errors
@workora/errors may be consumed by application and shared packages.
@workora/errors must not depend on UI or application packages.

### Validation
@workora/validation may depend on shared contracts where required.
@workora/validation may be consumed by applications and backend packages.
@workora/validation must not depend on UI packages.

### Config
@workora/config provides normalized application configuration.
@workora/config may be consumed by applications and infrastructure packages.

### Logger
@workora/logger provides shared logging.
@workora/logger may be consumed by applications and infrastructure packages.

### Backend Infrastructure
@workora/db, @workora/cache, @workora/queue, and @workora/http-client provide backend infrastructure boundaries.
These packages may depend on lower-level shared packages where required.
These packages must not depend on frontend UI packages.

### Authentication and Authorization
@workora/auth and @workora/rbac may depend on shared contracts and required backend/shared packages.
@workora/auth and @workora/rbac must not depend on UI packages.

### UI
@workora/ui may depend on frontend-safe shared packages.
@workora/ui must not depend on database, cache, queue, or backend infrastructure packages.

## Relationship Classification

ALLOWED means the dependency is architecturally appropriate.
CONDITIONAL means the dependency requires a specific responsibility-based reason.
NOT ALLOWED means the dependency crosses an architectural boundary and must not be introduced.

## Forbidden and Bypass Relationships

### Application Bypass
Applications must not bypass an existing Workora package abstraction to use its underlying infrastructure library directly.

Examples include direct database, cache, queue, and HTTP infrastructure imports when the corresponding Workora package exists.

### Application to UI Restrictions
Backend applications must not depend on @workora/ui.
Backend infrastructure packages must not depend on @workora/ui.

### UI to Backend Restrictions
@workora/ui must not depend on @workora/db.
@workora/ui must not depend on @workora/cache.
@workora/ui must not depend on @workora/queue.
@workora/ui must not depend on backend infrastructure packages.

### Shared Package to Application Restrictions
Shared Workora packages must not depend on Workora applications.
A package must never import from apps\admin-app, apps\auth-service, apps\core-api, apps\marketing, apps\tenant-app, or apps\worker.

### Internal Path Restrictions
Consumers must use public @workora package entry points instead of internal source paths.
Relative cross-package imports using ../../ are forbidden.
Package consumers must use @workora package aliases for cross-package access.

### Circular Dependency Restriction
Circular dependencies between Workora packages are forbidden unless explicitly approved as an architectural exception.

### Dependency Rule
A dependency must exist because of the owning package responsibility, not merely because the dependency is convenient.

## Application Dependency Rules

### Backend Applications
Backend applications are @workora/admin-app, @workora/auth-service, @workora/core-api, and @workora/worker.

Backend applications may consume backend and shared Workora packages appropriate to their responsibility.

Backend applications may consume @workora/config, @workora/logger, @workora/errors, @workora/validation, @workora/auth, @workora/db, @workora/cache, @workora/queue, @workora/rbac, and @workora/shared-types when required by their responsibility.

Backend applications must not depend on @workora/ui.

### Frontend Applications
Frontend applications are @workora/marketing and @workora/tenant-app.

Frontend applications may consume @workora/ui, @workora/http-client, @workora/auth, @workora/validation, @workora/shared-types, and other frontend-safe shared packages when required by their responsibility.

Frontend applications must not directly depend on @workora/db.
Frontend applications must not directly depend on @workora/cache.
Frontend applications must not directly depend on @workora/queue.

### Application Package Consumption
Application dependencies must be introduced only when required by the application's actual responsibility.
Applications must consume shared functionality through @workora package boundaries.
Applications must not import another application's source code.
Applications must not use ../../ paths to reach shared package source code.
Applications must use @workora package aliases for cross-package access.

### Application Dependency Principle
Applications depend on capabilities, not implementation details.

## Verification Rules

### Package Dependency Direction
Verify that package dependencies follow the documented dependency layers and responsibility boundaries.

### Application Boundaries
Verify that applications consume shared functionality through @workora package boundaries.

### Application to Application Imports
Verify that no Workora application imports source code from another Workora application.

### Relative Cross-Package Imports
Verify that ../../ paths are not used to access another package or application source.

### Backend and UI Separation
Verify that backend applications and backend packages do not depend on @workora/ui.

### UI and Backend Separation
Verify that @workora/ui does not depend on database, cache, queue, or other backend infrastructure packages.

### Infrastructure Bypass
Verify that applications do not directly import infrastructure libraries when an appropriate @workora abstraction exists.

### Circular Dependencies
Verify that Workora packages do not introduce circular dependencies.

### Public Entry Points
Verify that cross-package imports use public @workora package entry points rather than internal source paths.

### Verification Approach
Initial repository verification will use lightweight Node-based checks and existing project tooling.
Additional dependency-analysis tooling may be introduced later when real package dependencies exist and the architectural need is established.

## Configuration Responsibility

@workora/config owns the Workora configuration boundary.

### Configuration Responsibilities
@workora/config owns environment access.
@workora/config owns environment validation.
@workora/config owns environment normalization.
@workora/config owns configuration construction.
@workora/config owns configuration immutability.
@workora/config owns the public configuration API.

### Configuration Domains
Initial configuration domains are APP_CONFIG, DATABASE_CONFIG, REDIS_CONFIG, AUTH_CONFIG, and TENANT_CONFIG.

### Configuration Flow
.env > process.env > environment validation > Zod > normalized configuration > Object.freeze() > @workora/config > application

### Configuration Restrictions
process.env may only be accessed inside the configuration initialization layer.
Application code must not directly access process.env.
Configuration objects must not be mutated after initialization.
Configuration must not contain business logic.
@workora/config must not initialize database, Redis, queue, HTTP, or other infrastructure connections.
