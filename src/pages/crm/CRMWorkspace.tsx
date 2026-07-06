import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BadgeCheck, BriefcaseBusiness, CalendarDays, CheckCircle2, Contact, Download, FileText, FolderOpen, ListTodo, NotebookText, Plus, RefreshCw, Target, Upload, UsersRound } from "lucide-react";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";
import { AdvancedFilters, EmptyState, KPIGrid, PageToolbar, Pagination, SearchInput, SecondaryButton, Select } from "../../Components/enterprise";
import { cn, panelBase } from "../../Components/enterprise/utils";
import { accounts } from "../../data/crm/accountDemoData";
import { activities, files, notes } from "../../data/crm/activityDemoData";
import { contacts } from "../../data/crm/contactDemoData";
import { crmInsights, crmKpis } from "../../data/crm/crmDemoData";
import { leads } from "../../data/crm/leadDemoData";
import { meetings } from "../../data/crm/meetingDemoData";
import { opportunities } from "../../data/crm/opportunityDemoData";
import { tasks } from "../../data/crm/taskDemoData";
import { AccountForm, LeadForm, OpportunityForm } from "./components/CrmForms";
import { AccountTable, ContactTable, GenericTable, LeadTable, MeetingCards, OpportunityTable, TaskTable } from "./components/CrmTables";
import { ActivityTimeline, CalendarPlaceholder, CrmAnalyticsCharts, CrmDashboard, FollowupCards, PipelineKanban, ReportTiles } from "./components/CrmWidgets";
import { CrmStatusBadge } from "./components/CrmStatusBadge";

type CRMMode =
  | "dashboard" | "leads" | "lead-create" | "lead-details" | "lead-edit"
  | "accounts" | "account-create" | "account-details" | "account-edit"
  | "contacts" | "contact-create" | "contact-details" | "contact-edit"
  | "opportunities" | "opportunity-create" | "opportunity-details" | "opportunity-edit"
  | "pipeline" | "tasks" | "meetings" | "calendar" | "notes" | "files" | "activities" | "followups" | "reports";

const meta: Record<string, { title: string; description: string; icon: typeof Target }> = {
  dashboard: { title: "CRM Dashboard", description: "Sales command center for leads, accounts, opportunities, pipeline value, meetings, follow-ups, and conversion metrics.", icon: Target },
  leads: { title: "Leads", description: "Lead capture, qualification, source attribution, assigned owner, estimated value, and follow-up date.", icon: Target },
  "lead-create": { title: "Create Lead", description: "Static lead creation form prepared for future CRM workflows.", icon: Plus },
  "lead-details": { title: "Lead Details", description: "Lead profile, activities, notes, follow-ups, and qualification context.", icon: Target },
  "lead-edit": { title: "Edit Lead", description: "Update lead profile and qualification status.", icon: Target },
  accounts: { title: "Accounts", description: "Manage companies, account owners, contact people, account status, GST, and revenue context.", icon: BriefcaseBusiness },
  "account-create": { title: "Create Account", description: "Static account creation form prepared for future CRM workflows.", icon: Plus },
  "account-details": { title: "Account Details", description: "Account profile, contacts, opportunities, meetings, files, notes, and activity timeline.", icon: BriefcaseBusiness },
  "account-edit": { title: "Edit Account", description: "Update account profile and account owner.", icon: BriefcaseBusiness },
  contacts: { title: "Contacts", description: "Decision makers, influencers, phone, email, roles, and account relationships.", icon: Contact },
  "contact-create": { title: "Create Contact", description: "Static contact creation placeholder.", icon: Plus },
  "contact-details": { title: "Contact Details", description: "Contact profile with related account and activity context.", icon: Contact },
  "contact-edit": { title: "Edit Contact", description: "Static contact edit placeholder.", icon: Contact },
  opportunities: { title: "Opportunities", description: "Opportunity list with stage, estimated value, probability, close date, owner, and status.", icon: BadgeCheck },
  "opportunity-create": { title: "Create Opportunity", description: "Static opportunity creation form prepared for future sales workflows.", icon: Plus },
  "opportunity-details": { title: "Opportunity Details", description: "Opportunity profile with stage, activity, follow-ups, and account relationship.", icon: BadgeCheck },
  "opportunity-edit": { title: "Edit Opportunity", description: "Update opportunity stage, value, probability, and close date.", icon: BadgeCheck },
  pipeline: { title: "Sales Pipeline", description: "Kanban sales pipeline for opportunity stages and revenue movement.", icon: ListTodo },
  tasks: { title: "Tasks", description: "Task list for follow-ups, due dates, priorities, owners, and completion status.", icon: CheckCircle2 },
  meetings: { title: "Meetings", description: "Meeting list with account, date, time, owner, type, and schedule status.", icon: UsersRound },
  calendar: { title: "Calendar", description: "CRM calendar placeholder for meetings, follow-ups, demos, and renewals.", icon: CalendarDays },
  notes: { title: "Notes", description: "Internal notes, visit summaries, account intelligence, and team visibility.", icon: NotebookText },
  files: { title: "Files", description: "CRM file library for proposals, contracts, visit photos, and account documents.", icon: FolderOpen },
  activities: { title: "Activity Timeline", description: "Unified stream across calls, emails, meetings, notes, status changes, and follow-ups.", icon: FileText },
  followups: { title: "Follow-ups", description: "Pending follow-up cards by owner, priority, related record, and due date.", icon: RefreshCw },
  reports: { title: "Sales Reports", description: "CRM report tiles for pipeline forecast, lead source, win/loss, and owner performance.", icon: Download },
};

const useFilteredRows = <T extends Record<string, unknown>>(rows: T[], query: string) =>
  useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(q)));
  }, [rows, query]);

const Header = ({ mode }: { mode: CRMMode }) => {
  const current = meta[mode] || meta.dashboard;
  const Icon = current.icon;
  return (
    <PageToolbar
      title={current.title}
      description={current.description}
      start={<div className="mb-3 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300"><Icon className="h-5 w-5" /></div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">CRM + Sales Pipeline</p></div>}
      end={<><Link to="/leads/create" className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"><Plus className="h-4 w-4" />Create</Link><SecondaryButton icon={Upload}>Import</SecondaryButton><SecondaryButton icon={Download}>Export</SecondaryButton><SecondaryButton icon={RefreshCw}>Refresh</SecondaryButton></>}
    />
  );
};

const FilterBar = ({ query, setQuery, label }: { query: string; setQuery: (value: string) => void; label: string }) => (
  <AdvancedFilters title={`${label} filters`} activeCount={0}>
    <SearchInput value={query} onChange={setQuery} placeholder={`Search ${label.toLowerCase()}`} />
    <Select label="Status" value="" onChange={() => undefined} placeholder="All statuses" options={["New", "Qualified", "Proposal", "Active", "Open", "Review", "Scheduled"].map((value) => ({ label: value, value }))} />
    <Select label="Owner" value="" onChange={() => undefined} placeholder="All owners" options={["Nisha Kapoor", "Amit Batra", "Rahul Mehta", "Pooja Sen", "Vikram Iyer"].map((value) => ({ label: value, value }))} />
  </AdvancedFilters>
);

const DetailsPanel = ({ mode }: { mode: CRMMode }) => {
  const { id } = useParams();
  const lead = leads.find((item) => item.id === id) || leads[0];
  const account = accounts.find((item) => item.id === id) || accounts[0];
  const contact = contacts.find((item) => item.id === id) || contacts[0];
  const opportunity = opportunities.find((item) => item.id === id) || opportunities[0];
  const rows =
    mode.startsWith("lead") ? [["Lead", lead.leadName], ["Company", lead.company], ["Source", lead.source], ["Value", lead.estimatedValue], ["Owner", lead.assignedTo], ["Follow-up", lead.followupDate], ["Status", lead.status]] :
    mode.startsWith("account") ? [["Company", account.companyName], ["Industry", account.industry], ["GST", account.gstNumber], ["Contact", account.contactPerson], ["Revenue", account.revenue], ["Owner", account.accountOwner], ["Status", account.status]] :
    mode.startsWith("contact") ? [["Name", contact.name], ["Account", contact.account], ["Role", contact.role], ["Phone", contact.phone], ["Email", contact.email], ["City", contact.city], ["Status", contact.status]] :
    [["Opportunity", opportunity.opportunityName], ["Account", opportunity.account], ["Stage", opportunity.stage], ["Value", opportunity.estimatedValue], ["Probability", opportunity.probability], ["Close Date", opportunity.expectedCloseDate], ["Status", opportunity.status]];

  return (
    <div className="space-y-4">
      <section className={cn(panelBase, "p-4")}>
        <h2 className="text-sm font-semibold text-white">Record Summary</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{rows.map(([label, value]) => <div key={label} className="rounded-md border border-slate-800 bg-slate-900/70 p-3"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p><div className="mt-2 text-sm font-medium text-slate-200">{label === "Status" || label === "Stage" ? <CrmStatusBadge status={value} /> : value}</div></div>)}</div>
      </section>
      <ActivityTimeline />
      <FollowupCards />
    </div>
  );
};

const TableContent = ({ mode, query }: { mode: CRMMode; query: string }) => {
  const filteredLeads = useFilteredRows(leads, query);
  const filteredAccounts = useFilteredRows(accounts, query);
  const filteredContacts = useFilteredRows(contacts, query);
  const filteredOpportunities = useFilteredRows(opportunities, query);
  const filteredTasks = useFilteredRows(tasks, query);
  if (mode === "leads") return <LeadTable rows={filteredLeads} />;
  if (mode === "accounts") return <AccountTable rows={filteredAccounts} />;
  if (mode === "contacts") return <ContactTable rows={filteredContacts} />;
  if (mode === "opportunities") return <OpportunityTable rows={filteredOpportunities} />;
  if (mode === "tasks") return <TaskTable rows={filteredTasks} />;
  if (mode === "notes") return <GenericTable rows={notes} />;
  if (mode === "files") return <GenericTable rows={files} />;
  return <EmptyState title="CRM workspace ready" description="Static CRM records will appear here for this workflow." />;
};

const CRMWorkspace = ({ mode = "dashboard" }: { mode?: CRMMode }) => {
  const { id } = useParams();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const lead = leads.find((item) => item.id === id) || leads[0];
  const account = accounts.find((item) => item.id === id) || accounts[0];
  const opportunity = opportunities.find((item) => item.id === id) || opportunities[0];
  const tableModes: CRMMode[] = ["leads", "accounts", "contacts", "opportunities", "tasks", "notes", "files"];

  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      <Header mode={mode} />
      {mode === "dashboard" ? <><KPIGrid items={crmKpis} /><CrmDashboard insights={crmInsights} /></> : null}
      {mode === "lead-create" || mode === "lead-edit" ? <LeadForm record={mode === "lead-edit" ? lead : undefined} /> : null}
      {mode === "account-create" || mode === "account-edit" ? <AccountForm record={mode === "account-edit" ? account : undefined} /> : null}
      {mode === "opportunity-create" || mode === "opportunity-edit" ? <OpportunityForm record={mode === "opportunity-edit" ? opportunity : undefined} /> : null}
      {mode === "contact-create" || mode === "contact-edit" ? <section className={cn(panelBase, "p-4")}><h2 className="text-sm font-semibold text-white">{meta[mode].title}</h2><p className="mt-2 text-sm text-slate-500">Static contact form placeholder ready for contact fields.</p></section> : null}
      {["lead-details", "account-details", "contact-details", "opportunity-details"].includes(mode) ? <DetailsPanel mode={mode} /> : null}
      {mode === "pipeline" ? <PipelineKanban rows={opportunities} /> : null}
      {mode === "meetings" ? <MeetingCards rows={meetings} /> : null}
      {mode === "calendar" ? <CalendarPlaceholder /> : null}
      {mode === "activities" ? <ActivityTimeline /> : null}
      {mode === "followups" ? <FollowupCards /> : null}
      {mode === "reports" ? <><CrmAnalyticsCharts /><ReportTiles /></> : null}
      {tableModes.includes(mode) ? <><FilterBar query={query} setQuery={setQuery} label={meta[mode]?.title || "CRM"} /><TableContent mode={mode} query={query} /><Pagination page={page} pageCount={4} onPageChange={setPage} totalLabel={`Static records for ${meta[mode]?.title || "CRM"}`} /></> : null}
    </div>
  );
};

export default CRMWorkspace;
