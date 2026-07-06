import { PrimaryButton, ReusableFormLayout, SecondaryButton, Select, TextInput, Textarea } from "../../../Components/enterprise";

const footer = (
  <div className="flex flex-wrap justify-end gap-2">
    <SecondaryButton>Save Draft</SecondaryButton>
    <PrimaryButton>Submit</PrimaryButton>
  </div>
);

const statusOptions = ["Open", "Assigned", "Pending", "Approved", "Rejected", "Resolved", "Closed"].map((value) => ({ label: value, value }));

export const WarrantyRegistrationForm = () => (
  <ReusableFormLayout title="Register Warranty" description="Static warranty registration form ready for backend binding." columns={3} footer={footer}>
    <TextInput label="Customer" defaultValue="Aarav Sharma" />
    <TextInput label="Product" defaultValue="WeatherShield Pro Paint" />
    <TextInput label="SKU" defaultValue="WSP-20L-EXT" />
    <TextInput label="Serial Number" defaultValue="SN-WSP-882901" />
    <TextInput label="QR Code" defaultValue="LT-GENUINE-1001" />
    <TextInput label="Purchase Date" type="date" defaultValue="2026-07-01" />
    <TextInput label="Invoice" defaultValue="INV-MBM-9011" />
    <TextInput label="Dealer" defaultValue="Metro Build Mart" />
    <TextInput label="Retailer" defaultValue="Urban Paint Point" />
    <Select label="Warranty Type" value="Standard" onChange={() => undefined} options={[{ label: "Standard", value: "Standard" }, { label: "Extended", value: "Extended" }, { label: "Project", value: "Project" }]} />
    <TextInput label="Warranty Start" type="date" defaultValue="2026-07-05" />
    <TextInput label="Warranty End" type="date" defaultValue="2029-07-05" />
    <Select label="Status" value="Registered" onChange={() => undefined} options={statusOptions} />
  </ReusableFormLayout>
);

export const ClaimForm = () => (
  <ReusableFormLayout title="Create Warranty Claim" description="Static claim intake form with evidence, priority, assignment, and status." columns={3} footer={footer}>
    <TextInput label="Claim Number" defaultValue="CLM-88204" />
    <TextInput label="Customer" defaultValue="Aarav Sharma" />
    <TextInput label="Product" defaultValue="WeatherShield Pro Paint" />
    <TextInput label="QR Code" defaultValue="LT-GENUINE-1001" />
    <TextInput label="Issue" defaultValue="Surface peeling" />
    <Select label="Priority" value="High" onChange={() => undefined} options={["Low", "Medium", "High", "Critical"].map((value) => ({ label: value, value }))} />
    <TextInput label="Assigned Engineer" defaultValue="Priya Nair" />
    <TextInput label="Photos" defaultValue="3 photos attached" />
    <TextInput label="Videos" defaultValue="1 video attached" />
    <Select label="Status" value="Pending" onChange={() => undefined} options={statusOptions} />
    <Textarea label="Description" defaultValue="Peeling after monsoon exposure. Customer has invoice and QR proof." className="lg:col-span-2" />
  </ReusableFormLayout>
);

export const ServiceRequestForm = () => (
  <ReusableFormLayout title="Create Service Request" description="Static service request form for future field service workflow." columns={3} footer={footer}>
    <TextInput label="Service Number" defaultValue="SRV-74004" />
    <TextInput label="Customer" defaultValue="Urban Build Co." />
    <TextInput label="Location" defaultValue="Chennai" />
    <TextInput label="Technician" defaultValue="Maya Krishnan" />
    <TextInput label="Issue" defaultValue="Repair assessment" />
    <Select label="Priority" value="Critical" onChange={() => undefined} options={["Low", "Medium", "High", "Critical"].map((value) => ({ label: value, value }))} />
    <Select label="Status" value="Open" onChange={() => undefined} options={statusOptions} />
    <TextInput label="Schedule" defaultValue="2026-07-08 10:00" />
    <Textarea label="Notes" defaultValue="Bring inspection kit and product reference samples." />
  </ReusableFormLayout>
);
