import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { CalendarDays, Hash, Package, QrCode, Sparkles, Users } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  addMockQrBatch,
  getMockQrBatches,
  qrCampaigns,
  qrDealers,
  qrDistributors,
  qrProducts,
} from "../data/qrMockData";

const fieldClass =
  "w-full rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] px-3.5 py-2.5 text-sm text-[#2B2340] outline-none transition focus:border-[#B8A6F3] focus:ring-2 focus:ring-[#EEE8FF]";

const QRGeneration = () => {
  const navigate = useNavigate();
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
    },
  });

  const values = useWatch({ control: form.control });
  const product = qrProducts.find((item) => item.id === values.productId);
  const dealer = qrDealers.find((item) => item.id === values.dealerId);
  const distributor = qrDistributors.find((item) => item.id === values.distributorId);
  const campaign = qrCampaigns.find((item) => item.id === values.campaignId);

  const batchId = useMemo(() => {
    const sequence = String(getMockQrBatches().length + 1).padStart(4, "0");
    const productCode = values.productId?.replace("PRD-", "") || "----";
    return `LT-QR-${productCode}-${sequence}`;
  }, [values.productId]);

  const onSubmit = (data) => {
    const now = new Date();
    const expiry = data.expiryDate
      ? new Date(`${data.expiryDate}T00:00:00`).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "No expiry";

    addMockQrBatch({
      id: batchId,
      batchName: data.batchName.trim(),
      productId: data.productId,
      product: product?.name || "Unknown product",
      dealer: dealer?.name || "—",
      distributor: distributor?.name || "—",
      campaign: campaign?.name || "—",
      quantity: Number(data.quantity),
      generated: Number(data.quantity),
      scanned: 0,
      expired: 0,
      status: "Active",
      createdDate: now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      expiryDate: expiry,
      remarks: data.remarks?.trim() || "—",
    });

    toast.success("QR batch generated in mock data");
    form.reset();
    navigate("/qr-batches");
  };

  const previewRows = [
    ["Batch Name", values.batchName || "Not entered"],
    ["Product", product?.name || "Not selected"],
    ["Dealer", dealer?.name || "Open / unassigned"],
    ["Distributor", distributor?.name || "Open / unassigned"],
    ["Campaign", campaign?.name || "No campaign"],
    ["Number of QR Codes", Number(values.quantity || 0).toLocaleString()],
    ["Expiry Date", values.expiryDate || "No expiry"],
    ["Batch ID", batchId],
  ];

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(330px,0.65fr)]">
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
          <label className="md:col-span-2">
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Batch Name *</span>
            <input
              {...form.register("batchName", { required: "Batch name is required" })}
              placeholder="e.g. Summer Campaign - Chennai"
              className={fieldClass}
            />
            {form.formState.errors.batchName && <span className="mt-1 block text-xs text-rose-600">{form.formState.errors.batchName.message}</span>}
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Product *</span>
            <select {...form.register("productId", { required: "Product is required" })} className={fieldClass}>
              <option value="">Select product</option>
              {qrProducts.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
            {form.formState.errors.productId && <span className="mt-1 block text-xs text-rose-600">{form.formState.errors.productId.message}</span>}
          </label>

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
            />
            {form.formState.errors.quantity && <span className="mt-1 block text-xs text-rose-600">{form.formState.errors.quantity.message}</span>}
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Batch ID (Auto-generated)</span>
            <input value={batchId} readOnly className={`${fieldClass} bg-[#F4F0FB] font-mono text-[#665C80]`} />
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Dealer <span className="font-normal text-[#9A93AA]">(Optional)</span></span>
            <select {...form.register("dealerId")} className={fieldClass}>
              <option value="">Select dealer</option>
              {qrDealers.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Distributor <span className="font-normal text-[#9A93AA]">(Optional)</span></span>
            <select {...form.register("distributorId")} className={fieldClass}>
              <option value="">Select distributor</option>
              {qrDistributors.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Campaign <span className="font-normal text-[#9A93AA]">(Optional)</span></span>
            <select {...form.register("campaignId")} className={fieldClass}>
              <option value="">Select campaign</option>
              {qrCampaigns.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Expiry Date</span>
            <input type="date" {...form.register("expiryDate")} className={fieldClass} />
          </label>

          <label className="md:col-span-2">
            <span className="mb-1.5 block text-xs font-bold text-[#4B4264]">Remarks <span className="font-normal text-[#9A93AA]">(Optional)</span></span>
            <textarea {...form.register("remarks")} rows="3" placeholder="Internal notes about this batch" className={`${fieldClass} resize-none`} />
          </label>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#F0EBF6] pt-5 sm:flex-row sm:justify-end">
          <button type="button" onClick={() => form.reset()} className="rounded-xl border border-[#DDD5EA] px-5 py-2.5 text-sm font-bold text-[#665C80] transition hover:bg-[#F8F5FC]">
            Cancel
          </button>
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5B3FD6] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#4C32C7]">
            <Sparkles className="h-4 w-4" />
            Generate Batch
          </button>
        </div>
      </section>

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
            const icons = [Sparkles, Package, Users, Users, Sparkles, Hash, CalendarDays, QrCode];
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
