# Upstream Feature Updates

## 2025-10-06

### 1. Export Settings & Transaction Export System
Enhanced transaction export capabilities with customizable settings and email delivery. Users can now export transactions in CSV or XLSX formats with configurable delimiters and optional email delivery to accountants.

**Key Files:**
- `apps/dashboard/src/components/modals/export-transactions-modal.tsx` - New modal for export configuration
- `packages/jobs/src/tasks/transactions/export.ts` - Export job processing
- `packages/email/emails/transactions-exported.tsx` - Email template for export notifications
- `apps/dashboard/src/actions/export-transactions-action.ts` - Server action for initiating export
- `packages/notifications/src/types/transactions-exported.ts` - Type definitions for export notifications

### 2. Enable Banking Integration
Complete integration with Enable Banking provider for European bank connections. Includes authentication, account retrieval, balance checking, and transaction fetching with JWT-based security.

**Key Files:**
- `apps/engine/src/providers/enablebanking/enablebanking-api.ts` - Main API client implementation (+201 lines)
- `apps/engine/src/providers/enablebanking/types.ts` - TypeScript types for Enable Banking
- `apps/engine/src/providers/enablebanking/transform.ts` - Data transformation utilities

### 3. Invoice Products Management System
Full-featured product catalog for invoices with autocomplete, reusable templates, and usage tracking. Products can be created, edited, and reused across invoices with automatic price and description population.

**Key Files:**
- `packages/db/src/queries/invoice-products.ts` - Database queries for products (+371 lines)
- `apps/api/src/trpc/routers/invoice-products.ts` - tRPC router for product operations (+126 lines)
- `apps/dashboard/src/components/forms/product-form.tsx` - Product creation/editing form
- `apps/dashboard/src/components/invoice/product-autocomplete.tsx` - Smart autocomplete component (+418 lines)
- `apps/dashboard/src/components/invoice/product-aware-amount-input.tsx` - Price input with product awareness
- `apps/dashboard/src/components/invoice/product-aware-unit-input.tsx` - Unit input with product awareness
- `apps/dashboard/src/components/tables/products/*` - Product listing table components
- `apps/dashboard/src/app/[locale]/(app)/(sidebar)/invoices/products/page.tsx` - Products management page
- `packages/db/src/schema.ts` - Product schema definition (+97 lines)
- `apps/dashboard/src/hooks/use-product-params.ts` - URL parameter management for products

### 4. Category Management Refactor
Modernized category management from modals to sheets with improved forms, parent category selection, and better UX. Includes support for tax rates, tax types, and category color coding.

**Key Files:**
- `apps/dashboard/src/components/sheets/category-create-sheet.tsx` - New sheet component for creation
- `apps/dashboard/src/components/sheets/category-edit-sheet.tsx` - New sheet component for editing (+120 lines)
- `apps/dashboard/src/components/forms/category-form.tsx` - Unified category form (+282 lines)
- `apps/dashboard/src/components/forms/category-edit-form.tsx` - Category edit form (+331 lines)
- `apps/dashboard/src/components/select-parent-category.tsx` - Parent category selector (+118 lines)
- `apps/dashboard/src/hooks/use-category-params.ts` - URL parameter management
- `apps/dashboard/src/components/tables/categories/*` - Updated category table components
- `packages/db/src/queries/transaction-categories.ts` - Refactored category queries
- **Removed:** `create-categories-modal.tsx`, `create-sub-category-modal.tsx`, `edit-category-modal.tsx`

### 5. Invoice Summary & Multi-Currency Support
Enhanced invoice summary calculations with multi-currency support. Automatically calculates totals across different currencies and displays them separately in the invoice summary.

**Key Files:**
- `apps/dashboard/src/components/invoice-summary.tsx` - Enhanced summary component
- `apps/dashboard/src/components/invoice/form.tsx` - Updated invoice form
- `apps/dashboard/src/components/invoice/submit-button.tsx` - Enhanced submit handling (+81 lines)
- `packages/invoice/src/utils/extract-text.ts` - Text extraction utilities (+46 lines)

### 6. Bulk Invoice Operations
Added ability to download multiple invoices at once and perform bulk actions on invoice lists. Includes bottom bar for bulk selections.

**Key Files:**
- `apps/dashboard/src/components/tables/invoices/bottom-bar.tsx` - Bulk action bottom bar (+108 lines)
- `apps/dashboard/src/components/tables/invoices/*` - Updated invoice table components
- `packages/db/src/queries/invoices.ts` - Enhanced invoice queries

### 7. Vault File Deletion Safety
Warning dialog when deleting vault files to prevent accidental deletions. Provides clear confirmation before removing important documents.

**Key Files:**
- `apps/dashboard/src/components/vault/delete-vault-file-dialog.tsx` - Confirmation dialog (+136 lines)
- `apps/dashboard/src/components/vault/vault-item-actions.tsx` - Updated actions component

### 8. Teams API Endpoint
New REST API endpoint for team management operations. Provides programmatic access to team data and settings.

**Key Files:**
- `apps/api/src/rest/routers/teams.ts` - Teams REST endpoints (+21 lines)
- `apps/api/src/schemas/team.ts` - Team schema definitions (+12 lines)
- `packages/db/src/queries/teams.ts` - Enhanced team queries

### 9. Realtime Data Synchronization Fixes
Multiple fixes to improve realtime data updates across the application. Better handling of live updates for transactions, invoices, and other entities.

**Key Files:**
- `apps/dashboard/src/hooks/use-realtime.ts` - Realtime hook improvements
- Multiple components updated for better realtime handling

### 10. Inbox Improvements
Updated inbox UI with improved get-started experience and enhanced search functionality. Better document processing prompts and workflow guidance.

**Key Files:**
- `apps/dashboard/src/components/inbox/inbox-get-started.tsx` - Updated onboarding UI
- `apps/dashboard/src/components/inbox/inbox-search.tsx` - Enhanced search
- `apps/dashboard/src/components/inbox/inbox-ordering.tsx` - Improved ordering
- `packages/documents/src/prompt.ts` - Updated processing prompts (+96 lines)
- `packages/inbox/src/schema.ts` - Inbox schema updates

### 11. Global Sheets Management
Centralized sheet management system for better state handling and cleaner component architecture.

**Key Files:**
- `apps/dashboard/src/components/sheets/global-sheets.tsx` - Global sheets coordinator
- `apps/dashboard/src/components/sheets/product-create-sheet.tsx` - Product creation sheet
- `apps/dashboard/src/components/sheets/product-edit-sheet.tsx` - Product editing sheet

### 12. Search Query Improvements
Enhanced search functionality across the application with better query handling and filtering capabilities.

**Key Files:**
- `apps/api/src/utils/search.ts` - Improved search utilities
- `packages/db/src/utils/search-query.ts` - Database search query builders

---

**Total Changes:** 123 files changed, 5483 insertions(+), 1551 deletions(-)

**Major PRs:**
- #619: Export settings
- #618: Enable Banking integration
- #617: Invoice fixes v3
