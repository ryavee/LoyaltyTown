import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard,
  ShieldCheck,
  Lock,
  Info,
  ArrowLeft,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

const SaveCardDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/register-company');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-[1100px] mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row gap-16 items-start">

        {/* Left Side: Value Proposition */}
        <div className="flex-1 space-y-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group mb-8"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to plans</span>
          </button>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
              Secure Checkout
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
              Start your <span className="text-blue-500">14-day free trial</span> today.
            </h1>
            <p className="text-lg text-slate-400 max-w-md leading-relaxed">
              No commitment. Cancel anytime. We just need to verify your payment method to prevent service interruption.
            </p>
          </div>

          <div className="space-y-6 pt-4">
            {[
              { title: 'Safe & Encrypted', desc: 'Your data is protected by 256-bit SSL encryption.', icon: ShieldCheck },
              { title: 'No Hidden Fees', desc: 'Zero charges during the trial period.', icon: CheckCircle2 },
              { title: 'Easy Cancellation', desc: 'One-click cancel from your dashboard anytime.', icon: Info },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center flex-shrink-0">
                  <item.icon className="text-blue-400" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-800 flex items-center gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-default" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8 opacity-50 grayscale hover:grayscale-0 transition-all cursor-default" />
            <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
              <Lock size={12} />
              <span>SECURE PCI-DSS COMPLIANT</span>
            </div>
          </div>
        </div>

        {/* Right Side: Professional Card Form */}
        <div className="w-full lg:w-[460px] flex-shrink-0">
          <div className="bg-[#141C2E] border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            {/* Glossy overlay */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -mr-16 -mt-16 pointer-events-none" />

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 ml-1">Cardholder Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardName"
                    required
                    placeholder="John Doe"
                    className="w-full bg-[#0A0F1E] border border-slate-700 rounded-xl py-4 px-5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    value={formData.cardName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 ml-1">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardNumber"
                    required
                    placeholder="0000 0000 0000 0000"
                    className="w-full bg-[#0A0F1E] border border-slate-700 rounded-xl py-4 px-12 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                  />
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 ml-1">Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    required
                    placeholder="MM/YY"
                    className="w-full bg-[#0A0F1E] border border-slate-700 rounded-xl py-4 px-5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    value={formData.expiry}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 ml-1">CVC / CVV</label>
                  <input
                    type="text"
                    name="cvc"
                    required
                    placeholder="•••"
                    className="w-full bg-[#0A0F1E] border border-slate-700 rounded-xl py-4 px-5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    value={formData.cvc}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="bg-blue-500/5 rounded-2xl p-4 border border-blue-500/10 flex gap-3">
                <Info size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-[12px] text-slate-400 leading-normal">
                  You will be charged <span className="text-white font-bold">₹0.00</span> today. Your Growth Plan trial will end in 14 days, after which you will be billed ₹49,000/mo.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-[0_8px_20px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Confirm Payment Details
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-slate-500 text-xs mt-6 px-8">
            By confirming your payment details, you agree to our <a href="#" className="underline hover:text-slate-300">Terms of Service</a> and <a href="#" className="underline hover:text-slate-300">Privacy Policy</a>.
          </p>
        </div>

      </div>
    </div>
  );
};

export default SaveCardDetails;