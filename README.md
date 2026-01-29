![hero](github.png)

<p align="center">
	<h1 align="center"><b>Midday</b></h1>
<p align="center">
    Run your business smarters
    <br />
    <br />
    <a href="https://go.midday.ai/anPiuRx">Discord</a>
    ·
    <a href="https://midday.ai">Website</a>
    ·
    <a href="https://github.com/midday-ai/midday/issues">Issues</a>
  </p>
</p>

<p align="center">
  <a href="https://go.midday.ai/K7GwMoQ">
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  </a>
</p>

## About Midday

Midday is an all-in-one tool designed to help freelancers, contractors, consultants, and solo entrepreneurs manage their business operations more efficiently. It integrates various functions typically scattered across multiple platforms into a single, cohesive system.


## Features

**Time Tracking**: Allows for live time tracking of projects to boost productivity and collaboration, providing insightful project overviews.<br/>
**Invoicing**: Create web-based invoices with a visual editor, real-time collaboration, PDF generation, tax override system, and invoice search capabilities.<br/>
**Magic Inbox**: Automatically matches incoming invoices or receipts to the correct transactions, simplifying financial tracking and organization. Includes Gmail integration for seamless email processing.<br/>
**Vault**: Secure storage for important files like contracts and agreements, keeping everything in one place for easy access. Includes file deletion safety warnings.<br/>
**Transaction Management**: Advanced filtering system, inline editing, transaction categorization, and bulk export to CSV/XLSX with customizable settings and email delivery to accountants.<br/>
**Invoice Products**: Full-featured product catalog with autocomplete, reusable templates, and usage tracking for efficient invoice creation.<br/>
**Bank Connections**: Multi-provider support including GoCardLess (EU), Plaid (Canada/US), Teller (US), and Enable Banking (EU) for comprehensive account aggregation.<br/>
**Assistant**: Provides tailored insights into financial situations, helping users understand spending patterns, cut costs, and find documents.<br/>

## Recent Updates (October 2025)

### New Features

1. **Transaction Filtering System** - Advanced filter capabilities for transaction management with improved search and filtering UI
2. **Transaction Inline Editing** - Edit transactions directly from the transaction list without opening a modal
3. **Invoice Search** - Search functionality to quickly find invoices by various criteria
4. **Gmail Integration** - Connect Gmail account for automated invoice and receipt processing through Magic Inbox
5. **Tax Override Feature** - Manual VAT/tax calculation overrides for invoices with automatic tax rate resolution
6. **Export Settings & Transaction Export** - Enhanced export capabilities with CSV/XLSX formats, configurable delimiters, and optional email delivery to accountants
7. **Enable Banking Integration** - Complete integration with Enable Banking provider for European bank connections with JWT-based security
8. **Invoice Products Management** - Full product catalog system with autocomplete, reusable templates, and usage tracking
9. **Bulk Invoice Operations** - Download multiple invoices at once and perform bulk actions on invoice lists
10. **Category Management Refactor** - Modernized category management with improved forms, parent category selection, and better UX
11. **Invoice Summary & Multi-Currency Support** - Enhanced invoice summary calculations with automatic multi-currency totals
12. **Vault File Deletion Safety** - Warning dialogs when deleting vault files to prevent accidental deletions
13. **Teams API Endpoint** - New REST API endpoint for team management operations

### Infrastructure & Improvements

- **CASA Implementation** - Enhanced middleware architecture with advanced routing rules and improved security headers
- **SEO Optimization** - Blog URL migration (/blog/ → /updates/) and metadata enhancements
- **Country Selector UX** - Improved popover z-index and portal support
- **Middleware Stability** - Locale cookie handling and edge case fixes
- **Realtime Data Synchronization** - Improved realtime data updates across the application
- **Global Sheets Management** - Centralized sheet management system for better state handling
- **Search Query Improvements** - Enhanced search functionality across the application




## Get started

We are working on the documentation to get started with Midday for local development: https://docs.midday.ai

## Local Development Setup

### Prerequisites
- [Bun](https://bun.sh/) installed
- [Node.js](https://nodejs.org/) v22+ (for tsx)
- A Supabase project (free tier works)

### 1. Clone and Install

```bash
git clone git@github.com:Nicholas0350/nicholas.git midday
cd midday
bun install
```

### 2. Supabase Setup

Create a new Supabase project at https://supabase.com/dashboard

#### Enable Required Extensions
Run in Supabase SQL Editor:
```sql
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
```

#### Create Required Functions
Run in Supabase SQL Editor:
```sql
-- nanoid function
CREATE OR REPLACE FUNCTION nanoid(size int DEFAULT 21)
RETURNS text AS $$
DECLARE
  id text := '';
  i int := 0;
  alphabet char(64) := '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
  bytes bytea := gen_random_bytes(size);
  byte int;
BEGIN
  WHILE i < size LOOP
    byte := get_byte(bytes, i);
    id := id || substr(alphabet, (byte & 63) + 1, 1);
    i := i + 1;
  END LOOP;
  RETURN id;
END
$$ LANGUAGE plpgsql VOLATILE;

-- generate_inbox function
CREATE OR REPLACE FUNCTION generate_inbox(size int DEFAULT 10)
RETURNS text AS $$
BEGIN
  RETURN nanoid(size);
END
$$ LANGUAGE plpgsql VOLATILE;

-- extract_product_names function
CREATE OR REPLACE FUNCTION extract_product_names(products json)
RETURNS text AS $$
DECLARE
  result text := '';
BEGIN
  IF products IS NOT NULL THEN
    SELECT string_agg(p->>'name', ' ') INTO result
    FROM json_array_elements(products) AS p;
  END IF;
  RETURN COALESCE(result, '');
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- generate_inbox_fts function
CREATE OR REPLACE FUNCTION generate_inbox_fts(display_name text, product_names text)
RETURNS tsvector AS $$
BEGIN
  RETURN to_tsvector('english', COALESCE(display_name, '') || ' ' || COALESCE(product_names, ''));
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- Create private schema and auth function
CREATE SCHEMA IF NOT EXISTS private;

CREATE OR REPLACE FUNCTION private.get_teams_for_authenticated_user()
RETURNS SETOF uuid AS $$
BEGIN
  RETURN QUERY
  SELECT team_id FROM users_on_team WHERE user_id = auth.uid();
END
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;
```

#### Push Database Schema
```bash
cd packages/db
DATABASE_SESSION_POOLER="postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres" npx drizzle-kit push --force
```

If drizzle-kit has connection issues, run the migration SQL directly in Supabase SQL Editor:
1. Copy contents of `apps/api/migrations/0000_bumpy_chat.sql`
2. Remove the first 3 comment lines and `-->` markers
3. Run in SQL Editor

### 3. Environment Variables

#### API (`apps/api/.env.local`)
```bash
# Supabase
SUPABASE_URL=https://[PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON_KEY]
SUPABASE_SERVICE_KEY=[SERVICE_ROLE_KEY]
SUPABASE_JWT_SECRET=[JWT_SECRET]

# Database
DATABASE_PRIMARY_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres

# Local Development
PORT=3003
NEXT_PUBLIC_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3003
ALLOWED_API_ORIGINS=http://localhost:3001,http://localhost:3000

# Engine
ENGINE_API_KEY=secret
ENGINE_API_URL=http://localhost:3002

# Invoice
INVOICE_JWT_SECRET=secret

# Webhook
WEBHOOK_SECRET_KEY=[RANDOM_UUID]
```

#### Dashboard (`apps/dashboard/.env.local`)
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON_KEY]
SUPABASE_SERVICE_KEY=[SERVICE_ROLE_KEY]
SUPABASE_URL=https://[PROJECT_ID].supabase.co

# Local Development
NEXT_PUBLIC_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3003

# Engine
ENGINE_API_KEY=secret
ENGINE_API_URL=http://localhost:3002

# Invoice
INVOICE_JWT_SECRET=secret

# Webhook
WEBHOOK_SECRET_KEY=[RANDOM_UUID]
```

### 4. Get Supabase Credentials

From Supabase Dashboard:
- **Project URL**: Settings → General → Project URL
- **Anon Key**: Settings → API Keys → Legacy anon, service_role API keys → anon key
- **Service Role Key**: Settings → API Keys → Legacy anon, service_role API keys → service_role key
- **JWT Secret**: Settings → JWT Keys → Legacy JWT Secret
- **Database Password**: Settings → Database → Connection string (click Connect button)

### 5. Configure Authentication

For email/password auth (simplest):
- Go to Authentication → Providers → Email
- Enable email provider

For Google OAuth:
- Go to Authentication → Providers → Google
- Add Google OAuth credentials
- Set redirect URL to `http://localhost:3001`

### 6. Run Development Servers

**Option A**: Run all services
```bash
bun run dev
```

**Option B**: Run services separately

API (uses tsx/Node.js to avoid Bun DNS issues):
```bash
cd apps/api
npx tsx src/index.ts
# Runs on http://localhost:3003
```

Dashboard:
```bash
cd apps/dashboard
bun run dev
# Runs on http://localhost:3001
```

Engine (if needed for bank connections):
```bash
cd apps/engine
bun run dev
# Runs on http://localhost:3002
```

### 7. First Run

1. Go to http://localhost:3001
2. Sign up with email/password (or Google if configured)
3. Create a team at /teams/create
4. Start using the dashboard

### Troubleshooting

**Bun DNS errors**: Use `npx tsx` instead of `bun` to run the API:
```bash
cd apps/api && npx tsx src/index.ts
```

**CORS errors**: Ensure `ALLOWED_API_ORIGINS` in API .env.local includes your dashboard URL.

**Auth errors**: Make sure you're using the Legacy JWT-format keys from Supabase, not the new `sb_publishable_*` format.

**Database schema missing**: Run the SQL functions above, then push the schema with drizzle-kit or run the migration SQL directly.

## App Architecture

- Monorepo
- Bun
- React
- TypeScript
- Nextjs
- Supabase
- Shadcn
- Tauri
- Expo
- TailwindCSS

### Hosting

- Supabase (database, storage, realtime, auth)
- Vercel (Website, Dashboard)
- Fly.io (API/tRPC)

### Services

- Trigger.dev (background jobs)
- Resend (Transactional & Marketing)
- Github Actions (CI/CD)
- GoCardLess (Bank connection EU)
- Plaid (Bank connection in Canada and US)
- Teller (Bank connection in the US)
- Enable Banking (Bank connection EU)
- OpenPanel (Events and Analytics)
- Polar (Payment processing)
- Typesense (Search)
- Mistral
- Gemini
- OpenAI

## Repo Activity

![Alt](https://repobeats.axiom.co/api/embed/96aae855e5dd87c30d53c1d154b37cf7aa5a89b3.svg "Repobeats analytics image")

## License

This project is licensed under the **[AGPL-3.0](https://opensource.org/licenses/AGPL-3.0)** for non-commercial use.

### Commercial Use

For commercial use or deployments requiring a setup fee, please contact us
for a commercial license at [engineer@midday.ai](mailto:engineer@midday.ai).

By using this software, you agree to the terms of the license.
