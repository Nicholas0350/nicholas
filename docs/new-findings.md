# Features Not in Navigation

This document catalogs features that are not part of the sidebar navigation but are actively used and add significant value to the Midday application. These features are accessed through various UI patterns including keyboard shortcuts, header buttons, floating elements, contextual overlays, and dashboard widgets.

**Related Documents:**
- [Navigation Structure](./nav.md) - Sidebar navigation items and routes
- [System Reconciliation](./reconciliation.md) - Complete system overview mapping navigation, features, and architecture

## Global Features

### 1. Global Search (`SearchModal`)
- **Access:** `Cmd+K` (Mac) / `Meta+K` keyboard shortcut
- **Location:** Modal dialog (740px width, 535px height)
- **Features:**
  - Unified search across transactions, invoices, customers, documents, tracker entries
  - Keyboard navigation and quick actions
  - Real-time search results
- **State Management:** Zustand store (`useSearchStore`)
- **File:** `apps/dashboard/src/components/search/search-modal.tsx`

### 2. Notification Center
- **Access:** Bell icon in header (top-right corner)
- **UI:** Popover (400px width, 535px height)
- **Features:**
  - Inbox/Archive tabs
  - Unread indicator (yellow dot badge)
  - Auto-mark as seen when opened
  - Archive all functionality
  - Direct link to notification settings
- **File:** `apps/dashboard/src/components/notification-center/notification-center.tsx`

### 3. Team Switcher (`TeamDropdown`)
- **Access:** Bottom of sidebar (team avatar stack)
- **Features:**
  - Multi-team support with animated avatar stack
  - Quick team switching
  - Create new team link (`/teams/create`)
  - Shows team name when sidebar expanded
  - Animated transitions
- **File:** `apps/dashboard/src/components/team-dropdown.tsx`

### 4. Global Timer Indicator (`GlobalTimerIndicator`)
- **Access:** Appears globally in header when timer is running
- **Features:**
  - Shows elapsed time and current project name
  - Updates document title with timer (e.g., "01:23:45 • Project Name | Midday")
  - Green indicator badge with pulsing animation
  - Real-time updates every second
  - Persists across page navigation
- **File:** `apps/dashboard/src/components/global-timer-indicator.tsx`
- **Hook:** `apps/dashboard/src/hooks/use-global-timer-status.ts`

## Dashboard Widgets

Available on the Overview page (`/`) in a horizontal carousel:

### 5. Assistant Widget
- AI chat interface with example prompts
- Quick access to financial assistant
- **File:** `apps/dashboard/src/components/widgets/assistant/`

### 6. Spending Widget
- Category spending breakdown
- Period selector
- **File:** `apps/dashboard/src/components/widgets/spending/`

### 7. Invoice Widget
- Recent invoices with payment status
- Quick invoice actions
- **File:** `apps/dashboard/src/components/widgets/invoice/`

### 8. Transactions Widget
- Recent transactions list
- Quick transaction actions
- **File:** `apps/dashboard/src/components/widgets/transactions/`

### 9. Tracker Widget
- Active time entries
- Timer status
- **File:** `apps/dashboard/src/components/widgets/tracker/`

### 10. Inbox Widget
- Recent inbox items (receipts/invoices)
- Processing status
- **File:** `apps/dashboard/src/components/widgets/inbox/`

### 11. Account Balance Widget
- Bank account balances
- Multi-account overview
- **File:** `apps/dashboard/src/components/widgets/account-balance/`

### 12. Vault Widget
- Recent documents
- Quick document access
- **File:** `apps/dashboard/src/components/widgets/vault/`

**Widget Container:** `apps/dashboard/src/components/widgets/index.tsx`

## Charts & Reports

### 13. Financial Charts (Overview Page)
- **Location:** Top section of Overview page (`/`)
- **Features:**
  - Revenue chart
  - Profit chart
  - Expense chart
  - Burn Rate chart
  - Date range selectors
  - Currency filtering
  - Empty states when no data
- **File:** `apps/dashboard/src/components/charts/charts.tsx`

## Contextual Overlays

### 14. Global Sheets (Side Panels)
Contextual side panels for viewing/editing entities:

- **Transaction Sheets:**
  - `TransactionSheet` - View transaction details
  - `TransactionCreateSheet` - Create new transaction
  - `TransactionEditSheet` - Edit existing transaction

- **Invoice Sheets:**
  - `InvoiceSheet` - Create/edit invoice
  - `InvoiceDetailsSheet` - View invoice details

- **Customer Sheets:**
  - `CustomerCreateSheet` - Create customer
  - `CustomerEditSheet` - Edit customer

- **Tracker Sheets:**
  - `TrackerCreateSheet` - Create tracker entry
  - `TrackerUpdateSheet` - Update tracker entry
  - `TrackerScheduleSheet` - Schedule tracker entry

- **Category Sheets:**
  - `CategoryCreateSheet` - Create category
  - `CategoryEditSheet` - Edit category

- **Product Sheets:**
  - `ProductCreateSheet` - Create product
  - `ProductEditSheet` - Edit product

- **Document Sheet:**
  - `DocumentSheet` - View document details

- **Inbox Details Sheet:**
  - `InboxDetailsSheet` - View inbox item details

**Container:** `apps/dashboard/src/components/sheets/global-sheets.tsx`

### 15. Global Modals (Dialog Overlays)
Contextual modal dialogs:

- **Assistant Modal** - AI chat interface (see [Navigation Structure - Assistant](./nav.md#assistant-ai-chat))
- **Search Modal** - Global search (see [Global Search](#1-global-search-searchmodal))
- **Connect Transactions Modal** - Bank connection flow
- **Import Modal** - Import transactions from CSV/other formats
- **Select Bank Accounts Modal** - Account selection interface
- **Trial Ended Modal** - Subscription trial expiration
- **Overview Modal** - Onboarding/connection flow for new users

**Container:** `apps/dashboard/src/components/sheets/global-sheets.tsx`

## Mobile Features

### 16. Mobile Menu (`MobileMenu`)
- **Access:** Hamburger menu button (mobile only)
- **Features:**
  - Full navigation menu in sheet overlay
  - Mobile-optimized layout
  - Same navigation structure as desktop sidebar
- **File:** `apps/dashboard/src/components/mobile-menu.tsx`

## Quick Access Features

### 17. Floating Assistant Input (`AssistantInput`)
- **Access:** Floating input field at bottom of pages
- **Features:**
  - Quick access to AI assistant
  - Opens assistant modal on focus
  - Gradient overlay for visibility
  - Midday logo indicator
- **File:** `apps/dashboard/src/components/widgets/assistant/assistant-input.tsx`

## Data Management

### 18. Export Features
- **Export Transactions Modal** - Export transaction data in various formats
- **Export Bar** - Quick export actions in transaction tables
- **File:** `apps/dashboard/src/components/modals/export-transactions-modal.tsx`

### 19. Import Features
- **Import Modal** - Import transactions from CSV and other formats
- Currency selection
- **File:** `apps/dashboard/src/components/modals/import-modal/`

## Connection Management

### 20. Bank Connection Features
- **Connect Transactions Modal** - Bank connection onboarding flow
- **Select Bank Accounts Modal** - Account selection interface
- **Delete Connection** - Remove bank connections
- **Edit Bank Account Modal** - Modify account details
- **Files:** `apps/dashboard/src/components/modals/connect-transactions-modal.tsx`, `apps/dashboard/src/components/modals/select-bank-accounts.tsx`

## Developer Features

Available in Settings → Developer (see [Navigation Structure - Settings](./nav.md#settings)):

### 21. API Keys Management
- Create/edit/delete API keys
- API key form with permissions
- **Files:** `apps/dashboard/src/components/modals/create-api-key-modal.tsx`, `apps/dashboard/src/components/modals/edit-api-key-modal.tsx`, `apps/dashboard/src/components/modals/delete-api-key-modal.tsx`

### 22. OAuth Applications
- Manage OAuth applications
- Create/edit/delete OAuth apps
- View OAuth secrets
- **Files:** `apps/dashboard/src/components/sheets/oauth-application-create-sheet.tsx`, `apps/dashboard/src/components/sheets/oauth-application-edit-sheet.tsx`, `apps/dashboard/src/components/modals/delete-oauth-application-modal.tsx`, `apps/dashboard/src/components/modals/oauth-secret-modal.tsx`

## Team Management

Available in Settings → Members (see [Navigation Structure - Settings](./nav.md#settings)):

### 23. Team Member Management
- **Invite Team Members Modal** - Invite users to team
- **Team Members Table** - Manage team members and roles
- **Delete Team** - Remove team (with confirmation)
- **Team Invites** - View and manage pending invitations
- **Files:** `apps/dashboard/src/components/modals/invite-team-members-modal.tsx`, `apps/dashboard/src/components/tables/members/`

## Onboarding & Setup

### 24. Onboarding Features
- **Overview Modal** - First-time connection flow for new users
- **Consent Banner** - Privacy/terms consent
- **Base Currency Selector** - Initial currency setup
- **Files:** `apps/dashboard/src/components/modals/overview-modal.tsx`, `apps/dashboard/src/components/consent-banner.tsx`, `apps/dashboard/src/components/base-currency/`

## Security Features

### 25. Multi-Factor Authentication (MFA)
- **Enroll MFA** - Multi-factor authentication setup
- **Setup MFA** - MFA configuration
- **Account Settings** - Security settings management
- **Files:** `apps/dashboard/src/components/enroll-mfa.tsx`, `apps/dashboard/src/components/setup-mfa.tsx`, `apps/dashboard/src/components/account-settings.tsx`

## Access Patterns Summary

These features are accessed through:

1. **Keyboard Shortcuts:**
   - Global Search: `Cmd+K` / `Meta+K`
   - Assistant: `Cmd+J` / `Meta+J` (from some contexts)

2. **Header Elements:**
   - Notification Center (bell icon)
   - Mobile Menu (hamburger icon)
   - Global Timer Indicator (when active)

3. **Sidebar Elements:**
   - Team Switcher (bottom of sidebar)

4. **Floating UI:**
   - Assistant Input (bottom of pages)
   - Global Timer Indicator (header)

5. **Contextual Triggers:**
   - Sheets (from table rows, buttons, actions)
   - Modals (from buttons, links, query parameters)

6. **Dashboard Widgets:**
   - Overview page carousel

7. **Query Parameters:**
   - Many features triggered via URL params (see [Navigation Structure](./nav.md#notes) for examples)

## Notes

- All global sheets and modals are registered in `GlobalSheets` component, which is included in the main layout
- Widgets are only available on the Overview page (`/`)
- Many features have both modal and sheet variants depending on context
- Some features are conditionally rendered based on user permissions, team settings, or data availability
