# Business-to-Code Traceability Mapping

Complete flow from business problems to code implementation, showing how business invariants drive the creation of business canonicals, which are implemented through features, enabled by system canonicals, and realized in specific code structures.

## Traceability Table

| Business Invariant | Business Canonical | Feature Implementation | System Canonical Enabled | Code Structure (Folders/Files) |
|-------------------|-------------------|----------------------|--------------------------|--------------------------------|
| **Fragmented financial management** - Business data scattered across multiple platforms, making it difficult to get a unified view | **Financial data flows automatically** - All financial data should sync automatically from sources without manual entry | **Bank Sync** - Automatic transaction synchronization from multiple bank providers | **Idempotency through unique identifiers** - `internal_id` prevents duplicate transactions; **OAuth state management** - Secure token exchange | `packages/jobs/src/tasks/bank/sync/account.ts`, `packages/jobs/src/tasks/bank/transactions/upsert.ts`, `apps/engine/src/providers/*/`, `apps/api/src/trpc/routers/bank-accounts.ts` |
| **Fragmented financial management** - Business data scattered across multiple platforms | **Financial data flows automatically** - All financial data should sync automatically from sources | **Magic Inbox** - Automatic receipt/invoice matching to transactions | **Trustworthiness through idempotency** - Matching algorithm prevents duplicate suggestions; **Bidirectional processing** - Matches both directions | `docs/inbox-matching.md`, `packages/jobs/src/tasks/inbox/*`, `packages/inbox/src/`, `apps/dashboard/src/components/inbox/` |
| **Manual document organization** - Receipts and invoices require manual matching and categorization | **AI-powered automation** - Use AI to automatically process and match documents | **Magic Inbox** - AI-powered semantic matching with embeddings | **Confidence scoring and calibration** - Adaptive thresholds based on user feedback; **Semantic merchant learning** - Pattern recognition for auto-matching | `packages/jobs/src/tasks/inbox/match-transactions-bidirectional.ts`, `packages/inbox/src/matching/`, `packages/documents/src/` |
| **Data security and isolation** - Business financial data must be isolated per team/organization | **Team isolation and multi-tenancy** - All data must be scoped to teams with strict access control | **All Features** - Every feature enforces team scoping | **Team scoping everywhere** - `teamId` required in all queries; **Row Level Security (RLS)** - Database-level access control | `packages/db/src/schema.ts` (RLS policies), `apps/api/src/trpc/middleware/team-permission.ts`, `apps/api/src/rest/middleware/*` |
| **Data consistency** - Users expect to see their changes immediately after making them | **Read-after-write consistency** - Mutations must be immediately visible in subsequent reads | **All Features** - All mutation operations | **Primary read-after-write** - Use primary DB for mutations and recent queries; **Replication lag handling** - Cache-based timestamp tracking | `apps/api/src/trpc/middleware/primary-read-after-write.ts`, `apps/api/src/rest/middleware/primary-read-after-write.ts`, `packages/cache/replication-cache.ts` |
| **Manual transaction entry** - Users manually enter transactions which is error-prone and time-consuming | **Financial data flows automatically** - Transactions sync from bank accounts automatically | **Transaction Management** - Real-time transaction sync and categorization | **Idempotent upserts** - `onConflict: "internal_id"` prevents duplicates; **Background job orchestration** - Async processing pipeline | `packages/jobs/src/tasks/bank/transactions/upsert.ts`, `packages/jobs/src/tasks/transactions/embed-transaction.ts`, `apps/dashboard/src/components/tables/transactions/` |
| **Inefficient invoice creation** - Creating invoices requires repetitive data entry | **Reusability and templates** - Common data should be reusable across invoices | **Invoice Products** - Product catalog with autocomplete and templates | **Shared data models** - Products stored once, referenced many times; **Type-safe queries** - Drizzle ORM ensures data integrity | `packages/db/src/queries/invoice-products.ts`, `apps/api/src/trpc/routers/invoice-products.ts`, `apps/dashboard/src/components/invoice/product-autocomplete.tsx` |
| **Time tracking fragmentation** - Time tracking separate from project management | **Unified business operations** - All business functions in one place | **Time Tracker** - Live project time tracking with productivity insights | **Real-time updates** - Supabase realtime subscriptions; **Team collaboration** - Shared project data | `apps/api/src/trpc/routers/tracker.ts`, `apps/dashboard/src/components/tracker/`, `packages/jobs/src/tasks/tracker/*` |
| **Document storage fragmentation** - Important documents scattered across email, cloud storage, etc. | **Centralized document management** - All business documents in one secure location | **Vault** - Secure document storage with search and organization | **Secure file storage** - Supabase Storage with signed URLs; **Document processing** - OCR and classification pipeline | `apps/dashboard/src/components/vault/`, `packages/jobs/src/tasks/inbox/process-attachment.ts`, `packages/documents/src/` |
| **Customer relationship fragmentation** - Customer data not linked to transactions and invoices | **Unified customer view** - Customer data connected to all related business activities | **Customer Management** - Customer profiles with transaction and invoice history | **Relational data integrity** - Foreign keys ensure data consistency; **Full-text search** - Fast customer lookup | `packages/db/src/queries/customers.ts`, `apps/api/src/trpc/routers/customers.ts`, `apps/dashboard/src/components/tables/customers/` |
| **Manual categorization** - Transactions require manual category assignment | **AI-powered automation** - Use AI to automatically categorize transactions | **Transaction Categorization** - AI-powered category assignment with confidence scoring | **Enrichment pipeline** - Background job for AI categorization; **Confidence thresholds** - Only assign categories with high confidence | `packages/jobs/src/tasks/transactions/enrich.ts`, `packages/jobs/src/utils/enrichment-helpers.ts`, `packages/categories/src/` |
| **Accounting handoff complexity** - Exporting data for accountants is manual and error-prone | **Seamless accountant integration** - Export data in formats accountants expect | **Transaction Export** - CSV/XLSX export with customizable settings and email delivery | **Background job processing** - Async export generation; **Email delivery** - Automated email to accountants | `packages/jobs/src/tasks/transactions/export.ts`, `packages/email/emails/transactions-exported.tsx`, `apps/dashboard/src/components/modals/export-transactions-modal.tsx` |
| **Multi-currency complexity** - Handling transactions in multiple currencies is error-prone | **Automatic currency conversion** - Base currency conversion with exchange rate tracking | **Multi-Currency Support** - Automatic base currency conversion and display | **Exchange rate tracking** - Real-time rate updates; **Base amount calculation** - Consistent currency handling | `packages/db/src/schema.ts` (exchange_rates table), `apps/engine/src/routes/rates/`, `apps/dashboard/src/components/invoice-summary.tsx` |
| **Invoice delivery fragmentation** - Sending invoices requires separate email tools | **Unified invoice workflow** - Create, send, and track invoices in one place | **Invoice Management** - Web-based invoice creation with PDF generation and delivery | **PDF generation** - React-based PDF templates; **Email delivery** - Automated invoice sending | `packages/invoice/src/`, `packages/jobs/src/tasks/invoices/*`, `apps/dashboard/src/components/invoice/` |
| **Integration complexity** - Connecting to third-party services requires complex setup | **OAuth-based integrations** - Standard OAuth flows for secure third-party access | **App Store / Integrations** - OAuth-based integrations (Slack, Gmail, etc.) | **OAuth state management** - Secure token exchange and storage; **Webhook verification** - Secure webhook handling | `packages/app-store/src/`, `apps/dashboard/src/app/api/webhook/*`, `apps/api/src/trpc/routers/integrations.ts` |
| **Real-time collaboration** - Multiple team members need to see updates instantly | **Real-time synchronization** - Changes visible to all team members immediately | **All Features** - Real-time updates across all features | **Supabase Realtime** - Database change subscriptions; **Optimistic updates** - UI updates before server confirmation | `apps/dashboard/src/hooks/use-realtime.ts`, Supabase realtime policies in schema |
| **Data accuracy** - Financial data must be accurate and auditable | **Immutable audit trail** - All changes tracked with timestamps and user attribution | **All Features** - Audit logging for all mutations | **Timestamp tracking** - `created_at`, `updated_at` on all tables; **User attribution** - Track who made changes | `packages/db/src/schema.ts` (timestamp fields), `packages/events/src/` (analytics events) |
| **Performance at scale** - System must handle large datasets efficiently | **Efficient querying and caching** - Optimize database queries and cache frequently accessed data | **All Features** - Query optimization and caching | **Database indexing** - Strategic indexes on frequently queried fields; **Query result caching** - Team and user permission caching | `packages/db/src/schema.ts` (indexes), `packages/cache/*`, `packages/db/src/queries/*` |
| **Error recovery** - System must gracefully handle failures and retries | **Resilient job processing** - Background jobs with retry logic and error handling | **All Background Jobs** - All async processing | **Job retry logic** - Trigger.dev retry configuration; **Error logging** - Structured error logging | `packages/jobs/src/tasks/*/`, Trigger.dev configuration, `packages/logger/src/` |
| **Type safety** - Prevent runtime errors through compile-time type checking | **Type-safe data access** - TypeScript types generated from database schema | **All Features** - Type-safe database access | **Drizzle ORM** - Type-safe queries; **Zod validation** - Runtime schema validation | `packages/db/src/schema.ts`, `packages/db/src/queries/*`, `apps/api/src/schemas/*` |

## Business Invariants Summary

1. **Fragmented financial management** - Business data scattered across multiple platforms
2. **Manual document organization** - Receipts and invoices require manual matching
3. **Data security and isolation** - Business financial data must be isolated per team
4. **Data consistency** - Users expect immediate visibility of changes
5. **Manual transaction entry** - Error-prone and time-consuming
6. **Inefficient invoice creation** - Repetitive data entry
7. **Time tracking fragmentation** - Separate from project management
8. **Document storage fragmentation** - Documents scattered across platforms
9. **Customer relationship fragmentation** - Customer data not linked to business activities
10. **Manual categorization** - Transactions require manual category assignment
11. **Accounting handoff complexity** - Manual export process
12. **Multi-currency complexity** - Error-prone currency handling
13. **Invoice delivery fragmentation** - Requires separate email tools
14. **Integration complexity** - Complex third-party service setup
15. **Real-time collaboration** - Multiple team members need instant updates
16. **Data accuracy** - Financial data must be accurate and auditable
17. **Performance at scale** - System must handle large datasets efficiently
18. **Error recovery** - System must gracefully handle failures
19. **Type safety** - Prevent runtime errors through compile-time checking

## Business Canonicals Summary

1. **Financial data flows automatically** - All financial data syncs automatically from sources
2. **Trustworthiness through idempotency** - Operations are idempotent to prevent duplicates
3. **Team isolation and multi-tenancy** - All data scoped to teams with strict access control
4. **Read-after-write consistency** - Mutations immediately visible in subsequent reads
5. **AI-powered automation** - Use AI to automatically process and match documents
6. **Reusability and templates** - Common data reusable across features
7. **Unified business operations** - All business functions in one place
8. **Centralized document management** - All business documents in one secure location
9. **Unified customer view** - Customer data connected to all related activities
10. **Seamless accountant integration** - Export data in formats accountants expect
11. **Automatic currency conversion** - Base currency conversion with exchange rate tracking
12. **Unified invoice workflow** - Create, send, and track invoices in one place
13. **OAuth-based integrations** - Standard OAuth flows for secure third-party access
14. **Real-time synchronization** - Changes visible to all team members immediately
15. **Immutable audit trail** - All changes tracked with timestamps and user attribution
16. **Efficient querying and caching** - Optimize queries and cache frequently accessed data
17. **Resilient job processing** - Background jobs with retry logic and error handling
18. **Type-safe data access** - TypeScript types generated from database schema

## System Canonicals Summary

1. **Idempotency through unique identifiers** - `internal_id` prevents duplicate transactions
2. **OAuth state management** - Secure token exchange and storage
3. **Team scoping everywhere** - `teamId` required in all queries
4. **Row Level Security (RLS)** - Database-level access control policies
5. **Primary read-after-write** - Use primary DB for mutations and recent queries
6. **Replication lag handling** - Cache-based timestamp tracking
7. **Confidence scoring and calibration** - Adaptive thresholds based on user feedback
8. **Semantic merchant learning** - Pattern recognition for auto-matching
9. **Bidirectional processing** - Matches both directions (transaction→inbox, inbox→transaction)
10. **Background job orchestration** - Async processing pipeline with Trigger.dev
11. **Shared data models** - Products stored once, referenced many times
12. **Type-safe queries** - Drizzle ORM ensures data integrity
13. **Real-time updates** - Supabase realtime subscriptions
14. **Secure file storage** - Supabase Storage with signed URLs
15. **Document processing** - OCR and classification pipeline
16. **Relational data integrity** - Foreign keys ensure data consistency
17. **Full-text search** - Fast customer and transaction lookup
18. **Enrichment pipeline** - Background job for AI categorization
19. **Confidence thresholds** - Only assign categories with high confidence
20. **Background job processing** - Async export generation
21. **Email delivery** - Automated email to accountants
22. **Exchange rate tracking** - Real-time rate updates
23. **Base amount calculation** - Consistent currency handling
24. **PDF generation** - React-based PDF templates
25. **Webhook verification** - Secure webhook handling
26. **Optimistic updates** - UI updates before server confirmation
27. **Timestamp tracking** - `created_at`, `updated_at` on all tables
28. **User attribution** - Track who made changes
29. **Database indexing** - Strategic indexes on frequently queried fields
30. **Query result caching** - Team and user permission caching
31. **Job retry logic** - Trigger.dev retry configuration
32. **Error logging** - Structured error logging
33. **Zod validation** - Runtime schema validation

## Feature-to-Code Mapping

### Magic Inbox
- **Documentation**: `docs/inbox-matching.md`
- **Jobs**: `packages/jobs/src/tasks/inbox/`
- **Business Logic**: `packages/inbox/src/`
- **Document Processing**: `packages/documents/src/`
- **UI Components**: `apps/dashboard/src/components/inbox/`

### Bank Sync
- **Sync Jobs**: `packages/jobs/src/tasks/bank/sync/`
- **Transaction Upsert**: `packages/jobs/src/tasks/bank/transactions/upsert.ts`
- **Providers**: `apps/engine/src/providers/` (gocardless, plaid, teller, enablebanking)
- **API Routes**: `apps/api/src/trpc/routers/bank-accounts.ts`
- **Webhooks**: `apps/dashboard/src/app/api/webhook/*`

### Transactions
- **Embedding**: `packages/jobs/src/tasks/transactions/embed-transaction.ts`
- **Enrichment**: `packages/jobs/src/tasks/transactions/enrich.ts`
- **Export**: `packages/jobs/src/tasks/transactions/export.ts`
- **UI**: `apps/dashboard/src/components/tables/transactions/`
- **Queries**: `packages/db/src/queries/transactions.ts`

### Invoices
- **Business Logic**: `packages/invoice/src/`
- **Products**: `packages/db/src/queries/invoice-products.ts`
- **Jobs**: `packages/jobs/src/tasks/invoices/`
- **UI**: `apps/dashboard/src/components/invoice/`
- **API**: `apps/api/src/trpc/routers/invoices.ts`

### Time Tracker
- **API**: `apps/api/src/trpc/routers/tracker.ts`
- **UI**: `apps/dashboard/src/components/tracker/`
- **Jobs**: `packages/jobs/src/tasks/tracker/`

### Vault
- **UI**: `apps/dashboard/src/components/vault/`
- **Storage**: Supabase Storage integration
- **Processing**: `packages/jobs/src/tasks/inbox/process-attachment.ts`

### Customers
- **Queries**: `packages/db/src/queries/customers.ts`
- **API**: `apps/api/src/trpc/routers/customers.ts`
- **UI**: `apps/dashboard/src/components/tables/customers/`

### Categories
- **Business Logic**: `packages/categories/src/`
- **Queries**: `packages/db/src/queries/transaction-categories.ts`
- **UI**: `apps/dashboard/src/components/tables/categories/`

## System Architecture Patterns

### Multi-Tenancy
- **Schema**: `packages/db/src/schema.ts` - All tables include `teamId`
- **RLS Policies**: Database-level policies in schema definitions
- **Middleware**: `apps/api/src/trpc/middleware/team-permission.ts`
- **Cache**: `packages/cache/team-cache.ts`, `packages/cache/team-permissions-cache.ts`

### Idempotency
- **Transactions**: `onConflict: "internal_id"` in upsert operations
- **Inbox Matching**: Dismissed match prevention, duplicate suggestion filtering
- **Job Processing**: Trigger.dev idempotency keys

### Read-After-Write Consistency
- **Middleware**: `apps/api/src/trpc/middleware/primary-read-after-write.ts`
- **REST Middleware**: `apps/api/src/rest/middleware/primary-read-after-write.ts`
- **Cache**: `packages/cache/replication-cache.ts`

### Background Job Orchestration
- **Framework**: Trigger.dev (`packages/jobs/src/tasks/`)
- **Job Types**: `schemaTask` for type-safe job definitions
- **Orchestration**: Sequential job chaining (e.g., `embed-transaction` → `match-transactions-bidirectional`)

### Type Safety
- **Database**: Drizzle ORM with TypeScript types
- **API**: tRPC for end-to-end type safety
- **Validation**: Zod schemas for runtime validation
- **Server Actions**: `next-safe-action` for type-safe server actions
