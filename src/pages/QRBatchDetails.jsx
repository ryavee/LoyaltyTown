import { createElement } from "react";
import { ArrowLeft, Download, FileSpreadsheet, FileText, Hash, QrCode, ScanLine, TimerOff } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { getMockQrBatches } from "../data/qrMockData";
import { StatTile, StatusBadge } from "../Components/QR/QRUi";

const QRBatchDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const batch = getMockQrBatches().find((item) => item.id === id);

  const downloadPdf = async () => {
    try {
      const response = await api.get(
        "/qr/export/pdf",
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcodes.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      toast.error("PDF download failed");
    }
  };

  if (!batch) {
    return (
      <div className="rounded-2xl border border-[#E7DFF2] bg-white p-12 text-center">
        <h2 className="text-lg font-bold text-[#2B2340]">Batch not found</h2>
        <button onClick={() => navigate("/qr-batches")} className="mt-4 text-sm font-bold text-[#5B3FD6]">Return to QR Batches</button>
      </div>
    );
  }

  const unused = Math.max(batch.quantity - batch.scanned - batch.expired, 0);
  const actions = [
    ["Download ZIP", Download],
    ["Download PDF", FileText],
    ["Export Excel", FileSpreadsheet],
  ];
  const info = [
    ["Batch ID", batch.id],
    ["Batch Name", batch.batchName],
    ["Product", batch.product],
    ["Dealer", batch.dealer],
    ["Distributor", batch.distributor],
    ["Campaign", batch.campaign],
    ["Quantity", batch.quantity.toLocaleString()],
    ["Expiry", batch.expiryDate],
  ];

  return (
    <div className="space-y-5">
      <button onClick={() => navigate("/qr-batches")} className="inline-flex items-center gap-2 text-sm font-bold text-[#665C80] hover:text-[#5B3FD6]">
        <ArrowLeft className="h-4 w-4" /> Back to QR Batches
      </button>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile icon={QrCode} label="Total QR Codes" value={batch.quantity.toLocaleString()} />
        <StatTile icon={ScanLine} label="Scanned" value={batch.scanned.toLocaleString()} tone="blue" />
        <StatTile icon={Hash} label="Unused" value={unused.toLocaleString()} tone="green" />
        <StatTile icon={TimerOff} label="Expired" value={batch.expired.toLocaleString()} tone="amber" />
      </div>

      <section className="rounded-2xl border border-[#E7DFF2] bg-white shadow-[0_1px_3px_rgba(43,35,64,0.04)]">
        <div className="flex flex-col gap-4 border-b border-[#F0EBF6] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-base font-bold text-[#2B2340]">Batch Information</h2>
              <StatusBadge value={batch.status} />
            </div>
            <p className="mt-1 text-xs text-[#8E8AA2]">Created {batch.createdDate}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {actions.map(([label, Icon]) => (
              <button
                key={label}
                onClick={() => {
                  if (label === "Download PDF") {
                    downloadPdf();
                  } else {
                    toast.success(`${label} prepared with mock data`);
                  }
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-[#DDD5EA] bg-white px-3.5 py-2 text-xs font-bold text-[#5B3FD6] hover:bg-[#F8F5FC]"
              >
                {createElement(Icon, { className: "h-4 w-4" })} {label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-x-10 gap-y-5 p-5 sm:grid-cols-2 lg:grid-cols-4">
          {info.map(([label, value]) => (
            <div key={label}>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#9A93AA]">{label}</p>
              <p className="mt-1.5 break-words text-sm font-semibold text-[#2B2340]">{value}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-[#F0EBF6] p-5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#9A93AA]">Remarks</p>
          <p className="mt-1.5 text-sm text-[#665C80]">{batch.remarks}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-[#E7DFF2] bg-white p-5">
        <div className="mb-3 flex items-center justify-between text-xs font-bold text-[#665C80]">
          <span>Scan progress</span>
          <span>{Math.round((batch.scanned / batch.quantity) * 100)}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-[#EEE8FF]">
          <div className="h-full rounded-full bg-gradient-to-r from-[#8066DF] to-[#5B3FD6]" style={{ width: `${(batch.scanned / batch.quantity) * 100}%` }} />
        </div>
      </section>
    </div>
  );
};

export default QRBatchDetails;
