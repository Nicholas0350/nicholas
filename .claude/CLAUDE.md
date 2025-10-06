# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Midday is a monorepo for an all-in-one business management platform for freelancers and solo entrepreneurs. Built with Bun, Turborepo, Next.js, React, TypeScript, Supabase, and Tauri.

## Architecture

### Monorepo Structure
- **Apps** (`apps/*`): Standalone applications
  - `api`: tRPC/Hono API server (Bun runtime, port 3003)
  - `dashboard`: Main Next.js dashboard application (customer-facing)
  - `website`: Marketing website (Next.js)
  - `engine`: Cloudflare Workers API for bank integrations (Wrangler, port 3002)
  - `desktop`: Tauri-based desktop application
  - `docs`: Documentation site

- **Packages** (`packages/*`): Shared libraries
  - `@midday/db`: Database schema, queries, and Drizzle ORM client
  - `@midday/supabase`: Supabase client wrappers (server/client/middleware)
  - `@midday/ui`: Shared UI components (Shadcn-based)
  - `@midday/jobs`: Trigger.dev background jobs
  - `@midday/engine-client`: Client for engine API
  - Other utilities: `utils`, `cache`, `logger`, `encryption`, `notifications`, etc.

### Key Technical Patterns

**Database Access:**
- Use `@midday/db/client` for database operations
- Schema defined in `packages/db/src/schema.ts`
- Queries exported from `packages/db/src/queries/index.ts`
- Always use workspace imports: `import { db } from "@midday/db/client"`

**API Layer:**
- `apps/api`: tRPC server with Hono for REST endpoints
- tRPC routers in `apps/api/src/trpc/routers/`
- REST routes in `apps/api/src/rest/routers/`
- Engine API handles bank provider integrations (GoCardless, Plaid, Teller, EnableBanking)

**Dashboard App (Next.js):**
- App Router with internationalization: `app/[locale]/(app)/...`
- Server Actions in `apps/dashboard/src/actions/`
- Components in `apps/dashboard/src/components/`
- Route groups: `(app)/(sidebar)` for authenticated sidebar layout, `(public)` for unauthenticated

**Authentication & Authorization:**
- Supabase Auth via `@midday/supabase/middleware`
- Multi-factor authentication (MFA) flows in `/mfa/setup` and `/mfa/verify`
- OAuth flows for third-party integrations (Slack, Gmail, bank providers)

**Background Jobs:**
- Trigger.dev for long-running tasks (`@midday/jobs`)
- Jobs defined in `packages/jobs/src/`
- Run locally: `bun run jobs:dashboard` (filter to dashboard jobs)

**Bank Integrations:**
- Engine app acts as unified API for multiple providers
- Providers in `apps/engine/src/providers/`: gocardless, plaid, teller, enablebanking
- Each provider implements a common interface

## Development Commands

### Install Dependencies
```bash
bun install
```

### Development
```bash
# Run all apps in parallel
bun run dev

# Run specific app
bun run dev:api          # API server (port 3003)
bun run dev:dashboard    # Dashboard (port 3000)
bun run dev:website      # Website
bun run dev:engine       # Engine (Cloudflare Workers, port 3002)
bun run dev:desktop      # Desktop (Tauri)

# Run background jobs
bun run jobs:dashboard
```

### Build & Test
```bash
# Build all
bun run build

# Build specific app
bun run build:dashboard

# Run tests (parallel)
bun run test

# Database-specific tests
cd packages/db
bun run test:matching              # Transaction matching tests
bun run test:integration           # Integration tests
bun run test:performance          # Performance tests
```

### Code Quality
```bash
# Lint (Biome + manypkg)
bun run lint

# Format code (Biome)
bun run format

# Type checking
bun run typecheck
```

### Database
```bash
# Generate TypeScript types from Supabase schema
cd packages/supabase
bun run db:generate  # Requires PROJECT_ID env var
```

### Production
```bash
# Start production builds
bun run start:dashboard
bun run start:website
```

## Important Development Notes

### Environment Variables
- Root `.env` for shared config
- App-specific `.env` files in `apps/*/`
- Turbo passes specific env vars (see `turbo.json` `passThroughEnv`)
- Never commit secrets to git

### Code Style
- **Formatter/Linter**: Biome (not Prettier/ESLint)
- **Indentation**: 2 spaces
- **Imports**: Auto-organized by Biome
- **Naming**:
  - Files/folders: kebab-case
  - Components: PascalCase
  - Functions/variables: camelCase
  - Packages: `@midday/<name>`

### Testing
- **Runner**: Bun test (default)
- **Location**: Colocate tests as `*.test.ts` next to source
- **Focus**: Unit tests for pure logic; mock I/O and external services
- Example: `packages/db/src/test/transaction-matching.test.ts`

### Common Patterns

**Supabase Queries:**
```typescript
// Server-side
import { createClient } from "@midday/supabase/server";
const supabase = await createClient();

// Client-side
import { createClient } from "@midday/supabase/client";
const supabase = createClient();

// Cached queries
import { getCachedUser } from "@midday/supabase/cached-queries";
```

**Server Actions:**
```typescript
// apps/dashboard/src/actions/example-action.ts
"use server";
import { authActionClient } from "./safe-action";
import { z } from "zod";

const schema = z.object({ id: z.string() });

export const exampleAction = authActionClient
  .schema(schema)
  .action(async ({ parsedInput: { id }, ctx: { user } }) => {
    // Implementation
  });
```

**tRPC Procedures:**
```typescript
// apps/api/src/trpc/routers/example.ts
import { protectedProcedure, createTRPCRouter } from "../init";
import { z } from "zod";

export const exampleRouter = createTRPCRouter({
  getData: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      // Implementation
    }),
});
```

## Deployment

- **Dashboard & Website**: Vercel
- **API**: Fly.io
- **Engine**: Cloudflare Workers (`bun run deploy` from `apps/engine`)
- **Background Jobs**: Trigger.dev cloud
- **Database, Storage, Auth**: Supabase

## External Services

- **Auth**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Background Jobs**: Trigger.dev
- **Email**: Resend
- **Analytics**: OpenPanel
- **Bank Connections**: GoCardLess (EU), Plaid (CA/US), Teller (US), EnableBanking
- **Search**: Typesense
- **AI**: OpenAI, Mistral, Gemini
- **Payment**: Polar

## Troubleshooting

### Type Errors
- Ensure all packages are built: `bun run build`
- Check workspace dependencies are installed: `bun install`
- Verify `packages/tsconfig` is configured correctly

### Database Issues
- Regenerate types: `cd packages/supabase && bun run db:generate`
- Check connection pool: Health endpoint at `http://localhost:3003/health`

### Monorepo Issues
- Clean workspaces: `bun run clean:workspaces`
- Verify package exports in `package.json` match actual file paths
- Check workspace dependencies with `manypkg check`
