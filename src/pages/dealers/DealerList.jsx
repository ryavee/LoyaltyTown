import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Building2,
  Edit,
  Eye,
  Loader2,
  MapPin,
  Phone,
  Plus,
  RefreshCw,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

// ── Helpers ───────────────────────────────────────────────────────────────────

const formatDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
};

const StatusBadge = ({ value }) => {
  const isActive = value === "ACTIVE";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${
        isActive
          ? "bg-emerald-50 text-emerald-700"
          : "bg-[#F0EBF6] text-[#8E8AA2]"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive ? "bg-emerald-500" : "bg-[#C4BAD9]"
        }`}
      />
      {isActive ? "Active" : "Inactive"}
    </span>
  );
};

const StatTile = ({ icon: Icon, label, value, tone = "purple" }) => {
  const tones = {
    purple: "bg-[#EEE8FF] text-[#5B3FD6]",
    green: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    red: "bg-rose-50 text-rose-600",
  };
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[#E7DFF2] bg-white p-4 shadow-[0_1px_3px_rgba(43,35,64,0.04)]">
      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tones[tone]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-[#8E8AA2]">{label}</p>
        <p className="mt-0.5 text-xl font-bold text-[#2B2340]">{value}</p>
      </div>
    </div>
  );
};

// ── Component ─────────────────────────────────────────────────────────────────

const DealerList = () => {
  const navigate = useNavigate();

  const [dealers, setDealers]           = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const fetchDealers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res  = await api.get("/dealers");
      const list = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
      setDealers(list);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to load dealers.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDealers(); }, [fetchDealers]);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const totalActive   = dealers.filter((d) => d.status === "ACTIVE").length;
  const totalInactive = dealers.filter((d) => d.status !== "ACTIVE").length;

  // ── Filter ────────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    return dealers.filter((d) => {
      const matchesSearch =
        !query ||
        [d.name, d.companyName, d.dealerCode, d.mobile, d.city, d.state, d.contactPerson]
          .filter(Boolean)
          .some((v) => v.toLowerCase().includes(query));

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" && d.status === "ACTIVE") ||
        (statusFilter === "Inactive" && d.status !== "ACTIVE");

      return matchesSearch && matchesStatus;
    });
  }, [dealers, search, statusFilter]);

  // ── Delete ────────────────────────────────────────────────────────────────
  const deleteDealer = async (dealer) => {
    if (!window.confirm(`Delete "${dealer.name}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/dealers/${dealer.id}`);
      setDealers((prev) => prev.filter((d) => d.id !== dealer.id));
      toast.success("Dealer deleted");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete dealer.");
    }
  };

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl bg-[#F0EBF6]" />
          ))}
        </div>
        <div className="rounded-2xl border border-[#E7DFF2] bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-[#8066DF]" />
            <span className="text-sm text-[#8E8AA2]">Loading dealers…</span>
          </div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-14 animate-pulse rounded-xl bg-[#F7F4FB]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-rose-200 bg-rose-50 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100">
          <Users className="h-6 w-6 text-rose-500" />
        </div>
        <div>
          <p className="font-bold text-rose-700">Failed to load dealers</p>
          <p className="mt-1 text-sm text-rose-500">{error}</p>
        </div>
        <button
          onClick={fetchDealers}
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
      <div className="grid gap-3 sm:grid-cols-3">
        <StatTile icon={Users}       label="Total Dealers"   value={dealers.length} />
        <StatTile icon={ShieldCheck} label="Active"          value={totalActive}   tone="green" />
        <StatTile icon={Building2}   label="Inactive"        value={totalInactive} tone="red" />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#E7DFF2] bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <svg className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9A93AA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, code, mobile, city…"
              className="w-full rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] py-2.5 pl-9 pr-3.5 text-sm text-[#2B2340] outline-none focus:border-[#B8A6F3] focus:ring-2 focus:ring-[#EEE8FF]"
            />
          </div>
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] px-3.5 py-2.5 text-sm outline-none"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchDealers}
            title="Refresh"
            className="rounded-xl border border-[#E7DFF2] p-2.5 text-[#665C80] hover:bg-[#F7F4FB]"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={() => navigate("/dealers/create")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5B3FD6] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#4C32C7]"
          >
            <Plus className="h-4 w-4" /> Add Dealer
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-[#E7DFF2] bg-white shadow-[0_1px_3px_rgba(43,35,64,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="border-b border-[#E7DFF2] bg-[#F7F4FB] text-[10px] font-bold uppercase tracking-wider text-[#8E8AA2]">
              <tr>
                {[
                  "Dealer Code",
                  "Dealer Name",
                  "Company",
                  "Type",
                  "Contact",
                  "Location",
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
                <tr>
                  <td colSpan={9} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0EBF6]">
                        <Users className="h-5 w-5 text-[#C4BAD9]" />
                      </div>
                      <p className="text-sm font-semibold text-[#8E8AA2]">No dealers found</p>
                      <p className="text-xs text-[#C4BAD9]">
                        {search || statusFilter !== "All"
                          ? "Try adjusting your search or filter"
                          : "Add your first dealer to get started"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((dealer) => (
                  <tr key={dealer.id} className="text-sm hover:bg-[#FCFAFF]">

                    {/* Dealer Code */}
                    <td className="px-4 py-4">
                      <span className="rounded-lg bg-[#EEE8FF] px-2.5 py-1.5 font-mono text-xs font-bold text-[#5B3FD6]">
                        {dealer.dealerCode || "—"}
                      </span>
                    </td>

                    {/* Dealer Name */}
                    <td className="px-4 py-4">
                      <p className="font-semibold text-[#2B2340]">{dealer.name}</p>
                      {dealer.contactPerson && (
                        <p className="text-[11px] text-[#9A93AA]">{dealer.contactPerson}</p>
                      )}
                    </td>

                    {/* Company */}
                    <td className="px-4 py-4 text-[#665C80]">
                      {dealer.companyName || "—"}
                    </td>

                    {/* Type */}
                    <td className="px-4 py-4">
                      {dealer.dealerType ? (
                        <span className="rounded-full bg-[#F0EBF6] px-2.5 py-0.5 text-xs font-bold text-[#665C80]">
                          {dealer.dealerType.charAt(0) + dealer.dealerType.slice(1).toLowerCase()}
                        </span>
                      ) : (
                        <span className="text-[#C4BAD9]">—</span>
                      )}
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-4">
                      {dealer.mobile ? (
                        <div className="flex items-center gap-1.5 text-[#665C80]">
                          <Phone className="h-3.5 w-3.5 text-[#9A93AA]" />
                          {dealer.mobile}
                        </div>
                      ) : (
                        <span className="text-[#C4BAD9]">—</span>
                      )}
                      {dealer.email && (
                        <p className="mt-0.5 text-[11px] text-[#9A93AA]">{dealer.email}</p>
                      )}
                    </td>

                    {/* Location */}
                    <td className="px-4 py-4">
                      {dealer.city || dealer.state ? (
                        <div className="flex items-center gap-1.5 text-[#665C80]">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#9A93AA]" />
                          <span>
                            {[dealer.city, dealer.state].filter(Boolean).join(", ")}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[#C4BAD9]">—</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <StatusBadge value={dealer.status} />
                    </td>

                    {/* Created */}
                    <td className="px-4 py-4 whitespace-nowrap text-[#665C80]">
                      {formatDate(dealer.createdAt)}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          title="View"
                          onClick={() => navigate(`/dealers/${dealer.id}`)}
                          className="rounded-lg p-2 text-[#5B3FD6] hover:bg-[#EEE8FF]"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          title="Edit"
                          onClick={() => navigate(`/dealers/${dealer.id}/edit`)}
                          className="rounded-lg p-2 text-amber-600 hover:bg-amber-50"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => deleteDealer(dealer)}
                          className="rounded-lg p-2 text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DealerList;