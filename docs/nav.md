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

### Citations

**File:** apps/dashboard/src/components/main-menu.tsx (L10-20)
```typescript
const icons = {
  "/": () => <Icons.Overview size={20} />,
  "/transactions": () => <Icons.Transactions size={20} />,
  "/invoices": () => <Icons.Invoice size={20} />,
  "/tracker": () => <Icons.Tracker size={20} />,
  "/customers": () => <Icons.Customers size={20} />,
  "/vault": () => <Icons.Vault size={20} />,
  "/settings": () => <Icons.Settings size={20} />,
  "/apps": () => <Icons.Apps size={20} />,
  "/inbox": () => <Icons.Inbox2 size={20} />,
} as const;
```

**File:** apps/dashboard/src/components/main-menu.tsx (L23-26)
```typescript
  {
    path: "/",
    name: "Overview",
  },
```

**File:** apps/dashboard/src/components/main-menu.tsx (L27-44)
```typescript
  {
    path: "/transactions",
    name: "Transactions",
    children: [
      {
        path: "/transactions/categories",
        name: "Categories",
      },
      {
        path: "/transactions?step=connect",
        name: "Connect bank",
      },
      {
        path: "/transactions?step=import&hide=true",
        name: "Import",
      },
      { path: "/transactions?createTransaction=true", name: "Create new" },
    ],
```

**File:** apps/dashboard/src/components/main-menu.tsx (L46-50)
```typescript
  {
    path: "/inbox",
    name: "Inbox",
    children: [{ path: "/inbox/settings", name: "Settings" }],
  },
```

**File:** apps/dashboard/src/components/main-menu.tsx (L51-58)
```typescript
  {
    path: "/invoices",
    name: "Invoices",
    children: [
      { path: "/invoices/products", name: "Products" },
      { path: "/invoices?type=create", name: "Create new" },
    ],
  },
```

**File:** apps/dashboard/src/components/main-menu.tsx (L59-63)
```typescript
  {
    path: "/tracker",
    name: "Tracker",
    children: [{ path: "/tracker?create=true", name: "Create new" }],
  },
```

**File:** apps/dashboard/src/components/main-menu.tsx (L64-68)
```typescript
  {
    path: "/customers",
    name: "Customers",
    children: [{ path: "/customers?createCustomer=true", name: "Create new" }],
  },
```

**File:** apps/dashboard/src/components/main-menu.tsx (L69-72)
```typescript
  {
    path: "/vault",
    name: "Vault",
  },
```

**File:** apps/dashboard/src/components/main-menu.tsx (L73-80)
```typescript
  {
    path: "/apps",
    name: "Apps",
    children: [
      { path: "/apps", name: "All" },
      { path: "/apps?tab=installed", name: "Installed" },
    ],
  },
```

**File:** apps/dashboard/src/components/main-menu.tsx (L81-92)
```typescript
  {
    path: "/settings",
    name: "Settings",
    children: [
      { path: "/settings", name: "General" },
      { path: "/settings/billing", name: "Billing" },
      { path: "/settings/accounts", name: "Bank Connections" },
      { path: "/settings/members", name: "Members" },
      { path: "/settings/notifications", name: "Notifications" },
      { path: "/settings/developer", name: "Developer" },
    ],
  },
```

**File:** apps/dashboard/src/components/main-menu.tsx (L189-190)
```typescript
  // Children should be visible when: expanded sidebar AND this item is expanded
  const shouldShowChildren = isExpanded && isItemExpanded;
```

**File:** apps/dashboard/src/components/sidebar.tsx (L14-21)
```typescript
    <aside
      className={cn(
        "h-screen flex-shrink-0 flex-col desktop:overflow-hidden desktop:rounded-tl-[10px] desktop:rounded-bl-[10px] justify-between fixed top-0 pb-4 items-center hidden md:flex z-50 transition-all duration-200 ease-&lsqb;cubic-bezier(0.4,0,0.2,1)&rsqb;",
        "bg-background border-r border-border",
        isExpanded ? "w-[240px]" : "w-[70px]",
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
```

**File:** apps/dashboard/src/store/assistant.ts (L1-13)
```typescript
import { create } from "zustand";

interface AssistantState {
  isOpen: boolean;
  message?: string;
  setOpen: (message?: string) => void;
}

export const useAssistantStore = create<AssistantState>()((set) => ({
  isOpen: false,
  message: undefined,
  setOpen: (message) => set((state) => ({ isOpen: !state.isOpen, message })),
}));
```

**File:** apps/dashboard/src/components/assistant/assistant-modal.tsx (L7-22)
```typescript
export function AssistantModal() {
  const { isOpen, setOpen } = useAssistantStore();

  const toggleOpen = () => setOpen();

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent
        className="overflow-hidden p-0 max-w-full w-full h-full md:max-w-[740px] md:h-[480px] m-0 select-text"
        hideClose
      >
        <Assistant />
      </DialogContent>
    </Dialog>
  );
}
```

**File:** apps/dashboard/src/components/chat/index.tsx (L13-19)
```typescript
export function Chat() {
  const { message } = useAssistantStore();

  const { messages, input, handleSubmit, status, setInput, append } = useChat({
    experimental_throttle: 100,
    sendExtraMessageFields: true,
  });
```

**File:** apps/dashboard/src/app/api/chat/route.ts (L14-50)
```typescript
export async function POST(request: Request) {
  const { messages } = await request.json();

  return createDataStreamResponse({
    execute: (dataStream) => {
      const result = streamText({
        model: openai("gpt-4.1-mini"),
        system: `...`,
        messages,
        maxSteps: 5,
        experimental_transform: smoothStream({ chunking: "word" }),
        tools: {
          getSpending,
          getDocuments,
          getBurnRate,
          getTransactions,
          getRevenue,
          getForecast,
          getProfit,
          getRunway,
          getInbox,
          getTaxSummary,
        },
      });
```
