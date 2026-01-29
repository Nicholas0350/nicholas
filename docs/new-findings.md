# Features Not in Navigation but Adding Value

Findings from codebase review: features that are used and add value but are **not** part of the sidebar navigation. Documented to avoid confusion (e.g. Assistant/Chat tripping up discovery).

---

## 1. Global Search (`SearchModal`)

- **Access:** `Cmd+K` (Mac) / `Meta+K` keyboard shortcut
- **Location:** Modal dialog (740px width, 535px height)
- **Features:**
  - Unified search across transactions, invoices, customers, documents, tracker entries
  - Keyboard navigation
  - Quick actions from search results
- **State:** Zustand store (`useSearchStore`)
- **Files:** `apps/dashboard/src/components/search/search-modal.tsx`, `search.tsx`, `open-search-button.tsx`, `apps/dashboard/src/store/search.ts`

---

## 2. Notification Center

- **Access:** Bell icon in header (top-right)
- **Features:**
  - Inbox/Archive tabs
  - Unread indicator (yellow dot)
  - Auto-mark as seen on open
  - Archive all
  - Links to notification settings (`/settings/notifications`)
- **UI:** Popover (400px width, 535px height)
- **Files:** `apps/dashboard/src/components/notification-center/notification-center.tsx`

---

## 3. Team Switcher (`TeamDropdown`)

- **Access:** Bottom of sidebar (team avatar)
- **Features:**
  - Multi-team support
  - Animated stack of team avatars
  - Quick team switching
  - Create new team link (`/teams/create`)
  - Shows team name when sidebar expanded
- **Files:** `apps/dashboard/src/components/team-dropdown.tsx`

---

## 4. Global Timer Indicator (`GlobalTimerIndicator`)

- **Access:** Renders globally when a tracker timer is running
- **Features:**
  - Shows elapsed time and current project name
  - Updates document title with timer (e.g. `00:15:32 • Project Name | Midday`)
  - Green indicator badge
  - Real-time updates via `useGlobalTimerStatus`
  - Persists across page navigation
- **Files:** `apps/dashboard/src/components/global-timer-indicator.tsx`, `apps/dashboard/src/hooks/use-global-timer-status.ts`

---

## 5. Overview Dashboard Widgets (Carousel on `/`)

- **Location:** Overview page only; horizontal carousel with navigation
- **Widgets:**
  - **Assistant Widget** – AI chat entry with example prompts
  - **Spending Widget** – Category spending breakdown
  - **Invoice Widget** – Recent invoices with status
  - **Transactions Widget** – Recent transactions list
  - **Tracker Widget** – Active time entries
  - **Inbox Widget** – Recent inbox items
  - **Account Balance Widget** – Bank account balances
  - **Vault Widget** – Recent documents
- **Files:** `apps/dashboard/src/components/widgets/index.tsx`, `apps/dashboard/src/app/[locale]/(app)/(sidebar)/page.tsx`

---

## 6. Charts / Reports (Overview page)

- **Location:** Top of Overview page
- **Features:**
  - Revenue, Profit, Expense, Burn Rate charts
  - Date range selectors
  - Currency filtering
  - Empty states when no data
- **Files:** `apps/dashboard/src/components/charts/`, `chart-selectors.tsx`

---

## 7. Mobile Menu (`MobileMenu`)

- **Access:** Hamburger menu (mobile only, `md:hidden`)
- **Features:**
  - Full navigation menu in a sheet
  - Same nav items as sidebar
- **Files:** `apps/dashboard/src/components/mobile-menu.tsx`

---

## 8. Global Sheets / Modals (Contextual overlays)

Rendered via `GlobalSheets` in app layout; opened by user actions, not nav links.

**Sheets:**

- Transaction sheets (view / create / edit)
- Invoice sheets (view / create / edit)
- Customer sheets (create / edit)
- Tracker sheets (create / update / schedule)
- Category sheets (create / edit)
- Product sheets (create / edit)
- Document sheet (view)
- Inbox details sheet
- OAuth application create / edit sheets

**Modals:**

- Connect Transactions Modal
- Import Modal
- Select Bank Accounts Modal
- Trial Ended Modal
- Overview Modal (onboarding when no accounts connected)

- **Files:** `apps/dashboard/src/components/sheets/global-sheets.tsx`, `apps/dashboard/src/components/sheets/`, `apps/dashboard/src/components/modals/`

---

## 9. Floating Assistant Input (`AssistantInput`)

- **Access:** Floating input at bottom of pages (e.g. Overview)
- **Features:**
  - Quick access to AI assistant
  - Opens Assistant modal on focus
  - Gradient overlay for visibility
- **Files:** `apps/dashboard/src/components/widgets/assistant/assistant-input.tsx`

---

## 10. Export / Import

- **Export Transactions Modal** – Export transaction data
- **Import Modal** – Import transactions (e.g. CSV)
- **Export Bar** – Quick export actions in transaction tables
- **Files:** `apps/dashboard/src/components/modals/export-transactions-modal.tsx`, `import-modal/`, `apps/dashboard/src/components/tables/transactions/export-bar.tsx`

---

## 11. Connection Management

- Connect Transactions Modal – Bank connection flow
- Select Bank Accounts Modal – Account selection
- Delete Connection – Remove bank connections
- Edit Bank Account Modal – Modify account details
- **Files:** `apps/dashboard/src/components/modals/connect-transactions-modal.tsx`, `select-bank-accounts.tsx`, `delete-connection.tsx`, `edit-bank-account-modal.tsx`

---

## 12. Developer Features (Settings sub-features)

- API Keys – Create / edit / delete API keys
- OAuth Applications – Manage OAuth apps
- OAuth Secret Modal – View OAuth secrets
- **Access:** Under `/settings/developer` (in nav) but modals/sheets are not listed in nav
- **Files:** `apps/dashboard/src/components/modals/create-api-key-modal.tsx`, `edit-api-key-modal.tsx`, `delete-api-key-modal.tsx`, `oauth-secret-modal.tsx`, `delete-oauth-application-modal.tsx`, OAuth application sheets

---

## 13. Team Management (Settings sub-features)

- Invite Team Members Modal
- Team Members Table
- Delete Team
- Team Invites (pending invitations)
- **Access:** Under `/settings/members` (in nav); modals/tables are contextual
- **Files:** `apps/dashboard/src/components/modals/invite-team-members-modal.tsx`, `delete-team.tsx`, `team-invites.tsx`, `tables/members/`

---

## 14. Onboarding / Setup

- **Overview Modal** – First-time connection flow when no bank accounts
- **Consent Banner** – Privacy / terms consent
- **Base Currency Selector** – Initial or default currency
- **Files:** `apps/dashboard/src/components/modals/overview-modal.tsx`, `consent-banner.tsx`, `apps/dashboard/src/components/base-currency/`

---

## 15. MFA / Security

- Enroll MFA – Multi-factor authentication setup
- Setup MFA – MFA configuration
- Account Settings – Security-related settings
- **Files:** `apps/dashboard/src/components/enroll-mfa.tsx`, `setup-mfa.tsx`, `account-settings.tsx`

---

## Summary: How These Are Accessed

| Mechanism            | Features                                      |
|----------------------|-----------------------------------------------|
| Keyboard shortcut    | Global Search (`Cmd+K`)                       |
| Header buttons       | Notifications, Mobile Menu                    |
| Sidebar (non-nav)    | Team Switcher (bottom)                        |
| Floating UI          | Assistant Input, Global Timer Indicator       |
| Contextual triggers  | Sheets/Modals from tables, actions, links     |
| Dashboard only       | Widgets carousel, Charts                      |

These features are core to the product but are reached via shortcuts, header, sidebar chrome, overlays, and contextual actions rather than sidebar nav items.
