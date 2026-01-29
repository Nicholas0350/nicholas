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
