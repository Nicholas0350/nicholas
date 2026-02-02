# Side Navigation Surface Area

Complete mapping of the Midday dashboard side navigation, including main pages, sub-navigation items, filters/tabs, and the data returned by GlobalSheets when items are selected.

---

## Quick Reference Schematic

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          MIDDAY DASHBOARD NAVIGATION                         │
└─────────────────────────────────────────────────────────────────────────────┘

📊 OVERVIEW (/)
   ├─ Charts (selectable): Revenue | Profit | Burn Rate | Expense
   │  └─ Periods: Last 4 weeks | 3 months | 6 months | 12 months | MTD | YTD
   └─ Widgets (carousel):
      • Inbox - Document inbox preview
      • Transactions - Recent transactions list
      • Invoice - Recent invoices list
      • Assistant - AI chat interface
      • Tracker - Time tracking summary
      • Vault - Document storage preview
      • Spending - Category breakdown with chart
      • Account Balance - Bank account balances

📥 INBOX (/inbox)
   ├─ Sub-nav: Settings
   ├─ Filters: done | pending | suggested_match | no_match | processing | analyzing
   └─ Sheet: InboxDetailsSheet → inbox.getById
      └─ Returns: file info, amount, status, matched transaction

💳 TRANSACTIONS (/transactions)
   ├─ Sub-nav: Categories | Connect bank | Import | Create new
   ├─ Actions Menu (+):
   │  • Connect account - Link bank via Plaid/GoCardless
   │  • Import/backfill - Upload CSV/OFX transactions
   │  • Create transaction - Manual entry
   ├─ Filters: completed | uncompleted | archived | excluded | pending
   │           + attachments | recurring | date range | amount | categories | tags | accounts | assignees
   ├─ Column Visibility Toggle:
   │  • Always visible: Date, Description, Amount, Category, Account
   │  • Hidden by default: Assigned, Tags, Method, From/To (Counterparty), Tax Amount
   │  • User preference saved in cookies
   └─ Sheet: TransactionEditSheet → transactions.getById
      └─ Returns: amount, date, merchant, category, status, notes, attachments, tax

🧾 INVOICES (/invoices)
   ├─ Metrics (4 cards):
   │  • Open - draft + scheduled + unpaid count & total
   │  • Overdue - overdue count & total
   │  • Paid - paid count & total
   │  • Payment Score - health score with status (excellent | good | average | poor)
   ├─ Sub-nav: Products | Create new
   ├─ Filters: draft | scheduled | unpaid | overdue | paid | canceled
   │           + date range | customers
   ├─ Column Visibility Toggle:
   │  • Always visible: Invoice no., Status, Due date, Customer, Amount, Issue date
   │  • Hidden by default: VAT Rate, VAT Amount, Tax Rate, Tax Amount, Excl. VAT, Excl. Tax, Internal Note, Sent at
   │  • User preference saved in cookies
   └─ Sheet: InvoiceDetailsSheet → invoice.getById
      └─ Returns:
         • Invoice: id, invoiceNumber, amount, currency, status, vat, tax, discount, subtotal
         • Dates: issueDate, dueDate, paidAt, sentAt, scheduledAt, viewedAt, reminderSentAt
         • Customer: id, name, website, email, customerName, customerDetails
         • Content: lineItems, noteDetails, internalNote, paymentDetails, fromDetails
         • Files: filePath, fileSize, token (for public URL)
         • Template: template, topBlock, bottomBlock
         • Meta: team.name, createdAt, updatedAt, sentTo, scheduledJobId

⏱️  TRACKER (/tracker)
   ├─ Calendar: Weekly/monthly view with time entries
   ├─ Sub-nav: Create new (+ button)
   ├─ Filters: status | date range | customers | tags | search
   ├─ Sheets:
   │  • TrackerCreateSheet (?create=true) - Create new project form
   │  • TrackerUpdateSheet (?projectId=...) → trackerProjects.getById
   │    └─ Returns: project name, rate, currency, estimate, status, customer, tags, billable
   └─ Projects Table → trackerProjects.get (infinite scroll)
      └─ Returns per project:
         • Project: id, name, description, status, estimate, rate, currency
         • Customer: id, name, website
         • Aggregates: totalDuration (computed), totalAmount (computed)
         • Meta: teamId, createdAt

👥 CUSTOMERS (/customers)
   ├─ Metrics (4 cards):
   │  • Most Active Client - name & invoice count
   │  • Inactive Clients - count of clients with no recent invoices
   │  • Top Revenue Client - name & total revenue
   │  • New Customers This Month - count
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
│                          TEAM CONTEXT & SWITCHING                            │
└─────────────────────────────────────────────────────────────────────────────┘

🏢 TEAMS (Not in sidebar - accessed via bottom dropdown & separate routes)
   ├─ Team Dropdown (bottom of sidebar):
   │  └─ Switch between teams user belongs to
   ├─ Routes (outside main nav):
   │  • /teams - List/select teams
   │  • /teams/create - Create new team
   │  • /account/teams - Manage team memberships
   └─ Context: All dashboard data scoped to currently selected team
      └─ Team switch = complete workspace context switch

┌─────────────────────────────────────────────────────────────────────────────┐
│                          GLOBALSHEETS SYSTEM                                 │
└─────────────────────────────────────────────────────────────────────────────┘

**What it is**: A slide-out panel system that displays detailed views/forms without
full page navigation - URL params (e.g., ?transactionId=123) control which sheet
opens, preserving browser history and shareability while keeping the user on the
current page.

All sheets mounted globally in layout → controlled by URL params → fetch via tRPC

Available Sheets (16 total):
  • Transactions: TransactionSheet, TransactionEditSheet, TransactionCreateSheet
  • Invoices: InvoiceSheet, InvoiceDetailsSheet
  • Inbox: InboxDetailsSheet, DocumentSheet
  • Customers: CustomerEditSheet, CustomerCreateSheet
  • Tracker: TrackerUpdateSheet, TrackerCreateSheet,

  TrackerScheduleSheet
  • Categories: CategoryEditSheet, CategoryCreateSheet
  • Products: ProductEditSheet, ProductCreateSheet,

Global Modals (also mounted globally, but centered overlays vs slide-out sheets):
  • AssistantModal - AI chat interface
  • SearchModal - Global search (Cmd+K)
  • ImportModal - CSV/OFX transaction import
  • ConnectTransactionsModal - Bank connection flow
  • SelectBankAccountsModal - Account selection after bank connection
  • TrialEndedModal - Subscription prompt

Flow: Click item → URL param added → Sheet opens → tRPC fetch → Display/Edit
```

---
