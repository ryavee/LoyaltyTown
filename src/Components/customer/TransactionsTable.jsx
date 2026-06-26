import { History, ArrowDownLeft, ArrowUpRight, Loader2, AlertCircle, Inbox } from "lucide-react";

/**
 * Transactions table component.
 *
 * Props:
 *   transactions – Array<{ id, date, type, points, description }>
 *   loading      – boolean
 *   error        – string | null
 *   totalItems   – number (for the header count)
 */
const TransactionsTable = ({
  transactions = [],
  loading = false,
  error = null,
  totalItems,
}) => {
  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <div className="bg-white border border-[#EDE9FE] rounded-2xl shadow-sm overflow-hidden animate-pulse">
        <div className="px-5 py-4 border-b border-[#F0EDF8] flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#F0EDF8]" />
          <div className="h-4 w-36 rounded bg-[#F0EDF8]" />
        </div>
        <div className="divide-y divide-[#F5F2FC]">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="px-5 py-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F0EDF8]" />
              <div className="space-y-1.5 flex-1">
                <div className="h-3.5 w-48 rounded bg-[#F0EDF8]" />
                <div className="h-3 w-32 rounded bg-[#E5DEED]" />
              </div>
              <div className="h-5 w-16 rounded bg-[#F0EDF8]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ── Error state ── */
  if (error) {
    return (
      <div className="bg-white border border-[#FECDD3] rounded-2xl shadow-sm p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-rose-50 text-rose-500 mb-3">
          <AlertCircle className="w-6 h-6" />
        </div>
        <p className="text-sm font-bold text-rose-600 mb-1">
          Failed to load transactions
        </p>
        <p className="text-xs text-[#8E8AA2]">{error}</p>
      </div>
    );
  }

  /* ── Empty state ── */
  if (!transactions.length) {
    return (
      <div className="bg-white border border-[#EDE9FE] rounded-2xl shadow-sm p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#F5F3FF] text-[#5B3FD6] mb-3">
          <Inbox className="w-6 h-6" />
        </div>
        <p className="text-sm font-bold text-[#2B2340] mb-1">
          No transactions yet
        </p>
        <p className="text-xs text-[#8E8AA2]">
          Transactions will appear here once the customer starts earning and
          redeeming points.
        </p>
      </div>
    );
  }

  /* ── Render helper for type icon ── */
  const getTypeIcon = (type) => {
    const lower = (type ?? "").toLowerCase();
    if (lower === "earned" || lower === "credit" || lower === "earn") {
      return { icon: ArrowDownLeft, bg: "bg-emerald-50 text-emerald-600" };
    }
    if (
      lower === "redeemed" ||
      lower === "debit" ||
      lower === "redeem" ||
      lower === "spent"
    ) {
      return { icon: ArrowUpRight, bg: "bg-rose-50 text-rose-600" };
    }
    return { icon: History, bg: "bg-[#F5F3FF] text-[#5B3FD6]" };
  };

  const displayTotal = totalItems ?? transactions.length;

  return (
    <div className="bg-white border border-[#EDE9FE] rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#F0EDF8]">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-[#5B3FD6]" />
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#8E8AA2]">
            Transactions
          </h3>
        </div>
        <span className="text-[10px] font-bold text-[#8E8AA2]">
          {displayTotal} entries
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#F0EDF8]">
              {["Date", "Type", "Points", "Description"].map((heading) => (
                <th
                  key={heading}
                  className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-[#8E8AA2] last:text-right"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F2FC]">
            {transactions.map((txn) => {
              const { icon: TypeIcon, bg: iconBg } = getTypeIcon(txn.type);
              const isPositive =
                txn.points > 0 &&
                (txn.type ?? "").toLowerCase() !== "redeemed" &&
                (txn.type ?? "").toLowerCase() !== "debit" &&
                (txn.type ?? "").toLowerCase() !== "redeem" &&
                (txn.type ?? "").toLowerCase() !== "spent";

              return (
                <tr
                  key={txn.id}
                  className="hover:bg-[#FAF8FE] transition-colors"
                >
                  {/* Date */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-xs font-semibold text-[#2B2340]">
                      {txn.date ?? "-"}
                    </span>
                  </td>

                  {/* Type */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex items-center justify-center w-8 h-8 rounded-lg ${iconBg}`}
                      >
                        <TypeIcon className="w-4 h-4" />
                      </span>
                      <span className="text-xs font-bold text-[#2B2340] capitalize">
                        {txn.type ?? "N/A"}
                      </span>
                    </div>
                  </td>

                  {/* Points */}
                  <td className="px-5 py-4 whitespace-nowrap text-right">
                    <span
                      className={`inline-flex items-center text-sm font-black ${
                        isPositive ? "text-[#059669]" : "text-[#E11D48]"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {txn.points?.toLocaleString() ?? 0}
                    </span>
                  </td>

                  {/* Description */}
                  <td className="px-5 py-4">
                    <p className="text-xs font-semibold text-[#8E8AA2] max-w-[240px] truncate">
                      {txn.description ?? "-"}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
