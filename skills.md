# Skills (Midday-Benchmark Playbooks)

This repo is our benchmark for “how we build apps”. This file defines the Claude/Codex skills we should create as reusable playbooks, grouped by product feature, with a shared set of core platform skills.

## Skill format (what each skill doc should contain)

Each skill should live as a standalone `SKILL.md` (or equivalent) and include:

- **Trigger**: phrases / intents that activate the skill
- **Assumptions**: stack choices + required env vars
- **Decision rules**: when to choose which pattern
- **Templates**: copy-ready code patterns (trimmed, composable)
- **References**: canonical Midday paths to imitate
- **Validation**: checklist + commands to run

## Core platform skills (reused by most features)

These come directly from `~/.claude/plans/modular-wishing-catmull.md` and should be built first:

1. `turborepo-monorepo-scaffold`
2. `drizzle-db-layer`
3. `trpc-api-layer`
4. `nextjs-server-actions`
5. `trigger-jobs`
6. `supabase-auth-integration`
7. `ui-component-library`

## Cross-cutting skills (missing but high leverage)

These are the “glue” skills that keep new apps consistent and fast to ship:

- `multitenancy-permissions` (team/org scoping, RBAC, RLS conventions, “teamId everywhere”)
- `observability-logging-errors` (structured logs, request IDs, error boundaries, Sentry/PostHog patterns)
- `analytics-events-attribution` (event taxonomy, server/client tracking, metadata conventions)
- `integrations-oauth-webhooks-sync` (OAuth flows, webhook verification, idempotency, sync jobs)
- `notifications-email-sms` (email templates, deliverability basics, async sending, retries)
- `files-storage-processing` (upload patterns, storage paths, async processing, virus/PDF/image pipelines)
- `migrations-seeding` (schema migration conventions, seed data, local dev bootstrap)

## Feature bundles (build by feature)

Each feature bundle below lists the skill set that should activate together.

### Assistant (AI answers + summaries)

- **Skills**: `ui-component-library`, `trpc-api-layer`, `drizzle-db-layer`, `trigger-jobs`, `analytics-events-attribution`
- **Midday refs**: `apps/dashboard/src/components/assistant/`, `apps/api/src/trpc/routers/assistant.ts`
- **Add-on**: `mcp-builder` (when exposing tool integrations via MCP servers)

### Transactions (bank sync + categorization + table UX)

- **Skills**: `trigger-jobs`, `trpc-api-layer`, `drizzle-db-layer`, `ui-component-library`, `nextjs-server-actions`
- **Midday refs**: `packages/jobs/src/tasks/bank/`, `apps/api/src/trpc/routers/transactions.ts`, `apps/dashboard/src/components/tables/transactions/`
- **Add-on**: `integrations-oauth-webhooks-sync` (provider auth + webhooks), `multitenancy-permissions`

### Inbox (receipts + matching + storage)

- **Skills**: `trigger-jobs`, `drizzle-db-layer`, `ui-component-library`, `supabase-auth-integration`, `files-storage-processing`
- **Midday refs**: `packages/jobs/src/tasks/inbox/`, `apps/dashboard/src/components/inbox/`

### Insights (metrics + summaries + notifications)

- **Skills**: `drizzle-db-layer`, `trigger-jobs`, `ui-component-library`, `notifications-email-sms`, `analytics-events-attribution`
- **Midday refs**: `packages/db/src/queries/metrics.ts`, `apps/dashboard/src/components/charts/`, `apps/dashboard/src/components/widgets/`

### Invoicing (PDF + email + payments)

- **Skills**: `drizzle-db-layer`, `trigger-jobs`, `trpc-api-layer`, `ui-component-library`, `nextjs-server-actions`, `notifications-email-sms`
- **Midday refs**: `packages/invoice/`, `packages/email/`, `apps/api/src/trpc/routers/invoices.ts`, `apps/dashboard/src/actions/invoice-*`
- **Optional**: `integrations-oauth-webhooks-sync` (Stripe/payment providers)

### Time tracking (entries + reports)

- **Skills**: `drizzle-db-layer`, `trpc-api-layer`, `ui-component-library`, `analytics-events-attribution`
- **Midday refs**: `apps/api/src/trpc/routers/tracker.ts`, `apps/dashboard/src/components/tracker/`

### Customers (CRM-lite + customer performance)

- **Skills**: `drizzle-db-layer`, `trpc-api-layer`, `ui-component-library`, `analytics-events-attribution`
- **Midday refs**: `apps/api/src/trpc/routers/customers.ts`

### Files (vault + document processing)

- **Skills**: `supabase-auth-integration`, `files-storage-processing`, `trigger-jobs`, `ui-component-library`, `drizzle-db-layer`
- **Midday refs**: `apps/dashboard/src/components/vault/`

### Integrations (OAuth + webhooks + sync + tool access)

- **Skills**: `integrations-oauth-webhooks-sync`, `trigger-jobs`, `trpc-api-layer`, `supabase-auth-integration`, `observability-logging-errors`
- **Midday refs**: `apps/dashboard/src/app/api/`, `apps/api/src/rest/routers/`

### Pre-accounting / export (clean records + exports)

- **Skills**: `drizzle-db-layer`, `trigger-jobs`, `ui-component-library`, `multitenancy-permissions`
- **Notes**: include export format conventions + reconciliation status enums as templates

## Next: skill implementation order (fastest path)

1. Implement the 7 **core platform** skills.
2. Implement **multitenancy-permissions** + **integrations-oauth-webhooks-sync** (unblocks most real apps).
3. Implement **observability-logging-errors** + **analytics-events-attribution** (prevents product drift).
4. Implement feature add-ons as needed per app.

