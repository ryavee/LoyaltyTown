import { Award, BadgeCheck, CreditCard, GraduationCap, Hammer, MapPin, WalletCards } from "lucide-react";
import { Timeline } from "../../../Components/enterprise";
import { cn, panelBase } from "../../../Components/enterprise/utils";
import type { CertificateRecord } from "../../../data/contractor/certificateDemoData";
import { contractorWalletSummary } from "../../../data/contractor/contractorWalletDemoData";
import type { ContractorRecord } from "../../../data/contractor/contractorDemoData";
import type { NearbyDealerRecord } from "../../../data/contractor/nearbyDealerDemoData";
import type { TrainingRecord } from "../../../data/contractor/trainingDemoData";
import { ContractorStatusBadge } from "./ContractorStatusBadge";

export const ContractorProfileCard = ({ contractor }: { contractor: ContractorRecord }) => (
  <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
    <div className={cn(panelBase, "p-4")}>
      <h2 className="text-sm font-semibold text-white">Contractor Profile</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {[
          ["Type", contractor.contractorType], ["Mobile", contractor.mobile], ["Email", contractor.email], ["City", contractor.city], ["State", contractor.state], ["Specialization", contractor.specialization], ["Experience", `${contractor.experienceYears} years`], ["License", contractor.licenseNumber], ["Dealer", contractor.assignedDealer], ["Distributor", contractor.assignedDistributor], ["Sales Executive", contractor.assignedSalesExecutive], ["Bank Details", contractor.bankDetails],
        ].map(([label, value]) => <div key={label} className="rounded-md border border-slate-800 bg-slate-900/70 p-3"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p><p className="mt-2 text-sm font-medium text-slate-200">{value}</p></div>)}
      </div>
    </div>
    <aside className={cn(panelBase, "p-4")}><Hammer className="h-8 w-8 text-cyan-300" /><h3 className="mt-4 text-lg font-semibold text-white">{contractor.contractorName}</h3><p className="mt-1 text-sm text-slate-500">{contractor.contractorCode} / {contractor.city}</p><div className="mt-4 flex flex-wrap gap-2"><ContractorStatusBadge status={contractor.status} /><ContractorStatusBadge status={contractor.kycStatus} /></div><div className="mt-4 space-y-3 text-sm"><p className="text-slate-500">Monthly Scans <strong className="block text-white">{contractor.monthlyScans}</strong></p><p className="text-slate-500">Wallet <strong className="block text-white">{contractor.walletBalance}</strong></p><p className="text-slate-500">Tier <strong className="block text-white">{contractor.tierStatus}</strong></p></div></aside>
  </section>
);

export const ContractorWalletCard = () => (
  <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">{[
    ["Points Earned", contractorWalletSummary.pointsEarned, WalletCards], ["Points Redeemed", contractorWalletSummary.pointsRedeemed, Award], ["Cashback Earned", contractorWalletSummary.cashbackEarned, CreditCard], ["Available Balance", contractorWalletSummary.availableBalance, WalletCards], ["Pending Payout", contractorWalletSummary.pendingPayout, CreditCard], ["Tier Status", contractorWalletSummary.tierStatus, BadgeCheck], ["Leaderboard Rank", contractorWalletSummary.leaderboardRank, Award],
  ].map(([label, value, Icon]) => <div key={label as string} className={cn(panelBase, "p-4")}><Icon className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p><p className="mt-2 text-xl font-semibold text-white">{value as string}</p></div>)}</section>
);

export const ContractorRewardCard = ({ title, detail, status }: { title: string; detail: string; status: string }) => (
  <article className={cn(panelBase, "p-4")}><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-white">{title}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></div><ContractorStatusBadge status={status} /></div></article>
);

export const TrainingCourseCard = ({ course }: { course: TrainingRecord }) => (
  <article className={cn(panelBase, "p-4")}><GraduationCap className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-sm font-semibold text-white">{course.courseName}</p><p className="mt-1 text-xs text-slate-500">{course.skillCategory} / {course.duration}</p><div className="mt-4 flex items-center justify-between"><ContractorStatusBadge status={course.completionStatus} /><span className="text-sm font-semibold text-white">{course.score}</span></div></article>
);

export const CertificateCard = ({ certificate }: { certificate: CertificateRecord }) => (
  <article className={cn(panelBase, "p-4")}><BadgeCheck className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-sm font-semibold text-white">{certificate.certificateId}</p><p className="mt-1 text-xs text-slate-500">{certificate.courseName}</p><p className="mt-3 text-xs text-slate-500">Expires {certificate.expiryDate}</p><div className="mt-3"><ContractorStatusBadge status={certificate.status} /></div></article>
);

export const NearbyDealerCard = ({ dealer }: { dealer: NearbyDealerRecord }) => (
  <article className={cn(panelBase, "p-4")}><div className="flex items-start justify-between gap-3"><div><MapPin className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-sm font-semibold text-white">{dealer.dealerName}</p><p className="mt-1 text-xs text-slate-500">{dealer.address}</p></div><ContractorStatusBadge status={dealer.status} /></div><div className="mt-4 grid grid-cols-2 gap-3 text-sm"><p className="text-slate-500">Distance <strong className="block text-white">{dealer.distance}</strong></p><p className="text-slate-500">Rating <strong className="block text-white">{dealer.rating}</strong></p></div><p className="mt-3 text-xs leading-5 text-slate-500">{dealer.availableProducts}</p></article>
);

export const ContractorTimeline = () => (
  <Timeline items={[
    { id: "ctl-1", title: "Project uploaded", description: "Site photos and product usage added.", timestamp: "Today", icon: Hammer, tone: "success" },
    { id: "ctl-2", title: "Reward claimed", description: "Scan-to-earn reward moved to review.", timestamp: "Yesterday", icon: Award, tone: "info" },
    { id: "ctl-3", title: "Certificate issued", description: "Premium application training completed.", timestamp: "Jul 03, 2026", icon: GraduationCap, tone: "info" },
  ]} />
);

export const ContractorAIInsightCard = ({ insight }: { insight: string }) => <div className="rounded-md border border-cyan-400/10 bg-cyan-400/10 p-3 text-sm leading-6 text-cyan-50/90">{insight}</div>;
