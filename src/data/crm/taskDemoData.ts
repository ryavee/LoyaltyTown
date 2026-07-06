export type TaskRecord = {
  id: string;
  task: string;
  relatedTo: string;
  dueDate: string;
  owner: string;
  priority: string;
  status: string;
};

export const tasks: TaskRecord[] = [
  { id: "TSK-9001", task: "Send revised proposal", relatedTo: "Prime Dealer Expansion", dueDate: "Today", owner: "Rahul Mehta", priority: "High", status: "Open" },
  { id: "TSK-9002", task: "Update contact hierarchy", relatedTo: "Apex Industrial Supply", dueDate: "Tomorrow", owner: "Nisha Kapoor", priority: "Medium", status: "Open" },
  { id: "TSK-9003", task: "Schedule warranty demo", relatedTo: "Urban Build Network", dueDate: "2026-07-12", owner: "Vikram Iyer", priority: "Medium", status: "Pending" },
];
