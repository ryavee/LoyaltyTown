import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Banknote, Download, FilePlus2, Plus, ReceiptText, RefreshCw, Upload } from "lucide-react";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";
import { AdvancedFilters, EmptyState, KPIGrid, PageToolbar, Pagination, SearchInput, SecondaryButton, Select } from "../../Components/enterprise";
import { cn, panelBase } from "../../Components/enterprise/utils";
import { expenses, expenseCategories } from "../../data/finance/expenseDemoData";
import { financeInsights, financeKpis, revenueCards } from "../../data/finance/financeDemoData";
import { gstReports, gstSummary, hsnCodes } from "../../data/finance/gstDemoData";
import { creditNotes, debitNotes, invoices } from "../../data/finance/invoiceDemoData";
import { payments, refunds } from "../../data/finance/paymentDemoData";
import { payouts } from "../../data/finance/payoutDemoData";
import { subscriptionPlans, subscriptions } from "../../data/finance/subscriptionDemoData";
import { AccountingCard, GSTSummaryCard, PaymentMethodCard, RevenueCard, SubscriptionCard } from "./components/FinanceCards";
import { FinanceCharts } from "./components/FinanceCharts";
import { ExpenseForm, InvoiceForm } from "./components/FinanceForms";
import { FinanceStatusBadge } from "./components/FinanceStatusBadge";
import { ExpenseTable, GenericFinanceTable, InvoiceTable, LedgerTable, PaymentTable, PayoutTable } from "./components/FinanceTables";

type FinanceMode =
  | "dashboard"
  | "invoices"
  | "invoice-create"
  | "invoice-details"
  | "payments"
  | "subscriptions"
  | "plans"
  | "gst"
  | "payouts"
  | "expenses"
  | "expense-create"
  | "accounting"
  | "reports";

const meta: Record<FinanceMode, { title: string; description: string; label: string }> = {
  dashboard: { title: "Finance Dashboard", description: "Revenue, billing, GST, payments, subscriptions, MRR, ARR, receivables, and payables overview.", label: "Finance" },
  invoices: { title: "Invoices", description: "Invoice dashboard, invoice list, preview, credit notes, debit notes, due dates, and payment status.", label: "Invoices" },
  "invoice-create": { title: "Create Invoice", description: "Static invoice creation surface for customer, company, GST, products, tax, discount, and totals.", label: "Invoices" },
  "invoice-details": { title: "Invoice Details", description: "Invoice preview, tax summary, payment status, credit note, debit note, and timeline placeholders.", label: "Invoices" },
  payments: { title: "Payments", description: "Payment dashboard, history, refunds, failed payments, method mix, and payment timeline.", label: "Payments" },
  subscriptions: { title: "Subscriptions", description: "Subscription dashboard, active subscriptions, trials, renewals, expired accounts, and upgrade/downgrade.", label: "Subscriptions" },
  plans: { title: "Subscription Plans", description: "Starter, Growth, Professional, and Enterprise plan catalog with tenant counts.", label: "Plans" },
  gst: { title: "GST & Tax", description: "GST dashboard, reports, tax summary, HSN codes, and tax configuration.", label: "GST" },
  payouts: { title: "Payouts", description: "Pending payouts, approved payouts, failed payouts, and settlement reports.", label: "Payouts" },
  expenses: { title: "Expenses", description: "Expense dashboard, expense list, create expense, categories, and approvals.", label: "Expenses" },
  "expense-create": { title: "Create Expense", description: "Static expense entry prepared for future accounting workflows.", label: "Expenses" },
  accounting: { title: "Accounting Dashboard", description: "Ledger, journal, trial balance, profit and loss, balance sheet, and cash flow placeholders.", label: "Accounting" },
  reports: { title: "Finance Reports", description: "Revenue, invoice, payment, subscription, GST, and expense reports.", label: "Reports" },
};

const ledgerRows = [
  { id: "LED-1001", account: "Revenue - Subscription", debit: "₹0", credit: "₹2.18Cr", period: "Jun 2026", status: "Posted" },
  { id: "LED-1002", account: "GST Payable", debit: "₹0", credit: "₹64L", period: "Jun 2026", status: "Posted" },
  { id: "LED-1003", account: "Receivables", debit: "₹1.18Cr", credit: "₹0", period: "Jun 2026", status: "Open" },
];

const reports = [
  { id: "RPT-REV", report: "Revenue Report", period: "Jun 2026", owner: "Finance", format: "PDF / Excel", status: "Ready" },
  { id: "RPT-INV", report: "Invoice Report", period: "Jun 2026", owner: "Billing", format: "Excel", status: "Ready" },
  { id: "RPT-PAY", report: "Payment Report", period: "Jun 2026", owner: "Collections", format: "PDF", status: "Draft" },
  { id: "RPT-SUB", report: "Subscription Report", period: "Q1 FY26", owner: "Revenue Ops", format: "Excel", status: "Ready" },
  { id: "RPT-GST", report: "GST Report", period: "Jun 2026", owner: "Tax", format: "PDF", status: "Ready" },
  { id: "RPT-EXP", report: "Expense Report", period: "Jun 2026", owner: "Accounting", format: "Excel", status: "Review" },
];

const useFilteredRows = <T extends Record<string, unknown>>(rows: T[], query: string) =>
  useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(q)));
  }, [rows, query]);

const Header = ({ mode }: { mode: FinanceMode }) => {
  const current = meta[mode];
  return (
    <PageToolbar
      title={current.title}
      description={current.description}
      start={
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            {mode === "gst" ? <ReceiptText className="h-5 w-5" /> : <Banknote className="h-5 w-5" />}
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Finance, Billing & Accounting</p>
        </div>
      }
      end={
        <>
          <Link to="/invoices/create" className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
            <Plus className="h-4 w-4" />Create Invoice
          </Link>
          <SecondaryButton icon={Upload}>Import</SecondaryButton>
          <SecondaryButton icon={Download}>Export</SecondaryButton>
          <SecondaryButton icon={RefreshCw}>Refresh</SecondaryButton>
        </>
      }
    />
  );
};

const FilterBar = ({ query, setQuery, label }: { query: string; setQuery: (value: string) => void; label: string }) => (
  <AdvancedFilters title={`${label} filters`} activeCount={0}>
    <SearchInput value={query} onChange={setQuery} placeholder={`Search ${label.toLowerCase()}`} />
    <Select label="Status" value="" onChange={() => undefined} placeholder="All statuses" options={["Paid", "Pending", "Failed", "Overdue", "Active", "Trial", "Ready", "Review"].map((value) => ({ label: value, value }))} />
    <Select label="Period" value="" onChange={() => undefined} placeholder="All periods" options={["This month", "Last month", "This quarter", "This FY"].map((value) => ({ label: value, value }))} />
  </AdvancedFilters>
);

const Dashboard = () => (
  <>
    <KPIGrid items={financeKpis} />
    <div className="grid gap-4 md:grid-cols-3">
      {revenueCards.map((card) => <RevenueCard key={card.id} {...card} />)}
    </div>
    <FinanceCharts />
    <section className={cn(panelBase, "p-4")}>
      <h3 className="text-sm font-semibold text-white">Finance Insights</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {financeInsights.map((insight) => <p key={insight} className="rounded-md border border-cyan-400/10 bg-cyan-400/5 p-3 text-sm text-slate-300">{insight}</p>)}
      </div>
    </section>
  </>
);

const InvoiceDetails = () => {
  const { id } = useParams();
  const invoice = invoices.find((item) => item.id === id) || invoices[0];
  return (
    <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
      <section className={cn(panelBase, "p-5")}>
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">Invoice Preview</p>
            <h2 className="mt-1 text-2xl font-semibold text-white">{invoice.invoiceNumber}</h2>
            <p className="mt-1 text-sm text-slate-400">{invoice.customer} • {invoice.company}</p>
          </div>
          <FinanceStatusBadge status={invoice.paymentStatus} />
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(invoice).filter(([key]) => key !== "id").map(([key, value]) => (
            <div key={key} className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{key.replace(/([A-Z])/g, " $1")}</p>
              <p className="mt-2 text-sm font-semibold text-white">{String(value)}</p>
            </div>
          ))}
        </div>
      </section>
      <section className={cn(panelBase, "p-4")}>
        <h3 className="text-sm font-semibold text-white">Payment Timeline</h3>
        <div className="mt-4 space-y-4">
          {["Invoice generated", "GST calculated", "Payment reminder queued", "Collection pending"].map((item, index) => (
            <div key={item} className="relative border-l border-slate-800 pl-4">
              <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-cyan-300" />
              <p className="text-sm font-semibold text-slate-100">{item}</p>
              <p className="mt-1 text-xs text-slate-500">Step {index + 1}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const InvoicesView = ({ query }: { query: string }) => {
  const filtered = useFilteredRows(invoices, query);
  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        <RevenueCard title="Pending Invoices" value="284" description="Awaiting customer payments." />
        <RevenueCard title="Credit Notes" value="42" description="Adjustments issued this quarter." />
        <RevenueCard title="Debit Notes" value="18" description="Additional usage and corrections." />
      </div>
      <InvoiceTable rows={filtered} />
      <div className="grid gap-4 xl:grid-cols-2">
        <section className={cn(panelBase, "p-4")}><h3 className="mb-4 text-sm font-semibold text-white">Credit Notes</h3><GenericFinanceTable rows={creditNotes} /></section>
        <section className={cn(panelBase, "p-4")}><h3 className="mb-4 text-sm font-semibold text-white">Debit Notes</h3><GenericFinanceTable rows={debitNotes} /></section>
      </div>
    </>
  );
};

const PaymentsView = ({ query }: { query: string }) => {
  const filtered = useFilteredRows(payments, query);
  return (
    <>
      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        {["UPI", "Razorpay", "Stripe", "PayPal", "Bank Transfer", "Cash"].map((method) => <PaymentMethodCard key={method} method={method} value={method === "UPI" ? "47%" : method === "Bank Transfer" ? "25%" : "8%"} description="Static method mix placeholder." />)}
      </div>
      <PaymentTable rows={filtered} />
      <section className={cn(panelBase, "p-4")}><h3 className="mb-4 text-sm font-semibold text-white">Refunds</h3><GenericFinanceTable rows={refunds} /></section>
    </>
  );
};

const SubscriptionsView = ({ mode }: { mode: "subscriptions" | "plans" }) => (
  <>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {subscriptionPlans.map((plan) => <SubscriptionCard key={plan.id} plan={plan} />)}
    </div>
    {mode === "subscriptions" ? <GenericFinanceTable rows={subscriptions} /> : null}
  </>
);

const GSTView = () => (
  <>
    <div className="grid gap-4 md:grid-cols-3">
      {gstSummary.map((item) => <GSTSummaryCard key={item.id} item={item} />)}
    </div>
    <div className="grid gap-4 xl:grid-cols-2">
      <section className={cn(panelBase, "p-4")}><h3 className="mb-4 text-sm font-semibold text-white">GST Reports</h3><GenericFinanceTable rows={gstReports} /></section>
      <section className={cn(panelBase, "p-4")}><h3 className="mb-4 text-sm font-semibold text-white">HSN Codes & Tax Configuration</h3><GenericFinanceTable rows={hsnCodes} /></section>
    </div>
  </>
);

const ExpensesView = () => (
  <>
    <div className="flex justify-end"><Link to="/expenses/create" className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"><FilePlus2 className="h-4 w-4" />Create Expense</Link></div>
    <ExpenseTable rows={expenses} />
    <section className={cn(panelBase, "p-4")}><h3 className="mb-4 text-sm font-semibold text-white">Categories & Approvals</h3><GenericFinanceTable rows={expenseCategories} /></section>
  </>
);

const AccountingView = () => (
  <>
    <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
      {[
        ["Ledger", "3.4K", "Posted ledger entries"],
        ["Journal", "612", "Journal entries this month"],
        ["Trial Balance", "Balanced", "Static statement status"],
        ["Profit & Loss", "₹1.74Cr", "Monthly operating profit"],
        ["Balance Sheet", "₹42.8Cr", "Assets and liabilities"],
        ["Cash Flow", "₹6.2Cr", "Closing cash position"],
      ].map(([title, value, description]) => <AccountingCard key={title} title={title} value={value} description={description} />)}
    </div>
    <LedgerTable rows={ledgerRows} />
  </>
);

const FinanceWorkspace = ({ mode = "dashboard" }: { mode?: FinanceMode }) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const current = meta[mode];
  const tableModes: FinanceMode[] = ["invoices", "payments", "payouts", "expenses", "reports"];
  const filteredPayouts = useFilteredRows(payouts, query);
  const filteredReports = useFilteredRows(reports, query);

  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      <Header mode={mode} />
      {tableModes.includes(mode) ? <FilterBar query={query} setQuery={setQuery} label={current.label} /> : null}
      {mode === "dashboard" ? <Dashboard /> : null}
      {mode === "invoices" ? <InvoicesView query={query} /> : null}
      {mode === "invoice-create" ? <InvoiceForm /> : null}
      {mode === "invoice-details" ? <InvoiceDetails /> : null}
      {mode === "payments" ? <PaymentsView query={query} /> : null}
      {mode === "subscriptions" || mode === "plans" ? <SubscriptionsView mode={mode} /> : null}
      {mode === "gst" ? <GSTView /> : null}
      {mode === "payouts" ? <PayoutTable rows={filteredPayouts} /> : null}
      {mode === "expenses" ? <ExpensesView /> : null}
      {mode === "expense-create" ? <ExpenseForm /> : null}
      {mode === "accounting" ? <AccountingView /> : null}
      {mode === "reports" ? <GenericFinanceTable rows={filteredReports} /> : null}
      {tableModes.includes(mode) ? <Pagination page={page} pageCount={4} onPageChange={setPage} totalLabel={`Static records for ${current.title}`} /> : null}
      {mode === "plans" && subscriptionPlans.length === 0 ? <EmptyState title="No subscription plans" /> : null}
    </div>
  );
};

export default FinanceWorkspace;
