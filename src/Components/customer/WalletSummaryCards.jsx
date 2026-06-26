import { Coins, ArrowDownLeft, Gift } from "lucide-react";

/**
 * Wallet summary cards matching the Customer 360 design pattern.
 *
 * Props:
 *   currentBalance  – number  (default 0)
 *   totalEarned     – number  (default 0)
 *   totalRedeemed   – number  (default 0)
 *   loading         – boolean (shows skeleton state)
 */
const WalletSummaryCards = ({
  currentBalance = 0,
  totalEarned = 0,
  totalRedeemed = 0,
  loading = false,
}) => {
  const cards = [
    {
      label: "Current Balance",
      value: currentBalance,
      suffix: "pts",
      icon: Coins,
      bg: "bg-[#F3E8FF]",
      border: "border-[#D8B4FE]",
      iconBg: "bg-[#7C3AED]",
      valueCl: "text-[#5B3FD6]",
      labelCl: "text-[#7C3AED]",
      hoverIconBg: "group-hover:bg-[#6D28D9]",
    },
    {
      label: "Total Earned",
      value: totalEarned,
      suffix: "pts",
      icon: ArrowDownLeft,
      bg: "bg-[#D1FAE5]",
      border: "border-[#A7F3D0]",
      iconBg: "bg-[#059669]",
      valueCl: "text-[#059669]",
      labelCl: "text-[#047857]",
      hoverIconBg: "group-hover:bg-[#047857]",
    },
    {
      label: "Total Redeemed",
      value: totalRedeemed,
      suffix: "pts",
      icon: Gift,
      bg: "bg-[#FFE4E6]",
      border: "border-[#FECDD3]",
      iconBg: "bg-[#E11D48]",
      valueCl: "text-[#E11D48]",
      labelCl: "text-[#BE123C]",
      hoverIconBg: "group-hover:bg-[#BE123C]",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white border border-[#EDE9FE] rounded-2xl p-5 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#F0EDF8]" />
              <div className="space-y-2 flex-1">
                <div className="h-3 w-24 rounded bg-[#F0EDF8]" />
                <div className="h-6 w-32 rounded bg-[#E5DEED]" />
              </div>
            </div>
            <div className="h-3 w-20 rounded bg-[#F0EDF8]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;            const formattedValue = (card.value ?? 0).toLocaleString();

        return (
          <div
            key={card.label}
            className={`
              ${card.bg} ${card.border} border
              rounded-2xl p-5
              flex flex-col
              transition-all duration-200
              hover:-translate-y-0.5 hover:shadow-md
              group
              relative overflow-hidden
            `}
          >
            {/* Decorative background icon */}
            <div className="absolute top-2 right-2 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity">
              <Icon className="h-14 w-14" />
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div
                className={`
                  w-12 h-12 rounded-xl ${card.iconBg}
                  flex items-center justify-center
                  shadow-sm transition-colors ${card.hoverIconBg}
                  shrink-0
                `}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span
                className={`text-[10px] font-extrabold uppercase tracking-wider ${card.labelCl}`}
              >
                {card.label}
              </span>
            </div>

            <p
              className={`text-2xl font-black leading-tight ${card.valueCl} mt-1`}
            >
              {formattedValue}
              <span className="text-sm font-bold ml-1 opacity-70">
                {card.suffix}
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default WalletSummaryCards;
