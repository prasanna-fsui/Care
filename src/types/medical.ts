export type Specialty = 
  | 'Cardiology'
  | 'Neurology'
  | 'Internal Medicine'
  | 'Pediatrics'
  | 'Orthopedics'
  | 'Dermatology'
  | 'Pulmonology'
  | 'General Surgery';

export interface Doctor {
  id: string;
  name: string;
  degree: string;
  specialty: Specialty;
  experienceYears: number;
  hospital: string;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  nextAvailable: string;
  avatarUrl: string;
  languages: string[];
  bio: string;
  availableDays: string[];
  slots: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  date: string;
  timeSlot: string;
  type: 'video' | 'in-person';
  reason: string;
  symptoms: string[];
  status: 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface HealthPackageTest {
  category: string;
  tests: string[];
}

export interface HealthCheckupPackage {
  id: string;
  title: string;
  tagline: string;
  totalTests: number;
  recommendedFor: string;
  price: number;
  originalPrice: number;
  fastingRequiredHours: number;
  reportTurnaround: string;
  sampleType: string[];
  categories: HealthPackageTest[];
  preparationNotes: string[];
}

export interface PackageBooking {
  id: string;
  packageId: string;
  packageName: string;
  patientName: string;
  collectionType: 'home_pickup' | 'center_visit';
  address: string;
  date: string;
  timeSlot: string;
  price: number;
  status: 'booked' | 'phlebotomist_assigned' | 'sample_collected' | 'processing' | 'report_ready';
}

export interface LabTestResult {
  parameter: string;
  value: number;
  unit: string;
  referenceMin: number;
  referenceMax: number;
  status: 'normal' | 'low' | 'high' | 'critical';
}

export interface DiagnosticReport {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  modality: 'MRI' | 'CT Scan' | 'Digital X-Ray' | 'Ultrasound' | 'Pathology';
  title: string;
  organ: string;
  referringDoctor: string;
  radiologist: string;
  findings: string[];
  impression: string;
  recommendations: string[];
  imageUrl?: string;
  slicesCount?: number;
  labResults?: LabTestResult[];
  status: 'verified' | 'preliminary';
}

export interface VitalRecord {
  id: string;
  date: string;
  time: string;
  systolicBp: number;
  diastolicBp: number;
  heartRate: number;
  bloodSugar: number;
  spO2: number;
  temperature: number;
  notes?: string;
}

export interface ClinicalEncounter {
  id: string;
  date: string;
  doctorName: string;
  specialty: string;
  facility: string;
  chiefComplaint: string;
  clinicalDiagnosis: string;
  treatmentPlan: string;
  prescriptions: string[];
}

export interface PatientProfile {
  id: string;
  fullName: string;
  relationship: 'Self' | 'Mother' | 'Son' | 'Spouse';
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  weightKg: number;
  heightCm: number;
  chronicConditions: string[];
  allergies: { allergen: string; severity: 'Mild' | 'Moderate' | 'Severe'; reaction: string }[];
  immunizations: { vaccine: string; date: string; provider: string }[];
  vitalsHistory: VitalRecord[];
  encounters: ClinicalEncounter[];
}

export interface PharmacyItem {
  id: string;
  name: string;
  brand: string;
  category: 'Cardiovascular' | 'Anti-diabetic' | 'Pain Relief' | 'Antibiotics' | 'Vitamins & Wellness' | 'Respiratory';
  dosage: string;
  composition: string;
  price: number;
  originalPrice: number;
  requiresPrescription: boolean;
  inStock: boolean;
  packageSize: string;
  instructions: string;
  warnings: string;
}

export interface CartItem {
  product: PharmacyItem;
  quantity: number;
}

export interface PharmacyOrder {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  shippingAddress: string;
  prescriptionAttached: boolean;
  status: 'placed' | 'verified_by_pharmacist' | 'dispensed' | 'out_for_delivery' | 'delivered';
  estimatedDelivery: string;
  createdAt: string;
}

export interface EmergencyHospital {
  id: string;
  name: string;
  address: string;
  distanceKm: number;
  estimatedArrivalMinutes: number;
  traumaLevel: 'Level 1 Trauma Center' | 'Level 2 Trauma Center' | 'Acute Emergency Center';
  totalErBeds: number;
  availableErBeds: number;
  icuAvailable: boolean;
  helipad: boolean;
  hotline: string;
  lat: number;
  lng: number;
}

export interface AmbulanceDispatch {
  id: string;
  patientName: string;
  pickupLocation: string;
  assignedHospital: string;
  ambulanceNumber: string;
  paramedicLead: string;
  driverPhone: string;
  status: 'dispatched' | 'en_route' | 'patient_onboard' | 'hospital_arrival';
  etaMinutes: number;
  dispatchTime: string;
}

export interface CasualtyFastTrackToken {
  tokenNumber: string;
  patientName: string;
  age: number;
  injuryCategory: string;
  triagePriority: 'Red - Resuscitation' | 'Orange - Emergent' | 'Yellow - Urgent';
  timestamp: string;
  erAssignedBay: string;
  attendingPhysician: string;
}

export interface DischargeSummaryRecord {
  id: string;
  dischargeId: string;
  patientName: string;
  patientMrn: string;
  admissionDate: string;
  dischargeDate: string;
  lengthOfStayDays: number;
  department: string;
  admittingConsultant: string;
  dischargeDiagnoses: {
    primary: string;
    secondary: string[];
  };
  surgicalProcedures: {
    name: string;
    date: string;
    surgeon: string;
    implantsUsed?: string;
  }[];
  hospitalCourse: string;
  dischargeVitals: {
    bp: string;
    pulse: string;
    spO2: string;
    temperature: string;
    randomSugar: string;
  };
  dischargeMedications: {
    drug: string;
    dosage: string;
    frequency: string;
    timing: 'Morning' | 'Morning / Night' | 'Morning / Afternoon / Night' | 'Night only' | 'As needed';
    foodRelation: 'After food' | 'Before food' | 'With water';
    durationDays: number;
  }[];
  postDischargeInstructions: string[];
  warningSignsSeekImmediateCare: string[];
  followUpSchedule: {
    date: string;
    doctor: string;
    department: string;
    testsToCompleteBefore: string[];
  };
}

// AI Symptom Checker Types
export interface SymptomCheckRequest {
  symptoms: string[];
  duration: string;
  severity: number;
  description: string;
  age: number;
  gender: string;
  pregnancyStatus?: string;
  location: string;
  chronicConditions: string[];
  medications: string[];
  allergies: string[];
  lifestyle: string;
}

export interface PotentialCondition {
  name: string;
  likelihood: 'High' | 'Moderate' | 'Low';
  explanation: string;
  recommendedSpecialist: string;
}

export interface SymptomCheckResult {
  urgencyLevel: 'Emergency' | 'Urgent' | 'Routine' | 'Self-Care';
  urgencyBadgeColor: 'red' | 'orange' | 'yellow' | 'green';
  summaryTriageNote: string;
  potentialConditions: PotentialCondition[];
  recommendedAction: string;
  emergencyHelpline: string;
  recommendedInvestigations: string[];
  redFlagsSeekImmediateCare: string[];
  homeCareGuidance: string[];
}

// Patient Education Resource Types (with Indian country codes & healthcare topics)
export type EducationCategory = 
  | 'Cardiology & Heart Health'
  | 'Diabetes & Metabolic Wellness'
  | 'Tropical & Seasonal Health'
  | 'Orthopedics & Joint Care'
  | 'Women’s Health & Hormones'
  | 'Pediatric & Immunity Care';

export interface EducationArticle {
  id: string;
  category: EducationCategory;
  title: string;
  subtitle: string;
  readTimeMinutes: number;
  reviewedBy: string;
  lastUpdated: string;
  contentParagraphs: string[];
  keyTakeaways: string[];
  dietAndLifestyleTips: string[];
  regionalIndianHelpline?: string;
}

export interface EducationVideo {
  id: string;
  category: EducationCategory;
  title: string;
  duration: string;
  instructor: string;
  hospital: string;
  keyPoints: string[];
  videoThumbnailPrompt: string;
}

export interface EducationFaq {
  id: string;
  category: EducationCategory;
  question: string;
  answer: string;
  emergencyTrigger?: boolean;
}

// Medication Management & Adherence Tracker Types
export interface PrescribedMedication {
  id: string;
  drugName: string;
  brandName?: string;
  dosage: string;
  form: 'Tablet' | 'Capsule' | 'Inhaler' | 'Syrup' | 'Injection' | 'Drops';
  purpose: string;
  prescribedBy: string;
  timingSlots: ('Morning' | 'Afternoon' | 'Evening' | 'Bedtime')[];
  reminderTimes: string[]; // e.g. ["08:00 AM", "08:30 PM"]
  foodRelation: 'Before Food' | 'After Food' | 'With Food' | 'Empty Stomach';
  startDate: string;
  durationDays: number;
  totalPills: number;
  remainingPills: number;
  refillThreshold: number;
  active: boolean;
}

export interface DoseLogEntry {
  id: string;
  medicationId: string;
  drugName: string;
  dosage: string;
  scheduledTime: string;
  slot: 'Morning' | 'Afternoon' | 'Evening' | 'Bedtime';
  date: string;
  status: 'taken' | 'skipped' | 'pending';
  takenAt?: string;
  skipReason?: string;
}

export interface AdherenceSummary {
  overallPercentage: number;
  currentStreakDays: number;
  dosesTakenThisWeek: number;
  dosesScheduledThisWeek: number;
  missedDosesCount: number;
  last7DaysLogs: { date: string; takenCount: number; totalCount: number; percentage: number }[];
}

