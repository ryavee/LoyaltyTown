import { useRef, useState } from "react";
import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight, LockKeyhole, MessageSquareText, Smartphone } from "lucide-react";

type MobileOtpFormProps = {
  mode: "mobile" | "otp";
  mobile: string;
  onMobileChange: (value: string) => void;
  onSendOtp: () => void;
  onVerify: () => void;
  onBack?: () => void;
};

const MobileOtpForm = ({
  mode,
  mobile,
  onMobileChange,
  onSendOtp,
  onVerify,
  onBack,
}: MobileOtpFormProps) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const updateOtp = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setOtp((current) => current.map((item, itemIndex) => itemIndex === index ? digit : item));
    if (digit && index < 3) refs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) refs.current[index - 1]?.focus();
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const digits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4).split("");
    setOtp([0, 1, 2, 3].map((index) => digits[index] || ""));
    refs.current[Math.min(digits.length, 3)]?.focus();
  };

  if (mode === "mobile") {
    return (
      <section className="w-full rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_22px_70px_rgba(65,45,105,0.13)] sm:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEE8FF] text-[#5B3FD6]">
          <Smartphone className="h-6 w-6" />
        </div>
        <h1 className="mt-5 text-2xl font-extrabold text-[#29213D]">Enter Mobile Number</h1>
        <p className="mt-2 text-sm leading-6 text-[#756C87]">We’ll send a one-time password to securely connect this reward to your wallet.</p>
        <label className="mt-6 block">
          <span className="mb-2 block text-xs font-bold text-[#51475F]">Mobile Number *</span>
          <div className="flex overflow-hidden rounded-2xl border border-[#DDD5E8] bg-[#FAF8FD] focus-within:border-[#8B72DF] focus-within:ring-2 focus-within:ring-[#EEE8FF]">
            <span className="flex items-center border-r border-[#E5DEEE] px-4 text-sm font-bold text-[#51475F]">+91</span>
            <input
              inputMode="numeric"
              maxLength={10}
              value={mobile}
              onChange={(event: ChangeEvent<HTMLInputElement>) => onMobileChange(event.target.value.replace(/\D/g, ""))}
              placeholder="98765 43210"
              className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-base font-bold tracking-wide text-[#29213D] outline-none"
            />
          </div>
        </label>
        <button disabled={mobile.length !== 10} onClick={onSendOtp} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#5B3FD6] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-violet-200 transition hover:bg-[#4B31C3] disabled:cursor-not-allowed disabled:bg-[#BDB4D6] disabled:shadow-none">
          Send OTP <ArrowRight className="h-4 w-4" />
        </button>
      </section>
    );
  }

  return (
    <section className="w-full rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_22px_70px_rgba(65,45,105,0.13)] sm:p-8">
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#756C87] hover:text-[#5B3FD6]">
        <ArrowLeft className="h-4 w-4" /> Change number
      </button>
      <div className="mt-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEE8FF] text-[#5B3FD6]">
        <MessageSquareText className="h-6 w-6" />
      </div>
      <h1 className="mt-5 text-2xl font-extrabold text-[#29213D]">Enter OTP</h1>
      <p className="mt-2 text-sm leading-6 text-[#756C87]">Enter the 4-digit code sent to +91 ••••••{mobile.slice(-4)}. Use any four digits in this mock flow.</p>
      <div className="mt-6 flex justify-between gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(element) => { refs.current[index] = element; }}
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(event) => updateOtp(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            className="h-14 w-full min-w-0 rounded-2xl border border-[#DDD5E8] bg-[#FAF8FD] text-center text-xl font-extrabold text-[#29213D] outline-none focus:border-[#8066DF] focus:ring-2 focus:ring-[#EEE8FF]"
          />
        ))}
      </div>
      <button disabled={otp.some((digit) => !digit)} onClick={onVerify} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#5B3FD6] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-violet-200 transition hover:bg-[#4B31C3] disabled:cursor-not-allowed disabled:bg-[#BDB4D6] disabled:shadow-none">
        <LockKeyhole className="h-4 w-4" /> Verify
      </button>
      <p className="mt-4 text-center text-xs text-[#9188A4]">Didn’t receive it? <button className="font-bold text-[#5B3FD6]">Resend OTP</button></p>
    </section>
  );
};

export default MobileOtpForm;
