import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Building2,
  FileText,
  Loader2,
  MapPin,
  Phone,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

const fieldClass =
  "w-full rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] px-3.5 py-2.5 text-sm text-[#2B2340] outline-none transition focus:border-[#B8A6F3] focus:ring-2 focus:ring-[#EEE8FF] disabled:opacity-60";

const Section = ({ icon: Icon, title, children }) => (
  <div className="rounded-2xl border border-[#E7DFF2] bg-white p-5 shadow-[0_1px_3px_rgba(43,35,64,0.04)] sm:p-6">
    <div className="mb-5 flex items-center gap-3 border-b border-[#F0EBF6] pb-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEE8FF] text-[#5B3FD6]">
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="text-sm font-bold text-[#2B2340]">{title}</h3>
    </div>
    <div className="grid gap-4 md:grid-cols-2">{children}</div>
  </div>
);

const FieldError = ({ error }) =>
  error ? (
    <span className="mt-1 block text-xs text-rose-600">{error.message}</span>
  ) : null;

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

const DEALER_TYPES = ["RETAILER", "WHOLESALER", "DISTRIBUTOR", "FRANCHISE", "OTHER"];

const DealerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true);
  const [dealerCode, setDealerCode] = useState("");

  const form = useForm({
    defaultValues: {
      dealerName: "",
      companyName: "",
      dealerType: "",
      status: "ACTIVE",
      contactPerson: "",
      mobile: "",
      email: "",
      alternatePhone: "",
      gstNumber: "",
      panNumber: "",
      region: "",
      territory: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "India",
      pinCode: "",
      notes: "",
    },
  });

  const { isSubmitting, errors } = form.formState;

  // ── Load dealer ────────────────────────────────────────────────────────────
  useEffect(() => {
    api
      .get(`/dealers/${id}`)
      .then((res) => {
        const d = res.data;
        setDealerCode(d.dealerCode || "");
        form.reset({
          dealerName: d.name || "",
          companyName: d.companyName || "",
          dealerType: d.dealerType || "",
          status: d.status || "ACTIVE",
          contactPerson: d.contactPerson || "",
          mobile: d.mobile || "",
          email: d.email || "",
          alternatePhone: d.alternatePhone || "",
          gstNumber: d.gstNumber || "",
          panNumber: d.panNumber || "",
          region: d.region || "",
          territory: d.territory || "",
          addressLine1: d.addressLine1 || "",
          addressLine2: d.addressLine2 || "",
          city: d.city || "",
          state: d.state || "",
          country: d.country || "India",
          pinCode: d.pinCode || "",
          notes: d.notes || "",
        });
      })
      .catch(() => toast.error("Failed to load dealer."))
      .finally(() => setPageLoading(false));
  }, [id]);

  // ── Submit ─────────────────────────────────────────────────────────────────
  const onSubmit = async (data) => {
    try {
      await api.put(`/dealers/${id}`, {
        name: data.dealerName.trim(),
        companyName: data.companyName.trim() || null,
        dealerType: data.dealerType || null,
        status: data.status,
        contactPerson: data.contactPerson.trim() || null,
        mobile: data.mobile.trim(),
        email: data.email.trim() || null,
        alternatePhone: data.alternatePhone.trim() || null,
        gstNumber: data.gstNumber.trim() || null,
        panNumber: data.panNumber.trim() || null,
        region: data.region.trim() || null,
        territory: data.territory.trim() || null,
        address: {
          line1: data.addressLine1.trim() || null,
          line2: data.addressLine2.trim() || null,
          city: data.city.trim() || null,
          state: data.state || null,
          country: data.country.trim() || "India",
          pinCode: data.pinCode.trim() || null,
        },
        notes: data.notes.trim() || null,
      });
      toast.success("Dealer updated successfully!");
      navigate("/dealers");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to update dealer."
      );
    }
  };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-[#8066DF]" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5">

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#2B2340]">Edit Dealer</h1>
          <p className="mt-0.5 text-sm text-[#8E8AA2]">
            Fields marked with <span className="text-rose-500">*</span> are required.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/dealers")}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E7DFF2] text-[#665C80] hover:bg-[#F7F4FB]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

        {/* ── Basic Information ──────────────────────────────────────────────── */}
        <Section icon={Building2} title="Basic Information">
          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">
              Dealer Name <span className="text-rose-500">*</span>
            </span>
            <input
              {...form.register("dealerName", { required: "Dealer name is required" })}
              className={fieldClass}
              disabled={isSubmitting}
            />
            <FieldError error={errors.dealerName} />
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">
              Company Name <span className="text-rose-500">*</span>
            </span>
            <input
              {...form.register("companyName", { required: "Company name is required" })}
              className={fieldClass}
              disabled={isSubmitting}
            />
            <FieldError error={errors.companyName} />
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">
              Dealer Code
            </span>
            <input
              value={dealerCode}
              readOnly
              className={`${fieldClass} bg-[#F4F0FB] font-mono text-[#665C80]`}
            />
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Dealer Type</span>
            <select
              {...form.register("dealerType")}
              className={fieldClass}
              disabled={isSubmitting}
            >
              <option value="">Select type</option>
              {DEALER_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0) + t.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Status</span>
            <select
              {...form.register("status")}
              className={fieldClass}
              disabled={isSubmitting}
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </label>
        </Section>

        {/* ── Contact Information ────────────────────────────────────────────── */}
        <Section icon={Phone} title="Contact Information">
          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Contact Person</span>
            <input
              {...form.register("contactPerson")}
              className={fieldClass}
              disabled={isSubmitting}
            />
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">
              Mobile Number <span className="text-rose-500">*</span>
            </span>
            <input
              {...form.register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit mobile number",
                },
              })}
              maxLength={10}
              className={fieldClass}
              disabled={isSubmitting}
            />
            <FieldError error={errors.mobile} />
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Email</span>
            <input
              type="email"
              {...form.register("email", {
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email address",
                },
              })}
              className={fieldClass}
              disabled={isSubmitting}
            />
            <FieldError error={errors.email} />
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Alternate Phone</span>
            <input
              {...form.register("alternatePhone")}
              maxLength={10}
              className={fieldClass}
              disabled={isSubmitting}
            />
          </label>
        </Section>

        {/* ── Business & Compliance ──────────────────────────────────────────── */}
        <Section icon={FileText} title="Business & Compliance">
          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">GST Number</span>
            <input
              {...form.register("gstNumber", {
                pattern: {
                  value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                  message: "Enter a valid GST number",
                },
              })}
              className={`${fieldClass} uppercase`}
              disabled={isSubmitting}
              onChange={(e) =>
                form.setValue("gstNumber", e.target.value.toUpperCase(), {
                  shouldValidate: true,
                })
              }
            />
            <FieldError error={errors.gstNumber} />
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">PAN Number</span>
            <input
              {...form.register("panNumber", {
                pattern: {
                  value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                  message: "Enter a valid PAN (e.g. ABCDE1234F)",
                },
              })}
              maxLength={10}
              className={`${fieldClass} uppercase`}
              disabled={isSubmitting}
              onChange={(e) =>
                form.setValue("panNumber", e.target.value.toUpperCase(), {
                  shouldValidate: true,
                })
              }
            />
            <FieldError error={errors.panNumber} />
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Region</span>
            <input
              {...form.register("region")}
              className={fieldClass}
              disabled={isSubmitting}
            />
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Territory</span>
            <input
              {...form.register("territory")}
              className={fieldClass}
              disabled={isSubmitting}
            />
          </label>
        </Section>

        {/* ── Address ───────────────────────────────────────────────────────── */}
        <Section icon={MapPin} title="Address">
          <label className="md:col-span-2">
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Address Line 1</span>
            <input
              {...form.register("addressLine1")}
              className={fieldClass}
              disabled={isSubmitting}
            />
          </label>

          <label className="md:col-span-2">
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Address Line 2</span>
            <input
              {...form.register("addressLine2")}
              className={fieldClass}
              disabled={isSubmitting}
            />
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">City</span>
            <input
              {...form.register("city")}
              className={fieldClass}
              disabled={isSubmitting}
            />
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">State</span>
            <select
              {...form.register("state")}
              className={fieldClass}
              disabled={isSubmitting}
            >
              <option value="">Select state</option>
              {STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Country</span>
            <input
              {...form.register("country")}
              className={fieldClass}
              disabled={isSubmitting}
            />
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">PIN Code</span>
            <input
              {...form.register("pinCode", {
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Enter a valid 6-digit PIN code",
                },
              })}
              maxLength={6}
              className={fieldClass}
              disabled={isSubmitting}
            />
            <FieldError error={errors.pinCode} />
          </label>
        </Section>

        {/* ── Notes ─────────────────────────────────────────────────────────── */}
        <Section icon={User} title="Additional Notes">
          <label className="md:col-span-2">
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">
              Notes{" "}
              <span className="font-normal text-[#9A93AA]">(Optional)</span>
            </span>
            <textarea
              {...form.register("notes")}
              rows={3}
              className={`${fieldClass} resize-none`}
              disabled={isSubmitting}
            />
          </label>
        </Section>

        {/* ── Actions ───────────────────────────────────────────────────────── */}
        <div className="flex flex-col-reverse gap-3 rounded-2xl border border-[#E7DFF2] bg-white p-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate("/dealers")}
            disabled={isSubmitting}
            className="rounded-xl border border-[#DDD5EA] px-6 py-2.5 text-sm font-bold text-[#665C80] transition hover:bg-[#F8F5FC] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5B3FD6] px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#4C32C7] disabled:bg-[#4C32C7]/70 min-w-[140px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Update Dealer
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DealerEdit;