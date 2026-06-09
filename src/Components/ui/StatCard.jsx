import Card from "./Card";

/**
 * Unified StatCard — one component for every page.
 *
 * VARIANTS
 * ─────────
 * variant="filter"   (Customers / Redemption clickable filter cards)
 *   Props: title, value, icon (component), bg, border, iconBg, valueCl, labelCl, sub, isActive, onClick
 *
 * variant="default"  (Dashboard stat cards with change indicator)
 *   Props: title, value, icon (component), ibg, ic, chg, pos, sub, bh
 *
 * variant="simple"   (Legacy simple card — backwards compat)
 *   Props: title, value, icon (node), color
 */
const StatCard = (props) => {
  const { variant = "default" } = props;

  /* ── FILTER variant (Customers / Redemption / any filterable page) ── */
  if (variant === "filter") {
    const {
      title,
      value,
      icon: Icon,
      bg = "bg-[#F3E8FF]",
      border = "border-[#DDD6FE]",
      iconBg = "bg-[#7C3AED]",
      valueCl = "text-[#5B3FD6]",
      labelCl = "text-[#7C3AED]",
      sub,
      isActive,
      onClick,
    } = props;

    return (
      <button
        onClick={onClick}
        className={`
          ${bg} border ${border}
          rounded-2xl px-4 py-3.5
          flex items-center gap-3
          transition-all duration-200
          hover:-translate-y-0.5 hover:shadow-md
          text-left w-full
          ${isActive ? "ring-2 ring-offset-1 ring-[#5B3FD6] shadow-md" : ""}
        `}
      >
        {Icon && (
          <div
            className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shadow-sm flex-shrink-0`}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className={`text-[10.5px] font-semibold uppercase tracking-wider ${labelCl}`}>
            {title}
          </p>
          <p className={`text-2xl font-black leading-tight ${valueCl}`}>{value}</p>
          {sub && (
            <p className={`text-[10px] font-medium ${labelCl} opacity-70 mt-0.5`}>{sub}</p>
          )}
        </div>
        {isActive && (
          <div className="flex-shrink-0">
            <div className={`w-2 h-2 rounded-full ${iconBg} animate-pulse`} />
          </div>
        )}
      </button>
    );
  }

  /* ── SIMPLE variant (legacy backwards compat) ── */
  if (variant === "simple") {
    const { title, value, icon, color } = props;
    return (
      <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex items-center justify-between hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-300">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h2 className="text-xl font-semibold">{value}</h2>
        </div>
        <div className={`p-3 rounded-lg text-white ${color}`}>{icon}</div>
      </div>
    );
  }

  /* ── DEFAULT variant (Dashboard) ── */
  const { title, value, icon: Icon, ibg, ic, chg, pos, sub, bh } = props;
  return (
    <Card
      className={`p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(91,63,214,0.05)] ${bh || ""}`}
    >
      <div className="flex items-start justify-between">
        <p className="text-[9px] uppercase tracking-[0.14em] font-bold text-[#8E8AA2]">
          {title}
        </p>
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-xl ${ibg} ${ic}`}
        >
          {Icon && <Icon className="h-4 w-4" />}
        </span>
      </div>
      <p className="mt-2 text-[22px] font-bold text-[#2B2340] tracking-tight leading-none">
        {value}
      </p>
      <div className="mt-3 flex items-center gap-1.5">
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
            pos ? "bg-[#E2F5EC] text-[#22A861]" : "bg-rose-50 text-rose-600"
          }`}
        >
          {pos && "▲ "}
          {chg}
        </span>
        <span className="text-[10px] font-semibold text-[#8E8AA2]">{sub}</span>
      </div>
    </Card>
  );
};

export default StatCard;
