// Hardcoded mock data to bypass backend
const doctors = [
    {
        "id": 1,
        "name": "Dr. Rajesh Mehta",
        "nameGu": "ડૉ. રાજેશ મહેતા",
        "specialty": "Orthopedic Surgeon",
        "specialtyGu": "ઓર્થોપેડિક સર્જન",
        "qualification": "MBBS, MS (Ortho) - Gujarat University",
        "experience": 18,
        "fee": 500,
        "rating": 4.7,
        "reviewCount": 142,
        "languages": ["English", "Gujarati", "Hindi"],
        "locality": "Vesu",
        "address": "304, Shreeji Complex, Vesu Main Road, Surat - 395007",
        "phone": "+91 98765 43210",
        "timings": "Mon-Sat: 10:00 AM - 1:00 PM, 5:00 PM - 8:00 PM",
        "about": "Dr. Rajesh Mehta is a senior orthopedic surgeon with 18 years of experience specializing in joint replacements, sports injuries, and spinal disorders. He has performed over 3,000 surgeries and is known for his patient-first approach.",
        "aboutGu": "ડૉ. રાજેશ મહેતા 18 વર્ષના અનુભવ સાથે વરિષ્ઠ ઓર્થોપેડિક સર્જન છે. તેઓ જોઈન્ટ રિપ્લેસમેન્ટ, સ્પોર્ટ્સ ઈન્જરીઝ અને સ્પાઈનલ ડિસઓર્ડર્સમાં નિષ્ણાત છે.",
        "verified": true,
        "nmcId": "GJ-2008-04521",
        "gender": "Male",
        "photo": "https://api.dicebear.com/7.x/personas/svg?seed=rajesh"
    },
    {
        "id": 2,
        "name": "Dr. Priya Sharma",
        "nameGu": "ડૉ. પ્રિયા શર્મા",
        "specialty": "Cardiologist",
        "specialtyGu": "કાર્ડિયોલોજિસ્ટ",
        "qualification": "MBBS, MD (Medicine), DM (Cardiology) - AIIMS Delhi",
        "experience": 14,
        "fee": 800,
        "rating": 4.9,
        "reviewCount": 218,
        "languages": ["English", "Hindi", "Gujarati"],
        "locality": "Athwa",
        "address": "201, Hira Panna Complex, Athwa Gate, Surat - 395001",
        "phone": "+91 98765 43211",
        "timings": "Mon-Fri: 9:00 AM - 12:00 PM, 4:00 PM - 7:00 PM",
        "about": "Dr. Priya Sharma is a leading cardiologist in Surat with expertise in interventional cardiology, echocardiography, and preventive heart care.",
        "aboutGu": "ડૉ. પ્રિયા શર્મા સુરતના અગ્રણી કાર્ડિયોલોજિસ્ટ છે. તેઓ ઇન્ટરવેન્શનલ કાર્ડિયોલોજી અને પ્રિવેન્ટિવ હાર્ટ કેરમાં નિષ્ણાત છે.",
        "verified": true,
        "nmcId": "DL-2012-08934",
        "gender": "Female",
        "photo": "https://api.dicebear.com/7.x/personas/svg?seed=priya"
    },
    {
        "id": 3,
        "name": "Dr. Amit Patel",
        "nameGu": "ડૉ. અમિત પટેલ",
        "specialty": "General Physician",
        "specialtyGu": "જનરલ ફિઝિશિયન",
        "qualification": "MBBS, MD (General Medicine) - BJ Medical College",
        "experience": 12,
        "fee": 300,
        "rating": 4.5,
        "reviewCount": 312,
        "languages": ["Gujarati", "Hindi", "English"],
        "locality": "Adajan",
        "address": "105, Sai Dham Complex, Adajan Patiya, Surat - 395009",
        "phone": "+91 98765 43212",
        "timings": "Mon-Sat: 8:00 AM - 12:00 PM, 5:00 PM - 9:00 PM",
        "about": "Dr. Amit Patel is a trusted family physician with 12 years of experience. Known for his thorough diagnosis and compassionate care, he treats a wide range of common and chronic conditions.",
        "aboutGu": "ડૉ. અમિત પટેલ 12 વર્ષના અનુભવ સાથે વિશ્વસનીય ફેમિલી ફિઝિશિયન છે. તેઓ સામાન્ય અને ક્રોનિક બીમારીઓની સારવારમાં નિષ્ણાત છે.",
        "verified": true,
        "nmcId": "GJ-2014-06723",
        "gender": "Male",
        "photo": "https://api.dicebear.com/7.x/personas/svg?seed=amit"
    },
    {
        "id": 4,
        "name": "Dr. Neha Desai",
        "nameGu": "ડૉ. નેહા દેસાઈ",
        "specialty": "Gynecologist",
        "specialtyGu": "ગાયનેકોલોજિસ્ટ",
        "qualification": "MBBS, MS (OBG) - MS University Baroda",
        "experience": 10,
        "fee": 600,
        "rating": 4.8,
        "reviewCount": 186,
        "languages": ["Gujarati", "English", "Hindi"],
        "locality": "City Light",
        "address": "402, Shreeji Tower, City Light Road, Surat - 395007",
        "phone": "+91 98765 43213",
        "timings": "Mon-Sat: 10:00 AM - 1:00 PM, 4:00 PM - 7:00 PM",
        "about": "Dr. Neha Desai specializes in high-risk pregnancies, laparoscopic surgery, and women's health. She is known for her patient-friendly consultations.",
        "aboutGu": "ડૉ. નેહા દેસાઈ હાઈ-રિસ્ક પ્રેગ્નન્સી, લેપ્રોસ્કોપિક સર્જરી અને મહિલા સ્વાસ્થ્યમાં નિષ્ણાત છે.",
        "verified": true,
        "nmcId": "GJ-2016-09281",
        "gender": "Female",
        "photo": "https://api.dicebear.com/7.x/personas/svg?seed=neha"
    },
    {
        "id": 5,
        "name": "Dr. Sanjay Joshi",
        "nameGu": "ડૉ. સંજય જોશી",
        "specialty": "Neurologist",
        "specialtyGu": "ન્યુરોલોજિસ્ટ",
        "qualification": "MBBS, MD, DM (Neurology) - KEM Mumbai",
        "experience": 16,
        "fee": 700,
        "rating": 4.6,
        "reviewCount": 98,
        "languages": ["English", "Hindi", "Gujarati"],
        "locality": "Athwa",
        "address": "506, Rudra Arcade, Ring Road, Athwa, Surat - 395001",
        "phone": "+91 98765 43214",
        "timings": "Mon-Fri: 11:00 AM - 2:00 PM, 5:00 PM - 8:00 PM",
        "about": "Dr. Sanjay Joshi is a renowned neurologist treating migraines, epilepsy, stroke, and neurodegenerative disorders with 16 years of experience.",
        "aboutGu": "ડૉ. સંજય જોશી 16 વર્ષના અનુભવ સાથે પ્રખ્યાત ન્યુરોલોજિસ્ટ છે. તેઓ માઈગ્રેન, એપિલેપ્સી અને સ્ટ્રોકની સારવારમાં નિષ્ણાત છે.",
        "verified": true,
        "nmcId": "MH-2010-07312",
        "gender": "Male",
        "photo": "https://api.dicebear.com/7.x/personas/svg?seed=sanjay"
    },
    {
        "id": 6,
        "name": "Dr. Kavita Shah",
        "nameGu": "ડૉ. કવિતા શાહ",
        "specialty": "Dermatologist",
        "specialtyGu": "ડર્મેટોલોજિસ્ટ",
        "qualification": "MBBS, MD (Dermatology) - SMS Medical College Jaipur",
        "experience": 9,
        "fee": 500,
        "rating": 4.4,
        "reviewCount": 167,
        "languages": ["Hindi", "Gujarati", "English"],
        "locality": "Vesu",
        "address": "203, Platinum Plaza, Vesu Cross Road, Surat - 395007",
        "phone": "+91 98765 43215",
        "timings": "Mon-Sat: 10:00 AM - 1:00 PM, 3:00 PM - 6:00 PM",
        "about": "Dr. Kavita Shah treats acne, eczema, psoriasis, and cosmetic skin conditions. She provides both medical and aesthetic dermatology services.",
        "aboutGu": "ડૉ. કવિતા શાહ ખીલ, ખરજવું, સોરાયસિસ અને ત્વચાની સમસ્યાઓની સારવાર કરે છે.",
        "verified": true,
        "nmcId": "RJ-2017-04891",
        "gender": "Female",
        "photo": "https://api.dicebear.com/7.x/personas/svg?seed=kavita"
    },
    {
        "id": 7,
        "name": "Dr. Vikram Singh",
        "nameGu": "ડૉ. વિક્રમ સિંહ",
        "specialty": "Pediatrician",
        "specialtyGu": "બાળરોગ નિષ્ણાત",
        "qualification": "MBBS, MD (Pediatrics) - GMERS Sola, Ahmedabad",
        "experience": 11,
        "fee": 400,
        "rating": 4.8,
        "reviewCount": 245,
        "languages": ["Gujarati", "Hindi", "English"],
        "locality": "Katargam",
        "address": "101, Shivam Complex, Katargam Main Road, Surat - 395004",
        "phone": "+91 98765 43216",
        "timings": "Mon-Sat: 9:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
        "about": "Dr. Vikram Singh is a compassionate pediatrician specializing in newborn care, vaccinations, growth monitoring, and childhood illnesses.",
        "aboutGu": "ડૉ. વિક્રમ સિંહ નવજાત શિશુની સંભાળ, રસીકરણ અને બાળપણની બીમારીઓમાં નિષ્ણાત છે.",
        "verified": true,
        "nmcId": "GJ-2015-05672",
        "gender": "Male",
        "photo": "https://api.dicebear.com/7.x/personas/svg?seed=vikram"
    },
    {
        "id": 8,
        "name": "Dr. Meera Iyer",
        "nameGu": "ડૉ. મીરા અય્યર",
        "specialty": "ENT Specialist",
        "specialtyGu": "ENT નિષ્ણાત",
        "qualification": "MBBS, MS (ENT) - Government Medical College Surat",
        "experience": 13,
        "fee": 450,
        "rating": 4.3,
        "reviewCount": 89,
        "languages": ["English", "Gujarati", "Tamil"],
        "locality": "Adajan",
        "address": "306, Sahjanand Complex, Adajan, Surat - 395009",
        "phone": "+91 98765 43217",
        "timings": "Mon-Fri: 10:00 AM - 1:00 PM, 5:00 PM - 8:00 PM",
        "about": "Dr. Meera Iyer specializes in ear infections, sinusitis, hearing disorders, and tonsil problems. Expert in endoscopic sinus surgery.",
        "aboutGu": "ડૉ. મીરા અય્યર કાનના ચેપ, સાઈનસ, શ્રવણ સમસ્યાઓ અને ટોન્સિલ સમસ્યાઓમાં નિષ્ણાત છે.",
        "verified": true,
        "nmcId": "GJ-2013-03456",
        "gender": "Female",
        "photo": "https://api.dicebear.com/7.x/personas/svg?seed=meera"
    },
    {
        "id": 9,
        "name": "Dr. Harsh Trivedi",
        "nameGu": "ડૉ. હર્ષ ત્રિવેદી",
        "specialty": "Psychiatrist",
        "specialtyGu": "માનસિક રોગ નિષ્ણાત",
        "qualification": "MBBS, MD (Psychiatry) - NIMHANS Bangalore",
        "experience": 8,
        "fee": 600,
        "rating": 4.7,
        "reviewCount": 76,
        "languages": ["Gujarati", "English", "Hindi"],
        "locality": "City Light",
        "address": "501, Satyam Tower, City Light, Surat - 395007",
        "phone": "+91 98765 43218",
        "timings": "Mon-Sat: 11:00 AM - 2:00 PM, 5:00 PM - 7:00 PM",
        "about": "Dr. Harsh Trivedi specializes in anxiety, depression, OCD, sleep disorders, and de-addiction treatment. Provides a stigma-free environment.",
        "aboutGu": "ડૉ. હર્ષ ત્રિવેદી ચિંતા, ડિપ્રેશન, OCD અને ઊંઘની સમસ્યાઓની સારવારમાં નિષ્ણાત છે.",
        "verified": true,
        "nmcId": "KA-2018-09123",
        "gender": "Male",
        "photo": "https://api.dicebear.com/7.x/personas/svg?seed=harsh"
    },
    {
        "id": 10,
        "name": "Dr. Rupa Bhatt",
        "nameGu": "ડૉ. રૂપા ભટ્ટ",
        "specialty": "Ophthalmologist",
        "specialtyGu": "આંખના નિષ્ણાત",
        "qualification": "MBBS, MS (Ophthalmology) - LV Prasad Eye Institute",
        "experience": 15,
        "fee": 500,
        "rating": 4.6,
        "reviewCount": 134,
        "languages": ["Gujarati", "Hindi", "English"],
        "locality": "Varachha",
        "address": "102, Diamond World, Varachha Road, Surat - 395006",
        "phone": "+91 98765 43219",
        "timings": "Mon-Sat: 9:00 AM - 1:00 PM, 3:00 PM - 6:00 PM",
        "about": "Dr. Rupa Bhatt is an experienced ophthalmologist specializing in cataract surgery, LASIK, glaucoma management, and diabetic retinopathy.",
        "aboutGu": "ડૉ. રૂપા ભટ્ટ મોતિયા સર્જરી, LASIK, ગ્લુકોમા અને ડાયાબિટીક રેટિનોપેથીમાં નિષ્ણાત છે.",
        "verified": true,
        "nmcId": "AP-2011-06789",
        "gender": "Female",
        "photo": "https://api.dicebear.com/7.x/personas/svg?seed=rupa"
    },
    {
        "id": 11,
        "name": "Dr. Kiran Nair",
        "nameGu": "ડૉ. કિરણ નાયર",
        "specialty": "Dentist",
        "specialtyGu": "દંત ચિકિત્સક",
        "qualification": "BDS, MDS (Orthodontics) - Government Dental College Surat",
        "experience": 10,
        "fee": 350,
        "rating": 4.5,
        "reviewCount": 201,
        "languages": ["Gujarati", "English", "Malayalam"],
        "locality": "Adajan",
        "address": "207, Royal Square, Adajan, Surat - 395009",
        "phone": "+91 98765 43220",
        "timings": "Mon-Sat: 9:30 AM - 1:00 PM, 4:00 PM - 8:00 PM",
        "about": "Dr. Kiran Nair provides comprehensive dental care including braces, root canal, dental implants, teeth whitening, and cosmetic dentistry.",
        "aboutGu": "ડૉ. કિરણ નાયર બ્રેસિસ, રૂટ કેનાલ, ડેન્ટલ ઇમ્પ્લાન્ટ અને કોસ્મેટિક ડેન્ટિસ્ટ્રીમાં નિષ્ણાત છે.",
        "verified": true,
        "nmcId": "GJ-2016-08945",
        "gender": "Male",
        "photo": "https://api.dicebear.com/7.x/personas/svg?seed=kiran"
    },
    {
        "id": 12,
        "name": "Dr. Pooja Agarwal",
        "nameGu": "ડૉ. પૂજા અગ્રવાલ",
        "specialty": "Physiotherapist",
        "specialtyGu": "ફિઝિયોથેરાપિસ્ટ",
        "qualification": "BPT, MPT (Neuro) - SBB College of Physiotherapy",
        "experience": 7,
        "fee": 400,
        "rating": 4.4,
        "reviewCount": 112,
        "languages": ["Hindi", "Gujarati", "English"],
        "locality": "Vesu",
        "address": "Ground Floor, Avadh Residency, Vesu, Surat - 395007",
        "phone": "+91 98765 43221",
        "timings": "Mon-Sat: 8:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
        "about": "Dr. Pooja Agarwal specializes in neuro rehabilitation, sports physiotherapy, back pain management, and post-surgical recovery.",
        "aboutGu": "ડૉ. પૂજા અગ્રવાલ ન્યુરો રિહેબિલિટેશન, સ્પોર્ટ્સ ફિઝિયોથેરાપી અને કમરના દુખાવાની સારવારમાં નિષ્ણાત છે.",
        "verified": true,
        "nmcId": "GJ-2019-11234",
        "gender": "Female",
        "photo": "https://api.dicebear.com/7.x/personas/svg?seed=pooja"
    },
    {
        "id": 13,
        "name": "Dr. Mahesh Gupta",
        "nameGu": "ડૉ. મહેશ ગુપ્તા",
        "specialty": "Gastroenterologist",
        "specialtyGu": "ગેસ્ટ્રોએન્ટેરોલોજિસ્ટ",
        "qualification": "MBBS, MD, DM (Gastroenterology) - PGI Chandigarh",
        "experience": 14,
        "fee": 700,
        "rating": 4.7,
        "reviewCount": 95,
        "languages": ["Hindi", "English", "Gujarati"],
        "locality": "Athwa",
        "address": "303, Luxuria Business Hub, Athwa, Surat - 395001",
        "phone": "+91 98765 43222",
        "timings": "Mon-Sat: 10:00 AM - 1:00 PM, 5:00 PM - 8:00 PM",
        "about": "Dr. Mahesh Gupta is an expert in endoscopy, liver diseases, IBD, and digestive disorders with fellowship training from PGI Chandigarh.",
        "aboutGu": "ડૉ. મહેશ ગુપ્તા એન્ડોસ્કોપી, લિવરના રોગો અને પાચન સમસ્યાઓમાં નિષ્ણાત છે.",
        "verified": true,
        "nmcId": "CH-2012-07456",
        "gender": "Male",
        "photo": "https://api.dicebear.com/7.x/personas/svg?seed=mahesh"
    },
    {
        "id": 14,
        "name": "Dr. Anita Rao",
        "nameGu": "ડૉ. અનિતા રાવ",
        "specialty": "Endocrinologist",
        "specialtyGu": "એન્ડોક્રિનોલોજિસ્ટ",
        "qualification": "MBBS, MD, DM (Endocrinology) - CMC Vellore",
        "experience": 11,
        "fee": 650,
        "rating": 4.8,
        "reviewCount": 108,
        "languages": ["English", "Hindi", "Gujarati"],
        "locality": "City Light",
        "address": "401, Orchid Business Park, City Light, Surat - 395007",
        "phone": "+91 98765 43223",
        "timings": "Mon-Fri: 9:00 AM - 12:00 PM, 4:00 PM - 7:00 PM",
        "about": "Dr. Anita Rao specializes in diabetes management, thyroid disorders, PCOS, and hormonal imbalances. Known for comprehensive metabolic care.",
        "aboutGu": "ડૉ. અનિતા રાવ ડાયાબિટીસ, થાઈરોઈડ, PCOS અને હોર્મોનલ સમસ્યાઓની સારવારમાં નિષ્ણાત છે.",
        "verified": true,
        "nmcId": "TN-2015-08901",
        "gender": "Female",
        "photo": "https://api.dicebear.com/7.x/personas/svg?seed=anita"
    },
    {
        "id": 15,
        "name": "Dr. Dhruv Patel",
        "nameGu": "ડૉ. ધ્રુવ પટેલ",
        "specialty": "Pulmonologist",
        "specialtyGu": "પલ્મોનોલોજિસ્ટ",
        "qualification": "MBBS, MD (Pulmonary Medicine) - GCRI Ahmedabad",
        "experience": 9,
        "fee": 550,
        "rating": 4.5,
        "reviewCount": 67,
        "languages": ["Gujarati", "Hindi", "English"],
        "locality": "Katargam",
        "address": "208, Aditya Business Hub, Katargam, Surat - 395004",
        "phone": "+91 98765 43224",
        "timings": "Mon-Sat: 10:00 AM - 1:00 PM, 5:00 PM - 8:00 PM",
        "about": "Dr. Dhruv Patel treats asthma, COPD, TB, sleep apnea, and respiratory infections. Expert in bronchoscopy and pulmonary function testing.",
        "aboutGu": "ડૉ. ધ્રુવ પટેલ અસ્થમા, COPD, TB અને શ્વસન ચેપની સારવારમાં નિષ્ણાત છે.",
        "verified": true,
        "nmcId": "GJ-2017-10234",
        "gender": "Male",
        "photo": "https://api.dicebear.com/7.x/personas/svg?seed=dhruv"
    }
];

const medicines = [
    {
        "id": 1,
        "brandName": "Glycomet GP 2",
        "brandNameGu": "ગ્લાયકોમેટ GP 2",
        "generic": "Metformin 500mg + Glimepiride 2mg",
        "genericGu": "મેટફોર્મિન 500mg + ગ્લિમેપિરાઈડ 2mg",
        "category": "Diabetes",
        "categoryGu": "ડાયાબિટીસ",
        "brandPrice": 185,
        "genericPrice": 32,
        "janAushadhiPrice": 18,
        "unit": "Strip of 10 tablets",
        "monthlyBrand": 555,
        "monthlyGeneric": 96,
        "monthlyJanAushadhi": 54,
        "monthlySavings": 501
    },
    {
        "id": 2,
        "brandName": "Telma 40",
        "brandNameGu": "ટેલ્મા 40",
        "generic": "Telmisartan 40mg",
        "genericGu": "ટેલ્મિસાર્ટન 40mg",
        "category": "Blood Pressure",
        "categoryGu": "બ્લડ પ્રેશર",
        "brandPrice": 142,
        "genericPrice": 28,
        "janAushadhiPrice": 12,
        "unit": "Strip of 10 tablets",
        "monthlyBrand": 426,
        "monthlyGeneric": 84,
        "monthlyJanAushadhi": 36,
        "monthlySavings": 390
    },
    {
        "id": 3,
        "brandName": "Ecosprin 75",
        "brandNameGu": "ઈકોસ્પ્રિન 75",
        "generic": "Aspirin 75mg",
        "genericGu": "એસ્પિરિન 75mg",
        "category": "Heart / Blood Thinner",
        "categoryGu": "હૃદય / લોહી પાતળું",
        "brandPrice": 35,
        "genericPrice": 12,
        "janAushadhiPrice": 6,
        "unit": "Strip of 14 tablets",
        "monthlyBrand": 75,
        "monthlyGeneric": 26,
        "monthlyJanAushadhi": 13,
        "monthlySavings": 62
    },
    {
        "id": 4,
        "brandName": "Thyronorm 50",
        "brandNameGu": "થાઈરોનોર્મ 50",
        "generic": "Levothyroxine 50mcg",
        "genericGu": "લેવોથાઈરોક્સિન 50mcg",
        "category": "Thyroid",
        "categoryGu": "થાઈરોઈડ",
        "brandPrice": 115,
        "genericPrice": 30,
        "janAushadhiPrice": 14,
        "unit": "Strip of 30 tablets",
        "monthlyBrand": 115,
        "monthlyGeneric": 30,
        "monthlyJanAushadhi": 14,
        "monthlySavings": 101
    },
    {
        "id": 5,
        "brandName": "Pan 40",
        "brandNameGu": "પેન 40",
        "generic": "Pantoprazole 40mg",
        "genericGu": "પેન્ટોપ્રાઝોલ 40mg",
        "category": "Acidity / Gastric",
        "categoryGu": "એસિડિટી / ગેસ્ટ્રિક",
        "brandPrice": 120,
        "genericPrice": 22,
        "janAushadhiPrice": 10,
        "unit": "Strip of 10 tablets",
        "monthlyBrand": 360,
        "monthlyGeneric": 66,
        "monthlyJanAushadhi": 30,
        "monthlySavings": 330
    },
    {
        "id": 6,
        "brandName": "Crocin Advance",
        "brandNameGu": "ક્રોસિન એડવાન્સ",
        "generic": "Paracetamol 500mg",
        "genericGu": "પેરાસિટામોલ 500mg",
        "category": "Fever / Pain",
        "categoryGu": "તાવ / દુખાવો",
        "brandPrice": 32,
        "genericPrice": 8,
        "janAushadhiPrice": 3,
        "unit": "Strip of 10 tablets",
        "monthlyBrand": 96,
        "monthlyGeneric": 24,
        "monthlyJanAushadhi": 9,
        "monthlySavings": 87
    },
    {
        "id": 7,
        "brandName": "Atorva 10",
        "brandNameGu": "એટોર્વા 10",
        "generic": "Atorvastatin 10mg",
        "genericGu": "એટોર્વાસ્ટેટિન 10mg",
        "category": "Cholesterol",
        "categoryGu": "કોલેસ્ટ્રોલ",
        "brandPrice": 98,
        "genericPrice": 18,
        "janAushadhiPrice": 8,
        "unit": "Strip of 10 tablets",
        "monthlyBrand": 294,
        "monthlyGeneric": 54,
        "monthlyJanAushadhi": 24,
        "monthlySavings": 270
    },
    {
        "id": 8,
        "brandName": "Augmentin 625",
        "brandNameGu": "ઓગમેન્ટિન 625",
        "generic": "Amoxicillin 500mg + Clavulanate 125mg",
        "genericGu": "એમોક્સિસિલિન 500mg + ક્લેવ્યુલેનેટ 125mg",
        "category": "Antibiotic",
        "categoryGu": "એન્ટિબાયોટિક",
        "brandPrice": 210,
        "genericPrice": 65,
        "janAushadhiPrice": 35,
        "unit": "Strip of 6 tablets",
        "monthlyBrand": 210,
        "monthlyGeneric": 65,
        "monthlyJanAushadhi": 35,
        "monthlySavings": 175
    },
    {
        "id": 9,
        "brandName": "Shelcal 500",
        "brandNameGu": "શેલકેલ 500",
        "generic": "Calcium Carbonate 500mg + Vitamin D3",
        "genericGu": "કેલ્શિયમ કાર્બોનેટ 500mg + વિટામિન D3",
        "category": "Bone Health / Vitamin",
        "categoryGu": "હાડકાનું સ્વાસ્થ્ય / વિટામિન",
        "brandPrice": 145,
        "genericPrice": 45,
        "janAushadhiPrice": 20,
        "unit": "Strip of 15 tablets",
        "monthlyBrand": 290,
        "monthlyGeneric": 90,
        "monthlyJanAushadhi": 40,
        "monthlySavings": 250
    },
    {
        "id": 10,
        "brandName": "Montair LC",
        "brandNameGu": "મોન્ટેર LC",
        "generic": "Montelukast 10mg + Levocetirizine 5mg",
        "genericGu": "મોન્ટેલુકાસ્ટ 10mg + લેવોસેટિરિઝિન 5mg",
        "category": "Allergy / Asthma",
        "categoryGu": "એલર્જી / અસ્થમા",
        "brandPrice": 165,
        "genericPrice": 38,
        "janAushadhiPrice": 16,
        "unit": "Strip of 10 tablets",
        "monthlyBrand": 495,
        "monthlyGeneric": 114,
        "monthlyJanAushadhi": 48,
        "monthlySavings": 447
    }
];

const symptomsDb = [
    {
        "keywords": ["neck pain", "cervical", "stiff neck", "neck stiffness"],
        "keywordsGu": ["ગરદનમાં દુખાવો", "ગરદન જકડાવું"],
        "specialists": ["Orthopedic Surgeon", "Neurologist", "Physiotherapist"],
        "specialistsGu": ["ઓર્થોપેડિક સર્જન", "ન્યુરોલોજિસ્ટ", "ફિઝિયોથેરાપિસ્ટ"],
        "explanation": "Neck pain can be caused by muscle tension, nerve compression, or spinal issues. Start with an orthopedic evaluation.",
        "explanationGu": "ગરદનનો દુખાવો સ્નાયુ તણાવ, ચેતા સંકોચન અથવા કરોડરજ્જુની સમસ્યાને કારણે થઈ શકે છે.",
        "urgency": "medium"
    },
    {
        "keywords": ["chest pain", "chest tightness", "chest discomfort", "heart pain"],
        "keywordsGu": ["છાતીમાં દુખાવો", "છાતી ભારે લાગવી"],
        "specialists": ["Cardiologist", "Pulmonologist"],
        "specialistsGu": ["કાર્ડિયોલોજિસ્ટ", "પલ્મોનોલોજિસ્ટ"],
        "explanation": "Chest pain can indicate heart problems or lung issues. Seek a cardiologist URGENTLY if pain radiates.",
        "explanationGu": "છાતીમાં દુખાવો હૃદય અથવા ફેફસાની સમસ્યા સૂચવી શકે છે. તાત્કાલિક ડૉક્ટર પાસે જાવ.",
        "urgency": "high"
    },
    {
        "keywords": ["headache", "migraine", "head pain", "throbbing head"],
        "keywordsGu": ["માથાનો દુખાવો", "માઈગ્રેન"],
        "specialists": ["Neurologist", "General Physician"],
        "specialistsGu": ["ન્યુરોલોજિસ્ટ", "જનરલ ફિઝિશિયન"],
        "explanation": "Occasional headaches can be managed by a general physician. For recurring, severe headaches, a neurologist is recommended.",
        "explanationGu": "ક્યારેક-ક્યારેક માથાનો દુખાવો જનરલ ફિઝિશિયન દ્વારા સારવાર થઈ શકે.",
        "urgency": "low"
    },
    {
        "keywords": ["stomach pain", "abdominal pain", "digestion", "acidity", "gas", "bloating"],
        "keywordsGu": ["પેટમાં દુખાવો", "પાચન", "એસિડિટી", "ગેસ"],
        "specialists": ["Gastroenterologist", "General Physician"],
        "specialistsGu": ["ગેસ્ટ્રોએન્ટેરોલોજિસ્ટ", "જનરલ ફિઝિશિયન"],
        "explanation": "Mild acidity or gas can be treated by a general physician. For persistent stomach pain, consult a gastroenterologist.",
        "explanationGu": "હળવી એસિડિટી અથવા ગેસ જનરલ ફિઝિશિયન દ્વારા સારવાર થઈ શકે.",
        "urgency": "medium"
    },
    {
        "keywords": ["back pain", "lower back", "spine pain", "sciatica"],
        "keywordsGu": ["કમરનો દુખાવો", "પીઠનો દુખાવો", "કરોડરજ્જુ"],
        "specialists": ["Orthopedic Surgeon", "Physiotherapist", "Neurologist"],
        "specialistsGu": ["ઓર્થોપેડિક સર્જન", "ફિઝિયોથેરાપિસ્ટ", "ન્યુરોલોજિસ્ટ"],
        "explanation": "Back pain is often muscular and responds well to physiotherapy. If pain shoots down legs (sciatica), see an orthopedic surgeon.",
        "explanationGu": "કમરનો દુખાવો ઘણીવાર સ્નાયુઓને કારણે હોય છે અને ફિઝિયોથેરાપીથી સારો થાય છે.",
        "urgency": "medium"
    },
    {
        "keywords": ["skin rash", "itching", "acne", "pimples", "eczema", "skin allergy"],
        "keywordsGu": ["ત્વચા પર ફોલ્લા", "ખંજવાળ", "ખીલ", "ત્વચા એલર્જી"],
        "specialists": ["Dermatologist"],
        "specialistsGu": ["ડર્મેટોલોજિસ્ટ"],
        "explanation": "Skin rashes, persistent acne, eczema, and allergic reactions should be evaluated by a dermatologist.",
        "explanationGu": "ત્વચા પર ફોલ્લા, ખીલ, ખરજવું અને એલર્જી માટે ડર્મેટોલોજિસ્ટને બતાવો.",
        "urgency": "low"
    },
    {
        "keywords": ["fever", "high temperature", "cold", "cough", "flu", "viral"],
        "keywordsGu": ["તાવ", "શરદી", "ખાંસી", "વાયરલ"],
        "specialists": ["General Physician"],
        "specialistsGu": ["જનરલ ફિઝિશિયન"],
        "explanation": "Common fever, cold, and cough are best treated by a general physician.",
        "explanationGu": "સામાન્ય તાવ, શરદી અને ખાંસી માટે જનરલ ફિઝિશિયન પાસે જાવ.",
        "urgency": "low"
    },
    {
        "keywords": ["joint pain", "knee pain", "arthritis", "swelling joint"],
        "keywordsGu": ["સાંધાનો દુખાવો", "ઘૂંટણનો દુખાવો", "સાંધાનો સોજો"],
        "specialists": ["Orthopedic Surgeon", "Rheumatologist"],
        "specialistsGu": ["ઓર્થોપેડિક સર્જન", "રુમેટોલોજિસ્ટ"],
        "explanation": "Joint pain from injury or wear-and-tear should be seen by an orthopedic surgeon.",
        "explanationGu": "ઈજા અથવા ઘસારાથી સાંધાનો દુખાવો ઓર્થોપેડિક ડૉક્ટરને બતાવો.",
        "urgency": "medium"
    },
    {
        "keywords": ["eye pain", "blurry vision", "vision problem", "eye redness"],
        "keywordsGu": ["આંખમાં દુખાવો", "ઝાંખું દેખાવું", "આંખ લાલ થવી"],
        "specialists": ["Ophthalmologist"],
        "specialistsGu": ["આંખના નિષ્ણાત"],
        "explanation": "Eye pain, blurred vision, or sudden vision changes need evaluation by an ophthalmologist.",
        "explanationGu": "આંખમાં દુખાવો, ઝાંખું દેખાવું અથવા દ્રષ્ટિમાં અચાનક ફેરફાર માટે આંખના ડૉક્ટર પાસે તાત્કાલિક જાવ.",
        "urgency": "medium"
    },
    {
        "keywords": ["tooth pain", "dental", "gum problem", "cavity", "toothache"],
        "keywordsGu": ["દાંતમાં દુખાવો", "દાંતનું દર્દ", "પેઢાની સમસ્યા"],
        "specialists": ["Dentist"],
        "specialistsGu": ["દંત ચિકિત્સક"],
        "explanation": "Toothaches, cavities, gum bleeding, and dental issues should be promptly treated by a dentist.",
        "explanationGu": "દાંતના દુખાવા, કેવિટી અને પેઢાની સમસ્યા માટે દંત ચિકિત્સક પાસે જાવ.",
        "urgency": "low"
    },
    {
        "keywords": ["anxiety", "depression", "stress", "panic attack", "mental health", "sleep problem", "insomnia"],
        "keywordsGu": ["ચિંતા", "ડિપ્રેશન", "તણાવ", "ઊંઘ ન આવવી"],
        "specialists": ["Psychiatrist", "General Physician"],
        "specialistsGu": ["માનસિક રોગ નિષ્ણાત", "જનરલ ફિઝિશિયન"],
        "explanation": "Persistent anxiety, depression, or sleep problems should be discussed with a psychiatrist.",
        "explanationGu": "સતત ચિંતા, ડિપ્રેશન અથવા ઊંઘની સમસ્યા માટે માનસિક રોગ નિષ્ણાત પાસે જાવ.",
        "urgency": "medium"
    },
    {
        "keywords": ["ear pain", "hearing loss", "tinnitus", "ear infection", "sinus", "nose block"],
        "keywordsGu": ["કાનમાં દુખાવો", "સાંભળવામાં તકલીફ", "સાઈનસ", "નાક બંધ"],
        "specialists": ["ENT Specialist"],
        "specialistsGu": ["ENT નિષ્ણાત"],
        "explanation": "Ear infections, hearing issues, sinus problems, and persistent nasal congestion should be evaluated by an ENT specialist.",
        "explanationGu": "કાનના ચેપ, સાંભળવાની સમસ્યા, સાઈનસ અને નાક બંધ થવા માટે ENT નિષ્ણાત પાસે જાવ.",
        "urgency": "low"
    },
    {
        "keywords": ["diabetes", "sugar", "blood sugar", "high sugar", "frequent urination", "excessive thirst"],
        "keywordsGu": ["ડાયાબિટીસ", "શુગર", "વારંવાર પેશાબ", "વધુ તરસ"],
        "specialists": ["Endocrinologist", "General Physician"],
        "specialistsGu": ["એન્ડોક્રિનોલોજિસ્ટ", "જનરલ ફિઝિશિયન"],
        "explanation": "If you suspect diabetes or have uncontrolled blood sugar, an endocrinologist provides specialized care.",
        "explanationGu": "જો ડાયાબિટીસની શંકા હોય અથવા શુગર કંટ્રોલમાં ન હોય તો એન્ડોક્રિનોલોજિસ્ટ પાસે જાવ.",
        "urgency": "medium"
    },
    {
        "keywords": ["breathing problem", "shortness of breath", "asthma", "wheezing", "cough with blood"],
        "keywordsGu": ["શ્વાસ લેવામાં તકલીફ", "અસ્થમા", "ઘરઘરાટી"],
        "specialists": ["Pulmonologist", "General Physician"],
        "specialistsGu": ["પલ્મોનોલોજિસ્ટ", "જનરલ ફિઝિશિયન"],
        "explanation": "Difficulty breathing, chronic cough, or wheezing should be evaluated by a pulmonologist.",
        "explanationGu": "શ્વાસ લેવામાં તકલીફ, લાંબી ખાંસી અથવા ઘરઘરાટી માટે પલ્મોનોલોજિસ્ટ પાસે જાવ.",
        "urgency": "high"
    },
    {
        "keywords": ["pregnancy", "missed period", "prenatal", "baby", "delivery"],
        "keywordsGu": ["ગર્ભાવસ્થા", "માસિક ન આવવું", "ડિલિવરી"],
        "specialists": ["Gynecologist"],
        "specialistsGu": ["ગાયનેકોલોજિસ્ટ"],
        "explanation": "For pregnancy-related concerns, missed periods, or prenatal care, consult a gynecologist.",
        "explanationGu": "ગર્ભાવસ્થા, માસિક ન આવવું અથવા પ્રિનેટલ કેર માટે ગાયનેકોલોજિસ્ટ પાસે જાવ.",
        "urgency": "medium"
    },
    {
        "keywords": ["child fever", "child cough", "vaccination", "baby sick", "growth problem"],
        "keywordsGu": ["બાળકને તાવ", "બાળકને ખાંસી", "રસીકરણ", "બાળક બીમાર"],
        "specialists": ["Pediatrician"],
        "specialistsGu": ["બાળરોગ નિષ્ણાત"],
        "explanation": "For any illness in children under 12, consult a pediatrician. They are trained specifically for children's health needs.",
        "explanationGu": "12 વર્ષથી નાના બાળકોની કોઈપણ બીમારી માટે બાળરોગ નિષ્ણાત પાસે જાવ.",
        "urgency": "medium"
    },
    {
        "keywords": ["thyroid", "weight gain", "fatigue", "hormonal", "PCOS"],
        "keywordsGu": ["થાઈરોઈડ", "વજન વધવું", "થાક", "હોર્મોનલ"],
        "specialists": ["Endocrinologist"],
        "specialistsGu": ["એન્ડોક્રિનોલોજિસ્ટ"],
        "explanation": "Thyroid problems, unexplained weight gain, PCOS, and hormonal imbalances need specialized evaluation by an endocrinologist.",
        "explanationGu": "થાઈરોઈડ, અસ્પષ્ટ વજન વધારો, PCOS અને હોર્મોનલ સમસ્યાઓ માટે એન્ડોક્રિનોલોજિસ્ટ પાસે જાવ.",
        "urgency": "low"
    }
];

const healthRecords = [
    { id: 1, type: "Blood Report", typeGu: "બ્લડ રિપોર્ટ", date: "2026-02-15", facility: "Kiran Lab, Surat", doctor: "Dr. Amit Patel", summary: "CBC - Hemoglobin: 13.2 g/dL, WBC: 7,200, Platelets: 2.5 Lakh. All values normal.", summaryGu: "CBC - હિમોગ્લોબિન: 13.2 g/dL, WBC: 7,200, પ્લેટલેટ્સ: 2.5 લાખ. બધી કિંમતો સામાન્ય." },
    { id: 2, type: "Prescription", typeGu: "પ્રિસ્ક્રિપ્શન", date: "2026-02-15", facility: "City Clinic, Adajan", doctor: "Dr. Amit Patel", summary: "Metformin 500mg BD, Telmisartan 40mg OD, Atorvastatin 10mg HS. Review after 3 months.", summaryGu: "મેટફોર્મીન 500mg BD, ટેલ્મિસાર્ટન 40mg OD, એટોર્વાસ્ટેટિન 10mg HS. 3 મહિના પછી ચેકઅપ." },
    { id: 3, type: "X-Ray", typeGu: "એક્સ-રે", date: "2026-01-20", facility: "Sterling Hospital, Surat", doctor: "Dr. Rajesh Mehta", summary: "Chest X-Ray PA view: No active lung pathology. Cardiomegaly absent. Normal study.", summaryGu: "છાતીનો એક્સ-રે: ફેફસાની કોઈ સક્રિય બીમારી નથી. સામાન્ય." },
    { id: 4, type: "Lab Report", typeGu: "લેબ રિપોર્ટ", date: "2025-12-10", facility: "SRL Diagnostics, Athwa", doctor: "Dr. Anita Rao", summary: "HbA1c: 7.2% (Target <7%). Fasting sugar: 142 mg/dL. Needs better diabetes control.", summaryGu: "HbA1c: 7.2% (લક્ષ્ય <7%). ફાસ્ટિંગ શુગર: 142 mg/dL. ડાયાબિટીસ નિયંત્રણ સુધારવું જરૂરી." },
    { id: 5, type: "Discharge Summary", typeGu: "ડિસ્ચાર્જ સમરી", date: "2025-08-05", facility: "BAPS Hospital, Surat", doctor: "Dr. Rajesh Mehta", summary: "Admitted for right knee arthroscopy. Procedure successful. Discharged on Day 2. Follow-up in 2 weeks.", summaryGu: "જમણા ઘૂંટણની આર્થ્રોસ્કોપી માટે દાખલ. પ્રક્રિયા સફળ. 2 દિવસે રજા. 2 અઠવાડિયામાં ફોલો-અપ." }
];

// In-memory state mimicking backend
let appointments = [];
let secondOpinions = [];
let appointmentIdCounter = 1;
let soIdCounter = 1;

// API functions wrapping the data in promises to simulate network delays

export async function fetchStats() {
    return {
        totalDoctors: doctors.length,
        totalSpecialties: new Set(doctors.map(d => d.specialty)).size,
        totalAppointments: appointments.length,
        totalSecondOpinions: secondOpinions.length,
        totalLocalities: new Set(doctors.map(d => d.locality)).size,
        abhaRecords: healthRecords.length
    };
}

export async function fetchDoctors(params = {}) {
    let result = [...doctors];
    const { specialty, locality, search, language, sort } = params;

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

    if (sort === 'fee-low') {
        result.sort((a, b) => a.fee - b.fee);
    } else if (sort === 'fee-high') {
        result.sort((a, b) => b.fee - a.fee);
    } else if (sort === 'experience') {
        result.sort((a, b) => b.experience - a.experience);
    } else {
        result.sort((a, b) => {
            const scoreA = a.rating * 40 + Math.min(a.reviewCount, 200) * 0.1 + a.experience * 1;
            const scoreB = b.rating * 40 + Math.min(b.reviewCount, 200) * 0.1 + b.experience * 1;
            return scoreB - scoreA;
        });
    }

    return { doctors: result, total: result.length };
}

export async function fetchDoctor(id) {
    const doctor = doctors.find(d => d.id === parseInt(id));
    if (!doctor) throw new Error('Doctor not found');
    return doctor;
}

export async function fetchSpecialties() {
    const specialties = [...new Set(doctors.map(d => d.specialty))].sort();
    const specialtiesGu = {};
    doctors.forEach(d => { specialtiesGu[d.specialty] = d.specialtyGu; });
    return { specialties, specialtiesGu };
}

export async function fetchLocalities() {
    const localities = [...new Set(doctors.map(d => d.locality))].sort();
    return { localities };
}

export async function checkSymptoms(text) {
    if (!text) throw new Error('Please describe your symptoms');

    const query = text.toLowerCase();
    const matches = symptomsDb.filter(s =>
        s.keywords.some(k => query.includes(k.toLowerCase())) ||
        s.keywordsGu.some(k => text.includes(k))
    );

    if (matches.length === 0) {
        return {
            found: false,
            message: "We couldn't match your symptoms automatically. We recommend visiting a General Physician for initial evaluation.",
            messageGu: "અમે તમારા લક્ષણો ઓળખી શક્યા નહીં. પ્રારંભિક તપાસ માટે જનરલ ફિઝિશિયન પાસે જવાની ભલામણ.",
            specialists: ["General Physician"],
            specialistsGu: ["જનરલ ફિઝિશિયન"],
            matchedDoctors: doctors.filter(d => d.specialty === "General Physician")
        };
    }

    const allSpecialists = [...new Set(matches.flatMap(m => m.specialists))];
    const allSpecialistsGu = [...new Set(matches.flatMap(m => m.specialistsGu))];
    const highestUrgency = matches.some(m => m.urgency === 'high') ? 'high' : matches.some(m => m.urgency === 'medium') ? 'medium' : 'low';

    const matchedDoctors = doctors.filter(d => allSpecialists.includes(d.specialty));

    return {
        found: true,
        specialists: allSpecialists,
        specialistsGu: allSpecialistsGu,
        explanation: matches[0].explanation,
        explanationGu: matches[0].explanationGu,
        urgency: highestUrgency,
        matchedDoctors: matchedDoctors
    };
}

export async function searchMedicines(q = '') {
    if (!q) return { medicines: medicines };

    const query = q.toLowerCase();
    const result = medicines.filter(m =>
        m.brandName.toLowerCase().includes(query) ||
        m.generic.toLowerCase().includes(query) ||
        m.category.toLowerCase().includes(query) ||
        m.brandNameGu.includes(q) ||
        m.categoryGu.includes(q)
    );
    return { medicines: result };
}

export async function fetchHealthRecords() {
    return {
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
    };
}

export async function bookAppointment(data) {
    const { doctorId, patientName, phone, date, time, concern, shareRecords } = data;
    const doctor = doctors.find(d => d.id === parseInt(doctorId));
    if (!doctor) throw new Error('Doctor not found');

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
    return { success: true, appointment };
}

export async function fetchAppointments() {
    return { appointments: appointments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) };
}

export async function submitSecondOpinion(data) {
    const { patientName, phone, diagnosis, treatment, hospital, amount, urgency, notes } = data;
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
    return { success: true, opinion };
}
