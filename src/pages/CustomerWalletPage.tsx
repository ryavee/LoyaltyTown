import { ArrowDownLeft, ArrowUpRight, Coins, Gift, History, Sparkles } from "lucide-react";
import PublicPageShell from "../Components/PublicScan/PublicPageShell";
import WalletCard from "../Components/PublicScan/WalletCard";
import { walletTransactions } from "../data/publicScanMock";

const CustomerWalletPage = () => (
  <PublicPageShell>
    <section className="w-full">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8066DF]">My Rewards</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-[#29213D]">Customer Wallet</h1>
        <p className="mt-2 text-sm text-[#756C87]">Your points, rewards, and recent activity in one place.</p>
      </div>

      <div className="rounded-[28px] bg-gradient-to-br from-[#4B31C3] via-[#5B3FD6] to-[#8066DF] p-6 text-white shadow-xl shadow-violet-200">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-200">Current Points</p>
            <p className="mt-2 text-5xl font-black">80</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <Coins className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-violet-100">
          <Sparkles className="h-4 w-4" /> Keep scanning genuine products to earn more.
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <WalletCard label="Total Earned" value={130} icon={ArrowDownLeft} tone="green" />
        <WalletCard label="Total Redeemed" value={50} icon={Gift} tone="amber" />
      </div>

      <div className="mt-5 overflow-hidden rounded-[28px] border border-[#E8E1F1] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#EFEAF5] px-5 py-4">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-[#5B3FD6]" />
            <h2 className="text-sm font-extrabold text-[#29213D]">Transactions</h2>
          </div>
          <button className="text-xs font-bold text-[#5B3FD6]">View all</button>
        </div>
        <div className="divide-y divide-[#EFEAF5]">
          {walletTransactions.map((transaction) => {
            const positive = transaction.points > 0;
            return (
              <div key={transaction.id} className="flex items-center gap-3 px-5 py-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${positive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                  {positive ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#29213D]">{transaction.title}</p>
                  <p className="mt-0.5 truncate text-xs text-[#9188A4]">{transaction.detail} · {transaction.date}</p>
                </div>
                <span className={`text-sm font-black ${positive ? "text-emerald-600" : "text-rose-600"}`}>
                  {positive ? "+" : ""}{transaction.points}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  </PublicPageShell>
);

export default CustomerWalletPage;
