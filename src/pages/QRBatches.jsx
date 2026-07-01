import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Download,
  Eye,
  Layers3,
  Loader2,
  Plus,
  QrCode,
  RefreshCw,
  ScanLine,
  ShieldAlert,
  Trash2,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  SearchField,
  StatTile,
  StatusBadge,
  TableEmpty,
  TableShell,
} from "../Components/QR/QRUi";
import api from "../services/api";

// ── Helpers ───────────────────────────────────────────────────────────────────

const formatDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
};

const resolveStatus = (batch) => {
  if (batch.status === "COMPLETED") return "Completed";
  if (batch.expiryDate && new Date(batch.expiryDate) < new Date()) return "Expired";
  if (batch.status === "ACTIVE") return "Active";
  return batch.status;
};

// ── Component ─────────────────────────────────────────────────────────────────

const QRBatches = () => {
  const navigate = useNavigate();

  const [batches, setBatches]           = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const fetchBatches = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res  = await api.get("/qr/batches");
      const list = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
      setBatches(list);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to load QR batches.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBatches(); }, [fetchBatches]);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const totalCodes   = batches.reduce((s, b) => s + (b.totalCodes   ?? 0), 0);
  const totalScanned = batches.reduce((s, b) => s + (b.totalScanned ?? 0), 0);
  const totalFraud   = batches.reduce((s, b) => s + (b.fraudCount   ?? 0), 0);

  // ── Filter ────────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    return batches.filter((batch) => {
      const matchesSearch =
        !query ||
        [
          batch.batchId,
          batch.batchName,
          batch.name,
          batch.product?.name,
          batch.product?.sku,
          batch.dealerName,
        ]
          .filter(Boolean)
          .some((v) => v.toLowerCase().includes(query));

      const label = resolveStatus(batch);
      const matchesStatus = statusFilter === "All" || label === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [batches, search, statusFilter]);

  // ── Download ──────────────────────────────────────────────────────────────
  const downloadBatch = async (batch) => {
    try {
const res = await api.get(`/qr/batches/${batch.id}/download-pdf`, {
  responseType: "blob",
});
      const url  = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href     = url;
      link.download = `${batch.batchId || batch.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      toast.success("Downloading PDF…");
    } catch {
      toast.error("PDF download failed");
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const deleteBatch = async (batch) => {
    if (!window.confirm(`Delete "${batch.batchName}"?`)) return;
    try {
      await api.delete(`/qr/batches/${batch.id}`);
      setBatches((prev) => prev.filter((b) => b.id !== batch.id));
      toast.success("Batch deleted");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete batch.");
    }
  };

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-[#F0EBF6]" />
          ))}
        </div>
        <div className="rounded-2xl border border-[#E7DFF2] bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-[#8066DF]" />
            <span className="text-sm text-[#8E8AA2]">Loading QR batches…</span>
          </div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 animate-pulse rounded-xl bg-[#F7F4FB]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Error state ───────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-rose-200 bg-rose-50 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100">
          <QrCode className="h-6 w-6 text-rose-500" />
        </div>
        <div>
          <p className="font-bold text-rose-700">Failed to load batches</p>
          <p className="mt-1 text-sm text-rose-500">{error}</p>
        </div>
        <button
          onClick={fetchBatches}
          className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-bold text-white hover:bg-rose-700"
        >
          <RefreshCw className="h-4 w-4" /> Retry
        </button>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-5">

      {/* Stat tiles */}
      <div className="grid gap-3 sm:grid-cols-4">
        <StatTile icon={Layers3}     label="Total Batches"      value={batches.length} />
        <StatTile icon={QrCode}      label="QR Codes Generated" value={totalCodes.toLocaleString()}   tone="blue" />
        <StatTile icon={ScanLine}    label="Codes Scanned"      value={totalScanned.toLocaleString()} tone="green" />
        <StatTile icon={ShieldAlert} label="Fraud Detected"     value={totalFraud.toLocaleString()}   tone="red" />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#E7DFF2] bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <SearchField
            value={search}
            onChange={setSearch}
            placeholder="Search batch ID, name, product, SKU…"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] px-3.5 py-2.5 text-sm outline-none"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Expired">Expired</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchBatches}
            title="Refresh"
            className="rounded-xl border border-[#E7DFF2] p-2.5 text-[#665C80] hover:bg-[#F7F4FB]"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={() => navigate("/qr-generation")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5B3FD6] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#4C32C7]"
          >
            <Plus className="h-4 w-4" /> Generate QR
          </button>
        </div>
      </div>

      {/* Table */}
      <TableShell>
        <table className="w-full min-w-[1200px] text-left">
          <thead className="border-b border-[#E7DFF2] bg-[#F7F4FB] text-[10px] font-bold uppercase tracking-wider text-[#8E8AA2]">
            <tr>
              {[
                "Batch ID",
                "Batch Name",
                "Product",
                "Dealer",
                "Total Codes",
                "Scanned",
                "Scan Rate",
                "Fraud",
                "Reward Pts",
                "Expiry Date",
                "Status",
                "Created",
                "Actions",
              ].map((h) => (
                <th key={h} className="px-4 py-3.5 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0EBF6]">
            {filtered.length === 0 ? (
              <TableEmpty message="No QR batches match the selected filters." />
            ) : (
              filtered.map((batch) => {
                const statusLabel = resolveStatus(batch);
                const expired     = statusLabel === "Expired" || statusLabel === "Completed";

                return (
                  <tr key={batch.id} className="text-sm hover:bg-[#FCFAFF]">

                    {/* Batch ID */}
                    <td className="px-4 py-4">
                      <span className="rounded-lg bg-[#EEE8FF] px-2.5 py-1.5 font-mono text-xs font-bold text-[#5B3FD6]">
                        {batch.batchId}
                      </span>
                    </td>

                    {/* Batch Name */}
                    <td className="px-4 py-4 font-semibold text-[#2B2340]">
                      {batch.batchName || batch.name}
                    </td>

                    {/* Product */}
                    <td className="px-4 py-4">
                      {batch.product ? (
                        <div>
                          <p className="font-semibold text-[#2B2340]">{batch.product.name}</p>
                          <p className="text-[11px] text-[#9A93AA]">SKU: {batch.product.sku}</p>
                        </div>
                      ) : (
                        <span className="text-[#C4BAD9]">—</span>
                      )}
                    </td>

                    {/* Dealer */}
                    <td className="px-4 py-4 text-[#665C80]">
                      {batch.dealerName || "Direct"}
                    </td>

                    {/* Total Codes */}
                    <td className="px-4 py-4 font-semibold text-[#2B2340]">
                      {(batch.totalCodes ?? 0).toLocaleString()}
                    </td>

                    {/* Scanned */}
                    <td className="px-4 py-4 text-[#665C80]">
                      {(batch.totalScanned ?? 0).toLocaleString()}
                    </td>

                    {/* Scan Rate */}
                    <td className="px-4 py-4">
                      <span className="inline-block rounded-full bg-[#F0EBF6] px-2.5 py-0.5 text-xs font-bold text-[#665C80]">
                        {batch.scanRate ?? "0.0%"}
                      </span>
                    </td>

                    {/* Fraud */}
                    <td className="px-4 py-4">
                      {(batch.fraudCount ?? 0) > 0 ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-600">
                          <ShieldAlert className="h-3 w-3" />
                          {batch.fraudCount}
                        </span>
                      ) : (
                        <span className="text-[#C4BAD9]">—</span>
                      )}
                    </td>

                    {/* Reward Points */}
                    <td className="px-4 py-4 font-semibold text-[#5B3FD6]">
                      {(batch.rewardPoints ?? 0).toLocaleString()}
                    </td>

                    {/* Expiry Date */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={expired ? "font-semibold text-rose-500" : "text-[#665C80]"}>
                        {formatDate(batch.expiryDate)}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <StatusBadge value={statusLabel} />
                    </td>

                    {/* Created */}
                    <td className="px-4 py-4 whitespace-nowrap text-[#665C80]">
                      {formatDate(batch.createdAt)}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          title="View"
                          onClick={() => navigate(`/qr-batches/${batch.id}`)}
                          className="rounded-lg p-2 text-[#5B3FD6] hover:bg-[#EEE8FF]"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          title="Download PDF"
                          onClick={() => downloadBatch(batch)}
                          className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => deleteBatch(batch)}
                          className="rounded-lg p-2 text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </TableShell>
    </div>
  );
};

export default QRBatches;