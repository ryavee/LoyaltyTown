import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
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
  Eye,
  EyeOff,
  Loader2,
  X,
  Users,
  Gift,
  Plug,
  LayoutDashboard
} from 'lucide-react';

const industries = [
  "Plywood & Wood Panels",
  "Paint Companies",
  "Construction Materials"
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const countries = [
  { name: "Afghanistan", flag: "🇦🇫", dialCode: "+93" },
  { name: "Albania", flag: "🇦🇱", dialCode: "+355" },
  { name: "Algeria", flag: "🇩🇿", dialCode: "+213" },
  { name: "Andorra", flag: "🇦🇩", dialCode: "+376" },
  { name: "Angola", flag: "🇦🇴", dialCode: "+244" },
  { name: "Argentina", flag: "🇦🇷", dialCode: "+54" },
  { name: "Armenia", flag: "🇦🇲", dialCode: "+374" },
  { name: "Australia", flag: "🇦🇺", dialCode: "+61" },
  { name: "Austria", flag: "🇦🇹", dialCode: "+43" },
  { name: "Azerbaijan", flag: "🇦🇿", dialCode: "+994" },
  { name: "Bahamas", flag: "🇧🇸", dialCode: "+1-242" },
  { name: "Bahrain", flag: "🇧🇭", dialCode: "+973" },
  { name: "Bangladesh", flag: "🇧🇩", dialCode: "+880" },
  { name: "Barbados", flag: "🇧🇧", dialCode: "+1-246" },
  { name: "Belarus", flag: "🇧🇾", dialCode: "+375" },
  { name: "Belgium", flag: "🇧🇪", dialCode: "+32" },
  { name: "Belize", flag: "🇧🇿", dialCode: "+501" },
  { name: "Benin", flag: "🇧🇯", dialCode: "+229" },
  { name: "Bhutan", flag: "🇧🇹", dialCode: "+975" },
  { name: "Bolivia", flag: "🇧🇴", dialCode: "+591" },
  { name: "Bosnia and Herzegovina", flag: "🇧🇦", dialCode: "+387" },
  { name: "Botswana", flag: "🇧🇼", dialCode: "+267" },
  { name: "Brazil", flag: "🇧🇷", dialCode: "+55" },
  { name: "Brunei", flag: "🇧🇳", dialCode: "+673" },
  { name: "Bulgaria", flag: "🇧🇬", dialCode: "+359" },
  { name: "Burkina Faso", flag: "🇧🇫", dialCode: "+226" },
  { name: "Burundi", flag: "🇧🇮", dialCode: "+257" },
  { name: "Cabo Verde", flag: "🇨🇻", dialCode: "+238" },
  { name: "Cambodia", flag: "🇰🇭", dialCode: "+855" },
  { name: "Cameroon", flag: "🇨🇲", dialCode: "+237" },
  { name: "Canada", flag: "🇨🇦", dialCode: "+1" },
  { name: "Central African Republic", flag: "🇨🇫", dialCode: "+236" },
  { name: "Chad", flag: "🇹🇩", dialCode: "+235" },
  { name: "Chile", flag: "🇨🇱", dialCode: "+56" },
  { name: "China", flag: "🇨🇳", dialCode: "+86" },
  { name: "Colombia", flag: "🇨🇴", dialCode: "+57" },
  { name: "Comoros", flag: "🇰🇲", dialCode: "+269" },
  { name: "Congo", flag: "🇨🇬", dialCode: "+242" },
  { name: "Costa Rica", flag: "🇨🇷", dialCode: "+506" },
  { name: "Croatia", flag: "🇭🇷", dialCode: "+385" },
  { name: "Cuba", flag: "🇨🇺", dialCode: "+53" },
  { name: "Cyprus", flag: "🇨🇾", dialCode: "+357" },
  { name: "Czech Republic", flag: "🇨🇿", dialCode: "+420" },
  { name: "Denmark", flag: "🇩🇰", dialCode: "+45" },
  { name: "Djibouti", flag: "🇩🇯", dialCode: "+253" },
  { name: "Dominica", flag: "🇩🇲", dialCode: "+1-767" },
  { name: "Dominican Republic", flag: "🇩🇴", dialCode: "+1-809" },
  { name: "Ecuador", flag: "🇪🇨", dialCode: "+593" },
  { name: "Egypt", flag: "🇪🇬", dialCode: "+20" },
  { name: "El Salvador", flag: "🇸🇻", dialCode: "+503" },
  { name: "Equatorial Guinea", flag: "🇬🇶", dialCode: "+240" },
  { name: "Eritrea", flag: "🇪🇷", dialCode: "+291" },
  { name: "Estonia", flag: "🇪🇪", dialCode: "+372" },
  { name: "Eswatini", flag: "🇸🇿", dialCode: "+268" },
  { name: "Ethiopia", flag: "🇪🇹", dialCode: "+251" },
  { name: "Fiji", flag: "🇫🇯", dialCode: "+679" },
  { name: "Finland", flag: "🇫🇮", dialCode: "+358" },
  { name: "France", flag: "🇫🇷", dialCode: "+33" },
  { name: "Gabon", flag: "🇬🇦", dialCode: "+241" },
  { name: "Gambia", flag: "🇬🇲", dialCode: "+220" },
  { name: "Georgia", flag: "🇬🇪", dialCode: "+995" },
  { name: "Germany", flag: "🇩🇪", dialCode: "+49" },
  { name: "Ghana", flag: "🇬🇭", dialCode: "+233" },
  { name: "Greece", flag: "🇬🇷", dialCode: "+30" },
  { name: "Grenada", flag: "🇬🇩", dialCode: "+1-473" },
  { name: "Guatemala", flag: "🇬🇹", dialCode: "+502" },
  { name: "Guinea", flag: "🇬🇳", dialCode: "+224" },
  { name: "Guinea-Bissau", flag: "🇬🇼", dialCode: "+245" },
  { name: "Guyana", flag: "🇬🇾", dialCode: "+592" },
  { name: "Haiti", flag: "🇭🇹", dialCode: "+509" },
  { name: "Honduras", flag: "🇭🇳", dialCode: "+504" },
  { name: "Hungary", flag: "🇭🇺", dialCode: "+36" },
  { name: "Iceland", flag: "🇮🇸", dialCode: "+354" },
  { name: "India", flag: "🇮🇳", dialCode: "+91" },
  { name: "Indonesia", flag: "🇮🇩", dialCode: "+62" },
  { name: "Iran", flag: "🇮🇷", dialCode: "+98" },
  { name: "Iraq", flag: "🇮🇶", dialCode: "+964" },
  { name: "Ireland", flag: "🇮🇪", dialCode: "+353" },
  { name: "Israel", flag: "🇮🇱", dialCode: "+972" },
  { name: "Italy", flag: "🇮🇹", dialCode: "+39" },
  { name: "Jamaica", flag: "🇯🇲", dialCode: "+1-876" },
  { name: "Japan", flag: "🇯🇵", dialCode: "+81" },
  { name: "Jordan", flag: "🇯🇴", dialCode: "+962" },
  { name: "Kazakhstan", flag: "🇰🇿", dialCode: "+7" },
  { name: "Kenya", flag: "🇰🇪", dialCode: "+254" },
  { name: "Kiribati", flag: "🇰🇮", dialCode: "+686" },
  { name: "Kuwait", flag: "🇰🇼", dialCode: "+965" },
  { name: "Kyrgyzstan", flag: "🇰🇬", dialCode: "+996" },
  { name: "Laos", flag: "🇱🇦", dialCode: "+856" },
  { name: "Latvia", flag: "🇱🇻", dialCode: "+371" },
  { name: "Lebanon", flag: "🇱🇧", dialCode: "+961" },
  { name: "Lesotho", flag: "🇱🇸", dialCode: "+266" },
  { name: "Liberia", flag: "🇱🇷", dialCode: "+231" },
  { name: "Libya", flag: "🇱🇾", dialCode: "+218" },
  { name: "Liechtenstein", flag: "🇱🇮", dialCode: "+423" },
  { name: "Lithuania", flag: "🇱🇹", dialCode: "+370" },
  { name: "Luxembourg", flag: "🇱🇺", dialCode: "+352" },
  { name: "Madagascar", flag: "🇲🇬", dialCode: "+261" },
  { name: "Malawi", flag: "🇲🇼", dialCode: "+265" },
  { name: "Malaysia", flag: "🇲🇾", dialCode: "+60" },
  { name: "Maldives", flag: "🇲🇻", dialCode: "+960" },
  { name: "Mali", flag: "🇲🇱", dialCode: "+223" },
  { name: "Malta", flag: "🇲🇹", dialCode: "+356" },
  { name: "Marshall Islands", flag: "🇲🇭", dialCode: "+692" },
  { name: "Mauritania", flag: "🇲🇷", dialCode: "+222" },
  { name: "Mauritius", flag: "🇲🇺", dialCode: "+230" },
  { name: "Mexico", flag: "🇲🇽", dialCode: "+52" },
  { name: "Micronesia", flag: "🇫🇲", dialCode: "+691" },
  { name: "Moldova", flag: "🇲🇩", dialCode: "+373" },
  { name: "Monaco", flag: "🇲🇨", dialCode: "+377" },
  { name: "Mongolia", flag: "🇲🇳", dialCode: "+976" },
  { name: "Montenegro", flag: "🇲🇪", dialCode: "+382" },
  { name: "Morocco", flag: "🇲🇦", dialCode: "+212" },
  { name: "Mozambique", flag: "🇲🇿", dialCode: "+258" },
  { name: "Myanmar", flag: "🇲🇲", dialCode: "+95" },
  { name: "Namibia", flag: "🇳🇦", dialCode: "+264" },
  { name: "Nauru", flag: "🇳🇷", dialCode: "+674" },
  { name: "Nepal", flag: "🇳🇵", dialCode: "+977" },
  { name: "Netherlands", flag: "🇳🇱", dialCode: "+31" },
  { name: "New Zealand", flag: "🇳🇿", dialCode: "+64" },
  { name: "Nicaragua", flag: "🇳🇮", dialCode: "+505" },
  { name: "Niger", flag: "🇳🇪", dialCode: "+227" },
  { name: "Nigeria", flag: "🇳🇬", dialCode: "+234" },
  { name: "North Korea", flag: "🇰🇵", dialCode: "+850" },
  { name: "North Macedonia", flag: "🇲🇰", dialCode: "+389" },
  { name: "Norway", flag: "🇳🇴", dialCode: "+47" },
  { name: "Oman", flag: "🇴🇲", dialCode: "+968" },
  { name: "Pakistan", flag: "🇵🇰", dialCode: "+92" },
  { name: "Palau", flag: "🇵🇼", dialCode: "+680" },
  { name: "Palestine", flag: "🇵🇸", dialCode: "+970" },
  { name: "Panama", flag: "🇵🇦", dialCode: "+507" },
  { name: "Papua New Guinea", flag: "🇵🇬", dialCode: "+675" },
  { name: "Paraguay", flag: "🇵🇾", dialCode: "+595" },
  { name: "Peru", flag: "🇵🇪", dialCode: "+51" },
  { name: "Philippines", flag: "🇵🇭", dialCode: "+63" },
  { name: "Poland", flag: "🇵🇱", dialCode: "+48" },
  { name: "Portugal", flag: "🇵🇹", dialCode: "+351" },
  { name: "Qatar", flag: "🇶🇦", dialCode: "+974" },
  { name: "Romania", flag: "🇷🇴", dialCode: "+40" },
  { name: "Russia", flag: "🇷🇺", dialCode: "+7" },
  { name: "Rwanda", flag: "🇷🇼", dialCode: "+250" },
  { name: "Saint Kitts and Nevis", flag: "🇰🇳", dialCode: "+1-869" },
  { name: "Saint Lucia", flag: "🇱🇨", dialCode: "+1-758" },
  { name: "Saint Vincent and the Grenadines", flag: "🇻🇨", dialCode: "+1-784" },
  { name: "Samoa", flag: "🇼🇸", dialCode: "+685" },
  { name: "San Marino", flag: "🇸🇲", dialCode: "+378" },
  { name: "Sao Tome and Principe", flag: "🇸🇹", dialCode: "+239" },
  { name: "Saudi Arabia", flag: "🇸🇦", dialCode: "+966" },
  { name: "Senegal", flag: "🇸🇳", dialCode: "+221" },
  { name: "Serbia", flag: "🇷🇸", dialCode: "+381" },
  { name: "Seychelles", flag: "🇸🇨", dialCode: "+248" },
  { name: "Sierra Leone", flag: "🇸🇱", dialCode: "+232" },
  { name: "Singapore", flag: "🇸🇬", dialCode: "+65" },
  { name: "Slovakia", flag: "🇸🇰", dialCode: "+421" },
  { name: "Slovenia", flag: "🇸🇮", dialCode: "+386" },
  { name: "Solomon Islands", flag: "🇸🇧", dialCode: "+677" },
  { name: "Somalia", flag: "🇸🇴", dialCode: "+252" },
  { name: "South Africa", flag: "🇿🇦", dialCode: "+27" },
  { name: "South Korea", flag: "🇰🇷", dialCode: "+82" },
  { name: "South Sudan", flag: "🇸🇸", dialCode: "+211" },
  { name: "Spain", flag: "🇪🇸", dialCode: "+34" },
  { name: "Sri Lanka", flag: "🇱🇰", dialCode: "+94" },
  { name: "Sudan", flag: "🇸🇩", dialCode: "+249" },
  { name: "Suriname", flag: "🇸🇷", dialCode: "+597" },
  { name: "Sweden", flag: "🇸🇪", dialCode: "+46" },
  { name: "Switzerland", flag: "🇨🇭", dialCode: "+41" },
  { name: "Syria", flag: "🇸🇾", dialCode: "+963" },
  { name: "Taiwan", flag: "🇹🇼", dialCode: "+886" },
  { name: "Tajikistan", flag: "🇹🇯", dialCode: "+992" },
  { name: "Tanzania", flag: "🇹🇿", dialCode: "+255" },
  { name: "Thailand", flag: "🇹🇭", dialCode: "+66" },
  { name: "Timor-Leste", flag: "🇹🇱", dialCode: "+670" },
  { name: "Togo", flag: "🇹🇬", dialCode: "+228" },
  { name: "Tonga", flag: "🇹🇴", dialCode: "+676" },
  { name: "Trinidad and Tobago", flag: "🇹🇹", dialCode: "+1-868" },
  { name: "Tunisia", flag: "🇹🇳", dialCode: "+216" },
  { name: "Turkey", flag: "🇹🇷", dialCode: "+90" },
  { name: "Turkmenistan", flag: "🇹🇲", dialCode: "+993" },
  { name: "Tuvalu", flag: "🇹🇻", dialCode: "+688" },
  { name: "Uganda", flag: "🇺🇬", dialCode: "+256" },
  { name: "Ukraine", flag: "🇺🇦", dialCode: "+380" },
  { name: "United Arab Emirates", flag: "🇦🇪", dialCode: "+971" },
  { name: "United Kingdom", flag: "🇬🇧", dialCode: "+44" },
  { name: "United States", flag: "🇺🇸", dialCode: "+1" },
  { name: "Uruguay", flag: "🇺🇾", dialCode: "+598" },
  { name: "Uzbekistan", flag: "🇺🇿", dialCode: "+998" },
  { name: "Vanuatu", flag: "🇻🇺", dialCode: "+678" },
  { name: "Vatican City", flag: "🇻🇦", dialCode: "+379" },
  { name: "Venezuela", flag: "🇻🇪", dialCode: "+58" },
  { name: "Vietnam", flag: "🇻🇳", dialCode: "+84" },
  { name: "Yemen", flag: "🇾🇪", dialCode: "+967" },
  { name: "Zambia", flag: "🇿🇲", dialCode: "+260" },
  { name: "Zimbabwe", flag: "🇿🇼", dialCode: "+263" }
];

// ─── Reusable Phone Input ────────────────────────────────────────────────────
// Renders [PhoneIcon | +XX ▾ | divider | number input] with no gap between
// the dial-code and the number field.
const PhoneInput = ({ countryCodeField, phoneField, formData, updateField, placeholder = "98765 43210" }) => (
  <div className="flex items-center bg-[#f9f8f6] border border-slate-200 rounded-xl focus-within:border-blue-600 transition-all overflow-hidden">
    {/* Dial-code section — fixed width so the number input stays flush */}
    <div className="flex items-center gap-1 pl-3 pr-2 border-r border-slate-200 shrink-0">
      <Phone className="w-4 h-4 text-slate-500 shrink-0" />
      <div className="relative flex items-center">
        <select
          className="appearance-none bg-transparent border-none outline-none text-slate-900 text-sm font-bold cursor-pointer pr-4"
          value={formData[countryCodeField]}
          onChange={(e) => updateField(countryCodeField, e.target.value)}
        >
          {countries.map(c => (
            <option key={`${c.name}-${countryCodeField}`} value={c.dialCode}>
              {c.dialCode}
            </option>
          ))}
        </select>
        {/* Custom chevron sits right after the text, not at the container edge */}
        <ChevronDown size={12} className="pointer-events-none text-slate-400 absolute right-0" />
      </div>
    </div>
    {/* Number input — no left padding gap */}
    <input
      type="tel"
      placeholder={placeholder}
      className="flex-1 bg-transparent py-3 px-3 outline-none text-slate-900 text-sm"
      value={formData[phoneField]}
      onChange={(e) => updateField(phoneField, e.target.value)}
    />
  </div>
);

// ────────────────────────────────────────────────────────────────────────────

const CompanyRegistration = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const otpRefs = useRef([]);

  const [geoData, setGeoData] = useState({
    states: [],
    cities: [],
    loadingStates: false,
    loadingCities: false
  });

  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    businessEmail: '',
    mobileNumber: '',
    country: '',
    state: '',
    city: '',
    adminName: '',
    workEmail: '',
    adminPhone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    otp: ['', '', '', '', '', ''],
    countryCode: '+91',
    adminCountryCode: '+91'
  });

  // Fetch States when Country changes
  useEffect(() => {
    if (!formData.country) return;
    const controller = new AbortController();
    setGeoData(prev => ({ ...prev, loadingStates: true, states: [], cities: [] }));
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      signal: controller.signal,
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
      .catch(err => {
        if (err.name !== 'AbortError') setGeoData(prev => ({ ...prev, loadingStates: false }));
      });
    return () => controller.abort();
  }, [formData.country]);

  // Fetch Cities when State changes
  useEffect(() => {
    if (!formData.state || !formData.country) return;
    const controller = new AbortController();
    setGeoData(prev => ({ ...prev, loadingCities: true, cities: [] }));
    fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
      signal: controller.signal,
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
      .catch(err => {
        if (err.name !== 'AbortError') setGeoData(prev => ({ ...prev, loadingCities: false }));
      });
    return () => controller.abort();
  }, [formData.state, formData.country]);

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  // OTP handlers
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...formData.otp];
    newOtp[index] = value;
    setFormData(prev => ({ ...prev, otp: newOtp }));
    if (value !== '' && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData('text').trim().slice(0, 6);
    if (!/^\d+$/.test(pasted)) return;
    const digits = pasted.split('');
    const padded = [...digits, ...Array(6 - digits.length).fill('')];
    setFormData(prev => ({ ...prev, otp: padded }));
    otpRefs.current[Math.min(digits.length, 5)]?.focus();
    e.preventDefault();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = async () => {
    try {
      await api.post('/auth/resend-otp', { email: formData.workEmail });
      alert('OTP resent successfully');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to resend OTP');
    }
  };

  const handleNext = async () => {
    if (loading) return;

    // ── Step 1 validation ──
    if (step === 1) {
      if (!formData.companyName.trim()) return alert('Company name is required');
      if (!formData.industry.trim()) return alert('Industry is required');
      if (!formData.businessEmail.trim()) return alert('Business email is required');
      if (!emailRegex.test(formData.businessEmail.trim())) return alert('Enter a valid business email');
      if (!formData.mobileNumber.trim()) return alert('Business mobile number is required');
      if (!formData.country) return alert('Country is required');
      if (!formData.state.trim()) return alert('State is required');
      if (!formData.city.trim()) return alert('City is required');
      setLoading(true);
      try { setStep(2); } finally { setLoading(false); }
      return;
    }

    // ── Step 2 validation + API register ──
    if (step === 2) {
      if (!formData.adminName.trim()) return alert('Admin name is required');
      if (!formData.workEmail.trim()) return alert('Work email is required');
      if (!emailRegex.test(formData.workEmail.trim())) return alert('Enter a valid work email');
      if (!formData.adminPhone.trim()) return alert('Admin mobile number is required');
      if (!formData.password) return alert('Password is required');
      if (!formData.confirmPassword) return alert('Confirm password is required');
      if (formData.password !== formData.confirmPassword) return alert('Passwords do not match');
      if (!formData.acceptTerms) return alert('You must accept the Terms & Conditions');

      setLoading(true);
      try {
        const payload = {
          companyName: formData.companyName,
          industry: formData.industry,
          businessEmail: formData.businessEmail,
          mobileNumber: `${formData.countryCode}${formData.mobileNumber}`,
          country: formData.country,
          state: formData.state,
          city: formData.city,
          name: formData.adminName,
          email: formData.workEmail,
          phone: `${formData.adminCountryCode}${formData.adminPhone}`,
          password: formData.password,
          acceptTerms: formData.acceptTerms
        };
        const response = await api.post('/auth/register', payload);
        console.log('Registration Success:', response.data);
        setStep(3);
      } catch (error) {
        alert(error.response?.data?.message || 'Registration failed. Please try again.');
      } finally {
        setLoading(false);
      }
      return;
    }

    // ── Step 3: OTP verify ──
    if (step === 3) {
      const otpValue = formData.otp.join('');
      if (otpValue.length < 6) { alert('Please enter the full 6-digit OTP'); return; }
      setLoading(true);
      try {
        const response = await api.post('/auth/verify-otp', { email: formData.workEmail, otp: otpValue });
        const authToken =
          response.data.token ||
          response.data.accessToken ||
          response.data.access_token ||
          response.data.jwt;
        if (authToken) {
          localStorage.setItem('authToken', authToken);
          // Set default axios header for subsequent requests
          api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        }
        if (response.data.user) {
          localStorage.setItem('lt_user', JSON.stringify(response.data.user));
          setUser(response.data.user);
        }
        sessionStorage.removeItem('temp_checkout_data');
        setStep(4);
      } catch (error) {
        alert(error.response?.data?.message || 'OTP verification failed. Please try again.');
      } finally {
        setLoading(false);
      }
      return;
    }

    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate('/landing');
  };

  const renderStepIcon = (currentStep) => {
    if (step > currentStep) return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    return (
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
        step === currentStep ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
      }`}>
        {currentStep}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f4f0] text-slate-900 font-sans flex flex-col">

      {/* ── Header ── */}
      <header className="p-6 flex justify-between items-center border-b border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/landing')}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">L</div>
          <span className="text-xl font-bold tracking-tight text-slate-900">LoyaltyTown</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2">
            {renderStepIcon(1)}
            <span className={`text-sm ${step >= 1 ? 'text-slate-900' : 'text-slate-400'}`}>Business</span>
          </div>
          <div className="w-8 h-px bg-slate-200" />
          <div className="flex items-center gap-2">
            {renderStepIcon(2)}
            <span className={`text-sm ${step >= 2 ? 'text-slate-900' : 'text-slate-400'}`}>Admin</span>
          </div>
          <div className="w-8 h-px bg-slate-200" />
          <div className="flex items-center gap-2">
            {renderStepIcon(3)}
            <span className={`text-sm ${step >= 3 ? 'text-slate-900' : 'text-slate-400'}`}>Verify</span>
          </div>
        </div>
        <button onClick={() => navigate('/login')} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Sign In instead
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-xl">

          {step < 4 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
          )}

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">

            {/* ── Step 1: Business Info ── */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Create Your Loyalty Program</h2>
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
                        className="w-full bg-[#f9f8f6] border border-slate-200 rounded-xl py-3 pl-10 pr-4 focus:border-blue-600 outline-none transition-all"
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
                        className="w-full bg-[#f9f8f6] border border-slate-200 rounded-xl py-3 pl-10 pr-10 focus:border-blue-600 outline-none transition-all appearance-none cursor-pointer"
                        value={formData.industry}
                        onChange={(e) => updateField('industry', e.target.value)}
                      >
                        <option value="" disabled>Select Industry</option>
                        {industries.map(ind => (
                          <option key={ind} value={ind} className="bg-white">{ind}</option>
                        ))}
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
                        className="w-full bg-[#f9f8f6] border border-slate-200 rounded-xl py-3 pl-10 pr-4 focus:border-blue-600 outline-none transition-all"
                        value={formData.businessEmail}
                        onChange={(e) => updateField('businessEmail', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Mobile Number *</label>
                    <PhoneInput
                      countryCodeField="countryCode"
                      phoneField="mobileNumber"
                      formData={formData}
                      updateField={updateField}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Country */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Country *</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <select
                        className="w-full bg-[#f9f8f6] border border-slate-200 rounded-xl py-3 pl-9 pr-10 focus:border-blue-600 outline-none transition-all appearance-none cursor-pointer"
                        value={formData.country}
                        onChange={(e) => {
                          const val = e.target.value;
                          const selectedCountry = countries.find(c => c.name === val);
                          setFormData(prev => ({
                            ...prev,
                            country: val,
                            state: '',
                            city: '',
                            countryCode: selectedCountry?.dialCode || prev.countryCode,
                            adminCountryCode: selectedCountry?.dialCode || prev.adminCountryCode
                          }));
                          setGeoData(prev => ({ ...prev, states: [], cities: [], loadingStates: true }));
                        }}
                      >
                        <option value="" disabled>Select Country</option>
                        {countries.map(c => (
                          <option key={c.name} value={c.name} className="bg-white">
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-3.5 pointer-events-none text-slate-500">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>

                  {/* State */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">State *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      {geoData.loadingStates ? (
                        <div className="w-full bg-[#f9f8f6] border border-slate-200 rounded-xl py-3 pl-10 pr-4 flex items-center">
                          <Loader2 className="w-4 h-4 animate-spin text-blue-500 mr-2" />
                          <span className="text-sm text-slate-500">Loading...</span>
                        </div>
                      ) : geoData.states.length > 0 ? (
                        <>
                          <select
                            className="w-full bg-[#f9f8f6] border border-slate-200 rounded-xl py-3 pl-9 pr-10 focus:border-blue-600 outline-none transition-all appearance-none cursor-pointer"
                            value={formData.state}
                            onChange={(e) => {
                              updateField('state', e.target.value);
                              updateField('city', '');
                              setGeoData(prev => ({ ...prev, cities: [], loadingCities: true }));
                            }}
                          >
                            <option value="">Select State</option>
                            {geoData.states.map(s => (
                              <option key={s.name} value={s.name} className="bg-white">{s.name}</option>
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
                          className="w-full bg-[#f9f8f6] border border-slate-200 rounded-xl py-3 pl-9 pr-4 focus:border-blue-600 outline-none transition-all"
                          value={formData.state}
                          onChange={(e) => updateField('state', e.target.value)}
                        />
                      )}
                    </div>
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">City *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      {geoData.loadingCities ? (
                        <div className="w-full bg-[#f9f8f6] border border-slate-200 rounded-xl py-3 pl-10 pr-4 flex items-center">
                          <Loader2 className="w-4 h-4 animate-spin text-blue-500 mr-2" />
                          <span className="text-sm text-slate-500">Loading...</span>
                        </div>
                      ) : geoData.cities.length > 0 ? (
                        <>
                          <select
                            className="w-full bg-[#f9f8f6] border border-slate-200 rounded-xl py-3 pl-9 pr-10 focus:border-blue-600 outline-none transition-all appearance-none cursor-pointer"
                            value={formData.city}
                            onChange={(e) => updateField('city', e.target.value)}
                          >
                            <option value="">Select City</option>
                            {geoData.cities.map(c => (
                              <option key={c} value={c} className="bg-white">{c}</option>
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
                          className="w-full bg-[#f9f8f6] border border-slate-200 rounded-xl py-3 pl-9 pr-4 focus:border-blue-600 outline-none transition-all"
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

            {/* ── Step 2: Admin Account ── */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Primary Admin Account</h2>
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
                        className="w-full bg-[#f9f8f6] border border-slate-200 rounded-xl py-3 pl-10 pr-4 focus:border-blue-600 outline-none transition-all"
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
                        className="w-full bg-[#f9f8f6] border border-slate-200 rounded-xl py-3 px-4 focus:border-blue-600 outline-none transition-all"
                        value={formData.workEmail}
                        onChange={(e) => updateField('workEmail', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Mobile Number *</label>
                      <PhoneInput
                        countryCodeField="adminCountryCode"
                        phoneField="adminPhone"
                        formData={formData}
                        updateField={updateField}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Password *</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="w-full bg-[#f9f8f6] border border-slate-200 rounded-xl py-3 pl-10 pr-10 focus:border-blue-600 outline-none transition-all"
                          value={formData.password}
                          onChange={(e) => updateField('password', e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(prev => !prev)}
                          className="absolute right-3 top-3 text-slate-500 hover:text-slate-700 transition-colors"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Confirm Password *</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          className="w-full bg-[#f9f8f6] border border-slate-200 rounded-xl py-3 px-4 focus:border-blue-600 outline-none transition-all"
                          value={formData.confirmPassword}
                          onChange={(e) => updateField('confirmPassword', e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(prev => !prev)}
                          className="absolute right-3 top-3 text-slate-500 hover:text-slate-700 transition-colors"
                          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="w-4 h-4 rounded border-slate-300 bg-white text-blue-600 focus:ring-blue-500"
                      checked={formData.acceptTerms}
                      onChange={(e) => updateField('acceptTerms', e.target.checked)}
                    />
                    <label htmlFor="terms" className="text-sm text-slate-400">
                      I accept the{' '}
                      <span
                        className="text-blue-600 cursor-pointer hover:underline"
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

            {/* ── Step 3: OTP Verify ── */}
            {step === 3 && (
              <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="text-blue-500 w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Verify Your Account</h2>
                  <p className="text-slate-400">OTP Sent To:</p>
                  <p className="text-blue-600 font-medium">{formData.workEmail || 'admin@company.com'}</p>
                </div>

                <div className="flex justify-center gap-3">
                  {formData.otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el; }}
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      onPaste={handleOtpPaste}
                      className="w-12 h-14 bg-[#f9f8f6] border border-slate-200 rounded-xl text-center text-xl font-bold focus:border-blue-600 outline-none transition-all"
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
                  Didn't receive code?{' '}
                  <span
                    className="text-blue-600 cursor-pointer hover:underline"
                    onClick={handleResendOtp}
                  >
                    Resend OTP
                  </span>
                </p>
              </div>
            )}

            {/* ── Step 4: Success ── */}
            {step === 4 && (
              <div className="max-w-lg mx-auto px-6 py-10 space-y-5 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">

                {/* Hero */}
                <div className="flex flex-col items-center text-center mb-10">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-6 ring-0 animate-[pulse_2.2s_ease-in-out_0.5s_infinite] ring-emerald-100">
                    <CheckCircle2 className="text-emerald-500 w-9 h-9" />
                  </div>
                  <span className="inline-block text-[11px] font-medium tracking-widest uppercase text-emerald-600 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-md mb-3">
                    Account ready
                  </span>
                  <h2 className="text-[22px] font-medium text-slate-900 mb-2.5 leading-snug">
                    Welcome to LoyaltyTown!
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Your LoyaltyTown business account is fully set up and ready to use.
                  </p>
                </div>

                {/* What's next card */}
                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5">
                  <p className="text-[11px] font-medium tracking-widest uppercase text-slate-400 mb-4">
                    What's next
                  </p>
                  <div className="space-y-4">
                    {[
                      { icon: Users, label: "Invite your team", desc: "Add members and assign roles from the dashboard." },
                      { icon: Gift, label: "Create your first reward", desc: "Set up loyalty programs to engage your customers." },
                      { icon: Plug, label: "Connect your store", desc: "Integrate with your existing POS or ecommerce platform." },
                    ].map(({ icon: Icon, label, desc }) => (
                      <div key={label} className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon size={13} className="text-slate-400" />
                        </div>
                        <div>
                          <p className="text-[13px] font-medium text-slate-800 mb-0.5">{label}</p>
                          <p className="text-xs text-slate-500">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 text-sm font-medium text-slate-800 flex items-center justify-between hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
                      <LayoutDashboard size={15} className="text-blue-500" />
                    </div>
                    Go to dashboard
                  </div>
                  <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Footer */}
                <div className="border-t border-slate-100 pt-6 text-center">
                  <p className="text-[11px] text-slate-400 leading-loose">
                    © 2026 Adiion Digital Labs Private Limited<br />
                    LoyaltyTown™ is a trademark of Adiion Digital Labs · All rights reserved
                  </p>
                </div>

              </div>
            )}
          </div>
        </div>

        <p className="text-center text-slate-600 text-sm mt-8 w-full max-w-3xl mx-auto px-6">
          <span className="sm:whitespace-nowrap">
            © 2026 ADIION DIGITAL LABS PRIVATE LIMITED · LoyaltyTown™ is a trademark of ADIION Digital Labs.
          </span>
          <br />All rights reserved.
        </p>
      </main>

      {/* ── Terms & Conditions Modal ── */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Terms & Conditions</h3>
              <button
                onClick={() => setShowTerms(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-slate-700 text-sm leading-relaxed">
              <p className="text-slate-500 italic">
                Here are the Terms &amp; Conditions for LoyaltyTown (operated by ADIION DIGITAL LABS PRIVATE LIMITED),
                based on your product's features, pricing, and Indian operations.
              </p>
              <div className="space-y-6">
                <section>
                  <h1 className="text-xl font-bold text-slate-900 mb-2">Terms &amp; Conditions for LoyaltyTown</h1>
                  <p className="text-xs text-slate-500">
                    Last Updated: June 9, 2026<br />
                    Company: ADIION DIGITAL LABS PRIVATE LIMITED<br />
                    Website: www.loyaltytown.com<br />
                    Email: legal@loyaltytown.com
                  </p>
                </section>
                <p>
                  These Terms &amp; Conditions ("Terms") govern your access to and use of the LoyaltyTown platform,
                  website, APIs, and related services (collectively, the "Service"). By registering for or using the
                  Service, you ("Customer", "Brand", "You") agree to be bound by these Terms.
                </p>
                <section>
                  <h4 className="text-slate-900 font-semibold mb-2">1. Definitions</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>"LoyaltyTown"</strong>, <strong>"We"</strong>, <strong>"Us"</strong>, <strong>"Our"</strong> means ADIION DIGITAL LABS PRIVATE LIMITED.</li>
                    <li><strong>"End Customer"</strong> means the individual who scans a QR code generated via the Service.</li>
                    <li><strong>"QR Code"</strong> means the unique quick‑response code generated by LoyaltyTown and affixed to your products.</li>
                    <li><strong>"Subscription Plan"</strong> means the pricing plan (Free, Plus, Pro, Custom) selected by you.</li>
                    <li><strong>"User"</strong> means any employee, contractor, or agent of yours who accesses the Service under your account.</li>
                  </ul>
                </section>
                <section>
                  <h4 className="text-slate-900 font-semibold mb-2">2. Eligibility</h4>
                  <p>
                    You must be a legally operating business, manufacturer, distributor, or brand. By using the Service,
                    you warrant that you are at least 18 years old, have the authority to bind your organisation, and
                    will comply with all applicable Indian laws (including the Information Technology Act, 2000,
                    Consumer Protection Act, 2019, and legal metrology rules for QR codes on product packaging).
                  </p>
                </section>
                <section>
                  <h4 className="text-slate-900 font-semibold mb-2">3. Description of Service</h4>
                  <p>
                    LoyaltyTown provides a SaaS platform for generating unique QR codes, linking QR codes to product
                    catalogs, allowing End Customers to scan QRs and claim loyalty points/cashback, viewing analytics
                    and fraud alerts, and managing loyalty wallets and promotions. We reserve the right to modify or
                    discontinue features with reasonable notice.
                  </p>
                </section>
                <section>
                  <h4 className="text-slate-900 font-semibold mb-2">4. Account Registration &amp; Security</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>You must provide accurate, complete, and current information during registration.</li>
                    <li>You are responsible for maintaining the confidentiality of your login credentials and all activities under your account.</li>
                    <li>You must immediately notify us of any unauthorised use or security breach.</li>
                    <li>We may verify your business identity before activating certain plans.</li>
                  </ul>
                </section>
                <section>
                  <h4 className="text-slate-900 font-semibold mb-2">5. Subscription Plans, Fees &amp; Payment</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Plans:</strong> Free, Plus, Pro, Custom — billed monthly or annually.</li>
                    <li><strong>Paid Plans:</strong> Fees payable in advance. Annual plans include two months free. Custom plan setup fee of ₹25,000 applies.</li>
                    <li><strong>Taxes:</strong> All fees are exclusive of applicable taxes (GST, etc.), which you are responsible to pay.</li>
                    <li><strong>Payment Methods:</strong> Razorpay, bank transfer, or other methods we designate. Delinquent accounts may be suspended after 15 days' notice.</li>
                    <li><strong>Refund Policy:</strong> No refunds for partial months or unused QR codes. If we terminate for our convenience, we will refund a pro‑rata portion of prepaid fees.</li>
                  </ul>
                </section>
                <section>
                  <h4 className="text-slate-900 font-semibold mb-2">6. Your Obligations &amp; Acceptable Use</h4>
                  <p>You agree NOT to use the Service for any illegal, fraudulent, or deceptive purpose; generate QR codes for counterfeit or prohibited goods; reverse engineer or resell the Service; or harvest End Customer data in violation of data protection laws.</p>
                </section>
                <section>
                  <h4 className="text-slate-900 font-semibold mb-2">7. Intellectual Property</h4>
                  <p>All software, designs, algorithms, and documentation remain our exclusive property. You receive a non‑exclusive, non‑transferable, revocable right to use the Service during your subscription. You retain ownership of your product catalog, customer data, and brand assets.</p>
                </section>
                <section>
                  <h4 className="text-slate-900 font-semibold mb-2">8. Data Privacy &amp; Security</h4>
                  <p>We act as a data processor for your End Customers' personal data. KYC documents are stored encrypted on Cloudflare R2 (Indian region). In case of a data breach, we will notify you within 72 hours of discovery.</p>
                </section>
                <section>
                  <h4 className="text-slate-900 font-semibold mb-2">9. Anti‑Counterfeit &amp; Fraud Detection</h4>
                  <p>The Service includes automated detection of duplicate or suspicious scans. No system is 100% foolproof; we are not liable for undetected counterfeits. You agree to cooperate with us in investigating any fraud alerts.</p>
                </section>
                <section>
                  <h4 className="text-slate-900 font-semibold mb-2">10. Support &amp; Service Levels</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Free &amp; Plus:</strong> Email support during business hours (10 AM – 6 PM IST, Mon–Fri).</li>
                    <li><strong>Pro &amp; Custom:</strong> Priority support, dedicated account manager, and 99.5% uptime SLA.</li>
                    <li>Scheduled maintenance with at least 12 hours' notice.</li>
                  </ul>
                </section>
                <section>
                  <h4 className="text-slate-900 font-semibold mb-2">11. Termination &amp; Suspension</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>By You:</strong> Cancel at any time via the dashboard. No refunds for the current billing period.</li>
                    <li><strong>By Us:</strong> We may suspend or terminate your account immediately for breach of these Terms, security risk, or as required by law.</li>
                    <li>After termination, a 30‑day window to export your customer data. Thereafter, we may delete your data.</li>
                  </ul>
                </section>
                <section>
                  <h4 className="text-slate-900 font-semibold mb-2">12. Warranties &amp; Disclaimer</h4>
                  <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICE IS PROVIDED "AS IS". WE DISCLAIM ALL IMPLIED WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON‑INFRINGEMENT.</p>
                </section>
                <section>
                  <h4 className="text-slate-900 font-semibold mb-2">13. Limitation of Liability</h4>
                  <p>To the fullest extent permitted by Indian law, our aggregate liability shall not exceed the total fees paid by you in the 6 months preceding the claim. We are not liable for indirect, incidental, or consequential damages.</p>
                </section>
                <section>
                  <h4 className="text-slate-900 font-semibold mb-2">14. Indemnification</h4>
                  <p>You agree to indemnify and hold harmless LoyaltyTown, its directors, and affiliates from any claims arising out of your violation of these Terms, misuse of End Customer data, or your products.</p>
                </section>
                <section>
                  <h4 className="text-slate-900 font-semibold mb-2">15. Governing Law &amp; Dispute Resolution</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>These Terms shall be governed by the laws of India.</li>
                    <li>Disputes shall be referred to binding arbitration in Kolkata, West Bengal.</li>
                    <li>The courts of Kolkata shall have exclusive jurisdiction.</li>
                  </ul>
                </section>
                <section>
                  <h4 className="text-slate-900 font-semibold mb-2">16. Modifications to Terms</h4>
                  <p>We may update these Terms from time to time. Material changes will be notified at least 15 days in advance.</p>
                </section>
                <section className="pt-6 border-t border-slate-200">
                  <p className="text-xs text-slate-500">
                    For any legal questions or notices, contact:<br />
                    ADIION DIGITAL LABS PRIVATE LIMITED<br />
                    Email: legal@loyaltytown.io
                  </p>
                  <p className="mt-4 font-bold text-slate-900 text-xs">
                    By clicking "Close" or using LoyaltyTown, you acknowledge that you have read, understood, and agree to be bound by these Terms &amp; Conditions.
                  </p>
                </section>
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 flex justify-end">
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