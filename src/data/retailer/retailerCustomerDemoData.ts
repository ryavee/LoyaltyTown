export type RetailerCustomerRecord = {
  id: string; customerName: string; mobile: string; email: string; address: string; city: string; lastPurchaseDate: string; totalPurchaseValue: string; productsPurchased: string; warrantyCount: string; status: "Engaged" | "Follow Up" | "At Risk";
};
export const retailerCustomers: RetailerCustomerRecord[] = [
  { id: "RCUS-001", customerName: "Aarav Homecare", mobile: "+91 98765 81001", email: "aarav@homecare.demo", address: "Bandra", city: "Mumbai", lastPurchaseDate: "2026-07-05", totalPurchaseValue: "$4,820", productsPurchased: "18", warrantyCount: "6", status: "Engaged" },
  { id: "RCUS-002", customerName: "North Interiors", mobile: "+91 98765 81002", email: "north@interiors.demo", address: "Karol Bagh", city: "Delhi", lastPurchaseDate: "2026-07-04", totalPurchaseValue: "$3,912", productsPurchased: "12", warrantyCount: "4", status: "Follow Up" },
  { id: "RCUS-003", customerName: "Sen Renovations", mobile: "+91 98765 81003", email: "sen@reno.demo", address: "Salt Lake", city: "Kolkata", lastPurchaseDate: "2026-06-28", totalPurchaseValue: "$1,840", productsPurchased: "5", warrantyCount: "1", status: "At Risk" },
];
