import { PrimaryButton, ReusableFormLayout, SecondaryButton, Select, TextInput, Textarea } from "../../../Components/enterprise";

const footer = (
  <div className="flex flex-wrap justify-end gap-2">
    <SecondaryButton>Save Draft</SecondaryButton>
    <PrimaryButton>Generate</PrimaryButton>
  </div>
);

export const InvoiceForm = () => (
  <ReusableFormLayout title="Create Invoice" description="Static invoice form for future billing and GST workflows." columns={3} footer={footer}>
    <TextInput label="Invoice Number" defaultValue="LT-INV-2026-1005" />
    <TextInput label="Customer" defaultValue="Metro Build Mart" />
    <TextInput label="Company" defaultValue="Apex Paints India" />
    <TextInput label="GST Number" defaultValue="27AABCA1234F1Z5" />
    <TextInput label="Products" defaultValue="Enterprise subscription, QR credits" />
    <TextInput label="Tax" defaultValue="₹3.24L" />
    <TextInput label="Discount" defaultValue="₹42K" />
    <TextInput label="Total" defaultValue="₹21.42L" />
    <TextInput label="Due Date" type="date" defaultValue="2026-07-15" />
    <Select label="Payment Status" value="Pending" onChange={() => undefined} options={["Pending", "Paid", "Failed", "Overdue"].map((value) => ({ label: value, value }))} />
    <Textarea label="Notes" defaultValue="Static preview only. Backend invoice creation will be connected later." className="lg:col-span-2" />
  </ReusableFormLayout>
);

export const ExpenseForm = () => (
  <ReusableFormLayout title="Create Expense" description="Static expense entry form for categories, approvals, and accounting posting." columns={3} footer={footer}>
    <TextInput label="Expense" defaultValue="Cloud infrastructure" />
    <Select label="Category" value="Hosting" onChange={() => undefined} options={["Hosting", "Messaging", "Operations", "Sales"].map((value) => ({ label: value, value }))} />
    <TextInput label="Owner" defaultValue="Platform Ops" />
    <TextInput label="Amount" defaultValue="₹18.4L" />
    <TextInput label="Date" type="date" defaultValue="2026-07-05" />
    <Select label="Approval" value="Pending" onChange={() => undefined} options={["Pending", "Approved", "Rejected"].map((value) => ({ label: value, value }))} />
  </ReusableFormLayout>
);
