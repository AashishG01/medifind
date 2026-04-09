import { useState, useEffect } from 'react';

/* ══════════════════════════════════════════════════════════
   ADMIN PANEL — Phase 6
   Doctor Onboarding | Content Moderation | Second Opinion Assignment | Analytics
══════════════════════════════════════════════════════════ */

const pendingDoctors = [
    { id: 101, name: 'Dr. Anil Gupta', specialty: 'Urologist', nmcId: 'GJ-2020-14321', phone: '9876501234', submittedAt: '2026-03-28', status: 'Pending' },
    { id: 102, name: 'Dr. Fatima Shaikh', specialty: 'Pulmonologist', nmcId: 'GJ-2019-09876', phone: '9876502345', submittedAt: '2026-03-30', status: 'Pending' },
    { id: 103, name: 'Dr. Chirag Patel', specialty: 'Oncologist', nmcId: 'GJ-2021-11234', phone: '9876503456', submittedAt: '2026-04-01', status: 'Pending' },
    { id: 104, name: 'Dr. Sneha Rao', specialty: 'Dermatologist', nmcId: 'KA-2018-07654', phone: '9876504567', submittedAt: '2026-04-02', status: 'Approved' },
];

const flaggedContent = [
    { id: 201, type: 'Review', author: 'Anonymous User', content: 'This doctor is terrible, do not visit!!!', doctor: 'Dr. Rajesh Mehta', reason: 'Abusive language', flaggedAt: '2026-04-05', status: 'Pending' },
    { id: 202, type: 'Review', author: 'PatientXYZ', content: 'Best doctor ever. Cured my cancer in one visit.', doctor: 'Dr. Priya Sharma', reason: 'Misleading claim', flaggedAt: '2026-04-06', status: 'Pending' },
    { id: 203, type: 'Profile Bio', author: 'Dr. Unknown', content: 'I guarantee 100% cure for all diseases.', doctor: 'Self', reason: 'Unverified medical claim', flaggedAt: '2026-04-07', status: 'Removed' },
];

const opinionQueue = [
    { id: 301, patient: 'Rameshbhai Patel', diagnosis: 'Coronary Artery Disease', urgency: 'urgent', submittedAt: '2026-04-06', assignedTo: null, status: 'Unassigned', sla: '24h' },
    { id: 302, patient: 'Geeta Desai', diagnosis: 'Lumbar Disc Herniation', urgency: 'standard', submittedAt: '2026-04-05', assignedTo: 'Dr. Rajesh Mehta', status: 'In Review', sla: '72h' },
    { id: 303, patient: 'Kiran Shah', diagnosis: 'Thyroid Nodule', urgency: 'standard', submittedAt: '2026-04-04', assignedTo: 'Dr. Priya Sharma', status: 'Resolved', sla: '72h' },
];

const reviewerPool = ['Dr. Rajesh Mehta', 'Dr. Priya Sharma', 'Dr. Amit Patel', 'Dr. Sanjay Joshi'];

export default function AdminPanel({ goPatient }) {
    const [tab, setTab] = useState('analytics');
    const [doctors, setDoctors] = useState(pendingDoctors);
    const [content, setContent] = useState(flaggedContent);
    const [opinions, setOpinions] = useState(opinionQueue);
    const [toast, setToast] = useState(null);

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3500); };

    const tabs = [
        ['analytics', '📊 Analytics'],
        ['doctors', '🏥 Doctor Onboarding'],
        ['moderation', '🛡️ Content Moderation'],
        ['opinions', '🩺 Second Opinions'],
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
            {/* Admin Navbar */}
            <nav style={{ background: '#0f172a', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#f59e0b,#d97706)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white', fontSize: 14 }}>A</div>
                    <span style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>MediFind <span style={{ color: '#f59e0b' }}>Admin</span></span>
                </div>
                <button onClick={goPatient} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '6px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>← Patient View</button>
            </nav>

            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>
                {/* Tab bar */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto', paddingBottom: 4 }}>
                    {tabs.map(([key, label]) => (
                        <button key={key} onClick={() => setTab(key)}
                            style={{ padding: '10px 20px', borderRadius: 10, border: tab === key ? '2px solid #1C52A0' : '1px solid #e2e8f0', background: tab === key ? '#1C52A0' : 'white', color: tab === key ? 'white' : '#334155', fontWeight: 600, cursor: 'pointer', fontSize: 14, whiteSpace: 'nowrap' }}>
                            {label}
                        </button>
                    ))}
                </div>

                {/* ═══ ANALYTICS ═══ */}
                {tab === 'analytics' && (
                    <div>
                        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>📊 Platform Analytics</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16, marginBottom: 32 }}>
                            {[
                                ['Daily Active Users', '2,847', '+12%', '📱', '#3b82f6'],
                                ['Bookings Today', '127', '+8%', '📅', '#059669'],
                                ['ABHA Links', '1,842', '+23%', '🏥', '#8b5cf6'],
                                ['Medicine Searches', '456', '+5%', '💊', '#f59e0b'],
                                ['Second Opinions', '34', '+15%', '🩺', '#ec4899'],
                                ['Revenue (MTD)', '₹63,500', '+18%', '💰', '#14b8a6'],
                            ].map(([label, value, change, icon, color]) => (
                                <div key={label} style={{ background: 'white', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>{label}</div>
                                            <div style={{ fontSize: 28, fontWeight: 800, color: '#0f172a' }}>{value}</div>
                                        </div>
                                        <span style={{ background: `${color}15`, width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{icon}</span>
                                    </div>
                                    <div style={{ marginTop: 8, fontSize: 12, color: '#059669', fontWeight: 600 }}>↑ {change} vs last week</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <div style={{ background: 'white', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
                                <h3 style={{ marginBottom: 12 }}>🏆 Top Specialties (Bookings)</h3>
                                {[['Orthopedic', 34, '#3b82f6'], ['Cardiologist', 28, '#ef4444'], ['General Physician', 24, '#059669'], ['Gynecologist', 18, '#8b5cf6'], ['Dermatologist', 15, '#f59e0b']].map(([s, v, c]) => (
                                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                        <div style={{ flex: 1, fontSize: 14 }}>{s}</div>
                                        <div style={{ width: 120, height: 8, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}><div style={{ width: `${(v / 34) * 100}%`, height: '100%', background: c, borderRadius: 4 }} /></div>
                                        <div style={{ fontSize: 13, fontWeight: 700, width: 30 }}>{v}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ background: 'white', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
                                <h3 style={{ marginBottom: 12 }}>📍 User Geography</h3>
                                {[['Adajan', '28%'], ['Vesu', '22%'], ['Varachha', '18%'], ['Athwa', '16%'], ['Katargam', '10%'], ['Others', '6%']].map(([area, pct]) => (
                                    <div key={area} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f5f9', fontSize: 14 }}>
                                        <span>{area}</span>
                                        <span style={{ fontWeight: 600 }}>{pct}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ═══ DOCTOR ONBOARDING ═══ */}
                {tab === 'doctors' && (
                    <div>
                        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>🏥 Doctor Onboarding Queue</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {doctors.map(doc => (
                                <div key={doc.id} style={{ background: 'white', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 16 }}>{doc.name}</div>
                                        <div style={{ fontSize: 13, color: '#64748b' }}>{doc.specialty} · NMC: {doc.nmcId}</div>
                                        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>📱 {doc.phone} · Submitted: {doc.submittedAt}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                        <span style={{ padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700, background: doc.status === 'Approved' ? '#ecfdf5' : doc.status === 'Rejected' ? '#fef2f2' : '#fef3c7', color: doc.status === 'Approved' ? '#059669' : doc.status === 'Rejected' ? '#dc2626' : '#b45309' }}>{doc.status}</span>
                                        {doc.status === 'Pending' && (
                                            <>
                                                <button onClick={() => { setDoctors(ds => ds.map(d => d.id === doc.id ? { ...d, status: 'Approved' } : d)); showToast('✅ Doctor approved!'); }}
                                                    style={{ padding: '6px 16px', borderRadius: 8, border: 'none', background: '#059669', color: 'white', fontWeight: 600, cursor: 'pointer' }}>Approve</button>
                                                <button onClick={() => { setDoctors(ds => ds.map(d => d.id === doc.id ? { ...d, status: 'Rejected' } : d)); showToast('❌ Doctor rejected.'); }}
                                                    style={{ padding: '6px 16px', borderRadius: 8, border: '1px solid #dc2626', background: 'white', color: '#dc2626', fontWeight: 600, cursor: 'pointer' }}>Reject</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ═══ CONTENT MODERATION ═══ */}
                {tab === 'moderation' && (
                    <div>
                        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>🛡️ Content Moderation Queue</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {content.map(item => (
                                <div key={item.id} style={{ background: 'white', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                                        <div>
                                            <span style={{ background: '#e0e7ff', color: '#4338ca', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>{item.type}</span>
                                            <span style={{ marginLeft: 8, fontSize: 13, color: '#64748b' }}>by {item.author} · on {item.doctor}</span>
                                        </div>
                                        <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700, background: item.status === 'Removed' ? '#fef2f2' : '#fef3c7', color: item.status === 'Removed' ? '#dc2626' : '#b45309' }}>{item.status}</span>
                                    </div>
                                    <div style={{ background: '#fef2f2', padding: 12, borderRadius: 8, marginBottom: 8, fontSize: 14, borderLeft: '3px solid #dc2626' }}>
                                        "{item.content}"
                                    </div>
                                    <div style={{ fontSize: 12, color: '#ef4444', marginBottom: 12 }}>🚩 Reason: {item.reason} · Flagged: {item.flaggedAt}</div>
                                    {item.status === 'Pending' && (
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button onClick={() => { setContent(cs => cs.map(c => c.id === item.id ? { ...c, status: 'Approved' } : c)); showToast('✅ Content approved.'); }}
                                                style={{ padding: '6px 16px', borderRadius: 8, border: '1px solid #059669', background: 'white', color: '#059669', fontWeight: 600, cursor: 'pointer' }}>Approve</button>
                                            <button onClick={() => { setContent(cs => cs.map(c => c.id === item.id ? { ...c, status: 'Removed' } : c)); showToast('🗑️ Content removed.'); }}
                                                style={{ padding: '6px 16px', borderRadius: 8, border: 'none', background: '#dc2626', color: 'white', fontWeight: 600, cursor: 'pointer' }}>Remove</button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ═══ SECOND OPINION ASSIGNMENT ═══ */}
                {tab === 'opinions' && (
                    <div>
                        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>🩺 Second Opinion Assignment</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {opinions.map(op => (
                                <div key={op.id} style={{ background: 'white', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: 16 }}>{op.patient}</div>
                                            <div style={{ fontSize: 14, color: '#64748b' }}>{op.diagnosis}</div>
                                            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Submitted: {op.submittedAt} · SLA: {op.sla}</div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                                            <span style={{ padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700, background: op.urgency === 'urgent' ? '#fef2f2' : '#f0fdf4', color: op.urgency === 'urgent' ? '#dc2626' : '#16a34a' }}>{op.urgency.toUpperCase()}</span>
                                            <span style={{ padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700, background: op.status === 'Resolved' ? '#ecfdf5' : op.status === 'In Review' ? '#eff6ff' : '#fef3c7', color: op.status === 'Resolved' ? '#059669' : op.status === 'In Review' ? '#2563eb' : '#b45309' }}>{op.status}</span>
                                        </div>
                                    </div>
                                    {op.status === 'Unassigned' && (
                                        <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
                                            <select style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} id={`assign-${op.id}`}>
                                                <option value="">Select reviewer...</option>
                                                {reviewerPool.map(r => <option key={r} value={r}>{r}</option>)}
                                            </select>
                                            <button onClick={() => {
                                                const sel = document.getElementById(`assign-${op.id}`).value;
                                                if (!sel) return;
                                                setOpinions(ops => ops.map(o => o.id === op.id ? { ...o, assignedTo: sel, status: 'In Review' } : o));
                                                showToast(`✅ Assigned to ${sel}`);
                                            }} style={{ padding: '6px 16px', borderRadius: 8, border: 'none', background: '#1C52A0', color: 'white', fontWeight: 600, cursor: 'pointer' }}>Assign</button>
                                        </div>
                                    )}
                                    {op.assignedTo && <div style={{ marginTop: 8, fontSize: 13, color: '#64748b' }}>👨‍⚕️ Assigned to: <strong>{op.assignedTo}</strong></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {toast && <div style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', background: '#0f172a', color: 'white', padding: '12px 24px', borderRadius: 12, zIndex: 9999, fontWeight: 600 }}>{toast}</div>}
        </div>
    );
}
