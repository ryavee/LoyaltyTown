# Route Index

Canonical route registration is in `src/Routes/EnterpriseRoutes.jsx`. Public routes are in `src/App.jsx`.

## Public Routes

- `/`
- `/login`
- `/register`
- `/landing`
- `/register-company`
- `/checkout`
- `/forgot-password`
- `/public-scan`
- `/scan/:code`
- `/verify/:code`
- `/product-verification`
- `/reward`
- `/error`
- `/consumer-wallet`
- `/consumer-profile`
- `/consumer-support`
- `/consumer-referral`
- `/consumer-offers`
- `/consumer-app/*`

## Enterprise Home and Account

- `/dashboard`
- `/executive-dashboard`
- `/profile`
- `/preferences`
- `/devices`
- `/sessions`
- `/2fa`
- `/password`
- `/api-tokens`
- `/activity-log`

## Manufacturing and Product Cloud

- `/products`, `/products/create`, `/products/:id`, `/products/:id/edit`, `/products/:id/clone`, `/products/import`, `/products/export`
- `/categories`, `/categories/create`, `/categories/:id`, `/categories/:id/edit`
- `/brands`, `/brands/create`, `/brands/:id`, `/brands/:id/edit`
- `/skus`, `/skus/create`, `/skus/:id`, `/skus/:id/edit`
- `/batch-management/*`
- `/factory`, `/factory/create`, `/factory/:id`, `/factory/:id/edit`, `/factory/*`
- `/production-orders/*`
- `/production-lines/*`
- `/machines/*`
- `/operators/*`
- `/shifts/*`
- `/quality-control/*`
- `/rejected-products`
- `/scrapped-batches`

## Warehouse and Inventory

- `/warehouse/*`
- `/warehouses/*`
- `/inbound`
- `/outbound`
- `/inventory`
- `/inventory/*`
- `/locations`
- `/bins`
- `/transfers`
- `/stock-count`
- `/cycle-count`
- `/adjustments`
- `/dispatch`
- `/returns`

## QR Platform

- `/qr`
- `/qr/batches`, `/qr/batches/create`, `/qr/batches/:id`, `/qr/batches/:id/edit`
- `/qr/generate`
- `/qr/codes`, `/qr/codes/:id`
- `/gs1`
- `/aggregation`
- `/print`
- `/security`
- `/qr/analytics`
- `/qr-generation/*`

## Supply Chain

- Distributor, dealer, retailer, and contractor workspaces are registered through their explicit module routes and entity detail paths.
- Common roots include `/distributors`, `/dealers`, `/retailers`, `/contractors`, and related order, wallet, reward, return, project, support, and analytics aliases.

## Customers and Consumer Operations

- `/customers`, `/customers/create`, `/customers/:id`, `/customers/:id/edit`
- `/customer-360`
- `/customer-wallet`
- `/customer-rewards`
- `/customer-scans`
- `/customer-warranty`
- `/customer-referrals`

## CRM and Marketing

- `/crm`
- `/leads/*`
- `/accounts/*`
- `/contacts/*`
- `/opportunities/*`
- `/tasks`
- `/meetings`
- `/calendar`
- `/notes`
- `/crm-reports`
- `/campaigns/*`
- `/coupons`
- `/scratch-cards`
- `/spin-wheel`
- `/referral`
- `/landing-pages`
- `/forms`
- `/whatsapp`
- `/sms`
- `/email`
- `/automation`
- `/marketing/reports`
- `/notifications/*`

## Loyalty

- `/loyalty`
- `/points-engine/*`
- `/wallet`, `/wallet/:id`
- `/rewards-catalog/*`
- `/redemptions/*`
- `/cashback/*`
- `/membership-tiers/*`
- `/leaderboards`
- `/achievements`
- `/loyalty-analytics`

## Warranty and Service

- `/warranty/*`
- `/warranty-claims/*`
- `/service-requests/*`
- `/field-service`
- `/amc`
- `/rma`
- `/helpdesk`
- `/service-contracts`
- `/service-analytics`

## Finance and Billing

- `/finance`
- `/invoices/*`
- `/payments`
- `/subscriptions`
- `/subscription-plans`
- `/gst`
- `/payouts`
- `/expenses/*`
- `/accounting`
- `/finance-reports`

## Reports and BI

- `/reports`
- `/reports/catalog`
- `/reports/:id`
- `/business-intelligence`
- `/executive-analytics`
- `/export-center`
- `/scheduled-reports/*`
- `/report-builder`
- `/dashboard-builder`
- `/audit-reports`

## AI Platform

- `/ai`
- `/ai-dashboard`
- `/fraud-detection/*`
- `/counterfeit-detection`
- `/forecasting`
- `/demand-forecast`
- `/inventory-prediction`
- `/ocr`
- `/receipt-verification`
- `/customer-segmentation`
- `/recommendations`
- `/ai-assistant`
- `/ai-models/*`
- `/ai-reports`

## White Label and Tenant Administration

- `/tenants/*`
- `/branding`
- `/domains`
- `/mobile-branding`
- `/feature-flags`
- `/company-users`
- `/company-subscriptions`
- `/tenant-analytics`
- `/white-label-preview`

## Super Admin and Platform Operations

- `/super-admin`
- `/super-admin/companies`
- `/super-admin/companies/:id`
- `/super-admin/users`
- `/platform-billing`
- `/platform-health`
- `/api-monitoring`
- `/queues`
- `/deployments`
- `/platform-audit`
- `/security-center`
- `/platform-support`
- `/system-settings`
- `/backups`
- `/disaster-recovery`
- `/platform-analytics`

## Known Alias Duplicates

The following duplicate paths are intentionally preserved for sprint compatibility and route precedence:

- `/ai-assistant`
- `/ai-dashboard`
- `/branding`
- `/business-intelligence`
- `/counterfeit-detection`
- `/customers/create`
- `/feature-flags`
- `/forecasting`
- `/ocr`
- `/payments`
- `/platform-analytics`
- `/platform-support`
- `/recommendations`
- `/reports`
- `/subscriptions`
- `/wallet`
