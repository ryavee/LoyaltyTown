import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, ScanLine } from "lucide-react";
import { initialScanLogs } from "../data/qrMockData";
import { SearchField, StatTile, StatusBadge, TableEmpty, TableShell } from "../Components/QR/QRUi";

const ScanLogs = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("All");
  const filtered = useMemo(() => initialScanLogs.filter((item) => {
    const query = search.toLowerCase().trim();
    const matches = !query || [item.qrCode, item.product, item.customer, item.location].some((value) => value.toLowerCase().includes(query));
    return matches && (result === "All" || item.result === result);
  }), [result, search]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatTile icon={ScanLine} label="Total Scan Events" value={initialScanLogs.length} />
        <StatTile icon={CheckCircle2} label="Valid Scans" value={initialScanLogs.filter((item) => item.result === "Valid").length} tone="green" />
        <StatTile icon={AlertTriangle} label="Flagged Attempts" value={initialScanLogs.filter((item) => ["Duplicate", "Fake"].includes(item.result)).length} tone="amber" />
      </div>
      <div className="flex flex-col gap-3 rounded-2xl border border-[#E7DFF2] bg-white p-3 sm:flex-row">
        <SearchField value={search} onChange={setSearch} placeholder="Search QR, product, customer, or location..." />
        <select value={result} onChange={(event) => setResult(event.target.value)} className="rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] px-3.5 py-2.5 text-sm outline-none">
          {["All", "Valid", "Duplicate", "Fake", "Expired"].map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      <TableShell>
        <table className="w-full min-w-[1100px] text-left">
          <thead className="border-b border-[#E7DFF2] bg-[#F7F4FB] text-[10px] font-bold uppercase tracking-wider text-[#8E8AA2]">
            <tr>{["Date", "QR Code", "Product", "Customer", "Location", "Device", "Result"].map((head) => <th key={head} className="px-4 py-3.5">{head}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-[#F0EBF6]">
            {filtered.length === 0 ? <TableEmpty message="No scan logs match the selected filters." /> : filtered.map((item) => (
              <tr key={item.id} className="text-sm hover:bg-[#FCFAFF]">
                <td className="px-4 py-4 whitespace-nowrap text-[#665C80]">{item.date}</td>
                <td className="px-4 py-4"><span className="rounded-lg bg-[#EEE8FF] px-2.5 py-1.5 font-mono text-xs font-bold text-[#5B3FD6]">{item.qrCode}</span></td>
                <td className="px-4 py-4 font-semibold text-[#2B2340]">{item.product}</td>
                <td className="px-4 py-4 text-[#665C80]">{item.customer}</td>
                <td className="px-4 py-4 text-[#665C80]">{item.location}</td>
                <td className="px-4 py-4 text-xs text-[#665C80]">{item.device}</td>
                <td className="px-4 py-4"><StatusBadge value={item.result} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableShell>
    </div>
  );
};

export default ScanLogs;
