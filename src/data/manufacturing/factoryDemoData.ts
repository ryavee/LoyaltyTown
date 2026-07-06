export type FactoryStatus = "Active" | "Inactive" | "Maintenance" | "Archived";

export type FactoryRecord = {
  id: string;
  name: string;
  code: string;
  company: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  geoLocation: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  certifications: string;
  status: FactoryStatus;
  productionLines: string;
  machines: string;
  todayProduction: string;
  qcHold: string;
};

export const factories: FactoryRecord[] = [
  { id: "FAC-001", name: "Pune Smart Factory", code: "PNQ-FAC-01", company: "LoyalChem Manufacturing", address: "MIDC Industrial Area", city: "Pune", state: "Maharashtra", country: "India", pinCode: "411019", geoLocation: "18.6298,73.7997", contactPerson: "Anika Rao", contactNumber: "+91 98765 43210", email: "pune.factory@example.com", certifications: "ISO 9001, GMP, GS1 Ready", status: "Active", productionLines: "8", machines: "64", todayProduction: "91.4K", qcHold: "1,284" },
  { id: "FAC-002", name: "Surat Coatings Plant", code: "STV-FAC-02", company: "LoyalCoat Industries", address: "GIDC Estate", city: "Surat", state: "Gujarat", country: "India", pinCode: "394230", geoLocation: "21.1702,72.8311", contactPerson: "Rohan Mehta", contactNumber: "+91 99887 66554", email: "surat.factory@example.com", certifications: "ISO 14001, BIS", status: "Active", productionLines: "6", machines: "48", todayProduction: "72.8K", qcHold: "842" },
  { id: "FAC-003", name: "Chennai Assembly Hub", code: "MAA-FAC-03", company: "LoyalMech Assembly", address: "Oragadam Industrial Corridor", city: "Chennai", state: "Tamil Nadu", country: "India", pinCode: "602105", geoLocation: "12.8396,79.9787", contactPerson: "Sara Iyer", contactNumber: "+91 91234 56789", email: "chennai.factory@example.com", certifications: "ISO 45001, CE", status: "Maintenance", productionLines: "4", machines: "36", todayProduction: "42.1K", qcHold: "318" },
];

export const factoryKpis = [
  ["Total Factories", "12"],
  ["Active Factories", "9"],
  ["Production Lines", "64"],
  ["Machines", "486"],
  ["Today Production", "218K"],
  ["QC Hold", "2,444"],
  ["Rejected Units", "1,184"],
  ["Downtime Hours", "18.6h"],
];

export const factoryTabs = ["Overview", "Production Lines", "Machines", "Operators", "Shifts", "Batches", "Quality", "Inventory", "Analytics", "Documents", "History", "Audit Log"];
