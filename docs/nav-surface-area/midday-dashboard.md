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
   ├─ Filters: completed | uncompleted | archived | excluded | pending
   │           + attachments | recurring | date range | amount | categories | tags | accounts | assignees
   └─ Sheet: TransactionSheet → transactions.getById
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
   └─ Sheet: InvoiceDetailsSheet → invoice.getById
      └─ Returns: invoice #, customer, line items, amounts, status, dates, template

⏱️  TRACKER (/tracker)
   ├─ Calendar: Weekly/monthly view with time entries
   ├─ Sub-nav: Create new
   ├─ Filters: date range | search
   └─ Sheet: TrackerUpdateSheet → trackerProjects.getById
      └─ Returns: project name, rate, currency, estimate, status

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
