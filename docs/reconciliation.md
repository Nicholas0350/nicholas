# Midday System Reconciliation

This document reconciles the navigation structure, non-navigation features, and codebase architecture to provide a comprehensive understanding of how Midday hangs together as a system.

**Related Documents:**
- [Navigation Structure](./nav.md) - Sidebar navigation items and routes
- [Features Not in Navigation](./new-findings.md) - Global features, widgets, and contextual overlays

---

## System Architecture Overview

### Monorepo Structure
Midday is a **Turborepo monorepo** with the following structure:

```
midday/
├── apps/
│   ├── api/              # tRPC/Hono API server (Bun, port 3003)
│   ├── dashboard/        # Next.js dashboard (port 3000) - Main app
│   ├── engine/           # Cloudflare Workers API (port 3002) - Bank integrations
│   ├── website/          # Marketing website (Next.js)
│   ├── desktop/          # Tauri desktop app
│   └── docs/            # Documentation site
│
└── packages/            # Shared libraries
    ├── @midday/db/      # Database schema & Drizzle ORM
    ├── @midday/supabase/ # Supabase client wrappers
    ├── @midday/ui/       # Shared UI components (Shadcn)
    ├── @midday/jobs/     # Trigger.dev background jobs
    ├── @midday/engine-client/ # Engine API client
    └── [30+ other packages]
```

### Technology Stack
- **Runtime:** Bun (API), Node.js (Dashboard), Cloudflare Workers (Engine)
- **Frontend:** Next.js 14+ (App Router), React, TypeScript
- **Backend:** tRPC, Hono, Supabase (PostgreSQL, Auth, Storage, Realtime)
- **State:** Zustand, React Query (TanStack Query)
- **UI:** Shadcn UI, Tailwind CSS
- **Database:** Drizzle ORM, Supabase PostgreSQL

---

## Application Layout & Routing

### Route Structure
The dashboard uses Next.js App Router with internationalization:

```
app/[locale]/
├── (app)/                    # Authenticated routes
│   ├── (sidebar)/           # Routes with sidebar layout
│   │   ├── page.tsx         # Overview (/)
│   │   ├── transactions/    # Transactions routes
│   │   ├── invoices/        # Invoice routes
│   │   ├── tracker/         # Time tracking routes
│   │   ├── customers/       # Customer routes
│   │   ├── vault/           # Document vault routes
│   │   ├── inbox/           # Inbox routes
│   │   ├── apps/            # App integrations
│   │   └── settings/        # Settings routes (with sub-menu)
│   ├── (public)/            # Public routes (login, etc.)
│   └── desktop/             # Desktop-specific routes
└── api/                     # API routes (Next.js)
    └── chat/                # AI Assistant API endpoint
```

### Layout Hierarchy

**Root Layout** (`app/[locale]/layout.tsx`):
- HTML structure, fonts, providers
- Desktop header detection
- Analytics, Toaster

**Sidebar Layout** (`app/[locale]/(app)/(sidebar)/layout.tsx`):
- **Sidebar** component (70px collapsed, 240px expanded on hover)
- **Header** component (top navigation bar)
- **GlobalSheets** - All contextual side panels
- **GlobalTimerProvider** - Timer state management
- **HydrateClient** - React Query hydration
- Authentication checks and redirects

**Settings Layout** (`app/[locale]/(app)/(sidebar)/settings/layout.tsx`):
- Secondary menu for settings sub-sections
- Max-width container (800px)

---

## Navigation Structure → Implementation Mapping

### Sidebar Navigation (`MainMenu` Component)

| Nav Item | Route | Component | Icon | Children |
|----------|-------|-----------|------|----------|
| Overview | `/` | `page.tsx` | `Icons.Overview` | None |
| Transactions | `/transactions` | `transactions/page.tsx` | `Icons.Transactions` | Categories, Connect, Import, Create |
| Inbox | `/inbox` | `inbox/page.tsx` | `Icons.Inbox2` | Settings |
| Invoices | `/invoices` | `invoices/page.tsx` | `Icons.Invoice` | Products, Create |
| Tracker | `/tracker` | `tracker/page.tsx` | `Icons.Tracker` | Create |
| Customers | `/customers` | `customers/page.tsx` | `Icons.Customers` | Create |
| Vault | `/vault` | `vault/page.tsx` | `Icons.Vault` | None |
| Apps | `/apps` | `apps/page.tsx` | `Icons.Apps` | All, Installed |
| Settings | `/settings` | `settings/page.tsx` | `Icons.Settings` | General, Billing, Accounts, Members, Notifications, Developer |

**Navigation Behavior:**
- Hover-to-expand: 70px → 240px width transition
- Children visible only when: sidebar expanded AND parent item expanded
- Client-side state: `useState` for expanded items
- File: `apps/dashboard/src/components/main-menu.tsx`

**Query Parameter Patterns (Client-Side Logic):**
Many nav children use query parameters to trigger modals/sheets rather than navigate:
- `?step=connect` → Opens Connect Transactions Modal
- `?createTransaction=true` → Opens Transaction Create Sheet
- `?type=create` → Opens Invoice Create Sheet
- `?create=true` → Opens Tracker Create Sheet
- `?createCustomer=true` → Opens Customer Create Sheet
- `?tab=installed` → Sets Apps tab state

---

## Non-Navigation Features → Access Patterns

### Global Features (Always Available)

#### 1. Global Search
- **Trigger:** `Cmd+K` / `Meta+K` keyboard shortcut
- **Component:** `SearchModal` → `Search` component
- **State:** `useSearchStore` (Zustand)
- **Location:** Modal overlay (740px × 535px)
- **Features:** Unified search across all entities
- **File:** `apps/dashboard/src/components/search/search-modal.tsx`

#### 2. Notification Center
- **Trigger:** Bell icon in Header
- **Component:** `NotificationCenter` (Popover)
- **Location:** Header top-right
- **Features:** Inbox/Archive tabs, unread indicators
- **File:** `apps/dashboard/src/components/notification-center/notification-center.tsx`

#### 3. Team Switcher
- **Trigger:** Team avatar at bottom of Sidebar
- **Component:** `TeamDropdown`
- **Features:** Multi-team support, animated stack
- **File:** `apps/dashboard/src/components/team-dropdown.tsx`

#### 4. Global Timer Indicator
- **Trigger:** Automatic (when timer running)
- **Component:** `GlobalTimerIndicator`
- **Location:** Header (when active)
- **Features:** Updates document title, real-time elapsed time
- **File:** `apps/dashboard/src/components/global-timer-indicator.tsx`
- **Hook:** `apps/dashboard/src/hooks/use-global-timer-status.ts`

#### 5. Assistant (AI Chat)
- **Triggers:**
  - Floating input at bottom of pages (`AssistantInput`)
  - Widget on Overview page (`AssistantWidget`)
  - Programmatic: `useAssistantStore().setOpen(message)`
- **Component:** `AssistantModal` → `Chat`
- **API:** `/api/chat` (Next.js API route)
- **State:** `useAssistantStore` (Zustand)
- **AI:** OpenAI `gpt-4.1-mini` with 10 financial tools
- **Files:**
  - `apps/dashboard/src/components/assistant/assistant-modal.tsx`
  - `apps/dashboard/src/components/chat/index.tsx`
  - `apps/dashboard/src/app/api/chat/route.ts`

### Dashboard Widgets (Overview Page Only)

**Location:** Overview page (`/`) in horizontal carousel
**Container:** `apps/dashboard/src/components/widgets/index.tsx`

| Widget | Component | Data Source |
|--------|-----------|-------------|
| Assistant | `AssistantWidget` | Chat examples, assistant store |
| Spending | `SpendingWidget` | `trpc.reports.spending` |
| Invoice | `InvoiceWidget` | `trpc.invoice.get` |
| Transactions | `TransactionsWidget` | `trpc.transactions.get` |
| Tracker | `TrackerWidget` | `trpc.trackerEntries.get` |
| Inbox | `InboxWidget` | `trpc.inbox.get` |
| Account Balance | `AccountBalanceWidget` | `trpc.bankAccounts.balances` |
| Vault | `VaultWidget` | `trpc.documents.get` |

### Financial Charts (Overview Page)

**Location:** Top section of Overview page
**Component:** `Charts` with `ChartSelectors`
**Data Sources:**
- Revenue: `trpc.reports.revenue`
- Profit: `trpc.reports.profit`
- Expense: `trpc.reports.expense`
- Burn Rate: `trpc.reports.burnRate`
- Runway: `trpc.reports.runway`

### Contextual Overlays (Global Sheets)

**Container:** `GlobalSheets` component in sidebar layout
**Registration:** All sheets/modals registered here for global availability

#### Sheets (Side Panels)
- Transaction: View, Create, Edit
- Invoice: Create/Edit, Details
- Customer: Create, Edit
- Tracker: Create, Update, Schedule
- Category: Create, Edit
- Product: Create, Edit
- Document: View details
- Inbox: View details

#### Modals (Dialog Overlays)
- Assistant Modal
- Search Modal
- Connect Transactions Modal
- Import Modal
- Select Bank Accounts Modal
- Trial Ended Modal
- Overview Modal (onboarding)

**File:** `apps/dashboard/src/components/sheets/global-sheets.tsx`

---

## Data Flow & State Management

### State Management Architecture

#### 1. Server State (React Query / TanStack Query)
- **Primary:** tRPC queries via `trpc` client
- **Hydration:** `HydrateClient` component for SSR
- **Prefetching:** `batchPrefetch` for parallel queries
- **Client:** `apps/dashboard/src/trpc/client.tsx`
- **Server:** `apps/dashboard/src/trpc/server.tsx`

#### 2. Client State (Zustand)
Global client state stores:
- `useAssistantStore` - Assistant modal state
- `useSearchStore` - Search modal state
- `useTransactionsStore` - Transaction selection state
- **Location:** `apps/dashboard/src/store/`

#### 3. Component State (React)
- Local UI state: `useState`, `useReducer`
- Form state: React Hook Form
- Timer state: `useGlobalTimerStatus` hook

### API Architecture

#### tRPC Layer
- **Server:** `apps/api/src/trpc/routers/` (34 router files)
- **Client:** `apps/dashboard/src/trpc/client.tsx`
- **Authentication:** Supabase session tokens in headers
- **Features:**
  - Type-safe API calls
  - Automatic request batching
  - Server-side prefetching
  - React Query integration

#### REST Endpoints
- **Location:** `apps/api/src/rest/routers/` (22 router files)
- **Framework:** Hono
- **Use Cases:** External integrations, webhooks

#### Next.js API Routes
- **Location:** `apps/dashboard/src/app/api/`
- **Examples:**
  - `/api/chat` - AI Assistant streaming endpoint
  - `/api/auth/callback` - OAuth callbacks

#### Engine API (Bank Integrations)
- **Location:** `apps/engine/` (Cloudflare Workers)
- **Providers:** GoCardless, Plaid, Teller, EnableBanking
- **Client:** `@midday/engine-client` package

### Database Access

#### Drizzle ORM
- **Schema:** `packages/db/src/schema.ts`
- **Queries:** `packages/db/src/queries/`
- **Client:** `packages/db/src/client.ts`
- **Usage:** `import { db } from "@midday/db/client"`

#### Supabase
- **Auth:** `@midday/supabase/middleware`
- **Storage:** Document/file storage
- **Realtime:** Live updates via Supabase subscriptions
- **Clients:**
  - Server: `@midday/supabase/server`
  - Client: `@midday/supabase/client`
  - Middleware: `@midday/supabase/middleware`

---

## Component Relationships

### Layout Components

```
Root Layout
└── Providers (TRPC, Query, etc.)
    └── Sidebar Layout
        ├── Sidebar
        │   ├── MainMenu (Navigation)
        │   └── TeamDropdown
        ├── Header
        │   ├── NotificationCenter
        │   ├── GlobalTimerIndicator
        │   └── MobileMenu (mobile only)
        ├── Page Content (children)
        ├── GlobalSheets (all sheets/modals)
        └── GlobalTimerProvider
```

### Feature Component Hierarchy

**Transactions:**
- `TransactionsPage` → `TransactionsTable` → `TransactionRow` → `TransactionSheet`

**Invoices:**
- `InvoicesPage` → `InvoicesTable` → `InvoiceRow` → `InvoiceSheet` / `InvoiceDetailsSheet`

**Assistant:**
- `AssistantInput` (floating) / `AssistantWidget` → `AssistantModal` → `Chat` → `Messages` → `Message` (with tool results)

**Search:**
- `SearchModal` → `Search` → Search results → Navigate to entity

---

## Authentication & Authorization Flow

### Authentication
1. **Supabase Auth** via `@midday/supabase/middleware`
2. **Session Check:** Sidebar layout checks `trpc.user.me`
3. **Redirects:**
   - No user → `/login`
   - No fullName → `/setup`
   - No teamId → `/teams`

### Authorization
- **Team-scoped:** All queries filtered by `teamId` from session
- **Permissions:** Team roles (owner, member, etc.)
- **Middleware:** tRPC context includes user/team from session

---

## Key Integration Points

### 1. Bank Connections
- **Flow:** Connect Modal → Engine API → Provider (GoCardless/Plaid/Teller/EnableBanking) → Webhook → Transaction sync
- **Components:** `ConnectTransactionsModal`, `SelectBankAccountsModal`
- **Background Jobs:** Transaction sync via Trigger.dev

### 2. Inbox Processing
- **Flow:** Email/Upload → Inbox → OCR/Document Processing → Matching → Transaction linking
- **Components:** `InboxPage`, `InboxDetailsSheet`
- **Background Jobs:** Document processing, matching logic

### 3. Invoice Generation
- **Flow:** Invoice Form → PDF Generation (React PDF) → Storage → Email/Send
- **Components:** `InvoiceSheet`, `InvoiceEditor`
- **Background Jobs:** PDF generation via Trigger.dev

### 4. Time Tracking
- **Flow:** Tracker Timer → Start/Stop → Entry Creation → Project Hours
- **Components:** `TrackerTimer`, `GlobalTimerIndicator`
- **State:** Global timer status hook, document title updates

### 5. AI Assistant
- **Flow:** User Query → `/api/chat` → OpenAI → Tool Selection → tRPC Queries → Results → UI Components
- **Components:** `Chat`, `Messages`, Tool result components (Transactions, Revenue, etc.)
- **Tools:** 10 financial tools accessing tRPC endpoints

---

## File Organization Patterns

### Components
- **Feature-based:** `apps/dashboard/src/components/[feature]/`
- **Shared:** `apps/dashboard/src/components/[component-name].tsx`
- **UI Library:** `packages/ui/src/components/` (Shadcn-based)

### Pages
- **Route-based:** `apps/dashboard/src/app/[locale]/(app)/(sidebar)/[route]/page.tsx`
- **Layouts:** `apps/dashboard/src/app/[locale]/(app)/(sidebar)/[route]/layout.tsx`

### API
- **tRPC Routers:** `apps/api/src/trpc/routers/[feature].ts`
- **REST Routers:** `apps/api/src/rest/routers/[feature].ts`
- **Next.js API:** `apps/dashboard/src/app/api/[route]/route.ts`

### State
- **Zustand Stores:** `apps/dashboard/src/store/[feature].ts`
- **React Query:** Integrated via tRPC client

### Utilities
- **Shared:** `packages/[package-name]/src/`
- **App-specific:** `apps/dashboard/src/utils/`

---

## Query Parameter → Feature Mapping

| Query Param | Route | Feature | Component |
|-------------|-------|---------|-----------|
| `?step=connect` | `/transactions` | Connect bank | `ConnectTransactionsModal` |
| `?step=import&hide=true` | `/transactions` | Import transactions | `ImportModal` |
| `?createTransaction=true` | `/transactions` | Create transaction | `TransactionCreateSheet` |
| `?type=create` | `/invoices` | Create invoice | `InvoiceSheet` |
| `?create=true` | `/tracker` | Create tracker entry | `TrackerCreateSheet` |
| `?createCustomer=true` | `/customers` | Create customer | `CustomerCreateSheet` |
| `?tab=installed` | `/apps` | Apps tab state | `AppsPage` (client state) |

**Pattern:** Query params trigger client-side modals/sheets, not navigation

---

## Global Component Registration

### GlobalSheets Component
All contextual overlays registered in one place:

```typescript
// apps/dashboard/src/components/sheets/global-sheets.tsx
export function GlobalSheets() {
  return (
    <>
      {/* All sheets */}
      <TransactionSheet />
      <TransactionCreateSheet />
      {/* ... */}

      {/* All modals */}
      <AssistantModal />
      <SearchModal />
      {/* ... */}
    </>
  );
}
```

**Included in:** Sidebar layout (`app/[locale]/(app)/(sidebar)/layout.tsx`)

**Benefits:**
- Single registration point
- Available globally
- Consistent state management
- Lazy loading support

---

## State Management Patterns

### Zustand Stores
```typescript
// Pattern: apps/dashboard/src/store/[feature].ts
export const useFeatureStore = create<State>()((set) => ({
  isOpen: false,
  setOpen: (value) => set({ isOpen: value }),
}));
```

**Used for:**
- Modal/sheet visibility
- Global UI state
- Cross-component communication

### React Query (via tRPC)
```typescript
// Pattern: Server-side prefetching
batchPrefetch([
  trpc.feature.get.queryOptions({ ... }),
]);

// Pattern: Client-side queries
const { data } = useQuery(
  trpc.feature.get.queryOptions({ ... })
);
```

**Used for:**
- Server data fetching
- Caching
- Background refetching
- Optimistic updates

---

## Access Pattern Summary

### Navigation-Based Access
- **Sidebar Menu** → Route navigation → Page components
- **Query Parameters** → Client-side modals/sheets

### Shortcut-Based Access
- **Cmd+K** → Global Search Modal
- **Cmd+J** → Assistant Modal (some contexts)

### UI Element Access
- **Header Icons** → Notification Center, Mobile Menu
- **Floating Elements** → Assistant Input, Timer Indicator
- **Sidebar Bottom** → Team Switcher
- **Table Rows** → Entity Sheets
- **Buttons/Actions** → Modals, Sheets

### Widget Access
- **Overview Page** → Widget Carousel → Quick access to features

---

## Data Flow Examples

### Example 1: Viewing a Transaction
1. User clicks transaction row in table
2. `TransactionSheet` opens (from GlobalSheets)
3. Sheet fetches: `trpc.transactions.getById`
4. Data displayed in sheet
5. User can edit → `TransactionEditSheet` opens
6. Save → `trpc.transactions.update` mutation
7. Table refetches automatically

### Example 2: AI Assistant Query
1. User types "What's my burn rate?"
2. `Chat` component → `useChat` hook → `/api/chat` POST
3. OpenAI processes → Calls `getBurnRate` tool
4. Tool executes: `trpc.reports.burnRate.queryOptions()`
5. Results returned → `BurnRate` component renders
6. Streamed response displayed in chat

### Example 3: Bank Connection
1. User clicks "Connect bank" in nav
2. URL: `/transactions?step=connect`
3. `ConnectTransactionsModal` opens (from query param)
4. User selects provider → Redirects to OAuth
5. Callback → `apps/api/src/rest/routers/oauth.ts`
6. Webhook → Engine syncs transactions
7. Background job → `@midday/jobs` processes transactions

---

## Key Takeaways for LLM Understanding

1. **Navigation ≠ All Features:** Many features accessed via shortcuts, widgets, floating UI, or contextual triggers

2. **Query Params = Client State:** Query parameters often trigger modals/sheets, not page navigation

3. **Global Registration:** All sheets/modals registered in `GlobalSheets` for global availability

4. **State Management Split:**
   - Server state → React Query (via tRPC)
   - Client UI state → Zustand
   - Component state → React hooks

5. **Layout Hierarchy:** Sidebar layout wraps all authenticated pages, provides global components

6. **Team-Scoped:** All data queries filtered by team from session

7. **Background Jobs:** Heavy processing (PDFs, syncs, matching) via Trigger.dev

8. **Real-time Updates:** Supabase Realtime for live data synchronization

9. **Type Safety:** End-to-end type safety via tRPC

10. **Component Patterns:**
    - Feature-based organization
    - Sheet/Modal separation
    - Widget system for Overview
    - Global providers for cross-cutting concerns

---

## Cross-Reference Map

| Document Section | Related Code/Components |
|-----------------|------------------------|
| Navigation Items | `apps/dashboard/src/components/main-menu.tsx` |
| Global Search | `apps/dashboard/src/components/search/search-modal.tsx` |
| Notification Center | `apps/dashboard/src/components/notification-center/` |
| Team Switcher | `apps/dashboard/src/components/team-dropdown.tsx` |
| Global Timer | `apps/dashboard/src/components/global-timer-indicator.tsx` |
| Assistant | `apps/dashboard/src/components/assistant/`, `apps/dashboard/src/app/api/chat/route.ts` |
| Widgets | `apps/dashboard/src/components/widgets/` |
| Charts | `apps/dashboard/src/components/charts/` |
| Global Sheets | `apps/dashboard/src/components/sheets/global-sheets.tsx` |
| Layout | `apps/dashboard/src/app/[locale]/(app)/(sidebar)/layout.tsx` |
| tRPC API | `apps/api/src/trpc/routers/` |
| Database | `packages/db/src/` |
| State Stores | `apps/dashboard/src/store/` |

---

This reconciliation document provides a complete picture of how Midday's navigation, features, and architecture interconnect. Use this alongside [nav.md](./nav.md) and [new-findings.md](./new-findings.md) for comprehensive system understanding.
