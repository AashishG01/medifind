export const gu = {
    // Greeting
    good_morning: 'શુભ સવાર', good_afternoon: 'શુભ બપોર', good_evening: 'શુભ સાંજ',
    surat: 'સુરત',
    // Search
    what_problem: 'તમને શું તકલીફ છે?', describe: 'તમારી ભાષામાં લખો...',
    // Quick Find
    quick_find: 'ઝડપી શોધ', more: 'બધા',
    // Specialties
    cardio: 'હૃદય', neuro: 'ન્યુરો', ortho: 'હાડકા', pedia: 'બાળ',
    derma: 'ત્વચા', general: 'જનરલ', ent: 'ENT', psych: 'માનસિક',
    eye: 'આંખ', gastro: 'પેટ', pulmo: 'ફેફસા', dentist: 'દાંત',
    physio: 'ફિઝિયો', endo: 'હોર્મોન', gynec: 'સ્ત્રી રોગ',
    // Nav
    home: 'હોમ', search: 'શોધો', health: 'રેકોર્ડ', profile: 'પ્રોફાઇલ',
    // Symptom
    what_bothering: 'તમને શું તકલીફ છે?', describe_feeling: 'તમે કેવું અનુભવો છો?',
    common_complaints: 'સામાન્ય ફરિયાદો', we_suggest: 'અમે સૂચવીએ છીએ:',
    find_in_surat: 'સુરતમાં શોધો →', or_text: 'અથવા',
    // Doctors
    doctors_in_surat: 'સુરતમાં ડૉક્ટર', verified: '🟢 MediFind દ્વારા ચકાસાયેલ',
    yrs_exp: 'વર્ષ અનુભવ', consultation: 'કન્સલ્ટેશન',
    book_appointment: 'એપોઇન્ટમેન્ટ બુક કરો', about: 'વિશે', timings: 'સમય',
    clinic_label: 'ક્લિનિક', open_maps: 'નકશામાં ખોલો',
    // Booking
    select_date: 'તારીખ પસંદ કરો', continue_btn: 'આગળ →',
    whats_concern: 'તમને શું તકલીફ છે?', concern_hint: 'ડૉક્ટર આ તમારી મુલાકાત પહેલા જોશે',
    share_history: 'તમારો હેલ્થ ઇતિહાસ શેર કરશો?',
    share_desc: 'ડૉક્ટરને તમારો ઇતિહાસ બતાવો જેથી તેઓ યોગ્ય તૈયારી કરે.',
    share_yes: 'હા, શેર કરો', share_no: 'ના, રહેવા દો →',
    appt_requested: 'એપોઇન્ટમેન્ટ રિક્વેસ્ટ થઈ!',
    whatsapp_note: 'ક્લિનિક કન્ફર્મ કરે ત્યારે WhatsApp પર જાણ થશે. સામાન્ય રીતે 4 કલાકમાં.',
    view_appointment: 'એપોઇન્ટમેન્ટ જુઓ', back_home: 'હોમ પર પાછા →',
    // Medicine
    medicine_check: 'દવાના ભાવ', enter_medicine: 'દવાનું નામ લખો',
    branded: 'બ્રાન્ડેડ', generic_label: 'જેનેરિક', jan_aushadhi: 'જન ઔષધિ',
    per_month: '/મહિનો', save: 'બચત', per_year: 'વાર્ષિક બચત',
    yearly_save_label: 'જો તમે જેનેરિક/જન ઔષધિ લો તો',
    med_disclaimer: 'જેનેરિક દવા પર સ્વિચ કરતા પહેલા હંમેશા ડૉક્ટરની સલાહ લો.',
    // Records
    health_records: 'હેલ્થ રેકોર્ડ', health_records_gu: 'સ્વાસ્થ્ય રેકોર્ડ્સ',
    abha_linked: 'ABHA લિંક થયેલ', records_synced: 'રેકોર્ડ સિંક', upload_record: '+ રેકોર્ડ અપલોડ',
    prescriptions: 'પ્રિસ્ક્રિપ્શન', lab_reports: 'લેબ રિપોર્ટ', imaging: 'ઇમેજિંગ',
    // Profile
    profile_label: 'પ્રોફાઇલ', language: 'ભાષા', emergency_qr: 'ઇમર્જન્સી QR',
    personal_info: 'વ્યક્તિગત માહિતી', settings: 'સેટિંગ્સ',
    // Second Opinion
    second_opinion: 'બીજો અભિપ્રાય', so_desc: 'સ્વતંત્ર નિષ્ણાત 24 કલાકમાં ચુકાદો. ₹199 થી.',
    your_name: 'તમારું નામ', phone: 'ફોન', diagnosis: 'મૂળ નિદાન',
    treatment: 'સૂચિત સારવાર', hospital: 'હોસ્પિટલ', notes: 'નોંધ',
    submit: 'સબમિટ →', standard: 'રેગ્યુલર', urgent: 'અર્જન્ટ',
    submitted: '✅ સબમિટ થયો!',
    // Upcoming
    upcoming: 'આગામી', no_upcoming: 'કોઈ આગામી એપોઇન્ટમેન્ટ નથી',
};

export function t(key, lang) {
    if (lang === 'gu' && gu[key]) return gu[key];
    return null;
}
