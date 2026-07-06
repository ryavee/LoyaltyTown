export type OperatorRecord = {
  id: string;
  operatorName: string;
  employeeCode: string;
  factory: string;
  productionLine: string;
  shift: string;
  mobile: string;
  email: string;
  skillLevel: string;
  status: string;
};

export type ShiftRecord = {
  id: string;
  shiftName: string;
  shiftCode: string;
  startTime: string;
  endTime: string;
  factory: string;
  supervisor: string;
  operators: string;
  status: string;
};

export const operators: OperatorRecord[] = [
  { id: "OP-1001", operatorName: "Anika Rao", employeeCode: "EMP-1001", factory: "Pune Smart Factory", productionLine: "Adhesive Line A", shift: "Shift A", mobile: "+91 98765 43210", email: "anika@example.com", skillLevel: "Expert", status: "Active" },
  { id: "OP-1002", operatorName: "Rohan Mehta", employeeCode: "EMP-1002", factory: "Surat Coatings Plant", productionLine: "Coating Line B", shift: "Shift B", mobile: "+91 99887 66554", email: "rohan@example.com", skillLevel: "Advanced", status: "Active" },
  { id: "OP-1003", operatorName: "Sara Iyer", employeeCode: "EMP-1003", factory: "Chennai Assembly Hub", productionLine: "Assembly Line C", shift: "Shift C", mobile: "+91 91234 56789", email: "sara@example.com", skillLevel: "QC Certified", status: "Inspection" },
];

export const shifts: ShiftRecord[] = [
  { id: "SHF-001", shiftName: "Morning Shift", shiftCode: "SHIFT-A", startTime: "06:00", endTime: "14:00", factory: "Pune Smart Factory", supervisor: "Anika Rao", operators: "42", status: "Active" },
  { id: "SHF-002", shiftName: "Evening Shift", shiftCode: "SHIFT-B", startTime: "14:00", endTime: "22:00", factory: "Surat Coatings Plant", supervisor: "Rohan Mehta", operators: "38", status: "Active" },
  { id: "SHF-003", shiftName: "Night Shift", shiftCode: "SHIFT-C", startTime: "22:00", endTime: "06:00", factory: "Chennai Assembly Hub", supervisor: "Sara Iyer", operators: "28", status: "Planned" },
];

export const operatorTabs = ["Overview", "Attendance Placeholder", "Assigned Machines", "Production Contribution", "QC Issues Linked", "History", "Audit"];
export const shiftTabs = ["Overview", "Operators", "Supervisor", "Performance", "History", "Audit"];
