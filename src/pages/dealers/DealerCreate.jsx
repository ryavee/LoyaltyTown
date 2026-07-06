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
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

// ── Shared styles ─────────────────────────────────────────────────────────────
const fieldClass =
  "w-full rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] px-3.5 py-2.5 text-sm text-[#2B2340] outline-none transition focus:border-[#B8A6F3] focus:ring-2 focus:ring-[#EEE8FF] disabled:opacity-60";

// ── Section card ──────────────────────────────────────────────────────────────
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

// ── Inline field error ────────────────────────────────────────────────────────
const FieldError = ({ error }) =>
  error ? (
    <span className="mt-1 block text-xs text-rose-600">{error.message}</span>
  ) : null;

// ── Constants ─────────────────────────────────────────────────────────────────
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

// ── Component ─────────────────────────────────────────────────────────────────
const DealerCreate = () => {
  const navigate = useNavigate();
  const [dealerCode, setDealerCode] = useState("Generating…");

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

  // ── Fetch auto-generated dealer code on mount ──────────────────────────────
  useEffect(() => {
    api
      .get("/dealers/generate-code")
      .then((res) => setDealerCode(res.data?.dealerCode || "DLR-AUTO"))
      .catch(() => setDealerCode("DLR-AUTO"));
  }, []);

  // ── Submit ─────────────────────────────────────────────────────────────────
  const onSubmit = async (data) => {
    try {
      await api.post("/dealers", {
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
      toast.success("Dealer created successfully!");
      navigate("/dealers");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to create dealer."
      );
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-5">

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#2B2340]">Add Dealer</h1>
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

          {/* Dealer Name */}
          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">
              Dealer Name <span className="text-rose-500">*</span>
            </span>
            <input
              {...form.register("dealerName", { required: "Dealer name is required" })}
              placeholder="e.g. Raj Traders"
              className={fieldClass}
              disabled={isSubmitting}
            />
            <FieldError error={errors.dealerName} />
          </label>

          {/* Company Name */}
          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">
              Company Name <span className="text-rose-500">*</span>
            </span>
            <input
              {...form.register("companyName", { required: "Company name is required" })}
              placeholder="e.g. Raj Traders Pvt Ltd"
              className={fieldClass}
              disabled={isSubmitting}
            />
            <FieldError error={errors.companyName} />
          </label>

          {/* Dealer Code — read only */}
          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">
              Dealer Code (Auto Generated)
            </span>
            <input
              value={dealerCode}
              readOnly
              className={`${fieldClass} bg-[#F4F0FB] font-mono text-[#665C80]`}
            />
          </label>

          {/* Dealer Type */}
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

          {/* Status */}
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

          {/* Contact Person */}
          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Contact Person</span>
            <input
              {...form.register("contactPerson")}
              placeholder="e.g. Rajesh Kumar"
              className={fieldClass}
              disabled={isSubmitting}
            />
          </label>

          {/* Mobile */}
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
              placeholder="e.g. 9876543210"
              maxLength={10}
              className={fieldClass}
              disabled={isSubmitting}
            />
            <FieldError error={errors.mobile} />
          </label>

          {/* Email */}
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
              placeholder="e.g. dealer@example.com"
              className={fieldClass}
              disabled={isSubmitting}
            />
            <FieldError error={errors.email} />
          </label>

          {/* Alternate Phone */}
          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Alternate Phone</span>
            <input
              {...form.register("alternatePhone")}
              placeholder="e.g. 9123456780"
              maxLength={10}
              className={fieldClass}
              disabled={isSubmitting}
            />
          </label>
        </Section>

        {/* ── Business & Compliance ──────────────────────────────────────────── */}
        <Section icon={FileText} title="Business & Compliance">

          {/* GST Number */}
          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">GST Number</span>
            <input
              {...form.register("gstNumber", {
                pattern: {
                  value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                  message: "Enter a valid GST number (e.g. 29ABCDE1234F1Z5)",
                },
              })}
              placeholder="e.g. 29ABCDE1234F1Z5"
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

          {/* PAN Number */}
          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">PAN Number</span>
            <input
              {...form.register("panNumber", {
                pattern: {
                  value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                  message: "Enter a valid PAN (e.g. ABCDE1234F)",
                },
              })}
              placeholder="e.g. ABCDE1234F"
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

          {/* Region */}
          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Region</span>
            <input
              {...form.register("region")}
              placeholder="e.g. South India"
              className={fieldClass}
              disabled={isSubmitting}
            />
          </label>

          {/* Territory */}
          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Territory</span>
            <input
              {...form.register("territory")}
              placeholder="e.g. Tamil Nadu - Zone A"
              className={fieldClass}
              disabled={isSubmitting}
            />
          </label>
        </Section>

        {/* ── Address ───────────────────────────────────────────────────────── */}
        <Section icon={MapPin} title="Address">

          {/* Address Line 1 */}
          <label className="md:col-span-2">
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Address Line 1</span>
            <input
              {...form.register("addressLine1")}
              placeholder="Street / Building / Shop No."
              className={fieldClass}
              disabled={isSubmitting}
            />
          </label>

          {/* Address Line 2 */}
          <label className="md:col-span-2">
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Address Line 2</span>
            <input
              {...form.register("addressLine2")}
              placeholder="Landmark / Area (optional)"
              className={fieldClass}
              disabled={isSubmitting}
            />
          </label>

          {/* City */}
          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">City</span>
            <input
              {...form.register("city")}
              placeholder="e.g. Chennai"
              className={fieldClass}
              disabled={isSubmitting}
            />
          </label>

          {/* State */}
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

          {/* Country */}
          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Country</span>
            <input
              {...form.register("country")}
              placeholder="e.g. India"
              className={fieldClass}
              disabled={isSubmitting}
            />
          </label>

          {/* PIN Code */}
          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">PIN Code</span>
            <input
              {...form.register("pinCode", {
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Enter a valid 6-digit PIN code",
                },
              })}
              placeholder="e.g. 600001"
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
              placeholder="Any internal notes about this dealer…"
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
                Save Dealer
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DealerCreate;