const API = '/api';

export async function fetchStats() {
    const res = await fetch(`${API}/stats`);
    return res.json();
}

export async function fetchDoctors(params = {}) {
    const q = new URLSearchParams(params);
    const res = await fetch(`${API}/doctors?${q}`);
    return res.json();
}

export async function fetchDoctor(id) {
    const res = await fetch(`${API}/doctors/${id}`);
    return res.json();
}

export async function fetchSpecialties() {
    const res = await fetch(`${API}/specialties`);
    return res.json();
}

export async function fetchLocalities() {
    const res = await fetch(`${API}/localities`);
    return res.json();
}

export async function checkSymptoms(text) {
    const res = await fetch(`${API}/symptoms/check`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });
    return res.json();
}

export async function searchMedicines(q = '') {
    const res = await fetch(`${API}/medicines/search?q=${encodeURIComponent(q)}`);
    return res.json();
}

export async function fetchHealthRecords() {
    const res = await fetch(`${API}/health-records`);
    return res.json();
}

export async function bookAppointment(data) {
    const res = await fetch(`${API}/appointments`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function fetchAppointments() {
    const res = await fetch(`${API}/appointments`);
    return res.json();
}

export async function submitSecondOpinion(data) {
    const res = await fetch(`${API}/second-opinion`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}
