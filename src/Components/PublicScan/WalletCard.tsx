import type { LucideIcon } from "lucide-react";

type WalletCardProps = {
  label: string;
  value: number;
  icon: LucideIcon;
  tone?: "violet" | "green" | "amber";
};

const WalletCard = ({ label, value, icon: Icon, tone = "violet" }: WalletCardProps) => {
  const tones = {
    violet: "bg-[#EEE8FF] text-[#5B3FD6]",
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="rounded-2xl border border-[#E8E1F1] bg-white p-4 shadow-sm">
      <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${tones[tone]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="mt-4 text-[11px] font-bold uppercase tracking-wide text-[#9188A4]">{label}</p>
      <p className="mt-1 text-2xl font-black text-[#29213D]">{value}</p>
      <p className="text-xs font-semibold text-[#9188A4]">Points</p>
    </div>
  );
};

export default WalletCard;
