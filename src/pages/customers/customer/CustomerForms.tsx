import { PrimaryButton, ReusableFormLayout, SecondaryButton, Select, TextInput, Textarea } from "../../../Components/enterprise";
import type { CustomerRecord } from "../../../data/customer/customerDemoData";

const Footer = () => <div className="flex flex-wrap justify-end gap-2"><SecondaryButton>Save Draft</SecondaryButton><PrimaryButton>Save</PrimaryButton></div>;

export const CustomerForm = ({ record }: { record?: CustomerRecord }) => (
  <ReusableFormLayout title="Customer Profile" description="Static customer profile form prepared for future customer workflows." columns={3} footer={<Footer />}>
    <TextInput label="Customer ID" defaultValue={record?.customerId} />
    <TextInput label="First Name" defaultValue={record?.firstName} />
    <TextInput label="Last Name" defaultValue={record?.lastName} />
    <TextInput label="Mobile" defaultValue={record?.mobile} />
    <TextInput label="Email" defaultValue={record?.email} />
    <Select label="Gender" value={record?.gender || ""} onChange={() => undefined} options={["Male", "Female", "Business", "Other"].map((value) => ({ label: value, value }))} />
    <TextInput label="DOB" defaultValue={record?.dob} />
    <Textarea label="Address" defaultValue={record?.address} />
    <TextInput label="City" defaultValue={record?.city} />
    <TextInput label="State" defaultValue={record?.state} />
    <TextInput label="Country" defaultValue={record?.country} />
    <TextInput label="PIN Code" defaultValue={record?.pinCode} />
    <TextInput label="Occupation" defaultValue={record?.occupation} />
    <TextInput label="Preferred Language" defaultValue={record?.preferredLanguage} />
    <TextInput label="Preferred Channel" defaultValue={record?.preferredChannel} />
    <Select label="Status" value={record?.status || ""} onChange={() => undefined} options={["Active", "Inactive", "At Risk", "New"].map((value) => ({ label: value, value }))} />
    <Select label="KYC Status" value={record?.kycStatus || ""} onChange={() => undefined} options={["Verified", "Pending", "Rejected"].map((value) => ({ label: value, value }))} />
    <TextInput label="Registration Source" defaultValue={record?.registrationSource} />
    <Select label="Customer Tier" value={record?.customerTier || ""} onChange={() => undefined} options={["Platinum", "Gold", "Silver", "Bronze"].map((value) => ({ label: value, value }))} />
    <TextInput label="Lifetime Value" defaultValue={record?.lifetimeValue} />
  </ReusableFormLayout>
);
