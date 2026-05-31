import Card from "./Card";

const StatCard = ({ title, value, sub, chg, pos, icon: Icon, ibg, ic, bh = "" }) => (
  <Card className={`p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(91,63,214,0.05)] ${bh}`}>
    <div className="flex items-start justify-between">
      <p className="text-[9px] uppercase tracking-[0.14em] font-bold text-[#8E8AA2]">{title}</p>
      <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${ibg} ${ic}`}>
        <Icon className="h-4 w-4" />
      </span>
    </div>
    <p className="mt-2 text-[22px] font-bold text-[#2B2340] tracking-tight leading-none">{value}</p>
    <div className="mt-3 flex items-center gap-1.5">
      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${pos ? "bg-[#E2F5EC] text-[#22A861]" : "bg-rose-50 text-rose-600"}`}>
        {pos && "▲ "}{chg}
      </span>
      <span className="text-[10px] font-semibold text-[#8E8AA2]">{sub}</span>
    </div>
  </Card>
);

export default StatCard;
