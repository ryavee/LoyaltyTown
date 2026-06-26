import { useMemo, useState, useEffect } from "react";
import { AlertTriangle, CheckCircle2, ScanLine, Loader } from "lucide-react";
import { SearchField, StatTile, StatusBadge, TableEmpty, TableShell } from "../Components/QR/QRUi";
import scanlogsService from "../services/scanlogs.service";
import ExportButton from "../Components/ExportButton";

const ScanLogs = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("All");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selected, setSelected] = useState(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = { q: search || undefined, result: result === 'All' ? undefined : result, page, limit: pageSize };
      const data = await scanlogsService.getScanLogs(params);
      // Expect { items: [], total }
      setLogs(Array.isArray(data) ? data : data.items ?? []);
      setTotal(data.total ?? (Array.isArray(data) ? data.length : 0));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, result, page, pageSize]);

  const filtered = useMemo(() => logs, [logs]);

  const columns = [
    { key: 'date', header: 'Date' },
    { key: 'qrCode', header: 'QR Code' },
    { key: 'product', header: 'Product' },
    { key: 'customer', header: 'Customer' },
    { key: 'location', header: 'Location' },
    { key: 'device', header: 'Device' },
    { key: 'result', header: 'Result' },
  ];

  const handleExport = async () => {
    try {
      const blob = await scanlogsService.exportScanCsv({ q: search || undefined, result: result === 'All' ? undefined : result });
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `scan-logs-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatTile icon={ScanLine} label="Total Scan Events" value={total} />
        <StatTile icon={CheckCircle2} label="Valid Scans" value={logs.filter((l) => l.result === "Valid").length} tone="green" />
        <StatTile icon={AlertTriangle} label="Flagged Attempts" value={logs.filter((l) => ["Duplicate", "Fake"].includes(l.result)).length} tone="amber" />
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-[#E7DFF2] bg-white p-3 sm:flex-row">
        <SearchField value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search QR, product, customer, or location..." />
        <select value={result} onChange={(event) => { setResult(event.target.value); setPage(1); }} className="rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] px-3.5 py-2.5 text-sm outline-none">
          {["All", "Valid", "Duplicate", "Fake", "Expired"].map((item) => <option key={item}>{item}</option>)}
        </select>

        <div className="ml-auto flex items-center gap-3">
          <ExportButton data={filtered} columns={columns} filename="scan-logs" customExport={handleExport} />
        </div>
      </div>

      <TableShell>
        {loading ? (
          <div className="p-8 text-center text-[#8E8AA2]"><Loader className="mx-auto" /></div>
        ) : (
          <table className="w-full min-w-[1100px] text-left">
            <thead className="border-b border-[#E7DFF2] bg-[#F7F4FB] text-[10px] font-bold uppercase tracking-wider text-[#8E8AA2]">
              <tr>{["Date", "QR Code", "Product", "Customer", "Location", "Device", "Result"].map((head) => <th key={head} className="px-4 py-3.5">{head}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-[#F0EBF6]">
              {filtered.length === 0 ? <TableEmpty message="No scan logs match the selected filters." /> : filtered.map((item) => (
                <tr key={item.id} className="text-sm hover:bg-[#FCFAFF] cursor-pointer" onClick={() => setSelected(item)}>
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
        )}
      </TableShell>

      {/* Details drawer */}
      {selected && (
        <div className="fixed right-0 top-0 h-full w-full lg:w-[480px] bg-white shadow-xl border-l z-50">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold">Scan Details</h3>
            <button onClick={() => setSelected(null)} className="text-sm text-[#8E8AA2]">Close</button>
          </div>
          <div className="p-4 space-y-3">
            <div><div className="text-xs text-[#8E8AA2]">QR Code</div><div className="font-medium">{selected.qrCode}</div></div>
            <div><div className="text-xs text-[#8E8AA2]">Product</div><div className="font-medium">{selected.product}</div></div>
            <div><div className="text-xs text-[#8E8AA2]">Customer</div><div className="font-medium">{selected.customer}</div></div>
            <div><div className="text-xs text-[#8E8AA2]">Location</div><div className="font-medium">{selected.location}</div></div>
            <div><div className="text-xs text-[#8E8AA2]">Device</div><div className="font-medium">{selected.device}</div></div>
            <div><div className="text-xs text-[#8E8AA2]">Result</div><div className="font-medium"><StatusBadge value={selected.result} /></div></div>
            <div><div className="text-xs text-[#8E8AA2]">Scanned At</div><div className="font-medium">{selected.date}</div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanLogs;
