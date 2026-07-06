import { CheckCircle2, Eye, Layers3, Package, QrCode, Settings2, Sparkles, Zap } from "lucide-react";
import { DashboardWidget, PrimaryButton, ReusableFormLayout, Select, Stepper, TextInput } from "../../../Components/enterprise";
import { QrPreview } from "./QrPreview";

const steps = [
  { id: "product", title: "Select Product", description: "Choose product", status: "complete" as const },
  { id: "sku", title: "Select SKU", description: "Choose SKU", status: "complete" as const },
  { id: "quantity", title: "Quantity", description: "Serial count", status: "complete" as const },
  { id: "config", title: "QR Configuration", description: "Type and serials" },
  { id: "batch", title: "Batch Information", description: "Batch metadata", status: "current" as const },
  { id: "preview", title: "Preview", description: "Inspect output" },
  { id: "generate", title: "Generate", description: "Create records" },
];

const qrTypes = ["Static", "Dynamic", "Secure", "GS1", "Serialized", "Parent Child"].map((value) => ({ label: value, value }));

export const QrGeneratorWizard = () => (
  <div className="space-y-5">
    <Stepper steps={steps} />
    <ReusableFormLayout title="QR Generation Wizard" description="Frontend-only wizard for product, SKU, quantity, QR configuration, batch information, preview, and generation." columns={3}>
      <Select label="Product" value="Industrial Adhesive Pro" onChange={() => undefined} options={[{ label: "Industrial Adhesive Pro", value: "Industrial Adhesive Pro" }]} />
      <Select label="SKU" value="ADH-PRO-20KG" onChange={() => undefined} options={[{ label: "ADH-PRO-20KG", value: "ADH-PRO-20KG" }]} />
      <TextInput label="Quantity" defaultValue="18,420" />
      <Select label="QR Type" value="Secure" onChange={() => undefined} options={qrTypes} />
      <TextInput label="Batch Name" defaultValue="Adhesive Pro July Batch" />
      <TextInput label="Batch Number" defaultValue="BCH-2026-001" />
      <TextInput label="Prefix" defaultValue="ADH" />
      <TextInput label="Serial Format" defaultValue="ADH-YYYY-######" />
      <TextInput label="Start Serial" defaultValue="ADH-2026-000001" />
      <TextInput label="End Serial" defaultValue="ADH-2026-018420" />
    </ReusableFormLayout>
    <div className="grid gap-4 md:grid-cols-3">
      {[
        ["Select Product", Package],
        ["QR Configuration", Settings2],
        ["Preview", Eye],
        ["Generate", Zap],
        ["Secure Mode", Sparkles],
        ["Parent Child", Layers3],
        ["QR Types", QrCode],
      ].map(([label, Icon]) => (
        <div key={label as string} className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
          <Icon className="h-5 w-5 text-cyan-300" />
          <p className="mt-3 text-sm font-semibold text-white">{label}</p>
        </div>
      ))}
    </div>
    <QrPreview />
    <DashboardWidget title="Generate" subtitle="Static generation confirmation. No backend records are created.">
      <div className="flex flex-col gap-3 rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-cyan-200" />
          <div>
            <p className="text-sm font-semibold text-white">18,420 secure serialized QR codes ready</p>
            <p className="mt-1 text-sm text-cyan-50/70">Preview, validation and generation are frontend-only placeholders.</p>
          </div>
        </div>
        <PrimaryButton icon={Zap}>Generate QR Batch</PrimaryButton>
      </div>
    </DashboardWidget>
  </div>
);
