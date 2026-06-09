import React, { useState, useMemo, useEffect } from "react";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Shield,
  ShieldCheck,
  Loader2,
  ExternalLink,
  Send,
  FileText,
  Gift,
  Copy,
  Check,
  Lock,
  Unlock,
  AlertTriangle,
  Clock,
  Activity,
  CheckCircle,
  Sliders,
  Plus,
  MessageSquare,
  Sparkles,
  Smartphone,
  ChevronRight,
  TrendingUp,
  X,
  Settings,
  MessageCircle,
  CheckCircle2,
  Trash2,
  Terminal,
} from "lucide-react";
import Card from "./ui/Card";
import Pagination from "./Reusable/Pagination";
import CustomerTrendChart from "./ui/CustomerTrendChart";
import CustomerScanFrequencyChart from "./ui/CustomerScanFrequencyChart";
import {
  getMockTickets,
  getMockDevices,
  getMockMessages,
  getMockActivities,
  getMockTicketConversations,
  getMockScanHistory,
  getMockTrendData,
  getMockScanFrequencyData,
  getMockRedemptions,
  getMockAiInsights,
} from "../data/customerMockData";


const presetReasons = [
  "Invalid PAN details",
  "Unclear Aadhaar image",
  "Incorrect bank details",
  "Invalid UPI ID",
  "Name mismatch between PAN and Bank",
];

const CustomerDetails = ({
  customer: initialCustomer,
  onBack,
  onBlockCustomer = () => {},
  onKYCAction = () => {},
  onPointsUpdate = () => {},
  handleDocumentView = () => {},
  actionLoading = {
    block: null,
    kyc: null,
  },
}) => {
  const customer = initialCustomer || {};

  // State variables linked to props or local (declared unconditionally at start of component)
  const [localPoints, setLocalPoints] = useState(customer.loyaltyPoint || 0);
  const [localBlocked, setLocalBlocked] = useState(customer.isBlocked || false);
  const [localKyc, setLocalKyc] = useState(customer.isKYCverifed || false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");

  // Sync state if initial customer props changes
  useEffect(() => {
    setLocalPoints(customer.loyaltyPoint || 0);
    setLocalBlocked(customer.isBlocked || false);
    setLocalKyc(customer.isKYCverifed || false);
  }, [customer]);

  // Banking Details State
  const [bankDetails, setBankDetails] = useState({
    bankName: customer.bankDetails?.bankName || "HDFC Bank",
    accountNumber: customer.bankDetails?.accountNumber || `XXXX-XXXX-${1230 + (customer.uid || 1)}`,
    upiId: customer.upiId || `${customer.firstName?.toLowerCase() || "user"}@okhdfcbank`,
    accountHolder: customer.bankDetails?.accountHolder || `${customer.firstName || ""} ${customer.lastName || ""}`,
    accountType: customer.bankDetails?.accountType || "Savings",
    ifscCode: customer.bankDetails?.ifscCode || "HDFC0001245",
  });

  const [bankForm, setBankForm] = useState({ ...bankDetails });

  // KYC Verification Info State
  const [kycDetails, setKycDetails] = useState({
    aadhaarStatus: customer.isKYCverifed ? "Verified" : "Pending",
    aadhaarDate: customer.isKYCverifed ? "May 12, 2026" : "N/A",
    panStatus: customer.isKYCverifed ? "Verified" : "Pending",
    panDate: customer.isKYCverifed ? "May 14, 2026" : "N/A",
  });

  // Notification Preferences toggles
  const [commPrefs, setCommPrefs] = useState({
    whatsapp: true,
    email: true,
    sms: true,
    push: false,
  });

  // Support Tickets State
  const [tickets, setTickets] = useState(() => getMockTickets(customer));

  // Devices State
  const [devices, setDevices] = useState(() => getMockDevices(customer));

  // Outbound Message Log
  const [messages, setMessages] = useState(() => getMockMessages(customer));

  // Activity Timeline State
  const [activities, setActivities] = useState(() => getMockActivities(customer));

  const [showPointsDrawer, setShowPointsDrawer] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showSupportDrawer, setShowSupportDrawer] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [supportMessage, setSupportMessage] = useState("");
  const [ticketConversations, setTicketConversations] = useState(() => getMockTicketConversations());

  const [pointsAction, setPointsAction] = useState("add"); // "add" or "deduct"
  const [pointsInput, setPointsInput] = useState("");
  const [pointsReason, setPointsReason] = useState("");

  const [ticketTopic, setTicketTopic] = useState("");
  const [ticketDesc, setTicketDesc] = useState("");

  const [customMessage, setCustomMessage] = useState("");
  const [messageChannel, setMessageChannel] = useState("WhatsApp");
  const [sending, setSending] = useState(false);

  const [chartTab, setChartTab] = useState("Both"); // "Both", "Spending", "Points"

  // Pagination states for different list tabs
  const [scansPage, setScansPage] = useState(1);
  const [scansPageSize, setScansPageSize] = useState(5);

  const [rewardsPage, setRewardsPage] = useState(1);
  const [rewardsPageSize, setRewardsPageSize] = useState(5);

  const [ticketsPage, setTicketsPage] = useState(1);
  const [ticketsPageSize, setTicketsPageSize] = useState(5);

  // Dynamic values based on customer ID
  const custId = `CUST-${12000 + (customer.uid || 1)}`;
  const joinedDate = customer.joinedDate || `Jan ${10 + (customer.uid % 20)}, 2025`;
  const lastActiveDate = `Today, ${10 + (customer.uid % 12)}:${(customer.uid * 13) % 60} AM`;

  // Wallet Stats
  const pointsRedeemed = Math.round(localPoints * 0.86);
  const lifetimeSpend = 3000 + localPoints * 3.5;
  const cashbackValue = (localPoints * 0.20).toFixed(2);
  const totalEarned = localPoints + pointsRedeemed;
  const scansCount = 15 + ((customer.uid || 1) % 4) * 3;
  const uniqueProductsCount = 3 + ((customer.uid || 1) % 3);
  const redemptionRate = totalEarned > 0 ? Math.round((pointsRedeemed / totalEarned) * 100) : 0;
  const repeatPurchaseRate = 60 + ((customer.uid || 1) % 5) * 5;

  // Tier Logic
  const tier = useMemo(() => {
    if (localPoints >= 3000) {
      return {
        name: "Platinum",
        color: "text-indigo-700 bg-indigo-50 border-indigo-200",
        badgeColor: "bg-indigo-600",
        nextText: "Max tier unlocked",
        ptsNeeded: 0,
      };
    }
    if (localPoints >= 2000) {
      return {
        name: "Gold",
        color: "text-amber-700 bg-amber-50 border-amber-300",
        badgeColor: "bg-amber-500",
        nextText: `${3000 - localPoints} pts to Platinum`,
        ptsNeeded: 3000 - localPoints,
      };
    }
    if (localPoints >= 1000) {
      return {
        name: "Silver",
        color: "text-slate-700 bg-slate-50 border-slate-200",
        badgeColor: "bg-slate-500",
        nextText: `${2000 - localPoints} pts to Gold`,
        ptsNeeded: 2000 - localPoints,
      };
    }
    return {
      name: "Bronze",
      color: "text-amber-700 bg-amber-50 border-amber-200",
      badgeColor: "bg-[#B45309]",
      nextText: `${1000 - localPoints} pts to Silver`,
      ptsNeeded: 1000 - localPoints,
    };
  }, [localPoints]);

  const openTicketsCount = tickets.filter((t) => t.status === "Open").length;
  const resolvedTicketsCount = tickets.filter((t) => t.status === "Resolved").length;

  // Scan History
  const [scanHistory, setScanHistory] = useState(() => getMockScanHistory(customer));

  // Spending & Points Trends Chart Mock (linked to lifetime spend / points)
  const trendData = useMemo(() => getMockTrendData(lifetimeSpend, localPoints), [lifetimeSpend, localPoints]);

  const scanFrequencyData = useMemo(() => getMockScanFrequencyData(scansCount), [scansCount]);

  // Rewards Redeemed
  const [redemptions, setRedemptions] = useState(() => getMockRedemptions());

  // AI Insights mock
  const aiInsights = useMemo(() => getMockAiInsights(localBlocked), [localBlocked]);

  // Paginated lists
  const totalScansPages = Math.max(1, Math.ceil(scanHistory.length / scansPageSize));
  const paginatedScans = useMemo(() => {
    const start = (scansPage - 1) * scansPageSize;
    return scanHistory.slice(start, start + scansPageSize);
  }, [scanHistory, scansPage, scansPageSize]);

  const totalRewardsPages = Math.max(1, Math.ceil(redemptions.length / rewardsPageSize));
  const paginatedRedemptions = useMemo(() => {
    const start = (rewardsPage - 1) * rewardsPageSize;
    return redemptions.slice(start, start + rewardsPageSize);
  }, [redemptions, rewardsPage, rewardsPageSize]);

  const totalTicketsPages = Math.max(1, Math.ceil(tickets.length / ticketsPageSize));
  const paginatedTickets = useMemo(() => {
    const start = (ticketsPage - 1) * ticketsPageSize;
    return tickets.slice(start, start + ticketsPageSize);
  }, [tickets, ticketsPage, ticketsPageSize]);

  // Early return if customer not loaded (placed safely after all hook calls)
  if (!initialCustomer || !customer.uid) {
    return null;
  }

  // Action: Copy Referral Code
  const referralCode = customer.referralCode || `LT100${customer.uid}`;
  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Action: Add / Deduct Points
  const handlePointsSubmit = (e) => {
    e.preventDefault();
    const amount = parseInt(pointsInput);
    if (!amount || amount <= 0) return;

    let newPoints = localPoints;
    let pointsStr = "";
    if (pointsAction === "add") {
      newPoints += amount;
      pointsStr = `+${amount} pts`;
    } else {
      newPoints = Math.max(0, newPoints - amount);
      pointsStr = `-${amount} pts`;
    }

    setLocalPoints(newPoints);
    onPointsUpdate(customer.uid, newPoints);
    setShowPointsDrawer(false);

    // Add activity log
    const desc = pointsReason.trim() || (pointsAction === "add" ? "Points adjustment bonus" : "Points deduction correction");
    const newAct = {
      id: Date.now(),
      type: pointsAction === "add" ? "QR Scan" : "Redemption",
      desc: `${pointsAction === "add" ? "Bonus points granted" : "Points debited"}: ${desc}`,
      date: "Just now",
      location: "Administrator Terminal",
      points: pointsStr,
      isPositive: pointsAction === "add",
    };
    setActivities([newAct, ...activities]);

    setPointsInput("");
    setPointsReason("");
  };

  // Action: Update Bank Details
  const handleBankSubmit = (e) => {
    e.preventDefault();
    setBankDetails({ ...bankForm });
    setShowBankModal(false);

    const newAct = {
      id: Date.now(),
      type: "KYC",
      desc: "Bank account details updated by admin",
      date: "Just now",
      location: "Administrator Terminal",
      points: null,
    };
    setActivities([newAct, ...activities]);
  };

  // Action: Create Ticket
  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketTopic.trim()) return;

    const tktId = `TKT-${Math.floor(100 + Math.random() * 900)}`;
    const newTkt = {
      id: tktId,
      status: "Open",
      topic: ticketTopic.trim(),
      date: "Today",
      desc: ticketDesc.trim() || "No description provided.",
    };
    setTickets([newTkt, ...tickets]);
    setShowTicketModal(false);

    const newAct = {
      id: Date.now(),
      type: "Ticket",
      desc: `Ticket #${tktId} opened: ${ticketTopic}`,
      date: "Just now",
      location: "Helpdesk portal",
      points: null,
      badge: "Open",
    };
    setActivities([newAct, ...activities]);

    setTicketTopic("");
    setTicketDesc("");
  };

  // Action: Send Message
  const handleSendMessage = () => {
    if (!customMessage.trim()) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      const newMsg = {
        type: messageChannel,
        content: customMessage.trim(),
        date: "Just now",
        status: "Sent",
      };
      setMessages([newMsg, ...messages]);
      
      const newAct = {
        id: Date.now(),
        type: "KYC",
        desc: `Message dispatched via ${messageChannel}`,
        date: "Just now",
        location: "Outbound queue",
        points: null,
      };
      setActivities([newAct, ...activities]);
      setCustomMessage("");
      alert("Message sent successfully!");
    }, 1000);
  };

  // Action: Toggle Block
  const handleToggleBlock = () => {
    const nextBlocked = !localBlocked;
    setLocalBlocked(nextBlocked);
    onBlockCustomer(customer.uid);

    const newAct = {
      id: Date.now(),
      type: "Ticket",
      desc: nextBlocked ? "Customer Account Blocked" : "Customer Account Restored",
      date: "Just now",
      location: "Administrator Terminal",
      points: null,
    };
    setActivities([newAct, ...activities]);
  };

  // Action: Toggle KYC
  const handleToggleKyc = () => {
    const nextKyc = !localKyc;
    setLocalKyc(nextKyc);
    onKYCAction(customer.uid);

    setKycDetails({
      aadhaarStatus: nextKyc ? "Verified" : "Pending",
      aadhaarDate: nextKyc ? "May 12, 2026" : "N/A",
      panStatus: nextKyc ? "Verified" : "Pending",
      panDate: nextKyc ? "May 14, 2026" : "N/A",
    });

    const newAct = {
      id: Date.now(),
      type: "KYC",
      desc: nextKyc ? "KYC status verified successfully" : "KYC status revoked by admin",
      date: "Just now",
      location: "Administrator Terminal",
      points: null,
    };
    setActivities([newAct, ...activities]);
  };

  // Action: Device blocking
  const handleBlockDevice = (fingerprint) => {
    setDevices(
      devices.map((d) => (d.fingerprint === fingerprint ? { ...d, suspicious: true } : d))
    );
    alert(`Device with fingerprint ${fingerprint} has been blocked.`);
  };

  try {
    return (
      <div className="min-h-screen bg-[#F8F7FC] text-[#2B2340] pb-12 animate-fadeIn -mx-4 -mt-4 md:-mx-5 md:-mt-5">
        
        {/* =================================================
            STICKY SUB-HEADER
        ================================================= */}
        <div className="sticky -top-4 md:-top-5 z-40 bg-white border-b border-[#E9E2F3] shadow-sm">
          <div className="max-w-[1600px] mx-auto px-4 md:px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#8E8AA2] hover:text-[#5B3FD6] cursor-pointer" onClick={onBack}>Customers</span>
              <span className="text-[#8E8AA2] text-xs">/</span>
              <span className="text-sm font-black text-[#2B2340]">Profile Details</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => { setPointsAction("add"); setPointsInput(""); setPointsReason(""); setShowPointsDrawer(true); }}
                className="flex items-center gap-1.5 rounded-xl bg-[#5B3FD6] hover:bg-[#4C32C7] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition cursor-pointer border-0"
              >
                <Plus className="h-3.5 w-3.5" />
                Adjust Points
              </button>
              <button
                onClick={handleToggleBlock}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold border transition cursor-pointer ${
                  localBlocked
                    ? "bg-emerald-50 text-[#059669] border-[#A7F3D0] hover:bg-[#D1FAE5]"
                    : "bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100"
                }`}
              >
                {localBlocked ? <Unlock className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                {localBlocked ? "Unblock" : "Block"}
              </button>
              <button
                onClick={() => setShowSettingsDrawer(true)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#EDE9FE] bg-white text-[#8E8AA2] hover:text-[#5B3FD6] hover:bg-[#F5F3FF] transition cursor-pointer"
                title="Preferences & Configuration"
              >
                <Settings className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-4 py-4 md:px-5 md:py-5 space-y-6">

          {/* =================================================
              1. HERO PROFILE CARD
          ================================================= */}
          <div className="bg-gradient-to-r from-white via-[#F3E8FF] to-[#E9D5FF] p-6 rounded-[24px] border border-[#E9E2F3] shadow-sm text-[#2B2340] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 rounded-2xl bg-[#5B3FD6]/10 text-[#5B3FD6] border-2 border-[#5B3FD6]/20 flex items-center justify-center text-3xl font-black shadow-sm">
                {customer.firstName?.[0]}{customer.lastName?.[0]}
              </div>
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full border ${tier.color}`}>{tier.name} Tier</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border ${
                    localBlocked ? "bg-rose-50 text-rose-600 border-rose-200" : "bg-emerald-50 text-emerald-600 border-emerald-200"
                  }`}>
                    {localBlocked ? "Blocked" : "Active"}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border ${
                    localKyc ? "bg-indigo-50 text-indigo-600 border-indigo-200" : "bg-amber-50 text-amber-600 border-amber-200"
                  }`}>
                    {localKyc ? "KYC Verified" : "KYC Pending"}
                  </span>
                </div>
                <h2 className="text-2xl font-black tracking-tight text-[#2B2340]">{customer.firstName} {customer.lastName}</h2>
                <p className="text-xs text-[#8E8AA2] font-semibold flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span>ID: <strong className="text-[#2B2340] font-mono">{custId}</strong></span>
                  <span>•</span>
                  <span>Joined: {joinedDate}</span>
                  <span>•</span>
                  <span>City: {customer.district || "N/A"}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-1 pt-4 md:pt-0 border-t border-slate-100 md:border-t-0 w-full md:w-auto">
              <p className="text-[10px] uppercase font-extrabold text-[#8E8AA2] tracking-wider">Referral Code</p>
              <div className="flex items-center gap-1.5 mt-1 bg-[#FAF9FD] border border-[#EDE9FE] px-3 py-1.5 rounded-xl shadow-sm">
                <span className="font-mono text-xs font-black text-[#5B3FD6]">{referralCode}</span>
                <button
                  onClick={handleCopyCode}
                  className="text-[#8E8AA2] hover:text-[#5B3FD6] transition cursor-pointer p-1 rounded hover:bg-slate-100 border-0 bg-transparent"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* =================================================
              2. STATS STRIP
          ================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* 1. Loyalty Status Card */}
            <div className="bg-[#F3E8FF] border border-[#D8B4FE] rounded-2xl p-4 shadow-sm flex flex-col justify-between min-h-[110px] relative overflow-hidden group hover:shadow-md transition-all duration-200">
              <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp className="h-10 w-10 text-[#7C3AED]" />
              </div>
              <span className="text-[10px] font-extrabold text-[#7C3AED] uppercase tracking-wider flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> Loyalty Status
              </span>
              <p className="text-lg font-black text-[#7C3AED] mt-2">{tier.name} Tier</p>
              <span className="text-[10px] font-semibold text-[#9333EA] mt-1">{tier.nextText}</span>
            </div>

            {/* 2. Points Balance Card */}
            <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-2xl p-4 shadow-sm flex flex-col justify-between min-h-[110px] relative overflow-hidden group hover:shadow-md transition-all duration-200">
              <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles className="h-10 w-10 text-[#D97706]" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-[#D97706] uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Points Balance
                </span>
                <p className="text-lg font-black text-[#D97706] mt-2">{localPoints.toLocaleString()} pts</p>
                <span className="text-[10px] font-semibold text-[#B45309] mt-1 block">Lifetime: {totalEarned.toLocaleString()} earned</span>
              </div>
            </div>

            {/* 3. Lifetime Spend Card */}
            <div className="bg-[#D1FAE5] border border-[#A7F3D0] rounded-2xl p-4 shadow-sm flex flex-col justify-between min-h-[110px] relative overflow-hidden group hover:shadow-md transition-all duration-200">
              <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp className="h-10 w-10 text-[#059669]" />
              </div>
              <span className="text-[10px] font-extrabold text-[#059669] uppercase tracking-wider flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> Lifetime Spend
              </span>
              <p className="text-lg font-black text-[#059669] mt-2">₹{lifetimeSpend.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              <span className="text-[10px] font-semibold text-[#047857] mt-1">{repeatPurchaseRate}% repeat purchase</span>
            </div>

            {/* 4. Total Scans Card */}
            <div className="bg-[#E0F2FE] border border-[#BAE6FD] rounded-2xl p-4 shadow-sm flex flex-col justify-between min-h-[110px] relative overflow-hidden group hover:shadow-md transition-all duration-200">
              <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <Smartphone className="h-10 w-10 text-[#0284C7]" />
              </div>
              <span className="text-[10px] font-extrabold text-[#0284C7] uppercase tracking-wider flex items-center gap-1">
                <Smartphone className="h-3 w-3" /> Total Scans
              </span>
              <p className="text-lg font-black text-[#0284C7] mt-2">{scansCount} scans</p>
              <span className="text-[10px] font-semibold text-[#0369A1] mt-1">{uniqueProductsCount} unique products</span>
            </div>

            {/* 5. Points Redeemed Card */}
            <div className="bg-[#FFE4E6] border border-[#FECDD3] rounded-2xl p-4 shadow-sm flex flex-col justify-between min-h-[110px] relative overflow-hidden group hover:shadow-md transition-all duration-200">
              <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <Gift className="h-10 w-10 text-[#E11D48]" />
              </div>
              <span className="text-[10px] font-extrabold text-[#E11D48] uppercase tracking-wider flex items-center gap-1">
                <Gift className="h-3 w-3" /> Points Redeemed
              </span>
              <p className="text-lg font-black text-[#E11D48] mt-2">{pointsRedeemed.toLocaleString()} pts</p>
              <span className="text-[10px] font-semibold text-[#F43F5E] mt-1">{redemptionRate}% redemption rate</span>
            </div>

          </div>

          {/* =================================================
              3. THREE-COLUMN CONTACT DATA ROW
          ================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* CARD 1: CONTACT PARAMETERS */}
            <div className="bg-white border border-[#EDE9FE] rounded-2xl p-4 shadow-sm space-y-2.5">
              <h4 className="text-[10.5px] font-extrabold uppercase text-[#8E8AA2] tracking-wider flex items-center gap-1.5 pb-1 border-b border-[#F5F2FC]">
                <User className="h-3.5 w-3.5 text-[#5B3FD6]" />
                Contact Parameters
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#8E8AA2] font-semibold flex items-center gap-1.5"><Phone className="h-3 w-3" /> Mobile</span>
                  <span className="font-bold text-[#2B2340]">+91 {customer.phone}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#8E8AA2] font-semibold flex items-center gap-1.5"><Mail className="h-3 w-3" /> Email</span>
                  <span className="font-bold text-[#2B2340] text-right break-all max-w-[160px]">{customer.email}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#8E8AA2] font-semibold flex items-center gap-1.5"><MapPin className="h-3 w-3" /> City</span>
                  <span className="font-bold text-[#2B2340]">{customer.district}, {customer.state}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#8E8AA2] font-semibold flex items-center gap-1.5"><User className="h-3 w-3" /> Joined</span>
                  <span className="font-bold text-[#2B2340]">{joinedDate}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#8E8AA2] font-semibold flex items-center gap-1.5"><Clock className="h-3 w-3" /> Last Active</span>
                  <span className="font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-[10px]">{lastActiveDate}</span>
                </div>
              </div>
            </div>

            {/* CARD 2: SETTLEMENT BANKING */}
            <div className="bg-white border border-[#EDE9FE] rounded-2xl p-4 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between pb-1 border-b border-[#F5F2FC]">
                <h4 className="text-[10.5px] font-extrabold uppercase text-[#8E8AA2] tracking-wider flex items-center gap-1.5">
                  <CreditCard className="h-3.5 w-3.5 text-[#5B3FD6]" />
                  Settlement Banking
                </h4>
                <button
                  onClick={() => { setBankForm({ ...bankDetails }); setShowBankModal(true); }}
                  className="text-[10px] font-bold text-[#5B3FD6] hover:underline bg-transparent border-0 cursor-pointer"
                >
                  Update
                </button>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#8E8AA2] font-semibold flex items-center gap-1.5"><CreditCard className="h-3 w-3" /> Network</span>
                  <span className="font-bold text-[#2B2340]">{bankDetails.bankName}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#8E8AA2] font-semibold flex items-center gap-1.5"><FileText className="h-3 w-3" /> Account</span>
                  <span className="font-bold text-[#2B2340]">{bankDetails.accountNumber}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#8E8AA2] font-semibold flex items-center gap-1.5"><Send className="h-3 w-3" /> UPI ID</span>
                  <span className="font-bold text-[#2B2340]">{bankDetails.upiId}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#8E8AA2] font-semibold flex items-center gap-1.5"><FileText className="h-3 w-3" /> IFSC</span>
                  <span className="font-bold text-[#2B2340]">{bankDetails.ifscCode}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#8E8AA2] font-semibold flex items-center gap-1.5"><User className="h-3 w-3" /> Type</span>
                  <span className="font-bold text-[#2B2340]">{bankDetails.accountType}</span>
                </div>
              </div>
            </div>

            {/* CARD 3: OPERATIONAL INTEGRITY (KYC) */}
            <div className="bg-white border border-[#EDE9FE] rounded-2xl p-4 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between pb-1 border-b border-[#F5F2FC]">
                <h4 className="text-[10.5px] font-extrabold uppercase text-[#8E8AA2] tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#5B3FD6]" />
                  Operational Integrity
                </h4>
                <button
                  onClick={handleToggleKyc}
                  disabled={actionLoading?.kyc === customer.uid}
                  className={`text-[10px] font-bold hover:underline bg-transparent border-0 cursor-pointer transition ${localKyc ? "text-rose-600" : "text-emerald-600"}`}
                >
                  {actionLoading?.kyc === customer.uid ? "Updating..." : localKyc ? "Revoke" : "Verify"}
                </button>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#8E8AA2] font-semibold">Aadhaar Security</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                      localKyc ? "bg-emerald-50 text-[#22A861]" : "bg-amber-50 text-amber-600"
                    }`}>{kycDetails.aadhaarStatus}</span>
                    <button onClick={() => handleDocumentView("Aadhaar")} className="text-[#5B3FD6] hover:underline font-bold bg-transparent border-0 cursor-pointer flex items-center gap-0.5">
                      <ExternalLink className="h-2.5 w-2.5" /> View
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#8E8AA2] font-semibold">PAN Registry</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                      localKyc ? "bg-emerald-50 text-[#22A861]" : "bg-amber-50 text-amber-600"
                    }`}>{kycDetails.panStatus}</span>
                    <button onClick={() => handleDocumentView("PAN")} className="text-[#5B3FD6] hover:underline font-bold bg-transparent border-0 cursor-pointer flex items-center gap-0.5">
                      <ExternalLink className="h-2.5 w-2.5" /> View
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#8E8AA2] font-semibold">KYC Status</span>
                  <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                    localKyc ? "bg-indigo-50 text-indigo-600" : "bg-amber-50 text-amber-600"
                  }`}>{localKyc ? "Verified" : "Pending"}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#8E8AA2] font-semibold">Account Status</span>
                  <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                    localBlocked ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-[#059669]"
                  }`}>{localBlocked ? "Blocked" : "Active"}</span>
                </div>
              </div>
            </div>

          </div>

          {/* =================================================
              4. INLINE TAB BAR + MAIN CONTENT
          ================================================= */}
          <div className="space-y-6">

            {/* TAB BAR */}
            <div className="flex border-b border-[#E9E2F3] gap-6 px-2">
              {[
                { id: "Overview", label: "Overview & Wallet", icon: TrendingUp },
                { id: "Activity", label: "Scans & Activity", icon: Activity },
                { id: "Rewards", label: "Rewards & Tickets", icon: Gift },
                { id: "Messages", label: "Communication Hub", icon: Send }
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-3 text-xs font-black transition-all cursor-pointer border-b-2 bg-transparent -mb-px ${
                      isActive
                        ? "border-[#5B3FD6] text-[#5B3FD6]"
                        : "border-transparent text-[#8E8AA2] hover:text-[#5B3FD6]"
                    }`}
                  >
                    <TabIcon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>


              {/* =================================================
                  TAB 1: OVERVIEW & WALLET
              ================================================= */}
              {activeTab === "Overview" && (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* Wallet & Points Widget */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* 7. Wallet & Points Card (5/12 width) */}
                    <div className="md:col-span-5 bg-white border border-[#EDE9FE] rounded-[24px] p-5 shadow-sm flex flex-col justify-between h-full min-h-[200px]">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="p-2 rounded-lg bg-[#FAF9FD] border border-[#EDE9FE] text-[#5B3FD6]">
                          <CreditCard className="h-4 w-4" />
                        </span>
                        <span className="text-xs font-extrabold text-[#2B2340] uppercase tracking-wider">Wallet Balance</span>
                      </div>
                      
                      <div className="space-y-3.5 mb-4 flex-1">
                        <div className="flex items-baseline justify-between border-b border-slate-100 pb-2">
                          <span className="text-xs text-[#8E8AA2] font-semibold">Available Points</span>
                          <span className="text-xl font-black text-[#5B3FD6]">{localPoints.toLocaleString()} pts</span>
                        </div>
                        <div className="flex items-baseline justify-between border-b border-slate-100 pb-2">
                          <span className="text-xs text-[#8E8AA2] font-semibold">Cashback Equiv.</span>
                          <span className="text-xl font-black text-[#22A861]">₹{cashbackValue}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-1 text-[11px] text-[#8E8AA2]">
                          <div>
                            <span className="font-semibold block">Total Earned</span>
                            <span className="text-sm font-black text-[#2B2340]">{totalEarned.toLocaleString()} pts</span>
                          </div>
                          <div>
                            <span className="font-semibold block">Total Redeemed</span>
                            <span className="text-sm font-black text-[#2B2340]">{pointsRedeemed.toLocaleString()} pts</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-auto">
                        <button
                          onClick={() => { setPointsAction("deduct"); setPointsInput(""); setPointsReason(""); setShowPointsDrawer(true); }}
                          className="flex items-center justify-center gap-1.5 rounded-xl border border-[#EDE9FE] bg-white py-2 text-xs font-bold text-[#2B2340] hover:bg-[#FAF9FD] transition cursor-pointer"
                        >
                          <Sliders className="h-3.5 w-3.5" />
                          Adjust
                        </button>
                        <button
                          onClick={() => { setPointsAction("add"); setPointsInput(""); setPointsReason(""); setShowPointsDrawer(true); }}
                          className="flex items-center justify-center gap-1.5 rounded-xl bg-[#5B3FD6] hover:bg-[#4C32C7] py-2 text-xs font-bold text-white shadow-sm transition cursor-pointer border-0"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Add Points
                        </button>
                      </div>
                    </div>

                    {/* 17. Favorite Products & LTV Card (7/12 width) */}
                    <div className="md:col-span-7 bg-white border border-[#EDE9FE] rounded-[24px] p-5 shadow-sm flex flex-col justify-between h-full min-h-[200px]">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="p-2 rounded-lg bg-[#FAF9FD] border border-[#EDE9FE] text-[#5B3FD6]">
                          <Activity className="h-4 w-4" />
                        </span>
                        <span className="text-xs font-extrabold text-[#2B2340] uppercase tracking-wider">Favorite Products & LTV</span>
                      </div>
                      
                      <div className="space-y-4 flex-1 justify-center flex flex-col">
                        {/* Top scanned products list */}
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px] font-semibold text-[#8E8AA2]">
                              <span>Premium Emulsion 10L</span>
                              <span className="font-bold text-[#2B2340]">85%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                              <div className="h-full rounded-full bg-[#5B3FD6]" style={{ width: "85%" }} />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px] font-semibold text-[#8E8AA2]">
                              <span>Primer 4L</span>
                              <span className="font-bold text-[#2B2340]">45%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                              <div className="h-full rounded-full bg-[#F59E0B]" style={{ width: "45%" }} />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px] font-semibold text-[#8E8AA2]">
                              <span>Weather Shield 5L</span>
                              <span className="font-bold text-[#2B2340]">30%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                              <div className="h-full rounded-full bg-[#10B981]" style={{ width: "30%" }} />
                            </div>
                          </div>
                        </div>

                        {/* Summary numbers positioned directly beneath */}
                        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100 mt-2">
                          <div className="bg-[#FAF9FD] border border-[#EDE9FE] rounded-xl p-3">
                            <p className="text-[9px] uppercase font-extrabold text-[#8E8AA2] tracking-wider">Customer LTV</p>
                            <p className="text-base font-black text-[#22A861] mt-0.5">₹{lifetimeSpend.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                          </div>
                          <div className="bg-[#FAF9FD] border border-[#EDE9FE] rounded-xl p-3">
                            <p className="text-[9px] uppercase font-extrabold text-[#8E8AA2] tracking-wider">Repeat Purchase Rate</p>
                            <p className="text-base font-black text-[#5B3FD6] mt-0.5">{repeatPurchaseRate}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CustomerTrendChart
                    trendData={trendData}
                    chartTab={chartTab}
                    setChartTab={setChartTab}
                    lifetimeSpend={lifetimeSpend}
                    totalEarned={totalEarned}
                  />

                  {/* AI Insights Widget - Full Width and Multi-Column Layout */}
                  <Card className="p-5 space-y-4 border border-[#EDE9FE] rounded-[24px] shadow-sm">
                    <h3 className="text-xs uppercase font-extrabold text-[#7C3AED] border-b border-[#F5F2FC] pb-2 tracking-wider flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-[#7C3AED]" />
                      AI Insights (Beta)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      {/* Col 1: Churn Risk */}
                      <div className="bg-[#FFF1F2] border border-[#FECDD3] rounded-xl p-4 flex flex-col justify-between">
                        <div>
                          <p className="text-[10px] text-[#E11D48] font-bold uppercase tracking-wider">Churn Risk</p>
                          <p className="text-3xl font-black text-[#E11D48] mt-1">{aiInsights.churnRisk}%</p>
                        </div>
                        <span className="text-[9.5px] text-[#F43F5E] bg-[#FFE4E6] px-2.5 py-1 rounded-full mt-3 inline-block font-extrabold text-center border border-[#FECDD3]">{aiInsights.churnLabel} Risk Profile</span>
                      </div>

                      {/* Col 2: Engagement & Health */}
                      <div className="bg-[#FAF9FF] border border-[#EBE6FF] rounded-xl p-4 flex flex-col justify-between space-y-3">
                        <div>
                          <p className="text-[10px] text-[#5B3FD6] font-bold uppercase tracking-wider">Engagement Score</p>
                          <p className="text-xl font-black text-[#5B3FD6] mt-1">{aiInsights.engagementScore} / 100</p>
                        </div>
                        <div className="border-t border-[#EBE6FF] pt-2 flex justify-between items-center">
                          <div>
                            <p className="text-[10px] text-[#22A861] font-bold uppercase tracking-wider">Health Score</p>
                            <p className="text-xl font-black text-[#22A861] mt-0.5">{aiInsights.healthScore} / 100</p>
                          </div>
                          <span className="text-[9px] font-extrabold text-[#22A861] bg-[#E2F5EC] px-2 py-0.5 rounded border border-[#A7F3D0]">{aiInsights.healthLabel}</span>
                        </div>
                      </div>

                      {/* Col 3: Actionable Recommendations */}
                      <div className="bg-[#FFFDF5] border border-[#FDE68A] rounded-xl p-4 text-xs flex flex-col justify-between">
                        <div>
                          <p className="text-[10px] text-[#D97706] font-bold uppercase tracking-wider mb-2">AI Recommendations</p>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center py-0.5 border-b border-[#FDE68A]/30">
                              <span className="text-[#B45309]/80 font-semibold">Next Action:</span>
                              <span className="font-bold text-[#B45309]">{aiInsights.nextBestAction}</span>
                            </div>
                            <div className="flex justify-between items-center py-0.5 border-b border-[#FDE68A]/30">
                              <span className="text-[#B45309]/80 font-semibold">Best Channel:</span>
                              <span className="font-bold text-[#B45309]">{aiInsights.bestChannel}</span>
                            </div>
                          </div>
                        </div>
                        <div className="border-t border-[#FDE68A]/50 pt-2 mt-3 text-[10px] text-[#B45309]">
                          <span className="font-bold text-[#D97706]">Promo Offer:</span> "{aiInsights.offerText}"
                        </div>
                      </div>

                    </div>
                  </Card>

                </div>
              )}

              {/* =================================================
                  TAB 2: SCANS & ACTIVITY
              ================================================= */}
              {activeTab === "Activity" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-fadeIn">
                  
                  {/* Left Column (55% width -> lg:col-span-7) */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Weekly Scan Counts AreaChart */}
                    <CustomerScanFrequencyChart scanFrequencyData={scanFrequencyData} />

                    {/* Scan History Log (High Density Table) */}
                    <div className="bg-white border border-[#EDE9FE] rounded-[24px] p-5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-[#FAF9FD] pb-3">
                        <h3 className="text-xs uppercase font-extrabold text-[#8E8AA2] tracking-wider flex items-center gap-2">
                          <Clock className="h-4 w-4 text-[#5B3FD6]" />
                          Scan History Log
                        </h3>
                        <span className="text-[10px] text-[#8E8AA2] font-bold">Total {scansCount} scans</span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="border-b border-[#F0EDF8] text-[9px] uppercase tracking-wider font-bold text-[#8E8AA2]">
                              <th className="pb-2 pl-1">Product Description</th>
                              <th className="pb-2">SKU ID</th>
                              <th className="pb-2">Date & Location</th>
                              <th className="pb-2 text-right">Points</th>
                              <th className="pb-2 text-right pr-4">Risk Level</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#F5F2FC]">
                             {paginatedScans.map((scan, i) => (
                               <tr key={i} className="hover:bg-[#F8F7FC] transition-colors">
                                 <td className="py-2 pl-1 font-bold text-[#2B2340]">{scan.product}</td>
                                 <td className="py-2 text-[#8E8AA2] font-semibold">{scan.sku}</td>
                                 <td className="py-2 text-[#8E8AA2] font-semibold">{scan.date} • {scan.location}</td>
                                 <td className="py-2 text-right font-extrabold text-[#10B981]">{scan.pts}</td>
                                 <td className="py-2 text-right pr-4">
                                   <span className={`px-2 py-0.5 rounded-[6px] text-[10px] font-bold border ${scan.riskColor}`}>
                                     {scan.risk}
                                   </span>
                                 </td>
                               </tr>
                             ))}
                          </tbody>
                        </table>
                      </div>
                      <Pagination
                         currentPage={scansPage}
                         totalPages={totalScansPages}
                         onPageChange={setScansPage}
                         pageSize={scansPageSize}
                         onPageSizeChange={(size) => { setScansPageSize(size); setScansPage(1); }}
                         totalItems={scanHistory.length}
                       />
                    </div>
                  </div>

                  {/* Right Column (45% width -> lg:col-span-5) */}
                  <div className="lg:col-span-5">
                    {/* Activity Timeline */}
                    <div className="bg-white border border-[#EDE9FE] rounded-[24px] p-5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-[#FAF9FD] pb-3">
                        <h3 className="text-xs uppercase font-extrabold text-[#8E8AA2] tracking-wider flex items-center gap-2">
                          <Activity className="h-4 w-4 text-[#5B3FD6]" />
                          Activity Timeline
                        </h3>
                        <span className="text-[10px] text-[#8E8AA2] font-extrabold">All logs</span>
                      </div>

                      <div className="space-y-4 pr-1">
                        {activities.map((act) => (
                          <div key={act.id} className="text-xs flex items-start gap-3">
                            <span className={`flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-lg mt-0.5 border ${
                              act.type === "QR Scan" ? "bg-emerald-50 text-[#10B981] border-emerald-100" :
                              act.type === "Redemption" ? "bg-rose-50 text-[#EF4444] border-rose-100" :
                              act.type === "Ticket" ? "bg-amber-50 text-[#F59E0B] border-amber-100" : "bg-indigo-50 text-[#5B3FD6] border-indigo-100"
                            }`}>
                              {act.type === "QR Scan" ? <Plus className="h-4 w-4" /> :
                               act.type === "Redemption" ? <Sliders className="h-4 w-4" /> :
                               act.type === "Ticket" ? <AlertTriangle className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="font-bold text-[#2B2340] leading-snug">{act.desc}</p>
                              <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1 text-[10px] text-[#8E8AA2] font-semibold">
                                <span>{act.date}</span>
                                <span>•</span>
                                <span>{act.location}</span>
                              </div>
                            </div>
                            <div className="shrink-0 text-right">
                              {act.points && (
                                <span className={`font-extrabold block text-xs ${act.isPositive ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                                  {act.points}
                                </span>
                              )}
                              {act.badge && (
                                <span className="px-2 py-0.5 rounded-[6px] text-[9px] font-extrabold border bg-amber-50 text-amber-600 border-amber-200 block mt-1">{act.badge}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* =================================================
                  TAB 3: REWARDS & TICKETS
              ================================================= */}
              {activeTab === "Rewards" && (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* Rewards Summary KPIs (Standardized text-slate-900 with subtle background badges) */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="bg-white border border-[#EDE9FE] rounded-2xl p-4 shadow-sm flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <p className="text-[10px] font-extrabold text-[#8E8AA2] uppercase tracking-wider">Redeemed This Month</p>
                        <span className="px-2 py-0.5 rounded text-[8px] font-black bg-[#F5F3FF] text-[#5B3FD6]">Claims</span>
                      </div>
                      <p className="text-xl font-black text-slate-900 mt-2">5 claims</p>
                      <span className="text-[10px] text-[#8E8AA2] mt-0.5 block">Approved redemptions</span>
                    </div>
                    <div className="bg-white border border-[#EDE9FE] rounded-2xl p-4 shadow-sm flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <p className="text-[10px] font-extrabold text-[#8E8AA2] uppercase tracking-wider">Total Cashback</p>
                        <span className="px-2 py-0.5 rounded text-[8px] font-black bg-[#EEF2FF] text-[#4F46E5]">Cashback</span>
                      </div>
                      <p className="text-xl font-black text-slate-900 mt-2">₹{cashbackValue}</p>
                      <span className="text-[10px] text-[#8E8AA2] mt-0.5 block">Delivered this month</span>
                    </div>
                    <div className="bg-white border border-[#EDE9FE] rounded-2xl p-4 shadow-sm flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <p className="text-[10px] font-extrabold text-[#8E8AA2] uppercase tracking-wider">Avg Redeem Value</p>
                        <span className="px-2 py-0.5 rounded text-[8px] font-black bg-[#F5F3FF] text-[#5B3FD6]">Value</span>
                      </div>
                      <p className="text-xl font-black text-slate-900 mt-2">₹120.00</p>
                      <span className="text-[10px] text-[#8E8AA2] mt-0.5 block">Per ticket conversion</span>
                    </div>
                    <div className="bg-white border border-[#EDE9FE] rounded-2xl p-4 shadow-sm flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <p className="text-[10px] font-extrabold text-[#8E8AA2] uppercase tracking-wider">Total Points Used</p>
                        <span className="px-2 py-0.5 rounded text-[8px] font-black bg-[#EEF2FF] text-[#4F46E5]">Points</span>
                      </div>
                      <p className="text-xl font-black text-slate-900 mt-2">{pointsRedeemed.toLocaleString()} pts</p>
                      <span className="text-[10px] text-[#8E8AA2] mt-0.5 block">Lifetime points used</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                    
                    {/* Rewards Redeemed Log (30% width -> xl:col-span-4) */}
                    <div className="xl:col-span-4 bg-white border border-[#EDE9FE] rounded-[24px] p-5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-[#FAF9FD] pb-3">
                        <h3 className="text-xs uppercase font-extrabold text-[#8E8AA2] tracking-wider flex items-center gap-2">
                          <Gift className="h-4 w-4 text-[#5B3FD6]" />
                          Rewards Redeemed
                        </h3>
                      </div>
                      
                      <div className="space-y-3.5">
                        {paginatedRedemptions.map((red, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs border-b border-[#FAF9FD] pb-3 last:border-0 last:pb-0">
                            <div className="flex items-start gap-2 min-w-0">
                              <span className="flex h-7.5 w-7.5 shrink-0 items-center justify-center bg-[#FAF9FD] border border-[#EDE9FE] text-[#5B3FD6] rounded-lg mt-0.5">
                                <Gift className="h-4 w-4" />
                              </span>
                              <div className="min-w-0">
                                <p className="font-bold text-[#2B2340] truncate">{red.title}</p>
                                <p className="text-[9.5px] text-[#8E8AA2] mt-0.5 truncate">{red.date}</p>
                              </div>
                            </div>
                            <div className="text-right shrink-0 ml-2">
                              <span className="font-extrabold text-rose-500 block">{red.points}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Pagination
                        currentPage={rewardsPage}
                        totalPages={totalRewardsPages}
                        onPageChange={setRewardsPage}
                        pageSize={rewardsPageSize}
                        onPageSizeChange={(size) => { setRewardsPageSize(size); setRewardsPage(1); }}
                        totalItems={redemptions.length}
                      />
                    </div>

                    {/* Support & Dispute Tickets (70% width -> xl:col-span-8) */}
                    <div className="xl:col-span-8 bg-white border border-[#EDE9FE] rounded-[24px] p-5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-[#FAF9FD] pb-3">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs uppercase font-extrabold text-[#8E8AA2] tracking-wider flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-[#5B3FD6]" />
                            Support & Dispute Tickets
                          </h3>
                        </div>
                        <button 
                          onClick={() => { setTicketTopic(""); setTicketDesc(""); setShowTicketModal(true); }}
                          className="rounded-xl bg-[#5B3FD6] hover:bg-[#4C32C7] px-3.5 py-1.5 text-[10px] font-extrabold text-white shadow-sm transition cursor-pointer border-0"
                        >
                          + Create Ticket
                        </button>
                      </div>

                      {/* Summary Metrics */}
                      <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                        <div className="bg-amber-50 border border-amber-100 rounded-xl py-2">
                          <p className="text-base font-black text-amber-600">{openTicketsCount}</p>
                          <p className="text-[9px] text-[#B45309] font-bold mt-0.5">Open Tickets</p>
                        </div>
                        <div className="bg-[#E2F5EC] border border-[#D1FAE5] rounded-xl py-2">
                          <p className="text-base font-black text-[#22A861]">{resolvedTicketsCount}</p>
                          <p className="text-[9px] text-[#2D6A4F] font-bold mt-0.5">Resolved</p>
                        </div>
                        <div className="bg-[#FAF9FF] border border-[#EBE6FF] rounded-xl py-2">
                          <p className="text-base font-black text-[#5B3FD6]">1.2 Days</p>
                          <p className="text-[9px] text-[#5B3FD6] font-bold mt-0.5">Avg. Resolution</p>
                        </div>
                      </div>

                      <div className="space-y-3.5 pt-2">
                        {paginatedTickets.map((tkt) => (
                          <div 
                            key={tkt.id} 
                            onClick={() => { setSelectedTicket(tkt); setShowSupportDrawer(true); }}
                            className="text-xs border border-[#EDE9FE] hover:border-[#5B3FD6] hover:bg-[#FAF9FD]/50 p-3.5 rounded-xl transition cursor-pointer space-y-2 group"
                          >
                            <div className="flex items-center justify-between">
                              <p className="font-bold text-[#2B2340] group-hover:text-[#5B3FD6] transition">{tkt.topic}</p>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-black border ${
                                tkt.status === "Resolved" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-200"
                              }`}>
                                {tkt.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#8E8AA2] line-clamp-2">"{tkt.desc}"</p>
                            <div className="flex items-center justify-between text-[10px] text-[#8E8AA2] font-semibold pt-1">
                              <span>ID: <strong className="text-[#2B2340] font-mono">{tkt.id}</strong> • Opened: {tkt.date}</span>
                              <span className="text-[#5B3FD6] font-bold flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition">
                                View Discussion <ChevronRight className="h-3 w-3" />
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Pagination
                        currentPage={ticketsPage}
                        totalPages={totalTicketsPages}
                        onPageChange={setTicketsPage}
                        pageSize={ticketsPageSize}
                        onPageSizeChange={(size) => { setTicketsPageSize(size); setTicketsPage(1); }}
                        totalItems={tickets.length}
                      />
                    </div>

                  </div>

                </div>
              )}

              {/* =================================================
                  TAB 4: COMMUNICATION HUB
              ================================================= */}
              {activeTab === "Messages" && (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* Channel Status Badges */}
                  <div className="flex flex-wrap items-center gap-3 bg-white border border-[#EDE9FE] px-4 py-3 rounded-2xl shadow-sm text-xs">
                    <span className="text-[#8E8AA2] font-extrabold uppercase tracking-wider text-[10px]">Channel Statuses:</span>
                    <div className="flex items-center gap-1.5 bg-[#E2F5EC] text-[#22A861] border border-[#D1FAE5] px-2.5 py-1 rounded-lg font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22A861]" />
                      WhatsApp: Delivered (29 May)
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#FAF9FF] text-[#5B3FD6] border border-[#EBE6FF] px-2.5 py-1 rounded-lg font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5B3FD6]" />
                      SMS: Delivered (10 May)
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#F0F9FF] text-[#0EA5E9] border border-[#E0F2FE] px-2.5 py-1 rounded-lg font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
                      Email: Sent (15 Jan)
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                    
                    {/* Message Composer (6/12 width) */}
                    <div className="xl:col-span-6 bg-white border border-[#EDE9FE] rounded-[24px] p-5 shadow-sm space-y-4">
                      <h3 className="text-xs uppercase font-extrabold text-[#8E8AA2] tracking-wider flex items-center gap-2">
                        <Send className="h-4 w-4 text-[#5B3FD6]" />
                        Dispatch Direct Message
                      </h3>

                      <div className="space-y-3.5">
                        {/* Channel selector */}
                        <div>
                          <label className="text-[9px] uppercase font-extrabold text-[#8E8AA2] tracking-wider block mb-1.5">Outbound Channel</label>
                          <div className="grid grid-cols-3 gap-2">
                            {["WhatsApp", "SMS", "Email"].map((ch) => (
                              <button
                                key={ch}
                                type="button"
                                onClick={() => setMessageChannel(ch)}
                                className={`py-1.5 rounded-lg text-xs font-bold border cursor-pointer transition ${
                                  messageChannel === ch
                                    ? "bg-[#F0EAFF] text-[#5B3FD6] border-[#EDE9FE]"
                                    : "bg-white text-[#8E8AA2] border-[#EDE9FE]"
                                }`}
                              >
                                {ch}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Quick preset templates */}
                        <div>
                          <label className="text-[9px] uppercase font-extrabold text-[#8E8AA2] tracking-wider block mb-1.5">Quick Templates</label>
                          <div className="flex flex-wrap gap-1.5">
                            {presetReasons.map((preset) => (
                              <button
                                key={preset}
                                type="button"
                                onClick={() => setCustomMessage(preset)}
                                className="rounded-full px-2.5 py-1 text-[9.5px] font-semibold border bg-[#FAFAFE] text-[#8E8AA2] border-[#EDE9FE] hover:bg-[#F5F2FC] hover:text-[#5B3FD6] transition cursor-pointer"
                              >
                                {preset}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Textarea */}
                        <div>
                          <label className="text-[9px] uppercase font-extrabold text-[#8E8AA2] tracking-wider block mb-1.5">Custom Message Body</label>
                          <textarea
                            rows={4}
                            value={customMessage}
                            onChange={(e) => setCustomMessage(e.target.value)}
                            placeholder="Type custom outbound notification message..."
                            className="w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FE] px-3.5 py-2.5 text-xs font-semibold text-[#2B2340] placeholder:text-[#C4B5FD] outline-none focus:border-[#7C3AED] transition resize-none"
                          />
                        </div>

                        <button
                          onClick={handleSendMessage}
                          disabled={sending}
                          className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#5B3FD6] hover:bg-[#4C32C7] py-2 text-xs font-bold text-white shadow-sm transition cursor-pointer border-0"
                        >
                          {sending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                          {sending ? "Sending..." : "Send Message Now"}
                        </button>
                      </div>
                    </div>

                    {/* Outbound Message History Log: Live Terminal Feed (6/12 width) */}
                    <div className="xl:col-span-6 bg-white border border-[#EDE9FE] rounded-[24px] p-5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-[#FAF9FD] pb-3">
                        <h3 className="text-xs uppercase font-extrabold text-[#8E8AA2] tracking-wider flex items-center gap-2">
                          <Terminal className="h-4 w-4 text-[#5B3FD6]" />
                          Outbound System Logs
                        </h3>
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] text-emerald-600 font-mono font-bold">live stream connected</span>
                        </div>
                      </div>

                      <div className="bg-[#F3E8FF] border border-[#DDD6FE] rounded-xl p-4 font-mono text-[11px] text-[#2B2340] space-y-2.5 overflow-y-auto h-[340px] shadow-inner">
                        {messages.map((msg, idx) => {
                          const channelColors = {
                            WhatsApp: "text-emerald-600 font-bold",
                            SMS: "text-indigo-600 font-bold",
                            Email: "text-sky-600 font-bold"
                          };
                          const statusColors = {
                            Delivered: "text-emerald-600 font-bold",
                            Sent: "text-sky-600 font-bold",
                            Failed: "text-rose-600 font-bold"
                          };
                          
                          return (
                            <div key={idx} className="border-b border-[#E9E2F3] pb-2 last:border-0 last:pb-0">
                              <span className="text-[#8E8AA2] font-semibold">[{msg.date}]</span>{" "}
                              <span className={channelColors[msg.type] || "text-[#2B2340]"}>[{msg.type.toUpperCase()}]</span>{" "}
                              <span className={statusColors[msg.status] || "text-[#2B2340]"}>[{msg.status.toUpperCase()}]</span>
                              <p className="text-[#2B2340] mt-1 pl-4 whitespace-pre-wrap break-words bg-white/70 py-1.5 px-2 rounded border border-[#EDE9FE]/80">
                                {msg.content}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                </div>
              )}

            </div>

          </div>

        {/* ── DRAWER: POINTS ADJUSTMENT ── */}
        <div className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ${showPointsDrawer ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setShowPointsDrawer(false)} />
          <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
            <div className={`w-screen max-w-md transform transition-transform duration-300 ease-in-out ${showPointsDrawer ? "translate-x-0" : "translate-x-full"} bg-white shadow-2xl flex flex-col`}>
              <div className="px-6 py-5 border-b border-[#F5F2FC] flex items-center justify-between bg-gradient-to-r from-[#EDE9FE] via-[#DDD6FE] to-[#7C3AED]">
                <h3 className="text-base font-black flex items-center gap-2 text-[#2B2340]">
                  <Sliders className="h-5 w-5 text-[#5B3FD6]" />
                  Adjust Loyalty Points
                </h3>
                <button onClick={() => setShowPointsDrawer(false)} className="text-[#5B3FD6] hover:text-[#4C32C7] transition cursor-pointer bg-transparent border-0">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handlePointsSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
                <div>
                  <label className="text-[10px] uppercase font-extrabold text-[#8E8AA2] tracking-wider block mb-2">Adjustment Type</label>
                  <div className="grid grid-cols-2 gap-2 bg-[#F5F3FF] p-1 rounded-xl border border-[#EDE9FE]">
                    <button
                      type="button"
                      onClick={() => setPointsAction("add")}
                      className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer border-0 ${
                        pointsAction === "add" ? "bg-[#5B3FD6] text-white shadow-sm" : "text-[#8E8AA2] hover:text-[#5B3FD6]"
                      }`}
                    >
                      Add Points
                    </button>
                    <button
                      type="button"
                      onClick={() => setPointsAction("deduct")}
                      className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer border-0 ${
                        pointsAction === "deduct" ? "bg-rose-600 text-white shadow-sm" : "text-[#8E8AA2] hover:text-rose-600"
                      }`}
                    >
                      Deduct Points
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-extrabold text-[#8E8AA2] tracking-wider block mb-1.5">Points Amount</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={pointsInput}
                    onChange={(e) => setPointsInput(e.target.value)}
                    placeholder="Enter points value (e.g. 100)"
                    className="w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FE] px-3.5 py-2.5 text-xs font-semibold text-[#2B2340] outline-none focus:border-[#5B3FD6] transition"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-extrabold text-[#8E8AA2] tracking-wider block mb-1.5">Preset Reason</label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {[
                      "Goodwill Gesture",
                      "System Error Correction",
                      "Promo Campaign Bonus",
                      "Redemption Adjustment",
                      "Custom Adjustment"
                    ].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setPointsReason(preset)}
                        className={`rounded-full px-2.5 py-1 text-[9.5px] font-semibold border transition cursor-pointer ${
                          pointsReason === preset
                            ? "bg-[#F0EAFF] text-[#5B3FD6] border-[#DDD6FE]"
                            : "bg-[#FAFAFE] text-[#8E8AA2] border-[#EDE9FE] hover:bg-[#F5F2FC]"
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                  <label className="text-[10px] uppercase font-extrabold text-[#8E8AA2] tracking-wider block mb-1.5">Adjustment Description / Note</label>
                  <textarea
                    rows={3}
                    value={pointsReason}
                    onChange={(e) => setPointsReason(e.target.value)}
                    placeholder="Describe the adjustment reason..."
                    className="w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FE] px-3.5 py-2.5 text-xs font-semibold text-[#2B2340] outline-none focus:border-[#5B3FD6] transition resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-[#F5F2FC]">
                  <button
                    type="submit"
                    className={`w-full py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition cursor-pointer border-0 ${
                      pointsAction === "add" ? "bg-[#5B3FD6] hover:bg-[#4C32C7]" : "bg-rose-600 hover:bg-rose-700"
                    }`}
                  >
                    Confirm {pointsAction === "add" ? "Addition" : "Deduction"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* ── MODAL: BANK INFORMATION UPDATE ── */}
        {showBankModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl border border-[#EDE9FE] w-full max-w-md p-6 shadow-2xl animate-scaleUp">
              <div className="flex items-center justify-between border-b border-[#F5F2FC] pb-4 mb-4">
                <h3 className="text-base font-black text-[#1E1B4B] flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-[#5B3FD6]" />
                  Update Bank Details
                </h3>
                <button onClick={() => setShowBankModal(false)} className="rounded-full bg-[#F5F3FF] p-1.5 text-[#8E8AA2] hover:text-[#5B3FD6] cursor-pointer border-0">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleBankSubmit} className="space-y-3">
                <div>
                  <label className="text-[10px] font-extrabold text-[#8E8AA2] uppercase tracking-wider block mb-1">Bank Name</label>
                  <input
                    type="text"
                    required
                    value={bankForm.bankName}
                    onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                    className="w-full rounded-xl border border-[#EDE9FE] bg-[#F8F7FC] px-4 py-2 text-xs font-bold text-[#1E1B4B] outline-none focus:border-[#7C3AED]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-extrabold text-[#8E8AA2] uppercase tracking-wider block mb-1">Account Holder Name</label>
                  <input
                    type="text"
                    required
                    value={bankForm.accountHolder}
                    onChange={(e) => setBankForm({ ...bankForm, accountHolder: e.target.value })}
                    className="w-full rounded-xl border border-[#EDE9FE] bg-[#F8F7FC] px-4 py-2 text-xs font-bold text-[#1E1B4B] outline-none focus:border-[#7C3AED]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-extrabold text-[#8E8AA2] uppercase tracking-wider block mb-1">Account Type</label>
                    <input
                      type="text"
                      required
                      value={bankForm.accountType}
                      onChange={(e) => setBankForm({ ...bankForm, accountType: e.target.value })}
                      className="w-full rounded-xl border border-[#EDE9FE] bg-[#F8F7FC] px-4 py-2 text-xs font-bold text-[#1E1B4B] outline-none focus:border-[#7C3AED]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-extrabold text-[#8E8AA2] uppercase tracking-wider block mb-1">IFSC Code</label>
                    <input
                      type="text"
                      required
                      value={bankForm.ifscCode}
                      onChange={(e) => setBankForm({ ...bankForm, ifscCode: e.target.value })}
                      className="w-full rounded-xl border border-[#EDE9FE] bg-[#F8F7FC] px-4 py-2 text-xs font-bold text-[#1E1B4B] outline-none focus:border-[#7C3AED]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-extrabold text-[#8E8AA2] uppercase tracking-wider block mb-1">Account Number</label>
                  <input
                    type="text"
                    required
                    value={bankForm.accountNumber}
                    onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                    className="w-full rounded-xl border border-[#EDE9FE] bg-[#F8F7FC] px-4 py-2 text-xs font-bold text-[#1E1B4B] outline-none focus:border-[#7C3AED]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-extrabold text-[#8E8AA2] uppercase tracking-wider block mb-1">UPI ID</label>
                  <input
                    type="text"
                    required
                    value={bankForm.upiId}
                    onChange={(e) => setBankForm({ ...bankForm, upiId: e.target.value })}
                    className="w-full rounded-xl border border-[#EDE9FE] bg-[#F8F7FC] px-4 py-2 text-xs font-bold text-[#1E1B4B] outline-none focus:border-[#7C3AED]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#F5F2FC]">
                  <button
                    type="button"
                    onClick={() => setShowBankModal(false)}
                    className="w-full py-2 rounded-xl bg-white border border-[#DDD6FE] text-xs font-bold text-[#5B3FD6] hover:bg-[#F5F3FF] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-[#5B3FD6] hover:bg-[#4C32C7] text-xs font-bold text-white shadow-sm cursor-pointer border-0"
                  >
                    Save Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── MODAL: CREATE SUPPORT TICKET ── */}
        {showTicketModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl border border-[#EDE9FE] w-full max-w-md p-6 shadow-2xl animate-scaleUp">
              <div className="flex items-center justify-between border-b border-[#F5F2FC] pb-4 mb-4">
                <h3 className="text-base font-black text-[#1E1B4B] flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-[#5B3FD6]" />
                  Open Support Ticket
                </h3>
                <button onClick={() => setShowTicketModal(false)} className="rounded-full bg-[#F5F3FF] p-1.5 text-[#8E8AA2] hover:text-[#5B3FD6] cursor-pointer border-0">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-extrabold text-[#8E8AA2] uppercase tracking-wider block mb-2">Ticket Topic / Reason</label>
                  <input
                    type="text"
                    required
                    value={ticketTopic}
                    onChange={(e) => setTicketTopic(e.target.value)}
                    placeholder="e.g. Point credit failure on scanner"
                    className="w-full rounded-xl border border-[#EDE9FE] bg-[#F8F7FC] px-4 py-2.5 text-xs font-semibold text-[#1E1B4B] placeholder:text-[#C4B5FD] outline-none focus:border-[#7C3AED]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-extrabold text-[#8E8AA2] uppercase tracking-wider block mb-2">Description / Notes</label>
                  <textarea
                    rows={4}
                    value={ticketDesc}
                    onChange={(e) => setTicketDesc(e.target.value)}
                    placeholder="Describe the problem, serial numbers, product details if any..."
                    className="w-full rounded-xl border border-[#EDE9FE] bg-[#F8F7FC] px-4 py-2.5 text-xs font-semibold text-[#1E1B4B] placeholder:text-[#C4B5FD] outline-none focus:border-[#7C3AED] resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#F5F2FC]">
                  <button
                    type="button"
                    onClick={() => setShowTicketModal(false)}
                    className="w-full py-2 rounded-xl bg-white border border-[#DDD6FE] text-xs font-bold text-[#5B3FD6] hover:bg-[#F5F3FF] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-[#5B3FD6] hover:bg-[#4C32C7] text-xs font-bold text-white shadow-sm cursor-pointer border-0"
                  >
                    Create Ticket
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── DRAWER: SETTINGS & CONFIGURATION ── */}
        <div className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ${showSettingsDrawer ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setShowSettingsDrawer(false)} />
          <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
            <div className={`w-screen max-w-md transform transition-transform duration-300 ease-in-out ${showSettingsDrawer ? "translate-x-0" : "translate-x-full"} bg-white shadow-2xl flex flex-col`}>
              <div className="px-6 py-5 border-b border-[#F5F2FC] flex items-center justify-between bg-gradient-to-r from-[#EDE9FE] via-[#DDD6FE] to-[#7C3AED]">
                <h3 className="text-base font-black flex items-center gap-2 text-[#2B2340]">
                  <Settings className="h-5 w-5 text-[#5B3FD6]" />
                  Preferences & Configuration
                </h3>
                <button onClick={() => setShowSettingsDrawer(false)} className="text-[#5B3FD6] hover:text-[#4C32C7] transition cursor-pointer bg-transparent border-0">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Notification Preferences */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-extrabold text-[#2B2340] border-b border-[#F5F2FC] pb-2 tracking-wider flex items-center gap-1.5">
                    <Sliders className="h-4 w-4 text-[#5B3FD6]" />
                    Notification Preferences
                  </h4>
                  <p className="text-[11px] text-[#8E8AA2]">Configure communication channels for sending loyalty scans and dispute ticket updates.</p>
                  <div className="bg-[#FAF9FD] border border-[#EDE9FE] rounded-2xl p-4 space-y-3">
                    {[
                      { key: "whatsapp", label: "WhatsApp" },
                      { key: "email", label: "Email" },
                      { key: "sms", label: "SMS" },
                      { key: "push", label: "Push Notification" }
                    ].map((pref) => {
                      const enabled = commPrefs[pref.key];
                      return (
                        <label
                          key={pref.key}
                          className="flex items-center gap-3 cursor-pointer text-xs font-bold text-[#2B2340] select-none hover:text-[#5B3FD6] transition"
                        >
                          <input
                            type="checkbox"
                            checked={enabled}
                            onChange={() => setCommPrefs({ ...commPrefs, [pref.key]: !enabled })}
                            className="h-4 w-4 rounded border-[#EDE9FE] text-[#5B3FD6] focus:ring-[#5B3FD6] accent-[#5B3FD6] cursor-pointer"
                          />
                          <span>{pref.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Authorized Device Sessions */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs uppercase font-extrabold text-[#2B2340] border-b border-[#F5F2FC] pb-2 tracking-wider flex items-center gap-1.5">
                    <Smartphone className="h-4 w-4 text-[#5B3FD6]" />
                    Authorized Devices & Sessions
                  </h4>
                  <div className="bg-[#FFFBEB] border border-[#FEF3C7] rounded-xl p-3 text-[11px] text-[#D97706] flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Suspicious sessions have read/write access to customer QR scans. Block unrecognized fingerprints immediately.</span>
                  </div>
                  <div className="space-y-3.5 mt-2">
                    {devices.map((device) => (
                      <div key={device.id} className="text-xs flex items-center justify-between gap-4 border-b border-[#FAF9FD] pb-3 last:border-0 last:pb-0">
                        <div className="space-y-1 min-w-0">
                          <p className="font-bold text-[#2B2340] flex flex-wrap items-center gap-1.5">
                            <span className="truncate">{device.name}</span>
                            {device.suspicious && (
                              <span className="px-1.5 py-0.5 bg-rose-50 text-rose-500 rounded border border-rose-100 text-[8.5px] font-black shrink-0">Suspicious</span>
                            )}
                          </p>
                          <p className="text-[10px] text-[#8E8AA2]">{device.city} • Last seen {device.lastSeen}</p>
                          <div className="text-[9px] text-slate-500 flex items-center gap-1.5 flex-wrap">
                            <span>Fingerprint:</span>
                            <span className="bg-slate-50 border border-slate-200 px-1.5 py-0.5 font-mono text-[10px] text-slate-600 rounded shrink-0">{device.fingerprint}</span>
                          </div>
                        </div>
                        <div className="shrink-0">
                          {!device.suspicious ? (
                            <button
                              onClick={() => handleBlockDevice(device.fingerprint)}
                              className="px-3 py-1 bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 transition rounded-lg text-[10px] font-bold cursor-pointer"
                            >
                              Block
                            </button>
                          ) : (
                            <span className="text-[10px] font-extrabold text-rose-500 px-2 py-1 bg-rose-50 border border-rose-100 rounded-lg">Blocked</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── DRAWER: SUPPORT TICKET CHAT ── */}
        <div className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ${showSupportDrawer && selectedTicket ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setShowSupportDrawer(false)} />
          <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
            <div className={`w-screen max-w-md transform transition-transform duration-300 ease-in-out ${showSupportDrawer && selectedTicket ? "translate-x-0" : "translate-x-full"} bg-white shadow-2xl flex flex-col h-full`}>
              {/* Header */}
              <div className="px-6 py-5 border-b border-[#F5F2FC] flex items-center justify-between bg-gradient-to-r from-[#EDE9FE] via-[#DDD6FE] to-[#7C3AED]">
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-extrabold text-[#5B3FD6] tracking-wider">Support Ticket Chat</span>
                  <h3 className="text-sm font-black text-[#2B2340] truncate flex items-center gap-1.5 mt-0.5">
                    <MessageCircle className="h-4.5 w-4.5 text-[#5B3FD6] shrink-0" />
                    {selectedTicket?.id}: {selectedTicket?.topic}
                  </h3>
                </div>
                <button onClick={() => setShowSupportDrawer(false)} className="text-[#5B3FD6] hover:text-[#4C32C7] transition cursor-pointer bg-transparent border-0 p-1">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
                {selectedTicket && (ticketConversations[selectedTicket.id] || []).map((msg, idx) => {
                  const isAgent = msg.sender === "agent";
                  const isSystem = msg.sender === "system";
                  
                  if (isSystem) {
                    return (
                      <div key={idx} className="flex justify-center my-2">
                        <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-[10px] font-semibold shadow-sm max-w-[90%] text-center">
                          ⚠️ {msg.text}
                        </span>
                      </div>
                    );
                  }
                  
                  return (
                    <div key={idx} className={`flex flex-col ${isAgent ? "items-end" : "items-start"}`}>
                      <div className={`max-w-[85%] rounded-2xl p-3 shadow-sm text-xs leading-relaxed ${
                        isAgent 
                          ? "bg-[#5B3FD6] text-white rounded-tr-none" 
                          : "bg-white border border-[#EDE9FE] text-[#2B2340] rounded-tl-none"
                      }`}>
                        <p>{msg.text}</p>
                      </div>
                      <span className="text-[9px] text-[#8E8AA2] font-semibold mt-1 px-1">{msg.date}</span>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-[#F5F2FC] bg-white">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!supportMessage.trim()) return;
                    
                    const newMsg = {
                      sender: "agent",
                      text: supportMessage.trim(),
                      date: "Just now"
                    };
                    
                    setTicketConversations({
                      ...ticketConversations,
                      [selectedTicket.id]: [...(ticketConversations[selectedTicket.id] || []), newMsg]
                    });
                    
                    setSupportMessage("");
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    placeholder="Type a response to the customer..."
                    className="flex-1 rounded-xl border border-[#EDE9FE] bg-[#FAF8FE] px-4 py-2.5 text-xs font-semibold text-[#2B2340] placeholder:text-[#C4B5FD] outline-none focus:border-[#5B3FD6] transition"
                  />
                  <button 
                    type="submit"
                    className="flex h-9.5 w-9.5 items-center justify-center rounded-xl bg-[#5B3FD6] hover:bg-[#4C32C7] text-white transition shadow-sm border-0 cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  } catch (error) {
    return (
      <div className="p-10 text-rose-600 bg-rose-50 border border-rose-200 rounded-xl font-mono text-xs max-w-2xl mx-auto my-10">
        <h2 className="text-base font-bold mb-2">Render Error in CustomerDetails</h2>
        <pre>{error.stack || error.message || String(error)}</pre>
      </div>
    );
  }
};

export default CustomerDetails;