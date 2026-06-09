import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Lock,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Loader2,
  X
} from 'lucide-react';

const token = {
  navy:    '#0A0F1E',
  navyMid: '#111827',
  navyCard:'#141C2E',
  accent:  '#3B82F6',
  accentHover: '#2563EB',
  border:  'rgba(255,255,255,0.07)',
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  success: '#22C55E',
};

const industries = [
  "Plywood & Wood Panels",
  "Paint Companies",
  "Construction Materials"
];

const countries = [
  { name: "India", flag: "🇮🇳" },
  { name: "United States", flag: "🇺🇸" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "United Arab Emirates", flag: "🇦🇪" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "Afghanistan", flag: "🇦🇫" },
  { name: "Albania", flag: "🇦🇱" },
  { name: "Algeria", flag: "🇩🇿" },
  { name: "Andorra", flag: "🇦🇩" },
  { name: "Angola", flag: "🇦🇴" },
  { name: "Argentina", flag: "🇦🇷" },
  { name: "Armenia", flag: "🇦🇲" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Austria", flag: "🇦🇹" },
  { name: "Azerbaijan", flag: "🇦🇿" },
  { name: "Bahamas", flag: "🇧🇸" },
  { name: "Bahrain", flag: "🇧🇭" },
  { name: "Bangladesh", flag: "🇧🇩" },
  { name: "Barbados", flag: "🇧🇧" },
  { name: "Belarus", flag: "🇧🇾" },
  { name: "Belgium", flag: "🇧🇪" },
  { name: "Belize", flag: "🇧🇿" },
  { name: "Benin", flag: "🇧🇯" },
  { name: "Bhutan", flag: "🇧🇹" },
  { name: "Bolivia", flag: "🇧🇴" },
  { name: "Bosnia and Herzegovina", flag: "🇧🇦" },
  { name: "Botswana", flag: "🇧🇼" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "Brunei", flag: "🇧🇳" },
  { name: "Bulgaria", flag: "🇧🇬" },
  { name: "Burkina Faso", flag: "🇧🇫" },
  { name: "Burundi", flag: "🇧🇮" },
  { name: "Cabo Verde", flag: "🇨🇻" },
  { name: "Cambodia", flag: "🇰🇭" },
  { name: "Cameroon", flag: "🇨🇲" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Central African Republic", flag: "🇨🇫" },
  { name: "Chad", flag: "🇹🇩" },
  { name: "Chile", flag: "🇨🇱" },
  { name: "China", flag: "🇨🇳" },
  { name: "Colombia", flag: "🇨🇴" },
  { name: "Comoros", flag: "🇰🇲" },
  { name: "Congo", flag: "🇨🇬" },
  { name: "Costa Rica", flag: "🇨🇷" },
  { name: "Croatia", flag: "🇭🇷" },
  { name: "Cuba", flag: "🇨🇺" },
  { name: "Cyprus", flag: "🇨🇾" },
  { name: "Czech Republic", flag: "🇨🇿" },
  { name: "Denmark", flag: "🇩🇰" },
  { name: "Djibouti", flag: "🇩🇯" },
  { name: "Dominica", flag: "🇩🇲" },
  { name: "Dominican Republic", flag: "🇩🇴" },
  { name: "Ecuador", flag: "🇪🇨" },
  { name: "Egypt", flag: "🇪🇬" },
  { name: "El Salvador", flag: "🇸🇻" },
  { name: "Equatorial Guinea", flag: "🇬🇶" },
  { name: "Eritrea", flag: "🇪🇷" },
  { name: "Estonia", flag: "🇪🇪" },
  { name: "Eswatini", flag: "🇸🇿" },
  { name: "Ethiopia", flag: "🇪🇹" },
  { name: "Fiji", flag: "🇫🇯" },
  { name: "Finland", flag: "🇫🇮" },
  { name: "France", flag: "🇫🇷" },
  { name: "Gabon", flag: "🇬🇦" },
  { name: "Gambia", flag: "🇬🇲" },
  { name: "Georgia", flag: "🇬🇪" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Ghana", flag: "🇬🇭" },
  { name: "Greece", flag: "🇬🇷" },
  { name: "Grenada", flag: "🇬🇩" },
  { name: "Guatemala", flag: "🇬🇹" },
  { name: "Guinea", flag: "🇬🇳" },
  { name: "Guinea-Bissau", flag: "🇬🇼" },
  { name: "Guyana", flag: "🇬🇾" },
  { name: "Haiti", flag: "🇭🇹" },
  { name: "Honduras", flag: "🇭🇳" },
  { name: "Hungary", flag: "🇭🇺" },
  { name: "Iceland", flag: "🇮🇸" },
  { name: "Indonesia", flag: "🇮🇩" },
  { name: "Iran", flag: "🇮🇷" },
  { name: "Iraq", flag: "🇮🇶" },
  { name: "Ireland", flag: "🇮🇪" },
  { name: "Israel", flag: "🇮🇱" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Jamaica", flag: "🇯🇲" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Jordan", flag: "🇯🇴" },
  { name: "Kazakhstan", flag: "🇰🇿" },
  { name: "Kenya", flag: "🇰🇪" },
  { name: "Kiribati", flag: "🇰🇮" },
  { name: "Kuwait", flag: "🇰🇼" },
  { name: "Kyrgyzstan", flag: "🇰🇬" },
  { name: "Laos", flag: "🇱🇦" },
  { name: "Latvia", flag: "🇱🇻" },
  { name: "Lebanon", flag: "🇱🇧" },
  { name: "Lesotho", flag: "🇱🇸" },
  { name: "Liberia", flag: "🇱🇷" },
  { name: "Libya", flag: "🇱🇾" },
  { name: "Liechtenstein", flag: "🇱🇮" },
  { name: "Lithuania", flag: "🇱🇹" },
  { name: "Luxembourg", flag: "🇱🇺" },
  { name: "Madagascar", flag: "🇲🇬" },
  { name: "Malawi", flag: "🇲🇼" },
  { name: "Malaysia", flag: "🇲🇾" },
  { name: "Maldives", flag: "🇲🇻" },
  { name: "Mali", flag: "🇲🇱" },
  { name: "Malta", flag: "🇲🇹" },
  { name: "Marshall Islands", flag: "🇲🇭" },
  { name: "Mauritania", flag: "🇲🇷" },
  { name: "Mauritius", flag: "🇲🇺" },
  { name: "Mexico", flag: "🇲🇽" },
  { name: "Micronesia", flag: "🇫🇲" },
  { name: "Moldova", flag: "🇲🇩" },
  { name: "Monaco", flag: "🇲🇨" },
  { name: "Mongolia", flag: "🇲🇳" },
  { name: "Montenegro", flag: "🇲🇪" },
  { name: "Morocco", flag: "🇲🇦" },
  { name: "Mozambique", flag: "🇲🇿" },
  { name: "Myanmar", flag: "🇲🇲" },
  { name: "Namibia", flag: "🇳🇦" },
  { name: "Nauru", flag: "🇳🇷" },
  { name: "Nepal", flag: "🇳🇵" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "New Zealand", flag: "🇳🇿" },
  { name: "Nicaragua", flag: "🇳🇮" },
  { name: "Niger", flag: "🇳🇪" },
  { name: "Nigeria", flag: "🇳🇬" },
  { name: "North Korea", flag: "🇰🇵" },
  { name: "North Macedonia", flag: "🇲🇰" },
  { name: "Norway", flag: "🇳🇴" },
  { name: "Oman", flag: "🇴🇲" },
  { name: "Pakistan", flag: "🇵🇰" },
  { name: "Palau", flag: "🇵🇼" },
  { name: "Palestine", flag: "🇵🇸" },
  { name: "Panama", flag: "🇵🇦" },
  { name: "Papua New Guinea", flag: "🇵🇬" },
  { name: "Paraguay", flag: "🇵🇾" },
  { name: "Peru", flag: "🇵🇪" },
  { name: "Philippines", flag: "🇵🇭" },
  { name: "Poland", flag: "🇵🇱" },
  { name: "Portugal", flag: "🇵🇹" },
  { name: "Qatar", flag: "🇶🇦" },
  { name: "Romania", flag: "🇷🇴" },
  { name: "Russia", flag: "🇷🇺" },
  { name: "Rwanda", flag: "🇷🇼" },
  { name: "Saint Kitts and Nevis", flag: "🇰🇳" },
  { name: "Saint Lucia", flag: "🇱🇨" },
  { name: "Saint Vincent and the Grenadines", flag: "🇻🇨" },
  { name: "Samoa", flag: "🇼🇸" },
  { name: "San Marino", flag: "🇸🇲" },
  { name: "Sao Tome and Principe", flag: "🇸🇹" },
  { name: "Saudi Arabia", flag: "🇸🇦" },
  { name: "Senegal", flag: "🇸🇳" },
  { name: "Serbia", flag: "🇷🇸" },
  { name: "Seychelles", flag: "🇸🇨" },
  { name: "Sierra Leone", flag: "🇸🇱" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "Slovakia", flag: "🇸🇰" },
  { name: "Slovenia", flag: "🇸🇮" },
  { name: "Solomon Islands", flag: "🇸🇧" },
  { name: "Somalia", flag: "🇸🇴" },
  { name: "South Africa", flag: "🇿🇦" },
  { name: "South Korea", flag: "🇰🇷" },
  { name: "South Sudan", flag: "🇸🇸" },
  { name: "Spain", flag: "🇪🇸" },
  { name: "Sri Lanka", flag: "🇱🇰" },
  { name: "Sudan", flag: "🇸🇩" },
  { name: "Suriname", flag: "🇸🇷" },
  { name: "Sweden", flag: "🇸🇪" },
  { name: "Switzerland", flag: "🇨🇭" },
  { name: "Syria", flag: "🇸🇾" },
  { name: "Taiwan", flag: "🇹🇼" },
  { name: "Tajikistan", flag: "🇹🇯" },
  { name: "Tanzania", flag: "🇹🇿" },
  { name: "Thailand", flag: "🇹🇭" },
  { name: "Timor-Leste", flag: "🇹🇱" },
  { name: "Togo", flag: "🇹🇬" },
  { name: "Tonga", flag: "🇹🇴" },
  { name: "Trinidad and Tobago", flag: "🇹🇹" },
  { name: "Tunisia", flag: "🇹🇳" },
  { name: "Turkey", flag: "🇹🇷" },
  { name: "Turkmenistan", flag: "🇹🇲" },
  { name: "Tuvalu", flag: "🇹🇻" },
  { name: "Uganda", flag: "🇺🇬" },
  { name: "Ukraine", flag: "🇺🇦" },
  { name: "United Arab Emirates", flag: "🇦🇪" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "United States", flag: "🇺🇸" },
  { name: "Uruguay", flag: "🇺🇾" },
  { name: "Uzbekistan", flag: "🇺🇿" },
  { name: "Vanuatu", flag: "🇻🇺" },
  { name: "Vatican City", flag: "🇻🇦" },
  { name: "Venezuela", flag: "🇻🇪" },
  { name: "Vietnam", flag: "🇻🇳" },
  { name: "Yemen", flag: "🇾🇪" },
  { name: "Zambia", flag: "🇿🇲" },
  { name: "Zimbabwe", flag: "🇿🇼" }
];

const CompanyRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // Geo Data State
  const [geoData, setGeoData] = useState({
    states: [],
    cities: [],
    loadingStates: false,
    loadingCities: false
  });

  // Form State
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    businessEmail: '',
    mobileNumber: '',
    country: 'India',
    state: '',
    city: '',
    // Admin Details
    adminName: '',
    workEmail: '',
    adminPhone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    // OTP
    otp: ['', '', '', '', '', '']
  });

  // Fetch States when Country changes
  useEffect(() => {
    if (!formData.country) return;

    setGeoData(prev => ({ ...prev, loadingStates: true, states: [], cities: [] }));

    // Using a public API for all countries
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: formData.country })
    })
    .then(res => res.json())
    .then(data => {
      if (!data.error) {
        setGeoData(prev => ({ ...prev, states: data.data.states, loadingStates: false }));
      } else {
        setGeoData(prev => ({ ...prev, loadingStates: false }));
      }
    })
    .catch(() => setGeoData(prev => ({ ...prev, loadingStates: false })));
  }, [formData.country]);

  // Fetch Cities when State changes
  useEffect(() => {
    if (!formData.state || !formData.country) return;

    setGeoData(prev => ({ ...prev, loadingCities: true, cities: [] }));

    fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: formData.country, state: formData.state })
    })
    .then(res => res.json())
    .then(data => {
      if (!data.error) {
        setGeoData(prev => ({ ...prev, cities: data.data, loadingCities: false }));
      } else {
        setGeoData(prev => ({ ...prev, loadingCities: false }));
      }
    })
    .catch(() => setGeoData(prev => ({ ...prev, loadingCities: false })));
  }, [formData.state, formData.country]);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(prev => prev + 1);
    }, 800);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate('/landing');
  };

  const renderStepIcon = (currentStep) => {
    if (step > currentStep) return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    return (
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
        step === currentStep ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-500'
      }`}>
        {currentStep}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-slate-200 font-sans flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/landing')}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">L</div>
          <span className="text-xl font-bold tracking-tight">LoyaltyTown</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2">
            {renderStepIcon(1)} <span className={`text-sm ${step >= 1 ? 'text-white' : 'text-gray-500'}`}>Business</span>
          </div>
          <div className="w-8 h-px bg-gray-800" />
          <div className="flex items-center gap-2">
            {renderStepIcon(2)} <span className={`text-sm ${step >= 2 ? 'text-white' : 'text-gray-500'}`}>Admin</span>
          </div>
          <div className="w-8 h-px bg-gray-800" />
          <div className="flex items-center gap-2">
            {renderStepIcon(3)} <span className={`text-sm ${step >= 3 ? 'text-white' : 'text-gray-500'}`}>Verify</span>
          </div>
        </div>
        <button onClick={() => navigate('/login')} className="text-sm text-blue-400 hover:text-blue-300 font-medium">
          Sign In instead
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-xl">

          {step < 4 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
          )}

          <div className="bg-[#141C2E] border border-white/5 rounded-3xl p-8 shadow-2xl">
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Create Your Loyalty Program</h2>
                  <p className="text-slate-400">Tell us about your business to get started.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Company Name *</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        placeholder="e.g. Acme Corp"
                        className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:border-blue-500 outline-none transition-all"
                        value={formData.companyName}
                        onChange={(e) => updateField('companyName', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Industry *</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                      <select
                        className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl py-3 pl-10 pr-10 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                        value={formData.industry}
                        onChange={(e) => updateField('industry', e.target.value)}
                      >
                        <option value="" disabled>Select Industry</option>
                        {industries.map(ind => <option key={ind} value={ind} className="bg-[#141C2E]">{ind}</option>)}
                      </select>
                      <div className="absolute right-3 top-3.5 pointer-events-none text-slate-500">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Business Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                      <input
                        type="email"
                        placeholder="contact@company.com"
                        className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:border-blue-500 outline-none transition-all"
                        value={formData.businessEmail}
                        onChange={(e) => updateField('businessEmail', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Mobile Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:border-blue-500 outline-none transition-all"
                        value={formData.mobileNumber}
                        onChange={(e) => updateField('mobileNumber', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Country *</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <select
                        className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl py-3 pl-9 pr-10 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                        value={formData.country}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData(prev => ({ ...prev, country: val, state: '', city: '' }));
                        }}
                      >
                        {countries.map(c => (
                          <option key={c.name} value={c.name} className="bg-[#141C2E]">
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-3.5 pointer-events-none text-slate-500">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">State *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      {geoData.loadingStates ? (
                        <div className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl py-3 pl-10 pr-4 flex items-center">
                          <Loader2 className="w-4 h-4 animate-spin text-blue-500 mr-2" />
                          <span className="text-sm text-slate-500">Loading...</span>
                        </div>
                      ) : geoData.states.length > 0 ? (
                        <>
                          <select
                            className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl py-3 pl-9 pr-10 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                            value={formData.state}
                            onChange={(e) => {
                              updateField('state', e.target.value);
                              updateField('city', '');
                            }}
                          >
                            <option value="">Select State</option>
                            {geoData.states.map(s => (
                              <option key={s.name} value={s.name} className="bg-[#141C2E]">{s.name}</option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-3.5 pointer-events-none text-slate-500">
                            <ChevronDown size={16} />
                          </div>
                        </>
                      ) : (
                        <input
                          type="text"
                          placeholder="State"
                          className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl py-3 pl-9 pr-4 focus:border-blue-500 outline-none transition-all"
                          value={formData.state}
                          onChange={(e) => updateField('state', e.target.value)}
                        />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">City *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      {geoData.loadingCities ? (
                        <div className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl py-3 pl-10 pr-4 flex items-center">
                          <Loader2 className="w-4 h-4 animate-spin text-blue-500 mr-2" />
                          <span className="text-sm text-slate-500">Loading...</span>
                        </div>
                      ) : geoData.cities.length > 0 ? (
                        <>
                          <select
                            className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl py-3 pl-9 pr-10 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                            value={formData.city}
                            onChange={(e) => updateField('city', e.target.value)}
                          >
                            <option value="">Select City</option>
                            {geoData.cities.map(c => (
                              <option key={c} value={c} className="bg-[#141C2E]">{c}</option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-3.5 pointer-events-none text-slate-500">
                            <ChevronDown size={16} />
                          </div>
                        </>
                      ) : (
                        <input
                          type="text"
                          placeholder="City"
                          className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl py-3 pl-9 pr-4 focus:border-blue-500 outline-none transition-all"
                          value={formData.city}
                          onChange={(e) => updateField('city', e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>Continue <ChevronRight size={20} /></>}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Primary Admin Account</h2>
                  <p className="text-slate-400">Set up the owner account for your company.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:border-blue-500 outline-none transition-all"
                        value={formData.adminName}
                        onChange={(e) => updateField('adminName', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Work Email *</label>
                      <input
                        type="email"
                        placeholder="john@company.com"
                        className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl py-3 px-4 focus:border-blue-500 outline-none transition-all"
                        value={formData.workEmail}
                        onChange={(e) => updateField('workEmail', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Mobile Number *</label>
                      <input
                        type="tel"
                        placeholder="+91 0987654321"
                        className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl py-3 px-4 focus:border-blue-500 outline-none transition-all"
                        value={formData.adminPhone}
                        onChange={(e) => updateField('adminPhone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Password *</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                        <input
                          type="password"
                          className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:border-blue-500 outline-none transition-all"
                          value={formData.password}
                          onChange={(e) => updateField('password', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Confirm Password *</label>
                      <input
                        type="password"
                        className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl py-3 px-4 focus:border-blue-500 outline-none transition-all"
                        value={formData.confirmPassword}
                        onChange={(e) => updateField('confirmPassword', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="w-4 h-4 rounded border-white/10 bg-[#0A0F1E] text-blue-600 focus:ring-blue-500"
                      checked={formData.acceptTerms}
                      onChange={(e) => updateField('acceptTerms', e.target.checked)}
                    />
                    <label htmlFor="terms" className="text-sm text-slate-400">
                      I accept the <span
                        className="text-blue-400 cursor-pointer hover:underline"
                        onClick={() => setShowTerms(true)}
                      >
                        Terms & Conditions
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Create Account"}
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="text-blue-500 w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Verify Your Account</h2>
                  <p className="text-slate-400">OTP Sent To:</p>
                  <p className="text-blue-400 font-medium">{formData.workEmail || 'admin@company.com'}</p>
                </div>

                <div className="flex justify-center gap-3">
                  {[0, 1, 2, 3, 4, 5].map(i => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      className="w-12 h-14 bg-[#0A0F1E] border border-white/10 rounded-xl text-center text-xl font-bold focus:border-blue-500 outline-none transition-all"
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all mt-4"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Verify"}
                </button>

                <p className="text-sm text-slate-500">
                  Didn't receive code? <span className="text-blue-400 cursor-pointer">Resend OTP</span>
                </p>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8 animate-in zoom-in duration-500">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-green-500 w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Welcome to LoyaltyTown!</h2>
                  <p className="text-slate-400">Your account is verified. Let's set up your brand.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Setup Progress</span>
                      <span className="text-blue-400 font-bold">20% Complete</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: '20%' }} />
                    </div>
                  </div>

                  <div className="bg-[#0A0F1E] rounded-2xl border border-white/5 overflow-hidden">
                    {[
                      { label: 'Company Created', done: true },
                      { label: 'Create First Product', done: false },
                      { label: 'Generate QR Codes', done: false },
                      { label: 'Launch Loyalty Program', done: false },
                    ].map((task, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border-b border-white/5 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            task.done ? 'bg-green-500 border-green-500' : 'border-gray-700'
                          }`}>
                            {task.done && <CheckCircle2 size={12} className="text-white" />}
                          </div>
                          <span className={task.done ? 'text-slate-300' : 'text-slate-500'}>{task.label}</span>
                        </div>
                        {!task.done && i === 1 && (
                          <button className="text-xs font-bold text-blue-400 hover:underline">Start</button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
                >
                  Go to Dashboard <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-slate-600 text-sm mt-8 w-full max-w-3xl mx-auto px-6">
          <span className="sm:whitespace-nowrap">© 2026 ADIION DIGITAL LABS PRIVATE LIMITED · LoyaltyTown™ is a trademark of ADIION Digital Labs.</span>
          <br />
          All rights reserved.
        </p>
      </main>

      {/* Terms & Conditions Dialog */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#141C2E] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Terms & Conditions</h3>
              <button
                onClick={() => setShowTerms(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-slate-300 text-sm leading-relaxed">
              <p className="text-slate-400 italic">
                Here are the **Terms & Conditions** for **LoyaltyTown** (operated by ADIION DIGITAL LABS PRIVATE LIMITED), based on your product’s features, pricing, and Indian operations.
              </p>

              <div className="space-y-6">
                <section>
                  <h1 className="text-xl font-bold text-white mb-2">Terms & Conditions for LoyaltyTown</h1>
                  <p className="text-xs text-slate-500">
                    Last Updated: June 9, 2026<br />
                    Company: ADIION DIGITAL LABS PRIVATE LIMITED<br />
                    Website: www.loyaltytown.com<br />
                    Email: legal@loyaltytown.com
                  </p>
                </section>

                <p>
                  These Terms & Conditions (“Terms”) govern your access to and use of the LoyaltyTown platform, website, APIs, and related services (collectively, the “Service”). By registering for or using the Service, you (“Customer”, “Brand”, “You”) agree to be bound by these Terms. If you are using the Service on behalf of a company or other legal entity, you represent that you have authority to bind that entity.
                </p>

                <section>
                  <h4 className="text-white font-semibold mb-2">1. Definitions</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>“LoyaltyTown”</strong>, <strong>“We”</strong>, <strong>“Us”</strong>, <strong>“Our”</strong> means ADIION DIGITAL LABS PRIVATE LIMITED.</li>
                    <li><strong>“End Customer”</strong> means the individual who scans a QR code generated via the Service.</li>
                    <li><strong>“QR Code”</strong> means the unique quick‑response code generated by LoyaltyTown and affixed to your products.</li>
                    <li><strong>“Subscription Plan”</strong> means the pricing plan (Free, Plus, Pro, Custom) selected by you.</li>
                    <li><strong>“User”</strong> means any employee, contractor, or agent of yours who accesses the Service under your account.</li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-white font-semibold mb-2">2. Eligibility</h4>
                  <p>You must be a legally operating business, manufacturer, distributor, or brand. By using the Service, you warrant that:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>You are at least 18 years old.</li>
                    <li>You have the authority to bind your organisation.</li>
                    <li>You will comply with all applicable Indian laws (including the Information Technology Act, 2000, Consumer Protection Act, 2019, and legal metrology rules for QR codes on product packaging).</li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-white font-semibold mb-2">3. Description of Service</h4>
                  <p>LoyaltyTown provides a SaaS platform that allows you to:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Generate unique QR codes for your products.</li>
                    <li>Link QR codes to product catalogs, dealers, and reward rules.</li>
                    <li>Allow End Customers to scan QRs, verify authenticity, claim loyalty points/cashback, and fill optional KYC forms.</li>
                    <li>View analytics, scan heatmaps, dealer tracking, fraud alerts, and customer databases.</li>
                    <li>Manage loyalty wallets, promotions, and support tickets.</li>
                  </ul>
                  <p className="mt-2 text-slate-400 text-xs italic">We reserve the right to modify or discontinue features with reasonable notice.</p>
                </section>

                <section>
                  <h4 className="text-white font-semibold mb-2">4. Account Registration & Security</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>You must provide accurate, complete, and current information during registration.</li>
                    <li>You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.</li>
                    <li>You must immediately notify us of any unauthorised use or security breach.</li>
                    <li>We may verify your business identity (e.g., GST certificate, incorporation certificate) before activating certain plans.</li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-white font-semibold mb-2">5. Subscription Plans, Fees & Payment</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Plans:</strong> As described on our Pricing page (Free, Plus, Pro, Custom). All plans are billed monthly or annually, per user, unless otherwise stated.</li>
                    <li><strong>Free Plan:</strong> Includes limited features and usage caps (e.g., up to 3 users, 10,000 QR codes/month). We may suspend the Free Plan for inactivity or abuse.</li>
                    <li><strong>Paid Plans:</strong> Fees are payable in advance. For annual plans, you receive two months free as stated. Custom plan setup fee of ₹25,000 applies.</li>
                    <li><strong>Taxes:</strong> All fees are exclusive of applicable taxes (GST, etc.), which you are responsible to pay.</li>
                    <li><strong>Payment Methods:</strong> We accept payments via Razorpay, bank transfer, or other methods we designate. Delinquent accounts may be suspended after 15 days’ notice.</li>
                    <li><strong>Refund Policy:</strong> No refunds for partial months or unused QR codes. If we terminate for our convenience, we will refund a pro‑rata portion of prepaid fees.</li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-white font-semibold mb-2">6. Your Obligations & Acceptable Use</h4>
                  <p>You agree NOT to:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Use the Service for any illegal, fraudulent, or deceptive purpose.</li>
                    <li>Generate QR codes for counterfeit, prohibited, or dangerous goods.</li>
                    <li>Attempt to reverse engineer, copy, or resell the Service without our written consent.</li>
                    <li>Harvest End Customer data for purposes other than loyalty, anti‑counterfeit verification, and direct marketing (in compliance with data protection laws).</li>
                    <li>Send spam or abusive messages to End Customers via the Service.</li>
                  </ul>
                  <p className="mt-4">You must:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Ensure that product packaging with LoyaltyTown QRs complies with applicable labelling laws.</li>
                    <li>Obtain any necessary consents from End Customers for collecting their personal data (e.g., mobile number, location, KYC documents).</li>
                    <li>Notify End Customers about your privacy practices.</li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-white font-semibold mb-2">7. Intellectual Property</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Our IP:</strong> All software, designs, algorithms, QR generation engine, dashboard UI, and documentation remain our exclusive property. You receive a non‑exclusive, non‑transferable, revocable right to use the Service during your subscription.</li>
                    <li><strong>Your IP:</strong> You retain ownership of your product catalog, customer data, and brand assets. You grant us a limited licence to host and process that data to provide the Service.</li>
                    <li><strong>White‑Label:</strong> Under Enterprise/Custom plans, we provide a white‑label experience, but the underlying technology remains our IP. You may not remove any hidden attribution unless a separate agreement is signed.</li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-white font-semibold mb-2">8. Data Privacy & Security</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>We act as a data processor for the personal data of your End Customers. You are the data controller.</li>
                    <li>We collect and process data as described in our [Privacy Policy] (available on our website). Our policy complies with the IT Act, 2000 and upcoming Digital Personal Data Protection Act, 2023.</li>
                    <li><strong>KYC Documents:</strong> Aadhaar, PAN, selfies are stored encrypted on Cloudflare R2 (Indian region). We do not share them with third parties except as required by law.</li>
                    <li>You are responsible for providing a privacy notice to your End Customers explaining how you use their data.</li>
                    <li>In case of a data breach, we will notify you within 72 hours of discovery.</li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-white font-semibold mb-2">9. Anti‑Counterfeit & Fraud Detection</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>The Service includes automated detection of duplicate or suspicious scans. We may flag, block, or alert you about potential counterfeit activity.</li>
                    <li>You acknowledge that no system is 100% foolproof; we are not liable for undetected counterfeits.</li>
                    <li>You agree to cooperate with us in investigating any fraud alerts.</li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-white font-semibold mb-2">10. Support & Service Levels</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Free & Plus:</strong> Email support during business hours (10 AM – 6 PM IST, Mon–Fri).</li>
                    <li><strong>Pro & Custom:</strong> Priority support, dedicated account manager, and SLA (99.5% uptime) as per separate SLA document.</li>
                    <li>We may perform scheduled maintenance with at least 12 hours’ notice.</li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-white font-semibold mb-2">11. Termination & Suspension</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>By You:</strong> You may cancel your subscription at any time via the dashboard. No refunds for the current billing period.</li>
                    <li><strong>By Us:</strong> We may suspend or terminate your account immediately if you breach these Terms, pose a security risk, or as required by law.</li>
                    <li>After termination, we will provide a 30‑day window to export your customer data. Thereafter, we may delete your data.</li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-white font-semibold mb-2">12. Warranties & Disclaimer</h4>
                  <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICE IS PROVIDED “AS IS”. WE DISCLAIM ALL IMPLIED WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON‑INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR‑FREE, OR COMPLETELY SECURE.</p>
                </section>

                <section>
                  <h4 className="text-white font-semibold mb-2">13. Limitation of Liability</h4>
                  <p>To the fullest extent permitted by Indian law, in no event shall LoyaltyTown’s aggregate liability exceed the total fees paid by you in the 6 months preceding the claim. We are not liable for indirect, incidental, or consequential damages.</p>
                </section>

                <section>
                  <h4 className="text-white font-semibold mb-2">14. Indemnification</h4>
                  <p>You agree to indemnify and hold harmless LoyaltyTown, its directors, and affiliates from any claims arising out of your violation of these Terms, misuse of End Customer data, or your products.</p>
                </section>

                <section>
                  <h4 className="text-white font-semibold mb-2">15. Governing Law & Dispute Resolution</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>These Terms shall be governed by the laws of India.</li>
                    <li>Disputes shall be referred to <strong>binding arbitration</strong> in <strong>Kolkata, West Bengal</strong>.</li>
                    <li>The courts of <strong>Kolkata</strong> shall have exclusive jurisdiction.</li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-white font-semibold mb-2">16. Modifications to Terms</h4>
                  <p>We may update these Terms from time to time. Material changes will be notified at least 15 days in advance.</p>
                </section>

                <section className="pt-6 border-t border-white/5">
                  <p className="text-xs text-slate-500">
                    **For any legal questions or notices, contact:**<br />
                    ADIION DIGITAL LABS PRIVATE LIMITED<br />
                    Email: legal@loyaltytown.io
                  </p>
                  <p className="mt-4 font-bold text-white text-xs">
                    By clicking “Close” or using LoyaltyTown, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
                  </p>
                </section>
              </div>
            </div>
            <div className="p-6 border-t border-white/5 flex justify-end">
              <button
                onClick={() => setShowTerms(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-xl transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyRegistration;
