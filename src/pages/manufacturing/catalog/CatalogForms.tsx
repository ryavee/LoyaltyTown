import { Save, Upload } from "lucide-react";
import {
  ImportButton,
  PrimaryButton,
  ReusableFormLayout,
  SecondaryButton,
  Select,
  TextInput,
  Textarea,
  Toggle,
} from "../../../Components/enterprise";
import {
  brands,
  categories,
  statuses,
} from "../../../data/productDemoData";
import type { BrandRecord, CategoryRecord, SkuRecord } from "../../../data/catalogDemoData";

const options = (items: string[]) => items.map((item) => ({ label: item, value: item }));
const catalogStatusOptions = ["Active", "Inactive", "Archived", "Draft"].map((item) => ({ label: item, value: item }));

export const CategoryForm = ({ record }: { record?: CategoryRecord }) => (
  <div className="space-y-4">
    <ReusableFormLayout title="Category Details" description="Hierarchy, display order, icon, and catalog metadata.">
      <TextInput label="Category Name" defaultValue={record?.name || ""} />
      <TextInput label="Category Code" defaultValue={record?.code || ""} />
      <Select label="Parent Category" value={record?.parent === "Root" ? "" : record?.parent || ""} onChange={() => undefined} options={options(categories)} />
      <TextInput label="Display Order" defaultValue={record?.displayOrder || ""} />
      <Textarea label="Description" defaultValue={record?.description || ""} className="md:col-span-2" />
    </ReusableFormLayout>
    <ReusableFormLayout title="Media" description="Static icon and image upload placeholders.">
      <ImportButton label="Upload Icon" />
      <ImportButton label="Upload Image" />
    </ReusableFormLayout>
    <ReusableFormLayout title="SEO" description="Consumer catalog metadata.">
      <TextInput label="SEO Title" defaultValue={record?.seoTitle || ""} />
      <Textarea label="SEO Description" defaultValue={record?.seoDescription || ""} />
    </ReusableFormLayout>
    <ReusableFormLayout title="Status" footer={<FormFooter />}>
      <Select label="Status" value={record?.status || "Active"} onChange={() => undefined} options={catalogStatusOptions} />
    </ReusableFormLayout>
  </div>
);

export const BrandForm = ({ record }: { record?: BrandRecord }) => (
  <div className="space-y-4">
    <ReusableFormLayout title="Brand Identity" description="Brand name, code, country, website, and description.">
      <TextInput label="Brand Name" defaultValue={record?.name || ""} />
      <TextInput label="Brand Code" defaultValue={record?.code || ""} />
      <TextInput label="Country" defaultValue={record?.country || ""} />
      <TextInput label="Website" defaultValue={record?.website || ""} />
      <Textarea label="Description" defaultValue={record?.description || ""} className="md:col-span-2" />
    </ReusableFormLayout>
    <ReusableFormLayout title="Brand Assets" description="Logo, banner, and visual theme colors.">
      <ImportButton label="Upload Logo" />
      <ImportButton label="Upload Banner" />
      <TextInput label="Primary Color" defaultValue={record?.primaryColor || "#22d3ee"} />
      <TextInput label="Secondary Color" defaultValue={record?.secondaryColor || "#0f172a"} />
    </ReusableFormLayout>
    <ReusableFormLayout title="Status" footer={<FormFooter />}>
      <Select label="Status" value={record?.status || "Active"} onChange={() => undefined} options={catalogStatusOptions} />
    </ReusableFormLayout>
  </div>
);

export const SkuForm = ({ record }: { record?: SkuRecord }) => (
  <div className="space-y-4">
    <ReusableFormLayout title="SKU Identity" description="Product, category, brand, and SKU code.">
      <TextInput label="SKU Code" defaultValue={record?.skuCode || ""} />
      <Select label="Product" value={record?.product || ""} onChange={() => undefined} options={options(["LT Shield Pro", "LT Bond Max", "LT Seal Guard", "LT Pump Motor"])} />
      <Select label="Category" value={record?.category || ""} onChange={() => undefined} options={options(categories)} />
      <Select label="Brand" value={record?.brand || ""} onChange={() => undefined} options={options(brands)} />
    </ReusableFormLayout>
    <ReusableFormLayout title="Pricing" description="Static pricing fields for future pricing APIs.">
      <TextInput label="MRP" defaultValue={record?.mrp || ""} />
      <TextInput label="Base Price" defaultValue={record?.basePrice || ""} />
      <TextInput label="Selling Price" defaultValue={record?.sellingPrice || ""} />
      <TextInput label="Unit" defaultValue={record?.unit || ""} />
    </ReusableFormLayout>
    <ReusableFormLayout title="Attributes" columns={3}>
      <TextInput label="Weight" defaultValue={record?.weight || ""} />
      <TextInput label="Dimensions" defaultValue={record?.dimensions || ""} />
      <TextInput label="Color" defaultValue={record?.color || ""} />
      <TextInput label="Size" defaultValue={record?.size || ""} />
      <TextInput label="Warranty" defaultValue={record?.warranty || ""} />
      <Select label="Status" value={record?.status || "Active"} onChange={() => undefined} options={catalogStatusOptions} />
    </ReusableFormLayout>
    <ReusableFormLayout title="Controls" description="SKU QR, warranty, and batch controls." footer={<FormFooter />}>
      <Toggle label="QR Required" checked={record?.qrRequired !== "No"} onChange={() => undefined} />
      <Toggle label="Batch Required" checked={record?.batchRequired !== "No"} onChange={() => undefined} />
      <Toggle label="Warranty Enabled" checked={Boolean(record?.warranty)} onChange={() => undefined} />
    </ReusableFormLayout>
  </div>
);

const FormFooter = () => (
  <div className="flex flex-wrap justify-end gap-2">
    <SecondaryButton icon={Upload}>Save Draft</SecondaryButton>
    <PrimaryButton icon={Save}>Save</PrimaryButton>
  </div>
);
