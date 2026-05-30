const Badge = ({ text, cls = "" }) => (
  <span
    className={`rounded-full px-2.5 py-1 text-[10px] font-bold shrink-0 ${cls}`}
  >
    {text}
  </span>
);

export default Badge;
