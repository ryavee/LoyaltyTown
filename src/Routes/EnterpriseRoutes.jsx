import { lazy } from "react";
import { Route } from "react-router-dom";
import { enterpriseRoutes } from "../constants/sidebar";

const EnterpriseModulePage = lazy(() => import("../pages/EnterpriseModulePage"));
const AISprintWorkspace = lazy(() => import("../pages/ai/AISprintWorkspace"));
const AIPlatformWorkspace = lazy(() => import("../pages/ai/AIPlatformWorkspace"));
const AnalyticsWorkspace = lazy(() => import("../pages/analytics/AnalyticsWorkspace"));
const ExecutiveDashboard = lazy(() => import("../pages/analytics/ExecutiveDashboard"));
const ReportsWorkspace = lazy(() => import("../pages/analytics/ReportsWorkspace"));
const ReportsBIWorkspace = lazy(() => import("../pages/reports/ReportsBIWorkspace"));
const AccountSecurityWorkspace = lazy(() => import("../pages/account/AccountSecurityWorkspace"));
const CRMWorkspace = lazy(() => import("../pages/crm/CRMWorkspace"));
const BatchManagement = lazy(() => import("../pages/manufacturing/BatchManagement"));
const CatalogManagement = lazy(() => import("../pages/manufacturing/CatalogManagement"));
const EnterpriseQRPlatform = lazy(() => import("../pages/manufacturing/EnterpriseQRPlatform"));
const FactoryOperations = lazy(() => import("../pages/manufacturing/FactoryOperations"));
const FinanceWorkspace = lazy(() => import("../pages/finance/FinanceWorkspace"));
const InventoryIntelligence = lazy(() => import("../pages/manufacturing/InventoryIntelligence"));
const ManufacturerDashboard = lazy(() => import("../pages/manufacturer/ManufacturerDashboard"));
const ProductManagement = lazy(() => import("../pages/manufacturing/ProductManagement"));
const WarehouseOperations = lazy(() => import("../pages/manufacturing/WarehouseOperations"));
const WhiteLabelWorkspace = lazy(() => import("../pages/whitelabel/WhiteLabelWorkspace"));
const LoyaltyWorkspace = lazy(() => import("../pages/loyalty/LoyaltyWorkspace"));
const MarketingAutomation = lazy(() => import("../pages/marketing/MarketingAutomation"));
const NotificationsWorkspace = lazy(() => import("../pages/marketing/NotificationsWorkspace"));
const AdministrationSettings = lazy(() => import("../pages/settings/AdministrationSettings"));
const BrandingWorkspace = lazy(() => import("../pages/settings/BrandingWorkspace"));
const CustomerExperience = lazy(() => import("../pages/customers/CustomerExperience"));
const ServiceManagement = lazy(() => import("../pages/service/ServiceManagement"));
const SupportCenter = lazy(() => import("../pages/support/SupportCenter"));
const PlatformOperations = lazy(() => import("../pages/super-admin/PlatformOperations"));
const SuperAdminPlatform = lazy(() => import("../pages/platform/SuperAdminPlatform"));
const ContractorOperations = lazy(() => import("../pages/supply-chain/ContractorOperations"));
const DealerOperations = lazy(() => import("../pages/supply-chain/DealerOperations"));
const DistributorOperations = lazy(() => import("../pages/supply-chain/DistributorOperations"));
const RetailOperations = lazy(() => import("../pages/supply-chain/RetailOperations"));

const getRouteElement = (route) => {
  if ((route.id === "dashboard" || route.id === "executive-dashboard") && route.mode === "list") {
    return <ExecutiveDashboard />;
  }

  return <EnterpriseModulePage route={route} />;
};

const EnterpriseRoutes = () =>
  [
    <Route key="manufacturer-dashboard" path="/dashboard" element={<ManufacturerDashboard />} />,
    <Route key="account-profile" path="/profile" element={<AccountSecurityWorkspace mode="profile" />} />,
    <Route key="account-preferences" path="/preferences" element={<AccountSecurityWorkspace mode="preferences" />} />,
    <Route key="account-devices" path="/devices" element={<AccountSecurityWorkspace mode="devices" />} />,
    <Route key="account-sessions" path="/sessions" element={<AccountSecurityWorkspace mode="sessions" />} />,
    <Route key="account-2fa" path="/2fa" element={<AccountSecurityWorkspace mode="2fa" />} />,
    <Route key="account-password" path="/password" element={<AccountSecurityWorkspace mode="password" />} />,
    <Route key="account-api-tokens" path="/api-tokens" element={<AccountSecurityWorkspace mode="api-tokens" />} />,
    <Route key="account-activity-log" path="/activity-log" element={<AccountSecurityWorkspace mode="activity-log" />} />,
    <Route key="ai-sprint-root" path="/ai" element={<AISprintWorkspace mode="dashboard" />} />,
    <Route key="ai-sprint-dashboard" path="/ai-dashboard" element={<AISprintWorkspace mode="dashboard" />} />,
    <Route key="ai-sprint-fraud" path="/fraud-detection" element={<AISprintWorkspace mode="fraud" />} />,
    <Route key="ai-sprint-fraud-detail" path="/fraud-detection/:id" element={<AISprintWorkspace mode="fraud-details" />} />,
    <Route key="ai-sprint-counterfeit" path="/counterfeit-detection" element={<AISprintWorkspace mode="counterfeit" />} />,
    <Route key="ai-sprint-forecasting" path="/forecasting" element={<AISprintWorkspace mode="forecasting" />} />,
    <Route key="ai-sprint-demand-forecast" path="/demand-forecast" element={<AISprintWorkspace mode="forecasting" />} />,
    <Route key="ai-sprint-inventory-prediction" path="/inventory-prediction" element={<AISprintWorkspace mode="inventory-prediction" />} />,
    <Route key="ai-sprint-ocr" path="/ocr" element={<AISprintWorkspace mode="ocr" />} />,
    <Route key="ai-sprint-receipt-verification" path="/receipt-verification" element={<AISprintWorkspace mode="ocr" />} />,
    <Route key="ai-sprint-customer-segmentation" path="/customer-segmentation" element={<AISprintWorkspace mode="segmentation" />} />,
    <Route key="ai-sprint-recommendations" path="/recommendations" element={<AISprintWorkspace mode="recommendations" />} />,
    <Route key="ai-sprint-assistant" path="/ai-assistant" element={<AISprintWorkspace mode="assistant" />} />,
    <Route key="ai-sprint-models" path="/ai-models" element={<AISprintWorkspace mode="models" />} />,
    <Route key="ai-sprint-model-details" path="/ai-models/:id" element={<AISprintWorkspace mode="model-details" />} />,
    <Route key="ai-sprint-reports" path="/ai-reports" element={<AISprintWorkspace mode="reports" />} />,
    <Route key="finance-dashboard-root" path="/finance" element={<FinanceWorkspace mode="dashboard" />} />,
    <Route key="finance-invoices" path="/invoices" element={<FinanceWorkspace mode="invoices" />} />,
    <Route key="finance-invoices-create" path="/invoices/create" element={<FinanceWorkspace mode="invoice-create" />} />,
    <Route key="finance-invoices-detail" path="/invoices/:id" element={<FinanceWorkspace mode="invoice-details" />} />,
    <Route key="finance-payments" path="/payments" element={<FinanceWorkspace mode="payments" />} />,
    <Route key="finance-payments-nested" path="/finance/payments" element={<FinanceWorkspace mode="payments" />} />,
    <Route key="finance-subscriptions" path="/subscriptions" element={<FinanceWorkspace mode="subscriptions" />} />,
    <Route key="finance-subscriptions-nested" path="/finance/subscriptions" element={<FinanceWorkspace mode="subscriptions" />} />,
    <Route key="finance-subscription-plans" path="/subscription-plans" element={<FinanceWorkspace mode="plans" />} />,
    <Route key="finance-gst" path="/gst" element={<FinanceWorkspace mode="gst" />} />,
    <Route key="finance-payouts" path="/payouts" element={<FinanceWorkspace mode="payouts" />} />,
    <Route key="finance-expenses" path="/expenses" element={<FinanceWorkspace mode="expenses" />} />,
    <Route key="finance-expenses-create" path="/expenses/create" element={<FinanceWorkspace mode="expense-create" />} />,
    <Route key="finance-accounting" path="/accounting" element={<FinanceWorkspace mode="accounting" />} />,
    <Route key="finance-reports" path="/finance-reports" element={<FinanceWorkspace mode="reports" />} />,
    <Route key="reports-bi-dashboard" path="/reports" element={<ReportsBIWorkspace mode="dashboard" />} />,
    <Route key="reports-bi-catalog" path="/reports/catalog" element={<ReportsBIWorkspace mode="catalog" />} />,
    <Route key="reports-bi-detail" path="/reports/:id" element={<ReportsBIWorkspace mode="detail" />} />,
    <Route key="reports-business-intelligence" path="/business-intelligence" element={<ReportsBIWorkspace mode="business-intelligence" />} />,
    <Route key="reports-executive-analytics" path="/executive-analytics" element={<ReportsBIWorkspace mode="executive-analytics" />} />,
    <Route key="reports-export-center" path="/export-center" element={<ReportsBIWorkspace mode="export-center" />} />,
    <Route key="reports-scheduled-root" path="/scheduled-reports" element={<ReportsBIWorkspace mode="scheduled" />} />,
    <Route key="reports-scheduled-create" path="/scheduled-reports/create" element={<ReportsBIWorkspace mode="scheduled-create" />} />,
    <Route key="reports-scheduled-detail" path="/scheduled-reports/:id" element={<ReportsBIWorkspace mode="scheduled-detail" />} />,
    <Route key="reports-builder" path="/report-builder" element={<ReportsBIWorkspace mode="report-builder" />} />,
    <Route key="reports-dashboard-builder" path="/dashboard-builder" element={<ReportsBIWorkspace mode="dashboard-builder" />} />,
    <Route key="reports-audit" path="/audit-reports" element={<ReportsBIWorkspace mode="audit" />} />,
    <Route key="wl-tenants" path="/tenants" element={<WhiteLabelWorkspace mode="tenants" />} />,
    <Route key="wl-tenants-create" path="/tenants/create" element={<WhiteLabelWorkspace mode="tenant-create" />} />,
    <Route key="wl-tenants-detail" path="/tenants/:id" element={<WhiteLabelWorkspace mode="tenant-details" />} />,
    <Route key="wl-tenants-edit" path="/tenants/:id/edit" element={<WhiteLabelWorkspace mode="tenant-edit" />} />,
    <Route key="wl-branding" path="/branding" element={<WhiteLabelWorkspace mode="branding" />} />,
    <Route key="wl-domains" path="/domains" element={<WhiteLabelWorkspace mode="domains" />} />,
    <Route key="wl-mobile-branding" path="/mobile-branding" element={<WhiteLabelWorkspace mode="mobile-branding" />} />,
    <Route key="wl-feature-flags" path="/feature-flags" element={<WhiteLabelWorkspace mode="features" />} />,
    <Route key="wl-company-users" path="/company-users" element={<WhiteLabelWorkspace mode="company-users" />} />,
    <Route key="wl-company-subscriptions" path="/company-subscriptions" element={<WhiteLabelWorkspace mode="subscriptions" />} />,
    <Route key="wl-subscriptions" path="/subscriptions" element={<WhiteLabelWorkspace mode="subscriptions" />} />,
    <Route key="wl-analytics" path="/tenant-analytics" element={<WhiteLabelWorkspace mode="analytics" />} />,
    <Route key="wl-preview" path="/white-label-preview" element={<WhiteLabelWorkspace mode="preview" />} />,
    <Route key="platform-sprint-dashboard" path="/super-admin" element={<SuperAdminPlatform mode="dashboard" />} />,
    <Route key="platform-sprint-companies" path="/super-admin/companies" element={<SuperAdminPlatform mode="companies" />} />,
    <Route key="platform-sprint-company-details" path="/super-admin/companies/:id" element={<SuperAdminPlatform mode="company-details" />} />,
    <Route key="platform-sprint-users" path="/super-admin/users" element={<SuperAdminPlatform mode="users" />} />,
    <Route key="platform-sprint-billing" path="/platform-billing" element={<SuperAdminPlatform mode="billing" />} />,
    <Route key="platform-sprint-health" path="/platform-health" element={<SuperAdminPlatform mode="health" />} />,
    <Route key="platform-sprint-api" path="/api-monitoring" element={<SuperAdminPlatform mode="api" />} />,
    <Route key="platform-sprint-queues" path="/queues" element={<SuperAdminPlatform mode="queues" />} />,
    <Route key="platform-sprint-deployments" path="/deployments" element={<SuperAdminPlatform mode="deployments" />} />,
    <Route key="platform-sprint-audit" path="/platform-audit" element={<SuperAdminPlatform mode="audit" />} />,
    <Route key="platform-sprint-security" path="/security-center" element={<SuperAdminPlatform mode="security" />} />,
    <Route key="platform-sprint-support" path="/platform-support" element={<SuperAdminPlatform mode="support" />} />,
    <Route key="platform-sprint-settings" path="/system-settings" element={<SuperAdminPlatform mode="settings" />} />,
    <Route key="platform-sprint-backups" path="/backups" element={<SuperAdminPlatform mode="backups" />} />,
    <Route key="platform-sprint-disaster" path="/disaster-recovery" element={<SuperAdminPlatform mode="disaster-recovery" />} />,
    <Route key="platform-sprint-analytics" path="/platform-analytics" element={<SuperAdminPlatform mode="analytics" />} />,
    <Route key="support-tickets" path="/tickets" element={<SupportCenter mode="tickets" />} />,
    <Route key="support-knowledge-base" path="/knowledge-base" element={<SupportCenter mode="knowledge-base" />} />,
    <Route key="support-live-chat" path="/live-chat" element={<SupportCenter mode="live-chat" />} />,
    <Route key="support-faqs" path="/faqs" element={<SupportCenter mode="faqs" />} />,
    <Route key="support-sla-dashboard" path="/sla-dashboard" element={<SupportCenter mode="sla-dashboard" />} />,
    <Route key="support-customer-support" path="/customer-support" element={<SupportCenter mode="customer-support" />} />,
    <Route key="support-escalations" path="/escalations" element={<SupportCenter mode="escalations" />} />,
    <Route key="service-warranty-dashboard" path="/warranty" element={<ServiceManagement mode="warranty" />} />,
    <Route key="service-warranty-register" path="/warranty/register" element={<ServiceManagement mode="warranty-register" />} />,
    <Route key="service-warranty-details" path="/warranty/:id" element={<ServiceManagement mode="warranty-details" />} />,
    <Route key="service-warranty-claims" path="/warranty-claims" element={<ServiceManagement mode="claims" />} />,
    <Route key="service-warranty-claims-create" path="/warranty-claims/create" element={<ServiceManagement mode="claim-create" />} />,
    <Route key="service-warranty-claims-details" path="/warranty-claims/:id" element={<ServiceManagement mode="claim-details" />} />,
    <Route key="service-requests" path="/service-requests" element={<ServiceManagement mode="service-requests" />} />,
    <Route key="service-requests-create" path="/service-requests/create" element={<ServiceManagement mode="service-create" />} />,
    <Route key="service-field-service" path="/field-service" element={<ServiceManagement mode="field-service" />} />,
    <Route key="service-amc" path="/amc" element={<ServiceManagement mode="amc" />} />,
    <Route key="service-rma" path="/rma" element={<ServiceManagement mode="rma" />} />,
    <Route key="service-helpdesk" path="/helpdesk" element={<ServiceManagement mode="helpdesk" />} />,
    <Route key="service-contracts" path="/service-contracts" element={<ServiceManagement mode="service-contracts" />} />,
    <Route key="service-analytics" path="/service-analytics" element={<ServiceManagement mode="analytics" />} />,
    <Route key="notifications-root" path="/notifications" element={<NotificationsWorkspace mode="inbox" />} />,
    <Route key="notifications-inbox" path="/inbox" element={<NotificationsWorkspace mode="inbox" />} />,
    <Route key="notifications-inbox-nested" path="/notifications/inbox" element={<NotificationsWorkspace mode="inbox" />} />,
    <Route key="notifications-push" path="/push" element={<NotificationsWorkspace mode="push" />} />,
    <Route key="notifications-push-nested" path="/notifications/push" element={<NotificationsWorkspace mode="push" />} />,
    <Route key="notifications-email" path="/notifications/email" element={<NotificationsWorkspace mode="email" />} />,
    <Route key="notifications-sms" path="/notifications/sms" element={<NotificationsWorkspace mode="sms" />} />,
    <Route key="notifications-whatsapp" path="/notifications/whatsapp" element={<NotificationsWorkspace mode="whatsapp" />} />,
    <Route key="notifications-templates" path="/templates" element={<NotificationsWorkspace mode="templates" />} />,
    <Route key="notifications-templates-nested" path="/notifications/templates" element={<NotificationsWorkspace mode="templates" />} />,
    <Route key="notifications-automation" path="/notifications/automation" element={<NotificationsWorkspace mode="automation" />} />,
    <Route key="notifications-history" path="/notification-history" element={<NotificationsWorkspace mode="history" />} />,
    <Route key="notifications-history-nested" path="/notifications/history" element={<NotificationsWorkspace mode="history" />} />,
    <Route key="notifications-logs" path="/notification-logs" element={<NotificationsWorkspace mode="logs" />} />,
    <Route key="notifications-logs-nested" path="/notifications/logs" element={<NotificationsWorkspace mode="logs" />} />,
    <Route key="reports-root" path="/reports" element={<ReportsWorkspace mode="sales" />} />,
    <Route key="reports-sales" path="/reports/sales" element={<ReportsWorkspace mode="sales" />} />,
    <Route key="reports-dealer" path="/reports/dealer" element={<ReportsWorkspace mode="dealer" />} />,
    <Route key="reports-qr" path="/reports/qr" element={<ReportsWorkspace mode="qr" />} />,
    <Route key="reports-inventory" path="/reports/inventory" element={<ReportsWorkspace mode="inventory" />} />,
    <Route key="reports-campaign" path="/reports/campaign" element={<ReportsWorkspace mode="campaign" />} />,
    <Route key="reports-warranty" path="/reports/warranty" element={<ReportsWorkspace mode="warranty" />} />,
    <Route key="reports-financial" path="/reports/financial" element={<ReportsWorkspace mode="financial" />} />,
    <Route key="reports-export-pdf" path="/reports/export-pdf" element={<ReportsWorkspace mode="export-pdf" />} />,
    <Route key="reports-export-excel" path="/reports/export-excel" element={<ReportsWorkspace mode="export-excel" />} />,
    <Route key="reports-scheduled" path="/reports/scheduled" element={<ReportsWorkspace mode="scheduled" />} />,
    <Route key="distributor-payments-root" path="/payments" element={<DistributorOperations mode="payments" />} />,
    <Route key="platform-companies" path="/companies" element={<PlatformOperations mode="companies" />} />,
    <Route key="platform-subscriptions" path="/subscriptions" element={<PlatformOperations mode="subscriptions" />} />,
    <Route key="platform-plans" path="/plans" element={<PlatformOperations mode="plans" />} />,
    <Route key="platform-billing" path="/billing" element={<PlatformOperations mode="billing" />} />,
    <Route key="platform-revenue" path="/revenue" element={<PlatformOperations mode="revenue" />} />,
    <Route key="platform-users" path="/platform/users" element={<PlatformOperations mode="users" />} />,
    <Route key="platform-support" path="/super-admin/support" element={<PlatformOperations mode="support" />} />,
    <Route key="platform-support-short" path="/platform-support" element={<PlatformOperations mode="support" />} />,
    <Route key="platform-analytics-explicit" path="/platform-analytics" element={<PlatformOperations mode="platform-analytics" />} />,
    <Route key="platform-system-health" path="/system-health" element={<PlatformOperations mode="system-health" />} />,
    <Route key="platform-monitoring" path="/monitoring" element={<PlatformOperations mode="monitoring" />} />,
    <Route key="settings-users" path="/users" element={<AdministrationSettings mode="users" />} />,
    <Route key="settings-roles" path="/roles" element={<AdministrationSettings mode="roles" />} />,
    <Route key="settings-permissions" path="/permissions" element={<AdministrationSettings mode="permissions" />} />,
    <Route key="settings-departments" path="/departments" element={<AdministrationSettings mode="departments" />} />,
    <Route key="settings-smtp" path="/smtp" element={<AdministrationSettings mode="smtp" />} />,
    <Route key="settings-sms" path="/sms" element={<AdministrationSettings mode="sms" />} />,
    <Route key="settings-whatsapp" path="/whatsapp" element={<AdministrationSettings mode="whatsapp" />} />,
    <Route key="settings-payments-nested" path="/settings/payments" element={<AdministrationSettings mode="payments" />} />,
    <Route key="settings-payments" path="/payments" element={<AdministrationSettings mode="payments" />} />,
    <Route key="settings-taxes" path="/taxes" element={<AdministrationSettings mode="taxes" />} />,
    <Route key="settings-audit-logs" path="/audit-logs" element={<AdministrationSettings mode="audit-logs" />} />,
    <Route key="settings-api-keys" path="/api-keys" element={<AdministrationSettings mode="api-keys" />} />,
    <Route key="settings-integrations" path="/integrations" element={<AdministrationSettings mode="integrations" />} />,
    <Route key="branding-root" path="/branding" element={<BrandingWorkspace mode="branding" />} />,
    <Route key="branding-logo" path="/logo" element={<BrandingWorkspace mode="logo" />} />,
    <Route key="branding-theme" path="/theme" element={<BrandingWorkspace mode="theme" />} />,
    <Route key="branding-colors" path="/colors" element={<BrandingWorkspace mode="colors" />} />,
    <Route key="branding-domain" path="/domain" element={<BrandingWorkspace mode="domain" />} />,
    <Route key="branding-ssl" path="/ssl" element={<BrandingWorkspace mode="ssl" />} />,
    <Route key="branding-android" path="/android-branding" element={<BrandingWorkspace mode="android-branding" />} />,
    <Route key="branding-ios" path="/ios-branding" element={<BrandingWorkspace mode="ios-branding" />} />,
    <Route key="branding-feature-flags" path="/feature-flags" element={<BrandingWorkspace mode="feature-flags" />} />,
    <Route key="branding-customization" path="/customization" element={<BrandingWorkspace mode="customization" />} />,
    <Route key="branding-white-label" path="/white-label" element={<BrandingWorkspace mode="customization" />} />,
    <Route key="ai-dashboard-explicit" path="/ai-dashboard" element={<AIPlatformWorkspace mode="dashboard" />} />,
    <Route key="ai-forecasting" path="/forecasting" element={<AIPlatformWorkspace mode="forecasting" />} />,
    <Route key="ai-counterfeit-detection" path="/counterfeit-detection" element={<AIPlatformWorkspace mode="counterfeit-detection" />} />,
    <Route key="ai-ocr" path="/ocr" element={<AIPlatformWorkspace mode="ocr" />} />,
    <Route key="ai-recommendations" path="/recommendations" element={<AIPlatformWorkspace mode="recommendations" />} />,
    <Route key="ai-business-intelligence" path="/business-intelligence" element={<AIPlatformWorkspace mode="business-intelligence" />} />,
    <Route key="ai-chat-assistant" path="/chat-assistant" element={<AIPlatformWorkspace mode="chat" />} />,
    <Route key="ai-chat" path="/ai-chat" element={<AIPlatformWorkspace mode="chat" />} />,
    <Route key="ai-assistant-explicit" path="/ai-assistant" element={<AIPlatformWorkspace mode="chat" />} />,
    <Route key="ai-insights" path="/insights" element={<AIPlatformWorkspace mode="insights" />} />,
    <Route key="ai-platform-insights" path="/ai/insights" element={<AIPlatformWorkspace mode="insights" />} />,
    <Route key="analytics-executive-dashboard" path="/executive-dashboard" element={<ExecutiveDashboard />} />,
    <Route key="analytics-sales" path="/sales-analytics" element={<AnalyticsWorkspace mode="sales" />} />,
    <Route key="analytics-qr" path="/qr-analytics" element={<AnalyticsWorkspace mode="qr" />} />,
    <Route key="analytics-dealer" path="/dealer-analytics" element={<AnalyticsWorkspace mode="dealer" />} />,
    <Route key="analytics-distributor" path="/distributor-analytics" element={<AnalyticsWorkspace mode="distributor" />} />,
    <Route key="analytics-customer" path="/customer-analytics" element={<AnalyticsWorkspace mode="customer" />} />,
    <Route key="analytics-consumer" path="/consumer-analytics" element={<AnalyticsWorkspace mode="customer" />} />,
    <Route key="analytics-campaign" path="/campaign-analytics" element={<AnalyticsWorkspace mode="campaign" />} />,
    <Route key="analytics-inventory" path="/inventory-analytics" element={<AnalyticsWorkspace mode="inventory" />} />,
    <Route key="analytics-finance" path="/finance-analytics" element={<AnalyticsWorkspace mode="finance" />} />,
    <Route key="analytics-warranty" path="/warranty-analytics" element={<AnalyticsWorkspace mode="warranty" />} />,
    <Route key="loyalty-dashboard-root" path="/loyalty" element={<LoyaltyWorkspace mode="dashboard" />} />,
    <Route key="loyalty-dashboard-explicit" path="/loyalty/dashboard" element={<LoyaltyWorkspace mode="dashboard" />} />,
    <Route key="loyalty-rules" path="/loyalty/rules" element={<LoyaltyWorkspace mode="rules" />} />,
    <Route key="loyalty-rules-create" path="/loyalty/rules/create" element={<LoyaltyWorkspace mode="rules-create" />} />,
    <Route key="loyalty-rules-detail" path="/loyalty/rules/:id" element={<LoyaltyWorkspace mode="rules-details" />} />,
    <Route key="loyalty-wallet-explicit" path="/loyalty/wallet" element={<LoyaltyWorkspace mode="wallet" />} />,
    <Route key="loyalty-wallet-root" path="/wallet" element={<LoyaltyWorkspace mode="wallet" />} />,
    <Route key="loyalty-wallet-detail" path="/wallet/:id" element={<LoyaltyWorkspace mode="wallet-details" />} />,
    <Route key="loyalty-wallet-short" path="/wallet-management" element={<LoyaltyWorkspace mode="wallet" />} />,
    <Route key="loyalty-points" path="/points" element={<LoyaltyWorkspace mode="points" />} />,
    <Route key="loyalty-points-engine" path="/points-engine" element={<LoyaltyWorkspace mode="points" />} />,
    <Route key="loyalty-points-engine-create" path="/points-engine/create" element={<LoyaltyWorkspace mode="points-create" />} />,
    <Route key="loyalty-points-engine-detail" path="/points-engine/:id" element={<LoyaltyWorkspace mode="points-details" />} />,
    <Route key="loyalty-tier" path="/tier" element={<LoyaltyWorkspace mode="tier" />} />,
    <Route key="loyalty-membership-tiers" path="/membership-tiers" element={<LoyaltyWorkspace mode="tiers" />} />,
    <Route key="loyalty-membership-tiers-create" path="/membership-tiers/create" element={<LoyaltyWorkspace mode="tier-create" />} />,
    <Route key="loyalty-membership-tiers-detail" path="/membership-tiers/:id" element={<LoyaltyWorkspace mode="tier-details" />} />,
    <Route key="loyalty-leaderboard" path="/leaderboard" element={<LoyaltyWorkspace mode="leaderboard" />} />,
    <Route key="loyalty-leaderboards" path="/leaderboards" element={<LoyaltyWorkspace mode="leaderboards" />} />,
    <Route key="loyalty-catalog" path="/catalog" element={<LoyaltyWorkspace mode="catalog" />} />,
    <Route key="loyalty-rewards-catalog" path="/rewards-catalog" element={<LoyaltyWorkspace mode="catalog" />} />,
    <Route key="loyalty-rewards-catalog-create" path="/rewards-catalog/create" element={<LoyaltyWorkspace mode="reward-create" />} />,
    <Route key="loyalty-rewards-catalog-detail" path="/rewards-catalog/:id" element={<LoyaltyWorkspace mode="reward-details" />} />,
    <Route key="loyalty-redemption" path="/redemption" element={<LoyaltyWorkspace mode="redemption" />} />,
    <Route key="loyalty-redemptions" path="/redemptions" element={<LoyaltyWorkspace mode="redemptions" />} />,
    <Route key="loyalty-redemptions-detail" path="/redemptions/:id" element={<LoyaltyWorkspace mode="redemption-details" />} />,
    <Route key="loyalty-transactions" path="/transactions" element={<LoyaltyWorkspace mode="transactions" />} />,
    <Route key="loyalty-cashback" path="/cashback" element={<LoyaltyWorkspace mode="cashback" />} />,
    <Route key="loyalty-cashback-rules" path="/cashback/rules" element={<LoyaltyWorkspace mode="cashback-rules" />} />,
    <Route key="loyalty-cashback-payouts" path="/cashback/payouts" element={<LoyaltyWorkspace mode="cashback-payouts" />} />,
    <Route key="loyalty-gift-cards" path="/gift-cards" element={<LoyaltyWorkspace mode="gift-cards" />} />,
    <Route key="loyalty-achievements" path="/achievements" element={<LoyaltyWorkspace mode="achievements" />} />,
    <Route key="loyalty-analytics-explicit" path="/loyalty-analytics" element={<LoyaltyWorkspace mode="analytics" />} />,
    <Route key="loyalty-analytics-nested" path="/loyalty/analytics" element={<LoyaltyWorkspace mode="analytics" />} />,
    <Route key="marketing-dashboard-root" path="/marketing" element={<MarketingAutomation mode="dashboard" />} />,
    <Route key="marketing-dashboard-explicit" path="/marketing/dashboard" element={<MarketingAutomation mode="dashboard" />} />,
    <Route key="marketing-campaign-builder" path="/campaign-builder" element={<MarketingAutomation mode="campaign-builder" />} />,
    <Route key="marketing-campaigns" path="/campaigns" element={<MarketingAutomation mode="campaign-builder" />} />,
    <Route key="marketing-campaigns-create" path="/campaigns/create" element={<MarketingAutomation mode="campaign-create" />} />,
    <Route key="marketing-campaigns-detail" path="/campaigns/:id" element={<MarketingAutomation mode="campaign-details" />} />,
    <Route key="marketing-campaigns-edit" path="/campaigns/:id/edit" element={<MarketingAutomation mode="campaign-edit" />} />,
    <Route key="marketing-coupons" path="/coupons" element={<MarketingAutomation mode="coupons" />} />,
    <Route key="marketing-coupons-nested" path="/marketing/coupons" element={<MarketingAutomation mode="coupons" />} />,
    <Route key="marketing-scratch-cards" path="/scratch-cards" element={<MarketingAutomation mode="scratch-cards" />} />,
    <Route key="marketing-scratch-cards-nested" path="/marketing/scratch-cards" element={<MarketingAutomation mode="scratch-cards" />} />,
    <Route key="marketing-spin-wheel" path="/spin-wheel" element={<MarketingAutomation mode="spin-wheel" />} />,
    <Route key="marketing-spin-wheel-nested" path="/marketing/spin-wheel" element={<MarketingAutomation mode="spin-wheel" />} />,
    <Route key="marketing-referral" path="/referral" element={<MarketingAutomation mode="referral" />} />,
    <Route key="marketing-referrals" path="/referrals" element={<MarketingAutomation mode="referrals" />} />,
    <Route key="marketing-referral-program" path="/referral-program" element={<MarketingAutomation mode="referral" />} />,
    <Route key="marketing-landing-pages" path="/landing-pages" element={<MarketingAutomation mode="landing-pages" />} />,
    <Route key="marketing-forms" path="/forms" element={<MarketingAutomation mode="forms" />} />,
    <Route key="marketing-whatsapp-settings-alias" path="/marketing/whatsapp" element={<MarketingAutomation mode="whatsapp" />} />,
    <Route key="marketing-whatsapp-campaigns" path="/whatsapp-campaigns" element={<MarketingAutomation mode="whatsapp" />} />,
    <Route key="marketing-sms-settings-alias" path="/marketing/sms" element={<MarketingAutomation mode="sms" />} />,
    <Route key="marketing-sms-campaigns" path="/sms-campaigns" element={<MarketingAutomation mode="sms" />} />,
    <Route key="marketing-email" path="/email" element={<MarketingAutomation mode="email" />} />,
    <Route key="marketing-email-nested" path="/marketing/email" element={<MarketingAutomation mode="email" />} />,
    <Route key="marketing-email-campaigns" path="/email-campaigns" element={<MarketingAutomation mode="email" />} />,
    <Route key="marketing-push-nested" path="/marketing/push" element={<MarketingAutomation mode="push" />} />,
    <Route key="marketing-push-notifications" path="/push-notifications" element={<MarketingAutomation mode="push" />} />,
    <Route key="marketing-automation" path="/automation" element={<MarketingAutomation mode="automation" />} />,
    <Route key="marketing-customer-segments" path="/customer-segments" element={<MarketingAutomation mode="segments" />} />,
    <Route key="marketing-segments-nested" path="/marketing/segments" element={<MarketingAutomation mode="segments" />} />,
    <Route key="marketing-surveys" path="/surveys" element={<MarketingAutomation mode="surveys" />} />,
    <Route key="marketing-surveys-nested" path="/marketing/surveys" element={<MarketingAutomation mode="surveys" />} />,
    <Route key="marketing-feedback" path="/feedback" element={<MarketingAutomation mode="feedback" />} />,
    <Route key="marketing-feedback-nested" path="/marketing/feedback" element={<MarketingAutomation mode="feedback" />} />,
    <Route key="marketing-analytics-explicit" path="/marketing-analytics" element={<MarketingAutomation mode="analytics" />} />,
    <Route key="marketing-analytics-nested" path="/marketing/analytics" element={<MarketingAutomation mode="analytics" />} />,
    <Route key="marketing-reports" path="/marketing/reports" element={<MarketingAutomation mode="reports" />} />,
    <Route key="crm-dashboard-root" path="/crm" element={<CRMWorkspace mode="dashboard" />} />,
    <Route key="crm-leads" path="/leads" element={<CRMWorkspace mode="leads" />} />,
    <Route key="crm-leads-create" path="/leads/create" element={<CRMWorkspace mode="lead-create" />} />,
    <Route key="crm-leads-detail" path="/leads/:id" element={<CRMWorkspace mode="lead-details" />} />,
    <Route key="crm-leads-edit" path="/leads/:id/edit" element={<CRMWorkspace mode="lead-edit" />} />,
    <Route key="crm-accounts" path="/accounts" element={<CRMWorkspace mode="accounts" />} />,
    <Route key="crm-accounts-create" path="/accounts/create" element={<CRMWorkspace mode="account-create" />} />,
    <Route key="crm-accounts-detail" path="/accounts/:id" element={<CRMWorkspace mode="account-details" />} />,
    <Route key="crm-accounts-edit" path="/accounts/:id/edit" element={<CRMWorkspace mode="account-edit" />} />,
    <Route key="crm-contacts" path="/contacts" element={<CRMWorkspace mode="contacts" />} />,
    <Route key="crm-contacts-create" path="/contacts/create" element={<CRMWorkspace mode="contact-create" />} />,
    <Route key="crm-contacts-detail" path="/contacts/:id" element={<CRMWorkspace mode="contact-details" />} />,
    <Route key="crm-contacts-edit" path="/contacts/:id/edit" element={<CRMWorkspace mode="contact-edit" />} />,
    <Route key="crm-opportunities" path="/opportunities" element={<CRMWorkspace mode="opportunities" />} />,
    <Route key="crm-opportunities-create" path="/opportunities/create" element={<CRMWorkspace mode="opportunity-create" />} />,
    <Route key="crm-opportunities-detail" path="/opportunities/:id" element={<CRMWorkspace mode="opportunity-details" />} />,
    <Route key="crm-opportunities-edit" path="/opportunities/:id/edit" element={<CRMWorkspace mode="opportunity-edit" />} />,
    <Route key="crm-meetings" path="/meetings" element={<CRMWorkspace mode="meetings" />} />,
    <Route key="crm-tasks" path="/tasks" element={<CRMWorkspace mode="tasks" />} />,
    <Route key="crm-calendar" path="/calendar" element={<CRMWorkspace mode="calendar" />} />,
    <Route key="crm-activities" path="/activities" element={<CRMWorkspace mode="activities" />} />,
    <Route key="crm-pipeline" path="/pipeline" element={<CRMWorkspace mode="pipeline" />} />,
    <Route key="crm-notes" path="/notes" element={<CRMWorkspace mode="notes" />} />,
    <Route key="crm-files" path="/files" element={<CRMWorkspace mode="files" />} />,
    <Route key="crm-followups" path="/follow-ups" element={<CRMWorkspace mode="followups" />} />,
    <Route key="crm-reports-explicit" path="/crm-reports" element={<CRMWorkspace mode="reports" />} />,
    <Route key="customers-root" path="/customers" element={<CustomerExperience mode="list" />} />,
    <Route key="customers-dashboard-phase4" path="/customers/dashboard" element={<CustomerExperience mode="dashboard" />} />,
    <Route key="customers-create-root" path="/customers/create" element={<CustomerExperience mode="create" />} />,
    <Route key="customers-scans-detail-phase4" path="/customers/:id/scans" element={<CustomerExperience mode="scan-journey" />} />,
    <Route key="customers-wallet-detail-phase4" path="/customers/:id/wallet" element={<CustomerExperience mode="wallet-view" />} />,
    <Route key="customers-warranty-detail-phase4" path="/customers/:id/warranty" element={<CustomerExperience mode="warranty-view" />} />,
    <Route key="customers-rewards-detail-phase4" path="/customers/:id/rewards" element={<CustomerExperience mode="rewards-view" />} />,
    <Route key="customers-detail-root" path="/customers/:id" element={<CustomerExperience mode="details" />} />,
    <Route key="customers-edit-root" path="/customers/:id/edit" element={<CustomerExperience mode="edit" />} />,
    <Route key="customer-wallet-root" path="/customer-wallet" element={<CustomerExperience mode="wallet" />} />,
    <Route key="customer-rewards-root" path="/customer-rewards" element={<CustomerExperience mode="rewards" />} />,
    <Route key="customer-scans-root" path="/customer-scans" element={<CustomerExperience mode="scans" />} />,
    <Route key="customer-warranty-root" path="/customer-warranty" element={<CustomerExperience mode="warranty" />} />,
    <Route key="customer-referrals-root" path="/customer-referrals" element={<CustomerExperience mode="referrals" />} />,
    <Route key="customer-purchases-root" path="/customer-purchases" element={<CustomerExperience mode="purchases" />} />,
    <Route key="customer-support-root" path="/customer-support-portal" element={<CustomerExperience mode="support" />} />,
    <Route key="customer-analytics-root" path="/customer-analytics-dashboard" element={<CustomerExperience mode="analytics" />} />,
    <Route key="customers-list" path="/customers/list" element={<CustomerExperience mode="list" />} />,
    <Route key="customers-wallet" path="/customers/wallet" element={<CustomerExperience mode="wallet" />} />,
    <Route key="customers-rewards" path="/customers/rewards" element={<CustomerExperience mode="rewards" />} />,
    <Route key="customers-purchases" path="/customers/purchases" element={<CustomerExperience mode="purchases" />} />,
    <Route key="customers-scans" path="/customers/scans" element={<CustomerExperience mode="scans" />} />,
    <Route key="customers-referrals" path="/customers/referrals" element={<CustomerExperience mode="referrals" />} />,
    <Route key="customers-analytics" path="/customers/analytics" element={<CustomerExperience mode="analytics" />} />,
    <Route key="customers-warranty" path="/customers/warranty" element={<CustomerExperience mode="warranty" />} />,
    <Route key="customers-support" path="/customers/support" element={<CustomerExperience mode="support" />} />,
    <Route key="customers-history" path="/customers/history" element={<CustomerExperience mode="history" />} />,
    <Route key="customers-timeline" path="/customers/timeline" element={<CustomerExperience mode="timeline" />} />,
    <Route key="customers-create-explicit" path="/customers/create" element={<CustomerExperience mode="create" />} />,
    <Route key="customer-360-explicit" path="/customer-360" element={<CustomerExperience mode="customer-360" />} />,
    <Route key="customer-360-details" path="/customer-360/:id" element={<CustomerExperience mode="customer-360" />} />,
    <Route key="contractors-root" path="/contractors" element={<ContractorOperations mode="list" />} />,
    <Route key="contractors-dashboard-phase8" path="/contractors/dashboard" element={<ContractorOperations mode="dashboard" />} />,
    <Route key="contractors-create-root" path="/contractors/create" element={<ContractorOperations mode="create" />} />,
    <Route key="contractors-projects-detail-phase8" path="/contractors/:id/projects" element={<ContractorOperations mode="projects" />} />,
    <Route key="contractors-scans-detail-phase8" path="/contractors/:id/scans" element={<ContractorOperations mode="scans" />} />,
    <Route key="contractors-purchases-detail-phase8" path="/contractors/:id/purchases" element={<ContractorOperations mode="purchases" />} />,
    <Route key="contractors-wallet-detail-phase8" path="/contractors/:id/wallet" element={<ContractorOperations mode="wallet" />} />,
    <Route key="contractors-rewards-detail-phase8" path="/contractors/:id/rewards" element={<ContractorOperations mode="rewards" />} />,
    <Route key="contractors-training-detail-phase8" path="/contractors/:id/training" element={<ContractorOperations mode="training" />} />,
    <Route key="contractors-certificates-detail-phase8" path="/contractors/:id/certificates" element={<ContractorOperations mode="certificates" />} />,
    <Route key="contractors-referrals-detail-phase8" path="/contractors/:id/referrals" element={<ContractorOperations mode="referrals" />} />,
    <Route key="contractors-nearby-dealers-detail-phase8" path="/contractors/:id/nearby-dealers" element={<ContractorOperations mode="nearby-dealers" />} />,
    <Route key="contractors-warranty-detail-phase8" path="/contractors/:id/warranty" element={<ContractorOperations mode="warranty" />} />,
    <Route key="contractors-support-detail-phase8" path="/contractors/:id/support" element={<ContractorOperations mode="support" />} />,
    <Route key="contractors-documents-detail-phase8" path="/contractors/:id/documents" element={<ContractorOperations mode="documents" />} />,
    <Route key="contractors-audit-detail-phase8" path="/contractors/:id/audit" element={<ContractorOperations mode="audit" />} />,
    <Route key="contractors-detail-root" path="/contractors/:id" element={<ContractorOperations mode="details" />} />,
    <Route key="contractors-edit-root" path="/contractors/:id/edit" element={<ContractorOperations mode="edit" />} />,
    <Route key="contractor-projects-root" path="/contractor-projects" element={<ContractorOperations mode="projects" />} />,
    <Route key="contractor-projects-create" path="/contractor-projects/create" element={<ContractorOperations mode="project-create" />} />,
    <Route key="contractor-projects-detail" path="/contractor-projects/:id" element={<ContractorOperations mode="project-details" />} />,
    <Route key="contractor-scans-root" path="/contractor-scans" element={<ContractorOperations mode="scans" />} />,
    <Route key="contractor-purchases-root" path="/contractor-purchases" element={<ContractorOperations mode="purchases" />} />,
    <Route key="contractor-wallet-root" path="/contractor-wallet" element={<ContractorOperations mode="wallet" />} />,
    <Route key="contractor-rewards-root" path="/contractor-rewards" element={<ContractorOperations mode="rewards" />} />,
    <Route key="contractor-training-root" path="/training" element={<ContractorOperations mode="training" />} />,
    <Route key="contractor-certificates-root" path="/certificates" element={<ContractorOperations mode="certificates" />} />,
    <Route key="contractor-referrals-root" path="/contractor-referrals" element={<ContractorOperations mode="referrals" />} />,
    <Route key="nearby-dealers-root" path="/nearby-dealers" element={<ContractorOperations mode="nearby-dealers" />} />,
    <Route key="contractor-warranty-root" path="/contractor-warranty" element={<ContractorOperations mode="warranty" />} />,
    <Route key="contractor-support-root" path="/contractor-support" element={<ContractorOperations mode="support" />} />,
    <Route key="contractor-analytics-root" path="/contractor-analytics" element={<ContractorOperations mode="analytics" />} />,
    <Route key="contractors-projects" path="/contractors/projects" element={<ContractorOperations mode="projects" />} />,
    <Route key="contractors-invoices" path="/contractors/invoices" element={<ContractorOperations mode="invoices" />} />,
    <Route key="contractors-training" path="/contractors/training" element={<ContractorOperations mode="training" />} />,
    <Route key="contractors-certificates" path="/contractors/certificates" element={<ContractorOperations mode="certificates" />} />,
    <Route key="contractors-rewards" path="/contractors/rewards" element={<ContractorOperations mode="rewards" />} />,
    <Route key="contractors-wallet" path="/contractors/wallet" element={<ContractorOperations mode="wallet" />} />,
    <Route key="contractors-nearby-dealers" path="/contractors/nearby-dealers" element={<ContractorOperations mode="nearby-dealers" />} />,
    <Route key="contractors-warranty" path="/contractors/warranty" element={<ContractorOperations mode="warranty" />} />,
    <Route key="contractors-support" path="/contractors/support" element={<ContractorOperations mode="support" />} />,
    <Route key="contractors-analytics" path="/contractors/analytics" element={<ContractorOperations mode="analytics" />} />,
    <Route key="retailers-root" path="/retailers" element={<RetailOperations mode="list" />} />,
    <Route key="retailers-dashboard-phase7" path="/retailers/dashboard" element={<RetailOperations mode="dashboard" />} />,
    <Route key="retailers-create-root" path="/retailers/create" element={<RetailOperations mode="create" />} />,
    <Route key="retailers-sales-detail-phase7" path="/retailers/:id/sales" element={<RetailOperations mode="sales" />} />,
    <Route key="retailers-orders-detail-phase7" path="/retailers/:id/orders" element={<RetailOperations mode="orders" />} />,
    <Route key="retailers-inventory-detail-phase7" path="/retailers/:id/inventory" element={<RetailOperations mode="inventory" />} />,
    <Route key="retailers-customers-detail-phase7" path="/retailers/:id/customers" element={<RetailOperations mode="customers" />} />,
    <Route key="retailers-verification-detail-phase7" path="/retailers/:id/verification" element={<RetailOperations mode="verification" />} />,
    <Route key="retailers-warranty-detail-phase7" path="/retailers/:id/warranty" element={<RetailOperations mode="warranty" />} />,
    <Route key="retailers-wallet-detail-phase7" path="/retailers/:id/wallet" element={<RetailOperations mode="wallet" />} />,
    <Route key="retailers-rewards-detail-phase7" path="/retailers/:id/rewards" element={<RetailOperations mode="rewards" />} />,
    <Route key="retailers-offers-detail-phase7" path="/retailers/:id/offers" element={<RetailOperations mode="offers" />} />,
    <Route key="retailers-returns-detail-phase7" path="/retailers/:id/returns" element={<RetailOperations mode="returns" />} />,
    <Route key="retailers-documents-detail-phase7" path="/retailers/:id/documents" element={<RetailOperations mode="documents" />} />,
    <Route key="retailers-audit-detail-phase7" path="/retailers/:id/audit" element={<RetailOperations mode="audit" />} />,
    <Route key="retailers-detail-root" path="/retailers/:id" element={<RetailOperations mode="details" />} />,
    <Route key="retailers-edit-root" path="/retailers/:id/edit" element={<RetailOperations mode="edit" />} />,
    <Route key="retailer-inventory-root" path="/retailer-inventory" element={<RetailOperations mode="inventory" />} />,
    <Route key="retailer-inventory-detail" path="/retailer-inventory/:id" element={<RetailOperations mode="inventory-details" />} />,
    <Route key="retailer-orders-root" path="/retailer-orders" element={<RetailOperations mode="orders" />} />,
    <Route key="retailer-orders-create" path="/retailer-orders/create" element={<RetailOperations mode="order-create" />} />,
    <Route key="retailer-orders-detail" path="/retailer-orders/:id" element={<RetailOperations mode="order-details" />} />,
    <Route key="retailer-sales-root" path="/retailer-sales" element={<RetailOperations mode="sales" />} />,
    <Route key="retailer-sales-create" path="/retailer-sales/create" element={<RetailOperations mode="sale-create" />} />,
    <Route key="retailer-sales-detail" path="/retailer-sales/:id" element={<RetailOperations mode="sale-details" />} />,
    <Route key="retailer-customers-root" path="/retailer-customers" element={<RetailOperations mode="customers" />} />,
    <Route key="retailer-customers-create" path="/retailer-customers/create" element={<RetailOperations mode="customer-create" />} />,
    <Route key="retailer-customers-detail" path="/retailer-customers/:id" element={<RetailOperations mode="customer-details" />} />,
    <Route key="retailer-verification-root" path="/retailer-verification" element={<RetailOperations mode="verification" />} />,
    <Route key="retailer-warranty-root" path="/retailer-warranty" element={<RetailOperations mode="warranty" />} />,
    <Route key="retailer-wallet-root" path="/retailer-wallet" element={<RetailOperations mode="wallet" />} />,
    <Route key="retailer-rewards-root" path="/retailer-rewards" element={<RetailOperations mode="rewards" />} />,
    <Route key="retailer-offers-root" path="/retailer-offers" element={<RetailOperations mode="offers" />} />,
    <Route key="retailer-returns-root" path="/retailer-returns" element={<RetailOperations mode="returns" />} />,
    <Route key="retailer-returns-create" path="/retailer-returns/create" element={<RetailOperations mode="return-create" />} />,
    <Route key="retailer-returns-detail" path="/retailer-returns/:id" element={<RetailOperations mode="return-details" />} />,
    <Route key="retailers-sales" path="/retailers/sales" element={<RetailOperations mode="sales" />} />,
    <Route key="retailers-orders" path="/retailers/orders" element={<RetailOperations mode="orders" />} />,
    <Route key="retailers-customers" path="/retailers/customers" element={<RetailOperations mode="customers" />} />,
    <Route key="retailers-rewards" path="/retailers/rewards" element={<RetailOperations mode="rewards" />} />,
    <Route key="retailers-wallet" path="/retailers/wallet" element={<RetailOperations mode="wallet" />} />,
    <Route key="retailers-offers" path="/retailers/offers" element={<RetailOperations mode="offers" />} />,
    <Route key="retailers-warranty" path="/retailers/warranty" element={<RetailOperations mode="warranty" />} />,
    <Route key="retailers-returns" path="/retailers/returns" element={<RetailOperations mode="returns" />} />,
    <Route key="retailers-analytics" path="/retailers/analytics" element={<RetailOperations mode="analytics" />} />,
    <Route key="dealers-root" path="/dealers" element={<DealerOperations mode="list" />} />,
    <Route key="dealers-dashboard-phase5" path="/dealers/dashboard" element={<DealerOperations mode="dashboard" />} />,
    <Route key="dealers-create-root" path="/dealers/create" element={<DealerOperations mode="create" />} />,
    <Route key="dealers-orders-detail-phase5" path="/dealers/:id/orders" element={<DealerOperations mode="orders" />} />,
    <Route key="dealers-inventory-detail-phase5" path="/dealers/:id/inventory" element={<DealerOperations mode="inventory" />} />,
    <Route key="dealers-qr-detail-phase5" path="/dealers/:id/qr" element={<DealerOperations mode="qr" />} />,
    <Route key="dealers-wallet-detail-phase5" path="/dealers/:id/wallet" element={<DealerOperations mode="wallet" />} />,
    <Route key="dealers-rewards-detail-phase5" path="/dealers/:id/rewards" element={<DealerOperations mode="rewards" />} />,
    <Route key="dealers-customers-detail-phase5" path="/dealers/:id/customers" element={<DealerOperations mode="customers" />} />,
    <Route key="dealers-documents-detail-phase5" path="/dealers/:id/documents" element={<DealerOperations mode="documents" />} />,
    <Route key="dealers-audit-detail-phase5" path="/dealers/:id/audit" element={<DealerOperations mode="audit" />} />,
    <Route key="dealers-detail-root" path="/dealers/:id" element={<DealerOperations mode="details" />} />,
    <Route key="dealers-edit-root" path="/dealers/:id/edit" element={<DealerOperations mode="edit" />} />,
    <Route key="dealer-inventory-root" path="/dealer-inventory" element={<DealerOperations mode="inventory" />} />,
    <Route key="dealer-inventory-detail" path="/dealer-inventory/:id" element={<DealerOperations mode="inventory-details" />} />,
    <Route key="dealer-orders-root" path="/dealer-orders" element={<DealerOperations mode="orders" />} />,
    <Route key="dealer-orders-create" path="/dealer-orders/create" element={<DealerOperations mode="order-create" />} />,
    <Route key="dealer-orders-detail" path="/dealer-orders/:id" element={<DealerOperations mode="order-details" />} />,
    <Route key="dealer-customers-root" path="/dealer-customers" element={<DealerOperations mode="customers" />} />,
    <Route key="dealer-customers-create" path="/dealer-customers/create" element={<DealerOperations mode="customer-create" />} />,
    <Route key="dealer-customers-detail" path="/dealer-customers/:id" element={<DealerOperations mode="customer-details" />} />,
    <Route key="dealer-wallet-root" path="/dealer-wallet" element={<DealerOperations mode="wallet" />} />,
    <Route key="dealer-rewards-root" path="/dealer-rewards" element={<DealerOperations mode="rewards" />} />,
    <Route key="dealer-warranty-root" path="/dealer-warranty" element={<DealerOperations mode="warranty" />} />,
    <Route key="dealer-returns-root" path="/dealer-returns" element={<DealerOperations mode="returns" />} />,
    <Route key="dealer-returns-create" path="/dealer-returns/create" element={<DealerOperations mode="return-create" />} />,
    <Route key="dealer-returns-detail" path="/dealer-returns/:id" element={<DealerOperations mode="return-details" />} />,
    <Route key="dealer-projects-root" path="/dealer-projects" element={<DealerOperations mode="projects" />} />,
    <Route key="dealer-projects-create" path="/dealer-projects/create" element={<DealerOperations mode="project-create" />} />,
    <Route key="dealer-projects-detail" path="/dealer-projects/:id" element={<DealerOperations mode="project-details" />} />,
    <Route key="dealers-orders" path="/dealers/orders" element={<DealerOperations mode="orders" />} />,
    <Route key="dealers-inventory" path="/dealers/inventory" element={<DealerOperations mode="inventory" />} />,
    <Route key="dealers-wallet" path="/dealers/wallet" element={<DealerOperations mode="wallet" />} />,
    <Route key="dealers-rewards" path="/dealers/rewards" element={<DealerOperations mode="rewards" />} />,
    <Route key="dealers-customers" path="/dealers/customers" element={<DealerOperations mode="customers" />} />,
    <Route key="dealers-warranty" path="/dealers/warranty" element={<DealerOperations mode="warranty" />} />,
    <Route key="dealers-claims" path="/dealers/claims" element={<DealerOperations mode="claims" />} />,
    <Route key="dealers-returns" path="/dealers/returns" element={<DealerOperations mode="returns" />} />,
    <Route key="dealers-projects" path="/dealers/projects" element={<DealerOperations mode="projects" />} />,
    <Route key="dealers-support" path="/dealers/support" element={<DealerOperations mode="support" />} />,
    <Route key="dealers-analytics" path="/dealers/analytics" element={<DealerOperations mode="analytics" />} />,
    <Route key="dealers-leaderboard" path="/dealers/leaderboard" element={<DealerOperations mode="leaderboard" />} />,
    <Route key="dealers-ai-insights" path="/dealers/ai-insights" element={<DealerOperations mode="ai-insights" />} />,
    <Route key="distributors-root" path="/distributors" element={<DistributorOperations mode="list" />} />,
    <Route key="distributors-dashboard-phase6" path="/distributors/dashboard" element={<DistributorOperations mode="dashboard" />} />,
    <Route key="distributors-create" path="/distributors/create" element={<DistributorOperations mode="create" />} />,
    <Route key="distributors-dealers-detail-phase6" path="/distributors/:id/dealers" element={<DistributorOperations mode="dealers" />} />,
    <Route key="distributors-orders-detail-phase6" path="/distributors/:id/orders" element={<DistributorOperations mode="orders" />} />,
    <Route key="distributors-inventory-detail-phase6" path="/distributors/:id/inventory" element={<DistributorOperations mode="inventory" />} />,
    <Route key="distributors-payments-detail-phase6" path="/distributors/:id/payments" element={<DistributorOperations mode="payments" />} />,
    <Route key="distributors-collections-detail-phase6" path="/distributors/:id/collections" element={<DistributorOperations mode="collections" />} />,
    <Route key="distributors-wallet-detail-phase6" path="/distributors/:id/wallet" element={<DistributorOperations mode="wallet" />} />,
    <Route key="distributors-rewards-detail-phase6" path="/distributors/:id/rewards" element={<DistributorOperations mode="rewards" />} />,
    <Route key="distributors-returns-detail-phase6" path="/distributors/:id/returns" element={<DistributorOperations mode="returns" />} />,
    <Route key="distributors-documents-detail-phase6" path="/distributors/:id/documents" element={<DistributorOperations mode="documents" />} />,
    <Route key="distributors-audit-detail-phase6" path="/distributors/:id/audit" element={<DistributorOperations mode="audit" />} />,
    <Route key="distributors-detail" path="/distributors/:id" element={<DistributorOperations mode="details" />} />,
    <Route key="distributors-edit" path="/distributors/:id/edit" element={<DistributorOperations mode="edit" />} />,
    <Route key="distributor-orders-root" path="/distributor-orders" element={<DistributorOperations mode="orders" />} />,
    <Route key="distributor-orders-create" path="/distributor-orders/create" element={<DistributorOperations mode="order-create" />} />,
    <Route key="distributor-orders-detail" path="/distributor-orders/:id" element={<DistributorOperations mode="order-details" />} />,
    <Route key="distributor-inventory-root" path="/distributor-inventory" element={<DistributorOperations mode="inventory" />} />,
    <Route key="distributor-inventory-detail" path="/distributor-inventory/:id" element={<DistributorOperations mode="inventory-details" />} />,
    <Route key="distributor-dealers-root" path="/distributor-dealers" element={<DistributorOperations mode="dealers" />} />,
    <Route key="distributor-dealers-create" path="/distributor-dealers/create" element={<DistributorOperations mode="dealer-create" />} />,
    <Route key="distributor-dealers-detail" path="/distributor-dealers/:id" element={<DistributorOperations mode="dealer-details" />} />,
    <Route key="collections-root" path="/collections" element={<DistributorOperations mode="collections" />} />,
    <Route key="distributor-wallet-root" path="/distributor-wallet" element={<DistributorOperations mode="wallet" />} />,
    <Route key="distributor-rewards-root" path="/distributor-rewards" element={<DistributorOperations mode="rewards" />} />,
    <Route key="distributor-schemes-root" path="/distributor-schemes" element={<DistributorOperations mode="schemes" />} />,
    <Route key="distributor-returns-root" path="/distributor-returns" element={<DistributorOperations mode="returns" />} />,
    <Route key="distributor-returns-create" path="/distributor-returns/create" element={<DistributorOperations mode="return-create" />} />,
    <Route key="distributor-returns-detail" path="/distributor-returns/:id" element={<DistributorOperations mode="return-details" />} />,
    <Route key="distributors-orders" path="/distributors/orders" element={<DistributorOperations mode="orders" />} />,
    <Route key="distributors-invoices" path="/distributors/invoices" element={<DistributorOperations mode="invoices" />} />,
    <Route key="distributors-collections" path="/distributors/collections" element={<DistributorOperations mode="collections" />} />,
    <Route key="distributors-wallet" path="/distributors/wallet" element={<DistributorOperations mode="wallet" />} />,
    <Route key="distributors-rewards" path="/distributors/rewards" element={<DistributorOperations mode="rewards" />} />,
    <Route key="distributors-inventory" path="/distributors/inventory" element={<DistributorOperations mode="inventory" />} />,
    <Route key="distributors-returns" path="/distributors/returns" element={<DistributorOperations mode="returns" />} />,
    <Route key="distributors-reports" path="/distributors/reports" element={<DistributorOperations mode="reports" />} />,
    <Route key="distributors-analytics" path="/distributors/analytics" element={<DistributorOperations mode="analytics" />} />,
    <Route key="distributors-crm" path="/distributors/crm" element={<DistributorOperations mode="crm" />} />,
    <Route key="warehouses-root" path="/warehouses" element={<WarehouseOperations moduleType="warehouses" mode="warehouses" />} />,
    <Route key="warehouses-create" path="/warehouses/create" element={<WarehouseOperations moduleType="warehouses" mode="create" />} />,
    <Route key="warehouses-detail" path="/warehouses/:id" element={<WarehouseOperations moduleType="warehouses" mode="details" />} />,
    <Route key="warehouses-edit" path="/warehouses/:id/edit" element={<WarehouseOperations moduleType="warehouses" mode="edit" />} />,
    <Route key="warehouses-analytics" path="/warehouses/analytics" element={<WarehouseOperations moduleType="warehouses" mode="analytics" />} />,
    <Route key="bins-root" path="/bins" element={<WarehouseOperations moduleType="bins" mode="bins" />} />,
    <Route key="bins-create" path="/bins/create" element={<WarehouseOperations moduleType="bins" mode="create" />} />,
    <Route key="bins-detail" path="/bins/:id" element={<WarehouseOperations moduleType="bins" mode="details" />} />,
    <Route key="inventory-root" path="/inventory" element={<WarehouseOperations moduleType="inventory" mode="inventory" />} />,
    <Route key="inventory-create" path="/inventory/create" element={<WarehouseOperations moduleType="inventory" mode="create" />} />,
    <Route key="inventory-detail" path="/inventory/:id" element={<WarehouseOperations moduleType="inventory" mode="details" />} />,
    <Route key="inventory-stock-movement" path="/inventory/stock-movement" element={<WarehouseOperations moduleType="inventory" mode="inventory" />} />,
    <Route key="inventory-stock-adjustment" path="/inventory/stock-adjustment" element={<WarehouseOperations moduleType="inventory" mode="adjustments" />} />,
    <Route key="inventory-cycle-count" path="/inventory/cycle-count" element={<WarehouseOperations moduleType="inventory" mode="cycle-count" />} />,
    <Route key="inventory-stock-reconciliation" path="/inventory/stock-reconciliation" element={<WarehouseOperations moduleType="inventory" mode="stock-count" />} />,
    <Route key="inventory-ledger" path="/inventory/ledger" element={<WarehouseOperations moduleType="inventory" mode="inventory" />} />,
    <Route key="inventory-timeline" path="/inventory/timeline" element={<WarehouseOperations moduleType="inventory" mode="details" />} />,
    <Route key="inventory-analytics-sprint7" path="/inventory/analytics-dashboard" element={<WarehouseOperations moduleType="inventory" mode="analytics" />} />,
    <Route key="inbound-root" path="/inbound" element={<WarehouseOperations moduleType="inbound" mode="inbound" />} />,
    <Route key="inbound-create" path="/inbound/create" element={<WarehouseOperations moduleType="inbound" mode="create" />} />,
    <Route key="outbound-root" path="/outbound" element={<WarehouseOperations moduleType="outbound" mode="outbound" />} />,
    <Route key="outbound-create" path="/outbound/create" element={<WarehouseOperations moduleType="outbound" mode="create" />} />,
    <Route key="transfers-root" path="/transfers" element={<WarehouseOperations moduleType="transfers" mode="transfers" />} />,
    <Route key="transfers-create" path="/transfers/create" element={<WarehouseOperations moduleType="transfers" mode="create" />} />,
    <Route key="returns-root" path="/returns" element={<WarehouseOperations moduleType="returns" mode="returns" />} />,
    <Route key="reverse-logistics-root" path="/reverse-logistics" element={<WarehouseOperations moduleType="reverse-logistics" mode="reverse-logistics" />} />,
    <Route key="shipments-root" path="/shipments" element={<WarehouseOperations moduleType="shipments" mode="shipments" />} />,
    <Route key="inventory-dashboard" path="/inventory/dashboard" element={<InventoryIntelligence mode="dashboard" />} />,
    <Route key="inventory-current-stock" path="/inventory/current-stock" element={<InventoryIntelligence mode="current-stock" />} />,
    <Route key="inventory-movements" path="/inventory/movements" element={<InventoryIntelligence mode="movements" />} />,
    <Route key="inventory-alerts" path="/inventory/alerts" element={<InventoryIntelligence mode="alerts" />} />,
    <Route key="inventory-forecast" path="/inventory/forecast" element={<InventoryIntelligence mode="forecast" />} />,
    <Route key="inventory-reservations" path="/inventory/reservations" element={<InventoryIntelligence mode="reservations" />} />,
    <Route key="inventory-adjustments" path="/inventory/adjustments" element={<InventoryIntelligence mode="adjustments" />} />,
    <Route key="inventory-history" path="/inventory/history" element={<InventoryIntelligence mode="history" />} />,
    <Route key="inventory-analytics-explicit" path="/inventory/analytics" element={<InventoryIntelligence mode="analytics" />} />,
    <Route key="inventory-ai-suggestions" path="/inventory/ai-suggestions" element={<InventoryIntelligence mode="ai-suggestions" />} />,
    <Route key="warehouse-dashboard" path="/warehouse/dashboard" element={<WarehouseOperations mode="dashboard" />} />,
    <Route key="warehouse-inbound" path="/warehouse/inbound" element={<WarehouseOperations mode="inbound" />} />,
    <Route key="warehouse-outbound" path="/warehouse/outbound" element={<WarehouseOperations mode="outbound" />} />,
    <Route key="warehouse-inventory" path="/warehouse/inventory" element={<WarehouseOperations mode="inventory" />} />,
    <Route key="warehouse-locations" path="/warehouse/locations" element={<WarehouseOperations mode="locations" />} />,
    <Route key="warehouse-bins" path="/warehouse/bins" element={<WarehouseOperations mode="bins" />} />,
    <Route key="warehouse-transfers" path="/warehouse/transfers" element={<WarehouseOperations mode="transfers" />} />,
    <Route key="warehouse-stock-count" path="/warehouse/stock-count" element={<WarehouseOperations mode="stock-count" />} />,
    <Route key="warehouse-cycle-count" path="/warehouse/cycle-count" element={<WarehouseOperations mode="cycle-count" />} />,
    <Route key="warehouse-adjustments" path="/warehouse/adjustments" element={<WarehouseOperations mode="adjustments" />} />,
    <Route key="warehouse-dispatch" path="/warehouse/dispatch" element={<WarehouseOperations mode="dispatch" />} />,
    <Route key="warehouse-returns" path="/warehouse/returns" element={<WarehouseOperations mode="returns" />} />,
    <Route key="warehouse-reports" path="/warehouse/reports" element={<WarehouseOperations mode="reports" />} />,
    <Route key="warehouse-analytics" path="/warehouse/analytics" element={<WarehouseOperations mode="analytics" />} />,
    <Route key="factory-root" path="/factory" element={<FactoryOperations mode="list" />} />,
    <Route key="factory-create" path="/factory/create" element={<FactoryOperations moduleType="factory" mode="create" />} />,
    <Route key="factory-detail" path="/factory/:id" element={<FactoryOperations moduleType="factory" mode="details" />} />,
    <Route key="factory-edit" path="/factory/:id/edit" element={<FactoryOperations moduleType="factory" mode="edit" />} />,
    <Route key="factory-dashboard" path="/factory/dashboard" element={<FactoryOperations mode="dashboard" />} />,
    <Route key="production-orders-root" path="/production-orders" element={<FactoryOperations mode="production-orders" />} />,
    <Route key="production-orders-create" path="/production-orders/create" element={<FactoryOperations moduleType="production-orders" mode="create" />} />,
    <Route key="production-orders-detail" path="/production-orders/:id" element={<FactoryOperations moduleType="production-orders" mode="details" />} />,
    <Route key="production-orders-edit" path="/production-orders/:id/edit" element={<FactoryOperations moduleType="production-orders" mode="edit" />} />,
    <Route key="production-lines-root" path="/production-lines" element={<FactoryOperations mode="production-lines" />} />,
    <Route key="production-lines-create" path="/production-lines/create" element={<FactoryOperations moduleType="production-lines" mode="create" />} />,
    <Route key="production-lines-detail" path="/production-lines/:id" element={<FactoryOperations moduleType="production-lines" mode="details" />} />,
    <Route key="production-lines-edit" path="/production-lines/:id/edit" element={<FactoryOperations moduleType="production-lines" mode="edit" />} />,
    <Route key="machines-root" path="/machines" element={<FactoryOperations mode="machines" />} />,
    <Route key="machines-create" path="/machines/create" element={<FactoryOperations moduleType="machines" mode="create" />} />,
    <Route key="machines-detail" path="/machines/:id" element={<FactoryOperations moduleType="machines" mode="details" />} />,
    <Route key="machines-edit" path="/machines/:id/edit" element={<FactoryOperations moduleType="machines" mode="edit" />} />,
    <Route key="operators-root" path="/operators" element={<FactoryOperations mode="operators" />} />,
    <Route key="operators-create" path="/operators/create" element={<FactoryOperations moduleType="operators" mode="create" />} />,
    <Route key="operators-detail" path="/operators/:id" element={<FactoryOperations moduleType="operators" mode="details" />} />,
    <Route key="operators-edit" path="/operators/:id/edit" element={<FactoryOperations moduleType="operators" mode="edit" />} />,
    <Route key="shifts-root" path="/shifts" element={<FactoryOperations mode="shifts" />} />,
    <Route key="shifts-create" path="/shifts/create" element={<FactoryOperations moduleType="shifts" mode="create" />} />,
    <Route key="shifts-detail" path="/shifts/:id" element={<FactoryOperations moduleType="shifts" mode="details" />} />,
    <Route key="shifts-edit" path="/shifts/:id/edit" element={<FactoryOperations moduleType="shifts" mode="edit" />} />,
    <Route key="quality-control-root" path="/quality-control" element={<FactoryOperations mode="quality-control" />} />,
    <Route key="quality-control-create" path="/quality-control/create" element={<FactoryOperations moduleType="quality-control" mode="create" />} />,
    <Route key="quality-control-detail" path="/quality-control/:id" element={<FactoryOperations moduleType="quality-control" mode="details" />} />,
    <Route key="quality-control-edit" path="/quality-control/:id/edit" element={<FactoryOperations moduleType="quality-control" mode="edit" />} />,
    <Route key="rejected-products-root" path="/rejected-products" element={<FactoryOperations mode="rejected-products" />} />,
    <Route key="scrapped-batches-root" path="/scrapped-batches" element={<FactoryOperations mode="scrapped-products" />} />,
    <Route key="factory-production-orders" path="/factory/production-orders" element={<FactoryOperations mode="production-orders" />} />,
    <Route key="factory-production-lines" path="/factory/production-lines" element={<FactoryOperations mode="production-lines" />} />,
    <Route key="factory-machines" path="/factory/machines" element={<FactoryOperations mode="machines" />} />,
    <Route key="factory-operators" path="/factory/operators" element={<FactoryOperations mode="operators" />} />,
    <Route key="factory-shifts" path="/factory/shifts" element={<FactoryOperations mode="shifts" />} />,
    <Route key="factory-quality-inspection" path="/factory/quality-inspection" element={<FactoryOperations mode="quality-inspection" />} />,
    <Route key="factory-rejected-products" path="/factory/rejected-products" element={<FactoryOperations mode="rejected-products" />} />,
    <Route key="factory-scrapped-products" path="/factory/scrapped-products" element={<FactoryOperations mode="scrapped-products" />} />,
    <Route key="factory-maintenance" path="/factory/maintenance" element={<FactoryOperations mode="maintenance" />} />,
    <Route key="factory-reports" path="/factory/reports" element={<FactoryOperations mode="reports" />} />,
    <Route key="factory-analytics" path="/factory/analytics" element={<FactoryOperations mode="analytics" />} />,
    <Route key="qr-dashboard-root" path="/qr" element={<EnterpriseQRPlatform mode="dashboard" />} />,
    <Route key="qr-dashboard-explicit" path="/qr/dashboard" element={<EnterpriseQRPlatform mode="dashboard" />} />,
    <Route key="qr-batches-root" path="/qr/batches" element={<EnterpriseQRPlatform mode="batches" />} />,
    <Route key="qr-batches-create" path="/qr/batches/create" element={<EnterpriseQRPlatform mode="batch-create" />} />,
    <Route key="qr-batches-detail" path="/qr/batches/:id" element={<EnterpriseQRPlatform mode="batch-details" />} />,
    <Route key="qr-batches-edit" path="/qr/batches/:id/edit" element={<EnterpriseQRPlatform mode="batch-edit" />} />,
    <Route key="qr-generate-sprint8" path="/qr/generate" element={<EnterpriseQRPlatform mode="generate" />} />,
    <Route key="qr-codes-root" path="/qr/codes" element={<EnterpriseQRPlatform mode="codes" />} />,
    <Route key="qr-codes-detail" path="/qr/codes/:id" element={<EnterpriseQRPlatform mode="code-details" />} />,
    <Route key="gs1-root" path="/gs1" element={<EnterpriseQRPlatform mode="gs1" />} />,
    <Route key="aggregation-root" path="/aggregation" element={<EnterpriseQRPlatform mode="aggregation" />} />,
    <Route key="print-root" path="/print" element={<EnterpriseQRPlatform mode="print" />} />,
    <Route key="security-root" path="/security" element={<EnterpriseQRPlatform mode="security" />} />,
    <Route key="qr-analytics-sprint8" path="/qr/analytics" element={<EnterpriseQRPlatform mode="analytics" />} />,
    <Route key="qr-templates-root" path="/qr/templates" element={<EnterpriseQRPlatform mode="templates" />} />,
    <Route key="qr-templates-short" path="/qr-templates" element={<EnterpriseQRPlatform mode="templates" />} />,
    <Route key="qr-public-preview" path="/qr/public-preview" element={<EnterpriseQRPlatform mode="public-preview" />} />,
    <Route key="qr-scan-timeline" path="/qr/scan-timeline" element={<EnterpriseQRPlatform mode="scan-timeline" />} />,
    <Route key="qr-list" path="/qr-generation/list" element={<EnterpriseQRPlatform mode="list" />} />,
    <Route key="qr-bulk-generate" path="/qr-generation/bulk-generate" element={<EnterpriseQRPlatform mode="bulk-generate" />} />,
    <Route key="qr-lifecycle-page" path="/qr-generation/lifecycle" element={<EnterpriseQRPlatform mode="lifecycle" />} />,
    <Route key="qr-analytics-page" path="/qr-generation/analytics" element={<EnterpriseQRPlatform mode="analytics" />} />,
    <Route key="qr-gs1-preview" path="/qr-generation/gs1-preview" element={<EnterpriseQRPlatform mode="gs1-preview" />} />,
    <Route key="qr-parent-child" path="/qr-generation/parent-child-mapping" element={<EnterpriseQRPlatform mode="parent-child" />} />,
    <Route key="qr-csv-root" path="/qr-generation/csv" element={<EnterpriseQRPlatform mode="csv" />} />,
    <Route key="qr-details" path="/qr-generation/:id" element={<EnterpriseQRPlatform mode="details" />} />,
    <Route key="qr-preview" path="/qr-generation/:id/preview" element={<EnterpriseQRPlatform mode="preview" />} />,
    <Route key="qr-print" path="/qr-generation/:id/print" element={<EnterpriseQRPlatform mode="print" />} />,
    <Route key="qr-pdf" path="/qr-generation/:id/pdf" element={<EnterpriseQRPlatform mode="pdf" />} />,
    <Route key="qr-zip" path="/qr-generation/:id/zip" element={<EnterpriseQRPlatform mode="zip" />} />,
    <Route key="qr-csv" path="/qr-generation/:id/csv" element={<EnterpriseQRPlatform mode="csv" />} />,
    <Route key="batch-dashboard" path="/batch-management/dashboard" element={<BatchManagement mode="dashboard" />} />,
    <Route key="batch-list" path="/batch-management/list" element={<BatchManagement mode="list" />} />,
    <Route key="batch-history" path="/batch-management/history" element={<BatchManagement mode="history" />} />,
    <Route key="batch-analytics" path="/batch-management/analytics" element={<BatchManagement mode="analytics" />} />,
    <Route key="batch-assign-factory" path="/batch-management/:id/assign-factory" element={<BatchManagement mode="assign-factory" />} />,
    <Route key="batch-assign-warehouse" path="/batch-management/:id/assign-warehouse" element={<BatchManagement mode="assign-warehouse" />} />,
    <Route key="batch-generate" path="/batch-management/:id/generate" element={<BatchManagement mode="generate" />} />,
    <Route key="batch-print-summary" path="/batch-management/:id/print-summary" element={<BatchManagement mode="print-summary" />} />,
    <Route key="categories-dashboard" path="/categories/dashboard" element={<CatalogManagement moduleType="categories" mode="dashboard" />} />,
    <Route key="categories-list" path="/categories/list" element={<CatalogManagement moduleType="categories" mode="list" />} />,
    <Route key="categories-import" path="/categories/import" element={<CatalogManagement moduleType="categories" mode="import" />} />,
    <Route key="categories-export" path="/categories/export" element={<CatalogManagement moduleType="categories" mode="export" />} />,
    <Route key="categories-history" path="/categories/history" element={<CatalogManagement moduleType="categories" mode="history" />} />,
    <Route key="categories-analytics" path="/categories/analytics" element={<CatalogManagement moduleType="categories" mode="analytics" />} />,
    <Route key="categories-edit" path="/categories/:id/edit" element={<CatalogManagement moduleType="categories" mode="edit" />} />,
    <Route key="categories-delete" path="/categories/:id/delete" element={<CatalogManagement moduleType="categories" mode="delete" />} />,
    <Route key="brands-dashboard" path="/brands/dashboard" element={<CatalogManagement moduleType="brands" mode="dashboard" />} />,
    <Route key="brands-list" path="/brands/list" element={<CatalogManagement moduleType="brands" mode="list" />} />,
    <Route key="brands-import" path="/brands/import" element={<CatalogManagement moduleType="brands" mode="import" />} />,
    <Route key="brands-export" path="/brands/export" element={<CatalogManagement moduleType="brands" mode="export" />} />,
    <Route key="brands-history" path="/brands/history" element={<CatalogManagement moduleType="brands" mode="history" />} />,
    <Route key="brands-analytics" path="/brands/analytics" element={<CatalogManagement moduleType="brands" mode="analytics" />} />,
    <Route key="brands-edit" path="/brands/:id/edit" element={<CatalogManagement moduleType="brands" mode="edit" />} />,
    <Route key="brands-delete" path="/brands/:id/delete" element={<CatalogManagement moduleType="brands" mode="delete" />} />,
    <Route key="sku-dashboard" path="/sku-management/dashboard" element={<CatalogManagement moduleType="sku-management" mode="dashboard" />} />,
    <Route key="sku-list" path="/sku-management/list" element={<CatalogManagement moduleType="sku-management" mode="list" />} />,
    <Route key="sku-import" path="/sku-management/import" element={<CatalogManagement moduleType="sku-management" mode="import" />} />,
    <Route key="sku-export" path="/sku-management/export" element={<CatalogManagement moduleType="sku-management" mode="export" />} />,
    <Route key="sku-history" path="/sku-management/history" element={<CatalogManagement moduleType="sku-management" mode="history" />} />,
    <Route key="sku-analytics" path="/sku-management/analytics" element={<CatalogManagement moduleType="sku-management" mode="analytics" />} />,
    <Route key="sku-edit" path="/sku-management/:id/edit" element={<CatalogManagement moduleType="sku-management" mode="edit" />} />,
    <Route key="sku-delete" path="/sku-management/:id/delete" element={<CatalogManagement moduleType="sku-management" mode="delete" />} />,
    <Route key="skus-root" path="/skus" element={<CatalogManagement moduleType="skus" mode="list" />} />,
    <Route key="skus-create" path="/skus/create" element={<CatalogManagement moduleType="skus" mode="create" />} />,
    <Route key="skus-detail" path="/skus/:id" element={<CatalogManagement moduleType="skus" mode="details" />} />,
    <Route key="skus-edit" path="/skus/:id/edit" element={<CatalogManagement moduleType="skus" mode="edit" />} />,
    <Route key="products-import" path="/products/import" element={<ProductManagement mode="import" />} />,
    <Route key="products-export" path="/products/export" element={<ProductManagement mode="export" />} />,
    <Route key="products-edit" path="/products/:id/edit" element={<ProductManagement mode="edit" />} />,
    <Route key="products-clone" path="/products/:id/clone" element={<ProductManagement mode="clone" />} />,
    <Route key="products-archive" path="/products/:id/archive" element={<ProductManagement mode="archive" />} />,
    <Route key="products-delete" path="/products/:id/delete" element={<ProductManagement mode="delete" />} />,
    ...enterpriseRoutes.map((route) => (
      <Route
        key={route.id}
        path={route.route}
        element={
          route.id.startsWith("products") ? (
            <ProductManagement mode={route.mode === "detail" ? "view" : route.mode} />
          ) : route.id.startsWith("ai-dashboard") ? (
            <AIPlatformWorkspace mode="dashboard" />
          ) : route.id.startsWith("ai-assistant") ? (
            <AIPlatformWorkspace mode="chat" />
          ) : route.id.startsWith("forecasting") ? (
            <AIPlatformWorkspace mode="forecasting" />
          ) : route.id.startsWith("counterfeit-detection") ? (
            <AIPlatformWorkspace mode="counterfeit-detection" />
          ) : route.id.startsWith("ocr") ? (
            <AIPlatformWorkspace mode="ocr" />
          ) : route.id.startsWith("recommendations") ? (
            <AIPlatformWorkspace mode="recommendations" />
          ) : route.id.startsWith("business-intelligence") ? (
            <AIPlatformWorkspace mode="business-intelligence" />
          ) : route.id.startsWith("chat-assistant") ? (
            <AIPlatformWorkspace mode="chat" />
          ) : route.id.startsWith("feature-flags") ? (
            <BrandingWorkspace mode="feature-flags" />
          ) : route.id.startsWith("white-label") ? (
            <BrandingWorkspace mode="customization" />
          ) : route.id.startsWith("companies") ? (
            <PlatformOperations mode="companies" />
          ) : route.id.startsWith("subscriptions") ? (
            <PlatformOperations mode="subscriptions" />
          ) : route.id.startsWith("plans") ? (
            <PlatformOperations mode="plans" />
          ) : route.id.startsWith("billing") ? (
            <PlatformOperations mode="billing" />
          ) : route.id.startsWith("revenue") ? (
            <PlatformOperations mode="revenue" />
          ) : route.id.startsWith("users") ? (
            <AdministrationSettings mode="users" />
          ) : route.id.startsWith("roles") ? (
            <AdministrationSettings mode="roles" />
          ) : route.id.startsWith("permissions") ? (
            <AdministrationSettings mode="permissions" />
          ) : route.id.startsWith("departments") ? (
            <AdministrationSettings mode="departments" />
          ) : route.id.startsWith("audit-logs") ? (
            <AdministrationSettings mode="audit-logs" />
          ) : route.id.startsWith("api-keys") ? (
            <AdministrationSettings mode="api-keys" />
          ) : route.id.startsWith("integrations") ? (
            <AdministrationSettings mode="integrations" />
          ) : route.id.startsWith("super-admin-support") ? (
            <PlatformOperations mode="support" />
          ) : route.id.startsWith("platform-analytics") ? (
            <PlatformOperations mode="platform-analytics" />
          ) : route.id.startsWith("system-health") ? (
            <PlatformOperations mode="system-health" />
          ) : route.id.startsWith("reports") ? (
            <ReportsWorkspace mode="sales" />
          ) : route.id.startsWith("executive-dashboard") ? (
            <ExecutiveDashboard />
          ) : route.id.startsWith("sales-analytics") ? (
            <AnalyticsWorkspace mode="sales" />
          ) : route.id.startsWith("dealer-analytics") ? (
            <AnalyticsWorkspace mode="dealer" />
          ) : route.id.startsWith("consumer-analytics") ? (
            <AnalyticsWorkspace mode="customer" />
          ) : route.id.startsWith("campaign-analytics") ? (
            <AnalyticsWorkspace mode="campaign" />
          ) : route.id.startsWith("inventory-analytics") ? (
            <AnalyticsWorkspace mode="inventory" />
          ) : route.id.startsWith("qr-analytics") ? (
            <AnalyticsWorkspace mode="qr" />
          ) : route.id.startsWith("categories") ? (
            <CatalogManagement moduleType="categories" mode={route.mode === "detail" ? "details" : route.mode} />
          ) : route.id.startsWith("brands") ? (
            <CatalogManagement moduleType="brands" mode={route.mode === "detail" ? "details" : route.mode} />
          ) : route.id.startsWith("sku-management") ? (
            <CatalogManagement moduleType="sku-management" mode={route.mode === "detail" ? "details" : route.mode} />
          ) : route.id.startsWith("batch-management") ? (
            <BatchManagement mode={route.mode === "detail" ? "details" : route.mode} />
          ) : route.id.startsWith("qr-generation") ? (
            <EnterpriseQRPlatform mode={route.mode === "create" ? "generate" : route.mode === "detail" ? "details" : "generate"} />
          ) : route.id.startsWith("qr-lifecycle") ? (
            <EnterpriseQRPlatform mode="lifecycle" />
          ) : route.id.startsWith("gs1-digital-links") ? (
            <EnterpriseQRPlatform mode="gs1-preview" />
          ) : route.id.startsWith("factory") ? (
            <FactoryOperations mode="dashboard" />
          ) : route.id.startsWith("production-orders") ? (
            <FactoryOperations mode="production-orders" />
          ) : route.id.startsWith("quality-control") ? (
            <FactoryOperations mode="quality-inspection" />
          ) : route.id.startsWith("warehouse") ? (
            <WarehouseOperations mode="dashboard" />
          ) : route.id.startsWith("inventory") ? (
            <InventoryIntelligence mode={route.mode === "detail" ? "current-stock" : "dashboard"} />
          ) : route.id.startsWith("dispatch") ? (
            <WarehouseOperations mode="dispatch" />
          ) : route.id.startsWith("returns") ? (
            <WarehouseOperations mode="returns" />
          ) : route.id.startsWith("customer-360") ? (
            <CustomerExperience mode="customer-360" />
          ) : route.id.startsWith("customer-wallet") ? (
            <CustomerExperience mode="wallet" />
          ) : route.id.startsWith("customer-rewards") ? (
            <CustomerExperience mode="rewards" />
          ) : route.id.startsWith("customers") ? (
            <CustomerExperience mode={route.mode === "create" ? "create" : route.mode === "detail" ? "details" : "list"} />
          ) : route.id.startsWith("warranty") ? (
            <CustomerExperience mode="warranty" />
          ) : route.id.startsWith("support") ? (
            <CustomerExperience mode="support" />
          ) : route.id.startsWith("leads") ? (
            <CRMWorkspace mode="leads" />
          ) : route.id.startsWith("accounts") ? (
            <CRMWorkspace mode="accounts" />
          ) : route.id.startsWith("contacts") ? (
            <CRMWorkspace mode="contacts" />
          ) : route.id.startsWith("tasks") ? (
            <CRMWorkspace mode="tasks" />
          ) : route.id.startsWith("meetings") ? (
            <CRMWorkspace mode="meetings" />
          ) : route.id.startsWith("calendar") ? (
            <CRMWorkspace mode="calendar" />
          ) : route.id.startsWith("notes") ? (
            <CRMWorkspace mode="notes" />
          ) : route.id.startsWith("campaigns") ? (
            <MarketingAutomation mode="campaign-builder" />
          ) : route.id.startsWith("coupons") ? (
            <MarketingAutomation mode="coupons" />
          ) : route.id.startsWith("scratch-cards") ? (
            <MarketingAutomation mode="scratch-cards" />
          ) : route.id.startsWith("referral-program") ? (
            <MarketingAutomation mode="referral" />
          ) : route.id.startsWith("promotions") ? (
            <MarketingAutomation mode="campaign-builder" />
          ) : route.id.startsWith("notifications") ? (
            <NotificationsWorkspace mode="inbox" />
          ) : route.id.startsWith("whatsapp-campaigns") ? (
            <MarketingAutomation mode="whatsapp" />
          ) : route.id.startsWith("email-campaigns") ? (
            <MarketingAutomation mode="email" />
          ) : route.id.startsWith("landing-pages") ? (
            <MarketingAutomation mode="landing-pages" />
          ) : route.id.startsWith("forms") ? (
            <MarketingAutomation mode="forms" />
          ) : route.id.startsWith("loyalty-wallet") ? (
            <LoyaltyWorkspace mode="wallet" />
          ) : route.id.startsWith("points-engine") ? (
            <LoyaltyWorkspace mode="points" />
          ) : route.id.startsWith("rewards-catalog") ? (
            <LoyaltyWorkspace mode="catalog" />
          ) : route.id.startsWith("redemptions") ? (
            <LoyaltyWorkspace mode="redemption" />
          ) : route.id.startsWith("leaderboards") ? (
            <LoyaltyWorkspace mode="leaderboard" />
          ) : route.id.startsWith("membership-tiers") ? (
            <LoyaltyWorkspace mode="tier" />
          ) : route.id.startsWith("achievements") ? (
            <LoyaltyWorkspace mode="leaderboard" />
          ) : route.id.startsWith("distributors") ? (
            <DistributorOperations mode={route.mode === "create" ? "create" : route.mode === "detail" ? "details" : "list"} />
          ) : route.id.startsWith("dealers") ? (
            <DealerOperations mode={route.mode === "create" ? "create" : route.mode === "detail" ? "details" : "list"} />
          ) : route.id.startsWith("retailers") ? (
            <RetailOperations mode={route.mode === "create" ? "create" : route.mode === "detail" ? "details" : "list"} />
          ) : route.id.startsWith("contractors") ? (
            <ContractorOperations mode={route.mode === "create" ? "create" : route.mode === "detail" ? "details" : "list"} />
          ) : (
            getRouteElement(route)
          )
        }
      />
    )),
  ];

export default EnterpriseRoutes;
