# LLM Prompt Creation for Select Range Feature Port

## Feature Overview

The "Drag. Select. Analyze" feature (commit `8aff01d15` - "Select range #666") implements **shift-click range selection** in transaction tables. Users can:

- Click checkbox to select a row and track the index
- Shift+click another checkbox to select/deselect all rows in range
- Toggle behavior: if all in range are selected, deselect them

## Step 1: Repository Analysis & Library Verification

### 1.1 Check Current Dependencies

```bash
# Check package.json for state management and table libraries
grep -E "zustand|@tanstack/react-table|react-table" apps/dashboard/package.json
```

**Expected findings:**

- `zustand`: State management library (if present)
- `@tanstack/react-table`: Table library (if present)
- Alternative libraries: Context API, Redux, Recoil, etc.

### 1.2 Verify Library Usage in Codebase

```bash
# Check if Zustand is actually used
grep -r "from ['\"]zustand['\"]" apps/dashboard/src --include="*.ts" --include="*.tsx" | head -5

# Check if Tanstack React Table is used
grep -r "@tanstack/react-table" apps/dashboard/src --include="*.ts" --include="*.tsx" | head -5
```

### 1.3 Identify Alternative State Management

If Zustand is NOT present, identify what IS used:

- React Context API
- Redux/Redux Toolkit
- Recoil
- Jotai
- React Query state
- Local component state

### 1.4 Identify Alternative Table Libraries

If Tanstack React Table is NOT present, identify what IS used:

- Custom table implementation
- ag-Grid
- React Data Grid
- Material-UI Table
- Ant Design Table
- Custom HTML table

## Step 2: Pull Latest Upstream Commit

```bash
cd /Users/nicholas/Sites/nicholas/midday
git fetch upstream
git show 8aff01d15 --stat  # Review files changed
git show 8aff01d15          # Review full diff
```

## Step 3: Files Modified in Upstream Feature

| File | Purpose | Dependencies |
|------|---------|--------------|
| [`apps/dashboard/src/store/transactions.ts`](apps/dashboard/src/store/transactions.ts) | Zustand store - adds `lastClickedIndex` state | Zustand |
| [`apps/dashboard/src/types/react-table.d.ts`](apps/dashboard/src/types/react-table.d.ts) | TypeScript declarations for table meta | @tanstack/react-table |
| [`apps/dashboard/src/components/tables/transactions/columns.tsx`](apps/dashboard/src/components/tables/transactions/columns.tsx) | SelectCell component with shift-click handler | React, Checkbox component |
| [`apps/dashboard/src/components/tables/transactions/data-table.tsx`](apps/dashboard/src/components/tables/transactions/data-table.tsx) | Range selection logic via `handleShiftClickRange` | @tanstack/react-table, Zustand |

## Step 4: Decision Matrix for Library Adoption

### 4.1 State Management Decision

| Scenario | Action |
|----------|--------|
| Zustand already present | Use Zustand store pattern from upstream |
| Zustand NOT present, but similar library exists | Adapt pattern to existing library (e.g., Redux slice, Context provider) |
| No state management library | **Decision needed**: Add Zustand OR use React Context/useState |

**Zustand Installation (if needed):**

```bash
cd apps/dashboard
bun add zustand
```

### 4.2 Table Library Decision

| Scenario | Action |
|----------|--------|
| @tanstack/react-table already present | Use Tanstack table meta pattern from upstream |
| @tanstack/react-table NOT present, but table library exists | Adapt pattern to existing library's selection API |
| No table library (custom implementation) | **Decision needed**: Add @tanstack/react-table OR implement custom range selection |

**Tanstack React Table Installation (if needed):**

```bash
cd apps/dashboard
bun add @tanstack/react-table
```

## Step 5: Alternative Implementation Approaches

### 5.1 If Using React Context Instead of Zustand

```typescript
// Create TransactionsContext
interface TransactionsContextValue {
  lastClickedIndex: number | null;
  setLastClickedIndex: (index: number | null) => void;
  rowSelection: Record<string, boolean>;
  setRowSelection: (updater: Updater<RowSelectionState>) => void;
}

// Provider wraps table component
// Components consume via useContext(TransactionsContext)
```

### 5.2 If Using Custom Table Instead of Tanstack

```typescript
// Track selection state manually
const [lastClickedIndex, setLastClickedIndex] = useState<number | null>(null);
const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

// Range selection logic adapts to custom table structure
const handleShiftClickRange = (startIndex: number, endIndex: number) => {
  const rows = tableRows; // Your table's row data structure
  // ... same range selection logic
};
```

### 5.3 If Using Redux Instead of Zustand

```typescript
// Redux slice
interface TransactionsState {
  lastClickedIndex: number | null;
  rowSelection: Record<string, boolean>;
}

// Actions
const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setLastClickedIndex: (state, action) => {
      state.lastClickedIndex = action.payload;
    },
    // ... row selection reducers
  }
});
```

## Step 6: Targeted LLM Prompt Template

```markdown
## Task: Implement Shift-Click Range Selection for Transaction Table

### Context Analysis Required
1. **State Management**: What library/pattern is used? (Zustand/Redux/Context/None)
2. **Table Library**: What library/pattern is used? (@tanstack/react-table/Custom/Other)
3. **Current Selection**: How is row selection currently implemented?

### Current Codebase State
[Include current contents of relevant files:
- State management file (store/context/reducer)
- Table component file
- Column definitions file
- Type definitions file]

### Feature Requirements
1. Track the last clicked row index in state management
2. On checkbox click: select row + update lastClickedIndex
3. On shift+click checkbox: select/deselect all rows between lastClickedIndex and current row
4. Toggle behavior: if all rows in range are already selected, deselect them

### Implementation Approach
[Choose based on analysis:]
- **Option A**: If Zustand + Tanstack present → Use upstream pattern
- **Option B**: If different libraries → Adapt pattern to existing libraries
- **Option C**: If no libraries → Implement with React hooks + custom logic

### Reference Implementation (from upstream)
[Include the git diff from commit 8aff01d15]

### Adaptation Notes
- If not using Zustand: Adapt store pattern to [YOUR_STATE_MANAGEMENT]
- If not using Tanstack: Adapt table meta pattern to [YOUR_TABLE_LIBRARY]
- Core logic (range calculation, toggle behavior) remains the same
```

## Step 7: Key Implementation Details (Library-Agnostic)

### 7.1 Core Range Selection Logic (Universal)

```typescript
// This logic works regardless of state management or table library
const handleShiftClickRange = (startIndex: number, endIndex: number) => {
  const rows = getTableRows(); // Adapt to your table structure
  const start = Math.min(startIndex, endIndex);
  const end = Math.max(startIndex, endIndex);

  // Check if all items in range are already selected
  let allSelected = true;
  for (let i = start; i <= end; i++) {
    const row = rows[i];
    if (row && !isRowSelected(row.id)) { // Adapt selection check
      allSelected = false;
      break;
    }
  }

  // Toggle: if all selected, deselect; otherwise select all
  const newSelection = { ...currentSelection }; // Adapt to your state shape
  for (let i = start; i <= end; i++) {
    const row = rows[i];
    if (row) {
      if (allSelected) {
        delete newSelection[row.id];
      } else {
        newSelection[row.id] = true;
      }
    }
  }
  updateSelection(newSelection); // Adapt to your state update method
};
```

### 7.2 SelectCell Pattern (Universal)

```tsx
// Works with any checkbox component
<div
  onClick={(e) => {
    if (e.shiftKey && onShiftClick) {
      e.preventDefault();
      e.stopPropagation();
      onShiftClick();
    }
  }}
>
  <Checkbox
    checked={checked}
    onCheckedChange={(value) => {
      onChange(value);
      // Update lastClickedIndex after selection
      if (setLastClickedIndex) {
        setLastClickedIndex(rowIndex);
      }
    }}
  />
</div>
```

## Step 8: Verification Checklist

### 8.1 Pre-Implementation

- [ ] Identified state management library/pattern
- [ ] Identified table library/pattern
- [ ] Determined if libraries need to be added
- [ ] Reviewed upstream commit diff
- [ ] Understood current selection implementation

### 8.2 Implementation

- [ ] Added `lastClickedIndex` tracking to state
- [ ] Extended type definitions (if using TypeScript)
- [ ] Updated SelectCell to handle shift+click
- [ ] Implemented range selection logic
- [ ] Integrated with existing selection state

### 8.3 Post-Implementation

- [ ] Range selection works (click → shift+click)
- [ ] Toggle behavior correct (select if any unselected, deselect if all selected)
- [ ] Works with existing row selection state
- [ ] No conflicts with other selection features
- [ ] TypeScript types correct (if applicable)
- [ ] No console errors or warnings

## Step 9: Testing Scenarios

1. **Basic Range Selection**

   - Click checkbox on row 5
   - Shift+click checkbox on row 10
   - Verify rows 5-10 are selected

2. **Reverse Range Selection**

   - Click checkbox on row 10
   - Shift+click checkbox on row 5
   - Verify rows 5-10 are selected

3. **Toggle Deselection**

   - Select rows 5-10 individually
   - Click checkbox on row 5
   - Shift+click checkbox on row 10
   - Verify rows 5-10 are deselected

4. **Partial Range**

   - Select rows 5, 7, 9
   - Click checkbox on row 5
   - Shift+click checkbox on row 9
   - Verify rows 5-9 are all selected

5. **Edge Cases**

   - Shift+click without prior click (should do nothing or select single row)
   - Shift+click on same row (should toggle single row)
   - Shift+click across page boundaries (if paginated)

## Step 10: Upstream Reference Implementation

### Commit Details

- **Commit**: `8aff01d15`
- **PR**: #666
- **Author**: Pontus Abrahamsson
- **Date**: Tue Dec 2 12:15:09 2025 +0100
- **Message**: "Select range (#666)"

### Key Changes Summary

1. **Store** (`apps/dashboard/src/store/transactions.ts`): Added `lastClickedIndex` state
2. **Types** (`apps/dashboard/src/types/react-table.d.ts`): Extended TableMeta interface
3. **Columns** (`apps/dashboard/src/components/tables/transactions/columns.tsx`): Added shift-click handler to SelectCell
4. **DataTable** (`apps/dashboard/src/components/tables/transactions/data-table.tsx`): Implemented `handleShiftClickRange` with useRef pattern

### Full Diff Available

```bash
git show 8aff01d15
```

### Upstream Implementation Code Snippets

#### Store Changes (`apps/dashboard/src/store/transactions.ts`)

```typescript
interface TransactionsState {
  // ... existing properties
  lastClickedIndex: number | null;
  setLastClickedIndex: (index: number | null) => void;
}

export const useTransactionsStore = create<TransactionsState>()((set) => ({
  // ... existing state
  lastClickedIndex: null,
  setLastClickedIndex: (index) => set({ lastClickedIndex: index }),
}));
```

#### Type Definitions (`apps/dashboard/src/types/react-table.d.ts`)

```typescript
declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    // ... existing meta properties
    lastClickedIndex?: number | null;
    setLastClickedIndex?: (index: number | null) => void;
    handleShiftClickRange?: (startIndex: number, endIndex: number) => void;
  }
}
```

#### SelectCell Component (`apps/dashboard/src/components/tables/transactions/columns.tsx`)

```typescript
const SelectCell = memo(
  ({
    checked,
    onChange,
    onShiftClick,
  }: {
    checked: boolean;
    onChange: (value: boolean) => void;
    onShiftClick?: () => void;
  }) => (
    <div
      onClick={(e) => {
        if (e.shiftKey && onShiftClick) {
          e.preventDefault();
          e.stopPropagation();
          onShiftClick();
        }
      }}
    >
      <Checkbox checked={checked} onCheckedChange={onChange} />
    </div>
  ),
);
```

#### Range Selection Logic (`apps/dashboard/src/components/tables/transactions/data-table.tsx`)

```typescript
// Handle shift-click range selection
const handleShiftClickRangeRef = useRef<
  (startIndex: number, endIndex: number) => void
>(() => {});

// Update handleShiftClickRange to use the table
handleShiftClickRangeRef.current = useCallback(
  (startIndex: number, endIndex: number) => {
    const rows = table.getRowModel().rows;
    const start = Math.min(startIndex, endIndex);
    const end = Math.max(startIndex, endIndex);

    // Check if all items in range are already selected
    let allSelected = true;
    for (let i = start; i <= end; i++) {
      const row = rows[i];
      if (row && !rowSelection[row.id]) {
        allSelected = false;
        break;
      }
    }

    // Toggle: if all selected, deselect; otherwise select all
    setRowSelection((prev) => {
      const newSelection = { ...prev };
      for (let i = start; i <= end; i++) {
        const row = rows[i];
        if (row) {
          if (allSelected) {
            delete newSelection[row.id];
          } else {
            newSelection[row.id] = true;
          }
        }
      }
      return newSelection;
    });
  },
  [table, rowSelection, setRowSelection],
);
```

## Step 11: Complete LLM Prompt Example

Here's a complete, ready-to-use prompt for an LLM:

```markdown
# Task: Port Select Range Feature to Transaction Table

## Context
I need to implement shift-click range selection for a transaction table. The feature allows users to:
1. Click a checkbox to select a row (tracks the index)
2. Shift+click another checkbox to select/deselect all rows in the range
3. Toggle behavior: if all rows in range are selected, deselect them; otherwise select all

## Current Codebase Analysis

### State Management
[Run: grep -E "zustand|redux|recoil|jotai" apps/dashboard/package.json]
[Run: grep -r "from ['\"]zustand['\"]" apps/dashboard/src --include="*.ts" --include="*.tsx" | head -5]

**Findings:**
- State management library: [Zustand/Redux/Context/Other/None]
- Current selection state location: [file path]

### Table Library
[Run: grep -E "@tanstack/react-table|react-table|ag-grid|react-data-grid" apps/dashboard/package.json]
[Run: grep -r "@tanstack/react-table" apps/dashboard/src --include="*.ts" --include="*.tsx" | head -5]

**Findings:**
- Table library: [@tanstack/react-table/Custom/Other]
- Current selection implementation: [description]

## Files to Modify

1. **State Management File**: [path to store/context/reducer]
   - Current content: [include relevant sections]
   - Need to add: `lastClickedIndex` tracking

2. **Type Definitions**: [path to type definitions]
   - Current content: [include relevant sections]
   - Need to add: Type extensions for range selection

3. **Table Component**: [path to data-table component]
   - Current content: [include relevant sections]
   - Need to add: Range selection handler

4. **Column Definitions**: [path to columns file]
   - Current content: [include relevant sections]
   - Need to add: Shift-click handler to SelectCell

## Reference Implementation

The upstream implementation (commit `8aff01d15`) uses:
- Zustand for state management
- @tanstack/react-table for table functionality
- useRef + useCallback pattern for range handler

[Include the code snippets from Step 10 above]

## Implementation Requirements

1. **State Management**: Add `lastClickedIndex: number | null` and setter function
2. **Type Definitions**: Extend table meta interface with range selection properties
3. **SelectCell**: Wrap checkbox in div with onClick handler that detects `e.shiftKey`
4. **Range Handler**: Implement `handleShiftClickRange` function with toggle logic
5. **Integration**: Connect all pieces together in the table component

## Adaptation Notes

- If not using Zustand: Adapt the store pattern to [YOUR_STATE_MANAGEMENT]
- If not using Tanstack: Adapt the table meta pattern to [YOUR_TABLE_LIBRARY]
- Core range calculation logic should remain the same regardless of library

## Expected Behavior

1. User clicks checkbox on row 5 → row 5 selected, `lastClickedIndex = 5`
2. User shift+clicks checkbox on row 10 → rows 5-10 all selected
3. User shift+clicks checkbox on row 10 again → rows 5-10 all deselected (toggle)
4. Works in reverse: click row 10, shift+click row 5 → same result

## Testing Checklist

- [ ] Basic range selection works
- [ ] Reverse range selection works
- [ ] Toggle deselection works
- [ ] Partial range selection works
- [ ] Edge cases handled (no prior click, same row, etc.)
- [ ] No conflicts with existing selection features
- [ ] TypeScript types are correct
- [ ] No console errors or warnings

Please implement this feature following the patterns above, adapting as needed for the current codebase structure.
```

## Step 12: Quick Reference Commands

```bash
# 1. Fetch upstream changes
git fetch upstream

# 2. View the feature commit
git show 8aff01d15

# 3. Check current dependencies
grep -E "zustand|@tanstack/react-table" apps/dashboard/package.json

# 4. Verify library usage
grep -r "zustand" apps/dashboard/src --include="*.ts" --include="*.tsx" | wc -l
grep -r "@tanstack/react-table" apps/dashboard/src --include="*.ts" --include="*.tsx" | wc -l

# 5. Install dependencies (if needed)
cd apps/dashboard && bun add zustand @tanstack/react-table

# 6. View current transaction store
cat apps/dashboard/src/store/transactions.ts

# 7. View current table component
cat apps/dashboard/src/components/tables/transactions/data-table.tsx

# 8. View current column definitions
cat apps/dashboard/src/components/tables/transactions/columns.tsx
```
