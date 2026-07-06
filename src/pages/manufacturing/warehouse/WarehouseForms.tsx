import { PrimaryButton, ReusableFormLayout, SecondaryButton, Select, TextInput, Textarea } from "../../../Components/enterprise";
import type { InventoryRecord } from "../../../data/warehouse/inventoryDemoData";
import type { BinRecord, WarehouseRecord } from "../../../data/warehouse/warehouseDemoData";

const statusOptions = ["Active", "High Utilization", "Maintenance", "Inactive"].map((value) => ({ label: value, value }));
const binStatusOptions = ["Available", "Occupied", "Reserved", "Blocked"].map((value) => ({ label: value, value }));
const inventoryStatusOptions = ["Healthy", "Low Stock", "Out Of Stock", "Near Expiry", "Blocked", "Damaged"].map((value) => ({ label: value, value }));

const FormFooter = () => (
  <div className="flex flex-wrap justify-end gap-2">
    <SecondaryButton type="button">Save Draft</SecondaryButton>
    <PrimaryButton type="button">Save</PrimaryButton>
  </div>
);

export const WarehouseForm = ({ record }: { record?: WarehouseRecord }) => (
  <div className="space-y-4">
    <ReusableFormLayout title="Warehouse Details" description="Static frontend form prepared for warehouse master data." footer={<FormFooter />}>
      <TextInput label="Warehouse Name" defaultValue={record?.name} placeholder="Central Finished Goods Warehouse" />
      <TextInput label="Warehouse Code" defaultValue={record?.code} placeholder="WH-CFG-01" />
      <TextInput label="Factory" defaultValue={record?.factory} placeholder="Pune Smart Factory" />
      <TextInput label="Location" defaultValue={record?.location} placeholder="Pune, Maharashtra" />
      <Textarea label="Address" defaultValue={record?.address} placeholder="Warehouse address" />
      <TextInput label="Manager" defaultValue={record?.manager} placeholder="Warehouse manager" />
      <TextInput label="Phone" defaultValue={record?.phone} placeholder="+91..." />
      <TextInput label="Email" defaultValue={record?.email} placeholder="manager@company.com" />
      <TextInput label="Capacity" defaultValue={record?.capacity} placeholder="120,000 units" />
      <TextInput label="Storage Type" defaultValue={record?.storageType} placeholder="Ambient / Pallet" />
      <Select label="Status" value={record?.status || ""} onChange={() => undefined} options={statusOptions} />
    </ReusableFormLayout>
  </div>
);

export const BinForm = ({ record }: { record?: BinRecord }) => (
  <ReusableFormLayout title="Bin Location" description="Static bin/rack location form for warehouse capacity planning." footer={<FormFooter />}>
    <TextInput label="Warehouse" defaultValue={record?.warehouse} placeholder="Central Finished Goods Warehouse" />
    <TextInput label="Bin Number" defaultValue={record?.binNumber} placeholder="A-01-04" />
    <TextInput label="Rack" defaultValue={record?.rack} placeholder="A-01" />
    <TextInput label="Floor" defaultValue={record?.floor} placeholder="Ground" />
    <TextInput label="Zone" defaultValue={record?.zone} placeholder="Zone A" />
    <TextInput label="Capacity" defaultValue={record?.capacity} placeholder="2,400" />
    <TextInput label="Available Capacity" defaultValue={record?.availableCapacity} placeholder="520" />
    <Select label="Status" value={record?.status || ""} onChange={() => undefined} options={binStatusOptions} />
  </ReusableFormLayout>
);

export const InventoryForm = ({ record }: { record?: InventoryRecord }) => (
  <ReusableFormLayout title="Inventory Stock Record" description="Static inventory form covering product, batch, warehouse, bin, quantity, pricing, and expiry." footer={<FormFooter />} columns={3}>
    <TextInput label="Product" defaultValue={record?.product} placeholder="Industrial Adhesive Pro" />
    <TextInput label="SKU" defaultValue={record?.sku} placeholder="ADH-PRO-20KG" />
    <TextInput label="Batch" defaultValue={record?.batch} placeholder="BTH-2407-001" />
    <TextInput label="Warehouse" defaultValue={record?.warehouse} placeholder="Central Warehouse" />
    <TextInput label="Bin" defaultValue={record?.bin} placeholder="A-01-04" />
    <TextInput label="Available Qty" defaultValue={record?.availableQty} placeholder="18,420" />
    <TextInput label="Reserved Qty" defaultValue={record?.reservedQty} placeholder="2,180" />
    <TextInput label="Blocked Qty" defaultValue={record?.blockedQty} placeholder="120" />
    <TextInput label="Damaged Qty" defaultValue={record?.damagedQty} placeholder="18" />
    <TextInput label="MRP" defaultValue={record?.mrp} placeholder="$42" />
    <TextInput label="Cost Price" defaultValue={record?.costPrice} placeholder="$21" />
    <TextInput label="Selling Price" defaultValue={record?.sellingPrice} placeholder="$38" />
    <TextInput label="Expiry" type="date" defaultValue={record?.expiry} />
    <Select label="Status" value={record?.status || ""} onChange={() => undefined} options={inventoryStatusOptions} />
  </ReusableFormLayout>
);
