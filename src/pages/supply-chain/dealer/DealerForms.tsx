import { PrimaryButton, ReusableFormLayout, SecondaryButton, Select, TextInput, Textarea } from "../../../Components/enterprise";
import type { DealerRecord } from "../../../data/dealer/dealerDemoData";

const statusOptions = ["Active", "Pending Approval", "On Hold", "Inactive"].map((value) => ({ label: value, value }));

const Footer = () => (
  <div className="flex flex-wrap justify-end gap-2">
    <SecondaryButton>Save Draft</SecondaryButton>
    <PrimaryButton>Save</PrimaryButton>
  </div>
);

export const DealerForm = ({ record }: { record?: DealerRecord }) => (
  <ReusableFormLayout title="Dealer Profile" description="Static dealer form for future onboarding and profile workflows." columns={3} footer={<Footer />}>
    <TextInput label="Dealer Name" defaultValue={record?.dealerName} />
    <TextInput label="Dealer Code" defaultValue={record?.dealerCode} />
    <TextInput label="Company Name" defaultValue={record?.companyName} />
    <TextInput label="GST Number" defaultValue={record?.gstNumber} />
    <TextInput label="PAN Number" defaultValue={record?.panNumber} />
    <TextInput label="Contact Person" defaultValue={record?.contactPerson} />
    <TextInput label="Mobile" defaultValue={record?.mobile} />
    <TextInput label="Email" defaultValue={record?.email} />
    <Textarea label="Address" defaultValue={record?.address} />
    <TextInput label="City" defaultValue={record?.city} />
    <TextInput label="State" defaultValue={record?.state} />
    <TextInput label="Country" defaultValue={record?.country} />
    <TextInput label="PIN Code" defaultValue={record?.pinCode} />
    <TextInput label="Territory" defaultValue={record?.territory} />
    <TextInput label="Assigned Distributor" defaultValue={record?.assignedDistributor} />
    <TextInput label="Assigned Sales Executive" defaultValue={record?.assignedSalesExecutive} />
    <TextInput label="Credit Limit" defaultValue={record?.creditLimit} />
    <TextInput label="Payment Terms" defaultValue={record?.paymentTerms} />
    <TextInput label="Bank Details" defaultValue={record?.bankDetails} />
    <Select label="Status" value={record?.status || ""} onChange={() => undefined} options={statusOptions} />
  </ReusableFormLayout>
);
