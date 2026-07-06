export type MachineStatus = "Running" | "Idle" | "Maintenance" | "Breakdown";

export type MachineRecord = {
  id: string;
  machineName: string;
  machineCode: string;
  factory: string;
  productionLine: string;
  machineType: string;
  manufacturer: string;
  installationDate: string;
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  status: MachineStatus;
  health: string;
};

export const machines: MachineRecord[] = [
  { id: "MCH-001", machineName: "Filling Unit 01", machineCode: "FILL-01", factory: "Pune Smart Factory", productionLine: "Adhesive Line A", machineType: "Filling", manufacturer: "Bosch", installationDate: "2024-02-12", lastMaintenanceDate: "2026-06-18", nextMaintenanceDate: "2026-07-12", status: "Running", health: "98%" },
  { id: "MCH-014", machineName: "Label Applicator", machineCode: "LBL-14", factory: "Surat Coatings Plant", productionLine: "Coating Line B", machineType: "Labeling", manufacturer: "Krones", installationDate: "2023-11-04", lastMaintenanceDate: "2026-06-30", nextMaintenanceDate: "2026-07-05", status: "Maintenance", health: "72%" },
  { id: "MCH-022", machineName: "Press Station", machineCode: "PRS-22", factory: "Chennai Assembly Hub", productionLine: "Assembly Line C", machineType: "Press", manufacturer: "Siemens", installationDate: "2024-09-16", lastMaintenanceDate: "2026-06-12", nextMaintenanceDate: "2026-07-18", status: "Idle", health: "89%" },
];

export const machineTabs = ["Overview", "Machine Health", "Maintenance Timeline", "Downtime Logs", "Output Logs", "History", "Audit"];

export const downtimeLogs = [
  { id: "DT-001", reason: "Preventive maintenance", duration: "1.4h", date: "2026-07-02", status: "Closed" },
  { id: "DT-002", reason: "Sensor calibration", duration: "0.8h", date: "2026-07-04", status: "Closed" },
  { id: "DT-003", reason: "Label roll jam", duration: "0.6h", date: "2026-07-05", status: "Open" },
];
