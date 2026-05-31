import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const DonutChart = ({
  data,
  centerLabel,
  centerSub,
  centerColor = "text-[#2B2340]",
  size = 150,
  innerRadius = 48,
  outerRadius = 70,
}) => (
  <div className="relative shrink-0" style={{ width: size, height: size }}>
    {centerLabel && (
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <span className={`text-[22px] font-bold leading-none ${centerColor}`}>{centerLabel}</span>
        {centerSub && (
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#8E8AA2] mt-1">
            {centerSub}
          </span>
        )}
      </div>
    )}
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={3}
          cornerRadius={6}
          stroke="transparent"
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "#fff",
            border: "1px solid #E9E2F3",
            borderRadius: 12,
          }}
          itemStyle={{ color: "#2B2340", fontSize: 12, fontWeight: 600 }}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default DonutChart;
