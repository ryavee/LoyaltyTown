# Frontend Standardization Audit

This document defines the current LoyaltyTown frontend design-system contract.

## Enterprise Source Of Truth

Use `src/Components/enterprise` for all new enterprise UI:

- Layout: `PageSection`, `ResponsiveGrid`
- Tables: `EnterpriseDataTable`
- Forms: `ReusableFormLayout`, `TextInput`, `Textarea`, `Select`, `MultiSelect`, `DatePicker`, `DateRangePicker`
- Actions: `PageToolbar`, `ActionBar`, `ImportButton`, `ExportButton`, `RefreshButton`
- Feedback: `EmptyState`, `ErrorState`, `LoadingSkeleton`, `LoadingSpinner`, `NotificationToast`
- Overlays: `Modal`, `Drawer`, `ConfirmationDialog`, `DeleteDialog`, `SuccessDialog`
- Navigation surfaces: `Tabs`, `Timeline`, `ActivityFeed`, `DetailsPanel`
- Security wrappers: `PermissionWrapper`, `RoleWrapper`, `FeatureFlagWrapper`

## Current Enforcement

- Enterprise shell routes are lazy-loaded through `src/Routes/EnterpriseRoutes.jsx`.
- App-level loading and error states are centralized in `src/App.jsx` and `RouteErrorBoundary`.
- Active enterprise workspace tables use `EnterpriseDataTable`.
- Legacy compatibility wrappers now delegate to enterprise primitives:
  - `src/Components/Reusable/Modal.jsx`
  - `src/Components/ConfirmationModal.jsx`
  - `src/Components/Reusable/LoadingSpinner.jsx`
  - `src/Components/cards/StatCard.jsx`
  - `src/Components/ui/Badge.jsx`

## Remaining Legacy Areas

These files predate the enterprise shell and still contain local page-specific UI, service-backed behavior, or light-theme styling. They should be migrated only when those legacy routes are actively retired or rebuilt:

- `src/pages/Products.jsx`
- `src/pages/Customers.jsx`
- `src/pages/CustomerWalletPage.tsx`
- `src/pages/Dashboard.jsx`
- `src/pages/QRGeneration.jsx`
- `src/pages/QRBatches.jsx`
- `src/pages/QRCodes.jsx`
- `src/pages/QRTrack.jsx`
- `src/pages/ManageTickets.jsx`
- `src/pages/users/*`
- `src/pages/dealers/*`
- `src/pages/distributors/*`
- `src/pages/campaigns/*`
- `src/Components/customer/*`
- `src/Components/QR/QRUi.jsx`
- `src/Components/Reusable/Pagination.jsx`

Public acquisition and scan pages may keep a distinct branded/mobile visual language, but shared primitives should still be used for repeated feedback, modal, form, and loading states where practical.

## Rules For Future Pages

1. Use `EnterpriseLayout` for authenticated app pages.
2. Include `AppBreadcrumbs` and a single page-level `h1`.
3. Use `PageToolbar` for title/actions when building new generic pages.
4. Use `EnterpriseDataTable` for every data grid/table.
5. Use `ReusableFormLayout` and enterprise form controls for every form.
6. Use enterprise `Modal`, `Drawer`, and dialog components only.
7. Use semantic controls with visible focus states.
8. Use slate/cyan enterprise dark theme tokens; avoid hard-coded legacy hex colors in app-shell pages.
9. Keep animations on enterprise utility classes and honor `prefers-reduced-motion`.
10. Do not create new duplicate primitive components.
