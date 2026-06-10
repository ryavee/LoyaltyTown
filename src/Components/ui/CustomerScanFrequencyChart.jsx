import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { tooltipProps, axisTick } from "./chartTheme";

const CustomerScanFrequencyChart = ({ scanFrequencyData }) => {
  return (
    <div className="bg-white border border-[#EDE9FE] rounded-[24px] p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-[#FAF9FD] pb-3">
        <h3 className="text-xs uppercase font-extrabold text-[#8E8AA2] tracking-wider flex items-center gap-2">
          <span className="h-4 w-4 bg-[#F0EAFF] text-[#5B3FD6] rounded-md flex items-center justify-center font-bold">📊</span>
          Scan Frequency Trend
        </h3>
        <span className="text-[10px] text-[#8E8AA2] font-semibold">Weekly Scan Counts</span>
      </div>
      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={scanFrequencyData} margin={{ top: 10, right: 10, left: -5, bottom: 5 }}>
            <defs>
              <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5B3FD6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#5B3FD6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={axisTick} />
            <YAxis axisLine={false} tickLine={false} tick={axisTick} width={35} />
            <Tooltip {...tooltipProps} formatter={(v) => [`${v} scans`, "Scans"]} />
            <Area type="monotone" dataKey="scans" stroke="#5B3FD6" strokeWidth={2} fillOpacity={1} fill="url(#colorScans)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomerScanFrequencyChart;
