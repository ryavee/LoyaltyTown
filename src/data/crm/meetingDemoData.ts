export type MeetingRecord = {
  id: string;
  subject: string;
  account: string;
  date: string;
  time: string;
  owner: string;
  type: string;
  status: string;
};

export const meetings: MeetingRecord[] = [
  { id: "MTG-501", subject: "Distributor QBR", account: "Apex Industrial Supply", date: "2026-07-08", time: "10:00 AM", owner: "Nisha Kapoor", type: "Video", status: "Scheduled" },
  { id: "MTG-502", subject: "Dealer Expansion Review", account: "Prime Hardware", date: "2026-07-09", time: "02:30 PM", owner: "Rahul Mehta", type: "Onsite", status: "Scheduled" },
  { id: "MTG-503", subject: "Contractor Warranty Training", account: "Urban Build Network", date: "2026-07-11", time: "11:00 AM", owner: "Vikram Iyer", type: "Workshop", status: "Planned" },
];
