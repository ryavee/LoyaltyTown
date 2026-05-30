const ProgressBar = ({ label, value, pct, color }) => (
  <div>
    <div className="flex items-center justify-between mb-1">
      <span className="text-[12px] font-semibold text-[#8E8AA2]">{label}</span>
      <span className="text-[13px] font-bold text-[#2B2340]">{value}</span>
    </div>
    <div className="h-[6px] rounded-full bg-[#F0EDF8] overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  </div>
);

export default ProgressBar;
