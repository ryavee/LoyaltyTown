export type Gs1Template = {
  id: string;
  gtin: string;
  serial: string;
  batch: string;
  expiry: string;
  lot: string;
  urlTemplate: string;
  status: "Valid" | "Draft" | "Parser Warning";
};

export const gs1Templates: Gs1Template[] = [
  { id: "GS1-001", gtin: "08901234567890", serial: "ADH-2026-000001", batch: "BCH-2026-001", expiry: "2027-03-18", lot: "LOT-PUN-2407", urlTemplate: "https://id.gs1.org/01/{gtin}/21/{serial}/10/{batch}", status: "Valid" },
  { id: "GS1-002", gtin: "08901234567891", serial: "PNT-2607-008811", batch: "BCH-2026-002", expiry: "2027-01-12", lot: "LOT-AHM-2407", urlTemplate: "https://id.gs1.org/01/{gtin}/10/{batch}/21/{serial}", status: "Draft" },
  { id: "GS1-003", gtin: "08901234567892", serial: "LAM-GS1-004210", batch: "BCH-2026-003", expiry: "2026-09-08", lot: "LOT-CHE-2406", urlTemplate: "https://id.gs1.org/01/{gtin}/17/{expiry}/10/{batch}", status: "Parser Warning" },
];

export const aggregationNodes = [
  { id: "ITEM-001", label: "Item QR", parent: "BOX-001", quantity: "1" },
  { id: "BOX-001", label: "Box QR", parent: "CASE-001", quantity: "12" },
  { id: "CASE-001", label: "Case QR", parent: "PALLET-001", quantity: "48" },
  { id: "PALLET-001", label: "Pallet QR", parent: "-", quantity: "384" },
];
