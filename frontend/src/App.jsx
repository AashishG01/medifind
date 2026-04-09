import { useState, useEffect } from 'react';
import { t } from './i18n';
import * as api from './api';
import DoctorApp from './DoctorPages';
import AdminPanel from './AdminPanel';

/* Specialty config */
const SPECS = [
  ['Cardiologist', '🫀', 'Cardiology', '#D94F4F', '#FDEAEA'],
  ['Neurologist', '🧠', 'Neurology', '#7C5CBF', '#F0ECF8'],
  ['Orthopedic Surgeon', '🦴', 'Orthopedics', '#2E7DB5', '#E6F0F8'],
  ['Pediatrician', '👶', 'Pediatrics', '#D97B2B', '#FDF0E3'],
  ['Dermatologist', '🧴', 'Dermatology', '#D45B90', '#FBEAF1'],
  ['General Physician', '🩺', 'General', '#0A7B9E', '#E5F4F9'],
  ['Gynecologist', '👩‍⚕️', 'Gynecology', '#C75B8E', '#F9E8F0'],
  ['ENT Specialist', '👂', 'ENT', '#8B6F47', '#F4EEE5'],
  ['Psychiatrist', '🧘', 'Psychiatry', '#6C5B9E', '#EFECF6'],
  ['Ophthalmologist', '👁️', 'Eye Care', '#3E8C8C', '#E5F2F2'],
  ['Gastroenterologist', '🫁', 'Gastro', '#5B8C3E', '#EAF3E5'],
  ['Pulmonologist', '🌬️', 'Pulmonology', '#4A7A8C', '#E5EFF3'],
  ['Dentist', '🦷', 'Dental', '#5A9E7B', '#E5F4EC'],
  ['Physiotherapist', '🏃', 'Physio', '#7B8C4A', '#EFF3E5'],
  ['Endocrinologist', '💉', 'Endocrine', '#9E5A7B', '#F4E5EF'],
];

const specMap = {};
SPECS.forEach(([key, emoji, , color, bg]) => { specMap[key] = { emoji, color, bg }; });

export default function App() {
  const [isDoctor, setIsDoctor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState('home');
  const [lang, setLang] = useState('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const T = (key, fallback) => t(key, lang) || fallback;
  const go = (p, data) => { setPage(p); setPageData(data || null); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3500); };

  const navItems = [
    ['home', T('nav_home', 'Home')],
    ['symptoms', T('nav_symptoms', 'Symptom Checker')],
    ['doctors', T('nav_doctors', 'Find Doctors')],
    ['medicines', T('nav_medicines', 'Medicine Prices')],
    ['records', T('nav_records', 'Health Records')],
    ['opinion', T('nav_opinion', 'Second Opinion')],
  ];

  if (isAdmin) {
    return <AdminPanel goPatient={() => setIsAdmin(false)} />;
  }

  if (isDoctor) {
    return <DoctorApp goPatient={() => setIsDoctor(false)} />;
  }

  return (
    <>
      {/* ════════ NAVBAR ════════ */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <div className="logo" onClick={() => go('home')}>
            <div className="logo-mark">M</div>
            <span className="logo-text">Medi<span className="logo-accent">Find</span></span>
          </div>
          <div className="nav-spacer" />
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {navItems.map(([key, label]) => (
              <button key={key} className={`nav-link ${page === key ? 'active' : ''}`}
                onClick={() => go(key)}>{label}</button>
            ))}
          </div>
          <div className="nav-actions">
            <button className="lang-btn" onClick={() => setLang(lang === 'en' ? 'gu' : 'en')}>
              {lang === 'en' ? 'ગુજરાતી' : 'English'}
            </button>
            {currentUser ? (
              <button className="btn btn-primary" onClick={() => go('bookings')} style={{ padding: '8px 16px', fontSize: 13 }}>
                👤 {currentUser.name.split(' ')[0]}
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => go('login')} style={{ padding: '8px 16px', fontSize: 13 }}>
                {T('nav_login', 'Login / Sign Up')}
              </button>
            )}
            <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
          </div>
        </div>
      </nav>

      {/* ════════ PAGE CONTENT ════════ */}
      {page === 'home' && <LandingPage lang={lang} T={T} go={go} />}
      {page === 'login' && <LoginPage T={T} go={go} showToast={showToast} setUser={setCurrentUser} />}
      {page === 'abha-onboarding' && <ABHAOnboardingPage T={T} go={go} showToast={showToast} user={currentUser} setUser={setCurrentUser} />}
      {page === 'symptoms' && <SymptomsPage lang={lang} T={T} go={go} />}
      {page === 'doctors' && <DoctorsPage lang={lang} T={T} go={go} initSpec={pageData?.specialty} />}
      {page === 'doctor-profile' && <DoctorProfilePage d={pageData} lang={lang} T={T} go={go} showToast={showToast} />}
      {page === 'booking' && <BookingPage doctor={pageData} lang={lang} T={T} go={go} showToast={showToast} user={currentUser} />}
      {page === 'medicines' && <MedicinesPage lang={lang} T={T} />}
      {page === 'records' && <RecordsPage lang={lang} T={T} user={currentUser} go={go} />}
      {page === 'opinion' && <SecondOpinionPage lang={lang} T={T} showToast={showToast} user={currentUser} go={go} />}
      {page === 'bookings' && <BookingsPage lang={lang} T={T} go={go} user={currentUser} showToast={showToast} />}

      {/* ════════ FOOTER ════════ */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="logo-mark" style={{ width: 36, height: 36, fontSize: 16 }}>M</div>
                <span style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>Medi<span style={{ color: 'var(--accent)' }}>Find</span></span>
              </div>
              <p>India's first unified healthcare navigation platform. Built for Surat, designed for every Indian city.</p>
            </div>
            <div>
              <div className="footer-col-title">Platform</div>
              <ul className="footer-links">
                <li className="footer-link" onClick={() => go('symptoms')}>Symptom Checker</li>
                <li className="footer-link" onClick={() => go('doctors')}>Find Doctors</li>
                <li className="footer-link" onClick={() => go('medicines')}>Medicine Prices</li>
                <li className="footer-link" onClick={() => go('records')}>Health Records</li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Services</div>
              <ul className="footer-links">
                <li className="footer-link" onClick={() => go('opinion')}>Second Opinion</li>
                <li className="footer-link">Emergency QR</li>
                <li className="footer-link">ABHA Integration</li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Legal</div>
              <ul className="footer-links">
                <li className="footer-link">Privacy Policy</li>
                <li className="footer-link">Terms of Service</li>
                <li className="footer-link">DPDP Act 2023</li>
                <li className="footer-link" style={{ color: 'var(--accent)', marginTop: 8 }} onClick={() => setIsDoctor(true)}>Provider Login →</li>
                <li className="footer-link" style={{ color: '#f59e0b', marginTop: 4 }} onClick={() => setIsAdmin(true)}>Admin Panel →</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 MediFind. All rights reserved.</span>
            <span>⚕️ For informational purposes only. Always consult a qualified healthcare professional.</span>
          </div>
        </div>
      </footer>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   LANDING PAGE
══════════════════════════════════════════════════════════ */
function LandingPage({ lang, T, go }) {
  const [stats, setStats] = useState({});
  useEffect(() => { api.fetchStats().then(setStats).catch(() => { }); }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-grid">
            <div className="hero-left">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                {T('hero_badge', 'Built for Surat, Gujarat · India')}
              </div>
              <h1 className="hero-title">
                {T('hero_t1', 'Navigate Healthcare')}<br />
                <span className="hero-gradient">{T('hero_t2', 'Like an Informed Adult')}</span>
              </h1>
              <p className="hero-subtitle">
                {T('hero_sub', 'Find the right specialist, get affordable second opinions, compare medicine prices, and keep all your health records in one place — in your language.')}
              </p>
              <div className="hero-cta">
                <button className="btn btn-accent btn-lg" onClick={() => go('symptoms')}>
                  {T('hero_cta1', 'Check Symptoms')} →
                </button>
                <button className="btn btn-outline-white btn-lg" onClick={() => go('doctors')}>
                  {T('hero_cta2', 'Find Doctors')}
                </button>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-stat-card">
                <span className="stat-icon">👨‍⚕️</span>
                <div className="stat-body">
                  <div className="stat-value">{stats.totalDoctors || '15'}+</div>
                  <div className="stat-label">{T('stat_doctors', 'Verified Doctors in Surat')}</div>
                </div>
              </div>
              <div className="hero-stat-card">
                <span className="stat-icon">🏥</span>
                <div className="stat-body">
                  <div className="stat-value">{stats.totalSpecialties || '15'}</div>
                  <div className="stat-label">{T('stat_specs', 'Medical Specialties Covered')}</div>
                </div>
              </div>
              <div className="hero-stat-card">
                <span className="stat-icon">💊</span>
                <div className="stat-body">
                  <div className="stat-value">90%</div>
                  <div className="stat-label">{T('stat_save', 'Savings with Generic Medicines')}</div>
                </div>
              </div>
              <div className="hero-stat-card">
                <span className="stat-icon">🚫</span>
                <div className="stat-body">
                  <div className="stat-value">Zero</div>
                  <div className="stat-label">{T('stat_paid', 'Paid Rankings — Merit Only')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Wave SVG */}
        <div className="hero-wave">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 32C240 64 480 80 720 64C960 48 1200 16 1440 32V80H0Z" fill="#F7FAFB" />
          </svg>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">✨ Features</div>
            <h2 className="section-title">{T('feat_title', 'Everything a Patient Needs. One Platform.')}</h2>
            <p className="section-subtitle">{T('feat_sub', 'Six powerful tools that give you clarity, control, and confidence over your healthcare journey.')}</p>
          </div>
          <div className="features-grid">
            {[
              ['🤖', T('f1_t', 'AI Symptom Router'), T('f1_d', "Don't know which doctor you need? Describe your symptoms in your own words and we'll guide you to the right specialist."), 'symptoms'],
              ['🏥', T('f2_t', 'Verified Doctor Directory'), T('f2_d', 'Every doctor in Surat manually verified with NMC registration. Rankings based on merit only — zero paid placement.'), 'doctors'],
              ['💊', T('f3_t', 'Medicine Price Comparison'), T('f3_d', 'See branded vs generic vs Jan Aushadhi prices side by side. Save up to 90% on your monthly medicine bill.'), 'medicines'],
              ['📋', T('f4_t', 'ABHA Health Records'), T('f4_d', 'Your complete medical history in one place, linked with your ABHA Health ID. Share with any doctor in one tap.'), 'records'],
              ['🩺', T('f5_t', '₹199 Second Opinion'), T('f5_d', 'Get an independent specialist review of your diagnosis within 24 hours. No travel needed, no expensive hospital visits.'), 'opinion'],
              ['🌐', T('f6_t', 'Gujarati + English'), T('f6_d', 'Full platform in Gujarati from day one. Because healthcare understanding should never be lost in translation.'), null],
            ].map(([emoji, title, desc, link], i) => (
              <div key={i} className="feature-card" onClick={() => link && go(link)}>
                <span className="feature-emoji">{emoji}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-label">🔄 How It Works</div>
            <h2 className="section-title">{T('how_title', 'From Symptom to Solution in 4 Steps')}</h2>
          </div>
          <div className="steps-grid">
            {[
              ['1', '🤒', T('s1_t', 'Describe Symptoms'), T('s1_d', 'Type what you feel in plain language — in English or Gujarati.')],
              ['2', '🤖', T('s2_t', 'Get Specialist Match'), T('s2_d', 'Our AI router matches you to the right type of specialist instantly.')],
              ['3', '📅', T('s3_t', 'Book Appointment'), T('s3_d', 'Pick a verified doctor, book a visit, and share your ABHA records.')],
              ['4', '✅', T('s4_t', 'Get Better'), T('s4_d', 'Your records are saved. Get second opinions. Compare medicine prices.')],
            ].map(([num, emoji, title, desc], i) => (
              <div key={i} className="step-card">
                <div className="step-num">{num}</div>
                <h4>{emoji} {title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-header">
            <div className="section-label">🚀 Get Started</div>
            <h2 className="section-title">{T('cta_title', 'Your Health Deserves Better Navigation')}</h2>
            <p className="section-subtitle">{T('cta_sub', 'Join thousands of patients in Surat who are making informed healthcare decisions.')}</p>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => go('symptoms')}>
              {T('cta_btn1', 'Check Symptoms Now')} →
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => go('doctors')}>
              {T('cta_btn2', 'Browse Doctors')}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   SYMPTOMS PAGE
══════════════════════════════════════════════════════════ */
function SymptomsPage({ lang, T, go }) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const isGu = lang === 'gu';

  const check = async (txt) => {
    const q = txt || input;
    if (!q.trim()) return;
    setInput(q);
    setLoading(true);
    const data = await api.checkSymptoms(q);
    setResult({ ...data, query: q });
    setLoading(false);
  };

  const chips = ['Chest pain', 'Headache', 'Knee pain', 'Back pain', 'Blurry vision', 'Skin rash', 'Stomach pain', 'Neck pain', 'Anxiety', 'Fever'];

  return (
    <div className="page">
      <div className="container">
        <div className="section-header" style={{ marginBottom: 32 }}>
          <div className="section-label">🤖 AI Powered</div>
          <h2 className="section-title">{T('sym_title', 'Symptom-to-Specialist Router')}</h2>
          <p className="section-subtitle">{T('sym_sub', 'Describe how you\'re feeling and we\'ll recommend the right type of specialist to see.')}</p>
        </div>

        <div className="symptom-section">
          <div className="symptom-input-row">
            <input className="input-xl" value={input} onChange={e => setInput(e.target.value)}
              placeholder={T('sym_ph', 'e.g. neck pain with tingling in right hand...')}
              onKeyDown={e => e.key === 'Enter' && check()} />
            <button className="btn btn-primary" onClick={() => check()} disabled={loading}>
              {loading ? 'Analyzing...' : (T('sym_btn', 'Find Doctor →'))}
            </button>
          </div>

          <div className="chip-label">{T('sym_try', 'Common complaints:')}</div>
          <div className="chips">
            {chips.map(c => <button key={c} className="chip" onClick={() => check(c)}>{c}</button>)}
          </div>

          {/* Result */}
          {result && !loading && (
            <div className="result-card">
              <div className="result-query">
                You described: <strong>"{result.query}"</strong>
              </div>
              <div className="suggest-title">{T('sym_suggest', 'We suggest you see:')}</div>
              {result.specialists?.map((s, i) => {
                const spec = specMap[s] || { emoji: '👨‍⚕️', color: '#0A7B9E', bg: '#E5F4F9' };
                return (
                  <div key={i}>
                    {i > 0 && <div className="or-divider">OR</div>}
                    <div className="suggest-item" style={{ background: spec.bg }}
                      onClick={() => go('doctors', { specialty: s })}>
                      <div className="suggest-dot" style={{ background: spec.color }} />
                      <div>
                        <div className="suggest-name">{isGu ? (result.specialistsGu?.[i] || s) : s}</div>
                        <div className="suggest-desc">{spec.emoji} Specialist</div>
                      </div>
                      <span className="suggest-arrow">→</span>
                    </div>
                  </div>
                );
              })}
              {result.explanation && (
                <div className="tip-box">
                  💡 {isGu ? result.explanationGu : result.explanation}
                </div>
              )}
              <div style={{ display: 'flex', gap: 8, marginTop: 24, flexWrap: 'wrap' }}>
                {result.specialists?.map(s => (
                  <button key={s} className="btn btn-primary btn-sm" onClick={() => go('doctors', { specialty: s })}>
                    Find {s}s in Surat →
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   DOCTORS PAGE
══════════════════════════════════════════════════════════ */
function DoctorsPage({ lang, T, go, initSpec }) {
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [filters, setFilters] = useState({ specialty: initSpec || 'all', locality: 'all', sort: 'merit', search: '' });
  const [total, setTotal] = useState(0);
  const isGu = lang === 'gu';

  useEffect(() => {
    api.fetchSpecialties().then(d => setSpecialties(d.specialties));
    api.fetchLocalities().then(d => setLocalities(d.localities));
  }, []);

  useEffect(() => {
    api.fetchDoctors(filters).then(d => { setDoctors(d.doctors); setTotal(d.total); });
  }, [filters]);

  return (
    <div className="page">
      <div className="container">
        <div className="page-head">
          <h1>{T('doc_title', '🏥 Find Verified Doctors in Surat')}</h1>
          <p>{T('doc_sub', 'Every doctor manually verified. Rankings based on merit only — zero paid placement.')}</p>
        </div>

        <div className="filter-bar">
          <select className="filter-select" value={filters.specialty} onChange={e => setFilters({ ...filters, specialty: e.target.value })}>
            <option value="all">{T('flt_spec', 'All Specialties')}</option>
            {specialties.map(s => <option key={s} value={s}>{isGu && specMap[s]?.gu ? specMap[s].gu : s}</option>)}
          </select>
          <select className="filter-select" value={filters.locality} onChange={e => setFilters({ ...filters, locality: e.target.value })}>
            <option value="all">{T('flt_loc', 'All Localities')}</option>
            {localities.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <select className="filter-select" value={filters.sort} onChange={e => setFilters({ ...filters, sort: e.target.value })}>
            <option value="merit">{T('srt_merit', 'Sort: Merit Score')}</option>
            <option value="fee-low">{T('srt_low', 'Sort: Fee (Low → High)')}</option>
            <option value="fee-high">{T('srt_high', 'Sort: Fee (High → Low)')}</option>
            <option value="experience">{T('srt_exp', 'Sort: Experience')}</option>
          </select>
          <input className="filter-search" value={filters.search} onChange={e => setFilters({ ...filters, search: e.target.value })}
            placeholder={T('doc_search', 'Search doctors by name...')} />
        </div>

        <div className="result-count">{total} {isGu ? 'ડૉક્ટર મળ્યા' : 'doctors found'}</div>

        <div className="doctors-grid">
          {doctors.map(d => {
            const spec = specMap[d.specialty] || {};
            const meritScore = d.rating ? (d.rating * 0.4 + (d.verified ? 1 : 0) * 5 * 0.2 + Math.min(d.experience / 20, 1) * 5 * 0.2 + 4.5 * 0.2).toFixed(1) : '4.5';
            return (
              <div key={d.id} className="doctor-card" onClick={() => go('doctor-profile', d)}>
                <div className="doctor-top">
                  <div className="doctor-avatar"><img src={d.photo} alt={d.name} /></div>
                  <div>
                    <div className="doctor-name">{isGu ? d.nameGu : d.name}</div>
                    <span className="spec-chip" style={{ background: spec.bg, color: spec.color }}>
                      {isGu ? d.specialtyGu : d.specialty}
                    </span>
                    {d.verified && <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#ecfdf5', color: '#059669', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700, marginTop: 4 }}>✅ NMC Verified · {d.nmcId}</div>}
                  </div>
                </div>
                <div className="doctor-meta">
                  <span>📍 {d.address?.split(',').slice(-2).join(',').trim()}</span>
                  <span>⏱ {d.experience} {T('doc_yrs', 'years')} · 🗣 {d.languages.join(', ')}</span>
                  <span>🕐 {d.timings}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderTop: '1px solid var(--border)', marginTop: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ background: 'linear-gradient(135deg,#1C52A0,#2563eb)', color: 'white', padding: '2px 8px', borderRadius: 6, fontWeight: 800, fontSize: 14 }}>{meritScore}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Merit Score</span>
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>⭐ {d.rating} ({d.reviewCount} reviews)</span>
                </div>
                <div className="doctor-bottom">
                  <div className="doctor-fee">₹{d.fee} <span>{T('doc_cons', 'consultation')}</span></div>
                  <button className="btn btn-primary btn-sm" onClick={e => { e.stopPropagation(); go('booking', d); }}>
                    {T('doc_book_btn', 'Book →')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   DOCTOR PROFILE PAGE
══════════════════════════════════════════════════════════ */
function DoctorProfilePage({ d, lang, T, go, showToast }) {
  const isGu = lang === 'gu';
  const spec = specMap[d.specialty] || {};
  const meritScore = d.rating ? (d.rating * 0.4 + (d.verified ? 1 : 0) * 5 * 0.2 + Math.min(d.experience / 20, 1) * 5 * 0.2 + 4.5 * 0.2).toFixed(1) : '4.5';
  const mockReviews = [
    { name: 'Suresh P.', date: 'Mar 2026', overall: 5, waitTime: 4, clarity: 5, staff: 5, value: 5, text: 'Very thorough explanation. Doctor spent quality time understanding my condition.' },
    { name: 'Meena B.', date: 'Feb 2026', overall: 4, waitTime: 3, clarity: 5, staff: 4, value: 4, text: 'Good doctor. Wait time was a bit long but consultation was excellent.' },
    { name: 'Ketan D.', date: 'Jan 2026', overall: 5, waitTime: 5, clarity: 5, staff: 5, value: 5, text: 'Best in Surat for this specialty. Highly recommend!' },
  ];
  return (
    <>
      <section className="profile-hero">
        <div className="container">
          <div className="profile-hero-inner">
            <div className="profile-photo"><img src={d.photo} alt={d.name} /></div>
            <div>
              <div className="profile-name-lg">{isGu ? d.nameGu : d.name}</div>
              <div className="profile-spec">{isGu ? d.specialtyGu : d.specialty} · {d.qualification}</div>
              {d.verified && <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(5,150,105,0.15)', color: '#059669', padding: '4px 12px', borderRadius: 8, fontSize: 13, fontWeight: 700, marginTop: 6 }}>✅ NMC Verified · {d.nmcId}</div>}
              <div className="profile-chips">
                <span className="profile-chip">₹{d.fee} {T('prof_fee', 'Fee')}</span>
                <span className="profile-chip">⏱ {d.experience} {T('prof_yrs', 'years')}</span>
                <span className="profile-chip">🗣 {d.languages.join(', ')}</span>
                <span className="profile-chip" style={{ background: 'linear-gradient(135deg,#1C52A0,#2563eb)', color: 'white', fontWeight: 800 }}>🏆 {meritScore} Merit</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="profile-body">
        <div className="container">
          <div className="profile-grid">
            <div>
              <div className="profile-section">
                <div className="profile-section-title">{T('pr_abt', 'About')}</div>
                <p className="profile-text">{isGu ? d.aboutGu : d.about}</p>
              </div>
              <div className="profile-section">
                <div className="profile-section-title">{T('pr_adr', 'Clinic Address')}</div>
                <p className="profile-text">{d.address}</p>
              </div>
              <div className="profile-section">
                <div className="profile-section-title">{T('pr_time', 'Timings')}</div>
                <p className="profile-text">{d.timings}</p>
                <p className="profile-text" style={{ color: 'var(--text-muted)', fontSize: 13 }}>{T('pr_sun', 'Sunday — Closed')}</p>
              </div>
              {/* Merit Score Breakdown */}
              <div className="profile-section">
                <div className="profile-section-title">🏆 Merit Score Breakdown</div>
                <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[['Patient Reviews (40%)', d.rating, '#f59e0b'], ['NMC Verification (20%)', d.verified ? 5 : 0, '#059669'], ['Profile Completeness (20%)', 4.5, '#3b82f6'], ['Response Rate (20%)', 4.5, '#8b5cf6']].map(([label, val, color]) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ flex: 1, fontSize: 13 }}>{label}</div>
                      <div style={{ width: 120, height: 6, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}><div style={{ width: `${(val / 5) * 100}%`, height: '100%', background: color, borderRadius: 3 }} /></div>
                      <div style={{ fontSize: 13, fontWeight: 700, width: 30, textAlign: 'right' }}>{val}/5</div>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: 8, marginTop: 4, fontSize: 12, color: 'var(--text-muted)' }}>⚖️ No paid promotions. Rankings are 100% merit-based.</div>
                </div>
              </div>
              {/* Verified Reviews */}
              <div className="profile-section">
                <div className="profile-section-title">⭐ Verified Patient Reviews ({d.reviewCount})</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {mockReviews.map((rv, i) => (
                    <div key={i} style={{ background: '#f8fafc', borderRadius: 12, padding: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <div style={{ fontWeight: 700 }}>{rv.name} <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 400 }}>· Verified Patient</span></div>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{rv.date}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                        {[['Overall', rv.overall], ['Wait Time', rv.waitTime], ['Clarity', rv.clarity], ['Staff', rv.staff], ['Value', rv.value]].map(([l, v]) => (
                          <span key={l} style={{ fontSize: 11, background: v >= 4 ? '#ecfdf5' : '#fef3c7', color: v >= 4 ? '#059669' : '#b45309', padding: '2px 6px', borderRadius: 4 }}>{l}: {'⭐'.repeat(v)}</span>
                        ))}
                      </div>
                      <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>"{rv.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="profile-sidebar-card">
                <div className="sidebar-fee">₹{d.fee}</div>
                <div className="sidebar-label">{T('pr_cfee', 'Consultation Fee')}</div>
                <button className="btn btn-primary btn-full" onClick={() => go('booking', d)}>
                  {T('book', 'Book Appointment')} →
                </button>
                <button className="btn btn-outline btn-full" onClick={() => go('doctors')} style={{ marginTop: 8 }}>
                  {T('pr_back', '← Back to Doctors')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   BOOKING PAGE
══════════════════════════════════════════════════════════ */
function BookingPage({ doctor, lang, T, go, showToast }) {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [concern, setConcern] = useState('');
  const [share, setShare] = useState(false);
  const [result, setResult] = useState(null);
  const isGu = lang === 'gu';
  const d = doctor;
  const times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'];

  const dates = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) { const dt = new Date(today); dt.setDate(today.getDate() + i); dates.push(dt); }
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const submit = async () => {
    const res = await api.bookAppointment({
      doctorId: d.id, patientName: 'Rameshbhai Patel', phone: '+91 98765 43210',
      date, time, concern, shareRecords: share,
    });
    setResult(res.appointment);
    setStep(3);
  };

  if (step === 3 && result) {
    return (
      <div className="page">
        <div className="container-sm">
          <div className="confirm-card">
            <div className="confirm-icon">✅</div>
            <div className="confirm-title">{T('booked', 'Appointment Requested!')}</div>
            <div className="confirm-detail" style={{ fontWeight: 600, fontSize: 17 }}>{result.doctorName}</div>
            <div className="confirm-detail">{result.date} · {result.time}</div>
            <div className="confirm-detail">{result.clinicAddress}</div>
            <div className="confirm-note">{T('whatsapp', "You'll get a WhatsApp confirmation once the clinic confirms. Usually within 4 hours.")}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 24, flexDirection: 'column' }}>
              <button className="btn btn-primary" onClick={() => go('bookings')}>View My Bookings</button>
              <button className="btn btn-ghost" onClick={() => go('home')}>← Back to Home</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="booking-layout">
          <div className="booking-card">
            {/* Step 0: Date */}
            {step === 0 && (
              <>
                <div className="booking-step">{T('bk_s1', 'Step 1 of 3')}</div>
                <div className="booking-title">{T('sel_date', 'Select a Date')}</div>
                <div className="booking-desc">{T('bk_d1', 'Choose when you\'d like to visit.')}</div>
                <div style={{ marginBottom: 24 }}>
                  <div className="date-grid">
                    {dayNames.map(d => <div key={d} className="date-header">{T(`day_${d}`, d)}</div>)}
                    {dates.map((dt, i) => {
                      const val = dt.toISOString().split('T')[0];
                      return (
                        <button key={val} className={`date-cell ${date === val ? 'selected' : ''} ${i === 0 ? 'today' : ''}`}
                          onClick={() => setDate(val)}>
                          {dt.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {date && (
                  <>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{T('bk_time', 'Select a Time')}</div>
                    <div className="time-slots">
                      {times.map(t => <button key={t} className={`time-slot ${time === t ? 'selected' : ''}`} onClick={() => setTime(t)}>{t}</button>)}
                    </div>
                  </>
                )}
                <button className="btn btn-primary" disabled={!date || !time} onClick={() => setStep(1)} style={{ marginTop: 24 }}>
                  {T('ctn', 'Continue →')}
                </button>
              </>
            )}

            {/* Step 1: Concern */}
            {step === 1 && (
              <>
                <div className="booking-step">{T('bk_s2', 'Step 2 of 3')}</div>
                <div className="booking-title">{T('concern_t', 'What brings you in?')}</div>
                <div className="booking-desc">{T('concern_d', 'Briefly describe your concern. The doctor will see this before your visit.')}</div>
                <textarea className="input-xl" value={concern} onChange={e => setConcern(e.target.value)}
                  placeholder={T('bk_ph', 'e.g. Neck pain for 3 weeks with tingling in my right hand fingers...')}
                  style={{ width: '100%', marginBottom: 8 }} />
                <div style={{ textAlign: 'right', fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>{concern.length} / 200</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-outline" onClick={() => setStep(0)} style={{ flex: 1 }}>{T('back', '← Back')}</button>
                  <button className="btn btn-primary" disabled={!concern.trim()} onClick={() => setStep(2)} style={{ flex: 2 }}>{T('ctn', 'Continue →')}</button>
                </div>
              </>
            )}

            {/* Step 2: Share ABHA */}
            {step === 2 && (
              <>
                <div className="booking-step">{T('bk_s3', 'Step 3 of 3')}</div>
                <div className="booking-title">{T('share_t', 'Share your health history?')}</div>
                <div className="share-card" style={{ boxShadow: 'none', padding: 0, marginBottom: 20 }}>
                  <div className="share-header"><div className="share-dot" /><span style={{ fontWeight: 600 }}>{T('bk_linked', 'Your ABHA records are linked')}</span></div>
                  <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, margin: '8px 0 16px' }}>
                    {T('bk_let', 'Let do')} {isGu ? d.nameGu : d.name} {T('bk_see', 'see your history before your appointment so they can prepare properly.')}
                  </p>
                  <div style={{ marginBottom: 16 }}>
                    <div className="share-check">{T('bk_alg', 'Your allergies')}</div>
                    <div className="share-check">{T('bk_med', 'Current medications')}</div>
                    <div className="share-check">{T('bk_lab', 'Recent lab reports (last 90 days)')}</div>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{T('bk_exp', 'Access expires after your visit. You can revoke anytime.')}</p>
                </div>
                <button className="btn btn-primary" onClick={() => { setShare(true); submit(); }} style={{ marginBottom: 8 }}>
                  {T('bk_yes', 'Yes, share my health history')}
                </button>
                <button className="btn btn-ghost" onClick={() => { setShare(false); submit(); }}>
                  {T('bk_no', 'No thanks, skip this →')}
                </button>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="booking-sidebar">
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, overflow: 'hidden', background: 'var(--primary-light)' }}>
                <img src={d.photo} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>{isGu ? d.nameGu : d.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{isGu ? d.specialtyGu : d.specialty}</div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
              {date && <div style={{ fontSize: 14, marginBottom: 4 }}>📅 {date}</div>}
              {time && <div style={{ fontSize: 14, marginBottom: 4 }}>⏰ {time}</div>}
              <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>📍 {d.address}</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginTop: 12 }}>₹{d.fee}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MEDICINES PAGE
══════════════════════════════════════════════════════════ */
function MedicinesPage({ lang, T }) {
  const [query, setQuery] = useState('');
  const [meds, setMeds] = useState([]);
  const isGu = lang === 'gu';
  useEffect(() => { api.searchMedicines(query).then(d => setMeds(d.medicines)); }, [query]);

  return (
    <div className="page">
      <div className="container">
        <div className="section-header" style={{ marginBottom: 32 }}>
          <div className="section-label">💊 Price Transparency</div>
          <h2 className="section-title">{T('med_title', 'Medicine Price Comparison')}</h2>
          <p className="section-subtitle">{T('med_sub', 'Compare branded vs generic vs Jan Aushadhi prices. See your real savings.')}</p>
        </div>
        <div className="medicine-search">
          <input className="input-xl" value={query} onChange={e => setQuery(e.target.value)}
            placeholder={T('med_ph', 'Search e.g. Metformin, Glycomet, Pan 40...')} style={{ width: '100%' }} />
        </div>
        <div className="med-grid">
          {meds.map(m => {
            const yearly = m.monthlySavings * 12;
            return (
              <div key={m.id} className="med-card">
                <div className="med-name">{isGu ? m.brandNameGu : m.brandName}</div>
                <div className="med-generic">{isGu ? m.genericGu : m.generic}</div>
                <div className="med-category">{isGu ? m.categoryGu : m.category} · {m.unit}</div>
                <div className="price-stack">
                  <div className="price-row branded">
                    <div><div className="price-label">{T('md_brd', 'Branded')}</div><div className="price-sub">₹{m.monthlyBrand}{T('md_mo', '/month')}</div></div>
                    <div className="price-value">₹{m.brandPrice}</div>
                  </div>
                  <div className="price-row generic">
                    <div><div className="price-label">{T('md_gnr', '🟢 Generic')}</div><div className="price-sub">₹{m.monthlyGeneric}{T('md_mo', '/month')}</div></div>
                    <div className="price-value" style={{ color: 'var(--accent-dark)' }}>₹{m.genericPrice}</div>
                  </div>
                  <div className="price-row jan">
                    <div><div className="price-label">{T('md_jan', '🏪 Jan Aushadhi')}</div><div className="price-sub">₹{m.monthlyJanAushadhi}{T('md_mo', '/month')}</div></div>
                    <div><div className="price-value" style={{ color: 'var(--success)' }}>₹{m.janAushadhiPrice}</div>
                      <div className="price-save">{T('md_save', 'Save')} ₹{m.monthlySavings}{T('md_mo', '/mo')}</div>
                    </div>
                  </div>
                </div>
                <div className="yearly-box">
                  <div className="yearly-amount">₹{yearly.toLocaleString()}</div>
                  <div className="yearly-label">💰 {T('md_yrsv', 'Your yearly saving if you switch')}</div>
                </div>
                <div className="med-disclaimer">
                  <span>⚠️</span>
                  <span>{T('md_warn', 'Always consult your doctor before switching to a generic medicine.')}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ═══ PHASE 5: Jan Aushadhi Store Locator ═══ */}
        <div style={{ marginTop: 40 }}>
          <div className="section-header" style={{ marginBottom: 24 }}>
            <div className="section-label">🏪 Near You</div>
            <h2 className="section-title">{T('jan_title', 'Jan Aushadhi Stores in Surat')}</h2>
            <p className="section-subtitle">{T('jan_sub', 'Government-subsidized pharmacies with medicines at up to 90% off MRP.')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
            {[
              { name: 'Jan Aushadhi Kendra - Adajan', address: 'Shop 3, Shreeji Complex, Adajan Gam Rd, Surat', phone: '0261-2789456', distance: '1.2 km', hours: '8 AM - 9 PM' },
              { name: 'PMBJP Store - Ring Road', address: 'Near Jolly Residency, Ring Road, Surat', phone: '0261-2345678', distance: '2.8 km', hours: '9 AM - 10 PM' },
              { name: 'Jan Aushadhi - Varachha', address: 'Shop 7, Patel Chambers, Varachha Main Rd', phone: '0261-2891234', distance: '3.5 km', hours: '8 AM - 8 PM' },
              { name: 'PMBJP - Athwa', address: 'GF-4, Shivam Tower, Athwa Gate, Surat', phone: '0261-2456789', distance: '4.1 km', hours: '9 AM - 9 PM' },
              { name: 'Jan Aushadhi - Katargam', address: '102, Mahavir Complex, Katargam, Surat', phone: '0261-2567890', distance: '5.2 km', hours: '8 AM - 8 PM' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{s.name}</div>
                  <span style={{ background: '#ecfdf5', color: '#059669', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>{s.distance}</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>📍 {s.address}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>📞 {s.phone} · 🕐 {s.hours}</div>
                <button className="btn btn-outline btn-sm" style={{ marginTop: 4, alignSelf: 'flex-start' }}>Get Directions →</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   HEALTH RECORDS PAGE
══════════════════════════════════════════════════════════ */
function RecordsPage({ lang, T }) {
  const [data, setData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [algInput, setAlgInput] = useState('');
  const [condInput, setCondInput] = useState('');
  const [medInput, setMedInput] = useState('');

  const isGu = lang === 'gu';
  useEffect(() => {
    api.fetchHealthRecords().then(res => {
      setData(res);
      setAlgInput(res.allergies.join(', '));
      setCondInput(res.conditions.join(', '));
      setMedInput(res.currentMeds.join(', '));
    });
  }, []);

  if (!data) return <div className="page"><div className="container"><p>Loading...</p></div></div>;

  const icons = { 'Blood Report': '🧪', 'Prescription': '📄', 'X-Ray': '🩻', 'Lab Report': '🧪', 'Discharge Summary': '🏥' };

  const handleSaveProfile = () => {
    setData({
      ...data,
      allergies: algInput.split(',').map(s => s.trim()).filter(Boolean),
      conditions: condInput.split(',').map(s => s.trim()).filter(Boolean),
      currentMeds: medInput.split(',').map(s => s.trim()).filter(Boolean),
    });
    setEditMode(false);
  };

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      const newRec = {
        id: Date.now(),
        type: 'Blood Report', typeGu: 'લોહીનો રિપોર્ટ',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        doctor: 'Dr. Self Uploaded',
        facility: 'Manual Upload (PDF)'
      };
      setData({ ...data, records: [newRec, ...data.records] });
      setUploading(false);
    }, 1000);
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1>{T('rec_title', '📋 ABHA Health Records')}</h1>
            <p>{T('rec_sub', 'Your complete medical history linked with ABHA Health ID.')}</p>
          </div>
          <button className="btn btn-primary" onClick={handleUpload} disabled={uploading}>
            {uploading ? 'Uploading...' : '📤 Upload Document'}
          </button>
        </div>

        <div className="abha-hero">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 800 }}>{isGu ? data.patientNameGu : data.patientName}</div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 4 }}>{T('rc_lkd', '🟢 ABHA Health ID Linked')}</p>
            </div>
            {!editMode && <button className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }} onClick={() => setEditMode(true)}>✏️ Edit Profile</button>}
          </div>
          <span className="abha-badge" style={{ marginBottom: 20, display: 'inline-block' }}>ABHA: {data.abhaId}</span>

          {editMode ? (
            <div className="abha-grid" style={{ width: '100%', background: 'white', color: 'black', padding: 16, borderRadius: 12 }}>
              <div className="form-group">
                <label className="form-label" style={{ color: '#64748b' }}>Allergies (comma separated)</label>
                <input className="form-input" value={algInput} onChange={e => setAlgInput(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ color: '#64748b' }}>Chronic Conditions</label>
                <input className="form-input" value={condInput} onChange={e => setCondInput(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ color: '#64748b' }}>Current Medications</label>
                <input className="form-input" value={medInput} onChange={e => setMedInput(e.target.value)} />
              </div>
              <button className="btn btn-primary" onClick={handleSaveProfile}>Save Health Profile</button>
            </div>
          ) : (
            <div className="abha-grid" style={{ width: '100%' }}>
              <div className="abha-item"><div className="abha-item-label">{T('rc_bdg', 'Blood Group')}</div><div className="abha-item-value">🩸 {data.bloodGroup}</div></div>
              <div className="abha-item"><div className="abha-item-label">{T('rc_alg', 'Allergies')}</div><div className="abha-item-value">⚠️ {data.allergies.length ? (isGu ? data.allergiesGu || data.allergies : data.allergies).join(', ') : 'None'}</div></div>
              <div className="abha-item"><div className="abha-item-label">{T('rc_cnd', 'Conditions')}</div><div className="abha-item-value">💊 {data.conditions.length ? (isGu ? data.conditionsGu || data.conditions : data.conditions).join(', ') : 'None'}</div></div>
              <div className="abha-item"><div className="abha-item-label">{T('rc_med', 'Current Meds')}</div><div className="abha-item-value">💉 {data.currentMeds.length ? data.currentMeds.join(', ') : 'None'}</div></div>
            </div>
          )}
        </div>

        {/* ═══ PHASE 3: Emergency QR Code ═══ */}
        <div style={{ marginTop: 32, marginBottom: 32 }}>
          <div className="card" style={{ background: 'linear-gradient(135deg,#dc2626,#b91c1c)', color: 'white', padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 20 }}>🆘 Emergency Medical QR</h3>
              <p style={{ margin: '8px 0 0', opacity: 0.85, fontSize: 14 }}>Scannable by any phone camera — shows critical info without login.</p>
            </div>
            <button className="btn" style={{ background: 'white', color: '#dc2626', fontWeight: 700, border: 'none' }} onClick={() => {
              const qrData = `MEDIFIND EMERGENCY\nName: ${data.patientName}\nBlood: ${data.bloodGroup}\nAllergies: ${data.allergies.join(', ')}\nConditions: ${data.conditions.join(', ')}\nMeds: ${data.currentMeds.join(', ')}\nABHA: ${data.abhaId}\nCall: 112`;
              const w = window.open('', '_blank', 'width=400,height=500');
              w.document.write(`<html><head><title>Emergency QR</title><style>body{font-family:sans-serif;text-align:center;padding:20px}h2{color:#dc2626}.info{text-align:left;background:#fef2f2;padding:16px;border-radius:12px;margin:16px 0;font-size:14px;line-height:1.8}</style></head><body><h2>🆘 MediFind Emergency Card</h2><div style="background:#f1f5f9;padding:24px;border-radius:12px;margin:16px 0"><svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="white" rx="8"/><text x="100" y="90" text-anchor="middle" font-size="40">📱</text><text x="100" y="120" text-anchor="middle" font-size="10" fill="#666">QR Code</text><text x="100" y="140" text-anchor="middle" font-size="8" fill="#999">(Production: real QR)</text></svg></div><div class="info"><strong>Name:</strong> ${data.patientName}<br/><strong>Blood Group:</strong> 🩸 ${data.bloodGroup}<br/><strong>Allergies:</strong> ⚠️ ${data.allergies.join(', ')}<br/><strong>Conditions:</strong> 💊 ${data.conditions.join(', ')}<br/><strong>Meds:</strong> 💉 ${data.currentMeds.join(', ')}<br/><strong>ABHA:</strong> ${data.abhaId}<br/><strong>Emergency:</strong> 📞 112</div><p style="color:#666;font-size:12px">Generated by MediFind · ${new Date().toLocaleDateString()}</p></body></html>`);
            }}>Generate Emergency QR →</button>
          </div>
        </div>

        <div className="timeline" style={{ marginTop: 0 }}>
          <h3 style={{ marginBottom: 20 }}>Chronological History</h3>
          <div style={{ borderLeft: '2px solid var(--border)', marginLeft: 20, paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {data.records.map(r => (
              <div key={r.id} className="record-card" style={{ position: 'relative', margin: 0 }}>
                <div style={{ position: 'absolute', left: -43, top: 16, width: 36, height: 36, background: 'white', border: '2px solid var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, zIndex: 2 }}>
                  {icons[r.type] || '📄'}
                </div>
                <div className="rec-body">
                  <div className="rec-title">{isGu ? r.typeGu : r.type} — {r.doctor}</div>
                  <div className="rec-meta">{r.facility} · {r.date}</div>
                </div>
                <span className="rec-arrow">{T('rc_view', 'View →')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SECOND OPINION PAGE
══════════════════════════════════════════════════════════ */
function SecondOpinionPage({ lang, T, showToast }) {
  const [urgency, setUrgency] = useState('standard');
  const [confirm, setConfirm] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const f = e.target;
    const res = await api.submitSecondOpinion({
      patientName: f.pName.value, phone: f.pPhone.value,
      diagnosis: f.diag.value, treatment: f.treat.value,
      hospital: f.hosp.value, urgency, notes: f.notes.value,
    });
    setConfirm(res.opinion);
    showToast(T('submitted', '✅ Submitted!'));
  };

  if (confirm) {
    return (
      <div className="page">
        <div className="container-sm">
          <div className="confirm-card">
            <div className="confirm-icon">✅</div>
            <div className="confirm-title">Second Opinion Submitted!</div>
            <div className="confirm-detail">Reference: <strong>#SO-{confirm.id}</strong></div>
            <div className="confirm-detail">Delivery: <strong>{confirm.estimatedDelivery}</strong></div>
            <div className="confirm-detail">Amount: <strong>₹{confirm.amount}</strong></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container-sm">
        <div className="section-header" style={{ marginBottom: 32 }}>
          <div className="section-label">🩺 Expert Review</div>
          <h2 className="section-title">{T('so_title', 'Get a Second Opinion')}</h2>
          <p className="section-subtitle">{T('so_sub', 'Independent specialist reviews your diagnosis. Structured report within 24 hours. Starting at ₹199.')}</p>
        </div>

        <div className="so-options">
          <div className={`so-option ${urgency === 'standard' ? 'active' : ''}`} onClick={() => setUrgency('standard')}>
            <div className="so-price">₹199</div>
            <div className="so-label">{T('so_std', 'Standard')}</div>
            <div className="so-time">{T('so_t24', 'Report in 24 hours')}</div>
          </div>
          <div className={`so-option ${urgency === 'urgent' ? 'active' : ''}`} onClick={() => setUrgency('urgent')}>
            <div className="so-price">₹499</div>
            <div className="so-label">{T('so_urg', 'Urgent')}</div>
            <div className="so-time">{T('so_t12', 'Report in 12 hours')}</div>
          </div>
        </div>

        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group"><label className="form-label">{T('so_name', 'Your Name')}</label><input className="form-input" name="pName" required placeholder={T('so_p1', 'Full name')} /></div>
              <div className="form-group"><label className="form-label">{T('so_phone', 'Phone')}</label><input className="form-input" name="pPhone" type="tel" required placeholder="+91 98765 43210" /></div>
              <div className="form-group full"><label className="form-label">{T('so_diag', 'Original Diagnosis')}</label><input className="form-input" name="diag" required placeholder={T('so_p2', 'e.g. Lumbar disc herniation L4-L5')} /></div>
              <div className="form-group full"><label className="form-label">{T('so_treat', 'Recommended Treatment')}</label><input className="form-input" name="treat" required placeholder={T('so_p3', 'e.g. Spinal surgery recommended, cost ₹4.5 lakh')} /></div>
              <div className="form-group"><label className="form-label">{T('so_hosp', 'Hospital / Doctor')}</label><input className="form-input" name="hosp" placeholder={T('so_p4', 'e.g. Sterling Hospital')} /></div>
              <div className="form-group"><label className="form-label">{T('so_note', 'Additional Notes')}</label><textarea className="form-input" name="notes" rows="3" placeholder={T('so_p5', 'Any additional details...')} /></div>
            </div>
            <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: 24 }}>{T('so_subBtn', 'Submit for Second Opinion →')}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   BOOKINGS PAGE
══════════════════════════════════════════════════════════ */
function BookingsPage({ lang, T, go, showToast }) {
  const [appts, setAppts] = useState([]);
  const [reload, setReload] = useState(0);
  useEffect(() => { api.fetchAppointments().then(d => setAppts(d.appointments)); }, [reload]);

  const cancelAppt = async (id) => {
    await api.updateAppointmentStatus(id, 'Cancelled');
    showToast('❌ Appointment cancelled successfully.');
    setReload(r => r + 1);
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-head">
          <h1>📅 {T('my_bks', 'My Bookings')}</h1>
          <p>{T('my_sub', 'Your upcoming and past appointments.')}</p>
        </div>
        {appts.length === 0 ? (
          <div className="appt-empty">
            <div className="appt-empty-icon">📅</div>
            <p style={{ fontSize: 18, marginBottom: 16 }}>{T('my_no', 'No bookings yet')}</p>
            <button className="btn btn-primary" onClick={() => go('doctors')}>{T('my_find', 'Find a Doctor →')}</button>
          </div>
        ) : (
          <div className="appts-grid">
            {appts.map(a => (
              <div key={a.id} className="appt-card">
                <div className="appt-body">
                  <div className="appt-doctor">{a.doctorName}</div>
                  <div className="appt-spec">{a.doctorSpecialty}</div>
                  <div className="appt-detail">📅 {a.date} · ⏰ {a.time}</div>
                  <div className="appt-detail">📍 {a.clinicAddress}</div>
                  {a.concern && <div className="appt-detail" style={{ marginTop: 4 }}>💬 {a.concern}</div>}
                  {a.shareRecords && <div style={{ fontSize: 12, color: 'var(--success)', marginTop: 4 }}>📋 ABHA records shared</div>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <span className="appt-status" style={{ background: a.status === 'Cancelled' ? '#fef2f2' : a.status === 'Confirmed' ? '#ecfdf5' : '#f8fafc', color: a.status === 'Cancelled' ? '#dc2626' : a.status === 'Confirmed' ? '#059669' : '#64748b' }}>{a.status}</span>
                  {a.status === 'Confirmed' && <button className="btn btn-ghost" style={{ fontSize: 12, color: '#dc2626', padding: '4px 8px' }} onClick={() => cancelAppt(a.id)}>Cancel ✕</button>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PHASE 1: AUTHENTICATION & ABHA ONBOARDING
══════════════════════════════════════════════════════════ */
function LoginPage({ T, go, showToast, setUser }) {
  const [step, setStep] = useState(1); // 1: phone, 2: otp, 3: details
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('Surat');
  const [loading, setLoading] = useState(false);

  const handlePhone = async (e) => {
    e.preventDefault();
    if (phone.length < 10) return showToast('Please enter a valid 10-digit number');
    setLoading(true);
    await api.sendOTP(phone);
    setLoading(false);
    setStep(2);
    showToast('OTP sent securely via WhatsApp 💬');
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    if (otp.length < 4) return;
    setLoading(true);
    await api.verifyOTP(phone, otp);
    setLoading(false);
    setStep(3); // For demo, assume new user to show complete flow
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !age) return showToast('Please fill required details');
    setLoading(true);
    const res = await api.registerPatient({ phone, name, age, city });
    setLoading(false);
    setUser(res.user);
    go('abha-onboarding');
  };

  return (
    <div className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <div className="card" style={{ maxWidth: 400, width: '100%', margin: '0 auto', boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div className="logo-mark" style={{ width: 48, height: 48, margin: '0 auto 16px', fontSize: 24 }}>M</div>
          <h2 style={{ fontSize: 24, fontWeight: 700 }}>{T('login_title', 'Welcome to MediFind')}</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
            {T('login_sub', 'Your secure health identity begins here.')}
          </p>
        </div>

        {step === 1 && (
          <form onSubmit={handlePhone}>
            <div className="form-group">
              <label className="form-label">{T('login_phone', 'Mobile Number')}</label>
              <div style={{ display: 'flex' }}>
                <span style={{ padding: '12px 16px', background: '#f1f5f9', border: '2px solid var(--border)', borderRight: 'none', borderRadius: '12px 0 0 12px', fontWeight: 600 }}>+91</span>
                <input type="tel" className="form-input" style={{ borderRadius: '0 12px 12px 0' }} placeholder="98765 43210" value={phone} onChange={e => setPhone(e.target.value)} autoFocus required />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Sending OTP...' : T('login_send_otp', 'Send WhatsApp OTP →')}
            </button>
            <p style={{ fontSize: 12, textAlign: 'center', color: 'var(--text-muted)', marginTop: 16 }}>By continuing, you agree to our Terms & DPDP Compliant Privacy Policy.</p>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtp}>
            <div className="form-group">
              <label className="form-label">{T('login_enter_otp', 'Enter 6-digit OTP')}</label>
              <input type="text" className="form-input" placeholder="• • • • • •" value={otp} onChange={e => setOtp(e.target.value)} style={{ letterSpacing: 8, textAlign: 'center', fontSize: 20 }} autoFocus required maxLength={6} />
              <div style={{ textAlign: 'right', marginTop: 8, fontSize: 13 }}>
                <a href="#" style={{ color: 'var(--primary)' }} onClick={() => setStep(1)}>Change Number</a>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Verifying...' : T('login_verify', 'Verify & Secure Login')}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label">{T('reg_name', 'Full Name')}</label>
              <input type="text" className="form-input" placeholder="e.g. Ramesh Patel" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">{T('reg_age', 'Age')}</label>
                <input type="number" className="form-input" placeholder="Years" value={age} onChange={e => setAge(e.target.value)} required />
              </div>
              <div className="form-group" style={{ flex: 2 }}>
                <label className="form-label">{T('reg_city', 'City')}</label>
                <input type="text" className="form-input" value={city} onChange={e => setCity(e.target.value)} required disabled />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Creating Profile...' : T('reg_complete', 'Complete Profile →')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function ABHAOnboardingPage({ T, go, showToast, user, setUser }) {
  const [step, setStep] = useState('intro'); // intro, create, link
  const [aadharOtp, setAadharOtp] = useState('');
  const [abhaNum, setAbhaNum] = useState('');
  const [loading, setLoading] = useState(false);

  const skip = () => {
    showToast('You can link your ABHA later from Health Records.');
    go('home');
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await api.generateABHA(user?.phone, aadharOtp);
    setLoading(false);
    setUser({ ...user, abhaLinked: true, abhaId: res.abhaId });
    showToast('✅ ABHA ID created and linked successfully!');
    go('records');
  };

  const handleLink = async (e) => {
    e.preventDefault();
    if (abhaNum.length < 14) return;
    setLoading(true);
    await api.linkABHA(abhaNum);
    setLoading(false);
    setUser({ ...user, abhaLinked: true, abhaId: abhaNum });
    showToast('✅ Account linked to ABHA ecosystem!');
    go('records');
  };

  return (
    <div className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <div className="card" style={{ maxWidth: 480, width: '100%', margin: '0 auto', borderTop: '4px solid #1C52A0' }}>

        {step === 'intro' && (
          <div style={{ textAlign: 'center' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/Ayushman_Bharat_Digital_Mission_Logo.svg" alt="ABDM Logo" style={{ height: 60, margin: '0 auto 24px', maxWidth: '100%', objectFit: 'contain' }} />
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>{T('abha_title', 'Unlock Your Digital Health Record')}</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: 15, lineHeight: 1.6 }}>
              {T('abha_desc', 'MediFind is an official partner of Ayushman Bharat Digital Mission (ABDM). Linking an ABHA ID allows you to securely share old reports with new doctors and avoid repeating expensive tests.')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              <button className="btn btn-primary btn-lg" style={{ background: '#1C52A0', borderColor: '#1C52A0' }} onClick={() => setStep('create')}>
                Create New ABHA ID (1 min)
              </button>
              <button className="btn btn-outline btn-lg" onClick={() => setStep('link')}>
                I already have an ABHA ID
              </button>
            </div>

            <button className="btn btn-ghost" onClick={skip}>Skip for now, I'll do this later</button>
          </div>
        )}

        {step === 'create' && (
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: 20, marginBottom: 16 }}>Create via Aadhaar OTP</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 20 }}>An OTP has been sent to the Aadhaar-linked mobile number for <strong>{user?.phone}</strong>.</p>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label className="form-label">Aadhaar OTP</label>
                <input type="text" className="form-input" placeholder="• • • • • •" value={aadharOtp} onChange={e => setAadharOtp(e.target.value)} required autoFocus />
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={loading} style={{ background: '#1C52A0', borderColor: '#1C52A0', color: 'white' }}>
                {loading ? 'Creating ABHA ID...' : 'Verify & Generate ABHA Profile'}
              </button>
              <button type="button" className="btn btn-ghost btn-full" onClick={() => setStep('intro')} style={{ marginTop: 8 }}>← Back</button>
            </form>
          </div>
        )}

        {step === 'link' && (
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: 20, marginBottom: 16 }}>Link Existing ABHA</h3>
            <form onSubmit={handleLink}>
              <div className="form-group">
                <label className="form-label">14-Digit ABHA Number</label>
                <input type="text" className="form-input" placeholder="91-XXXX-XXXX-XXXX" value={abhaNum} onChange={e => setAbhaNum(e.target.value)} required autoFocus />
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={loading} style={{ background: '#1C52A0', borderColor: '#1C52A0', color: 'white' }}>
                {loading ? 'Linking...' : 'Send OTP to Link Account'}
              </button>
              <button type="button" className="btn btn-ghost btn-full" onClick={() => setStep('intro')} style={{ marginTop: 8 }}>← Back</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
