# LoyaltyTown Frontend Architecture

## Stack

- React
- TypeScript where supported by the project
- Vite
- Tailwind CSS
- React Router
- Lucide Icons
- Recharts
- Static demo data for current frontend-only sprints

## Application Entry

- `src/main.jsx` mounts the app.
- `src/App.jsx` owns public routes, enterprise layout route nesting, suspense fallback, auth provider, and route error boundary.
- `src/Routes/EnterpriseRoutes.jsx` owns enterprise route registration and lazy workspace loading.

## Layout

- Enterprise shell: `src/Components/Layout/EnterpriseLayout.jsx`
- Header: `src/Components/Layout/header/EnterpriseHeader.jsx`
- Sidebar: `src/Components/Layout/sidebar/EnterpriseSidebar.jsx`
- Breadcrumbs: `src/Components/breadcrumbs/AppBreadcrumbs.jsx`
- Sidebar config: `src/constants/sidebar.ts`

## Module Pattern

Each enterprise module should follow this pattern:

- Workspace file in `src/pages/<domain>/<Workspace>.tsx`
- Reusable module components in `src/pages/<domain>/components`
- Static demo data in `src/data/<domain>`
- Route mapping in `src/Routes/EnterpriseRoutes.jsx`
- Design-system imports from `src/Components/enterprise`

## Data Boundary

Current frontend sprints intentionally do not call backend APIs. Static data lives in `src/data`. Existing legacy services under `src/services` are not part of the new static sprint modules.

## Code Splitting

Enterprise route workspaces use `React.lazy`. Keep new major modules lazy-loaded at route level.

## Error Handling

Route-level rendering is wrapped by `RouteErrorBoundary`. Page-level loading, empty, and error states should use the enterprise feedback components.

## Routing Notes

Route aliases are preserved because earlier sprint requirements introduced overlapping business routes. Do not remove aliases without product approval and navigation QA.

## Quality Gates

- `npm run build`
- Route lint for route registry: `npx eslint src/Routes/EnterpriseRoutes.jsx`
- Static module API scan when adding frontend-only modules: search for `axios` and `fetch(`
- Manual responsive QA for desktop, laptop, tablet, and mobile breakpoints

## Future Hardening

- Add TypeScript-aware ESLint configuration before enforcing TS lint across the repo.
- Create route manifest tests once route ownership is finalized.
- Add visual regression screenshots for shell, dashboard, table, form, dialog, drawer, and mobile consumer views.
