export const tooltipProps = {
  contentStyle: {
    background: "#fff",
    border: "1px solid #E9E2F3",
    borderRadius: 14,
    boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
    padding: "10px 14px",
  },
  itemStyle:  { color: "#2B2340", fontSize: 12, fontWeight: 600 },
  labelStyle: { color: "#8E8AA2", fontSize: 11, fontWeight: 700 },
};

export const axisTick = { fill: "#8E8AA2", fontSize: 11, fontWeight: 600 };

export const kFmt = (v) => {
  if (v === 0) return "0";
  if (v < 1000) return `${v}`;
  return `${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}K`;
};
