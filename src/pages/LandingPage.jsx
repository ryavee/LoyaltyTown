import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle, XCircle, Shield, BarChart3, Users, Zap,
  Wallet, Globe, Menu, X, ArrowRight, ChevronRight
} from 'lucide-react';

// ─── Design tokens ──────────────────────────────────────────
const token = {
  navy:    '#0A0F1E',
  navyMid: '#111827',
  navyCard:'#141C2E',
  accent:  '#3B82F6',
  accentHover: '#2563EB',
  accentSoft: '#1E3A5F',
  accentGlow: 'rgba(59,130,246,0.15)',
  border:  'rgba(255,255,255,0.07)',
  borderBlue: 'rgba(59,130,246,0.3)',
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#4B5563',
  success: '#22C55E',
  danger:  '#F87171',
};

// ─── Shared styles ──────────────────────────────────────────
const pill = {
  display: 'inline-flex', alignItems: 'center', gap: 6,
  background: token.accentGlow, border: `1px solid ${token.borderBlue}`,
  color: '#93C5FD', fontSize: 12, fontWeight: 600,
  letterSpacing: '0.08em', textTransform: 'uppercase',
  padding: '5px 14px', borderRadius: 999,
};

const sectionTitle = {
  fontSize: 36, fontWeight: 800, color: token.textPrimary,
  letterSpacing: '-0.03em', lineHeight: 1.15, margin: '12px 0 16px',
};

const sectionSub = {
  fontSize: 17, color: token.textSecondary, lineHeight: 1.7,
  maxWidth: 560,
};

const btnPrimary = {
  background: token.accent, color: '#fff',
  padding: '13px 28px', borderRadius: 10,
  fontWeight: 700, fontSize: 15, border: 'none',
  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
  transition: 'background 0.2s',
};

const btnOutline = {
  background: 'transparent', color: token.textPrimary,
  padding: '13px 28px', borderRadius: 10,
  fontWeight: 600, fontSize: 15,
  border: `1px solid ${token.border}`,
  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
  transition: 'border-color 0.2s',
};

const card = {
  background: token.navyCard,
  border: `1px solid ${token.border}`,
  borderRadius: 16, padding: '28px 28px',
};

// ─── Sub-components ─────────────────────────────────────────

const NavBar = ({ onStartFreeTrial, onLogin }) => (
  <nav style={{
    position: 'sticky', top: 0, zIndex: 100,
    background: 'rgba(10,15,30,0.85)',
    backdropFilter: 'blur(16px)',
    borderBottom: `1px solid ${token.border}`,
  }}>
    <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 20, fontWeight: 800, color: token.textPrimary, letterSpacing: '-0.02em' }}>
        Loyalty<span style={{ color: token.accent }}>Town</span>
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {['Features','How it Works','Pricing'].map(l => (
          <a key={l} href={`#${l.toLowerCase().replace(/\s+/g,'-')}`}
            style={{ color: token.textSecondary, fontSize: 14, textDecoration: 'none', fontWeight: 500 }}>
            {l}
          </a>
        ))}
        <button
          onClick={onLogin}
          style={{
            ...btnOutline,
            borderColor: token.accent,
            color: token.accent,
            padding: '8px 20px',
            fontSize: 14,
            background: 'rgba(59, 130, 246, 0.05)',
          }}
        >
          Login
        </button>
        <button
          onClick={onStartFreeTrial}
          style={{ ...btnPrimary, padding: '9px 20px', fontSize: 14 }}
        >
          Start Free Trial
        </button>
      </div>
    </div>
  </nav>
);

const HeroSection = ({ onStartFreeTrial }) => (
  <section style={{ background: token.navy, padding: '100px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
    {/* subtle radial glow behind heading */}
    <div style={{
      position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
      width: 700, height: 400,
      background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.12) 0%, transparent 70%)',
      pointerEvents: 'none',
    }} />
    <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>
      <div style={{ ...pill, margin: '0 auto 24px' }}>
        <span style={{ width: 6, height: 6, borderRadius: 99, background: '#3B82F6' }} />
        Trusted by 100+ brands across India & SEA
      </div>
      <h1 style={{ ...sectionTitle, fontSize: 56, maxWidth: 780, margin: '0 auto 24px' }}>
        Turn every product into a{' '}
        <span style={{ color: token.accent }}>customer acquisition channel.</span>
      </h1>
      <p style={{ ...sectionSub, fontSize: 19, margin: '0 auto 44px', maxWidth: 600 }}>
        The all‑in‑one SaaS platform for QR traceability, loyalty rewards, dealer intelligence, and customer 360° analytics.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        <button style={btnPrimary} onClick={onStartFreeTrial}>
          Start Free Trial <ArrowRight size={16} />
        </button>
        <button style={btnOutline}>
          See Demo
        </button>
        <button style={{ ...btnOutline, color: token.textSecondary, fontSize: 14 }}>
          Contact Sales
        </button>
      </div>
      {/* stat strip */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 48, marginTop: 64, flexWrap: 'wrap' }}>
        {[['50K+','Customer profiles created'],['70%','Counterfeit reduction'],['100+','Brands onboarded']].map(([num, label]) => (
          <div key={num} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: token.textPrimary, letterSpacing: '-0.02em' }}>{num}</div>
            <div style={{ fontSize: 13, color: token.textSecondary, marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ProblemSection = () => (
  <section style={{ background: token.navyMid, padding: '80px 24px' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ ...pill, margin: '0 auto 16px' }}>The problem</div>
        <h2 style={{ ...sectionTitle, fontSize: 32 }}>Stop the guesswork</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Before */}
        <div style={{ ...card, borderColor: 'rgba(248,113,113,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <XCircle size={20} color={token.danger} />
            <span style={{ fontWeight: 700, fontSize: 16, color: token.danger }}>Before LoyaltyTown</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {['No way to verify product authenticity','Customers buy once and never return','Zero customer data from offline sales','Dealers sell but you don\'t know performance','Campaign ROI is a black box'].map(t => (
              <div key={t} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <XCircle size={16} color={token.danger} style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ color: token.textSecondary, fontSize: 14, lineHeight: 1.6 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
        {/* After */}
        <div style={{ ...card, borderColor: token.borderBlue, background: token.accentSoft }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <CheckCircle size={20} color='#60A5FA' />
            <span style={{ fontWeight: 700, fontSize: 16, color: '#93C5FD' }}>After LoyaltyTown</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {['QR‑based verification + blockchain audit trail','Loyalty wallet, cashback, promotions drive repeat','First‑party customer profiles with scan history','Dealer intelligence dashboard – scans, fraud, incentives','Real‑time analytics – which product, where, when, who'].map(t => (
              <div key={t} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <CheckCircle size={16} color='#60A5FA' style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ color: '#BFDBFE', fontSize: 14, lineHeight: 1.6 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const features = [
  { title: 'QR Traceability Engine', desc: 'Generate millions of unique QR codes. Track location, device, and timestamp.', Icon: Globe },
  { title: 'Anti‑Counterfeit Shield', desc: 'AI fraud detection, duplicate scan blocking, geo‑velocity checks.', Icon: Shield },
  { title: 'Customer 360° Profile', desc: 'Auto‑create customer on first scan. Wallet, history, KYC in one view.', Icon: Users },
  { title: 'Loyalty & Cashback Wallet', desc: 'Points + cashback with bank‑style ledger. Redeem via UPI or gift cards.', Icon: Wallet },
  { title: 'Promotions Engine', desc: 'Festival bonuses, product‑specific offers. No code required.', Icon: Zap },
  { title: 'Dealer Intelligence', desc: 'Measure scan performance, detect diversion, run dealer leaderboards.', Icon: BarChart3 },
  { title: 'White‑Label Ready', desc: 'Launch your own branded loyalty app and verification portal.', Icon: Globe },
  { title: 'Enterprise APIs', desc: 'REST APIs for ERP, PLM, e‑commerce, and WhatsApp.', Icon: Zap },
];

const FeaturesSection = () => (
  <section id="features" style={{ background: token.navy, padding: '80px 24px' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: 52 }}>
        <div style={{ ...pill, marginBottom: 16 }}>Features</div>
        <h2 style={{ ...sectionTitle, fontSize: 32 }}>The operating system for<br />physical product engagement</h2>
        <p style={sectionSub}>Everything you need to connect your product to your customer — out of the box.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {features.map(({ title, desc, Icon }) => (
          <div key={title} style={{
            ...card, padding: '24px',
            transition: 'border-color 0.2s',
            ':hover': { borderColor: token.borderBlue },
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: token.accentGlow, border: `1px solid ${token.borderBlue}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 16,
            }}>
              <Icon size={18} color='#60A5FA' />
            </div>
            <div style={{ fontWeight: 700, fontSize: 14, color: token.textPrimary, marginBottom: 8 }}>{title}</div>
            <div style={{ fontSize: 13, color: token.textSecondary, lineHeight: 1.6 }}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorksSection = () => (
  <section id="how-it-works" style={{ background: token.navyMid, padding: '80px 24px' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{ ...pill, margin: '0 auto 16px' }}>How it works</div>
        <h2 style={{ ...sectionTitle, fontSize: 32 }}>Up and running in 3 steps</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {[
          { n: '01', title: 'Create & Print', body: 'Upload your product catalogue → generate a QR batch → download print‑ready files. Attach QR to each product.' },
          { n: '02', title: 'Customer Scans', body: 'Customer scans QR with any camera → enters mobile OTP → earns points and cashback instantly.' },
          { n: '03', title: 'Analyse & Grow', body: 'Watch the real‑time dashboard. Measure total scans, product performance, and dealer activity.' },
        ].map(({ n, title, body }) => (
          <div key={n} style={{ ...card }}>
            <div style={{
              fontSize: 48, fontWeight: 900, color: token.accentGlow,
              letterSpacing: '-0.04em', marginBottom: 20,
              background: `linear-gradient(135deg, ${token.accent}, #818CF8)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{n}</div>
            <div style={{ fontWeight: 700, fontSize: 17, color: token.textPrimary, marginBottom: 10 }}>{title}</div>
            <div style={{ fontSize: 14, color: token.textSecondary, lineHeight: 1.7 }}>{body}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const plans = [
  {
    name: 'Starter',
    monthly: '₹15,000',
    annual: '₹1,50,000',
    bestFor: 'Small brands, first QR campaign',
    features: ['Up to 50 products','5,000 QR codes/month','Basic analytics','Email support'],
  },
  {
    name: 'Growth',
    monthly: '₹49,000',
    annual: '₹4,90,000',
    bestFor: 'Mid‑size companies with dealers',
    popular: true,
    features: ['Up to 500 products','50,000 QR codes/month','Dealer intelligence','Promotions engine','Chat support'],
  },
  {
    name: 'Enterprise',
    monthly: 'Custom',
    annual: 'Custom',
    bestFor: 'Large manufacturers',
    features: ['Unlimited products & QR codes','Blockchain traceability','Digital twin','PLM integration','Dedicated success manager'],
  },
];

const PricingSection = ({ onStartFreeTrial }) => (
  <section id="pricing" style={{ background: token.navy, padding: '80px 24px' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <div style={{ ...pill, margin: '0 auto 16px' }}>Pricing</div>
        <h2 style={{ ...sectionTitle, fontSize: 32 }}>Transparent pricing</h2>
        <p style={{ ...sectionSub, margin: '0 auto' }}>All plans include white‑label option, multi‑tenant isolation, and full API access.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {plans.map(plan => (
          <div key={plan.name} style={{
            ...card,
            borderColor: plan.popular ? token.accent : token.border,
            borderWidth: plan.popular ? 2 : 1,
            position: 'relative',
            display: 'flex', flexDirection: 'column',
          }}>
            {plan.popular && (
              <div style={{
                position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                background: token.accent, color: '#fff',
                fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                padding: '4px 16px', borderRadius: 99,
              }}>Most Popular</div>
            )}
            <div style={{ marginBottom: 8, fontSize: 13, fontWeight: 600, color: token.textSecondary, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{plan.name}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, margin: '8px 0' }}>
              <span style={{ fontSize: 36, fontWeight: 800, color: token.textPrimary, letterSpacing: '-0.03em' }}>{plan.monthly}</span>
              {plan.monthly !== 'Custom' && <span style={{ fontSize: 14, color: token.textSecondary }}>/mo</span>}
            </div>
            {plan.annual !== 'Custom' && (
              <div style={{ fontSize: 13, color: '#60A5FA', marginBottom: 4 }}>{plan.annual}/yr <span style={{ color: token.textSecondary }}>(2 months free)</span></div>
            )}
            <div style={{ fontSize: 13, color: token.textSecondary, marginBottom: 20 }}>Best for: {plan.bestFor}</div>
            <div style={{ height: 1, background: token.border, marginBottom: 20 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
              {plan.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckCircle size={15} color={token.success} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: token.textSecondary }}>{f}</span>
                </div>
              ))}
            </div>
            <button
              onClick={plan.monthly === 'Custom' ? undefined : onStartFreeTrial}
              style={{
                ...( plan.popular ? btnPrimary : btnOutline ),
                marginTop: 28, justifyContent: 'center', width: '100%',
              }}
            >
              {plan.monthly === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
            </button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <p style={{ fontSize: 14, color: token.textSecondary }}>14‑day free trial — no credit card required.</p>
        <p style={{ fontSize: 13, color: token.textMuted, marginTop: 8 }}>White‑Label Add‑on: +₹25,000/mo · +₹2,50,000/yr</p>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section style={{ background: token.navyMid, padding: '80px 24px' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ ...pill, margin: '0 auto 16px' }}>Social proof</div>
        <h2 style={{ ...sectionTitle, fontSize: 32 }}>Loved by brands that move fast</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {[
          { quote: '"LoyaltyTown helped us reduce counterfeit products by 70% and capture 50,000+ customers in 3 months."', author: 'Marketing Head', company: 'Leading Paint Brand' },
          { quote: '"The dealer intelligence module gave us visibility we never had. We now reward top performers and stop diversion."', author: 'Sales Director', company: 'FMCG Company' },
        ].map(({ quote, author, company }) => (
          <div key={company} style={{ ...card }}>
            <div style={{ fontSize: 32, color: token.accent, lineHeight: 1, marginBottom: 12, fontFamily: 'Georgia, serif' }}>"</div>
            <p style={{ fontSize: 15, color: token.textPrimary, lineHeight: 1.75, fontStyle: 'italic', marginBottom: 20 }}>{quote.slice(1, -1)}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 99,
                background: token.accentSoft, border: `1px solid ${token.borderBlue}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, color: '#60A5FA',
              }}>{author[0]}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: token.textPrimary }}>{author}</div>
                <div style={{ fontSize: 12, color: token.textSecondary }}>{company}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = ({ onStartFreeTrial }) => (
  <section style={{ background: token.navy, padding: '80px 24px', textAlign: 'center' }}>
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      <h2 style={{ ...sectionTitle, fontSize: 40 }}>Ready to grow with every scan?</h2>
      <p style={{ ...sectionSub, margin: '0 auto 36px' }}>Start your 14-day free trial. No credit card required.</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
        <button style={btnPrimary} onClick={onStartFreeTrial}>Start Free Trial <ArrowRight size={16} /></button>
        <button style={btnOutline}>Contact Sales</button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer style={{ background: '#060A14', padding: '56px 24px 32px', borderTop: `1px solid ${token.border}` }}>
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 40, marginBottom: 40, paddingBottom: 40, borderBottom: `1px solid ${token.border}` }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: token.textPrimary, marginBottom: 12 }}>
            Loyalty<span style={{ color: token.accent }}>Town</span>
          </div>
          <p style={{ fontSize: 14, color: token.textSecondary, lineHeight: 1.7, maxWidth: 300 }}>
            Enterprise‑grade QR traceability + loyalty SaaS for modern brands. Trace. Reward. Grow.
          </p>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Contact</div>
          <div style={{ fontSize: 14, color: token.textSecondary, lineHeight: 2 }}>sales@loyaltytown.com</div>
          <div style={{ fontSize: 14, color: token.textSecondary }}>+91‑7029395817</div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: token.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Legal</div>
          {['Privacy Policy', 'Terms of Service'].map(l => (
            <div key={l} style={{ marginBottom: 8 }}>
              <a href="#" style={{ fontSize: 14, color: token.textSecondary, textDecoration: 'none' }}>{l}</a>
            </div>
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'center', fontSize: 13, color: token.textMuted, lineHeight: 1.6 }}>
        <span style={{ display: 'inline-block' }}>© 2026 ADIION DIGITAL LABS PRIVATE LIMITED · LoyaltyTown™ is a trademark of ADIION Digital Labs.</span>
        <br />
        All rights reserved.
      </div>
    </div>
  </footer>
);

// ─── Root ────────────────────────────────────────────────────
const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleStartFreeTrial = () => {
    navigate('/checkout');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: token.navy, color: token.textPrimary }}>
      <NavBar onStartFreeTrial={handleStartFreeTrial} onLogin={handleLogin} />
      <HeroSection onStartFreeTrial={handleStartFreeTrial} />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection onStartFreeTrial={handleStartFreeTrial} />
      <TestimonialsSection />
      <CTASection onStartFreeTrial={handleStartFreeTrial} />
      <Footer />
    </div>
  );
};

export default LandingPage;
