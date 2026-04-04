import { useState, useEffect } from 'react';
import { t } from './i18n';
import * as api from './api';

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
            <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
          </div>
        </div>
      </nav>

      {/* ════════ PAGE CONTENT ════════ */}
      {page === 'home' && <LandingPage lang={lang} T={T} go={go} />}
      {page === 'symptoms' && <SymptomsPage lang={lang} T={T} go={go} />}
      {page === 'doctors' && <DoctorsPage lang={lang} T={T} go={go} initSpec={pageData?.specialty} />}
      {page === 'doctor-profile' && <DoctorProfilePage d={pageData} lang={lang} T={T} go={go} showToast={showToast} />}
      {page === 'booking' && <BookingPage doctor={pageData} lang={lang} T={T} go={go} showToast={showToast} />}
      {page === 'medicines' && <MedicinesPage lang={lang} T={T} />}
      {page === 'records' && <RecordsPage lang={lang} T={T} />}
      {page === 'opinion' && <SecondOpinionPage lang={lang} T={T} showToast={showToast} />}
      {page === 'bookings' && <BookingsPage lang={lang} T={T} go={go} />}

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
            <option value="all">All Specialties</option>
            {specialties.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="filter-select" value={filters.locality} onChange={e => setFilters({ ...filters, locality: e.target.value })}>
            <option value="all">All Localities</option>
            {localities.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <select className="filter-select" value={filters.sort} onChange={e => setFilters({ ...filters, sort: e.target.value })}>
            <option value="merit">Sort: Merit Score</option>
            <option value="fee-low">Sort: Fee (Low → High)</option>
            <option value="fee-high">Sort: Fee (High → Low)</option>
            <option value="experience">Sort: Experience</option>
          </select>
          <input className="filter-search" value={filters.search} onChange={e => setFilters({ ...filters, search: e.target.value })}
            placeholder={T('doc_search', 'Search doctors by name...')} />
        </div>

        <div className="result-count">{total} {isGu ? 'ડૉક્ટર મળ્યા' : 'doctors found'}</div>

        <div className="doctors-grid">
          {doctors.map(d => {
            const spec = specMap[d.specialty] || {};
            return (
              <div key={d.id} className="doctor-card" onClick={() => go('doctor-profile', d)}>
                <div className="doctor-top">
                  <div className="doctor-avatar"><img src={d.photo} alt={d.name} /></div>
                  <div>
                    <div className="doctor-name">{isGu ? d.nameGu : d.name}</div>
                    <span className="spec-chip" style={{ background: spec.bg, color: spec.color }}>
                      {isGu ? d.specialtyGu : d.specialty}
                    </span>
                    <div className="verified-tag">🟢 Verified</div>
                  </div>
                </div>
                <div className="doctor-meta">
                  <span>📍 {d.address?.split(',').slice(-2).join(',').trim()}</span>
                  <span>⏱ {d.experience} years · 🗣 {d.languages.join(', ')}</span>
                  <span>🕐 {d.timings}</span>
                </div>
                <div className="doctor-bottom">
                  <div className="doctor-fee">₹{d.fee} <span>consultation</span></div>
                  <button className="btn btn-primary btn-sm" onClick={e => { e.stopPropagation(); go('booking', d); }}>
                    Book →
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
  return (
    <>
      <section className="profile-hero">
        <div className="container">
          <div className="profile-hero-inner">
            <div className="profile-photo"><img src={d.photo} alt={d.name} /></div>
            <div>
              <div className="profile-name-lg">{isGu ? d.nameGu : d.name}</div>
              <div className="profile-spec">{isGu ? d.specialtyGu : d.specialty} · {d.qualification}</div>
              <div className="profile-verified">🟢 Verified by MediFind · NMC: {d.nmcId}</div>
              <div className="profile-chips">
                <span className="profile-chip">₹{d.fee} Fee</span>
                <span className="profile-chip">⏱ {d.experience} years</span>
                <span className="profile-chip">🗣 {d.languages.join(', ')}</span>
                <span className="profile-chip">⭐ {d.rating} ({d.reviewCount} reviews)</span>
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
                <div className="profile-section-title">About</div>
                <p className="profile-text">{isGu ? d.aboutGu : d.about}</p>
              </div>
              <div className="profile-section">
                <div className="profile-section-title">Clinic Address</div>
                <p className="profile-text">{d.address}</p>
              </div>
              <div className="profile-section">
                <div className="profile-section-title">Timings</div>
                <p className="profile-text">{d.timings}</p>
                <p className="profile-text" style={{ color: 'var(--text-muted)', fontSize: 13 }}>Sunday — Closed</p>
              </div>
            </div>
            <div>
              <div className="profile-sidebar-card">
                <div className="sidebar-fee">₹{d.fee}</div>
                <div className="sidebar-label">Consultation Fee</div>
                <button className="btn btn-primary btn-full" onClick={() => go('booking', d)}>
                  {T('book', 'Book Appointment')} →
                </button>
                <button className="btn btn-outline btn-full" onClick={() => go('doctors')} style={{ marginTop: 8 }}>
                  ← Back to Doctors
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
                <div className="booking-step">Step 1 of 3</div>
                <div className="booking-title">{T('sel_date', 'Select a Date')}</div>
                <div className="booking-desc">Choose when you'd like to visit.</div>
                <div style={{ marginBottom: 24 }}>
                  <div className="date-grid">
                    {dayNames.map(d => <div key={d} className="date-header">{d}</div>)}
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
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Select a Time</div>
                    <div className="time-slots">
                      {times.map(t => <button key={t} className={`time-slot ${time === t ? 'selected' : ''}`} onClick={() => setTime(t)}>{t}</button>)}
                    </div>
                  </>
                )}
                <button className="btn btn-primary" disabled={!date || !time} onClick={() => setStep(1)} style={{ marginTop: 24 }}>
                  Continue →
                </button>
              </>
            )}

            {/* Step 1: Concern */}
            {step === 1 && (
              <>
                <div className="booking-step">Step 2 of 3</div>
                <div className="booking-title">{T('concern_t', 'What brings you in?')}</div>
                <div className="booking-desc">{T('concern_d', 'Briefly describe your concern. The doctor will see this before your visit.')}</div>
                <textarea className="input-xl" value={concern} onChange={e => setConcern(e.target.value)}
                  placeholder="e.g. Neck pain for 3 weeks with tingling in my right hand fingers..."
                  style={{ width: '100%', marginBottom: 8 }} />
                <div style={{ textAlign: 'right', fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>{concern.length} / 200</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-outline" onClick={() => setStep(0)} style={{ flex: 1 }}>← Back</button>
                  <button className="btn btn-primary" disabled={!concern.trim()} onClick={() => setStep(2)} style={{ flex: 2 }}>Continue →</button>
                </div>
              </>
            )}

            {/* Step 2: Share ABHA */}
            {step === 2 && (
              <>
                <div className="booking-step">Step 3 of 3</div>
                <div className="booking-title">{T('share_t', 'Share your health history?')}</div>
                <div className="share-card" style={{ boxShadow: 'none', padding: 0, marginBottom: 20 }}>
                  <div className="share-header"><div className="share-dot" /><span style={{ fontWeight: 600 }}>Your ABHA records are linked</span></div>
                  <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, margin: '8px 0 16px' }}>
                    Let {isGu ? d.nameGu : d.name} see your history before your appointment so they can prepare properly.
                  </p>
                  <div style={{ marginBottom: 16 }}>
                    <div className="share-check">Your allergies</div>
                    <div className="share-check">Current medications</div>
                    <div className="share-check">Recent lab reports (last 90 days)</div>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Access expires after your visit. You can revoke anytime.</p>
                </div>
                <button className="btn btn-primary" onClick={() => { setShare(true); submit(); }} style={{ marginBottom: 8 }}>
                  Yes, share my health history
                </button>
                <button className="btn btn-ghost" onClick={() => { setShare(false); submit(); }}>
                  No thanks, skip this →
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
                    <div><div className="price-label">Branded</div><div className="price-sub">₹{m.monthlyBrand}/month</div></div>
                    <div className="price-value">₹{m.brandPrice}</div>
                  </div>
                  <div className="price-row generic">
                    <div><div className="price-label">🟢 Generic</div><div className="price-sub">₹{m.monthlyGeneric}/month</div></div>
                    <div className="price-value" style={{ color: 'var(--accent-dark)' }}>₹{m.genericPrice}</div>
                  </div>
                  <div className="price-row jan">
                    <div><div className="price-label">🏪 Jan Aushadhi</div><div className="price-sub">₹{m.monthlyJanAushadhi}/month</div></div>
                    <div><div className="price-value" style={{ color: 'var(--success)' }}>₹{m.janAushadhiPrice}</div>
                      <div className="price-save">Save ₹{m.monthlySavings}/mo</div>
                    </div>
                  </div>
                </div>
                <div className="yearly-box">
                  <div className="yearly-amount">₹{yearly.toLocaleString()}</div>
                  <div className="yearly-label">💰 Your yearly saving if you switch</div>
                </div>
                <div className="med-disclaimer">
                  <span>⚠️</span>
                  <span>Always consult your doctor before switching to a generic medicine.</span>
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
   HEALTH RECORDS PAGE
══════════════════════════════════════════════════════════ */
function RecordsPage({ lang, T }) {
  const [data, setData] = useState(null);
  const isGu = lang === 'gu';
  useEffect(() => { api.fetchHealthRecords().then(setData); }, []);

  if (!data) return <div className="page"><div className="container"><p>Loading...</p></div></div>;

  const icons = { 'Blood Report': '🧪', 'Prescription': '📄', 'X-Ray': '🩻', 'Lab Report': '🧪', 'Discharge Summary': '🏥' };
  const groups = {};
  data.records.forEach(r => {
    const cat = r.type === 'Blood Report' || r.type === 'Lab Report' ? 'Lab Reports' : r.type === 'X-Ray' ? 'Imaging' : r.type + 's';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(r);
  });

  return (
    <div className="page">
      <div className="container">
        <div className="page-head">
          <h1>{T('rec_title', '📋 ABHA Health Records')}</h1>
          <p>{T('rec_sub', 'Your complete medical history linked with ABHA Health ID.')}</p>
        </div>

        <div className="abha-hero">
          <div>
            <div style={{ fontSize: 24, fontWeight: 800 }}>{isGu ? data.patientNameGu : data.patientName}</div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 4 }}>🟢 ABHA Health ID Linked</p>
          </div>
          <span className="abha-badge">ABHA: {data.abhaId}</span>
          <div className="abha-grid" style={{ width: '100%' }}>
            <div className="abha-item"><div className="abha-item-label">Blood Group</div><div className="abha-item-value">🩸 {data.bloodGroup}</div></div>
            <div className="abha-item"><div className="abha-item-label">Allergies</div><div className="abha-item-value">⚠️ {(isGu ? data.allergiesGu : data.allergies).join(', ')}</div></div>
            <div className="abha-item"><div className="abha-item-label">Conditions</div><div className="abha-item-value">💊 {(isGu ? data.conditionsGu : data.conditions).join(', ')}</div></div>
            <div className="abha-item"><div className="abha-item-label">Current Meds</div><div className="abha-item-value">💉 {data.currentMeds.join(', ')}</div></div>
          </div>
        </div>

        {Object.entries(groups).map(([cat, items]) => (
          <div key={cat}>
            <div className="records-group-title">{cat}</div>
            {items.map(r => (
              <div key={r.id} className="record-card">
                <span className="rec-icon">{icons[r.type] || '📄'}</span>
                <div className="rec-body">
                  <div className="rec-title">{isGu ? r.typeGu : r.type} — {r.doctor}</div>
                  <div className="rec-meta">{r.facility} · {r.date}</div>
                </div>
                <span className="rec-arrow">View →</span>
              </div>
            ))}
          </div>
        ))}
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
            <div className="so-label">Standard</div>
            <div className="so-time">Report in 24 hours</div>
          </div>
          <div className={`so-option ${urgency === 'urgent' ? 'active' : ''}`} onClick={() => setUrgency('urgent')}>
            <div className="so-price">₹499</div>
            <div className="so-label">Urgent</div>
            <div className="so-time">Report in 12 hours</div>
          </div>
        </div>

        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group"><label className="form-label">Your Name</label><input className="form-input" name="pName" required placeholder="Full name" /></div>
              <div className="form-group"><label className="form-label">Phone</label><input className="form-input" name="pPhone" type="tel" required placeholder="+91 98765 43210" /></div>
              <div className="form-group full"><label className="form-label">Original Diagnosis</label><input className="form-input" name="diag" required placeholder="e.g. Lumbar disc herniation L4-L5" /></div>
              <div className="form-group full"><label className="form-label">Recommended Treatment</label><input className="form-input" name="treat" required placeholder="e.g. Spinal surgery recommended, cost ₹4.5 lakh" /></div>
              <div className="form-group"><label className="form-label">Hospital / Doctor</label><input className="form-input" name="hosp" placeholder="e.g. Sterling Hospital" /></div>
              <div className="form-group"><label className="form-label">Additional Notes</label><textarea className="form-input" name="notes" rows="3" placeholder="Any additional details..." /></div>
            </div>
            <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: 24 }}>Submit for Second Opinion →</button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   BOOKINGS PAGE
══════════════════════════════════════════════════════════ */
function BookingsPage({ lang, T, go }) {
  const [appts, setAppts] = useState([]);
  useEffect(() => { api.fetchAppointments().then(d => setAppts(d.appointments)); }, []);

  return (
    <div className="page">
      <div className="container">
        <div className="page-head">
          <h1>📅 My Bookings</h1>
          <p>Your upcoming and past appointments.</p>
        </div>
        {appts.length === 0 ? (
          <div className="appt-empty">
            <div className="appt-empty-icon">📅</div>
            <p style={{ fontSize: 18, marginBottom: 16 }}>No bookings yet</p>
            <button className="btn btn-primary" onClick={() => go('doctors')}>Find a Doctor →</button>
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
                <span className="appt-status">{a.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
