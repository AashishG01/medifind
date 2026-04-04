const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Load demo data
const doctors = require('./data/doctors.json');
const medicines = require('./data/medicines.json');
const symptoms = require('./data/symptoms.json');

// In-memory stores
let appointments = [];
let secondOpinions = [];
let appointmentIdCounter = 1;
let soIdCounter = 1;

// Demo health records (simulated ABHA)
const healthRecords = [
  { id: 1, type: "Blood Report", typeGu: "બ્લડ રિપોર્ટ", date: "2026-02-15", facility: "Kiran Lab, Surat", doctor: "Dr. Amit Patel", summary: "CBC - Hemoglobin: 13.2 g/dL, WBC: 7,200, Platelets: 2.5 Lakh. All values normal.", summaryGu: "CBC - હિમોગ્લોબિન: 13.2 g/dL, WBC: 7,200, પ્લેટલેટ્સ: 2.5 લાખ. બધી કિંમતો સામાન્ય." },
  { id: 2, type: "Prescription", typeGu: "પ્રિસ્ક્રિપ્શન", date: "2026-02-15", facility: "City Clinic, Adajan", doctor: "Dr. Amit Patel", summary: "Metformin 500mg BD, Telmisartan 40mg OD, Atorvastatin 10mg HS. Review after 3 months.", summaryGu: "મેટફોર્મીન 500mg BD, ટેલ્મિસાર્ટન 40mg OD, એટોર્વાસ્ટેટિન 10mg HS. 3 મહિના પછી ચેકઅપ." },
  { id: 3, type: "X-Ray", typeGu: "એક્સ-રે", date: "2026-01-20", facility: "Sterling Hospital, Surat", doctor: "Dr. Rajesh Mehta", summary: "Chest X-Ray PA view: No active lung pathology. Cardiomegaly absent. Normal study.", summaryGu: "છાતીનો એક્સ-રે: ફેફસાની કોઈ સક્રિય બીમારી નથી. સામાન્ય." },
  { id: 4, type: "Lab Report", typeGu: "લેબ રિપોર્ટ", date: "2025-12-10", facility: "SRL Diagnostics, Athwa", doctor: "Dr. Anita Rao", summary: "HbA1c: 7.2% (Target <7%). Fasting sugar: 142 mg/dL. Needs better diabetes control.", summaryGu: "HbA1c: 7.2% (લક્ષ્ય <7%). ફાસ્ટિંગ શુગર: 142 mg/dL. ડાયાબિટીસ નિયંત્રણ સુધારવું જરૂરી." },
  { id: 5, type: "Discharge Summary", typeGu: "ડિસ્ચાર્જ સમરી", date: "2025-08-05", facility: "BAPS Hospital, Surat", doctor: "Dr. Rajesh Mehta", summary: "Admitted for right knee arthroscopy. Procedure successful. Discharged on Day 2. Follow-up in 2 weeks.", summaryGu: "જમણા ઘૂંટણની આર્થ્રોસ્કોપી માટે દાખલ. પ્રક્રિયા સફળ. 2 દિવસે રજા. 2 અઠવાડિયામાં ફોલો-અપ." }
];

// ==================== API ROUTES ====================

// --- Doctor APIs ---
app.get('/api/doctors', (req, res) => {
  let result = [...doctors];
  const { specialty, locality, search, language, sort } = req.query;

  if (specialty && specialty !== 'all') {
    result = result.filter(d => d.specialty.toLowerCase() === specialty.toLowerCase());
  }
  if (locality && locality !== 'all') {
    result = result.filter(d => d.locality.toLowerCase() === locality.toLowerCase());
  }
  if (language) {
    result = result.filter(d => d.languages.some(l => l.toLowerCase() === language.toLowerCase()));
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.specialty.toLowerCase().includes(q) ||
      d.locality.toLowerCase().includes(q) ||
      d.nameGu.includes(search)
    );
  }

  // Sort by merit score (rating * 0.4 + reviewCount * 0.002 + experience * 0.01)
  if (sort === 'fee-low') {
    result.sort((a, b) => a.fee - b.fee);
  } else if (sort === 'fee-high') {
    result.sort((a, b) => b.fee - a.fee);
  } else if (sort === 'experience') {
    result.sort((a, b) => b.experience - a.experience);
  } else {
    // Default: merit-based
    result.sort((a, b) => {
      const scoreA = a.rating * 40 + Math.min(a.reviewCount, 200) * 0.1 + a.experience * 1;
      const scoreB = b.rating * 40 + Math.min(b.reviewCount, 200) * 0.1 + b.experience * 1;
      return scoreB - scoreA;
    });
  }

  res.json({ doctors: result, total: result.length });
});

app.get('/api/doctors/:id', (req, res) => {
  const doctor = doctors.find(d => d.id === parseInt(req.params.id));
  if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
  res.json(doctor);
});

app.get('/api/specialties', (req, res) => {
  const specialties = [...new Set(doctors.map(d => d.specialty))].sort();
  const specialtiesGu = {};
  doctors.forEach(d => { specialtiesGu[d.specialty] = d.specialtyGu; });
  res.json({ specialties, specialtiesGu });
});

app.get('/api/localities', (req, res) => {
  const localities = [...new Set(doctors.map(d => d.locality))].sort();
  res.json({ localities });
});

// --- Symptom Router ---
app.post('/api/symptoms/check', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Please describe your symptoms' });

  const query = text.toLowerCase();
  const matches = symptoms.filter(s =>
    s.keywords.some(k => query.includes(k.toLowerCase())) ||
    s.keywordsGu.some(k => text.includes(k))
  );

  if (matches.length === 0) {
    return res.json({
      found: false,
      message: "We couldn't match your symptoms automatically. We recommend visiting a General Physician for initial evaluation.",
      messageGu: "અમે તમારા લક્ષણો ઓળખી શક્યા નહીં. પ્રારંભિક તપાસ માટે જનરલ ફિઝિશિયન પાસે જવાની ભલામણ.",
      specialists: ["General Physician"],
      specialistsGu: ["જનરલ ફિઝિશિયન"],
      matchedDoctors: doctors.filter(d => d.specialty === "General Physician")
    });
  }

  // Combine results from all matches
  const allSpecialists = [...new Set(matches.flatMap(m => m.specialists))];
  const allSpecialistsGu = [...new Set(matches.flatMap(m => m.specialistsGu))];
  const highestUrgency = matches.some(m => m.urgency === 'high') ? 'high' : matches.some(m => m.urgency === 'medium') ? 'medium' : 'low';

  const matchedDoctors = doctors.filter(d => allSpecialists.includes(d.specialty));

  res.json({
    found: true,
    specialists: allSpecialists,
    specialistsGu: allSpecialistsGu,
    explanation: matches[0].explanation,
    explanationGu: matches[0].explanationGu,
    urgency: highestUrgency,
    matchedDoctors: matchedDoctors
  });
});

// --- Appointments ---
app.post('/api/appointments', (req, res) => {
  const { doctorId, patientName, phone, date, time, concern, shareRecords } = req.body;
  const doctor = doctors.find(d => d.id === parseInt(doctorId));
  if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

  const appointment = {
    id: appointmentIdCounter++,
    doctorId: doctor.id,
    doctorName: doctor.name,
    doctorSpecialty: doctor.specialty,
    clinicAddress: doctor.address,
    patientName,
    phone,
    date,
    time,
    concern,
    shareRecords: shareRecords || false,
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };
  appointments.push(appointment);
  res.json({ success: true, appointment });
});

app.get('/api/appointments', (req, res) => {
  res.json({ appointments: appointments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) });
});

// --- Medicine Price ---
app.get('/api/medicines/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.json({ medicines: medicines });

  const query = q.toLowerCase();
  const result = medicines.filter(m =>
    m.brandName.toLowerCase().includes(query) ||
    m.generic.toLowerCase().includes(query) ||
    m.category.toLowerCase().includes(query) ||
    m.brandNameGu.includes(q) ||
    m.categoryGu.includes(q)
  );
  res.json({ medicines: result });
});

// --- Health Records (Simulated ABHA) ---
app.get('/api/health-records', (req, res) => {
  res.json({
    abhaLinked: true,
    abhaId: "91-4623-8901-7234",
    patientName: "Rameshbhai Patel",
    patientNameGu: "રમેશભાઈ પટેલ",
    bloodGroup: "B+",
    allergies: ["Penicillin", "Sulfa drugs"],
    allergiesGu: ["પેનિસિલિન", "સલ્ફા દવાઓ"],
    conditions: ["Type 2 Diabetes", "Hypertension"],
    conditionsGu: ["ટાઈપ 2 ડાયાબિટીસ", "હાઈ બ્લડ પ્રેશર"],
    currentMeds: ["Metformin 500mg", "Telmisartan 40mg", "Atorvastatin 10mg"],
    records: healthRecords
  });
});

// --- Second Opinion ---
app.post('/api/second-opinion', (req, res) => {
  const { patientName, phone, diagnosis, treatment, hospital, amount, urgency, notes } = req.body;
  const opinion = {
    id: soIdCounter++,
    patientName,
    phone,
    diagnosis,
    treatment,
    hospital,
    amount: urgency === 'urgent' ? 499 : 199,
    urgency: urgency || 'standard',
    notes,
    status: 'Under Review',
    createdAt: new Date().toISOString(),
    estimatedDelivery: urgency === 'urgent' ? '12 hours' : '24 hours'
  };
  secondOpinions.push(opinion);
  res.json({ success: true, opinion });
});

app.get('/api/second-opinions', (req, res) => {
  res.json({ opinions: secondOpinions });
});

// --- Stats (for dashboard) ---
app.get('/api/stats', (req, res) => {
  res.json({
    totalDoctors: doctors.length,
    totalSpecialties: new Set(doctors.map(d => d.specialty)).size,
    totalAppointments: appointments.length,
    totalSecondOpinions: secondOpinions.length,
    totalLocalities: new Set(doctors.map(d => d.locality)).size,
    abhaRecords: healthRecords.length
  });
});

// Serve main page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n  🏥 MediFind MVP running at http://localhost:${PORT}\n`);
});
