import { useMemo, useState } from "react";
import { Download, Hash, QrCode } from "lucide-react";
import { toast } from "react-hot-toast";
import { initialQrCodes } from "../data/qrMockData";
import { SearchField, StatTile, StatusBadge, TableEmpty, TableShell } from "../Components/QR/QRUi";

const QRCodes = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const filtered = useMemo(() => initialQrCodes.filter((item) => {
    const query = search.toLowerCase().trim();
    const matches = !query || [item.code, item.serial, item.batch].some((value) => value.toLowerCase().includes(query));
    return matches && (status === "All" || item.status === status);
  }), [search, status]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatTile icon={QrCode} label="QR Codes" value={initialQrCodes.length} />
        <StatTile icon={Hash} label="Active" value={initialQrCodes.filter((item) => item.status === "Active").length} tone="green" />
        <StatTile icon={Hash} label="Scanned" value={initialQrCodes.filter((item) => item.status === "Scanned").length} tone="blue" />
      </div>
      <div className="flex flex-col gap-3 rounded-2xl border border-[#E7DFF2] bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <SearchField value={search} onChange={setSearch} placeholder="Search QR code, serial, or batch..." />
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] px-3.5 py-2.5 text-sm outline-none">
            {["All", "Active", "Scanned", "Expired", "Blocked"].map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <button onClick={() => toast.success("QR code export prepared with mock data")} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#DDD5EA] px-4 py-2.5 text-sm font-bold text-[#5B3FD6] hover:bg-[#F8F5FC]">
          <Download className="h-4 w-4" /> Export
        </button>
      </div>
      <TableShell>
        <table className="w-full min-w-[900px] text-left">
          <thead className="border-b border-[#E7DFF2] bg-[#F7F4FB] text-[10px] font-bold uppercase tracking-wider text-[#8E8AA2]">
            <tr>{["QR Code", "Serial Number", "Batch", "Status", "Scans", "Created Date"].map((head) => <th key={head} className="px-4 py-3.5">{head}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-[#F0EBF6]">
            {filtered.length === 0 ? <TableEmpty message="No QR codes match the selected filters." /> : filtered.map((item) => (
              <tr key={item.code} className="text-sm hover:bg-[#FCFAFF]">
                <td className="px-4 py-4"><span className="rounded-lg bg-[#EEE8FF] px-2.5 py-1.5 font-mono text-xs font-bold text-[#5B3FD6]">{item.code}</span></td>
                <td className="px-4 py-4 font-mono text-xs text-[#665C80]">{item.serial}</td>
                <td className="px-4 py-4"><p className="font-semibold text-[#2B2340]">{item.batch}</p><p className="mt-0.5 text-xs text-[#9A93AA]">{item.batchId}</p></td>
                <td className="px-4 py-4"><StatusBadge value={item.status} /></td>
                <td className="px-4 py-4 font-semibold text-[#2B2340]">{item.scans}</td>
                <td className="px-4 py-4 whitespace-nowrap text-[#665C80]">{item.createdDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableShell>
    </div>
  );
};

export default QRCodes;
