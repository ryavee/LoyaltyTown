export const getMockTickets = (customer) => [
  { id: "TKT-891", status: "Resolved", topic: "Missing Points Scan", date: "29 May 2026", desc: "Scan on Premium Emulsion points were not credited. Resolved by adjusting +50 pts." },
  { id: "TKT-756", status: "Resolved", topic: "Wrong Product QR Code", date: "22 Apr 2026", desc: "QR code showing invalid serial. Updated product registry database." },
  { id: "TKT-923", status: "Open", topic: "Cashback Delay", date: "01 Jun 2026", desc: "Cashback of ₹100 from redeemed 200 points delayed. Ticket under review." },
  { id: "TKT-412", status: "Resolved", topic: "UPI Transaction Failed", date: "15 Mar 2026", desc: "UPI transfer failed due to server timeout. Initiated manual settlement." },
  { id: "TKT-302", status: "Resolved", topic: "App Crash on Scan", date: "10 Feb 2026", desc: "App crashed during QR scan on iOS 17. Fixed in v2.4.1 update." },
  { id: "TKT-198", status: "Resolved", topic: "Points Deduction Dispute", date: "05 Jan 2026", desc: "User claimed double deduction on reward claim. Reverted 200 points." }
];

export const getMockDevices = (customer) => [
  { id: 1, name: "Chrome 124 - Android 13", city: customer.district || "T. Nagar", lastSeen: "Today, 10:14 AM", fingerprint: "fp_abc123", suspicious: false },
  { id: 2, name: "Safari 17 - iOS 18", city: "Chennai", lastSeen: "28 May 2026", fingerprint: "fp_def456", suspicious: false },
  { id: 3, name: "Firefox 120 - Windows 11", city: "Delhi", lastSeen: "15 May 2026", fingerprint: "fp_ghi789", suspicious: true },
];

export const getMockMessages = (customer) => [
  { type: "WhatsApp", content: "OTP Code for bank verification details: 482910", date: "29 May 2026, 05:30 PM", status: "Delivered" },
  { type: "SMS", content: `Your account CUST-${12000 + (customer.uid || 1)} loyalty points balance has been adjusted.`, date: "10 May 2026, 03:30 PM", status: "Delivered" },
  { type: "Email", content: "Welcome to LoyaltyTown! Your profile verification has been approved.", date: "15 Jan 2025, 11:15 AM", status: "Sent" },
];

export const getMockActivities = (customer) => [
  { id: 1, type: "QR Scan", desc: "Scanned Premium Emulsion 10L", date: "Today, 10:14 AM", location: `${customer.district || "T. Nagar"}, ${customer.state || ""}`, points: "+50 pts", isPositive: true },
  { id: 2, type: "Redemption", desc: "Redeemed 200 pts → ₹100 cashback", date: "4 days ago", location: "Mobile app client", points: "-200 pts", isPositive: false },
  { id: 3, type: "Ticket", desc: "Ticket #TKT-923 created: Cashback Delay", date: "6 days ago", location: "Helpdesk portal", points: null, badge: "Open" },
  { id: 4, type: "Referral", desc: "Referral converted: Priya Sharma joined", date: "9 days ago", location: "Invite link", points: "+100 pts", isPositive: true },
  { id: 5, type: "KYC", desc: "Aadhaar Card uploaded & verified", date: "12 days ago", location: "Agent dashboard", points: null },
];

export const getMockTicketConversations = () => ({
  "TKT-891": [
    { sender: "user", text: "I scanned the Premium Emulsion QR code but did not receive any points.", date: "29 May 2026, 10:00 AM" },
    { sender: "system", text: "Points verification pending: Name mismatch or already scanned scanned.", date: "29 May 2026, 10:05 AM" },
    { sender: "agent", text: "Hello! We checked the registry and credited +50 points as a goodwill gesture.", date: "29 May 2026, 05:30 PM" }
  ],
  "TKT-756": [
    { sender: "user", text: "QR code showing invalid serial warning.", date: "22 Apr 2026, 09:12 AM" },
    { sender: "agent", text: "We updated the database serial entry. Please scan again.", date: "22 Apr 2026, 02:42 PM" }
  ],
  "TKT-923": [
    { sender: "user", text: "I redeemed 200 points for ₹100 cashback, but the bank balance hasn't changed.", date: "01 Jun 2026, 08:30 AM" },
    { sender: "agent", text: "Cashback transfer is currently under review by our finance team.", date: "02 Jun 2026, 11:15 AM" }
  ],
  "TKT-412": [
    { sender: "user", text: "Redemption amount debited from points but UPI status failed.", date: "15 Mar 2026, 02:30 PM" },
    { sender: "agent", text: "We have processed the manual refund to your bank account.", date: "16 Mar 2026, 10:15 AM" }
  ],
  "TKT-302": [
    { sender: "user", text: "Every time I scan a QR, the app freezes.", date: "10 Feb 2026, 11:00 AM" },
    { sender: "agent", text: "Please update the app to the latest version on App Store.", date: "10 Feb 2026, 04:30 PM" }
  ],
  "TKT-198": [
    { sender: "user", text: "Double deduction occurred on points redemption.", date: "05 Jan 2026, 09:00 AM" },
    { sender: "agent", text: "Verified the log and adjusted +200 points to correct it.", date: "05 Jan 2026, 02:15 PM" }
  ]
});

export const getMockScanHistory = (customer) => [
  { product: "Premium Emulsion 10L", sku: "PAINT-101", date: "Jun 2, 10:14 AM", location: "Mumbai, MH", pts: "+50", risk: "Low", riskColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { product: "Primer 4L", sku: "PAINT-202", date: "May 22, 02:42 PM", location: "Pune, MH", pts: "+30", risk: "Low", riskColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { product: "Weather Shield 5L", sku: "PAINT-303", date: "May 18, 07:52 PM", location: "Mumbai, MH", pts: "+40", risk: "Medium", riskColor: "text-amber-700 bg-amber-50 border-amber-200" },
  { product: "Premium Emulsion 10L", sku: "PAINT-101", date: "Apr 28, 11:15 AM", location: "Delhi, DL", pts: "+50", risk: "Low", riskColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { product: "Premium Emulsion 10L", sku: "PAINT-101", date: "Apr 15, 09:20 AM", location: "Mumbai, MH", pts: "+50", risk: "High", riskColor: "text-rose-700 bg-rose-50 border-rose-200" },
  { product: "Tile Adhesive 20kg", sku: "TILE-004", date: "Mar 12, 11:10 AM", location: "Bangalore, KA", pts: "+20", risk: "Low", riskColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { product: "Exterior Primer 20L", sku: "PAINT-205", date: "Mar 02, 09:40 AM", location: "Chennai, TN", pts: "+60", risk: "Low", riskColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { product: "Premium Emulsion 10L", sku: "PAINT-101", date: "Feb 20, 04:30 PM", location: "Chennai, TN", pts: "+50", risk: "Low", riskColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { product: "Wall Putty 25kg", sku: "PUTT-902", date: "Feb 11, 01:25 PM", location: "Mumbai, MH", pts: "+15", risk: "Low", riskColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { product: "Weather Shield 5L", sku: "PAINT-303", date: "Jan 28, 10:05 AM", location: "Pune, MH", pts: "+40", risk: "Low", riskColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { product: "Premium Emulsion 10L", sku: "PAINT-101", date: "Jan 12, 03:50 PM", location: "Mumbai, MH", pts: "+50", risk: "Medium", riskColor: "text-amber-700 bg-amber-50 border-amber-200" },
  { product: "Wall Putty 25kg", sku: "PUTT-902", date: "Jan 03, 11:45 AM", location: "Delhi, DL", pts: "+15", risk: "Low", riskColor: "text-emerald-700 bg-emerald-50 border-emerald-200" }
];

export const getMockTrendData = (lifetimeSpend, localPoints) => [
  { name: "Jan", spending: Math.round(lifetimeSpend * 0.13), points: Math.round(localPoints * 0.12) },
  { name: "Feb", spending: Math.round(lifetimeSpend * 0.11), points: Math.round(localPoints * 0.10) },
  { name: "Mar", spending: Math.round(lifetimeSpend * 0.18), points: Math.round(localPoints * 0.17) },
  { name: "Apr", spending: Math.round(lifetimeSpend * 0.14), points: Math.round(localPoints * 0.13) },
  { name: "May", spending: Math.round(lifetimeSpend * 0.24), points: Math.round(localPoints * 0.24) },
  { name: "Jun", spending: Math.round(lifetimeSpend * 0.20), points: Math.round(localPoints * 0.24) },
];

export const getMockScanFrequencyData = (scansCount) => [
  { date: "Wk 1", scans: 3 },
  { date: "Wk 2", scans: 7 },
  { date: "Wk 3", scans: 4 },
  { date: "Wk 4", scans: 10 },
  { date: "Wk 5", scans: 6 },
  { date: "Wk 6", scans: scansCount },
];

export const getMockRedemptions = () => [
  { title: "₹100 Cashback on Wallet", type: "Cashback", status: "Claimed", points: "-200 pts", date: "30 May 2026, 05:30 PM" },
  { title: "₹250 Cashback on Wallet", type: "Cashback", status: "Claimed", points: "-500 pts", date: "10 May 2026, 03:30 PM" },
  { title: "20% off Premium Emulsion 10L", type: "Discount", status: "Claimed", points: "-300 pts", date: "18 Apr 2026, 08:00 PM" },
  { title: "Free Primer 4L (500ml)", type: "Free Item", status: "Claimed", points: "-450 pts", date: "22 Mar 2026, 02:30 PM" },
  { title: "₹50 Cashback on Wallet", type: "Cashback", status: "Pending", points: "-100 pts", date: "05 Jun 2026, 11:15 AM" },
  { title: "Free Paint Brush Set", type: "Free Item", status: "Claimed", points: "-150 pts", date: "12 Feb 2026, 10:00 AM" },
  { title: "₹100 Cashback on Wallet", type: "Cashback", status: "Claimed", points: "-200 pts", date: "20 Jan 2026, 04:30 PM" },
  { title: "₹50 Cashback on Wallet", type: "Cashback", status: "Claimed", points: "-100 pts", date: "02 Jan 2026, 09:15 AM" }
];

export const getMockAiInsights = (localBlocked) => ({
  churnRisk: localBlocked ? 95 : 12,
  churnLabel: localBlocked ? "High" : "Low",
  engagementScore: localBlocked ? 8 : 88,
  healthScore: localBlocked ? 5 : 92,
  healthLabel: localBlocked ? "Critical" : "Excellent",
  nextBestAction: localBlocked ? "Contact Client to Review Block Status" : "Offer Cashback",
  bestChannel: "WhatsApp",
  offerText: "Get extra 15% cashback points on scans this week!",
});
