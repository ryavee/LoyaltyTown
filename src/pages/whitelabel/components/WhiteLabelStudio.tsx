import { PrimaryButton, ReusableFormLayout, Select, TextInput } from "../../../Components/enterprise";
import { brandingTokens, colorTokens, previewSurfaces } from "../../../data/whitelabel/brandingDemoData";
import { ColorPicker, LogoUploader, ThemePreview } from "./WhiteLabelCards";
import { GenericWhiteLabelTable } from "./WhiteLabelTables";

export const ThemeEditor = () => (
  <ReusableFormLayout title="Theme Editor" description="Typography, buttons, cards, icons, dashboard theme, sidebar theme, email theme, SMS, WhatsApp, and Consumer PWA branding." columns={3} footer={<PrimaryButton>Save Theme</PrimaryButton>}>
    <TextInput label="Typography" defaultValue="Inter / System UI" />
    <Select label="Buttons" value="Compact" onChange={() => undefined} options={["Compact", "Comfortable", "Rounded"].map((value) => ({ label: value, value }))} />
    <Select label="Cards" value="Enterprise Panels" onChange={() => undefined} options={["Enterprise Panels", "Flat", "High Contrast"].map((value) => ({ label: value, value }))} />
    <Select label="Icons" value="Lucide" onChange={() => undefined} options={[{ label: "Lucide", value: "Lucide" }]} />
    <Select label="Login Page" value="Branded" onChange={() => undefined} options={["Branded", "Minimal"].map((value) => ({ label: value, value }))} />
    <Select label="Dashboard Theme" value="Dark Enterprise" onChange={() => undefined} options={["Dark Enterprise", "Light", "System"].map((value) => ({ label: value, value }))} />
  </ReusableFormLayout>
);

export const BrandStudio = () => (
  <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
    <div className="space-y-4">
      <LogoUploader />
      <section className="grid gap-3">
        {colorTokens.map((token) => <ColorPicker key={token.id} label={token.label} value={token.value} />)}
      </section>
    </div>
    <div className="space-y-4">
      <ThemeEditor />
      <ThemePreview title="Live Preview Panel" />
      <GenericWhiteLabelTable rows={brandingTokens} />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {previewSurfaces.map((surface) => <div key={surface} className="rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-sm font-semibold text-slate-200">{surface}</div>)}
      </div>
    </div>
  </div>
);
