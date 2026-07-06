export type DealerCustomerRecord = {
  id: string;
  customerName: string;
  customerType: "Retailer" | "Contractor" | "Architect" | "Interior Designer" | "Builder" | "Walk-in Customer";
  mobile: string;
  email: string;
  address: string;
  city: string;
  lastPurchaseDate: string;
  totalPurchaseValue: string;
  followUpDate: string;
  status: "Engaged" | "Follow Up" | "At Risk";
};

export const dealerCustomers: DealerCustomerRecord[] = [
  { id: "DCUS-001", customerName: "Aarav Contractors", customerType: "Contractor", mobile: "+91 98765 61001", email: "aarav@contractors.demo", address: "Bandra Project Site", city: "Mumbai", lastPurchaseDate: "2026-07-02", totalPurchaseValue: "$48,200", followUpDate: "2026-07-12", status: "Engaged" },
  { id: "DCUS-002", customerName: "North Interiors", customerType: "Interior Designer", mobile: "+91 98765 61002", email: "north@interiors.demo", address: "Karol Bagh", city: "Delhi", lastPurchaseDate: "2026-06-28", totalPurchaseValue: "$22,100", followUpDate: "2026-07-08", status: "Follow Up" },
  { id: "DCUS-003", customerName: "Urban Build Co.", customerType: "Builder", mobile: "+91 98765 61003", email: "urban@build.demo", address: "OMR Build Zone", city: "Chennai", lastPurchaseDate: "2026-06-30", totalPurchaseValue: "$36,840", followUpDate: "2026-07-10", status: "Engaged" },
  { id: "DCUS-004", customerName: "Sen Renovations", customerType: "Architect", mobile: "+91 98765 61004", email: "sen@reno.demo", address: "Salt Lake", city: "Kolkata", lastPurchaseDate: "2026-06-16", totalPurchaseValue: "$9,800", followUpDate: "2026-07-06", status: "At Risk" },
];
