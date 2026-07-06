# Frontend Component Index

## Enterprise Design System

Canonical imports should come from `src/Components/enterprise`.

### Actions

- `ActionBar`
- `ExportButton`
- `ImportButton`
- `PageToolbar`
- `RefreshButton`

### Cards and Dashboards

- `ChartCard`
- `DashboardWidget`
- `KPIGrid`
- `KpiCard`
- `StatisticsCards`

### Data

- `EnterpriseDataTable`
- `EnterpriseTable`
- `ColumnVisibility`
- `Pagination`

### Feedback

- `ConfirmationDialog`
- `DeleteDialog`
- `EmptyState`
- `ErrorState`
- `LoadingSkeleton`
- `NoDataIllustration`
- `NotificationToast`
- `SuccessDialog`
- `RouteErrorBoundary`

### Filters and Search

- `AdvancedFilters`
- `DateRangeFilter`
- `EnterpriseSearchBar`
- `MultiSelectFilter`
- `StatusFilter`

### Forms

- `ReusableFormLayout`
- `Stepper`
- `Wizard`
- `WizardStepper`
- Form primitives from `FormControls`
- Choice primitives from `ChoiceControls`

### Layout

- `PageSection`
- `ResponsiveGrid`

### Overlays

- `ActivityFeed`
- `DetailsPanel`
- `Drawer`
- `Tabs`
- `Timeline`

### Primitives

- `AlertDialog`
- `Avatar`
- `Badge`
- `EnterpriseButton`
- `PrimaryButton`
- `SecondaryButton`
- `IconButton`
- `Dropdown`
- `LoadingSpinner`
- `Modal`
- `Popover`
- `Tooltip`

### Security Wrappers

- `FeatureFlagWrapper`
- `PermissionWrapper`
- `RoleWrapper`

### Uploads and Documents

- `DocumentPreview`
- `DocumentViewer`
- `FileUpload`
- `ImageUpload`

## Shell Components

- `EnterpriseLayout`
- `EnterpriseHeader`
- `EnterpriseSidebar`
- `AppBreadcrumbs`
- `RequireAuth`

## Public Consumer Components

- `ConsumerMobileLayout`
- `ConsumerStatusBadge`
- `ConsumerCards`
- Public scan components in `src/Components/PublicScan`

## Legacy Components

Legacy components remain available for compatibility:

- `src/Components/Reusable/*`
- `src/Components/ui/*`
- `src/Components/customer/*`
- Older module-specific JSX components

New enterprise work should not introduce additional legacy-style components.
