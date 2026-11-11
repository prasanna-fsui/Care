import { 
  EducationArticle, 
  EducationVideo, 
  EducationFaq, 
  PrescribedMedication, 
  DoseLogEntry,
  AdherenceSummary
} from '../types/medical';

export const INDIAN_EMERGENCY_HELPLINES = [
  { name: 'National Emergency Response (All Emergencies)', number: '+91 112', desc: 'Unified 24/7 Police, Fire, and Medical Dispatch across India' },
  { name: 'National Emergency Ambulance Service', number: '+91 108', desc: 'State-level ALS / BLS emergency ambulance fleet' },
  { name: 'eSanjeevani & Health Information Helpline', number: '+91 104', desc: 'Govt. of India Telemedicine & Clinical Triage Support' },
  { name: 'National Health Mission (NHM) Helpline', number: '+91 1075', desc: 'Infectious diseases, vaccine queries, and public health guidelines' },
  { name: 'NIMHANS Mental Health & Distress Helpline', number: '+91 80 4611 0007', desc: 'Psychological first aid & 24/7 counseling support' },
  { name: 'AIIMS National Poison Information Centre', number: '+91 11 2658 9391', desc: 'Toxicology & emergency toxic ingestion guidance' }
];

export const MOCK_EDUCATION_ARTICLES: EducationArticle[] = [
  {
    id: 'art-01',
    category: 'Cardiology & Heart Health',
    title: 'Managing Hypertension with Traditional Indian Diets',
    subtitle: 'Practical adjustments to pickles (Achaar), papad, and daily sodium without losing authentic flavor.',
    readTimeMinutes: 5,
    reviewedBy: 'Dr. Lakshmi Sundaram, MD, DM (Cardiology, Apollo Hospitals)',
    lastUpdated: 'Nov 2026',
    contentParagraphs: [
      'Hypertension is a leading contributor to coronary artery disease and cerebrovascular stroke in South Asia. While dietary guidelines frequently cite Western diets, traditional Indian diets present unique considerations: hidden sodium in preserved pickles, papads, commercial spice powders (masalas), and salted snacks like namkeen.',
      'Clinical studies show that reducing sodium consumption to under 2,000 mg/day (roughly one level teaspoon of salt) can reduce systolic blood pressure by 5 to 8 mmHg. Substituting rock salt or table salt with mineral-rich potassium alternatives (after consulting your physician) and seasoning food with fresh coriander, jeera (cumin), amchur (dry mango powder), and lemon helps maintain delicious flavor without elevating vascular tension.',
      'In addition, regular inclusion of potassium-rich local staples such as coconut water, bananas, drumstick leaves (moringa), and bottle gourd (lauki) assists in arterial vasodilation and natural fluid balance.'
    ],
    keyTakeaways: [
      'Limit high-sodium preserved accompaniments like achaar and salted papads to rare occasions.',
      'Flavor lentils and vegetable curries with antioxidant spices (turmeric, fenugreek, cumin, ginger) instead of extra salt.',
      'Aim for at least 150 minutes of weekly moderate aerobic activity like brisk walking.',
      'Check resting blood pressure at the same time each morning before morning medications.'
    ],
    dietAndLifestyleTips: [
      'Switch from processed table salt to measured mineral salts with physician advice.',
      'Introduce steamed lentils (dal), sprouts, and millets (Ragi, Jowar) to boost potassium and fiber.',
      'Hydrate with plain water and tender coconut water rather than sugary or salted beverages.'
    ],
    regionalIndianHelpline: '+91 104 (National Tele-Health Consultation)'
  },
  {
    id: 'art-02',
    category: 'Diabetes & Metabolic Wellness',
    title: 'Understanding HbA1c & Glycemic Control in South Asians',
    subtitle: 'Why Asian Indian phenotypes develop metabolic syndrome at lower BMI thresholds, and how to reverse it.',
    readTimeMinutes: 6,
    reviewedBy: 'Dr. Arvind Swaminathan, MD, DNB (Internal Medicine, Manipal Hospital)',
    lastUpdated: 'Oct 2026',
    contentParagraphs: [
      'The "South Asian Phenotype" is characterized by higher visceral adiposity, higher insulin resistance, and lower skeletal muscle mass even at lower overall Body Mass Index (BMI). Consequently, the World Health Organization (WHO) and Indian Council of Medical Research (ICMR) define overweight in South Asians starting at BMI 23 kg/m² and obesity at 25 kg/m².',
      'Glycated Hemoglobin (HbA1c) represents your three-month average blood glucose. A level below 5.7% is normal; 5.7% to 6.4% indicates prediabetes; and 6.5% or higher on two separate tests confirms diabetes. For diagnosed individuals, keeping HbA1c below 7.0% dramatically reduces the risk of diabetic retinopathy, nephropathy, and peripheral neuropathy.',
      'Dietary management emphasizes replacing refined carbohydrates (white polished rice, maida) with complex traditional millets (Foxtail, Kodo, Barnyard) and incorporating healthy plant proteins at every meal.'
    ],
    keyTakeaways: [
      'Target an HbA1c level below 7.0% or a personalized range set by your diabetologist.',
      'Adopt the "Half-Plate Rule": Fill half your plate with non-starchy vegetables (sabzi), a quarter with protein (dal, paneer, eggs), and a quarter with complex carbs.',
      'Undergo annual screening for diabetic eye health (dilated fundus exam) and microalbuminuria.'
    ],
    dietAndLifestyleTips: [
      'Replace polished white rice with unpolished red/brown rice or ancient millets.',
      'Consume soaked fenugreek (methi) seeds or cinnamon infusions to support insulin sensitivity.',
      'Take a 10-minute stroll immediately following heavy lunches and dinners.'
    ],
    regionalIndianHelpline: '+91 1800 112 024 (Diabetes Support & Advisory)'
  },
  {
    id: 'art-03',
    category: 'Tropical & Seasonal Health',
    title: 'Dengue & Monsoon Fevers: Platelet Monitoring & Fluid Protocols',
    subtitle: 'Recognizing critical warning signs, avoiding harmful medications, and clinical hydration rules.',
    readTimeMinutes: 4,
    reviewedBy: 'Dr. Priya Sharma, MD, DNB (Pulmonology, Medanta The Medicity)',
    lastUpdated: 'Nov 2026',
    contentParagraphs: [
      'During monsoon and post-monsoon seasons across Indian metros, mosquito-borne viral infections like Dengue, Chikungunya, and Malaria surge. Dengue is characterized by sudden high fever, retro-orbital eye pain, severe myalgia ("breakbone fever"), and profound fatigue.',
      'The most critical phase of Dengue begins as the fever begins to subside (typically days 3 to 7). This "critical phase" can trigger plasma leakage, hemoconcentration (rising hematocrit), and falling platelet counts. The cornerstone of Dengue management is meticulous oral hydration (ORS, coconut water, fresh juices) rather than platelet transfusions alone.',
      'CRITICAL SAFETY WARNING: Never consume Aspirin, Ibuprofen, Diclofenac, or other NSAIDs for fever during dengue outbreaks, as they impair platelet function and significantly aggravate gastrointestinal hemorrhage. Only Paracetamol is safe.'
    ],
    keyTakeaways: [
      'Never take NSAIDs (Aspirin, Brufen, Voveran) for monsoon fevers; use only Paracetamol.',
      'Monitor Complete Blood Count (CBC) every 24 hours during days 3 to 7 of fever.',
      'Seek emergency hospitalization if warning signs appear: persistent vomiting, abdominal pain, or mucosal bleeding.'
    ],
    dietAndLifestyleTips: [
      'Drink 2.5 to 3 liters of fluid daily (WHO-ORS, lemon water, buttermilk, coconut water).',
      'Use mosquito repellent creams (DEET/Picaridin) and screen windows during sunrise and sunset.',
      'Rest completely; avoid physical exercise until platelet counts stabilize above 100,000/μL.'
    ],
    regionalIndianHelpline: '+91 108 (Emergency Ambulance Dispatch)'
  },
  {
    id: 'art-04',
    category: 'Orthopedics & Joint Care',
    title: 'Cervical Spondylosis & Posture Ergonomics for Tech Workers',
    subtitle: 'Protecting your cervical spine from "Tech Neck" and repetitive workplace strain.',
    readTimeMinutes: 4,
    reviewedBy: 'Dr. Vikramaditya Rathore, MS, MCh (Orthopedic Surgery, Max Super Speciality)',
    lastUpdated: 'Oct 2026',
    contentParagraphs: [
      'With millions of professionals working prolonged hours in front of laptops and smartphones, cervical spine strain has reached epidemic proportions. Tilting the head forward by 45 degrees increases the effective gravitational load on cervical vertebrae from 5 kg to over 22 kg.',
      'Symptoms include stiff neck muscles, occipital tension headaches, shoulder blade tingling, and in severe cases, numbness radiating down the arms (cervical radiculopathy).',
      'Ergonomic workstation alignment: the top third of your computer monitor must be aligned with eye level, elbows supported at 90 degrees, and lower back supported by an ergonomic lumbar cushion.'
    ],
    keyTakeaways: [
      'Practice the 20-20-20 rule: Every 20 minutes, look at an object 20 feet away for 20 seconds.',
      'Perform isometric neck strengthening exercises twice daily without aggressive rotational twisting.',
      'Avoid soft bean bags or working from bed with the neck bent forward.'
    ],
    dietAndLifestyleTips: [
      'Ensure adequate Vitamin D3 (60,000 IU monthly or daily maintenance) and Calcium intake.',
      'Use a thin, contoured orthopedic cervical pillow that supports the natural lordotic curve.',
      'Take 5-minute movement breaks every hour to roll shoulders and stretch pectorals.'
    ]
  }
];

export const MOCK_EDUCATION_VIDEOS: EducationVideo[] = [
  {
    id: 'vid-01',
    category: 'Cardiology & Heart Health',
    title: 'Understanding 12-Lead ECG & Coronary Warning Signs',
    duration: '8:45 min',
    instructor: 'Dr. Lakshmi Sundaram, MD, DM',
    hospital: 'Apollo Heart Centre, Chennai',
    keyPoints: [
      'How electrocardiogram leads record electrical vectors of the heart',
      'Difference between angina pectoris and muscular chest wall pain',
      'Why early presentation within the "Golden Hour" saves myocardial tissue'
    ],
    videoThumbnailPrompt: 'Clinical cardiologist reviewing 12-lead ECG tracing in digital hospital suite'
  },
  {
    id: 'vid-02',
    category: 'Diabetes & Metabolic Wellness',
    title: 'Mastering Home Glucometer & CGM Sensor Readings',
    duration: '6:30 min',
    instructor: 'Dr. Arvind Swaminathan, MD',
    hospital: 'Manipal Hospital, Bengaluru',
    keyPoints: [
      'Proper finger prick technique: using sides of fingertips to reduce pain',
      'Timing fasting vs 2-hour postprandial (PP) glycemic tests',
      'How to log readings into your CarePulse patient health record'
    ],
    videoThumbnailPrompt: 'Close up of clinical digital glucometer calibration with sterile lancet'
  },
  {
    id: 'vid-03',
    category: 'Tropical & Seasonal Health',
    title: 'Emergency First Responder CPR & Choking Relief Guide',
    duration: '11:15 min',
    instructor: 'Officer R. Senthil Kumar, Paramedic Critical Care Lead',
    hospital: 'CarePulse Emergency Trauma Services (+91 108 / 112)',
    keyPoints: [
      'Hands-only CPR: 100–120 compressions per minute at center of chest',
      'When to dial +91 112 / +91 108 and use an Automated External Defibrillator (AED)',
      'Heimlich abdominal thrusts for conscious choking adults and children'
    ],
    videoThumbnailPrompt: 'Emergency paramedic demonstrating CPR technique on clinical training mannequin'
  }
];

export const MOCK_EDUCATION_FAQS: EducationFaq[] = [
  {
    id: 'faq-01',
    category: 'Cardiology & Heart Health',
    question: 'What is the immediate emergency number to call for heart attack symptoms in India?',
    answer: 'Immediately dial +91 112 (National Unified Emergency) or +91 108 (State Ambulance Dispatch). Do not attempt to drive yourself. Keep the patient seated quietly and chew one non-enteric Aspirin 300mg immediately unless allergic.',
    emergencyTrigger: true
  },
  {
    id: 'faq-02',
    category: 'Diabetes & Metabolic Wellness',
    question: 'What should I do if my blood sugar drops below 70 mg/dL (Hypoglycemia)?',
    answer: 'Follow the "Rule of 15": Immediately consume 15 grams of fast-acting carbohydrates (3 teaspoons of sugar dissolved in water, half a cup of fruit juice, or 4 glucose tablets). Wait 15 minutes and recheck blood sugar. Repeat if still under 70 mg/dL.',
    emergencyTrigger: false
  },
  {
    id: 'faq-03',
    category: 'Tropical & Seasonal Health',
    question: 'Can I take Ibuprofen or Combiflam for high fever during Dengue season?',
    answer: 'NO. Never take Ibuprofen, Aspirin, Diclofenac, or Mefenamic acid during suspected Dengue or viral fevers. These drugs destroy platelets and cause severe internal bleeding. Only use Paracetamol up to 650mg under medical guidance.',
    emergencyTrigger: true
  },
  {
    id: 'faq-04',
    category: 'Orthopedics & Joint Care',
    question: 'How do I know if my joint injury is a sprain or a fracture?',
    answer: 'Inability to bear any weight, immediate severe swelling, audible cracking sound, or visible angular bone deformity strongly points toward a fracture. Immobilize the limb without moving it and seek an emergency digital X-ray.',
    emergencyTrigger: false
  },
  {
    id: 'faq-05',
    category: 'Pediatric & Immunity Care',
    question: 'What is the National Toll-Free Telemedicine service in India?',
    answer: 'You can access free government telemedicine and triage advice via the eSanjeevani portal or by dialing +91 104 from any mobile or landline across Indian states.',
    emergencyTrigger: false
  }
];

// Active Prescribed Medications for Patient "Rajiv Sharma" (52M)
export const MOCK_PRESCRIBED_MEDICATIONS: PrescribedMedication[] = [
  {
    id: 'rx-med-1',
    drugName: 'Atorvastatin Calcium',
    brandName: 'Atorva 20 (Zydus)',
    dosage: '20 mg',
    form: 'Tablet',
    purpose: 'Lowers LDL cholesterol and stabilizes coronary arterial plaque',
    prescribedBy: 'Dr. Lakshmi Sundaram (Cardiology)',
    timingSlots: ['Bedtime'],
    reminderTimes: ['09:00 PM'],
    foodRelation: 'After Food',
    startDate: 'Sep 21, 2026',
    durationDays: 180,
    totalPills: 60,
    remainingPills: 14,
    refillThreshold: 10,
    active: true
  },
  {
    id: 'rx-med-2',
    drugName: 'Lisinopril ACE Inhibitor',
    brandName: 'Listril 10 (Torrent)',
    dosage: '10 mg',
    form: 'Tablet',
    purpose: 'Controls arterial blood pressure and protects renal microvasculature',
    prescribedBy: 'Dr. Lakshmi Sundaram (Cardiology)',
    timingSlots: ['Morning'],
    reminderTimes: ['08:00 AM'],
    foodRelation: 'After Food',
    startDate: 'Aug 12, 2026',
    durationDays: 365,
    totalPills: 90,
    remainingPills: 38,
    refillThreshold: 15,
    active: true
  },
  {
    id: 'rx-med-3',
    drugName: 'Metformin Hydrochloride SR',
    brandName: 'Glycomet-SR 500 (USV)',
    dosage: '500 mg',
    form: 'Tablet',
    purpose: 'Improves peripheral insulin sensitivity & regulates hepatic gluconeogenesis',
    prescribedBy: 'Dr. Arvind Swaminathan (Internal Med)',
    timingSlots: ['Morning', 'Bedtime'],
    reminderTimes: ['08:30 AM', '08:30 PM'],
    foodRelation: 'With Food',
    startDate: 'Oct 01, 2026',
    durationDays: 180,
    totalPills: 120,
    remainingPills: 52,
    refillThreshold: 20,
    active: true
  },
  {
    id: 'rx-med-4',
    drugName: 'Calcium Carbonate + Vitamin D3',
    brandName: 'Shelcal 500 (Torrent)',
    dosage: '500 mg + 250 IU',
    form: 'Tablet',
    purpose: 'Supports bone mineral density and joint cartilage metabolism',
    prescribedBy: 'Dr. Vikramaditya Rathore (Orthopedics)',
    timingSlots: ['Afternoon'],
    reminderTimes: ['01:30 PM'],
    foodRelation: 'With Food',
    startDate: 'Sep 15, 2026',
    durationDays: 90,
    totalPills: 60,
    remainingPills: 8, // Triggers Low Refill Alert!
    refillThreshold: 10,
    active: true
  }
];

// Initial Dose Logs for Today & Past Days
export const MOCK_INITIAL_DOSE_LOGS: DoseLogEntry[] = [
  {
    id: 'log-today-1',
    medicationId: 'rx-med-2',
    drugName: 'Lisinopril 10mg',
    dosage: '10 mg',
    scheduledTime: '08:00 AM',
    slot: 'Morning',
    date: 'Today, Nov 11',
    status: 'taken',
    takenAt: '08:14 AM'
  },
  {
    id: 'log-today-2',
    medicationId: 'rx-med-3',
    drugName: 'Metformin XR 500mg (Dose 1)',
    dosage: '500 mg',
    scheduledTime: '08:30 AM',
    slot: 'Morning',
    date: 'Today, Nov 11',
    status: 'taken',
    takenAt: '08:42 AM'
  },
  {
    id: 'log-today-3',
    medicationId: 'rx-med-4',
    drugName: 'Calcium + Vit D3',
    dosage: '500 mg',
    scheduledTime: '01:30 PM',
    slot: 'Afternoon',
    date: 'Today, Nov 11',
    status: 'taken',
    takenAt: '01:35 PM'
  },
  {
    id: 'log-today-4',
    medicationId: 'rx-med-3',
    drugName: 'Metformin XR 500mg (Dose 2)',
    dosage: '500 mg',
    scheduledTime: '08:30 PM',
    slot: 'Bedtime',
    date: 'Today, Nov 11',
    status: 'pending'
  },
  {
    id: 'log-today-5',
    medicationId: 'rx-med-1',
    drugName: 'Atorvastatin 20mg',
    dosage: '20 mg',
    scheduledTime: '09:00 PM',
    slot: 'Bedtime',
    date: 'Today, Nov 11',
    status: 'pending'
  }
];

export const MOCK_INITIAL_ADHERENCE: AdherenceSummary = {
  overallPercentage: 92,
  currentStreakDays: 14,
  dosesTakenThisWeek: 23,
  dosesScheduledThisWeek: 25,
  missedDosesCount: 2,
  last7DaysLogs: [
    { date: 'Nov 05', takenCount: 4, totalCount: 4, percentage: 100 },
    { date: 'Nov 06', takenCount: 4, totalCount: 4, percentage: 100 },
    { date: 'Nov 07', takenCount: 3, totalCount: 4, percentage: 75 },
    { date: 'Nov 08', takenCount: 4, totalCount: 4, percentage: 100 },
    { date: 'Nov 09', takenCount: 4, totalCount: 4, percentage: 100 },
    { date: 'Nov 10', takenCount: 4, totalCount: 4, percentage: 100 },
    { date: 'Nov 11', takenCount: 3, totalCount: 3, percentage: 100 }
  ]
};
