import { PrimaryButton, ReusableFormLayout, SecondaryButton, Select, TextInput, Textarea } from "../../../Components/enterprise";
import type { DistributorRecord } from "../../../data/distributor/distributorDemoData";

const statusOptions = ["Active", "Pending Approval", "On Hold", "Inactive"].map((value) => ({ label: value, value }));

const FormFooter = () => (
  <div className="flex flex-wrap justify-end gap-2">
    <SecondaryButton>Save Draft</SecondaryButton>
    <PrimaryButton>Save</PrimaryButton>
  </div>
);

export const DistributorForm = ({ record }: { record?: DistributorRecord }) => (
  <ReusableFormLayout title="Distributor Profile" description="Static distributor form for future backend integration." columns={3} footer={<FormFooter />}>
    <TextInput label="Distributor Name" defaultValue={record?.distributorName} />
    <TextInput label="Distributor Code" defaultValue={record?.distributorCode} />
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
    <TextInput label="Assigned Sales Executive" defaultValue={record?.assignedSalesExecutive} />
    <TextInput label="Credit Limit" defaultValue={record?.creditLimit} />
    <TextInput label="Payment Terms" defaultValue={record?.paymentTerms} />
    <TextInput label="Bank Details" defaultValue={record?.bankDetails} />
    <Select label="Status" value={record?.status || ""} onChange={() => undefined} options={statusOptions} />
  </ReusableFormLayout>
);
