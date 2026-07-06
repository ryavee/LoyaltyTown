import { PrimaryButton, ReusableFormLayout, SecondaryButton, Select, TextInput, Textarea } from "../../../Components/enterprise";
import type { ContractorRecord } from "../../../data/contractor/contractorDemoData";

const Footer = () => <div className="flex flex-wrap justify-end gap-2"><SecondaryButton>Save Draft</SecondaryButton><PrimaryButton>Save</PrimaryButton></div>;

export const ContractorForm = ({ record }: { record?: ContractorRecord }) => (
  <ReusableFormLayout title="Contractor Profile" description="Static contractor onboarding form for future channel workflows." columns={3} footer={<Footer />}>
    <TextInput label="Contractor Name" defaultValue={record?.contractorName} />
    <TextInput label="Contractor Code" defaultValue={record?.contractorCode} />
    <Select label="Contractor Type" value={record?.contractorType || ""} onChange={() => undefined} options={["Painter", "Electrician", "Mason", "Carpenter", "Plumber", "Fabricator", "Installer", "Architect", "Interior Designer"].map((value) => ({ label: value, value }))} />
    <TextInput label="Mobile" defaultValue={record?.mobile} />
    <TextInput label="Email" defaultValue={record?.email} />
    <Textarea label="Address" defaultValue={record?.address} />
    <TextInput label="City" defaultValue={record?.city} />
    <TextInput label="State" defaultValue={record?.state} />
    <TextInput label="Country" defaultValue={record?.country} />
    <TextInput label="PIN Code" defaultValue={record?.pinCode} />
    <TextInput label="Specialization" defaultValue={record?.specialization} />
    <TextInput label="Experience Years" defaultValue={record?.experienceYears} />
    <TextInput label="License Number" defaultValue={record?.licenseNumber} />
    <TextInput label="Assigned Dealer" defaultValue={record?.assignedDealer} />
    <TextInput label="Assigned Distributor" defaultValue={record?.assignedDistributor} />
    <TextInput label="Assigned Sales Executive" defaultValue={record?.assignedSalesExecutive} />
    <TextInput label="Bank Details" defaultValue={record?.bankDetails} />
    <Select label="KYC Status" value={record?.kycStatus || ""} onChange={() => undefined} options={["Verified", "Pending", "Rejected"].map((value) => ({ label: value, value }))} />
    <Select label="Tier Status" value={record?.tierStatus || ""} onChange={() => undefined} options={["Platinum", "Gold", "Silver", "Bronze"].map((value) => ({ label: value, value }))} />
    <Select label="Status" value={record?.status || ""} onChange={() => undefined} options={["Active", "Pending Verification", "On Hold", "Inactive"].map((value) => ({ label: value, value }))} />
  </ReusableFormLayout>
);
