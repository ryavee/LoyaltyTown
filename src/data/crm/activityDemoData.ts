export const notes = [
  { id: "NTE-01", title: "Apex renewal sentiment", relatedTo: "Apex Industrial Supply", author: "Nisha Kapoor", updated: "Today", visibility: "Internal", status: "Pinned" },
  { id: "NTE-02", title: "Metro pricing objections", relatedTo: "Metro Works", author: "Amit Batra", updated: "Yesterday", visibility: "Team", status: "Draft" },
  { id: "NTE-03", title: "Contractor training notes", relatedTo: "Urban Build Network", author: "Vikram Iyer", updated: "Jul 01", visibility: "Team", status: "Shared" },
];

export const files = [
  { id: "FIL-01", name: "Apex-QBR-Deck.pdf", relatedTo: "Apex Industrial Supply", type: "Presentation", owner: "Nisha Kapoor", updated: "Today", status: "Shared" },
  { id: "FIL-02", name: "Prime-Proposal-v3.pdf", relatedTo: "Prime Hardware", type: "Proposal", owner: "Rahul Mehta", updated: "Yesterday", status: "Review" },
  { id: "FIL-03", name: "Warranty-Training-Photos.zip", relatedTo: "Urban Build Network", type: "Media", owner: "Vikram Iyer", updated: "Jul 02", status: "Stored" },
];

export const activities = [
  { id: "ACT-01", title: "Introductory call completed", detail: "Metro Works discovery call logged by Amit Batra.", timestamp: "Today 11:10 AM", status: "Logged" },
  { id: "ACT-02", title: "Proposal sent", detail: "Prime Hardware expansion proposal sent for review.", timestamp: "Yesterday", status: "Sent" },
  { id: "ACT-03", title: "Warranty training scheduled", detail: "Urban Build Network workshop added to calendar.", timestamp: "Jul 03", status: "Scheduled" },
  { id: "ACT-04", title: "Follow-up due", detail: "Apex Wallet Rollout negotiation follow-up pending.", timestamp: "Jul 08", status: "Open" },
];

export const followups = [
  { id: "FUP-01", title: "Call Apex procurement", relatedTo: "Apex Wallet Rollout", due: "Today", owner: "Nisha Kapoor", priority: "High" },
  { id: "FUP-02", title: "Send dealer onboarding checklist", relatedTo: "Prime Dealer Expansion", due: "Tomorrow", owner: "Rahul Mehta", priority: "Medium" },
  { id: "FUP-03", title: "Book product verification demo", relatedTo: "Metro Contractor Conversion", due: "Jul 10", owner: "Amit Batra", priority: "Medium" },
];
