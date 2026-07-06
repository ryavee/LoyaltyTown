import { PrimaryButton, ReusableFormLayout, SecondaryButton, Select, TextInput, Textarea } from "../../../Components/enterprise";
import type { RetailerRecord } from "../../../data/retailer/retailerDemoData";

const Footer = () => <div className="flex flex-wrap justify-end gap-2"><SecondaryButton>Save Draft</SecondaryButton><PrimaryButton>Save</PrimaryButton></div>;

export const RetailerForm = ({ record }: { record?: RetailerRecord }) => (
  <ReusableFormLayout title="Retailer Profile" description="Static retailer profile form for onboarding and channel management." columns={3} footer={<Footer />}>
    <TextInput label="Retailer Name" defaultValue={record?.retailerName} />
    <TextInput label="Retailer Code" defaultValue={record?.retailerCode} />
    <TextInput label="Store Name" defaultValue={record?.storeName} />
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
    <TextInput label="Assigned Dealer" defaultValue={record?.assignedDealer} />
    <TextInput label="Assigned Distributor" defaultValue={record?.assignedDistributor} />
    <TextInput label="Assigned Sales Executive" defaultValue={record?.assignedSalesExecutive} />
    <TextInput label="Store Type" defaultValue={record?.storeType} />
    <TextInput label="Business Category" defaultValue={record?.businessCategory} />
    <TextInput label="Credit Limit" defaultValue={record?.creditLimit} />
    <TextInput label="Payment Terms" defaultValue={record?.paymentTerms} />
    <TextInput label="Bank Details" defaultValue={record?.bankDetails} />
    <Select label="Status" value={record?.status || ""} onChange={() => undefined} options={["Active", "Pending Approval", "On Hold", "Inactive"].map((value) => ({ label: value, value }))} />
  </ReusableFormLayout>
);
