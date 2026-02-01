# Side Navigation Surface Area

Complete mapping of the Midday dashboard side navigation, including main pages, sub-navigation items, filters/tabs, and the data returned by GlobalSheets when items are selected.

---

## Quick Reference Schematic

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          MIDDAY DASHBOARD NAVIGATION                         │
└─────────────────────────────────────────────────────────────────────────────┘

📊 OVERVIEW (/)
   └─ Dashboard widgets & metrics
   └─ No sheets

📥 INBOX (/inbox)
   ├─ Sub-nav: Settings
   ├─ Filters: done | pending | suggested_match | no_match | processing | analyzing
   └─ Sheet: InboxDetailsSheet → inbox.getById
      └─ Returns: file info, amount, status, matched transaction

💳 TRANSACTIONS (/transactions)
   ├─ Sub-nav: Categories | Connect bank | Import | Create new
   ├─ Filters: completed | uncompleted | archived | excluded
   │           + attachments | recurring | date range | amount | categories | tags | accounts | assignees
   └─ Sheet: TransactionSheet → transactions.getById
      └─ Returns: amount, date, merchant, category, status, notes, attachments, tax

🧾 INVOICES (/invoices)
   ├─ Sub-nav: Products | Create new
   ├─ Filters: draft | scheduled | unpaid | overdue | paid | canceled
   │           + date range | customers
   └─ Sheet: InvoiceDetailsSheet → invoice.getById
      └─ Returns: invoice #, customer, line items, amounts, status, dates, template

⏱️  TRACKER (/tracker)
   ├─ Sub-nav: Create new
   ├─ Filters: date range | search
   └─ Sheet: TrackerUpdateSheet → trackerProjects.getById
      └─ Returns: project name, rate, currency, estimate, status

👥 CUSTOMERS (/customers)
   ├─ Sub-nav: Create new
   ├─ Filters: search | sort
   └─ Sheet: CustomerEditSheet → customers.getById
      └─ Returns: name, email, phone, address, website, VAT, notes

🗄️  VAULT (/vault)
   └─ Sheet: DocumentSheet
      └─ Returns: file preview & metadata

🔌 APPS (/apps)
   ├─ Sub-nav: All | Installed
   └─ No sheet (uses UnifiedAppComponent)

⚙️  SETTINGS (/settings)
   ├─ Sub-nav: General | Billing | Bank Connections | Members | Notifications | Developer
   └─ No sheet (full-page views)

┌─────────────────────────────────────────────────────────────────────────────┐
│                          GLOBALSHEETS SYSTEM                                 │
└─────────────────────────────────────────────────────────────────────────────┘

All sheets mounted globally in layout → controlled by URL params → fetch via tRPC

Available Sheets:
  • TransactionSheet, TransactionEditSheet, TransactionCreateSheet
  • InvoiceSheet, InvoiceDetailsSheet
  • InboxDetailsSheet, DocumentSheet
  • CustomerEditSheet, CustomerCreateSheet
  • TrackerUpdateSheet, TrackerCreateSheet, TrackerScheduleSheet
  • CategoryEditSheet, CategoryCreateSheet
  • ProductEditSheet, ProductCreateSheet

Flow: Click item → URL param added → Sheet opens → tRPC fetch → Display/Edit
```

---

## Navigation Structure

### 1. **Overview** (`/`)

**Main Page:**
- Dashboard overview with widgets and metrics
- No sub-navigation items
- No GlobalSheet interactions

---

### 2. **Inbox** (`/inbox`)

**Main Page:**
- Document inbox with file upload and processing
- List view of uploaded documents (receipts, invoices, etc.)

**Sub-Navigation:**
- Settings (`/inbox/settings`) - Inbox configuration

**Status Filters:**
- `done` - Matched documents
- `pending` - Awaiting match
- `suggested_match` - Potential match found
- `no_match` - No match found
- `processing` - Being processed
- `analyzing` - Being analyzed

**GlobalSheet: InboxDetailsSheet**

Opens when clicking an inbox item. Returns via `inbox.getById`:

```typescript
{
  id: string                    // Inbox item ID (UUID)
  fileName: string              // Original filename
  filePath: string[]            // Storage path segments
  displayName: string           // Display name
  amount: number | null         // Detected/entered amount
  currency: string | null       // Currency code (USD, EUR, etc.)
  contentType: string | null    // MIME type (application/pdf, image/jpeg)
  date: string | null           // Document date (ISO 8601)
  status: string                // Status (pending, done, suggested_match, no_match, processing, analyzing)
  createdAt: string             // Upload timestamp (ISO 8601)
  website: string | null        // Associated website
  description: string | null    // Description/notes
  transaction: {                // Matched transaction (if matched)
    id: string
    amount: number
    currency: string
    name: string
    date: string
  } | null
}
```

---

### 3. **Transactions** (`/transactions`)

**Main Page:**
- Transaction list with data table
- Search and filter interface
- Bulk actions

**Sub-Navigation:**
- Categories (`/transactions/categories`) - Manage transaction categories
- Connect bank (`/transactions?step=connect`) - Bank connection flow
- Import (`/transactions?step=import&hide=true`) - Import transactions
- Create new (`/transactions?createTransaction=true`) - Create transaction sheet

**Status Filters:**
- `completed` - Completed transactions
- `uncompleted` - Pending transactions
- `archived` - Archived transactions
- `excluded` - Excluded from reports

**Attachment Filters:**
- `include` - With attachments
- `exclude` - Without attachments

**Recurring Filters:**
- `all` - All transactions
- `weekly` - Weekly recurring
- `monthly` - Monthly recurring
- `annually` - Annual recurring

**Manual Filters:**
- Manual vs. automatic transactions

**Additional Filters:**
- Date range (start/end)
- Amount range
- Categories (multi-select)
- Tags (multi-select)
- Bank accounts (multi-select)
- Assignees (multi-select)

**GlobalSheet: TransactionSheet**

Opens when clicking a transaction. Returns via `transactions.getById`:

```typescript
{
  id: string                    // Transaction ID (UUID)
  date: string                  // Transaction date (ISO 8601)
  amount: number                // Transaction amount
  currency: string              // Currency code (USD, EUR, etc.)
  name: string                  // Merchant/payee name
  description: string | null    // Transaction description
  category: {                   // Category object
    id: string
    name: string
    slug: string
    color: string
  } | null
  status: string                // Status (pending, completed, archived, posted, excluded)
  method: string | null         // Payment method
  note: string | null           // User notes
  recurring: string | null      // Recurring frequency (weekly, monthly, annually, irregular)
  bankAccount: {                // Bank account details
    id: string
    name: string
    currency: string
  }
  assignedUser: {               // Assigned team member
    id: string
    fullName: string
    avatarUrl: string
  } | null
  tags: Array<{                 // Tags
    id: string
    name: string
    color: string
  }>
  attachments: Array<{          // Attached files
    id: string
    name: string
    path: string[]
    size: number
    type: string
  }>
  taxAmount: number | null      // Tax amount
  taxType: string | null        // Tax type
  balance: number | null        // Account balance after transaction
}
```

---

### 4. **Invoices** (`/invoices`)

**Main Page:**
- Invoice list with data table
- Summary cards (Open, Overdue, Paid, Payment Score)
- Search and filter interface

**Sub-Navigation:**
- Products (`/invoices/products`) - Manage invoice products/line items
- Create new (`/invoices?type=create`) - Create invoice sheet

**Status Filters:**
- `draft` - Draft invoices
- `scheduled` - Scheduled to send
- `unpaid` - Sent but unpaid
- `overdue` - Past due date
- `paid` - Fully paid
- `canceled` - Canceled invoices

**Additional Filters:**
- Date range (start/end)
- Customers (multi-select)
- Search by invoice number or customer name

**GlobalSheet: InvoiceDetailsSheet**

Opens when clicking an invoice. Returns via `invoice.getById`:

```typescript
{
  id: string                    // Invoice ID (UUID)
  invoiceNumber: string         // Invoice number
  customer: {                   // Customer object
    id: string
    name: string
    email: string
    phone: string | null
    website: string | null
    addressLine1: string | null
    addressLine2: string | null
    city: string | null
    state: string | null
    zip: string | null
    country: string | null
  } | null
  customerName: string | null   // Customer name override
  amount: number                // Total invoice amount
  currency: string              // Currency code
  status: string                // Status (draft, unpaid, paid, overdue, canceled, scheduled)
  vat: number | null            // VAT amount
  tax: number | null            // Tax amount
  issueDate: string             // Issue date (ISO 8601)
  dueDate: string               // Due date (ISO 8601)
  paidAt: string | null         // Payment date (ISO 8601)
  sentAt: string | null         // When invoice was sent (ISO 8601)
  sentTo: string[] | null       // Email addresses sent to
  scheduledAt: string | null    // Scheduled send date (ISO 8601)
  lineItems: Array<{            // Line items
    id: string
    name: string
    quantity: number
    price: number
    unit: string | null
    vat: number | null
    tax: number | null
    productId: string | null
  }>
  template: {                   // Invoice template settings
    logoUrl: string | null
    currency: string
    dateFormat: string
    includeVat: boolean
    includeTax: boolean
    includeDiscount: boolean
    includeDecimals: boolean
    size: "a4" | "letter"
    // ... other template settings
  }
  token: string                 // Public access token
  internalNote: string | null   // Internal notes
  noteDetails: object | null    // Footer notes (TipTap JSON)
  paymentDetails: object | null // Payment details (TipTap JSON)
  fromDetails: object | null    // Sender details (TipTap JSON)
  updatedAt: string             // Last update timestamp (ISO 8601)
}
```

---

### 5. **Tracker** (`/tracker`)

**Main Page:**
- Time tracking calendar view
- Projects list with data table
- Search and filter interface

**Sub-Navigation:**
- Create new (`/tracker?create=true`) - Create project sheet

**Filters:**
- Date range
- Project search
- Sort by various fields

**GlobalSheet: TrackerUpdateSheet**

Opens when clicking a time tracking project. Returns via `trackerProjects.getById`:

```typescript
{
  id: string                    // Project ID (UUID)
  name: string                  // Project name
  description: string | null    // Project description
  status: string                // Project status
  rate: number | null           // Hourly rate
  currency: string              // Currency code
  estimate: number | null       // Estimated hours
  createdAt: string             // Creation timestamp (ISO 8601)
  // Project-specific settings and time entries
}
```

---

### 6. **Customers** (`/customers`)

**Main Page:**
- Customer list with data table
- Summary cards (Most Active, Inactive, Top Revenue, New This Month)
- Search and filter interface

**Sub-Navigation:**
- Create new (`/customers?createCustomer=true`) - Create customer sheet

**Filters:**
- Search by name, email
- Sort by various fields

**GlobalSheet: CustomerEditSheet**

Opens when clicking a customer. Returns via `customers.getById`:

```typescript
{
  id: string                    // Customer ID (UUID)
  name: string                  // Customer/organization name
  email: string                 // Primary email
  billingEmail: string | null   // Billing email
  phone: string | null          // Phone number
  website: string | null        // Website URL
  country: string | null        // Country name
  addressLine1: string | null   // Address line 1
  addressLine2: string | null   // Address line 2
  city: string | null           // City
  state: string | null          // State/province
  zip: string | null            // ZIP/postal code
  vatNumber: string | null      // VAT/tax number
  note: string | null           // Customer notes
  createdAt: string             // Creation timestamp (ISO 8601)
}
```

---

### 7. **Vault** (`/vault`)

**Main Page:**
- File storage and document management
- No sub-navigation items
- No GlobalSheet interactions (uses DocumentSheet for file preview)

**GlobalSheet: DocumentSheet**

Opens when clicking a vault document. Returns via document path/ID:

```typescript
{
  filePath: string[]            // Storage path segments
  documentId: string | null     // Document ID (if applicable)
  // File preview and metadata
}
```

---

### 8. **Apps** (`/apps`)

**Main Page:**
- App marketplace and integrations
- Installed apps management

**Sub-Navigation:**
- All (`/apps`) - All available apps
- Installed (`/apps?tab=installed`) - Installed apps only

**No GlobalSheet** - Uses UnifiedAppComponent for app details

---

### 9. **Settings** (`/settings`)

**Main Page:**
- General settings

**Sub-Navigation:**
- General (`/settings`) - General team settings
- Billing (`/settings/billing`) - Billing and subscription
- Bank Connections (`/settings/accounts`) - Bank account connections
- Members (`/settings/members`) - Team member management
- Notifications (`/settings/notifications`) - Notification preferences
- Developer (`/settings/developer`) - API keys and webhooks

**No GlobalSheet** - Settings pages are full-page views

---

## GlobalSheets System

All GlobalSheets are mounted globally in the `GlobalSheets` component at the layout level (`apps/dashboard/src/app/[locale]/(app)/(sidebar)/layout.tsx`).

**Available GlobalSheets:**

1. **TransactionSheet** - Transaction details and editing
2. **TransactionEditSheet** - Transaction editing form
3. **TransactionCreateSheet** - Create new transaction
4. **InvoiceSheet** - Invoice creation/editing
5. **InvoiceDetailsSheet** - Invoice details view
6. **InboxDetailsSheet** - Inbox item details
7. **DocumentSheet** - Document preview
8. **CustomerEditSheet** - Customer editing
9. **CustomerCreateSheet** - Create new customer
10. **TrackerUpdateSheet** - Edit time tracking project
11. **TrackerCreateSheet** - Create new project
12. **TrackerScheduleSheet** - Schedule time entries
13. **CategoryEditSheet** - Edit transaction category
14. **CategoryCreateSheet** - Create new category
15. **ProductEditSheet** - Edit invoice product
16. **ProductCreateSheet** - Create new product

**How GlobalSheets Work:**

- Each sheet is controlled by URL search parameters
- When a user clicks an item, the URL updates with the item ID
- The corresponding GlobalSheet reads the URL param and opens
- The sheet fetches data via tRPC query using the ID
- User can edit/view the item within the sheet
- Closing the sheet removes the URL param

**Example Flow:**

1. User clicks transaction in list
2. URL updates: `/transactions?transactionId=abc-123`
3. `TransactionSheet` detects `transactionId` param
4. Sheet opens and fetches via `transactions.getById({ id: "abc-123" })`
5. User views/edits transaction details
6. User closes sheet → URL param removed → sheet closes

---

## Summary

The Midday dashboard uses a consistent pattern across all sections:

1. **Main page** - List view with data table
2. **Sub-navigation** - Quick actions and related pages
3. **Filters/tabs** - Refine list view
4. **GlobalSheets** - Detail view/editing when clicking items

All data fetching is done via tRPC queries, with optimistic updates and cache invalidation for a smooth user experience.
