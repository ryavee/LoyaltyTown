import { Save } from "lucide-react";
import { PrimaryButton, ReusableFormLayout, Select, TextInput, Textarea } from "../../../Components/enterprise";
import type { FactoryRecord } from "../../../data/manufacturing/factoryDemoData";
import type { MachineRecord } from "../../../data/manufacturing/machineDemoData";
import type { OperatorRecord, ShiftRecord } from "../../../data/manufacturing/operatorDemoData";
import type { ProductionLineRecord, ProductionOrderRecord } from "../../../data/manufacturing/productionDemoData";
import type { QCRecord } from "../../../data/manufacturing/qcDemoData";

const options = (items: string[]) => items.map((item) => ({ label: item, value: item }));
const factories = options(["Pune Smart Factory", "Surat Coatings Plant", "Chennai Assembly Hub"]);
const statuses = options(["Active", "Inactive", "Running", "Idle", "Maintenance", "Breakdown", "Planned", "In Production", "Completed", "QC Hold", "Cancelled", "Passed", "Failed", "Rework"]);

const footer = <div className="flex justify-end"><PrimaryButton icon={Save}>Save</PrimaryButton></div>;

export const FactoryForm = ({ record }: { record?: FactoryRecord }) => (
  <ReusableFormLayout title="Factory Details" description="Factory identity, address, contacts, certifications, and status." columns={2} footer={footer}>
    <TextInput label="Factory Name" defaultValue={record?.name || ""} />
    <TextInput label="Factory Code" defaultValue={record?.code || ""} />
    <TextInput label="Company" defaultValue={record?.company || ""} />
    <TextInput label="Address" defaultValue={record?.address || ""} />
    <TextInput label="City" defaultValue={record?.city || ""} />
    <TextInput label="State" defaultValue={record?.state || ""} />
    <TextInput label="Country" defaultValue={record?.country || ""} />
    <TextInput label="Pin Code" defaultValue={record?.pinCode || ""} />
    <TextInput label="Geo Location" defaultValue={record?.geoLocation || ""} />
    <TextInput label="Contact Person" defaultValue={record?.contactPerson || ""} />
    <TextInput label="Contact Number" defaultValue={record?.contactNumber || ""} />
    <TextInput label="Email" defaultValue={record?.email || ""} />
    <TextInput label="Certifications" defaultValue={record?.certifications || ""} />
    <Select label="Status" value={record?.status || "Active"} onChange={() => undefined} options={statuses} />
  </ReusableFormLayout>
);

export const ProductionOrderForm = ({ record }: { record?: ProductionOrderRecord }) => (
  <ReusableFormLayout title="Production Order" description="Plan and track production order execution." columns={2} footer={footer}>
    <TextInput label="Production Order Number" defaultValue={record?.orderNumber || ""} />
    <Select label="Factory" value={record?.factory || ""} onChange={() => undefined} options={factories} />
    <TextInput label="Production Line" defaultValue={record?.productionLine || ""} />
    <TextInput label="Product" defaultValue={record?.product || ""} />
    <TextInput label="SKU" defaultValue={record?.sku || ""} />
    <TextInput label="Planned Quantity" defaultValue={record?.plannedQuantity || ""} />
    <TextInput label="Actual Quantity" defaultValue={record?.actualQuantity || ""} />
    <TextInput label="Production Date" type="date" defaultValue={record?.productionDate || ""} />
    <TextInput label="Shift" defaultValue={record?.shift || ""} />
    <TextInput label="Supervisor" defaultValue={record?.supervisor || ""} />
    <Select label="Status" value={record?.status || "Planned"} onChange={() => undefined} options={statuses} />
    <Textarea label="Remarks" defaultValue={record?.remarks || ""} />
  </ReusableFormLayout>
);

export const ProductionLineForm = ({ record }: { record?: ProductionLineRecord }) => (
  <ReusableFormLayout title="Production Line" columns={2} footer={footer}>
    <TextInput label="Line Name" defaultValue={record?.lineName || ""} />
    <TextInput label="Line Code" defaultValue={record?.lineCode || ""} />
    <Select label="Factory" value={record?.factory || ""} onChange={() => undefined} options={factories} />
    <TextInput label="Capacity Per Shift" defaultValue={record?.capacityPerShift || ""} />
    <TextInput label="Machine Count" defaultValue={record?.machineCount || ""} />
    <TextInput label="Operator Count" defaultValue={record?.operatorCount || ""} />
    <Select label="Status" value={record?.status || "Running"} onChange={() => undefined} options={statuses} />
    <TextInput label="Current Production Order" defaultValue={record?.currentProductionOrder || ""} />
  </ReusableFormLayout>
);

export const MachineForm = ({ record }: { record?: MachineRecord }) => (
  <ReusableFormLayout title="Machine" columns={2} footer={footer}>
    <TextInput label="Machine Name" defaultValue={record?.machineName || ""} />
    <TextInput label="Machine Code" defaultValue={record?.machineCode || ""} />
    <Select label="Factory" value={record?.factory || ""} onChange={() => undefined} options={factories} />
    <TextInput label="Production Line" defaultValue={record?.productionLine || ""} />
    <TextInput label="Machine Type" defaultValue={record?.machineType || ""} />
    <TextInput label="Manufacturer" defaultValue={record?.manufacturer || ""} />
    <TextInput label="Installation Date" type="date" defaultValue={record?.installationDate || ""} />
    <TextInput label="Last Maintenance Date" type="date" defaultValue={record?.lastMaintenanceDate || ""} />
    <TextInput label="Next Maintenance Date" type="date" defaultValue={record?.nextMaintenanceDate || ""} />
    <Select label="Status" value={record?.status || "Running"} onChange={() => undefined} options={statuses} />
  </ReusableFormLayout>
);

export const OperatorForm = ({ record }: { record?: OperatorRecord }) => (
  <ReusableFormLayout title="Operator" columns={2} footer={footer}>
    <TextInput label="Operator Name" defaultValue={record?.operatorName || ""} />
    <TextInput label="Employee Code" defaultValue={record?.employeeCode || ""} />
    <Select label="Factory" value={record?.factory || ""} onChange={() => undefined} options={factories} />
    <TextInput label="Production Line" defaultValue={record?.productionLine || ""} />
    <TextInput label="Shift" defaultValue={record?.shift || ""} />
    <TextInput label="Mobile" defaultValue={record?.mobile || ""} />
    <TextInput label="Email" defaultValue={record?.email || ""} />
    <TextInput label="Skill Level" defaultValue={record?.skillLevel || ""} />
    <Select label="Status" value={record?.status || "Active"} onChange={() => undefined} options={statuses} />
  </ReusableFormLayout>
);

export const ShiftForm = ({ record }: { record?: ShiftRecord }) => (
  <ReusableFormLayout title="Shift" columns={2} footer={footer}>
    <TextInput label="Shift Name" defaultValue={record?.shiftName || ""} />
    <TextInput label="Shift Code" defaultValue={record?.shiftCode || ""} />
    <TextInput label="Start Time" defaultValue={record?.startTime || ""} />
    <TextInput label="End Time" defaultValue={record?.endTime || ""} />
    <Select label="Factory" value={record?.factory || ""} onChange={() => undefined} options={factories} />
    <TextInput label="Supervisor" defaultValue={record?.supervisor || ""} />
    <TextInput label="Operators" defaultValue={record?.operators || ""} />
    <Select label="Status" value={record?.status || "Active"} onChange={() => undefined} options={statuses} />
  </ReusableFormLayout>
);

export const QCForm = ({ record }: { record?: QCRecord }) => (
  <ReusableFormLayout title="QC Inspection" columns={2} footer={footer}>
    <TextInput label="QC Inspection Number" defaultValue={record?.inspectionNumber || ""} />
    <TextInput label="Production Order" defaultValue={record?.productionOrder || ""} />
    <TextInput label="Batch" defaultValue={record?.batch || ""} />
    <TextInput label="Product" defaultValue={record?.product || ""} />
    <TextInput label="SKU" defaultValue={record?.sku || ""} />
    <TextInput label="Inspector" defaultValue={record?.inspector || ""} />
    <TextInput label="Checklist" defaultValue={record?.checklist || ""} />
    <TextInput label="Passed Quantity" defaultValue={record?.passedQuantity || ""} />
    <TextInput label="Rejected Quantity" defaultValue={record?.rejectedQuantity || ""} />
    <TextInput label="Defect Type" defaultValue={record?.defectType || ""} />
    <TextInput label="Severity" defaultValue={record?.severity || ""} />
    <Select label="Status" value={record?.status || "Passed"} onChange={() => undefined} options={statuses} />
    <TextInput label="Photos" defaultValue={record?.photos || ""} />
    <Textarea label="Remarks" defaultValue={record?.remarks || ""} />
  </ReusableFormLayout>
);
