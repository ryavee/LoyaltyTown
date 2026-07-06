import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Edit,
  FileText,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  StickyNote,
  Tag,
  User,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
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
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
        isActive
          ? "bg-emerald-50 text-emerald-700"
          : "bg-[#F0EBF6] text-[#8E8AA2]"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-[#C4BAD9]"}`} />
      {isActive ? "Active" : "Inactive"}
    </span>
  );
};

// ── Info row inside a section ─────────────────────────────────────────────────
const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 rounded-xl bg-[#FAF8FE] px-4 py-3">
    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#8066DF]" />
    <div className="min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-wide text-[#9A93AA]">{label}</p>
      <p className="mt-0.5 break-words text-sm font-semibold text-[#2B2340]">
        {value || <span className="font-normal text-[#C4BAD9]">—</span>}
      </p>
    </div>
  </div>
);

// ── Section card ──────────────────────────────────────────────────────────────
const Section = ({ icon: Icon, title, children }) => (
  <div className="rounded-2xl border border-[#E7DFF2] bg-white p-5 shadow-[0_1px_3px_rgba(43,35,64,0.04)] sm:p-6">
    <div className="mb-4 flex items-center gap-3 border-b border-[#F0EBF6] pb-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEE8FF] text-[#5B3FD6]">
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="text-sm font-bold text-[#2B2340]">{title}</h3>
    </div>
    <div className="grid gap-3 sm:grid-cols-2">{children}</div>
  </div>
);

// ── Component ─────────────────────────────────────────────────────────────────

const DealerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dealer, setDealer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/dealers/${id}`)
      .then((res) => setDealer(res.data))
      .catch(() => toast.error("Failed to load dealer details."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-[#8066DF]" />
      </div>
    );
  }

  if (!dealer) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-rose-200 bg-rose-50 py-16 text-center">
        <p className="font-bold text-rose-700">Dealer not found</p>
        <button
          onClick={() => navigate("/dealers")}
          className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-bold text-white hover:bg-rose-700"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dealers
        </button>
      </div>
    );
  }

  const fullAddress = [
    dealer.addressLine1,
    dealer.addressLine2,
    dealer.city,
    dealer.state,
    dealer.country,
    dealer.pinCode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="mx-auto max-w-4xl space-y-5">

      {/* Header ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 rounded-2xl border border-[#E7DFF2] bg-white p-5 shadow-[0_1px_3px_rgba(43,35,64,0.04)] sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEE8FF] text-[#5B3FD6]">
            <Building2 className="h-7 w-7" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold text-[#2B2340]">{dealer.name}</h1>
              <StatusBadge value={dealer.status} />
            </div>
            {dealer.companyName && (
              <p className="mt-0.5 text-sm text-[#8E8AA2]">{dealer.companyName}</p>
            )}
            {dealer.dealerCode && (
              <span className="mt-1 inline-block rounded-lg bg-[#EEE8FF] px-2.5 py-0.5 font-mono text-xs font-bold text-[#5B3FD6]">
                {dealer.dealerCode}
              </span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/dealers")}
            className="inline-flex items-center gap-2 rounded-xl border border-[#DDD5EA] px-4 py-2 text-sm font-bold text-[#665C80] hover:bg-[#F8F5FC]"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <button
            onClick={() => navigate(`/dealers/${id}/edit`)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#5B3FD6] px-4 py-2 text-sm font-bold text-white hover:bg-[#4C32C7]"
          >
            <Edit className="h-4 w-4" /> Edit Dealer
          </button>
        </div>
      </div>

      {/* Basic Info ──────────────────────────────────────────────────────── */}
      <Section icon={Building2} title="Basic Information">
        <InfoRow icon={Tag}          label="Dealer Code"  value={dealer.dealerCode} />
        <InfoRow icon={Building2}    label="Company Name" value={dealer.companyName} />
        <InfoRow icon={ShieldCheck}  label="Dealer Type"  value={dealer.dealerType ? dealer.dealerType.charAt(0) + dealer.dealerType.slice(1).toLowerCase() : null} />
        <InfoRow icon={CalendarDays} label="Created On"   value={formatDate(dealer.createdAt)} />
      </Section>

      {/* Contact Info ────────────────────────────────────────────────────── */}
      <Section icon={Phone} title="Contact Information">
        <InfoRow icon={User}  label="Contact Person"  value={dealer.contactPerson} />
        <InfoRow icon={Phone} label="Mobile"          value={dealer.mobile} />
        <InfoRow icon={Mail}  label="Email"            value={dealer.email} />
        <InfoRow icon={Phone} label="Alternate Phone"  value={dealer.alternatePhone} />
      </Section>

      {/* Business & Compliance ───────────────────────────────────────────── */}
      <Section icon={FileText} title="Business & Compliance">
        <InfoRow icon={FileText} label="GST Number" value={dealer.gstNumber} />
        <InfoRow icon={FileText} label="PAN Number" value={dealer.panNumber} />
        <InfoRow icon={MapPin}   label="Region"     value={dealer.region} />
        <InfoRow icon={MapPin}   label="Territory"  value={dealer.territory} />
      </Section>

      {/* Address ─────────────────────────────────────────────────────────── */}
      <Section icon={MapPin} title="Address">
        <div className="sm:col-span-2">
          <InfoRow
            icon={MapPin}
            label="Full Address"
            value={fullAddress || null}
          />
        </div>
        <InfoRow icon={MapPin} label="City"     value={dealer.city} />
        <InfoRow icon={MapPin} label="State"    value={dealer.state} />
        <InfoRow icon={MapPin} label="Country"  value={dealer.country} />
        <InfoRow icon={MapPin} label="PIN Code" value={dealer.pinCode} />
      </Section>

      {/* Notes ───────────────────────────────────────────────────────────── */}
      {dealer.notes && (
        <div className="rounded-2xl border border-[#E7DFF2] bg-white p-5 shadow-[0_1px_3px_rgba(43,35,64,0.04)] sm:p-6">
          <div className="mb-4 flex items-center gap-3 border-b border-[#F0EBF6] pb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEE8FF] text-[#5B3FD6]">
              <StickyNote className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-[#2B2340]">Notes</h3>
          </div>
          <p className="rounded-xl bg-[#FAF8FE] px-4 py-3 text-sm text-[#665C80]">
            {dealer.notes}
          </p>
        </div>
      )}
    </div>
  );
};

export default DealerDetails;