import { PrimaryButton, ReusableFormLayout, SecondaryButton, Select, TextInput, Textarea } from "../../../Components/enterprise";
import type { AccountRecord } from "../../../data/crm/accountDemoData";
import type { LeadRecord } from "../../../data/crm/leadDemoData";
import type { OpportunityRecord } from "../../../data/crm/opportunityDemoData";

const Footer = () => <div className="flex flex-wrap justify-end gap-2"><SecondaryButton>Save Draft</SecondaryButton><PrimaryButton>Save</PrimaryButton></div>;

export const LeadForm = ({ record }: { record?: LeadRecord }) => (
  <ReusableFormLayout title="Lead Profile" description="Static lead form prepared for future CRM workflows." columns={3} footer={<Footer />}>
    <TextInput label="Lead Name" defaultValue={record?.leadName} /><TextInput label="Company" defaultValue={record?.company} /><TextInput label="Industry" defaultValue={record?.industry} />
    <TextInput label="Mobile" defaultValue={record?.mobile} /><TextInput label="Email" defaultValue={record?.email} /><TextInput label="Source" defaultValue={record?.source} />
    <Select label="Status" value={record?.status || ""} onChange={() => undefined} options={["New", "Qualified", "Nurture", "Proposal"].map((value) => ({ label: value, value }))} />
    <TextInput label="Assigned To" defaultValue={record?.assignedTo} /><TextInput label="Estimated Value" defaultValue={record?.estimatedValue} /><TextInput label="Follow-up Date" defaultValue={record?.followupDate} />
  </ReusableFormLayout>
);

export const AccountForm = ({ record }: { record?: AccountRecord }) => (
  <ReusableFormLayout title="Account Profile" description="Static account form prepared for future CRM workflows." columns={3} footer={<Footer />}>
    <TextInput label="Company Name" defaultValue={record?.companyName} /><TextInput label="Industry" defaultValue={record?.industry} /><TextInput label="GST Number" defaultValue={record?.gstNumber} />
    <TextInput label="Website" defaultValue={record?.website} /><TextInput label="Contact Person" defaultValue={record?.contactPerson} /><TextInput label="Phone" defaultValue={record?.phone} />
    <TextInput label="Email" defaultValue={record?.email} /><Textarea label="Address" defaultValue={record?.address} /><Select label="Status" value={record?.status || ""} onChange={() => undefined} options={["Active", "Review", "Inactive"].map((value) => ({ label: value, value }))} />
    <TextInput label="Account Owner" defaultValue={record?.accountOwner} />
  </ReusableFormLayout>
);

export const OpportunityForm = ({ record }: { record?: OpportunityRecord }) => (
  <ReusableFormLayout title="Opportunity" description="Static opportunity form prepared for future sales pipeline workflows." columns={3} footer={<Footer />}>
    <TextInput label="Opportunity Name" defaultValue={record?.opportunityName} /><TextInput label="Account" defaultValue={record?.account} />
    <Select label="Stage" value={record?.stage || ""} onChange={() => undefined} options={["New", "Qualified", "Proposal", "Negotiation", "Won", "Lost"].map((value) => ({ label: value, value }))} />
    <TextInput label="Estimated Value" defaultValue={record?.estimatedValue} /><TextInput label="Probability" defaultValue={record?.probability} /><TextInput label="Expected Close Date" defaultValue={record?.expectedCloseDate} />
    <TextInput label="Assigned To" defaultValue={record?.assignedTo} /><Select label="Status" value={record?.status || ""} onChange={() => undefined} options={["Active", "Open", "Review", "Won", "Lost"].map((value) => ({ label: value, value }))} />
  </ReusableFormLayout>
);
