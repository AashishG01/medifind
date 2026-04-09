import { useState, useEffect } from 'react';
import * as api from './api';

/* ══════════════════════════════════════════════════════════
   DOCTOR APP — Main Layout
══════════════════════════════════════════════════════════ */
export default function DoctorApp({ goPatient }) {
    const [page, setPage] = useState('dashboard');
    const [menuOpen, setMenuOpen] = useState(false);
    const [toast, setToast] = useState(null);

    const go = (p) => { setPage(p); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3500); };

    const navItems = [
        ['dashboard', '📊', 'Dashboard'],
        ['appointments', '📅', 'Appointments'],
        ['opinions', '🩺', 'Second Opinions'],
        ['prescriptions', '💊', 'Prescriptions'],
        ['analytics', '📈', 'Analytics'],
        ['profile', '⚙️', 'My Clinic'],
    ];

    return (
        <div className="drApp">
            {/* Top Banner */}
            <div className="dr-banner">
                <div><span style={{ opacity: 0.5 }}>Provider Portal ·</span> <strong>Dr. Rajesh Mehta Clinic, Vesu</strong></div>
                <button className="dr-switch-btn" onClick={goPatient}>← Switch to Patient View</button>
            </div>

            {/* Navbar */}
            <nav className="dr-nav">
                <div className="nav-inner">
                    <div className="logo" onClick={() => go('dashboard')} style={{ cursor: 'pointer' }}>
                        <div className="logo-mark" style={{ background: '#1c2b36' }}>M</div>
                        <span className="logo-text">Medi<span style={{ color: '#0A7B9E' }}>Find</span> <span style={{ fontWeight: 400, color: '#6B7280', fontSize: 14 }}>Provider</span></span>
                    </div>
                    <div className="nav-spacer" />
                    <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                        {navItems.map(([key, icon, label]) => (
                            <button key={key} className={`nav-link ${page === key ? 'active' : ''}`} onClick={() => go(key)}>
                                <span style={{ marginRight: 4 }}>{icon}</span>{label}
                            </button>
                        ))}
                    </div>
                    <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
                </div>
            </nav>

            {/* Pages */}
            <div className="dr-content">
                {page === 'dashboard' && <DashboardPage go={go} />}
                {page === 'appointments' && <AppointmentsPage showToast={showToast} />}
                {page === 'opinions' && <OpinionsPage showToast={showToast} />}
                {page === 'prescriptions' && <PrescriptionsPage showToast={showToast} />}
                {page === 'analytics' && <AnalyticsPage />}
                {page === 'profile' && <ProfilePage showToast={showToast} />}
            </div>

            {toast && <div className="toast">{toast}</div>}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   1. DASHBOARD
══════════════════════════════════════════════════════════ */
function DashboardPage({ go }) {
    const [s, setS] = useState({});
    useEffect(() => { api.getProviderDashboardStats().then(setS); }, []);

    const cards = [
        { label: "Today's Patients", value: s.todayAppointments || 0, icon: '🏥', color: '#0A7B9E', bg: '#E5F4F9' },
        { label: 'Pending Opinions', value: s.pendingOpinions || 0, icon: '🩺', color: '#D94F4F', bg: '#FDEAEA' },
        { label: 'Total Patients', value: s.totalPatients || 0, icon: '👥', color: '#7C5CBF', bg: '#F0ECF8' },
        { label: 'Monthly Revenue', value: `₹${(s.monthlyRevenue || 0).toLocaleString()}`, icon: '💰', color: '#2E7DB5', bg: '#E6F0F8' },
        { label: 'Avg. Rating', value: `⭐ ${s.avgRating || 0}`, icon: '📊', color: '#D97B2B', bg: '#FDF0E3' },
        { label: 'Prescriptions', value: s.prescriptionsIssued || 0, icon: '💊', color: '#5B8C3E', bg: '#EAF3E5' },
    ];

    return (
        <div className="dr-container">
            <div className="dr-page-header">
                <div>
                    <h1 className="dr-title">Good Morning, Doctor 👋</h1>
                    <p className="dr-subtitle">Here's your clinic overview for today — {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
            </div>

            <div className="dr-stat-grid">
                {cards.map((c, i) => (
                    <div key={i} className="dr-stat-card" style={{ borderLeft: `4px solid ${c.color}` }}>
                        <div className="dr-stat-icon" style={{ background: c.bg }}>{c.icon}</div>
                        <div>
                            <div className="dr-stat-label">{c.label}</div>
                            <div className="dr-stat-value">{c.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dr-actions">
                <button className="btn btn-primary btn-lg" onClick={() => go('appointments')}>📅 Manage Appointments</button>
                <button className="btn btn-outline btn-lg" onClick={() => go('opinions')}>🩺 Resolve Second Opinions ({s.pendingOpinions || 0})</button>
                <button className="btn btn-ghost btn-lg" onClick={() => go('prescriptions')}>💊 Write Prescription</button>
            </div>

            {/* Quick glance: upcoming appointments */}
            <div style={{ marginTop: 32 }}>
                <h3 className="dr-section-title">Upcoming Patients Today</h3>
                <UpcomingList />
            </div>
        </div>
    );
}

function UpcomingList() {
    const [appts, setAppts] = useState([]);
    useEffect(() => { api.fetchProviderAppointments('Confirmed').then(d => setAppts(d.appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).slice(0, 5))); }, []);

    if (appts.length === 0) return <p style={{ color: 'var(--text-muted)' }}>No upcoming patients for today.</p>;
    return (
        <div className="dr-upcoming-grid">
            {appts.map(a => (
                <div key={a.id} className="dr-upcoming-card">
                    <div className="dr-upcoming-time">{a.time}</div>
                    <div className="dr-upcoming-name">{a.patientName}</div>
                    <div className="dr-upcoming-concern">{a.concern?.substring(0, 60)}...</div>
                    {a.shareRecords && <div className="dr-abha-badge">🟢 ABHA Shared</div>}
                </div>
            ))}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   2. APPOINTMENTS
══════════════════════════════════════════════════════════ */
function AppointmentsPage({ showToast }) {
    const [appts, setAppts] = useState([]);
    const [filter, setFilter] = useState('all');
    const [selected, setSelected] = useState(null);
    const [abha, setAbha] = useState(null);
    const [historyOpen, setHistoryOpen] = useState(false);

    const fetchAppts = () => api.fetchProviderAppointments(filter).then(d => setAppts(d.appointments));
    useEffect(() => { fetchAppts(); }, [filter]);

    const selectAppt = async (a) => {
        setSelected(a);
        if (a.shareRecords) {
            const r = await api.getPatientABHA(a.patientName);
            setAbha(r);
        } else { setAbha(null); }
    };

    const changeStatus = async (id, status) => {
        await api.updateAppointmentStatus(id, status);
        fetchAppts();
        showToast(`✅ Appointment marked as ${status}`);
        setSelected(null);
    };

    const statusColors = { Confirmed: { bg: '#E5F4F9', color: '#0A7B9E' }, Completed: { bg: '#EAF3E5', color: '#3E8C3E' }, Cancelled: { bg: '#FDEAEA', color: '#D94F4F' }, Pending: { bg: '#FDF0E3', color: '#D97B2B' } };

    return (
        <div className="dr-container">
            <div className="dr-page-header">
                <h1 className="dr-title">📅 Appointment Manager</h1>
                <div className="dr-filter-bar">
                    {['all', 'Confirmed', 'Completed', 'Cancelled'].map(f => (
                        <button key={f} className={`dr-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                            {f === 'all' ? 'All' : f} {f !== 'all' && <span className="dr-filter-count">{appts.filter(a => a.status === f || f === 'all').length}</span>}
                        </button>
                    ))}
                </div>
            </div>

            <div className="dr-split-layout">
                {/* Left: List */}
                <div className="dr-list-panel">
                    {appts.length === 0 && <div className="dr-empty">No appointments matching this filter.</div>}
                    {appts.map(a => {
                        const sc = statusColors[a.status] || statusColors.Confirmed;
                        return (
                            <div key={a.id} className={`dr-appt-card ${selected?.id === a.id ? 'selected' : ''}`} onClick={() => selectAppt(a)}>
                                <div className="dr-appt-top">
                                    <span className="dr-appt-name">{a.patientName}</span>
                                    <span className="dr-appt-status" style={{ background: sc.bg, color: sc.color }}>{a.status}</span>
                                </div>
                                <div className="dr-appt-meta">
                                    <span>📅 {a.date}</span> <span>⏰ {a.time}</span> <span>📞 {a.phone}</span>
                                </div>
                                <div className="dr-appt-concern">{a.concern?.substring(0, 80)}...</div>
                                {a.shareRecords && <div className="dr-abha-badge">🟢 ABHA Records Attached</div>}
                            </div>
                        );
                    })}
                </div>

                {/* Right: Detail Sidebar */}
                <div className="dr-detail-panel">
                    {!selected ? (
                        <div className="dr-detail-empty">
                            <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
                            <p>Select a patient from the list to view details, ABHA records, and take action.</p>
                        </div>
                    ) : (
                        <>
                            <div className="dr-detail-header">
                                <h2>{selected.patientName}</h2>
                                <span className="dr-appt-status" style={{ background: statusColors[selected.status]?.bg, color: statusColors[selected.status]?.color }}>{selected.status}</span>
                            </div>

                            <div className="dr-detail-row"><span className="dr-detail-label">Phone</span><span>{selected.phone}</span></div>
                            <div className="dr-detail-row"><span className="dr-detail-label">Date & Time</span><span>{selected.date} · {selected.time}</span></div>
                            <div className="dr-detail-row"><span className="dr-detail-label">Clinic</span><span>{selected.clinicAddress}</span></div>

                            <div className="dr-detail-section">
                                <div className="dr-detail-section-title">Patient Concern</div>
                                <div className="dr-concern-box">"{selected.concern || 'No concern specified.'}"</div>
                            </div>

                            {selected.shareRecords && abha ? (
                                <div className="dr-detail-section">
                                    <div className="dr-abha-header">
                                        <div className="dr-abha-dot" /><span>ABHA Live Records</span>
                                        <span className="dr-abha-id">ABHA: {abha.abhaId}</span>
                                    </div>
                                    <div className="dr-abha-grid">
                                        <div><strong>Age:</strong> {abha.age} years</div>
                                        <div><strong>Blood:</strong> 🩸 {abha.bloodGroup}</div>
                                        <div><strong>Allergies:</strong> ⚠️ {abha.allergies.length > 0 ? abha.allergies.join(', ') : 'None'}</div>
                                        <div><strong>Conditions:</strong> {abha.conditions.join(', ')}</div>
                                        <div><strong>Active Meds:</strong> 💊 {abha.currentMeds.join(', ')}</div>
                                        <div><strong>Recent Lab:</strong> 🧪 {abha.recentLab}</div>
                                    </div>
                                </div>
                            ) : selected.shareRecords ? (
                                <div className="dr-loading-records">Loading ABHA records...</div>
                            ) : (
                                <div className="dr-no-records">Patient did not share ABHA records for this visit.</div>
                            )}

                            {/* One-Click Full History Button */}
                            {selected.shareRecords && (
                                <button className="btn btn-accent btn-full" style={{ marginTop: 16 }} onClick={() => setHistoryOpen(true)}>
                                    📋 View Full Medical History →
                                </button>
                            )}

                            {selected.status === 'Confirmed' && (
                                <div className="dr-detail-actions">
                                    <button className="btn btn-primary" onClick={() => changeStatus(selected.id, 'Completed')}>✅ Mark Completed</button>
                                    <button className="btn btn-outline" style={{ color: '#D94F4F', borderColor: '#D94F4F' }} onClick={() => changeStatus(selected.id, 'Cancelled')}>Cancel Appointment</button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Full History Modal */}
            {historyOpen && selected && (
                <PatientHistoryModal patientName={selected.patientName} onClose={() => setHistoryOpen(false)} />
            )}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   3. SECOND OPINIONS DESK
══════════════════════════════════════════════════════════ */
function OpinionsPage({ showToast }) {
    const [ops, setOps] = useState([]);
    const [selected, setSelected] = useState(null);
    const [verdict, setVerdict] = useState('');

    const fetchOps = () => api.fetchProviderOpinions().then(d => setOps(d.opinions));
    useEffect(() => { fetchOps(); }, []);

    const resolve = async () => {
        if (!verdict.trim()) return;
        await api.submitOpinionVerdict(selected.id, verdict);
        fetchOps();
        showToast('✅ Verdict sent to patient successfully!');
        setSelected(null);
        setVerdict('');
    };

    const pending = ops.filter(o => o.status === 'Under Review');
    const resolved = ops.filter(o => o.status === 'Resolved');

    return (
        <div className="dr-container">
            <div className="dr-page-header">
                <h1 className="dr-title">🩺 Second Opinion Desk</h1>
                <p className="dr-subtitle">Review patient cases, write structured verdicts, and help patients make informed decisions.</p>
            </div>

            {!selected ? (
                <>
                    {pending.length > 0 && (
                        <div style={{ marginBottom: 32 }}>
                            <h3 className="dr-section-title" style={{ color: '#D94F4F' }}>⚠️ Action Required ({pending.length})</h3>
                            {pending.map(o => (
                                <div key={o.id} className="dr-opinion-card pending" onClick={() => setSelected(o)}>
                                    <div className="dr-opinion-top">
                                        <div>
                                            <div className="dr-opinion-patient">{o.patientName}</div>
                                            <div className="dr-opinion-diag">{o.diagnosis}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span className="dr-urgency" style={{ background: o.urgency === 'urgent' ? '#FDEAEA' : '#FDF0E3', color: o.urgency === 'urgent' ? '#D94F4F' : '#D97B2B' }}>
                                                {o.urgency === 'urgent' ? '🔴 Urgent' : '🟡 Standard'}
                                            </span>
                                            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>₹{o.amount} · {o.estimatedDelivery}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {resolved.length > 0 && (
                        <div>
                            <h3 className="dr-section-title" style={{ color: 'var(--text-muted)' }}>✅ Resolved ({resolved.length})</h3>
                            {resolved.map(o => (
                                <div key={o.id} className="dr-opinion-card resolved" onClick={() => setSelected(o)}>
                                    <div className="dr-opinion-top">
                                        <div>
                                            <div className="dr-opinion-patient">{o.patientName}</div>
                                            <div className="dr-opinion-diag">{o.diagnosis}</div>
                                        </div>
                                        <span className="dr-resolved-badge">Verdict Sent ✓</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {pending.length === 0 && resolved.length === 0 && (
                        <div className="dr-empty" style={{ padding: 60 }}>
                            <div style={{ fontSize: 48, marginBottom: 16 }}>🩺</div>
                            <p>No second opinion requests yet. They'll appear here when patients submit cases.</p>
                        </div>
                    )}
                </>
            ) : (
                <div className="dr-case-view">
                    <button className="dr-back-btn" onClick={() => { setSelected(null); setVerdict(''); }}>← Back to Inbox</button>

                    <div className="dr-case-header">
                        <h2>Case #{selected.id} — {selected.patientName}</h2>
                        <span className="dr-urgency" style={{ background: selected.urgency === 'urgent' ? '#FDEAEA' : '#FDF0E3', color: selected.urgency === 'urgent' ? '#D94F4F' : '#D97B2B' }}>
                            {selected.urgency === 'urgent' ? '🔴 Urgent — 12hr SLA' : '🟡 Standard — 24hr SLA'}
                        </span>
                    </div>

                    <div className="dr-case-grid">
                        <div className="dr-case-field">
                            <div className="dr-case-label">Original Diagnosis</div>
                            <div className="dr-case-value">{selected.diagnosis}</div>
                        </div>
                        <div className="dr-case-field">
                            <div className="dr-case-label">Recommended Treatment</div>
                            <div className="dr-case-value">{selected.treatment}</div>
                        </div>
                        <div className="dr-case-field">
                            <div className="dr-case-label">Hospital / Doctor</div>
                            <div className="dr-case-value">{selected.hospital}</div>
                        </div>
                        <div className="dr-case-field">
                            <div className="dr-case-label">Contact</div>
                            <div className="dr-case-value">{selected.phone}</div>
                        </div>
                    </div>

                    <div className="dr-case-notes">
                        <div className="dr-case-label">Patient's Notes</div>
                        <div className="dr-case-notes-text">"{selected.notes || 'No notes provided.'}"</div>
                    </div>

                    {selected.status === 'Resolved' ? (
                        <div className="dr-verdict-display">
                            <div className="dr-case-label" style={{ color: 'var(--success)' }}>✅ Your Verdict (Sent)</div>
                            <div className="dr-case-notes-text" style={{ borderColor: '#cce5df' }}>{selected.verdict}</div>
                        </div>
                    ) : (
                        <div className="dr-verdict-form">
                            <h3>Write Your Verdict</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 12 }}>Your structured opinion will be sent to the patient. Be clear about whether the recommended treatment is necessary and suggest alternatives if applicable.</p>
                            <textarea className="dr-verdict-textarea" value={verdict} onChange={e => setVerdict(e.target.value)}
                                placeholder="Based on the information provided, I believe...&#10;&#10;1. Regarding the diagnosis: [agree/disagree/partially agree]&#10;2. Regarding the treatment plan: [necessary/premature/alternatives exist]&#10;3. My recommendation: [specific advice]..." />
                            <button className="btn btn-primary btn-lg" disabled={!verdict.trim()} onClick={resolve} style={{ marginTop: 16 }}>
                                Finalize & Send Verdict to Patient →
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   4. DIGITAL PRESCRIPTIONS
══════════════════════════════════════════════════════════ */
function PrescriptionsPage({ showToast }) {
    const [tab, setTab] = useState('write'); // write | history
    const [patientName, setPatientName] = useState('');
    const [meds, setMeds] = useState([{ name: '', dosage: '', frequency: 'BD', duration: '30 days' }]);
    const [notes, setNotes] = useState('');
    const [history, setHistory] = useState([]);
    const [genericInfo, setGenericInfo] = useState({});

    useEffect(() => { api.fetchPrescriptions().then(d => setHistory(d.prescriptions)); }, [tab]);

    const addMed = () => setMeds([...meds, { name: '', dosage: '', frequency: 'BD', duration: '30 days' }]);
    const removeMed = (i) => setMeds(meds.filter((_, idx) => idx !== i));
    const updateMed = (i, field, val) => {
        const copy = [...meds];
        copy[i][field] = val;
        setMeds(copy);
        if (field === 'name' && val.length > 2) {
            const alt = api.getMedicineGenericAlternatives(val);
            if (alt.found) setGenericInfo(prev => ({ ...prev, [i]: alt }));
        }
    };

    const submit = async () => {
        if (!patientName.trim() || meds.every(m => !m.name.trim())) return;
        await api.createPrescription({ patientName, medicines: meds.filter(m => m.name.trim()), notes, doctorName: 'Dr. Rajesh Mehta', doctorSpecialty: 'Orthopedic Surgeon' });
        showToast('✅ Prescription sent to patient!');
        setPatientName(''); setMeds([{ name: '', dosage: '', frequency: 'BD', duration: '30 days' }]); setNotes(''); setGenericInfo({});
        setTab('history');
    };

    return (
        <div className="dr-container">
            <div className="dr-page-header">
                <h1 className="dr-title">💊 Digital Prescriptions</h1>
                <div className="dr-tab-bar">
                    <button className={`dr-tab ${tab === 'write' ? 'active' : ''}`} onClick={() => setTab('write')}>Write New</button>
                    <button className={`dr-tab ${tab === 'history' ? 'active' : ''}`} onClick={() => setTab('history')}>History ({history.length})</button>
                </div>
            </div>

            {tab === 'write' ? (
                <div className="dr-rx-form">
                    <div className="dr-rx-patient">
                        <label className="dr-rx-label">Patient Name</label>
                        <input className="form-input" value={patientName} onChange={e => setPatientName(e.target.value)} placeholder="e.g. Rameshbhai Patel" />
                    </div>

                    <h3 style={{ marginTop: 24, marginBottom: 12 }}>Medicines</h3>
                    {meds.map((m, i) => (
                        <div key={i} className="dr-rx-med-row">
                            <input className="form-input" style={{ flex: 2 }} placeholder="Medicine name" value={m.name} onChange={e => updateMed(i, 'name', e.target.value)} />
                            <input className="form-input" style={{ flex: 1 }} placeholder="Dosage" value={m.dosage} onChange={e => updateMed(i, 'dosage', e.target.value)} />
                            <select className="form-input" style={{ flex: 1 }} value={m.frequency} onChange={e => updateMed(i, 'frequency', e.target.value)}>
                                <option value="OD">OD (Once)</option>
                                <option value="BD">BD (Twice)</option>
                                <option value="TDS">TDS (Thrice)</option>
                                <option value="SOS">SOS (As needed)</option>
                            </select>
                            <input className="form-input" style={{ flex: 1 }} placeholder="Duration" value={m.duration} onChange={e => updateMed(i, 'duration', e.target.value)} />
                            {meds.length > 1 && <button className="dr-rx-remove" onClick={() => removeMed(i)}>✕</button>}

                            {/* Generic Alternative Alert */}
                            {genericInfo[i] && (
                                <div className="dr-generic-alert">
                                    <div className="dr-generic-title">💡 Generic Alternative Available</div>
                                    <div className="dr-generic-row">
                                        <span>Branded: <strong>{genericInfo[i].branded}</strong> — ₹{genericInfo[i].brandPrice}/strip</span>
                                    </div>
                                    <div className="dr-generic-row" style={{ color: 'var(--success)' }}>
                                        <span>Generic: <strong>{genericInfo[i].generic}</strong> — ₹{genericInfo[i].genericPrice}/strip</span>
                                    </div>
                                    <div className="dr-generic-row" style={{ color: '#5B8C3E' }}>
                                        <span>Jan Aushadhi: ₹{genericInfo[i].janAushadhiPrice}/strip · <strong>Save ₹{genericInfo[i].monthlySavings}/month</strong></span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <button className="btn btn-ghost" onClick={addMed} style={{ marginTop: 8 }}>+ Add Another Medicine</button>

                    <div style={{ marginTop: 24 }}>
                        <label className="dr-rx-label">Additional Notes</label>
                        <textarea className="form-input" rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. Review after 2 weeks. Continue physiotherapy." />
                    </div>

                    <button className="btn btn-primary btn-lg" style={{ marginTop: 24 }} onClick={submit} disabled={!patientName.trim()}>
                        Send Prescription to Patient →
                    </button>
                </div>
            ) : (
                <div>
                    {history.length === 0 ? (
                        <div className="dr-empty"><p>No prescriptions yet. Write your first one!</p></div>
                    ) : history.map(rx => (
                        <div key={rx.id} className="dr-rx-history-card">
                            <div className="dr-rx-history-top">
                                <span className="dr-rx-history-name">{rx.patientName}</span>
                                <span className="dr-rx-history-date">{new Date(rx.createdAt).toLocaleDateString('en-IN')}</span>
                            </div>
                            <div className="dr-rx-history-meds">
                                {rx.medicines.map((m, i) => <span key={i} className="dr-rx-chip">{m.name} {m.dosage} {m.frequency}</span>)}
                            </div>
                            {rx.notes && <div className="dr-rx-history-notes">📝 {rx.notes}</div>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   5. ANALYTICS
══════════════════════════════════════════════════════════ */
function AnalyticsPage() {
    const [s, setS] = useState({});
    useEffect(() => { api.getProviderDashboardStats().then(setS); }, []);

    const metrics = [
        { label: 'Total Appointments', value: s.totalAppointments || 0 },
        { label: 'Completed', value: s.completedAppointments || 0 },
        { label: 'Total Revenue', value: `₹${(s.totalRevenue || 0).toLocaleString()}` },
        { label: 'Monthly Revenue', value: `₹${(s.monthlyRevenue || 0).toLocaleString()}` },
        { label: 'Opinions Resolved', value: s.resolvedOpinions || 0 },
        { label: 'Avg. Rating', value: s.avgRating || 0 },
        { label: 'Total Reviews', value: s.totalReviews || 0 },
        { label: 'Unique Patients', value: s.totalPatients || 0 },
    ];

    // Simple bar chart simulation
    const barData = [
        { label: 'Mon', val: 4 }, { label: 'Tue', val: 6 }, { label: 'Wed', val: 3 },
        { label: 'Thu', val: 7 }, { label: 'Fri', val: 5 }, { label: 'Sat', val: 8 },
    ];
    const maxBar = Math.max(...barData.map(b => b.val));

    return (
        <div className="dr-container">
            <div className="dr-page-header">
                <h1 className="dr-title">📈 Analytics & Performance</h1>
                <p className="dr-subtitle">Your clinic performance at a glance.</p>
            </div>

            <div className="dr-analytics-grid">
                {metrics.map((m, i) => (
                    <div key={i} className="dr-analytics-card">
                        <div className="dr-analytics-label">{m.label}</div>
                        <div className="dr-analytics-value">{m.value}</div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 40 }}>
                <h3 className="dr-section-title">Weekly Appointment Trend</h3>
                <div className="dr-bar-chart">
                    {barData.map((b, i) => (
                        <div key={i} className="dr-bar-col">
                            <div className="dr-bar" style={{ height: `${(b.val / maxBar) * 120}px` }}>{b.val}</div>
                            <div className="dr-bar-label">{b.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ marginTop: 40 }}>
                <h3 className="dr-section-title">Revenue Breakdown</h3>
                <div className="dr-revenue-table">
                    <div className="dr-rev-row"><span>Consultations ({s.completedAppointments || 0} × ₹500)</span><span className="dr-rev-val">₹{((s.completedAppointments || 0) * 500).toLocaleString()}</span></div>
                    <div className="dr-rev-row"><span>Second Opinions ({s.resolvedOpinions || 0} × ₹199 avg)</span><span className="dr-rev-val">₹{((s.resolvedOpinions || 0) * 199).toLocaleString()}</span></div>
                    <div className="dr-rev-row total"><span>Total Earnings</span><span className="dr-rev-val">₹{((s.totalRevenue || 0) + (s.resolvedOpinions || 0) * 199).toLocaleString()}</span></div>
                </div>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   6. CLINIC PROFILE MANAGER
══════════════════════════════════════════════════════════ */
function ProfilePage({ showToast }) {
    const profile = api.getProviderProfile();
    const [fee, setFee] = useState(profile?.fee || 500);
    const [timings, setTimings] = useState(profile?.timings || '');
    const [address, setAddress] = useState(profile?.address || '');
    const [langs, setLangs] = useState(profile?.languages?.join(', ') || '');

    const save = async () => {
        await api.updateProviderProfile({
            fee: parseInt(fee),
            timings,
            address,
            languages: langs.split(',').map(l => l.trim()).filter(Boolean),
        });
        showToast('✅ Clinic profile updated!');
    };

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="dr-container" style={{ maxWidth: 800 }}>
            <div className="dr-page-header">
                <h1 className="dr-title">⚙️ My Clinic Profile</h1>
                <p className="dr-subtitle">Manage how your clinic appears to patients on MediFind.</p>
            </div>

            <div className="dr-profile-card">
                <div className="dr-profile-top">
                    <div className="dr-profile-avatar"><img src={profile.photo} alt={profile.name} /></div>
                    <div>
                        <div className="dr-profile-name">{profile.name}</div>
                        <div className="dr-profile-spec">{profile.specialty} · {profile.qualification}</div>
                        <div className="dr-profile-nmc">🟢 Verified · NMC: {profile.nmcId}</div>
                        <div style={{ marginTop: 8 }}>
                            <span className="dr-profile-chip">⭐ {profile.rating} ({profile.reviewCount} reviews)</span>
                            <span className="dr-profile-chip">⏱ {profile.experience} years</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dr-profile-form">
                <div className="dr-form-group">
                    <label className="dr-rx-label">Consultation Fee (₹)</label>
                    <input className="form-input" type="number" value={fee} onChange={e => setFee(e.target.value)} />
                </div>
                <div className="dr-form-group">
                    <label className="dr-rx-label">Clinic Timings</label>
                    <input className="form-input" value={timings} onChange={e => setTimings(e.target.value)} />
                </div>
                <div className="dr-form-group">
                    <label className="dr-rx-label">Clinic Address</label>
                    <textarea className="form-input" rows={2} value={address} onChange={e => setAddress(e.target.value)} />
                </div>
                <div className="dr-form-group">
                    <label className="dr-rx-label">Languages Spoken (comma-separated)</label>
                    <input className="form-input" value={langs} onChange={e => setLangs(e.target.value)} />
                </div>
                <button className="btn btn-primary btn-lg" onClick={save} style={{ marginTop: 24 }}>Save Changes</button>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   7. PATIENT HISTORY MODAL (Full-Screen)
══════════════════════════════════════════════════════════ */
function PatientHistoryModal({ patientName, onClose }) {
    const [data, setData] = useState(null);
    const [activeTab, setActiveTab] = useState('timeline');

    useEffect(() => {
        api.getPatientFullHistory(patientName).then(setData);
    }, [patientName]);

    if (!data) return (
        <div className="hm-overlay">
            <div className="hm-modal">
                <div className="hm-loading">Loading patient history...</div>
            </div>
        </div>
    );

    const d = data.demographics;
    const tabs = [
        ['timeline', '📋 Timeline'],
        ['conditions', '🏥 Conditions'],
        ['medications', '💊 Medications'],
        ['vitals', '📊 Vitals'],
    ];

    return (
        <div className="hm-overlay" onClick={onClose}>
            <div className="hm-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="hm-header">
                    <div>
                        <h2 className="hm-title">{d.name}</h2>
                        <div className="hm-demo">
                            <span>{d.age}y · {d.gender}</span>
                            <span>🩸 {d.bloodGroup}</span>
                            <span>ABHA: {d.abhaId}</span>
                            <span>📞 {d.phone}</span>
                        </div>
                        <div className="hm-emergency">🆘 Emergency: {d.emergencyContact}</div>
                    </div>
                    <button className="hm-close" onClick={onClose}>✕</button>
                </div>

                {/* Allergy Alert */}
                {data.allergies.length > 0 && (
                    <div className="hm-allergy-bar">
                        <strong>⚠️ DRUG ALLERGIES:</strong>
                        {data.allergies.map((a, i) => (
                            <span key={i} className="hm-allergy-chip">
                                {a.name} <span className={`hm-sev ${a.severity.toLowerCase()}`}>{a.severity}</span>
                                <span className="hm-allergy-rxn">→ {a.reaction}</span>
                            </span>
                        ))}
                    </div>
                )}

                {/* Tabs */}
                <div className="hm-tabs">
                    {tabs.map(([key, label]) => (
                        <button key={key} className={`hm-tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
                    ))}
                </div>

                {/* Content */}
                <div className="hm-body">

                    {activeTab === 'timeline' && (
                        <div className="hm-timeline">
                            {data.timeline.map((item, i) => (
                                <div key={i} className="hm-tl-item">
                                    <div className="hm-tl-dot">{item.icon}</div>
                                    <div className="hm-tl-content">
                                        <div className="hm-tl-head">
                                            <span className="hm-tl-date">{item.date}</span>
                                            <span className="hm-tl-type">{item.type}</span>
                                        </div>
                                        <h4 className="hm-tl-title">{item.title}</h4>
                                        <div className="hm-tl-facility">📍 {item.facility} · 👨‍⚕️ {item.doctor}</div>

                                        {/* Lab Results Table */}
                                        {item.details.length > 0 && item.details[0].test && (
                                            <table className="hm-lab-table">
                                                <thead><tr><th>Test</th><th>Value</th><th>Ref</th><th>Status</th></tr></thead>
                                                <tbody>
                                                    {item.details.map((r, j) => (
                                                        <tr key={j}><td>{r.test}</td><td className="hm-lab-val">{r.value}</td><td>{r.ref}</td><td>{r.flag}</td></tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}

                                        {/* Prescription Items */}
                                        {item.details.length > 0 && item.details[0].med && (
                                            <div className="hm-rx-list">
                                                {item.details.map((r, j) => (
                                                    <div key={j} className="hm-rx-item">
                                                        <span className="hm-rx-name">💊 {r.med}</span>
                                                        <span className="hm-rx-inst">{r.instruction}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Notes */}
                                        {item.notes && <div className="hm-tl-notes">{item.notes}</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'conditions' && (
                        <div>
                            <h3 className="hm-sec-title">Active & Past Conditions</h3>
                            {data.conditions.map((c, i) => (
                                <div key={i} className="hm-condition-card">
                                    <div className="hm-cond-name">{c.name}</div>
                                    <div className="hm-cond-meta">
                                        <span>Since: {c.since}</span>
                                        <span>Status: {c.status}</span>
                                        <span>Doctor: {c.treatingDoctor}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'medications' && (
                        <div>
                            <h3 className="hm-sec-title">Active Medications</h3>
                            <table className="hm-lab-table">
                                <thead><tr><th>Medicine</th><th>Dosage</th><th>Since</th><th>Prescribed By</th></tr></thead>
                                <tbody>
                                    {data.medications.map((m, i) => (
                                        <tr key={i}><td className="hm-lab-val">{m.name}</td><td>{m.dosage}</td><td>{m.since}</td><td>{m.prescribedBy}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'vitals' && (
                        <div>
                            <h3 className="hm-sec-title">Vitals History</h3>
                            <table className="hm-lab-table">
                                <thead><tr><th>Date</th><th>BP</th><th>Weight</th><th>Pulse</th><th>Temp</th><th>SpO₂</th></tr></thead>
                                <tbody>
                                    {data.vitals.map((v, i) => (
                                        <tr key={i}><td>{v.date}</td><td className="hm-lab-val">{v.bp}</td><td>{v.weight}</td><td>{v.pulse}</td><td>{v.temp}</td><td>{v.spo2}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
