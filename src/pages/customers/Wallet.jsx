import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Wallet, Loader2, AlertCircle } from "lucide-react";
import { getWallet, getTransactions } from "../../services/wallet.service";
import WalletSummaryCards from "../../Components/customer/WalletSummaryCards";
import TransactionsTable from "../../Components/customer/TransactionsTable";
import PointAdjustmentModal from "../../Components/customer/PointAdjustmentModal";
import PointExpiryTracker from "../../Components/customer/PointExpiryTracker";

/**
 * Admin Customer Wallet page.
 *
 * Route: /customers/:id/wallet
 */
const CustomerWallet = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ── State ── */
  const [wallet, setWallet] = useState(null);
  const [walletLoading, setWalletLoading] = useState(true);
  const [walletError, setWalletError] = useState(null);

  const [transactions, setTransactions] = useState([]);
  const [txnLoading, setTxnLoading] = useState(true);
  const [txnError, setTxnError] = useState(null);
  const [txnTotal, setTxnTotal] = useState(0);
  const [showAdjustModal, setShowAdjustModal] = useState(false);

  /* ── Fetch wallet ── */
  const fetchWallet = useCallback(async () => {
    setWalletLoading(true);
    setWalletError(null);
    try {
      const data = await getWallet(id);
      setWallet(data);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to load wallet data.";
      setWalletError(message);
    } finally {
      setWalletLoading(false);
    }
  }, [id]);

  /* ── Fetch transactions ── */
  const fetchTransactions = useCallback(async () => {
    setTxnLoading(true);
    setTxnError(null);
    try {
      const data = await getTransactions(id);
      setTransactions(data.transactions ?? []);
      setTxnTotal(data.total ?? 0);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to load transactions.";
      setTxnError(message);
    } finally {
      setTxnLoading(false);
    }
  }, [id]);

  /* ── Fetch on mount ── */
  useEffect(() => {
    fetchWallet();
    fetchTransactions();
  }, [fetchWallet, fetchTransactions]);

  /* ── Retry handler ── */
  const handleRetry = () => {
    fetchWallet();
    fetchTransactions();
  };

  /* ── Full-page error (both failed) ── */
  const bothFailed = walletError && txnError;

  return (
    <div className="space-y-6 pb-8 animate-fadeIn">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-[#EDE9FE] bg-white text-[#8E8AA2] hover:text-[#5B3FD6] hover:bg-[#F5F3FF] transition cursor-pointer"
            title="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-[#5B3FD6]" />
              <h1 className="text-lg font-black text-[#2B2340]">
                Customer Wallet
              </h1>
            </div>
            <p className="text-xs text-[#8E8AA2] font-semibold mt-0.5">
              Customer ID: {id}
            </p>
          </div>
        </div>
      </div>

      {/* ── Full-page error ── */}
      {bothFailed ? (
        <div className="bg-white border border-[#FECDD3] rounded-2xl p-10 text-center shadow-sm">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 mb-4">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-base font-black text-[#2B2340] mb-1">
            Something went wrong
          </h2>
          <p className="text-sm text-[#8E8AA2] mb-1">{walletError}</p>
          <p className="text-xs text-[#AAA2BE] mb-5">{txnError}</p>
          <button
            onClick={handleRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5B3FD6] hover:bg-[#4C32C7] text-white text-xs font-bold transition cursor-pointer border-0"
          >
            <Loader2 className="w-3.5 h-3.5" />
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* ── Wallet Summary Cards ── */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <WalletSummaryCards
                currentBalance={wallet?.currentBalance}
                totalEarned={wallet?.totalEarned}
                totalRedeemed={wallet?.totalRedeemed}
                loading={walletLoading}
              />
            </div>

            <div className="w-full lg:w-[360px]">
              <div className="bg-white rounded-xl border p-3">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">Wallet Actions</h3>
                  <button onClick={() => setShowAdjustModal(true)} className="px-3 py-1 rounded-lg bg-[#EEE8FF] text-[#5B3FD6]">Adjust Points</button>
                </div>
                <PointExpiryTracker customerId={id} />
              </div>
            </div>
          </div>

          {/* ── Wallet Error Banner (partial failure) ── */}
          {walletError && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>{walletError}</span>
              <button
                onClick={fetchWallet}
                className="ml-auto text-amber-700 hover:underline font-bold bg-transparent border-0 cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}

          {/* ── Transactions Table ── */}
          <TransactionsTable
            transactions={transactions}
            loading={txnLoading}
            error={txnError}
            totalItems={txnTotal}
          />
        </>
      )}

      <PointAdjustmentModal customerId={id} isOpen={showAdjustModal} onClose={() => setShowAdjustModal(false)} onAdjusted={() => { fetchWallet(); fetchTransactions(); }} />
    </div>
  );
};

export default CustomerWallet;
