import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { CalendarDays, Hash, Loader2, Package, QrCode, Sparkles, Users } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  qrCampaigns,
  qrDealers,
  qrDistributors,
  getMockQrBatches,
} from "../data/qrMockData";
import api from "../services/api";

const fieldClass =
  "w-full rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] px-3.5 py-2.5 text-sm text-[#2B2340] outline-none transition focus:border-[#B8A6F3] focus:ring-2 focus:ring-[#EEE8FF]";

const QRGeneration = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("lt_user") || "{}");
  const companyId = user?.companyId || "";

  // ── Products state ──────────────────────────────────────────────
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null);

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      setProductsError(null);
      const res = await api.get("/products");
      const list = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
      setProducts(list);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to load products.";
      setProductsError(message);
      toast.error(message);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ── Form ────────────────────────────────────────────────────────
  const form = useForm({
    defaultValues: {
      batchName: "",
      productId: "",
      quantity: 0,
      dealerId: "",
      distributorId: "",
      campaignId: "",
      expiryDate: "",
      remarks: "",
      rewardPoints: "",
    },
  });

  const { isSubmitting } = form.formState;
  const values = useWatch({ control: form.control });

  const product = products.find((p) => (p.id ?? p._id) === values.productId);
  const dealer = qrDealers.find((item) => item.id === values.dealerId);
  const distributor = qrDistributors.find((item) => item.id === values.distributorId);
  const campaign = qrCampaigns.find((item) => item.id === values.campaignId);

  // ── Auto-fill rewardPoints from product.basePoints ──────────────
  useEffect(() => {
    if (product) {
      form.setValue("rewardPoints", product.basePoints ?? 0, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      form.setValue("rewardPoints", "");
    }
  }, [product?.id]);

  const batchId = useMemo(() => {
    const sequence = String(getMockQrBatches().length + 1).padStart(4, "0");
    const productCode = values.productId?.slice(-4).toUpperCase() || "----";
    return `LT-QR-${productCode}-${sequence}`;
  }, [values.productId]);

  // ── Submit ──────────────────────────────────────────────────────
  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.batchName.trim(),
        productId: data.productId,
        productName: product?.name || "",
        batchId: batchId,
        remarks: data.remarks?.trim() || "",
        companyId: companyId,
        quantity: Number(data.quantity),
        rewardPoints: Number(data.rewardPoints),
        ...(data.expiryDate && { expiryDate: data.expiryDate }),
      };

      await api.post("/qr/generate", payload);

      toast.success("QR batch generated successfully!");
      form.reset();
      navigate("/qr-batches");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to generate QR batch. Please try again.";
      toast.error(message);
    }
  };

  const previewRows = [
    ["Batch Name", values.batchName || "Not entered"],
    ["Product", product?.name || "Not selected"],
    ["Dealer", dealer?.name || "Open / unassigned"],
    ["Distributor", distributor?.name || "Open / unassigned"],
    ["Campaign", campaign?.name || "No campaign"],
    ["Number of QR Codes", Number(values.quantity || 0).toLocaleString()],
    ["Reward Points", values.rewardPoints !== "" ? Number(values.rewardPoints).toLocaleString() : "—"],
    ["Expiry Date", values.expiryDate || "No expiry"],
    ["Batch ID", batchId],
  ];

  // ── Product dropdown ────────────────────────────────────────────
  const renderProductSelect = () => {
    if (productsLoading) {
      return (
        <div className="flex items-center gap-2.5 rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] px-3.5 py-2.5">
          <Loader2 className="h-4 w-4 animate-spin text-[#8066DF]" />
          <span className="text-sm text-[#9A93AA]">Loading products…</span>
        </div>
      );
    }

    if (productsError) {
      return (
        <div className="flex items-center justify-between rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5">
          <span className="text-sm text-rose-600">Failed to load products</span>
          <button
            type="button"
            onClick={fetchProducts}
            className="text-xs font-bold text-[#5B3FD6] hover:underline"
          >
            Retry
          </button>
        </div>
      );
    }

    return (
      <select
        {...form.register("productId", { required: "Product is required" })}
        className={fieldClass}
        disabled={isSubmitting}
      >
        <option value="">
          {products.length === 0 ? "No products available" : "Select product"}
        </option>
        {products.map((item) => {
          const id = item.id ?? item._id;
          return (
            <option key={id} value={id}>
              {item.name} — {item.category} (SKU: {item.sku})
            </option>
          );
        })}
      </select>
    );
  };

  // ── Reward Points field ─────────────────────────────────────────
  const renderRewardPoints = () => {
    if (productsLoading) {
      return (
        <div className="flex items-center gap-2.5 rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] px-3.5 py-2.5">
          <Loader2 className="h-4 w-4 animate-spin text-[#8066DF]" />
          <span className="text-sm text-[#9A93AA]">Waiting for products…</span>
        </div>
      );
    }

    if (product) {
      return (
        <div className="relative">
          <input
            type="number"
            {...form.register("rewardPoints", {
              required: "Reward points is required",
              valueAsNumber: true,
              min: { value: 0, message: "Cannot be negative" },
            })}
            className={`${fieldClass} bg-[#F4F0FB] pr-28 font-semibold text-[#5B3FD6]`}
            disabled={isSubmitting}
          />
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md bg-[#EEE8FF] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#5B3FD6]">
            From product
          </span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] px-3.5 py-2.5">
        <Package className="h-4 w-4 text-[#C4BAD9]" />
        <span className="text-sm text-[#9A93AA]">Select a product first</span>
      </div>
    );
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(330px,0.65fr)]"
    >
      <section className="rounded-2xl border border-[#E7DFF2] bg-white p-5 shadow-[0_1px_3px_rgba(43,35,64,0.04)] sm:p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEE8FF] text-[#5B3FD6]">
            <QrCode className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#2B2340]">Create QR batch</h2>
            <p className="mt-0.5 text-xs text-[#8E8AA2]">Fields marked with * are required.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Batch Name */}
          <label className="md:col-span-2">
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Batch Name *</span>
            <input
              {...form.register("batchName", { required: "Batch name is required" })}
              placeholder="e.g. Summer Campaign - Chennai"
              className={fieldClass}
              disabled={isSubmitting}
            />
            {form.formState.errors.batchName && (
              <span className="mt-1 block text-xs text-rose-600">
                {form.formState.errors.batchName.message}
              </span>
            )}
          </label>

          {/* Product */}
          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Product *</span>
            {renderProductSelect()}
            {!productsLoading && !productsError && form.formState.errors.productId && (
              <span className="mt-1 block text-xs text-rose-600">
                {form.formState.errors.productId.message}
              </span>
            )}
          </label>

          {/* Quantity */}
          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Number of QR Codes *</span>
            <input
              type="number"
              min="1"
              {...form.register("quantity", {
                required: "Quantity is required",
                valueAsNumber: true,
                min: { value: 1, message: "Enter at least 1 code" },
              })}
              className={fieldClass}
              disabled={isSubmitting}
            />
            {form.formState.errors.quantity && (
              <span className="mt-1 block text-xs text-rose-600">
                {form.formState.errors.quantity.message}
              </span>
            )}
          </label>

          {/* Reward Points */}
          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">
              Reward Points *
              {product && (
                <span className="ml-2 font-normal text-[#9A93AA]">(auto-filled from product)</span>
              )}
            </span>
            {renderRewardPoints()}
            {form.formState.errors.rewardPoints && (
              <span className="mt-1 block text-xs text-rose-600">
                {form.formState.errors.rewardPoints.message}
              </span>
            )}
          </label>

          {/* Batch ID */}
          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Batch ID (Auto-generated)</span>
            <input
              value={batchId}
              readOnly
              className={`${fieldClass} bg-[#F4F0FB] font-mono text-[#665C80]`}
            />
          </label>

          {/* Hidden: Dealer */}
          <label className="hidden">
            <select {...form.register("dealerId")} className={fieldClass}>
              <option value="">Select dealer</option>
              {qrDealers.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </label>

          {/* Hidden: Distributor */}
          <label className="hidden">
            <select {...form.register("distributorId")} className={fieldClass}>
              <option value="">Select distributor</option>
              {qrDistributors.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </label>

          {/* Hidden: Campaign */}
          <label className="hidden">
            <select {...form.register("campaignId")} className={fieldClass}>
              <option value="">Select campaign</option>
              {qrCampaigns.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </label>

          {/* Expiry Date */}
          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Expiry Date</span>
            <div className="relative">
              <input
                type="date"
                {...form.register("expiryDate")}
                disabled={isSubmitting}
                className={`${fieldClass} ${!values.expiryDate ? "text-transparent" : ""}`}
              />
              {!values.expiryDate && (
                <span className="pointer-events-none absolute left-0 top-0 flex h-full items-center px-3.5 text-sm text-[#9A93AA]">
                  DD/MM/YYYY
                </span>
              )}
            </div>
          </label>

          {/* Remarks */}
          <label className="md:col-span-2">
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">
              Remarks <span className="font-normal text-[#9A93AA]">(Optional)</span>
            </span>
            <textarea
              {...form.register("remarks")}
              rows="3"
              placeholder="Internal notes about this batch"
              className={`${fieldClass} resize-none`}
              disabled={isSubmitting}
            />
          </label>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#F0EBF6] pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => form.reset()}
            disabled={isSubmitting}
            className="rounded-xl border border-[#DDD5EA] px-5 py-2.5 text-sm font-bold text-[#665C80] transition hover:bg-[#F8F5FC] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || productsLoading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5B3FD6] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#4C32C7] disabled:bg-[#4C32C7]/70 min-w-[150px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 text-white" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Batch
              </>
            )}
          </button>
        </div>
      </section>

      {/* Live Preview */}
      <aside className="h-fit rounded-2xl border border-[#DCD2F1] bg-gradient-to-br from-white to-[#F5F0FF] p-5 shadow-[0_10px_30px_rgba(91,63,214,0.08)] xl:sticky xl:top-0">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5B3FD6] text-white">
            <QrCode className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#2B2340]">Live Preview</h2>
            <p className="text-xs text-[#8E8AA2]">Updates while you type</p>
          </div>
        </div>
        <div className="space-y-2.5">
          {previewRows.map(([label, value], index) => {
            const icons = [Sparkles, Package, Users, Users, Sparkles, Hash, Sparkles, CalendarDays, QrCode];
            const Icon = icons[index];
            return (
              <div key={label} className="flex items-start gap-3 rounded-xl border border-white/80 bg-white/80 p-3">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#8066DF]" />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#9A93AA]">{label}</p>
                  <p className="mt-0.5 break-words text-sm font-semibold text-[#2B2340]">{value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </form>
  );
};

export default QRGeneration;