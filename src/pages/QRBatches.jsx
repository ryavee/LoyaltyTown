import { useMemo, useState } from "react";
import { Download, Eye, Layers3, Plus, QrCode, ScanLine, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getMockQrBatches, saveMockQrBatches } from "../data/qrMockData";
import { SearchField, StatTile, StatusBadge, TableEmpty, TableShell } from "../Components/QR/QRUi";

const QRBatches = () => {
  const navigate = useNavigate();
  const [batches, setBatches] = useState(getMockQrBatches);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    return batches.filter((batch) => {
      const matchesSearch =
        !query ||
        [batch.id, batch.batchName, batch.product].some((value) =>
          value.toLowerCase().includes(query)
        );
      return matchesSearch && (status === "All" || batch.status === status);
    });
  }, [batches, search, status]);

  const removeBatch = (batch) => {
    if (!window.confirm(`Delete ${batch.batchName}?`)) return;
    const next = batches.filter((item) => item.id !== batch.id);
    setBatches(next);
    saveMockQrBatches(next);
    toast.success("Mock batch deleted");
  };

  const downloadBatch = (batch) => {
    const content = `Batch ID,Batch Name,Product,Quantity,Scanned,Status\n"${batch.id}","${batch.batchName}","${batch.product}",${batch.quantity},${batch.scanned},"${batch.status}"`;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([content], { type: "text/csv" }));
    link.download = `${batch.id}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    toast.success("Mock batch file downloaded");
  };

  const totalGenerated = batches.reduce((sum, item) => sum + item.generated, 0);
  const totalScanned = batches.reduce((sum, item) => sum + item.scanned, 0);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatTile icon={Layers3} label="Total Batches" value={batches.length} />
        <StatTile icon={QrCode} label="QR Codes Generated" value={totalGenerated.toLocaleString()} tone="blue" />
        <StatTile icon={ScanLine} label="Codes Scanned" value={totalScanned.toLocaleString()} tone="green" />
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-[#E7DFF2] bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <SearchField value={search} onChange={setSearch} placeholder="Search batch, ID, or product..." />
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] px-3.5 py-2.5 text-sm outline-none">
            <option>All</option>
            <option>Active</option>
            <option>Completed</option>
            <option>Draft</option>
          </select>
        </div>
        <button onClick={() => navigate("/qr-generation")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5B3FD6] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#4C32C7]">
          <Plus className="h-4 w-4" /> Generate QR
        </button>
      </div>

      <TableShell>
        <table className="w-full min-w-[1100px] text-left">
          <thead className="border-b border-[#E7DFF2] bg-[#F7F4FB] text-[10px] font-bold uppercase tracking-wider text-[#8E8AA2]">
            <tr>
              {["Batch ID", "Batch Name", "Product", "Quantity", "Generated", "Scanned", "Status", "Created Date", "Actions"].map((head) => (
                <th key={head} className="px-4 py-3.5">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0EBF6]">
            {filtered.length === 0 ? <TableEmpty message="No QR batches match the selected filters." /> : filtered.map((batch) => (
              <tr key={batch.id} className="text-sm hover:bg-[#FCFAFF]">
                <td className="px-4 py-4"><span className="rounded-lg bg-[#EEE8FF] px-2.5 py-1.5 font-mono text-xs font-bold text-[#5B3FD6]">{batch.id}</span></td>
                <td className="px-4 py-4 font-semibold text-[#2B2340]">{batch.batchName}</td>
                <td className="px-4 py-4 text-[#665C80]">{batch.product}</td>
                <td className="px-4 py-4 font-semibold text-[#2B2340]">{batch.quantity.toLocaleString()}</td>
                <td className="px-4 py-4 text-[#665C80]">{batch.generated.toLocaleString()}</td>
                <td className="px-4 py-4 text-[#665C80]">{batch.scanned.toLocaleString()}</td>
                <td className="px-4 py-4"><StatusBadge value={batch.status} /></td>
                <td className="px-4 py-4 whitespace-nowrap text-[#665C80]">{batch.createdDate}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1">
                    <button title="View" onClick={() => navigate(`/qr-batches/${batch.id}`)} className="rounded-lg p-2 text-[#5B3FD6] hover:bg-[#EEE8FF]"><Eye className="h-4 w-4" /></button>
                    <button title="Download" onClick={() => downloadBatch(batch)} className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50"><Download className="h-4 w-4" /></button>
                    <button title="Delete" onClick={() => removeBatch(batch)} className="rounded-lg p-2 text-rose-600 hover:bg-rose-50"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableShell>
    </div>
  );
};

export default QRBatches;
