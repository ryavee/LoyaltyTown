export type ShipmentStatus = "Vehicle Assigned" | "Driver Assigned" | "In Transit" | "POD Pending" | "Delivered";

export type ShipmentRecord = {
  id: string;
  shipmentNumber: string;
  dispatchNumber: string;
  route: string;
  vehicle: string;
  driver: string;
  eta: string;
  proofOfDelivery: string;
  status: ShipmentStatus;
};

export const shipmentRows: ShipmentRecord[] = [
  { id: "SHP-7001", shipmentNumber: "SHP-2407-7001", dispatchNumber: "DSP-2407-8841", route: "Ahmedabad to Surat", vehicle: "GJ-01-TX-8841", driver: "Manoj Singh", eta: "2026-07-07 11:30", proofOfDelivery: "Pending", status: "In Transit" },
  { id: "SHP-7002", shipmentNumber: "SHP-2407-7002", dispatchNumber: "DSP-2407-8842", route: "Pune to Mumbai", vehicle: "MH-12-TR-4450", driver: "Sandeep More", eta: "2026-07-06 17:00", proofOfDelivery: "Pending", status: "Driver Assigned" },
  { id: "SHP-7003", shipmentNumber: "SHP-2407-7003", dispatchNumber: "DSP-2407-8843", route: "Chennai Urban", vehicle: "TN-09-LG-2210", driver: "Kannan R", eta: "Delivered", proofOfDelivery: "Captured", status: "Delivered" },
];

export const shipmentTimeline = [
  { id: "st-1", title: "Vehicle assignment", description: "Fleet manager assigned vehicle and transporter.", timestamp: "Today, 08:10" },
  { id: "st-2", title: "Driver assignment", description: "Driver profile and documents verified.", timestamp: "Today, 08:40" },
  { id: "st-3", title: "Dispatch gate-out", description: "Shipment scanned at dispatch gate.", timestamp: "Today, 09:25" },
  { id: "st-4", title: "Proof of delivery", description: "POD capture placeholder ready for mobile workflow.", timestamp: "Pending" },
];
