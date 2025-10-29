# Midday Codebase Structure

**Project:** All-in-one business management platform for freelancers and solo entrepreneurs
**Architecture:** Turborepo monorepo with Bun, Next.js, React, TypeScript, Supabase, and Tauri

---

## Monorepo Structure

```
midday/
│
├── apps/                           # Standalone applications
│   ├── api/                        # tRPC/Hono API server (Bun, port 3003)
│   │   ├── src/
│   │   │   ├── trpc/
│   │   │   │   ├── routers/       # tRPC procedure definitions
│   │   │   │   └── init.ts        # tRPC context & middleware
│   │   │   └── rest/
│   │   │       └── routers/       # REST endpoint handlers
│   │   └── index.ts               # Hono server entry point
│   │
│   ├── dashboard/                  # Main Next.js dashboard (port 3000)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   └── [locale]/
│   │   │   │       ├── (app)/
│   │   │   │       │   ├── (sidebar)/          # Authenticated routes with sidebar
│   │   │   │       │   │   ├── page.tsx        # Dashboard home
│   │   │   │       │   │   ├── transactions/
│   │   │   │       │   │   │   ├── page.tsx
│   │   │   │       │   │   │   └── categories/
│   │   │   │       │   │   ├── invoices/
│   │   │   │       │   │   │   ├── page.tsx
│   │   │   │       │   │   │   └── products/
│   │   │   │       │   │   ├── inbox/
│   │   │   │       │   │   ├── vault/
│   │   │   │       │   │   ├── tracker/        # Time tracking
│   │   │   │       │   │   ├── customers/
│   │   │   │       │   │   ├── apps/           # Integrations
│   │   │   │       │   │   ├── settings/
│   │   │   │       │   │   │   ├── accounts/   # Bank accounts
│   │   │   │       │   │   │   ├── billing/
│   │   │   │       │   │   │   ├── developer/  # API keys
│   │   │   │       │   │   │   ├── members/
│   │   │   │       │   │   │   └── notifications/
│   │   │   │       │   │   └── account/
│   │   │   │       │   │       ├── security/
│   │   │   │       │   │       ├── teams/
│   │   │   │       │   │       ├── support/
│   │   │   │       │   │       └── date-and-locale/
│   │   │   │       │   ├── mfa/
│   │   │   │       │   │   ├── setup/
│   │   │   │       │   │   └── verify/
│   │   │   │       │   ├── oauth/
│   │   │   │       │   │   └── authorize/
│   │   │   │       │   ├── teams/
│   │   │   │       │   ├── setup/              # Onboarding
│   │   │   │       │   └── desktop/
│   │   │   │       └── (public)/               # Unauthenticated routes
│   │   │   ├── actions/                        # Server Actions
│   │   │   └── components/                     # React components
│   │   ├── middleware.ts                       # Supabase auth + i18n
│   │   └── vercel.json                         # Deployment config with CASA rules
│   │
│   ├── website/                    # Marketing website (Next.js)
│   │   └── src/app/
│   │       └── updates/            # Blog/changelog (was /blog/)
│   │
│   ├── engine/                     # Cloudflare Workers API (port 3002)
│   │   └── src/
│   │       ├── providers/          # Bank provider integrations
│   │       │   ├── gocardless/     # EU bank connections
│   │       │   ├── plaid/          # CA/US bank connections
│   │       │   ├── teller/         # US bank connections
│   │       │   └── enablebanking/  # Additional EU banks
│   │       └── index.ts            # Hono router
│   │
│   ├── desktop/                    # Tauri desktop application
│   │   └── src-tauri/
│   │
│   └── docs/                       # Documentation site
│
├── packages/                       # Shared libraries
│   ├── @midday/db/                # Database (Drizzle ORM)
│   │   ├── src/
│   │   │   ├── schema.ts          # PostgreSQL schema definitions
│   │   │   ├── queries/           # Shared database queries
│   │   │   └── client.ts          # Drizzle client instance
│   │   └── migrations/
│   │
│   ├── @midday/supabase/          # Supabase client wrappers
│   │   └── src/
│   │       ├── server.ts          # Server-side client
│   │       ├── client.ts          # Client-side client
│   │       ├── middleware.ts      # Auth middleware
│   │       └── cached-queries.ts  # React cache wrappers
│   │
│   ├── @midday/ui/                # Shared UI components (Shadcn-based)
│   │
│   ├── @midday/jobs/              # Trigger.dev background jobs
│   │   └── src/
│   │       └── tasks/
│   │           ├── transactions/
│   │           ├── inbox/
│   │           └── invoices/
│   │
│   ├── @midday/invoice/           # Invoice business logic
│   ├── @midday/inbox/             # Inbox matching logic
│   ├── @midday/documents/         # Document processing
│   ├── @midday/engine-client/     # Engine API client
│   ├── @midday/app-store/         # Third-party integrations
│   ├── @midday/categories/        # Transaction categorization
│   ├── @midday/import/            # Data import utilities
│   ├── @midday/location/          # Geolocation services
│   ├── @midday/email/             # Email templates (Resend)
│   ├── @midday/events/            # Analytics events (OpenPanel)
│   ├── @midday/notifications/     # Push notifications
│   ├── @midday/cache/             # Caching layer
│   ├── @midday/logger/            # Logging utilities
│   ├── @midday/encryption/        # Data encryption
│   ├── @midday/utils/             # Shared utilities
│   ├── @midday/desktop-client/    # Desktop app client
│   └── @midday/tsconfig/          # Shared TypeScript configs
│
├── turbo.json                      # Turborepo configuration
├── package.json                    # Root package.json
└── bun.lockb                       # Bun lockfile
```

---

## Technology Stack

### Core Technologies
- **Runtime:** Bun
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **UI:** React + Shadcn UI + TailwindCSS
- **Database:** PostgreSQL (Supabase)
- **ORM:** Drizzle
- **Desktop:** Tauri
- **Monorepo:** Turborepo

### Hosting & Infrastructure
- **Database, Storage, Auth:** Supabase
- **Dashboard & Website:** Vercel
- **API (tRPC):** Fly.io
- **Engine (Workers):** Cloudflare
- **Background Jobs:** Trigger.dev
- **CI/CD:** GitHub Actions

### External Services
- **Email:** Resend
- **Analytics:** OpenPanel
- **Search:** Typesense
- **Payment:** Polar
- **AI:** OpenAI, Mistral, Gemini
- **Bank Integrations:**
  - GoCardLess (EU)
  - Plaid (Canada, US)
  - Teller (US)
  - EnableBanking (EU)

---

## Features

### Financial Management
- **Transactions**
  - Real-time transaction sync from bank accounts
  - Advanced filtering system (NEW - Oct 2025)
  - Transaction categorization
  - Bulk export to CSV
  - Seamless accountant handoff
- **Bank Connections**
  - Multi-provider support (GoCardLess, Plaid, Teller, EnableBanking)
  - Secure OAuth flows
  - Account aggregation
- **Categories**
  - Custom transaction categories
  - Auto-categorization rules

### Invoicing
- **Invoice Management**
  - Web-based invoice creation
  - Real-time collaboration
  - PDF generation
  - Tax override system (NEW - Oct 2025)
  - VAT/tax calculation with manual overrides
- **Products Catalog**
  - Product/service library
  - Pricing management

### Time Tracking
- **Tracker**
  - Live project time tracking
  - Productivity insights
  - Project overviews
  - Team collaboration

### Magic Inbox
- **Automated Matching**
  - AI-powered receipt/invoice matching to transactions
  - OCR document processing
  - Attachment management
  - Inbox settings & rules

### Vault
- **Secure Document Storage**
  - Contracts, agreements, and important files
  - Organized file management
  - Quick search and retrieval

### Customer Management
- **Customer Database**
  - Customer profiles
  - Transaction history
  - Invoice relationships

### Team & Account Management
- **Authentication & Security**
  - Supabase Auth integration
  - Multi-factor authentication (MFA)
  - OAuth provider integrations
- **Team Collaboration**
  - Multi-user workspaces
  - Role-based permissions
  - Team member management
- **Account Settings**
  - Security preferences
  - Date & locale customization
  - Support access
  - Notification preferences
  - Billing management

### Integrations & Developer Tools
- **App Store**
  - Third-party app integrations
  - Slack, Gmail, and more
- **Developer API**
  - API key management
  - OAuth app creation
  - Webhook configuration

### AI Assistant
- **Financial Insights**
  - Spending pattern analysis
  - Cost-cutting recommendations
  - Document discovery
  - Natural language queries

### Infrastructure & Performance
- **CASA Implementation** (NEW - Oct 2025)
  - Enhanced middleware architecture
  - Advanced routing rules
  - Improved security headers
- **Internationalization**
  - Multi-language support
  - Locale-specific formatting
- **SEO Optimization**
  - Sitemap management
  - Metadata optimization
  - Content migration (/blog/ → /updates/)

### Desktop Application
- **Native Desktop Features**
  - Search functionality
  - Local data sync
  - Checkout flow
  - Cross-platform support (Tauri)

---

## Development Patterns

### Database Access
```typescript
// Use workspace imports
import { db } from "@midday/db/client";
import { transactions } from "@midday/db/schema";

// Shared queries
import { getUser } from "@midday/db/queries";
```

### Supabase Queries
```typescript
// Server-side
import { createClient } from "@midday/supabase/server";
const supabase = await createClient();

// Client-side
import { createClient } from "@midday/supabase/client";
const supabase = createClient();
```

### Server Actions
```typescript
// apps/dashboard/src/actions/example-action.ts
"use server";
import { authActionClient } from "./safe-action";
import { z } from "zod";

export const exampleAction = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput, ctx }) => {
    // Implementation
  });
```

### tRPC Procedures
```typescript
// apps/api/src/trpc/routers/example.ts
import { protectedProcedure, createTRPCRouter } from "../init";

export const exampleRouter = createTRPCRouter({
  getData: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      // Implementation
    }),
});
```

---

## Recent Updates (October 2025)

**8 commits merged from upstream:**

1. **Transaction Filtering System** - Advanced filter capabilities for transaction management
2. **Tax Override Feature** - Manual VAT/tax calculation overrides for invoices
3. **CASA Implementation** - Middleware and routing infrastructure improvements
4. **SEO Optimization** - Blog URL migration and metadata enhancements
5. **Country Selector UX** - Improved popover z-index and portal support
6. **Middleware Stability** - Locale cookie handling and edge case fixes

---

## Code Style & Standards

- **Formatter/Linter:** Biome (not Prettier/ESLint)
- **Indentation:** 2 spaces
- **Naming Conventions:**
  - Files/folders: kebab-case
  - Components: PascalCase
  - Functions/variables: camelCase
  - Packages: `@midday/<name>`
- **Testing:** Bun test runner, colocated tests as `*.test.ts`

---

*Last updated: October 2025*
