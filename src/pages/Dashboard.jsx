import React from "react";
import { useOutletContext } from "react-router-dom";
import {
  QrCode,
  Users,
  Coins,
  AlertTriangle,
  TrendingUp,
  Clock,
  Activity,
  CheckCircle,
  Building2,
  MapPin,
  Loader2,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  Cell,
} from "recharts";

import Card from "../Components/ui/Card";
import Badge from "../Components/ui/Badge";
import StatCard from "../Components/ui/StatCard";
import DonutChart from "../Components/ui/DonutChart";
import ProgressBar from "../Components/ui/ProgressBar";
import { tooltipProps, axisTick, kFmt } from "../Components/ui/chartTheme";
import useDashboardData from "../hooks/useDashboardData";

/* Quick Insights - Static signals */
const insightsData = [
  { icon: CheckCircle,  ibg: "bg-[#E2F5EC]", ic: "text-[#22A861]", title: "KYC 100% cleared",        sub: "All 16 customers approved — 0 pending this month" },
  { icon: TrendingUp,   ibg: "bg-[#F0EAFF]", ic: "text-[#5B3FD6]", title: "Scan growth + 24.3%",      sub: "QR scans up this week across all dealer regions" },
  { icon: MapPin,       ibg: "bg-[#E0F2FE]", ic: "text-[#2E90C9]", title: "Tamil Nadu leads states",   sub: "Highest registrations with 13 customers this month" },
  { icon: AlertTriangle,ibg: "bg-[#FEE2E2]", ic: "text-[#EF4444]", title: "Fraud alerts: 2 new",       sub: "2 suspicious scan patterns flagged — review needed" },
  { icon: Building2,    ibg: "bg-[#CCFBF1]", ic: "text-[#0D9488]", title: "Carpenters top dealer",     sub: "35,816 QR scans — largest dealer by volume" },
];

const iconMap = {
  QrCode,
  Users,
  Coins,
  AlertTriangle,
  TrendingUp,
  Clock,
  Activity,
  CheckCircle,
  Building2,
  MapPin,
};

const getIcon = (key) => iconMap[key] || Activity;

const greyLabel = (v) => (
  <span style={{ color: "#8E8AA2", fontSize: 11, fontWeight: 600, marginLeft: 4 }}>{v}</span>
);

const Dashboard = () => {
  const { timeRange = "7D", searchQuery = "" } = useOutletContext() || {};

  const { data, loading, error } = useDashboardData(timeRange);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#5B3FD6]" />
          <p className="text-[12px] font-semibold text-[#8E8AA2]">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[80vh] items-center justify-center p-5">
        <div className="flex flex-col items-center gap-3 text-center max-w-sm">
          <AlertTriangle className="h-8 w-8 text-rose-500" />
          <p className="text-[14px] font-bold text-[#2B2340]">Failed to load dashboard data</p>
          <p className="text-[11px] font-semibold text-[#8E8AA2]">{error.message || "An unexpected error occurred"}</p>
        </div>
      </div>
    );
  }

  const {
    topHighlights = [],
    statCards = [],
    ytdStats = [],
    qrLifecycle = [],
    kycStatus = [],
    scanTrend = [],
    pointsTrend = [],
    customerScanReport = [],
    earnRedeemMonthly = [],
    stateRegistrations = [],
    dealerQR = [],
    topProducts = [],
    cityScanData = [],
    topScanners = [],
  } = data;

  // Filter products based on search query
  const filteredProducts = topProducts.filter(p =>
    p.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.pid.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter cities based on search query
  const filteredCities = cityScanData.filter(c =>
    c.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter scanners based on search query
  const filteredScanners = topScanners.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const kycFiltered = kycStatus.filter(d => d.value > 0);
  const approvedKycValue = kycStatus.find(d => d.name === "Approved")?.value || 0;

  return (
    <div className="space-y-5 pb-8 animate-fadeIn">
      {/* ── highlights strip ─────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-3 border-b border-[#E9E2F3]">
        {topHighlights.map((h, i) => {
          const HighlightIcon = getIcon(h.iconKey);
          return (
            <div key={i} className="flex items-center gap-1.5 text-[11px] font-semibold text-[#8E8AA2]">
              <HighlightIcon className={`h-3.5 w-3.5 ${h.ic}`} />
              <span>{h.label}</span>
              <span className="font-bold text-[#2B2340]">{h.value}</span>
              {h.delta && (
                <span className={`text-[10px] font-bold ${
                  h.delta === "new" ? "text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded" : "text-[#22A861]"
                }`}>
                  {h.delta !== "new" && "▲ "}{h.delta}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* ── ROW 1 — stat cards ───────────────────────────────────────── */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((c, i) => (
          <StatCard
            key={i}
            title={c.title}
            value={c.value}
            sub={c.sub}
            chg={c.chg}
            pos={c.pos}
            icon={getIcon(c.iconKey)}
            ibg={c.ibg}
            ic={c.ic}
            bh={c.bh}
          />
        ))}
      </div>

      {/* ── ROW 2 — Statistics of 2026 + QR Lifecycle + KYC Status ──── */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Statistics of 2026 ─────────────────────────────────────────── */}
        <Card className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-[15px] font-bold text-[#2B2340] leading-tight">Statistics of 2026</h3>
              <p className="text-[11px] font-semibold text-[#8E8AA2] mt-0.5">Platform-wide YTD summary</p>
            </div>
            <Badge text="YTD" cls="bg-[#F0EAFF] text-[#5B3FD6]" />
          </div>
          <div className="space-y-3.5">
            {ytdStats.map(s => (
              <ProgressBar
                key={s.label}
                label={s.label}
                value={s.value}
                pct={s.pct}
                color={s.color}
              />
            ))}
          </div>
        </Card>

        {/* QR Lifecycle Overview ──────────────────────────────────────── */}
        <Card className="p-5 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-[15px] font-bold text-[#2B2340] leading-tight">QR Lifecycle Overview</h3>
              <p className="text-[11px] font-semibold text-[#8E8AA2] mt-0.5">Status breakdown</p>
            </div>
            <span className="text-[10px] font-bold text-[#8E8AA2]">82.4K total</span>
          </div>
          <div className="flex-1 flex items-center justify-center gap-6">
            <DonutChart
              data={qrLifecycle}
              centerLabel="82.4K"
              centerSub="active QR"
            />
            <div className="flex flex-col gap-3.5">
              {qrLifecycle.map(d => (
                <div key={d.name} className="flex items-center justify-between gap-6">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background:d.color }} />
                    <span className="text-[12px] font-semibold text-[#8E8AA2]">{d.name}</span>
                  </div>
                  <span className="text-[13px] font-bold text-[#2B2340]">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* KYC Status Chart ──────────────────────────────────────────── */}
        <Card className="p-5 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-[15px] font-bold text-[#2B2340] leading-tight">KYC Status Chart</h3>
              <p className="text-[11px] font-semibold text-[#8E8AA2] mt-0.5">Customer verification status</p>
            </div>
            <Badge text="92% rate" cls="bg-[#E2F5EC] text-[#22A861]" />
          </div>
          <div className="flex-1 flex items-center justify-center gap-6">
            <DonutChart
              data={kycFiltered}
              centerLabel={`${approvedKycValue}`}
              centerSub="approved"
              centerColor="text-[#22A861]"
            />
            <div className="flex flex-col gap-3.5">
              {kycStatus.map(d => (
                <div key={d.name} className="flex items-center justify-between gap-6">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background:d.color }} />
                    <span className="text-[12px] font-semibold text-[#8E8AA2]">{d.name}</span>
                  </div>
                  <span className="text-[13px] font-bold text-[#2B2340]">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* ── ROW 3 — Daily QR Scans + Customer Scan Report ────────────── */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-[1.75fr_1fr]">
        {/* Daily QR Scans ─────────────────────────────────────────────── */}
        <Card className="p-5">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="text-[15px] font-bold text-[#2B2340] leading-tight">Daily QR Scans</h3>
              <p className="text-[11px] font-semibold text-[#8E8AA2] mt-0.5">Weekly scan performance — this week vs last week</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge text="860 today" cls="bg-[#E2F5EC] text-[#22A861]" />
              <Badge text="+24.3%" cls="bg-[#F0EAFF] text-[#5B3FD6]" />
            </div>
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scanTrend} margin={{ top:8, right:10, left:10, bottom:0 }}>
                <defs>
                  <linearGradient id="sgrd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#5B3FD6" stopOpacity={0.14} />
                    <stop offset="100%" stopColor="#5B3FD6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#EDE9F8" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={axisTick} />
                <YAxis axisLine={false} tickLine={false} tick={axisTick} tickFormatter={kFmt} width={45} domain={[0, 7000]} ticks={[0,1000,2000,3000,4000,5000,6000,7000]} />
                <Tooltip {...tooltipProps} />
                <Legend
                  verticalAlign="top" align="left"
                  iconType="circle" iconSize={8}
                  formatter={greyLabel}
                  wrapperStyle={{ paddingBottom:10, paddingTop:4 }}
                />
                <Area type="monotone" dataKey="tw" name="This week"
                  stroke="#5B3FD6" strokeWidth={2.5} fill="url(#sgrd)"
                  dot={{ fill:"#5B3FD6", stroke:"#fff", strokeWidth:2, r:4 }}
                  activeDot={{ r:6, strokeWidth:0 }}
                />
                <Area type="monotone" dataKey="lw" name="Last week"
                  stroke="#2DD4BF" strokeWidth={2} strokeDasharray="5 4" fill="none"
                  dot={{ fill:"#2DD4BF", stroke:"#fff", strokeWidth:2, r:3.5 }}
                  activeDot={{ r:5, strokeWidth:0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Customer Scan Report 2026 ─────────────────────────────────── */}
        <Card className="p-5">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="text-[15px] font-bold text-[#2B2340] leading-tight">Customer Scan Report 2026</h3>
              <p className="text-[11px] font-semibold text-[#8E8AA2] mt-0.5">Daily scans by date this month</p>
            </div>
            <Badge text="May 2026" cls="bg-[#E2F5EC] text-[#22A861]" />
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={customerScanReport} margin={{ top:14, right:10, left:10, bottom:0 }}>
                <CartesianGrid stroke="#EDE9F8" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={axisTick} interval={2} />
                <YAxis axisLine={false} tickLine={false} tick={axisTick} width={35} domain={[0, 40]} ticks={[0,5,10,15,20,25,30,35,40]} />
                <Tooltip {...tooltipProps} />
                <Line type="monotone" dataKey="s" name="Scans"
                  stroke="#5B3FD6" strokeWidth={2}
                  dot={{ fill:"#5B3FD6", stroke:"#fff", strokeWidth:2, r:3 }}
                  activeDot={{ r:5, strokeWidth:0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* ── ROW 4 — Points Earned vs Redeemed + Earn/Redeem By Month ── */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Points Earned vs Redeemed ──────────────────────────────────── */}
        <Card className="p-5">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="text-[15px] font-bold text-[#2B2340] leading-tight">Points Earned vs Redeemed</h3>
              <p className="text-[11px] font-semibold text-[#8E8AA2] mt-0.5">Weekly comparison — Tue to Mon</p>
            </div>
            <Badge text="+18.4% avg" cls="bg-[#F0EAFF] text-[#5B3FD6]" />
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pointsTrend} margin={{ top:8, right:10, left:10, bottom:0 }}>
                <defs>
                  <linearGradient id="egrd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#5B3FD6" stopOpacity={0.16} />
                    <stop offset="100%" stopColor="#5B3FD6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="rgrd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#22A861" stopOpacity={0.10} />
                    <stop offset="100%" stopColor="#22A861" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#EDE9F8" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={axisTick} />
                <YAxis axisLine={false} tickLine={false} tick={axisTick} width={45} domain={[0, 1000]} ticks={[0,200,400,600,800,1000]} />
                <Tooltip {...tooltipProps} formatter={(v) => `${v.toLocaleString()} pts`} />
                <Legend
                  verticalAlign="top" align="left"
                  iconType="circle" iconSize={8}
                  formatter={greyLabel}
                  wrapperStyle={{ paddingBottom:10, paddingTop:4 }}
                />
                <Area type="monotone" dataKey="earned" name="Earned"
                  stroke="#5B3FD6" strokeWidth={2.5} fill="url(#egrd)"
                  dot={{ fill:"#5B3FD6", stroke:"#fff", strokeWidth:2, r:4 }}
                  activeDot={{ r:6, strokeWidth:0 }}
                />
                <Area type="monotone" dataKey="redeemed" name="Redeemed"
                  stroke="#22A861" strokeWidth={2} strokeDasharray="5 4" fill="url(#rgrd)"
                  dot={{ fill:"#22A861", stroke:"#fff", strokeWidth:2, r:3.5 }}
                  activeDot={{ r:5, strokeWidth:0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Earn / Redeem Points By Month — 2026 ──────────────────────── */}
        <Card className="p-5">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="text-[15px] font-bold text-[#2B2340] leading-tight">Earn / Redeem Points By Month — 2026</h3>
              <p className="text-[11px] font-semibold text-[#8E8AA2] mt-0.5">Monthly loyalty points performance</p>
            </div>
            <Badge text="2026" cls="bg-[#F0EAFF] text-[#5B3FD6]" />
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earnRedeemMonthly} margin={{ top:8, right:10, left:10, bottom:0 }}>
                <CartesianGrid stroke="#EDE9F8" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={axisTick} />
                <YAxis axisLine={false} tickLine={false} tick={axisTick} tickFormatter={kFmt} width={45} domain={[0, 90000]} ticks={[0,10000,20000,30000,40000,50000,60000,70000,80000,90000]} />
                <Tooltip {...tooltipProps} formatter={(v) => `${v.toLocaleString()} pts`} />
                <Legend
                  verticalAlign="top" align="left"
                  iconType="circle" iconSize={8}
                  formatter={greyLabel}
                  wrapperStyle={{ paddingBottom:10, paddingTop:4 }}
                />
                <Bar dataKey="earned" name="Loyalty Points" fill="#5B3FD6" radius={[4,4,0,0]} barSize={16} />
                <Bar dataKey="redeemed" name="Redemption Points" fill="#22A861" radius={[4,4,0,0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* ── ROW 5 — Registrations by State + Dealer QR Statistics ───── */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Registrations by State ─────────────────────────────────────── */}
        <Card className="p-5">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="text-[15px] font-bold text-[#2B2340] leading-tight">Registrations by State</h3>
              <p className="text-[11px] font-semibold text-[#8E8AA2] mt-0.5">Customer registrations across Indian states</p>
            </div>
            <Badge text="India" cls="bg-[#E0F2FE] text-[#2E90C9]" />
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateRegistrations} margin={{ top:8, right:10, left:10, bottom:50 }}>
                <CartesianGrid stroke="#EDE9F8" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="state" axisLine={false} tickLine={false} tick={axisTick} angle={-40} textAnchor="end" height={60} interval={0} />
                <YAxis axisLine={false} tickLine={false} tick={axisTick} width={35} domain={[0, 14]} ticks={[0,2,4,6,8,10,12,14]} />
                <Tooltip {...tooltipProps} />
                <Bar dataKey="regs" name="Registrations" radius={[4,4,0,0]} barSize={22}>
                  {stateRegistrations.map((entry, index) => {
                    const colors = [
                      "#6E3DF2", // Tamil Nadu (13)
                      "#8357F5", // Karnataka (8)
                      "#956FF7", // Gujarat (6)
                      "#A788FA", // Kerala (5)
                      "#B9A0FC", // Rajasthan (4)
                      "#CBB9FD", // Maharashtra (3)
                      "#DDD1FE", // West Bengal (2)
                      "#E5DCFF", // Jharkhand (2)
                      "#F0EBFF", // Pondicherry (1)
                      "#FAF9FF", // Andhra P. (1)
                    ];
                    return <Cell key={`cell-${index}`} fill={colors[index] || "#6E3DF2"} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Dealer QR Statistics ──────────────────────────────────────── */}
        <Card className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-[15px] font-bold text-[#2B2340]">Dealer QR Statistics</h3>
                <p className="text-[11px] font-semibold text-[#8E8AA2] mt-0.5">QR scan count per dealer type</p>
              </div>
              <Badge text="Live" cls="bg-[#E2F5EC] text-[#22A861]" />
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#F0EDF8] text-[9px] uppercase tracking-[0.15em] font-bold text-[#8E8AA2]">
                  <th className="pb-2.5 pl-1">Dealer</th>
                  <th className="pb-2.5 text-right">Scans</th>
                  <th className="pb-2.5 pr-1 text-right">Contribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F2FC]">
                {dealerQR.map((d, i) => {
                  const totalScans = dealerQR.reduce((acc, curr) => acc + curr.scans, 0);
                  const pct = totalScans > 0 ? ((d.scans / totalScans) * 100).toFixed(1) : "0.0";
                  return (
                    <tr key={i} className="hover:bg-[#F8F7FC] transition-colors">
                      <td className="py-3 pl-1 text-[12px] font-bold text-[#2B2340] flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ background: i === 0 ? "#5B3FD6" : i === 1 ? "#7B61E8" : i === 2 ? "#2E90C9" : i === 3 ? "#22A861" : "#F59E0B" }} />
                        {d.dealer}
                      </td>
                      <td className="py-3 text-[13px] font-extrabold text-[#2B2340] text-right">{d.scans.toLocaleString()}</td>
                      <td className="py-3 pr-1 text-[12px] font-semibold text-[#8E8AA2] text-right">{pct}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* ── ROW 6 — Top Selling Products + City of Scan ────────────── */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-[1.75fr_1fr]">
        {/* Top Selling Products ──────────────────────────────────────── */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-[15px] font-bold text-[#2B2340]">Top Selling Products</h3>
              <p className="text-[11px] font-semibold text-[#8E8AA2] mt-0.5">By QR scan count this month</p>
            </div>
            <Badge text="Live insights" cls="bg-[#E2F5EC] text-[#22A861]" />
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#F0EDF8] text-[9px] uppercase tracking-[0.15em] font-bold text-[#8E8AA2]">
                <th className="pb-2.5 pl-1 w-8">#</th>
                <th className="pb-2.5">Product</th>
                <th className="pb-2.5">Product ID</th>
                <th className="pb-2.5">Category</th>
                <th className="pb-2.5 pr-1 text-right">Scan Count</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F2FC]">
              {filteredProducts.map(p => {
                const catColor =
                  p.cat === "18mm" ? "bg-[#E2F5EC] text-[#22A861]" :
                  p.cat === "12mm" ? "bg-[#E0F2FE] text-[#2E90C9]" :
                  p.cat === "6mm"  ? "bg-[#F0EAFF] text-[#5B3FD6]" :
                                     "bg-[#FEF3C7] text-[#D97706]";
                return (
                  <tr key={p.rank} className="hover:bg-[#F8F7FC] transition-colors">
                    <td className="py-2.5 pl-1">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F0EAFF] text-[10px] font-bold text-[#5B3FD6]">{p.rank}</span>
                    </td>
                    <td className="py-2.5 text-[12px] font-bold text-[#2B2340]">{p.product}</td>
                    <td className="py-2.5 text-[11px] font-semibold text-[#8E8AA2]">{p.pid}</td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${catColor}`}>{p.cat}</span>
                    </td>
                    <td className="py-2.5 pr-1 text-right text-[13px] font-extrabold text-[#2B2340]">{p.scans}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

        {/* City of Scan ──────────────────────────────────────────────── */}
        <Card className="p-5">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-[15px] font-bold text-[#2B2340]">City of Scan</h3>
              <p className="text-[11px] font-semibold text-[#8E8AA2] mt-0.5">Points distributed by city</p>
            </div>
            <Badge text="All India" cls="bg-[#E0F2FE] text-[#2E90C9]" />
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#F0EDF8] text-[9px] uppercase tracking-[0.15em] font-bold text-[#8E8AA2]">
                <th className="pb-2.5 pl-1">City / Region</th>
                <th className="pb-2.5 text-right">Points</th>
                <th className="pb-2.5 pr-1 text-right">Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F2FC]">
              {filteredCities.map((c, i) => (
                <tr key={i} className="hover:bg-[#F8F7FC] transition-colors">
                  <td className="py-3 pl-1 text-[12px] font-bold text-[#2B2340] flex flex-col">
                    <span>{c.city}</span>
                  </td>
                  <td className="py-3 text-[13px] font-extrabold text-right" style={{ color: c.color }}>{c.pts} pts</td>
                  <td className="py-3 pr-1 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-bold text-[#8E8AA2]">{c.pct}%</span>
                      <div className="w-16 h-1.5 rounded-full bg-[#F0EDF8] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: c.color }} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* ── ROW 7 — Top Scanners + Quick Insights ────────────────────── */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-[1.75fr_1fr]">
        {/* Top Scanners ──────────────────────────────────────────────── */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-[15px] font-bold text-[#2B2340]">Top Scanners</h3>
              <p className="text-[11px] font-semibold text-[#8E8AA2] mt-0.5">Highest loyalty earners this month</p>
            </div>
            <Badge text="Leaderboard" cls="bg-[#FEF3C7] text-[#D97706]" />
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#F0EDF8] text-[9px] uppercase tracking-[0.15em] font-bold text-[#8E8AA2]">
                <th className="pb-2.5 pl-1 w-8">#</th>
                <th className="pb-2.5">User</th>
                <th className="pb-2.5">City</th>
                <th className="pb-2.5">State</th>
                <th className="pb-2.5 pr-1 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F2FC]">
              {filteredScanners.map(s => (
                <tr key={s.rank} className="hover:bg-[#F8F7FC] transition-colors">
                  <td className="py-2.5 pl-1">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F0EAFF] text-[10px] font-bold text-[#5B3FD6]">{s.rank}</span>
                  </td>
                  <td className="py-2.5 text-[12px] font-bold text-[#2B2340]">{s.name}</td>
                  <td className="py-2.5 text-[11px] font-semibold text-[#8E8AA2]">{s.city}</td>
                  <td className="py-2.5 text-[11px] font-semibold text-[#8E8AA2]">{s.state}</td>
                  <td className="py-2.5 pr-1 text-right text-[13px] font-extrabold text-[#5B3FD6]">{s.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Quick Insights ─────────────────────────────────────────────── */}
        <Card className="p-5">
          <h3 className="text-[15px] font-bold text-[#2B2340]">Quick Insights</h3>
          <p className="text-[11px] font-semibold text-[#8E8AA2] mt-0.5 mb-4">Auto-detected platform signals</p>
          <div className="space-y-3">
            {insightsData.map((k, i) => {
              const InsightIcon = k.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAFAFE] border border-[#F0EDF8] hover:bg-[#F5F2FC] transition-colors">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${k.ibg} ${k.ic}`}>
                    <InsightIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[12px] font-bold text-[#2B2340]">{k.title}</p>
                    <p className="text-[10px] font-semibold text-[#8E8AA2] mt-0.5">{k.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* ── footer ─────────────────────────────────────────────────── */}
      <p className="text-[10px] text-[#8E8AA2] font-semibold text-center mt-4">
        Analytics auto-refreshed every hour • Powered by LoyaltyTown Engine
      </p>
    </div>
  );
};

export default Dashboard;
