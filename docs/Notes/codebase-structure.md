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
│   │   │   ├── index.ts           # Hono server entry point
│   │   │   ├── rest/
│   │   │   │   └── routers/       # REST endpoint handlers ([22 files])
│   │   │   ├── schemas/           # Zod validation schemas ([30 files])
│   │   │   │   └── transactions.ts
│   │   │   ├── services/          # Service layer ([2 files])
│   │   │   ├── trpc/
│   │   │   │   ├── routers/       # tRPC procedure definitions ([34 files])
│   │   │   └── init.ts        # tRPC context & middleware
│   │   │   └── utils/             # Utility functions ([10 files])
│   │   ├── migrations/            # Database migrations
│   │   │   ├── 0000_bumpy_chat.sql
│   │   │   └── meta/
│   │   ├── fly.toml               # Fly.io deployment config
│   │   ├── fly-preview.yml
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md
│   │
│   ├── dashboard/                  # Main Next.js dashboard (port 3000)
│   │   ├── public/                             # Static assets
│   │   │   ├── appicon.png
│   │   │   └── assets/                         # Static assets ([12 files])
│   │   ├── src/
│   │   │   ├── actions/                        # Server Actions ([28 files])
│   │   │   ├── app/
│   │   │   │   ├── [locale]/
│   │   │   │   │   ├── (app)/
│   │   │   │   │   │   ├── (sidebar)/          # Authenticated routes with sidebar
│   │   │   │   │   │   │   ├── page.tsx        # Dashboard home
│   │   │   │   │   │   │   ├── transactions/
│   │   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   │   │   └── categories/
│   │   │   │   │   │   │   ├── invoices/
│   │   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   │   │   └── products/
│   │   │   │   │   │   │   ├── inbox/
│   │   │   │   │   │   │   ├── vault/
│   │   │   │   │   │   │   ├── tracker/        # Time tracking
│   │   │   │   │   │   │   ├── customers/
│   │   │   │   │   │   │   ├── apps/           # Integrations
│   │   │   │   │   │   │   ├── settings/
│   │   │   │   │   │   │   │   ├── accounts/   # Bank accounts
│   │   │   │   │   │   │   │   ├── billing/
│   │   │   │   │   │   │   │   ├── developer/  # API keys
│   │   │   │   │   │   │   │   ├── members/
│   │   │   │   │   │   │   │   └── notifications/
│   │   │   │   │   │   │   └── account/
│   │   │   │   │   │   │       ├── security/
│   │   │   │   │   │   │       ├── teams/
│   │   │   │   │   │   │       ├── support/
│   │   │   │   │   │   │       └── date-and-locale/
│   │   │   │   │   │   ├── mfa/
│   │   │   │   │   │   │   ├── setup/
│   │   │   │   │   │   │   └── verify/
│   │   │   │   │   │   ├── oauth/
│   │   │   │   │   │   │   └── authorize/
│   │   │   │   │   │   ├── teams/
│   │   │   │   │   │   ├── setup/              # Onboarding
│   │   │   │   │   │   └── desktop/
│   │   │   │   │   └── (public)/               # Unauthenticated routes
│   │   │   │   ├── api/                        # API routes (if any)
│   │   │   │   ├── favicon.ico
│   │   │   │   └── global-error.tsx
│   │   │   ├── components/                     # React components ([486 files])
│   │   │   ├── hooks/                          # Custom React hooks ([38 files])
│   │   │   ├── instrumentation-client.ts       # Client instrumentation
│   │   │   ├── instrumentation.ts              # Server instrumentation
│   │   │   ├── lib/                            # Utility libraries ([11 files])
│   │   │   ├── locales/                        # i18n translation files ([4 files])
│   │   │   ├── middleware.ts                   # Supabase auth + i18n
│   │   │   ├── store/                          # State management ([8 files])
│   │   │   ├── styles/                         # Global styles ([1 file])
│   │   │   ├── trpc/                           # tRPC client setup ([3 files])
│   │   │   ├── types/                          # TypeScript types ([1 file])
│   │   │   └── utils/                          # Helper functions ([23 files])
│   │   ├── image-loader.ts                     # Custom image loader
│   │   ├── next.config.mjs                     # Next.js configuration
│   │   ├── postcss.config.cjs                  # PostCSS configuration
│   │   ├── sentry.edge.config.ts               # Sentry edge configuration
│   │   ├── sentry.server.config.ts             # Sentry server configuration
│   │   ├── tailwind.config.ts                  # Tailwind CSS configuration
│   │   ├── vercel.json                         # Deployment config with CASA rules
│   │   ├── .env-template                       # Environment variables template
│   │   ├── Dockerfile                          # Docker configuration
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md
│   │
│   ├── website/                    # Marketing website (Next.js)
│   │   ├── public/                             # Static assets ([131 files])
│   │   ├── src/
│   │   │   ├── actions/                        # Server Actions ([5 files])
│   │   │   ├── app/
│   │   │   │   ├── [59 files in subtree]
│   │   │   │   └── updates/            # Blog/changelog (was /blog/)
│   │   │   ├── components/                     # React components ([80 files])
│   │   │   ├── lib/                            # Utility libraries ([4 files])
│   │   │   ├── styles/                         # Global styles ([1 file])
│   │   │   └── utils/                          # Helper functions ([1 file])
│   │   ├── image-loader.ts                     # Custom image loader
│   │   ├── next.config.mjs                     # Next.js configuration
│   │   ├── postcss.config.cjs                  # PostCSS configuration
│   │   ├── tailwind.config.ts                  # Tailwind CSS configuration
│   │   ├── vercel.json                         # Deployment configuration
│   │   ├── .env-template                       # Environment variables template
│   │   ├── Dockerfile                          # Docker configuration
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md
│   │
│   ├── engine/                     # Cloudflare Workers API (port 3002)
│   │   ├── src/
│   │   │   ├── common/             # Common utilities ([2 files])
│   │   │   ├── index.ts            # Hono router entry point
│   │   │   ├── middleware.ts       # Middleware functions
│   │   │   ├── providers/          # Bank provider integrations ([31 files])
│   │   │   │   ├── gocardless/     # EU bank connections
│   │   │   │   ├── plaid/          # CA/US bank connections
│   │   │   │   ├── teller/         # US bank connections
│   │   │   │   └── enablebanking/  # Additional EU banks
│   │   │   ├── routes/             # Route handlers ([15 files])
│   │   │   └── utils/              # Utility functions ([10 files])
│   │   ├── tasks/                  # Background tasks
│   │   │   ├── download-gocardless.ts
│   │   │   ├── download-teller.ts
│   │   │   ├── get-institutions.ts
│   │   │   ├── import.ts
│   │   │   └── utils.ts
│   │   ├── wrangler.toml                    # Cloudflare Workers config
│   │   ├── tsconfig.build.json              # Build TypeScript config
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md
│   │
│   ├── desktop/                    # Tauri desktop application
│   │   ├── index.html
│   │   ├── src/
│   │   │   ├── main.tsx
│   │   │   └── vite-env.d.ts
│   │   ├── src-tauri/
│   │   │   ├── build.rs
│   │   │   ├── capabilities/
│   │   │   │   ├── [2 files]
│   │   │   ├── Cargo.lock
│   │   │   ├── Cargo.toml
│   │   │   ├── icons/
│   │   │   │   ├── [22 files]
│   │   │   ├── images/
│   │   │   │   ├── [1 file]
│   │   │   ├── src/
│   │   │   │   ├── [2 files]
│   │   │   ├── tauri.conf.json
│   │   │   ├── tauri.dev.conf.json
│   │   │   ├── tauri.staging.conf.json
│   │   ├── tsconfig.json
│   │   ├── tsconfig.node.json
│   │   ├── vite.config.ts
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── docs/                       # Documentation site
│       ├── api-reference/
│       │   └── engine/
│       │       └── [25 files in subtree]
│       ├── examples.mdx
│       ├── images/
│       │   ├── engine.png
│       │   ├── header.png
│       │   └── logos/
│       │       ├── favicon.png
│       │       ├── logotype-dark.svg
│       │       └── logotype.svg
│       ├── mint.json
│       ├── package.json
│       ├── README.md
│       ├── integrations.mdx
│       ├── introduction.mdx
│       ├── local-development.mdx
│       └── self-hosting.mdx
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
│   │   ├── src/
│   │   │   ├── cal/
│   │   │   │   ├── [2 files]
│   │   │   ├── db/
│   │   │   │   ├── [1 file]
│   │   │   ├── fortnox/
│   │   │   │   ├── [2 files]
│   │   │   ├── index.ts
│   │   │   ├── quick-books/
│   │   │   │   ├── [2 files]
│   │   │   ├── raycast/
│   │   │   │   ├── [2 files]
│   │   │   ├── slack/
│   │   │   │   ├── [12 files]
│   │   │   ├── types.ts
│   │   │   ├── visma/
│   │   │   │   ├── [2 files]
│   │   │   ├── xero/
│   │   │   │   ├── [2 files]
│   │   │   └── zapier/
│   │   │       └── [2 files]
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── @midday/cache/             # Caching layer
│   │   ├── src/
│   │   │   ├── [8 files]
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── @midday/categories/        # Transaction categorization
│   │   ├── src/
│   │   │   ├── categories.ts
│   │   │   ├── color-system.ts
│   │   │   ├── embeddings.ts
│   │   │   ├── index.ts
│   │   │   ├── tax-rates/
│   │   │   │   ├── [1 file]
│   │   │   ├── types.ts
│   │   │   └── utils.ts
│   │   ├── package.json
│   │   ├── README.md
│   │   └── tsconfig.json
│   ├── @midday/desktop-client/    # Desktop app client
│   │   ├── src/
│   │   │   ├── [3 files]
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── @midday/documents/         # Document processing
│   │   ├── src/
│   │   │   ├── [14 files]
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── @midday/email/             # Email templates (Resend)
│   │   ├── components/
│   │   │   ├── [7 files]
│   │   ├── emails/
│   │   │   ├── [16 files]
│   │   ├── locales/
│   │   │   ├── [2 files]
│   │   ├── public/...
│   │   ├── render.ts
│   │   ├── vercel.json
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── @midday/encryption/        # Data encryption
│   │   ├── src/
│   │   │   ├── [2 files]
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── @midday/engine-client/     # Engine API client
│   │   ├── src/
│   │   │   ├── [1 file]
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── @midday/events/            # Analytics events (OpenPanel)
│   │   ├── src/
│   │   │   ├── [22 files]
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── @midday/import/            # Data import utilities
│   │   ├── src/
│   │   │   ├── [7 files]
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── @midday/inbox/             # Inbox matching logic
│   │   ├── src/
│   │   │   ├── [9 files]
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── @midday/invoice/           # Invoice business logic
│   │   ├── src/
│   │   │   ├── [37 files]
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── @midday/jobs/              # Trigger.dev background jobs
│   │   ├── scripts/
│   │   │   ├── [4 files]
│   │   ├── src/
│   │   │   ├── [63 files]
│   │   ├── trigger.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── @midday/location/          # Geolocation services
│   │   ├── src/
│   │   │   ├── [10 files]
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── @midday/logger/            # Logging utilities
│   │   ├── src/
│   │   │   ├── [1 file]
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── @midday/notifications/     # Push notifications
│   │   ├── src/
│   │   │   ├── [22 files]
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── @midday/supabase/          # Supabase client wrappers
│   │   └── src/
│   │       ├── server.ts          # Server-side client
│   │       ├── client.ts          # Client-side client
│   │       ├── middleware.ts      # Auth middleware
│   │       └── cached-queries.ts  # React cache wrappers
│   ├── @midday/tsconfig/          # Shared TypeScript configs
│   │   ├── base.json
│   │   ├── nextjs.json
│   │   ├── package.json
│   │   ├── react-library.json
│   │   └── tsconfig.json
│   ├── @midday/ui/                # Shared UI components (Shadcn-based)
│   │   ├── postcss.config.js
│   │   ├── package.json
│   │   ├── README.md
│   │   └── src/
│   │       └── [67 files]
│   ├── @midday/utils/             # Shared utilities
│   │   ├── src/
│   │   │   ├── [6 files]
│   │   ├── package.json
│   │   └── tsconfig.json
│
├── .github/
│   └── workflows/                  # GitHub Actions CI/CD
│       ├── beta-dashboard.yaml
│       ├── production-dashboard.yml
│       ├── production-api.yaml
│       ├── production-engine.yml
│       ├── production-website.yml
│       └── preview-*.yaml
│
├── docs/                           # Documentation notes
│   ├── inbox-matching.md
│   ├── Notes/
│   │   ├── codebase-structure.md
│   │   ├── features.md
│   │   └── x-notes.md
│   └── README.md
├── types/                          # Global type definitions
│   ├── images.d.ts
│   └── jsx.d.ts
├── AGENTS.md                       # Agent documentation
├── SECURITY.md                      # Security documentation
├── LICENSE
├── README.md
├── github.png
├── turbo.json                      # Turborepo configuration
├── package.json                    # Root package.json
├── bun.lockb                       # Bun lockfile
├── .env                            # Environment variables (gitignored)
├── .env-template                   # Environment variables template
├── tsconfig.json                   # Root TypeScript config
├── biome.json                      # Biome linter/formatter config
└── .gitignore
```

---

## Technology Stack


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


---

### Database Access
```typescript
// Use workspace imports
import { db } from "@midday/db/client";
import { transactions } from "@midday/db/schema";

// Shared queries
import { getUser } from "@midday/db/queries";
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
