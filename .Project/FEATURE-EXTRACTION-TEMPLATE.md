# Feature Extraction Template - Midday

Use this template to extract complete feature implementations from the Midday codebase.

## Quick Start

```bash
# 1. Get project structure
codemap .

# 2. Get dependency flow
codemap --deps

# 3. Find feature files
grep -r "[feature_name]" --include="*.ts" --include="*.tsx" -l
```

## Midday Architecture Layers

### 1. UI Layer
```
apps/dashboard/src/
├── app/[locale]/(app)/(sidebar)/[feature]/     # Pages
├── components/[feature]*.tsx                    # Components
├── hooks/use-[feature].ts                       # Hooks
└── actions/[feature]-action.ts                  # Server actions
```

### 2. API Layer
```
apps/api/src/
├── trpc/routers/[feature].ts      # tRPC procedures
├── rest/routers/[feature].ts      # REST endpoints
├── schemas/[feature].ts           # Zod schemas
└── utils/                         # Helpers
```

### 3. Database Layer
```
packages/db/src/
├── schema.ts                      # Drizzle schema (all tables)
├── queries/[feature].ts           # Query functions
└── queries/index.ts               # Query exports
```

### 4. Shared Packages
```
packages/
├── supabase/src/types/db.ts       # Generated DB types
├── supabase/src/queries.ts        # Supabase queries
└── ui/src/components/             # Shared UI components
```

---

## Extraction Checklist

### Feature: ____________________

#### UI Layer
- [ ] Page: `apps/dashboard/src/app/[locale]/(app)/(sidebar)/______/page.tsx`
- [ ] Components: `apps/dashboard/src/components/______*.tsx`
- [ ] Hooks: `apps/dashboard/src/hooks/use-______.ts`
- [ ] Actions: `apps/dashboard/src/actions/______-action.ts`

#### API Layer
- [ ] tRPC Router: `apps/api/src/trpc/routers/______.ts`
- [ ] REST Router: `apps/api/src/rest/routers/______.ts`
- [ ] Schemas: `apps/api/src/schemas/______.ts`

#### Database Layer
- [ ] Schema Table: `packages/db/src/schema.ts` (search for table name)
- [ ] Queries: `packages/db/src/queries/______.ts`

#### Types & Validation
- [ ] Input Types: (from Zod schemas)
- [ ] Output Types: (from schema/queries)
- [ ] DB Types: `packages/supabase/src/types/db.ts`

---

## Output Format

```markdown
# Feature Extraction: [NAME]

## Overview
Brief description of what this feature does.

## Architecture Diagram
```
[Component]
    ↓ calls
[Server Action / tRPC Client]
    ↓ POST/query
[tRPC Router / REST Endpoint]
    ↓ calls
[Database Query]
    ↓ reads/writes
[Schema Table]
```

## File Inventory

| Layer | File | Lines | Purpose |
|-------|------|-------|---------|
| UI | `apps/dashboard/src/components/x.tsx` | 1-50 | Main component |
| Action | `apps/dashboard/src/actions/x.ts` | 10-30 | Server action |
| Router | `apps/api/src/trpc/routers/x.ts` | 15-45 | tRPC procedures |
| Query | `packages/db/src/queries/x.ts` | 1-25 | DB operations |
| Schema | `packages/db/src/schema.ts` | 100-120 | Table definition |

## Database Schema

```sql
-- From packages/db/src/schema.ts
CREATE TABLE feature_table (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ...
);
```

## Key Types

```typescript
// Input (from Zod schema)
const createFeatureSchema = z.object({...});

// Output (from query return)
type Feature = {...};
```

## Data Flow

1. User clicks [button] in `ComponentName`
2. Calls `createFeatureAction` with form data
3. Action validates with Zod schema
4. Calls `trpc.feature.create.mutate()`
5. Router validates permissions via middleware
6. Calls `createFeature()` query
7. Drizzle inserts into `feature_table`
8. Returns created record
9. UI updates via React Query invalidation

## Related Features
- [Related Feature 1]
- [Related Feature 2]

## Notes
- Any gotchas or important details
```

---

## Example: Extracting "Invoices"

```bash
# Find all invoice-related files
grep -r "invoice" --include="*.ts" --include="*.tsx" -l | head -20

# Check codemap
codemap . | grep -i invoice
```

**Key files:**
- UI: `apps/dashboard/src/components/invoice*.tsx`
- Page: `apps/dashboard/src/app/[locale]/(app)/(sidebar)/invoices/`
- Actions: `apps/dashboard/src/actions/invoice/`
- Router: `apps/api/src/trpc/routers/invoice.ts`
- Schema: `apps/api/src/schemas/invoice.ts`
- Queries: `packages/db/src/queries/` (check index.ts)
- Table: `packages/db/src/schema.ts` → `invoices`
