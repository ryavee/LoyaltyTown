import { ArrowRight, Gift, Sparkles, Trophy } from "lucide-react";

type RewardSuccessProps = {
  earnedPoints?: number;
  walletBalance?: number;
  onViewRewards: () => void;
};

const RewardSuccess = ({
  earnedPoints = 10,
  walletBalance = 10,
  onViewRewards,
}: RewardSuccessProps) => (
  <section className="relative w-full overflow-hidden rounded-[28px] border border-[#E6DDF7] bg-white p-6 text-center shadow-[0_22px_70px_rgba(65,45,105,0.13)] sm:p-8">
    <Sparkles className="absolute left-7 top-8 h-6 w-6 rotate-[-18deg] text-amber-400" />
    <Sparkles className="absolute right-8 top-16 h-5 w-5 rotate-12 text-[#8066DF]" />
    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-white shadow-xl shadow-amber-200">
      <Trophy className="h-9 w-9" />
    </div>
    <p className="mt-5 text-3xl">🎉</p>
    <h1 className="mt-1 text-2xl font-extrabold text-[#29213D]">Congratulations</h1>
    <p className="mt-2 text-sm text-[#756C87]">Your product scan has been verified and rewarded.</p>
    <div className="mt-6 rounded-3xl bg-gradient-to-br from-[#5B3FD6] to-[#8066DF] p-6 text-white shadow-lg shadow-violet-200">
      <Gift className="mx-auto h-6 w-6 text-violet-100" />
      <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-violet-100">You earned</p>
      <p className="mt-1 text-4xl font-black">{earnedPoints}</p>
      <p className="text-sm font-bold text-violet-100">Loyalty Points</p>
    </div>
    <div className="mt-4 flex items-center justify-between rounded-2xl border border-[#ECE6F4] bg-[#FAF8FD] px-4 py-4">
      <span className="text-sm font-semibold text-[#756C87]">Wallet Balance</span>
      <span className="text-lg font-extrabold text-[#29213D]">{walletBalance} Points</span>
    </div>
    <button onClick={onViewRewards} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#5B3FD6] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-violet-200 transition hover:bg-[#4B31C3]">
      View Rewards <ArrowRight className="h-4 w-4" />
    </button>
  </section>
);

export default RewardSuccess;
