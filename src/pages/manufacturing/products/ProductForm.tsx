import { Save, Upload } from "lucide-react";
import {
  ReusableFormLayout,
  Select,
  TextInput,
  Textarea,
  Toggle,
  ImportButton,
  PrimaryButton,
  SecondaryButton,
} from "../../../Components/enterprise";
import { brands, categories, statuses, type ProductRecord } from "../../../data/productDemoData";

type ProductFormProps = {
  mode: "create" | "edit" | "clone";
  product?: ProductRecord;
};

const statusOptions = statuses.map((status) => ({ label: status, value: status }));
const brandOptions = brands.map((brand) => ({ label: brand, value: brand }));
const categoryOptions = categories.map((category) => ({ label: category, value: category }));

export const ProductForm = ({ mode, product }: ProductFormProps) => {
  const prefix = mode === "clone" ? "Copy of " : "";

  return (
    <div className="space-y-4">
      <ReusableFormLayout title="Basic Details" description="Core product identity and internal catalog information.">
        <TextInput label="Product Name" defaultValue={`${prefix}${product?.name || ""}`} placeholder="Enter product name" />
        <TextInput label="Product Code" defaultValue={mode === "clone" ? `${product?.code || "PRODUCT"}-COPY` : product?.code || ""} placeholder="LT-PRODUCT-CODE" />
        <Textarea label="Description" defaultValue={product?.description || ""} placeholder="Detailed product description" className="md:col-span-2" />
        <Textarea label="Short Description" defaultValue={product?.shortDescription || ""} placeholder="Short channel and consumer summary" className="md:col-span-2" rows={3} />
      </ReusableFormLayout>

      <ReusableFormLayout title="Category & Brand" description="Classify product for catalogs, reporting, and role-based workflows.">
        <Select label="Brand" value={product?.brand || ""} onChange={() => undefined} options={brandOptions} />
        <Select label="Category" value={product?.category || ""} onChange={() => undefined} options={categoryOptions} />
      </ReusableFormLayout>

      <ReusableFormLayout title="Product Images" description="Static upload placeholders for future media integration." columns={3}>
        {["Primary Image", "Packaging Image", "Label Artwork"].map((label) => (
          <div key={label} className="flex min-h-36 flex-col items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-900/60 p-4 text-center">
            <Upload className="h-6 w-6 text-cyan-300" />
            <p className="mt-3 text-sm font-semibold text-slate-200">{label}</p>
            <p className="mt-1 text-xs text-slate-500">PNG, JPG, WEBP</p>
          </div>
        ))}
      </ReusableFormLayout>

      <ReusableFormLayout title="Product Documents" description="Attach product specification sheets, certifications, and warranty documents.">
        <ImportButton label="Upload Specification Sheet" />
        <ImportButton label="Upload Warranty Document" />
      </ReusableFormLayout>

      <ReusableFormLayout title="Specifications" description="Key specification attributes for product display and downstream SKU setup." columns={3}>
        <TextInput label="Material / Composition" defaultValue="Industrial polymer blend" />
        <TextInput label="Pack Size" defaultValue="20 KG" />
        <TextInput label="Shelf Life" defaultValue="24 months" />
        <TextInput label="Application Surface" defaultValue="Concrete, panels, flooring" />
        <TextInput label="Storage Condition" defaultValue="Cool and dry" />
        <TextInput label="Compliance Code" defaultValue="ISO-9001 / GS1 ready" />
      </ReusableFormLayout>

      <ReusableFormLayout title="Warranty Defaults" description="Default warranty configuration for consumer and channel workflows.">
        <TextInput label="Default Warranty Duration" defaultValue={product?.warrantyMonths ? String(product.warrantyMonths) : ""} placeholder="Months" />
        <Toggle label="MRP Visibility" checked onChange={() => undefined} />
      </ReusableFormLayout>

      <ReusableFormLayout title="SEO / Consumer Display Content" description="Content shown on product verification and consumer portal journeys.">
        <TextInput label="Consumer Display Name" defaultValue={product?.consumerDisplayName || ""} placeholder="Consumer-facing product name" />
        <TextInput label="SEO Slug" defaultValue={(product?.consumerDisplayName || "new-product").toLowerCase().replace(/\s+/g, "-")} />
      </ReusableFormLayout>

      <ReusableFormLayout
        title="Status"
        description="Set the product lifecycle state for frontend workflows."
        footer={
          <div className="flex flex-wrap justify-end gap-2">
            <SecondaryButton>Save Draft</SecondaryButton>
            <PrimaryButton icon={Save}>{mode === "clone" ? "Create Clone" : mode === "edit" ? "Save Changes" : "Create Product"}</PrimaryButton>
          </div>
        }
      >
        <Select label="Status" value={product?.status || "Draft"} onChange={() => undefined} options={statusOptions} />
      </ReusableFormLayout>
    </div>
  );
};
