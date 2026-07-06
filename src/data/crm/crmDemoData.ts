import { BadgeCheck, CalendarDays, CheckCircle2, CircleDollarSign, Target, TrendingDown, Trophy, UserCheck, UsersRound } from "lucide-react";

export const crmKpis = [
  { id: "total-leads", label: "Total Leads", value: 1840, target: "+18% QoQ", progress: 78, icon: Target },
  { id: "qualified", label: "Qualified Leads", value: 642, target: "35% qualified", progress: 64, icon: BadgeCheck },
  { id: "accounts", label: "Active Accounts", value: 428, target: "Enterprise accounts", progress: 72, icon: UsersRound },
  { id: "opps", label: "Open Opportunities", value: 126, target: "Active deals", progress: 69, icon: CircleDollarSign },
  { id: "pipeline", label: "Pipeline Value", value: "$4.8M", target: "+12% MoM", progress: 74, icon: CircleDollarSign },
  { id: "won", label: "Won Deals", value: 84, target: "This quarter", progress: 62, icon: Trophy },
  { id: "lost", label: "Lost Deals", value: 19, target: "Loss analysis", progress: 24, icon: TrendingDown },
  { id: "followups", label: "Pending Follow-ups", value: 76, target: "14 due today", progress: 36, icon: CheckCircle2 },
  { id: "meetings", label: "Meetings Today", value: 18, target: "Sales calendar", progress: 52, icon: CalendarDays },
  { id: "conversion", label: "Conversion Rate", value: "18.6%", target: "+2.4%", progress: 68, icon: UserCheck },
];

export const crmTrendData = [
  { month: "Jan", leads: 180, qualified: 58, pipeline: 1.8, won: 22 },
  { month: "Feb", leads: 224, qualified: 72, pipeline: 2.2, won: 28 },
  { month: "Mar", leads: 260, qualified: 94, pipeline: 2.8, won: 36 },
  { month: "Apr", leads: 318, qualified: 112, pipeline: 3.4, won: 48 },
  { month: "May", leads: 386, qualified: 146, pipeline: 4.1, won: 62 },
  { month: "Jun", leads: 442, qualified: 168, pipeline: 4.8, won: 84 },
];

export const crmInsights = [
  "Dealer referral leads convert 22% faster than landing-page leads this quarter.",
  "Negotiation-stage opportunities are concentrated in distributor wallet rollouts.",
  "Follow-ups older than seven days are mostly assigned to North and East regions.",
  "Warranty-led demos are improving contractor account conversion quality.",
];
