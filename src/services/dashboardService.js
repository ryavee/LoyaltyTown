const mockTopHighlights = [
  { label: "QR Scans today",    value: "860",       delta: "+24.3%", pos: true,  iconKey: "QrCode",        ic: "text-[#5B3FD6]" },
  { label: "Active users",      value: "8,420",     delta: "",       pos: null,  iconKey: "Users",         ic: "text-[#7B61E8]" },
  { label: "Redemptions today", value: "342",       delta: "+12.1%", pos: true,  iconKey: "Coins",         ic: "text-[#22A861]" },
  { label: "Fraud alerts",      value: "2",         delta: "new",    pos: false, iconKey: "AlertTriangle", ic: "text-[#EF4444]" },
  { label: "Revenue MTD",       value: "₹4.2L",    delta: "+18.4%", pos: true,  iconKey: "TrendingUp",    ic: "text-[#2E90C9]" },
  { label: "Last sync",         value: "2 min ago", delta: "",       pos: null,  iconKey: "Clock",         ic: "text-[#8E8AA2]" },
];

const mockStatCards = [
  { title:"TOTAL CUSTOMERS",  value:"12,540", sub:"vs last month", chg:"+12.5%", pos:true,  iconKey:"Users",         ibg:"bg-[#F0EAFF]", ic:"text-[#5B3FD6]", bh:"hover:border-[#5B3FD6]" },
  { title:"QR GENERATED",     value:"82,400", sub:"vs last month", chg:"+24.3%", pos:true,  iconKey:"QrCode",        ibg:"bg-[#E0F2FE]", ic:"text-[#2E90C9]", bh:"hover:border-[#2E90C9]" },
  { title:"EARN POINTS",      value:"3.43L",  sub:"vs last month", chg:"+18.4%", pos:true,  iconKey:"TrendingUp",    ibg:"bg-[#E2F5EC]", ic:"text-[#22A861]", bh:"hover:border-[#22A861]" },
  { title:"REDEEM POINTS",    value:"57,746", sub:"vs last month", chg:"+5.0%",  pos:true,  iconKey:"Coins",         ibg:"bg-[#FEF3C7]", ic:"text-[#F59E0B]", bh:"hover:border-[#F59E0B]" },
  { title:"FRAUD ALERTS",     value:"2",      sub:"needs review",  chg:"2 new",  pos:false, iconKey:"AlertTriangle", ibg:"bg-[#FEE2E2]", ic:"text-[#EF4444]", bh:"hover:border-[#EF4444]" },
];

const mockYtdStats = [
  { label:"Registered Customers", value:"12",       pct:8,   color:"#2DD4BF" },
  { label:"Earn Points",          value:"3,43,809", pct:100, color:"#22A861" },
  { label:"Redeem Points",        value:"57,746",   pct:17,  color:"#EF4444" },
  { label:"Scan Count",           value:"92",       pct:12,  color:"#F97316" },
  { label:"Balance Points",       value:"2,86,063", pct:83,  color:"#2E90C9" },
];

const mockDonutData = [
  { name:"QR Generated", value:65, color:"#5B3FD6" },
  { name:"QR Scanned",   value:25, color:"#2E90C9" },
  { name:"Scan Pending",  value:10, color:"#F59E0B" },
];

const mockKycData = [
  { name:"Approved", value:16, color:"#22A861" },
  { name:"Pending",  value:0,  color:"#F59E0B" },
  { name:"Rejected", value:2,  color:"#EF4444" },
];

const mockScanData7D = [
  { day:"Mon", tw:1200, lw:960  },
  { day:"Tue", tw:2900, lw:2140 },
  { day:"Wed", tw:4800, lw:3900 },
  { day:"Thu", tw:3300, lw:3000 },
  { day:"Fri", tw:5600, lw:4300 },
  { day:"Sat", tw:4200, lw:3600 },
  { day:"Sun", tw:6100, lw:5200 },
];

const mockScanData30D = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  tw: 1200 + Math.floor(Math.random() * 5500),
  lw: 900  + Math.floor(Math.random() * 4500),
}));

const mockPointsData7D = [
  { day:"Tue", earned:280,  redeemed:120 },
  { day:"Wed", earned:380,  redeemed:80  },
  { day:"Thu", earned:890,  redeemed:150 },
  { day:"Fri", earned:520,  redeemed:280 },
  { day:"Sat", earned:620,  redeemed:180 },
  { day:"Sun", earned:780,  redeemed:320 },
  { day:"Mon", earned:950,  redeemed:380 },
];

const mockPointsData30D = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  earned: 280 + Math.floor(Math.random() * 800),
  redeemed: 80  + Math.floor(Math.random() * 400),
}));

const mockCustomerScanData = [
  { day:1,s:2 },{ day:2,s:3 },{ day:3,s:38 },{ day:4,s:15 },{ day:5,s:3 },
  { day:6,s:2 },{ day:7,s:1 },{ day:8,s:2 },{ day:9,s:1 },{ day:10,s:4 },
  { day:11,s:2 },{ day:12,s:1 },{ day:13,s:3 },{ day:14,s:2 },{ day:15,s:1 },
  { day:16,s:2 },{ day:17,s:3 },{ day:18,s:1 },{ day:19,s:2 },{ day:20,s:5 },
  { day:21,s:2 },{ day:22,s:1 },{ day:23,s:3 },{ day:24,s:2 },{ day:25,s:1 },
  { day:26,s:4 },{ day:27,s:2 },{ day:28,s:1 },{ day:29,s:3 },{ day:30,s:2 },
];

const mockEarnRedeemMonthly = [
  { month:"Jan", earned:28000, redeemed:10000 },
  { month:"Feb", earned:5000,  redeemed:2000  },
  { month:"Mar", earned:30000, redeemed:15000 },
  { month:"Apr", earned:48000, redeemed:25000 },
  { month:"May", earned:85000, redeemed:38000 },
  { month:"Jun", earned:35000, redeemed:18000 },
  { month:"Jul", earned:0,     redeemed:0     },
  { month:"Aug", earned:0,     redeemed:0     },
  { month:"Sep", earned:0,     redeemed:0     },
  { month:"Oct", earned:0,     redeemed:0     },
  { month:"Nov", earned:0,     redeemed:0     },
  { month:"Dec", earned:0,     redeemed:0     },
];

const mockStateRegData = [
  { state:"Tamil Nadu",  regs:13 },
  { state:"Karnataka",   regs:8  },
  { state:"Gujarat",     regs:6  },
  { state:"Kerala",      regs:5  },
  { state:"Rajasthan",   regs:4  },
  { state:"Maharashtra", regs:3  },
  { state:"West Bengal", regs:2  },
  { state:"Jharkhand",   regs:2  },
  { state:"Pondicherry", regs:1  },
  { state:"Andhra P.",   regs:1  },
];

const mockDealerQRData = [
  { dealer:"Carpenters",   scans:35816 },
  { dealer:"Electricians", scans:12400 },
  { dealer:"Plumbers",     scans:8900  },
  { dealer:"Painters",     scans:6200  },
  { dealer:"Contractors",  scans:4100  },
];

const mockTopProducts = [
  { rank:1, product:"Indowud nfc Board 18mm thick", pid:"IND-NFC-18-260326", cat:"18mm", scans:"2,299" },
  { rank:2, product:"Indowud nfc Board 12mm thick", pid:"IND-NFC-12-260326", cat:"12mm", scans:"2,013" },
  { rank:3, product:"Zerowud Board 18mm thick",     pid:"ZER-BOA-18-260326", cat:"18mm", scans:"579"   },
  { rank:4, product:"Indowud nfc Board 6mm Thick",  pid:"IND-NFC-06-260326", cat:"6mm",  scans:"387"   },
  { rank:5, product:"Zerowud Board 12mm thick",     pid:"ZER-BOA-12-260326", cat:"12mm", scans:"345"   },
  { rank:6, product:"Indowud nfc door 30mm thick",  pid:"IND-NFC-30-260326", cat:"30mm", scans:"237"   },
];

const mockCityScanData = [
  { city:"Unknown",                   pts:"4,39,750", pct:100, color:"#EF4444" },
  { city:"Ranchi, Jharkhand",         pts:"3,280",    pct:72,  color:"#F97316" },
  { city:"Chengalpattu, Tamil Nadu",  pts:"1,680",    pct:58,  color:"#F59E0B" },
  { city:"Hassan, Karnataka",         pts:"1,040",    pct:44,  color:"#84CC16" },
  { city:"Hyderabad, Telangana",      pts:"325",      pct:30,  color:"#22A861" },
  { city:"Chennai, Tamil Nadu",       pts:"190",      pct:20,  color:"#14B8A6" },
  { city:"Jodhpur Gramin, Rajasthan", pts:"80",       pct:12,  color:"#06B6D4" },
];

const mockTopScanners = [
  { rank:1, name:"chandrkishor Thakur", city:"Ranchi",    state:"Jharkhand",  pts:"3,280" },
  { rank:2, name:"ASHOK KISAN",         city:"Ballam",    state:"Odisha",     pts:"1,740" },
  { rank:3, name:"Bhawani Singh",       city:"Jaisalmer", state:"Rajasthan",  pts:"1,040" },
  { rank:4, name:"kishore Kumar",       city:"Hyderabad", state:"Telangana",  pts:"325"   },
  { rank:5, name:"pravat Bhakat",       city:"Unknown",   state:"Tamil Nadu", pts:"110"   },
  { rank:6, name:"rahul suthar",        city:"Unknown",   state:"Unknown",    pts:"80"    },
];

export async function fetchTopHighlights() {
  return mockTopHighlights;
}

export async function fetchStatCards() {
  return mockStatCards;
}

export async function fetchYtdStats() {
  return mockYtdStats;
}

export async function fetchQrLifecycle() {
  return mockDonutData;
}

export async function fetchKycStatus() {
  return mockKycData;
}

export async function fetchScanTrend(params = { timeRange: "7D" }) {
  if (params.timeRange === "Today") return [{ day: "Today", tw: 860, lw: 780 }];
  if (params.timeRange === "30D")   return mockScanData30D;
  if (params.timeRange === "Custom") return mockScanData30D.slice(10, 20);
  return mockScanData7D;
}

export async function fetchPointsTrend(params = { timeRange: "7D" }) {
  if (params.timeRange === "Today") return [{ day: "Today", earned: 950, redeemed: 380 }];
  if (params.timeRange === "30D")   return mockPointsData30D;
  if (params.timeRange === "Custom") return mockPointsData30D.slice(10, 20);
  return mockPointsData7D;
}

export async function fetchCustomerScanReport(params = { timeRange: "7D" }) {
  if (params.timeRange === "Today") return [{ day: 30, s: 2 }];
  if (params.timeRange === "30D")   return mockCustomerScanData;
  if (params.timeRange === "Custom") return mockCustomerScanData.slice(10, 20);
  return mockCustomerScanData.slice(-7);
}

export async function fetchEarnRedeemMonthly() {
  return mockEarnRedeemMonthly;
}

export async function fetchStateRegistrations() {
  return mockStateRegData;
}

export async function fetchDealerQR() {
  return mockDealerQRData;
}

export async function fetchTopProducts() {
  return mockTopProducts;
}

export async function fetchCityScanData() {
  return mockCityScanData;
}

export async function fetchTopScanners() {
  return mockTopScanners;
}
