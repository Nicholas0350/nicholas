### Overview
- Path: `/` [1](#0-0)

### Transactions
- Path: `/transactions` [2](#0-1)
  - Categories (`/transactions/categories`)
  - Connect bank (`/transactions?step=connect`)
  - Import (`/transactions?step=import&hide=true`)
  - Create new (`/transactions?createTransaction=true`)

### Inbox
- Path: `/inbox` [3](#0-2)
  - Settings (`/inbox/settings`)

### Invoices
- Path: `/invoices` [4](#0-3)
  - Products (`/invoices/products`)
  - Create new (`/invoices?type=create`)

### Tracker
- Path: `/tracker` [5](#0-4)
  - Create new (`/tracker?create=true`)

### Customers
- Path: `/customers` [6](#0-5)
  - Create new (`/customers?createCustomer=true`)

### Vault
- Path: `/vault` [7](#0-6)

### Apps
- Path: `/apps` [8](#0-7)
  - All (`/apps`)
  - Installed (`/apps?tab=installed`)

### Settings
- Path: `/settings` [9](#0-8)
  - General (`/settings`)
  - Billing (`/settings/billing`)
  - Bank Connections (`/settings/accounts`)
  - Members (`/settings/members`)
  - Notifications (`/settings/notifications`)
  - Developer (`/settings/developer`)

### Assistant (AI Chat)
- **Not in sidebar navigation** - Accessed via floating input widget or programmatically
- **Access Points:**
  - Floating input at bottom of pages (`AssistantInput` component)
  - Widget on overview/dashboard pages (`AssistantWidget` with example prompts)
  - Programmatic trigger: `useAssistantStore().setOpen(message)` from any component
- **UI:** Modal dialog (760px max width, 480px height)
- **API Route:** `/api/chat` (Next.js API route handler)
- **Features:**
  - AI-powered financial assistant using OpenAI `gpt-4.1-mini`
  - Streaming responses with word-level chunking
  - Access to 10 financial tools via tRPC:
    - `getRevenue` - Revenue calculations over date ranges
    - `getProfit` - Profit calculations
    - `getSpending` - Spending by category
    - `getBurnRate` - Monthly burn rate + runway calculations
    - `getRunway` - Months of runway remaining
    - `getTaxSummary` - Tax paid/collected by category/type
    - `getTransactions` - Search/filter transactions (by date, category, tags, amount, status, recurring, attachments)
    - `getDocuments` - Find documents/receipts/invoices by name
    - `getInbox` - Find receipts/invoices from inbox by name/amount
    - `getForecast` - Revenue/profit forecasting
  - Example prompts: "What's my burn rate", "Show transactions without receipts", "Find a receipt or invoice", etc.
  - Custom UI components for tool results (tables, charts, lists)
- **State Management:** Zustand store (`useAssistantStore`) for modal visibility and pre-filled messages
- **Client-Side Logic:**
  - Uses `useChat` hook from `@ai-sdk/react` (defaults to `/api/chat`)
  - Auto-submits pre-filled messages from external triggers
  - Streaming with `experimental_throttle: 100`
  - Markdown rendering for assistant responses
  - Tool invocation results rendered as custom React components

## Icon Mapping

Each navigation item has an associated icon from the Icons component: [10](#0-9)

- Overview: `Icons.Overview`
- Transactions: `Icons.Transactions`
- Invoices: `Icons.Invoice`
- Tracker: `Icons.Tracker`
- Customers: `Icons.Customers`
- Vault: `Icons.Vault`
- Settings: `Icons.Settings`
- Apps: `Icons.Apps`
- Inbox: `Icons.Inbox2`

## Navigation Behavior

The sidebar uses a hover-to-expand pattern where it transitions from 70px (collapsed) to 240px (expanded) width . Child items are only visible when both the sidebar is expanded and the parent item is expanded .

## Notes

The sidebar navigation represents the core feature set of Midday, including financial management (transactions, invoicing), document management (vault, inbox), time tracking, customer management, and administrative settings. The query parameter patterns (like `?step=connect`, `?type=create`) indicate that many sub-items trigger modal flows or specific UI states rather than navigating to separate pages.

**Important:** The Assistant (AI Chat) feature is not included in the sidebar navigation but is a core feature accessible through floating input widgets, dashboard widgets, or programmatic triggers. It provides AI-powered financial analysis and data access across all business data.

Wiki pages you might want to explore:
- [Navigation and Layout (midday-ai/midday)](/wiki/midday-ai/midday#2.1.2)
- [Marketing Website (midday-ai/midday)](/wiki/midday-ai/midday#2.2)
