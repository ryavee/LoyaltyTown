import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  ComposedChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { tooltipProps, axisTick, kFmt } from "./chartTheme";

const CustomerTrendChart = ({ trendData, chartTab, setChartTab, lifetimeSpend, totalEarned }) => {
  return (
    <div className="bg-white border border-[#EDE9FE] rounded-[24px] p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-xs uppercase font-extrabold text-[#8E8AA2] tracking-wider flex items-center gap-2">
            <span className="h-4 w-4 bg-[#F0EAFF] text-[#5B3FD6] rounded-md flex items-center justify-center font-bold">📈</span>
            Spending & Points Trends
          </h3>
          <p className="text-[11px] font-semibold text-[#8E8AA2] mt-0.5">Monthly analytics for current calendar year</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 rounded-lg bg-[#FAF9FD] p-1">
            {["Both", "Spending", "Points"].map((tab) => (
              <button
                key={tab}
                onClick={() => setChartTab(tab)}
                className={`rounded-md px-3 py-1 text-[10px] font-bold transition cursor-pointer border-0 ${
                  chartTab === tab
                    ? "bg-white text-[#5B3FD6] shadow-sm"
                    : "text-[#8E8AA2] hover:text-[#5B3FD6]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 border-b border-[#F5F2FC] pb-4 mb-4 text-xs">
        <div>
          <p className="text-[10px] text-[#8E8AA2] font-semibold">Total Spend</p>
          <p className="text-base font-black text-[#1E1B4B]">
            ₹{lifetimeSpend.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="h-8 w-px bg-[#E7DFF2]" />
        <div>
          <p className="text-[10px] text-[#8E8AA2] font-semibold">Avg / Month</p>
          <p className="text-base font-black text-[#1E1B4B]">
            ₹{(lifetimeSpend / 6).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="h-8 w-px bg-[#E7DFF2]" />
        <div>
          <p className="text-[10px] text-[#8E8AA2] font-semibold">Points Earned</p>
          <p className="text-base font-black text-[#1E1B4B]">{totalEarned.toLocaleString()} pts</p>
        </div>
      </div>

      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartTab === "Spending" ? (
            <BarChart data={trendData} margin={{ top: 10, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={axisTick} />
              <YAxis axisLine={false} tickLine={false} tick={axisTick} width={45} tickFormatter={(v) => `₹${kFmt(v)}`} />
              <Tooltip
                {...tooltipProps}
                formatter={(v) => [
                  v !== undefined && v !== null ? `₹${Number(v).toLocaleString()}` : "₹0",
                  "Spending",
                ]}
              />
              <Bar dataKey="spending" name="Spending (₹)" fill="#5B3FD6" radius={[4, 4, 0, 0]} barSize={18} />
            </BarChart>
          ) : chartTab === "Points" ? (
            <ComposedChart data={trendData} margin={{ top: 10, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={axisTick} />
              <YAxis axisLine={false} tickLine={false} tick={axisTick} width={40} tickFormatter={(v) => `${v} p`} />
              <Tooltip
                {...tooltipProps}
                formatter={(v) => [
                  v !== undefined && v !== null ? `${Number(v).toLocaleString()} pts` : "0 pts",
                  "Points Earned",
                ]}
              />
              <Line type="monotone" dataKey="points" name="Points Earned" stroke="#D97706" strokeWidth={2} dot={{ fill: "#D97706", r: 3 }} />
            </ComposedChart>
          ) : (
            <ComposedChart data={trendData} margin={{ top: 10, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={axisTick} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={axisTick} width={45} tickFormatter={(v) => `₹${kFmt(v)}`} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={axisTick} width={40} tickFormatter={(v) => `${v} p`} />
              <Tooltip
                {...tooltipProps}
                formatter={(value, name) => {
                  const valStr = value !== undefined && value !== null ? Number(value).toLocaleString() : "0";
                  if (name && String(name).includes("Spending")) {
                    return [`₹${valStr}`, "Spending (₹)"];
                  }
                  return [`${valStr} pts`, "Points Earned"];
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={44}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 10, fontWeight: 600, paddingTop: 5, paddingBottom: "16px" }}
              />
              <Bar yAxisId="left" dataKey="spending" name="Spending (₹)" fill="#5B3FD6" radius={[4, 4, 0, 0]} barSize={18} />
              <Line yAxisId="right" type="monotone" dataKey="points" name="Points Earned" stroke="#D97706" strokeWidth={2} dot={{ fill: "#D97706", r: 3 }} activeDot={{ r: 5 }} />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomerTrendChart;
