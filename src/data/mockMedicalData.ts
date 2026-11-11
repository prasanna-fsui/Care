import {
  Doctor,
  HealthCheckupPackage,
  DiagnosticReport,
  PatientProfile,
  PharmacyItem,
  EmergencyHospital,
  DischargeSummaryRecord
} from '../types/medical';

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Lakshmi Sundaram',
    degree: 'MBBS, MD, DM (Cardio), FACC, FSCAI',
    specialty: 'Cardiology',
    experienceYears: 18,
    hospital: 'Apollo Heart Centre, Greams Road, Chennai',
    rating: 4.92,
    reviewCount: 428,
    consultationFee: 1200,
    nextAvailable: 'Today, 2:30 PM',
    avatarUrl: '/src/assets/images/doctor_cardio_lead_1794399311235.jpg',
    languages: ['English', 'Tamil', 'Hindi'],
    bio: 'Senior Interventional Cardiologist specializing in primary coronary angioplasty, hypertension, structural valve interventions, and preventive lipidology.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    slots: ['10:00 AM', '11:30 AM', '02:30 PM', '04:00 PM', '05:30 PM']
  },
  {
    id: 'doc-2',
    name: 'Dr. Rajesh Narang',
    degree: 'MBBS, MD, DM (Neurology - AIIMS), FACP',
    specialty: 'Neurology',
    experienceYears: 22,
    hospital: 'Fortis Memorial Research Institute, Gurugram / New Delhi',
    rating: 4.96,
    reviewCount: 512,
    consultationFee: 1500,
    nextAvailable: 'Today, 4:00 PM',
    avatarUrl: '/src/assets/images/doctor_neuro_specialist_1794399311584.jpg',
    languages: ['English', 'Hindi', 'Punjabi'],
    bio: 'Chief of Neuro-Sciences specializing in acute stroke thrombolysis, intractable migraines, Parkinsonian tremors, and electrophysiology mapping.',
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    slots: ['11:00 AM', '01:00 PM', '04:00 PM', '06:00 PM']
  },
  {
    id: 'doc-3',
    name: 'Dr. Ananya Iyer',
    degree: 'MBBS, MD (Pediatrics), DNB, FAAP',
    specialty: 'Pediatrics',
    experienceYears: 14,
    hospital: 'Rainbow Children’s Hospital, Bannerghatta, Bengaluru',
    rating: 4.89,
    reviewCount: 340,
    consultationFee: 900,
    nextAvailable: 'Tomorrow, 9:30 AM',
    avatarUrl: '/src/assets/images/doctor_cardio_lead_1794399311235.jpg',
    languages: ['English', 'Kannada', 'Hindi'],
    bio: 'Senior Pediatrician with special focus on newborn developmental screening, pediatric bronchial asthma, tropical infections, and growth nutrition.',
    availableDays: ['Tuesday', 'Thursday', 'Friday', 'Saturday'],
    slots: ['09:30 AM', '11:00 AM', '03:00 PM', '04:30 PM']
  },
  {
    id: 'doc-4',
    name: 'Dr. Vikramaditya Rathore',
    degree: 'MBBS, MS, MCh (Ortho Trauma), FACS',
    specialty: 'Orthopedics',
    experienceYears: 16,
    hospital: 'Max Super Speciality Hospital, Saket, New Delhi',
    rating: 4.88,
    reviewCount: 380,
    consultationFee: 1400,
    nextAvailable: 'Today, 5:15 PM',
    avatarUrl: '/src/assets/images/doctor_neuro_specialist_1794399311584.jpg',
    languages: ['English', 'Hindi', 'Marwari'],
    bio: 'Orthopedic trauma surgeon specializing in complex articular fractures, robotic joint replacements, sports ligament arthroscopy, and cervical spine stabilization.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    slots: ['01:30 PM', '03:00 PM', '05:15 PM']
  },
  {
    id: 'doc-5',
    name: 'Dr. Priya Sharma',
    degree: 'MBBS, MD, DNB (Pulmonary & Critical Care)',
    specialty: 'Pulmonology',
    experienceYears: 12,
    hospital: 'Medanta The Medicity, Gurugram, Delhi NCR',
    rating: 4.93,
    reviewCount: 310,
    consultationFee: 1100,
    nextAvailable: 'Today, 3:45 PM',
    avatarUrl: '/src/assets/images/doctor_cardio_lead_1794399311235.jpg',
    languages: ['English', 'Hindi'],
    bio: 'Specialist in bronchial asthma, allergic rhinitis, post-viral pulmonary rehabilitation, sleep apnea polysomnography, and interventional bronchoscopy.',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    slots: ['10:30 AM', '02:00 PM', '03:45 PM']
  },
  {
    id: 'doc-6',
    name: 'Dr. Arvind Swaminathan',
    degree: 'MBBS, MD (Internal Medicine), Dip. Diabetology',
    specialty: 'Internal Medicine',
    experienceYears: 15,
    hospital: 'Manipal Hospital, Old Airport Road, Bengaluru',
    rating: 4.91,
    reviewCount: 460,
    consultationFee: 1000,
    nextAvailable: 'Today, 1:15 PM',
    avatarUrl: '/src/assets/images/doctor_neuro_specialist_1794399311584.jpg',
    languages: ['English', 'Kannada', 'Hindi', 'Telugu'],
    bio: 'Senior physician clinician with deep expertise in metabolic syndrome, glycemic reversal, dyslipidemia, and geriatric multi-morbidity care.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    slots: ['09:00 AM', '01:15 PM', '03:30 PM', '05:00 PM']
  }
];

export const MOCK_HEALTH_PACKAGES: HealthCheckupPackage[] = [
  {
    id: 'pkg-1',
    title: 'Executive Master Health Full Body Screening',
    tagline: 'Comprehensive multi-organ evaluation tailored for Indian working professionals & adults',
    totalTests: 78,
    recommendedFor: 'Adults aged 30–65 wanting an authoritative multi-organ baseline',
    price: 3999,
    originalPrice: 6500,
    fastingRequiredHours: 12,
    reportTurnaround: 'Same Day (Within 12 Hours)',
    sampleType: ['Fasting Blood Sample', 'Spot Urine', 'Clinical Vitals', 'ECG Trace'],
    preparationNotes: [
      'Strict fasting for 10–12 hours prior to phlebotomist arrival. Plain water is permitted.',
      'Refrain from alcohol, smoking, and heavy physical workouts 24 hours prior.',
      'Morning dose of regular blood pressure medicines can be taken with small sips of water.'
    ],
    categories: [
      {
        category: 'Cardiac & Lipid Metabolism (9 Tests)',
        tests: ['Total Cholesterol', 'HDL Good Cholesterol', 'LDL Bad Cholesterol', 'Triglycerides', 'VLDL', 'Apo-B / Apo-A1 Ratio', 'Resting 12-Lead ECG', 'High-Sensitivity CRP']
      },
      {
        category: 'Liver & Hepatic Function (11 Tests)',
        tests: ['SGOT (AST)', 'SGPT (ALT)', 'Serum Bilirubin (Total & Direct)', 'Alkaline Phosphatase (ALP)', 'Total Protein', 'Serum Albumin', 'Globulin', 'A/G Ratio', 'GGT']
      },
      {
        category: 'Renal & Kidney Profile (7 Tests)',
        tests: ['Serum Creatinine', 'Blood Urea Nitrogen (BUN)', 'Uric Acid', 'eGFR Filtration Rate', 'Electrolytes (Sodium, Potassium, Chloride)']
      },
      {
        category: 'Diabetes & Glycemic Panel (5 Tests)',
        tests: ['Fasting Blood Glucose', 'HbA1c Glycated Hemoglobin', 'Estimated Average Glucose (eAG)', 'Urine Microalbumin']
      },
      {
        category: 'Thyroid & Endocrine Function (3 Tests)',
        tests: ['Total T3', 'Total T4', 'Ultrasensitive TSH']
      },
      {
        category: 'Hematology Complete Blood Count (24 Tests)',
        tests: ['Hemoglobin', 'RBC Count', 'Platelet Count', 'WBC Differential Count', 'PCV/Hematocrit', 'MCV', 'MCH', 'MCHC', 'RDW']
      },
      {
        category: 'Vitamin & Essential Micronutrients (4 Tests)',
        tests: ['Vitamin D3 (25-OH)', 'Active Vitamin B12', 'Serum Iron & Ferritin', 'Total Iron Binding Capacity']
      }
    ]
  },
  {
    id: 'pkg-2',
    title: 'Advanced Cardiac & Vascular Defense Package',
    tagline: 'Coronary risk evaluation covering 12-lead ECG, Lipids, hs-CRP, and Homocysteine',
    totalTests: 42,
    recommendedFor: 'Individuals with family history of premature heart disease, elevated BP, or chest heaviness',
    price: 2999,
    originalPrice: 4500,
    fastingRequiredHours: 12,
    reportTurnaround: 'Within 8 Hours',
    sampleType: ['Fasting Blood', 'Resting ECG', 'BP Profiling'],
    preparationNotes: [
      'Fasting for 10–12 hours is mandatory.',
      'Wear loose comfortable clothing for ECG lead placement.'
    ],
    categories: [
      {
        category: 'Advanced Cardiovascular Panel',
        tests: ['High-Sensitivity Troponin-I', 'hs-CRP Vascular Inflammation', 'Homocysteine Level', 'Lipoprotein (a)', 'Apolipoprotein A1 & B']
      },
      {
        category: 'Lipid Fractions & Arterial Ratios',
        tests: ['Total Cholesterol', 'HDL', 'LDL', 'Triglycerides', 'Non-HDL Cholesterol', 'Total/HDL Ratio']
      },
      {
        category: 'Cardio-Metabolic Panel',
        tests: ['Fasting Glucose', 'HbA1c', 'Serum Potassium & Magnesium', 'Resting 12-Lead ECG with automated rhythm interpretation']
      }
    ]
  },
  {
    id: 'pkg-3',
    title: 'Senior Citizen Geriatric Vitality Checkup',
    tagline: 'Designed for adults 60+ to evaluate bone density, renal clearance, vitamins, and joints',
    totalTests: 64,
    recommendedFor: 'Seniors requiring joint health, prostate/calcium screening, and metabolic monitoring',
    price: 3499,
    originalPrice: 5200,
    fastingRequiredHours: 10,
    reportTurnaround: 'Within 16 Hours',
    sampleType: ['Fasting Blood', 'Urine Sample', 'Stool Occult Blood', 'Vitals'],
    preparationNotes: [
      'Fasting for 10 hours.',
      'List all current prescription drugs for drug-drug interaction verification.'
    ],
    categories: [
      {
        category: 'Bone & Joint Health (8 Tests)',
        tests: ['Serum Calcium', 'Ionized Calcium', 'Phosphorus', 'Alkaline Phosphatase', 'Vitamin D3', 'Uric Acid (Gout Panel)']
      },
      {
        category: 'Geriatric Renal & Electrolytes (10 Tests)',
        tests: ['Serum Creatinine', 'BUN', 'Sodium', 'Potassium', 'Chloride', 'Bicarbonate', 'Urinary Protein/Creatinine Ratio']
      },
      {
        category: 'Prostate / Senior Wellness (4 Tests)',
        tests: ['PSA Total (for men)', 'Stool Occult Blood', 'Serum Ferritin', 'TSH']
      }
    ]
  },
  {
    id: 'pkg-4',
    title: 'Women’s Preventive Wellness & Hormonal Balance',
    tagline: 'Specialized screening covering PCOS, hormonal balance, anemia, thyroid, and calcium density',
    totalTests: 52,
    recommendedFor: 'Women addressing fatigue, hormonal shifts, bone density, or preventive wellness',
    price: 3299,
    originalPrice: 4800,
    fastingRequiredHours: 10,
    reportTurnaround: 'Within 12 Hours',
    sampleType: ['Fasting Blood', 'Urine Sample'],
    preparationNotes: [
      'Fasting for 10 hours.',
      'Record day of menstrual cycle for accurate hormonal reference correlation.'
    ],
    categories: [
      {
        category: 'Hormonal & Thyroid Balance',
        tests: ['TSH Ultrasensitive', 'Free T3', 'Free T4', 'Prolactin', 'LH / FSH Ratio']
      },
      {
        category: 'Anemia & Iron Stores Profile',
        tests: ['Complete Hemogram', 'Serum Iron', 'Serum Ferritin', 'Total Iron Binding Capacity', 'Transferrin Saturation']
      },
      {
        category: 'Metabolic & Bone Wellness',
        tests: ['Fasting Glucose', 'HbA1c', 'Vitamin D3', 'Vitamin B12', 'Serum Calcium', 'Lipid Profile']
      }
    ]
  }
];

export const MOCK_DIAGNOSTIC_REPORTS: DiagnosticReport[] = [
  {
    id: 'rep-mri-01',
    patientId: 'pat-rajiv-01',
    patientName: 'Rajiv Sharma (48M)',
    date: 'Oct 24, 2026',
    modality: 'MRI',
    title: 'MRI Brain & Cervical Spine (3.0 Tesla High-Field Protocol)',
    organ: 'Brain / Cranium',
    referringDoctor: 'Dr. Rajesh Narang (Neurology - Fortis / AIIMS)',
    radiologist: 'Dr. K. S. Meenakshi, MD, DMRD (Senior Radiologist)',
    imageUrl: '/src/assets/images/scan_mri_diagnostic_1794399312742.jpg',
    slicesCount: 16,
    status: 'verified',
    findings: [
      'Multi-planar T1, T2, FLAIR, and Diffusion Weighted Imaging (DWI) were performed.',
      'Cerebral hemispheres demonstrate symmetric gray-white differentiation with no acute intracranial hemorrhage.',
      'No evidence of acute territorial ischemia or restricted diffusion on DWI sequences.',
      'Ventricular size and sulcal patterns are within normal limits for patient chronological age.',
      'Cervical region demonstrates mild disc desiccation at C5-C6 with minimal posterior annular bulge without cord compression.'
    ],
    impression: 'Normal intracranial parenchymal findings. No acute neuro-vascular insult or space-occupying lesion. Mild degenerative cervical spondylosis at C5-C6 without radicular impingement.',
    recommendations: [
      'Follow-up with consulting neurologist Dr. Rajesh Narang for clinical symptom correlation.',
      'Postural ergonomics and physical therapy for neck strain; no urgent neurosurgical intervention required.'
    ]
  },
  {
    id: 'rep-lab-02',
    patientId: 'pat-rajiv-01',
    patientName: 'Rajiv Sharma (48M)',
    date: 'Nov 04, 2026',
    modality: 'Pathology',
    title: 'Comprehensive Metabolic & Lipid Diagnostic Panel',
    organ: 'Venous Blood',
    referringDoctor: 'Dr. Lakshmi Sundaram (Cardiology - Apollo)',
    radiologist: 'Dr. S. Ramanathan, MD (Consultant Clinical Pathologist)',
    status: 'verified',
    findings: [
      'Serum specimen processed on Roche Cobas 8000 automated immunoassay analyzer.',
      'Elevated total cholesterol and mildly elevated fasting blood glucose noted.'
    ],
    impression: 'Mild hyperlipidemia with border-zone glycemic elevation. Liver enzymes and renal clearance are within safe reference limits.',
    recommendations: [
      'Maintain Atorvastatin 20mg at bedtime as prescribed.',
      'Repeat HbA1c in 90 days following dietary carbohydrate restriction.'
    ],
    labResults: [
      { parameter: 'Fasting Blood Glucose', value: 108, unit: 'mg/dL', referenceMin: 70, referenceMax: 99, status: 'high' },
      { parameter: 'HbA1c (Glycated Hb)', value: 5.9, unit: '%', referenceMin: 4.0, referenceMax: 5.6, status: 'high' },
      { parameter: 'Total Cholesterol', value: 218, unit: 'mg/dL', referenceMin: 125, referenceMax: 200, status: 'high' },
      { parameter: 'HDL (Good Cholesterol)', value: 52, unit: 'mg/dL', referenceMin: 40, referenceMax: 60, status: 'normal' },
      { parameter: 'LDL (Bad Cholesterol)', value: 138, unit: 'mg/dL', referenceMin: 0, referenceMax: 100, status: 'high' },
      { parameter: 'Triglycerides', value: 142, unit: 'mg/dL', referenceMin: 0, referenceMax: 150, status: 'normal' },
      { parameter: 'Serum Creatinine', value: 0.94, unit: 'mg/dL', referenceMin: 0.70, referenceMax: 1.25, status: 'normal' },
      { parameter: 'eGFR Filtration', value: 96, unit: 'mL/min/1.73m²', referenceMin: 90, referenceMax: 120, status: 'normal' },
      { parameter: 'SGPT / ALT', value: 28, unit: 'U/L', referenceMin: 10, referenceMax: 45, status: 'normal' },
      { parameter: 'hs-CRP (Inflammation)', value: 1.2, unit: 'mg/L', referenceMin: 0.0, referenceMax: 3.0, status: 'normal' }
    ]
  },
  {
    id: 'rep-xray-03',
    patientId: 'pat-rajiv-01',
    patientName: 'Rajiv Sharma (48M)',
    date: 'Sep 15, 2026',
    modality: 'Digital X-Ray',
    title: 'Digital Chest X-Ray (PA View & Lateral)',
    organ: 'Thorax & Lungs',
    referringDoctor: 'Dr. Priya Sharma (Pulmonology - Medanta)',
    radiologist: 'Dr. K. S. Meenakshi, MD, DMRD',
    imageUrl: '/src/assets/images/scan_mri_diagnostic_1794399312742.jpg',
    status: 'verified',
    findings: [
      'Both lung fields are clear of focal consolidation, pneumothorax, or pleural effusion.',
      'Cardiothoracic ratio is normal (under 50%).',
      'Costophrenic angles are acute and well defined.',
      'Visualized osseous structures of the thoracic cage are unremarkable.'
    ],
    impression: 'Normal digital chest radiography. Clear lung parenchyma without cardiomegaly.',
    recommendations: [
      'Routine follow-up in 12 months or SOS if persistent respiratory cough arises.'
    ]
  }
];

export const MOCK_PATIENT_PROFILES: PatientProfile[] = [
  {
    id: 'pat-rajiv-01',
    fullName: 'Rajiv Sharma',
    relationship: 'Self',
    age: 48,
    gender: 'Male',
    bloodGroup: 'O Positive (O+)',
    weightKg: 76,
    heightCm: 175,
    chronicConditions: [
      'Essential Hypertension (Controlled on Lisinopril)',
      'Primary Hyperlipidemia (on Atorvastatin 20mg)',
      'Mild Gastroesophageal Reflux Disease (GERD)'
    ],
    allergies: [
      { allergen: 'Penicillin / Amoxicillin', severity: 'Severe', reaction: 'Urticaria & Bronchospasm' },
      { allergen: 'Aspirin (High Dose)', severity: 'Mild', reaction: 'Gastric Pyrosis' }
    ],
    immunizations: [
      { vaccine: 'COVID-19 Bivalent Booster', date: 'Jan 14, 2026', provider: 'Apollo City Health Clinic' },
      { vaccine: 'Annual Influenza Quadrivalent', date: 'Oct 02, 2026', provider: 'CarePulse Preventive Hub' },
      { vaccine: 'Tdap (Tetanus, Diphtheria, Pertussis)', date: 'Mar 18, 2023', provider: 'Manipal Urgent Care' },
      { vaccine: 'Hepatitis B (3 Doses Complete)', date: 'Nov 12, 2018', provider: 'AIIMS Health Clinic' }
    ],
    vitalsHistory: [
      { id: 'vit-1', date: 'Nov 10, 2026', time: '08:30 AM', systolicBp: 124, diastolicBp: 82, heartRate: 72, bloodSugar: 104, spO2: 99, temperature: 98.4, notes: 'Morning fasting baseline' },
      { id: 'vit-2', date: 'Nov 07, 2026', time: '09:00 AM', systolicBp: 128, diastolicBp: 84, heartRate: 76, bloodSugar: 112, spO2: 98, temperature: 98.6, notes: 'Post light breakfast' },
      { id: 'vit-3', date: 'Nov 03, 2026', time: '07:45 AM', systolicBp: 122, diastolicBp: 80, heartRate: 70, bloodSugar: 99, spO2: 99, temperature: 98.2, notes: 'Optimal fasting control' },
      { id: 'vit-4', date: 'Oct 28, 2026', time: '08:15 AM', systolicBp: 134, diastolicBp: 88, heartRate: 82, bloodSugar: 120, spO2: 98, temperature: 98.7, notes: 'Reported work stress' },
      { id: 'vit-5', date: 'Oct 20, 2026', time: '08:00 AM', systolicBp: 126, diastolicBp: 82, heartRate: 74, bloodSugar: 106, spO2: 99, temperature: 98.4, notes: 'Routine weekly check' }
    ],
    encounters: [
      {
        id: 'enc-1',
        date: 'Oct 24, 2026',
        doctorName: 'Dr. Rajesh Narang',
        specialty: 'Neurology',
        facility: 'Fortis Memorial Research Institute, Gurugram',
        chiefComplaint: 'Intermittent tension headaches radiating from cervical neck region for 3 weeks.',
        clinicalDiagnosis: 'Cervicogenic tension headache secondary to C5-C6 posture strain.',
        treatmentPlan: 'Advised ergonomics, prescribed muscle relaxant PRN, MRI performed showing no intracranial pathology.',
        prescriptions: ['Thiocolchicoside 4mg PRN', 'Paracetamol 650mg SOS']
      },
      {
        id: 'enc-2',
        date: 'Aug 12, 2026',
        doctorName: 'Dr. Lakshmi Sundaram',
        specialty: 'Cardiology',
        facility: 'Apollo Heart Centre, Chennai',
        chiefComplaint: 'Routine 6-month cardiovascular follow-up.',
        clinicalDiagnosis: 'Essential Hypertension - well compensated. Stable lipid profile.',
        treatmentPlan: 'Continue Lisinopril 10mg morning and Atorvastatin 20mg night. Daily 30 min brisk walking.',
        prescriptions: ['Lisinopril 10mg OD', 'Atorvastatin 20mg HS']
      }
    ]
  },
  {
    id: 'pat-kamala-02',
    fullName: 'Kamala Sharma',
    relationship: 'Mother',
    age: 74,
    gender: 'Female',
    bloodGroup: 'B Positive (B+)',
    weightKg: 62,
    heightCm: 160,
    chronicConditions: [
      'Type 2 Diabetes Mellitus (on Metformin 500mg BD)',
      'Osteoarthritis of Bilateral Knees',
      'Mild Osteoporosis'
    ],
    allergies: [
      { allergen: 'Sulfa Drugs (Sulfonamides)', severity: 'Moderate', reaction: 'Erythematous rash' }
    ],
    immunizations: [
      { vaccine: 'Pneumococcal Conjugate (PCV13)', date: 'May 10, 2024', provider: 'Geriatric Care Hub' },
      { vaccine: 'Annual Influenza', date: 'Sep 28, 2026', provider: 'Apollo City Health' }
    ],
    vitalsHistory: [
      { id: 'vit-m1', date: 'Nov 09, 2026', time: '08:00 AM', systolicBp: 132, diastolicBp: 78, heartRate: 68, bloodSugar: 134, spO2: 97, temperature: 98.3, notes: 'Post metformin morning' },
      { id: 'vit-m2', date: 'Nov 04, 2026', time: '08:15 AM', systolicBp: 136, diastolicBp: 80, heartRate: 72, bloodSugar: 142, spO2: 98, temperature: 98.5, notes: 'Fasting' }
    ],
    encounters: [
      {
        id: 'enc-m1',
        date: 'Sep 10, 2026',
        doctorName: 'Dr. Arvind Swaminathan',
        specialty: 'Internal Medicine',
        facility: 'Manipal Hospital, Bengaluru',
        chiefComplaint: 'Bilateral knee stiffness upon morning waking and review of glycemic control.',
        clinicalDiagnosis: 'Bilateral Grade 2 Osteoarthritis; stable Type 2 Diabetes.',
        treatmentPlan: 'Physiotherapy knee exercises, Calcium + Vit D3 supplementation, continue Metformin.',
        prescriptions: ['Metformin 500mg BD', 'Calcium Carbonate 500mg + D3 OD']
      }
    ]
  }
];

export const MOCK_PHARMACY_ITEMS: PharmacyItem[] = [
  {
    id: 'med-1',
    name: 'Atorva 20 (Atorvastatin Calcium)',
    brand: 'Zydus Cadila',
    category: 'Cardiovascular',
    dosage: '20 mg',
    composition: 'Atorvastatin 20mg Film-Coated Tablets',
    price: 245.00,
    originalPrice: 320.00,
    requiresPrescription: true,
    inStock: true,
    packageSize: 'Strip of 30 Tablets',
    instructions: 'Take 1 tablet daily at bedtime. Avoid grapefruit juice during treatment.',
    warnings: 'Periodic liver function monitoring advised. Report unexpected muscle pain immediately.'
  },
  {
    id: 'med-2',
    name: 'Glycomet-SR (Metformin HCl)',
    brand: 'USV Private Limited',
    category: 'Anti-diabetic',
    dosage: '500 mg Extended Release',
    composition: 'Metformin Hydrochloride 500mg ER',
    price: 140.00,
    originalPrice: 190.00,
    requiresPrescription: true,
    inStock: true,
    packageSize: 'Box of 60 Tablets',
    instructions: 'Take with evening meal to minimize gastrointestinal discomfort.',
    warnings: 'Do not crush or chew extended-release tablets. Maintain regular hydration.'
  },
  {
    id: 'med-3',
    name: 'Listril 10 (Lisinopril)',
    brand: 'Torrent Pharmaceuticals',
    category: 'Cardiovascular',
    dosage: '10 mg',
    composition: 'Lisinopril ACE Inhibitor 10mg',
    price: 185.00,
    originalPrice: 240.00,
    requiresPrescription: true,
    inStock: true,
    packageSize: 'Strip of 30 Tablets',
    instructions: 'Take 1 tablet once daily in the morning with water.',
    warnings: 'Monitor blood pressure regularly. Avoid potassium supplements unless advised.'
  },
  {
    id: 'med-4',
    name: 'Augmentin 625 Duo',
    brand: 'GlaxoSmithKline Pharmaceuticals India',
    category: 'Antibiotics',
    dosage: '625 mg (500mg + 125mg)',
    composition: 'Amoxicillin 500mg + Clavulanic Acid 125mg',
    price: 220.00,
    originalPrice: 280.00,
    requiresPrescription: true,
    inStock: true,
    packageSize: 'Strip of 10 Tablets',
    instructions: 'Take 1 tablet every 12 hours at the start of a light meal. Complete entire course.',
    warnings: 'Contraindicated in penicillin allergy. Do not discontinue prematurely.'
  },
  {
    id: 'med-5',
    name: 'Asthalin / Ventolin Inhaler',
    brand: 'Cipla Limited',
    category: 'Respiratory',
    dosage: '100 mcg / actuation',
    composition: 'Salbutamol / Albuterol Sulfate Metered Dose Inhaler',
    price: 195.00,
    originalPrice: 260.00,
    requiresPrescription: true,
    inStock: true,
    packageSize: 'Inhaler with 200 actuations',
    instructions: 'Inhale 1–2 puffs every 4–6 hours as needed for bronchospasm relief.',
    warnings: 'Rinse mouth with water after use. Keep spacer clean.'
  },
  {
    id: 'med-6',
    name: 'Shelcal 500 (Calcium + D3)',
    brand: 'Torrent Pharmaceuticals',
    category: 'Vitamins & Wellness',
    dosage: '500 mg Elemental Calcium + 250 IU D3',
    composition: 'Calcium Carbonate + Cholecalciferol',
    price: 165.00,
    originalPrice: 215.00,
    requiresPrescription: false,
    inStock: true,
    packageSize: 'Bottle of 60 Tablets',
    instructions: 'Take 1 tablet daily after food.',
    warnings: 'Do not exceed recommended dose. Keep in dry cool place.'
  },
  {
    id: 'med-7',
    name: 'Calcirol 60K (Vitamin D3 Softgels)',
    brand: 'Cadila Pharmaceuticals',
    category: 'Vitamins & Wellness',
    dosage: '60,000 IU',
    composition: 'Cholecalciferol 60,000 IU',
    price: 125.00,
    originalPrice: 160.00,
    requiresPrescription: false,
    inStock: true,
    packageSize: 'Pack of 8 Softgels',
    instructions: 'Take 1 capsule weekly with a milk or fat-containing meal for 8 weeks.',
    warnings: 'High dose vitamin D; take as recommended by physician.'
  },
  {
    id: 'med-8',
    name: 'Dolo 650 (Paracetamol)',
    brand: 'Micro Labs Limited',
    category: 'Pain Relief',
    dosage: '650 mg',
    composition: 'Paracetamol 650mg Tablets',
    price: 38.00,
    originalPrice: 50.00,
    requiresPrescription: false,
    inStock: true,
    packageSize: 'Strip of 15 Tablets',
    instructions: 'Swallow whole with water. 1 tablet every 6–8 hours as needed.',
    warnings: 'Maximum 4 tablets in 24 hours. Safe in dengue viral fevers.'
  }
];

export const MOCK_EMERGENCY_HOSPITALS: EmergencyHospital[] = [
  {
    id: 'hosp-1',
    name: 'Apollo / St. Jude Comprehensive Trauma & Stroke Center',
    address: '450 Healthcare Boulevard, Koramangala, Bengaluru',
    distanceKm: 2.4,
    estimatedArrivalMinutes: 6,
    traumaLevel: 'Level 1 Trauma Center',
    totalErBeds: 40,
    availableErBeds: 9,
    icuAvailable: true,
    helipad: true,
    hotline: '+91 80 4911 5833',
    lat: 12.9352,
    lng: 77.6245
  },
  {
    id: 'hosp-2',
    name: 'AIIMS / Metropolitan Emergency Pavilion',
    address: '120 Ring Road, Ansari Nagar, New Delhi',
    distanceKm: 4.8,
    estimatedArrivalMinutes: 11,
    traumaLevel: 'Level 1 Trauma Center',
    totalErBeds: 55,
    availableErBeds: 14,
    icuAvailable: true,
    helipad: true,
    hotline: '+91 11 2658 9391',
    lat: 28.5672,
    lng: 77.2100
  },
  {
    id: 'hosp-3',
    name: 'Fortis / City General Acute Cardiac Care & Casualty',
    address: '89 Marine Drive, South District, Mumbai',
    distanceKm: 6.2,
    estimatedArrivalMinutes: 14,
    traumaLevel: 'Level 2 Trauma Center',
    totalErBeds: 30,
    availableErBeds: 6,
    icuAvailable: true,
    helipad: false,
    hotline: '+91 22 6799 4400',
    lat: 18.9438,
    lng: -122.4200
  }
];

export const MOCK_DISCHARGE_SUMMARIES: DischargeSummaryRecord[] = [
  {
    id: 'dis-001',
    dischargeId: 'DSC-2026-9812',
    patientName: 'Rajiv Sharma',
    patientMrn: 'MRN-890214-RS',
    admissionDate: 'Sep 18, 2026',
    dischargeDate: 'Sep 21, 2026',
    lengthOfStayDays: 3,
    department: 'Interventional Cardiology & Cath Lab',
    admittingConsultant: 'Dr. Lakshmi Sundaram, MBBS, MD, DM, FACC',
    dischargeDiagnoses: {
      primary: 'Acute Coronary Syndrome - Non-ST Elevation Myocardial Infarction (NSTEMI) s/p Successful Percutaneous Coronary Intervention (PCI)',
      secondary: [
        'Single-Vessel Coronary Artery Disease (90% Mid-LAD Stenosis)',
        'Essential Systemic Arterial Hypertension',
        'Primary Hypercholesterolemia'
      ]
    },
    surgicalProcedures: [
      {
        name: 'Transradial Coronary Angiogram & Drug-Eluting Stent (DES) Placement to Mid-LAD',
        date: 'Sep 19, 2026',
        surgeon: 'Dr. Lakshmi Sundaram, MD, DM',
        implantsUsed: 'Resolute Onyx 3.0 x 18mm Zotarolimus-Eluting Stent'
      }
    ],
    hospitalCourse: '48-year-old gentleman admitted via ER with substernal chest discomfort radiating to left arm. Cardiac troponin-I elevated at 0.84 ng/mL. Emergent coronary angiography via right radial approach revealed 90% thrombotic lesion in mid-LAD. Successful balloon pre-dilation and deployment of 3.0x18mm drug-eluting stent with TIMI-3 distal flow achieved. Post-procedure radial closure with TR band uneventful. Bedside echocardiogram demonstrated preserved left ventricular ejection fraction (LVEF 55%) with mild hypokinesia of mid-anterior septum. Patient tolerated dual antiplatelet therapy well with no hemorrhagic complications.',
    dischargeVitals: {
      bp: '118/76 mmHg',
      pulse: '68 bpm (Regular)',
      spO2: '99% on Room Air',
      temperature: '98.4°F',
      randomSugar: '108 mg/dL'
    },
    dischargeMedications: [
      {
        drug: 'Brilinta (Ticagrelor)',
        dosage: '90 mg',
        frequency: 'Twice daily',
        timing: 'Morning / Night',
        foodRelation: 'With water',
        durationDays: 365
      },
      {
        drug: 'Ecosprin (Aspirin)',
        dosage: '75 mg',
        frequency: 'Once daily',
        timing: 'Morning',
        foodRelation: 'After food',
        durationDays: 365
      },
      {
        drug: 'Atorva (Atorvastatin)',
        dosage: '40 mg',
        frequency: 'Once daily',
        timing: 'Night only',
        foodRelation: 'After food',
        durationDays: 180
      },
      {
        drug: 'Concor (Bisoprolol)',
        dosage: '2.5 mg',
        frequency: 'Once daily',
        timing: 'Morning',
        foodRelation: 'Before food',
        durationDays: 90
      },
      {
        drug: 'Pantocid (Pantoprazole)',
        dosage: '40 mg',
        frequency: 'Once daily',
        timing: 'Morning',
        foodRelation: 'Before food',
        durationDays: 30
      }
    ],
    postDischargeInstructions: [
      'Dual Antiplatelet Therapy (DAPT) with Ticagrelor and Aspirin MUST NOT be stopped under any circumstances without consulting Dr. Lakshmi Sundaram.',
      'Right radial wrist puncture site: Keep clean and dry for 48 hours. Avoid lifting objects heavier than 5 kg with the right arm for 5 days.',
      'Diet: Low-sodium (<2g/day), low-oil heart healthy Indian diet. Avoid fried savories (vada, samosa) and pickles.',
      'Physical activity: Light walking encouraged. Cardiac rehabilitation phase 2 program starts in 2 weeks.'
    ],
    warningSignsSeekImmediateCare: [
      'Recurrent crushing substernal chest pressure radiating to jaw, neck, or left arm.',
      'Excessive bleeding, expanding hematoma, or severe pain at the right wrist catheter site.',
      'Sudden shortness of breath, palpitations, or lightheaded fainting.'
    ],
    followUpSchedule: {
      date: 'Oct 05, 2026 at 10:00 AM',
      doctor: 'Dr. Lakshmi Sundaram',
      department: 'Apollo Cardiology Outpatient Clinic, Suite 402',
      testsToCompleteBefore: ['Serum Creatinine', 'Lipid Profile', 'Resting 12-lead ECG']
    }
  },
  {
    id: 'dis-002',
    dischargeId: 'DSC-2025-4190',
    patientName: 'Rajiv Sharma',
    patientMrn: 'MRN-890214-RS',
    admissionDate: 'May 11, 2025',
    dischargeDate: 'May 13, 2025',
    lengthOfStayDays: 2,
    department: 'Minimally Invasive General & Laparoscopic Surgery',
    admittingConsultant: 'Dr. Vikramaditya Rathore, MS, MCh, FACS',
    dischargeDiagnoses: {
      primary: 'Symptomatic Cholelithiasis with Acute Calculous Cholecystitis',
      secondary: ['Resolved Biliary Colic']
    },
    surgicalProcedures: [
      {
        name: 'Elective 4-Port Laparoscopic Cholecystectomy with Cholangiography',
        date: 'May 11, 2025',
        surgeon: 'Dr. Vikramaditya Rathore, MS'
      }
    ],
    hospitalCourse: 'Patient admitted with acute right upper quadrant pain following fatty meals. Ultrasound confirmed multiple gallstones with 4mm gallbladder wall thickening. Underwent uneventful 4-port laparoscopic cholecystectomy. Histopathology confirmed chronic calculous cholecystitis with no dysplasia. Diet advanced from clear fluids to soft diet on postoperative day 1.',
    dischargeVitals: {
      bp: '122/80 mmHg',
      pulse: '74 bpm',
      spO2: '98% on room air',
      temperature: '98.6°F',
      randomSugar: '115 mg/dL'
    },
    dischargeMedications: [
      {
        drug: 'Dolo (Paracetamol)',
        dosage: '650 mg',
        frequency: 'Every 8 hours as needed',
        timing: 'As needed',
        foodRelation: 'After food',
        durationDays: 5
      },
      {
        drug: 'Cefuroxime Axetil',
        dosage: '500 mg',
        frequency: 'Twice daily',
        timing: 'Morning / Night',
        foodRelation: 'After food',
        durationDays: 5
      }
    ],
    postDischargeInstructions: [
      'Keep port incision dressings dry and undisturbed for 48 hours.',
      'Avoid strenuous abdominal strain or lifting >10 kg for 3 weeks.',
      'Low fat diet for initial 2–3 weeks to allow bile digestive adaptation.'
    ],
    warningSignsSeekImmediateCare: [
      'Persistent fever > 101°F or progressive abdominal distension.',
      'Yellowing of sclera/skin (jaundice) or clay-colored stools.'
    ],
    followUpSchedule: {
      date: 'May 22, 2025 at 11:30 AM',
      doctor: 'Dr. Vikramaditya Rathore',
      department: 'Surgical Clinic Suite 105',
      testsToCompleteBefore: ['Incision site inspection', 'LFT panel']
    }
  }
];
