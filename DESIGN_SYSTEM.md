# LoyaltyTown Design System

## Principles

- Enterprise-first: dense, scannable, operational interfaces.
- Dark theme by default.
- No decorative-only layout cards around whole page sections.
- Reusable components over module-specific primitives.
- Static demo data stays separate from UI.

## Tokens

Core runtime tokens are in `src/index.css`.

- Background: `#020617`
- Card surface: `#0f172a`
- Primary action: cyan
- Text primary: slate-50
- Text secondary: slate-400
- Border: slate-800
- Radius: `8px` panels, `6px` compact controls
- Motion: `180ms cubic-bezier(0.16, 1, 0.3, 1)`

## Canonical Components

New pages should import from `src/Components/enterprise`.

- Page header: `PageToolbar`
- KPI area: `KPIGrid`, `KpiCard`, `StatisticsCards`
- Cards/widgets: `DashboardWidget`, `ChartCard`
- Table: `EnterpriseDataTable`
- Search: `EnterpriseSearchBar`
- Filters: `AdvancedFilters`, `DateRangeFilter`, `StatusFilter`, `MultiSelectFilter`
- Forms: `ReusableFormLayout`, form primitives, `Stepper`, `Wizard`
- Feedback: `EmptyState`, `LoadingSkeleton`, `ErrorState`
- Overlays: `Modal`, `Drawer`, `AlertDialog`, `ConfirmationDialog`
- Security: `PermissionWrapper`, `RoleWrapper`, `FeatureFlagWrapper`

## Table Standard

`EnterpriseDataTable` is the standard table surface. It supports:

- Loading rows
- Empty state
- Row actions
- Optional row selection
- Optional bulk actions
- Sort affordances and `aria-sort`
- Column visibility through `visibleColumns`
- Import/export placeholder actions
- Pagination integration

## Form Standard

Forms should use:

- `ReusableFormLayout`
- Text input, textarea, select, multi select, date picker, toggle, checkbox, radio group primitives
- Sectioned layouts with short labels and contextual help
- Consistent primary/secondary action placement

## Feedback Standard

Every module surface should account for:

- Loading
- Empty
- Error
- Success
- Confirmation
- Delete confirmation

## Accessibility Standard

- All icon-only buttons need `aria-label`.
- Interactive table headers use `aria-sort`.
- Dialogs and drawers need clear titles.
- Inputs need visible labels or accessible labels.
- Focus states must remain visible.
- Reduced motion must be respected.

## Migration Rule

Legacy pages can remain for compatibility, but any touched page should migrate toward the enterprise component layer instead of creating another local table, modal, card, or form.
