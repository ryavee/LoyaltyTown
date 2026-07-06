export type ContactRecord = {
  id: string;
  name: string;
  account: string;
  role: string;
  phone: string;
  email: string;
  city: string;
  status: string;
};

export const contacts: ContactRecord[] = [
  { id: "CON-3101", name: "Riya Malhotra", account: "Apex Industrial Supply", role: "Procurement Head", phone: "+91 98765 63001", email: "riya@example.demo", city: "Mumbai", status: "Primary" },
  { id: "CON-3102", name: "Karan Shah", account: "Northline Trade", role: "Dealer Principal", phone: "+91 98765 63002", email: "karan@example.demo", city: "Delhi", status: "Active" },
  { id: "CON-3103", name: "Meera Iyer", account: "Urban Build Network", role: "Project Lead", phone: "+91 98765 63003", email: "meera@example.demo", city: "Chennai", status: "Active" },
];
