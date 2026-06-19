import { useState } from "react";
import { ArrowRight, MapPin, UserRoundPlus } from "lucide-react";

export type CustomerDetails = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  pincode: string;
};

type CustomerRegistrationFormProps = {
  onSubmit: (details: CustomerDetails) => void;
};

const inputClass = "w-full rounded-2xl border border-[#DDD5E8] bg-[#FAF8FD] px-4 py-3.5 text-sm font-semibold text-[#29213D] outline-none focus:border-[#8066DF] focus:ring-2 focus:ring-[#EEE8FF]";

const CustomerRegistrationForm = ({ onSubmit }: CustomerRegistrationFormProps) => {
  const [details, setDetails] = useState<CustomerDetails>({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    pincode: "",
  });

  const update = (field: keyof CustomerDetails, value: string) => {
    setDetails((current) => ({ ...current, [field]: value }));
  };

  return (
    <section className="w-full rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_22px_70px_rgba(65,45,105,0.13)] sm:p-8">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEE8FF] text-[#5B3FD6]">
        <UserRoundPlus className="h-6 w-6" />
      </div>
      <h1 className="mt-5 text-2xl font-extrabold text-[#29213D]">Tell us about you</h1>
      <p className="mt-2 text-sm leading-6 text-[#756C87]">Create your customer profile to receive points and manage future rewards.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label>
          <span className="mb-2 block text-xs font-bold text-[#51475F]">First Name *</span>
          <input value={details.firstName} onChange={(event) => update("firstName", event.target.value)} placeholder="First name" className={inputClass} />
        </label>
        <label>
          <span className="mb-2 block text-xs font-bold text-[#51475F]">Last Name</span>
          <input value={details.lastName} onChange={(event) => update("lastName", event.target.value)} placeholder="Last name" className={inputClass} />
        </label>
        <label className="sm:col-span-2">
          <span className="mb-2 block text-xs font-bold text-[#51475F]">Email</span>
          <input type="email" value={details.email} onChange={(event) => update("email", event.target.value)} placeholder="you@example.com" className={inputClass} />
        </label>
        <label>
          <span className="mb-2 block text-xs font-bold text-[#51475F]">City</span>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9A92A9]" />
            <input value={details.city} onChange={(event) => update("city", event.target.value)} placeholder="City" className={`${inputClass} pl-11`} />
          </div>
        </label>
        <label>
          <span className="mb-2 block text-xs font-bold text-[#51475F]">Pincode</span>
          <input inputMode="numeric" maxLength={6} value={details.pincode} onChange={(event) => update("pincode", event.target.value.replace(/\D/g, ""))} placeholder="600001" className={inputClass} />
        </label>
      </div>
      <button disabled={!details.firstName.trim()} onClick={() => onSubmit(details)} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#5B3FD6] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-violet-200 transition hover:bg-[#4B31C3] disabled:cursor-not-allowed disabled:bg-[#BDB4D6] disabled:shadow-none">
        Submit <ArrowRight className="h-4 w-4" />
      </button>
    </section>
  );
};

export default CustomerRegistrationForm;
