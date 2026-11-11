import React, { useState } from 'react';
import { 
  MOCK_DOCTORS, 
  MOCK_HEALTH_PACKAGES, 
  MOCK_DIAGNOSTIC_REPORTS, 
  MOCK_PATIENT_PROFILES, 
  MOCK_PHARMACY_ITEMS, 
  MOCK_EMERGENCY_HOSPITALS, 
  MOCK_DISCHARGE_SUMMARIES 
} from './data/mockMedicalData';
import { 
  MOCK_PRESCRIBED_MEDICATIONS, 
  MOCK_INITIAL_DOSE_LOGS, 
  MOCK_INITIAL_ADHERENCE 
} from './data/mockEducationAndMedData';
import { 
  Doctor, 
  Appointment, 
  PackageBooking, 
  DiagnosticReport, 
  VitalRecord, 
  ClinicalEncounter, 
  PharmacyItem, 
  CartItem, 
  PharmacyOrder,
  PrescribedMedication,
  DoseLogEntry,
  AdherenceSummary
} from './types/medical';
import { Navbar, NavTab } from './components/Navbar';
import { DoctorConsultation } from './components/DoctorConsultation';
import { SymptomChecker } from './components/SymptomChecker';
import { PatientEducation } from './components/PatientEducation';
import { MedicationManagement } from './components/MedicationManagement';
import { HealthCheckup } from './components/HealthCheckup';
import { ScanReports } from './components/ScanReports';
import { PatientCaseHistory } from './components/PatientCaseHistory';
import { Pharmacy } from './components/Pharmacy';
import { EmergencyCare } from './components/EmergencyCare';
import { AccidentalCare } from './components/AccidentalCare';
import { DischargeSummaries } from './components/DischargeSummaries';
import { VideoConferenceModal } from './components/VideoConferenceModal';
import { Bot, Pill, BookOpen, Video, ShieldCheck } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<NavTab>('consultation');

  // Core Clinical Data States
  const [doctors] = useState<Doctor[]>(MOCK_DOCTORS);
  const [packages] = useState(MOCK_HEALTH_PACKAGES);
  const [diagnosticReports, setDiagnosticReports] = useState<DiagnosticReport[]>(MOCK_DIAGNOSTIC_REPORTS);
  const [patientProfiles, setPatientProfiles] = useState(MOCK_PATIENT_PROFILES);
  const [activeProfileId, setActiveProfileId] = useState<string>(MOCK_PATIENT_PROFILES[0].id);

  // Medication Management & Adherence State
  const [prescribedMedications, setPrescribedMedications] = useState<PrescribedMedication[]>(MOCK_PRESCRIBED_MEDICATIONS);
  const [doseLogs, setDoseLogs] = useState<DoseLogEntry[]>(MOCK_INITIAL_DOSE_LOGS);
  const [adherenceSummary, setAdherenceSummary] = useState<AdherenceSummary>(MOCK_INITIAL_ADHERENCE);

  // Pharmacy & Cart State
  const [pharmacyItems] = useState<PharmacyItem[]>(MOCK_PHARMACY_ITEMS);
  const [cart, setCart] = useState<CartItem[]>([
    { product: MOCK_PHARMACY_ITEMS[0], quantity: 1 } // Pre-loaded with Lipitor 20mg
  ]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [activeOrders, setActiveOrders] = useState<PharmacyOrder[]>([]);

  // Appointments & Checkups State
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [packageBookings, setPackageBookings] = useState<PackageBooking[]>([]);

  // Telehealth Video Call State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeCallDoctor, setActiveCallDoctor] = useState<Doctor>(MOCK_DOCTORS[0]);

  const currentProfile = patientProfiles.find((p) => p.id === activeProfileId) || patientProfiles[0];

  // Medication Dose Tracking Actions
  const handleMarkDose = (logId: string, status: 'taken' | 'skipped' | 'pending', skipReason?: string) => {
    setDoseLogs((prev) =>
      prev.map((log) => {
        if (log.id === logId) {
          const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return {
            ...log,
            status,
            takenAt: status === 'taken' ? nowStr : undefined,
            skipReason: status === 'skipped' ? skipReason || 'Skipped by patient' : undefined
          };
        }
        return log;
      })
    );

    // Recalculate adherence
    setAdherenceSummary((prev) => {
      const updatedLogs = doseLogs.map((l) => (l.id === logId ? { ...l, status } : l));
      const taken = updatedLogs.filter((l) => l.status === 'taken').length;
      const total = updatedLogs.length;
      const newPct = total > 0 ? Math.round((taken / total) * 100) : 100;
      return {
        ...prev,
        overallPercentage: Math.max(70, Math.min(100, Math.round((prev.overallPercentage + newPct) / 2))),
        dosesTakenThisWeek: status === 'taken' ? prev.dosesTakenThisWeek + 1 : prev.dosesTakenThisWeek
      };
    });
  };

  const handleAddMedication = (newMed: PrescribedMedication) => {
    setPrescribedMedications((prev) => [newMed, ...prev]);
    // Create dose logs for today
    const newLogs: DoseLogEntry[] = newMed.timingSlots.map((slot, idx) => ({
      id: `log-new-${Date.now()}-${idx}`,
      medicationId: newMed.id,
      drugName: `${newMed.drugName} ${newMed.dosage}`,
      dosage: newMed.dosage,
      scheduledTime: newMed.reminderTimes[idx] || '08:00 AM',
      slot,
      date: 'Today, Nov 11',
      status: 'pending'
    }));
    setDoseLogs((prev) => [...prev, ...newLogs]);
  };

  const handleDeleteMedication = (medId: string) => {
    setPrescribedMedications((prev) => prev.filter((m) => m.id !== medId));
    setDoseLogs((prev) => prev.filter((l) => l.medicationId !== medId));
  };

  const handleOrderPharmacyRefill = (medName: string) => {
    const match = pharmacyItems.find(
      (item) =>
        item.name.toLowerCase().includes(medName.toLowerCase()) ||
        medName.toLowerCase().includes(item.name.toLowerCase())
    );
    if (match) {
      handleAddToCart(match);
    }
    setActiveTab('pharmacy');
    setIsCartDrawerOpen(true);
  };

  // Cart operations
  const handleAddToCart = (product: PharmacyItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartDrawerOpen(true);
  };

  const handleUpdateCartQty = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handlePlaceOrder = (order: PharmacyOrder) => {
    setActiveOrders((prev) => [order, ...prev]);
  };

  // Appointment & Package Handlers
  const handleBookAppointment = (apt: Appointment) => {
    setAppointments((prev) => [apt, ...prev]);
  };

  const handleBookPackage = (booking: PackageBooking) => {
    setPackageBookings((prev) => [booking, ...prev]);
  };

  // Patient Case History updates
  const handleAddVitalRecord = (patientId: string, vital: VitalRecord) => {
    setPatientProfiles((prev) =>
      prev.map((profile) =>
        profile.id === patientId
          ? { ...profile, vitalsHistory: [vital, ...profile.vitalsHistory] }
          : profile
      )
    );
  };

  const handleAddEncounter = (patientId: string, encounter: ClinicalEncounter) => {
    setPatientProfiles((prev) =>
      prev.map((profile) =>
        profile.id === patientId
          ? { ...profile, encounters: [encounter, ...profile.encounters] }
          : profile
      )
    );
  };

  // Virtual Call Triggers
  const handleStartInstantCall = (doctor: Doctor) => {
    setActiveCallDoctor(doctor);
    setIsVideoModalOpen(true);
  };

  const handleQuickConsultTopBar = () => {
    setActiveCallDoctor(doctors[0]);
    setIsVideoModalOpen(true);
  };

  const handleOpenConsultationWithReport = (report: DiagnosticReport) => {
    const doc = doctors.find((d) => d.name.includes('Sundaram') || d.name.includes('Narang')) || doctors[0];
    setActiveCallDoctor(doc);
    setIsVideoModalOpen(true);
  };

  const handleOrderFromPrescription = (medNames: string[]) => {
    medNames.forEach((name) => {
      const match = pharmacyItems.find(
        (item) =>
          item.name.toLowerCase().includes(name.toLowerCase()) ||
          name.toLowerCase().includes(item.name.toLowerCase())
      );
      if (match) {
        handleAddToCart(match);
      }
    });
    setActiveTab('pharmacy');
    setIsVideoModalOpen(false);
    setIsCartDrawerOpen(true);
  };

  const handleConsultFromSymptomChecker = (specialistSpecialty?: string) => {
    if (specialistSpecialty) {
      const matchDoc = doctors.find((d) =>
        d.specialty.toLowerCase().includes(specialistSpecialty.toLowerCase())
      );
      if (matchDoc) {
        setActiveCallDoctor(matchDoc);
        setIsVideoModalOpen(true);
        return;
      }
    }
    setActiveTab('consultation');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Universal Top Navigation with Indian Emergency Strip */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        cartItemCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        onOpenCart={() => setIsCartDrawerOpen(true)}
        onQuickConsult={handleQuickConsultTopBar}
        onTriggerSos={() => setActiveTab('emergency')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Quick Clinical Toolstrip for Easy Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setActiveTab('symptom_checker')}
            className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
              activeTab === 'symptom_checker'
                ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                : 'bg-white text-slate-800 border-slate-200 hover:border-teal-400'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${activeTab === 'symptom_checker' ? 'bg-teal-800 text-white' : 'bg-teal-50 text-teal-700'}`}>
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold">AI Symptom Checker</p>
                <p className={`text-[11px] ${activeTab === 'symptom_checker' ? 'text-teal-200' : 'text-slate-500'}`}>
                  Clinical Triage & Differential Evaluation
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('med_management')}
            className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
              activeTab === 'med_management'
                ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                : 'bg-white text-slate-800 border-slate-200 hover:border-teal-400'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${activeTab === 'med_management' ? 'bg-teal-800 text-white' : 'bg-teal-50 text-teal-700'}`}>
                <Pill className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold">Medication Reminders</p>
                <p className={`text-[11px] ${activeTab === 'med_management' ? 'text-teal-200' : 'text-slate-500'}`}>
                  {adherenceSummary.overallPercentage}% Adherence · {prescribedMedications.length} Active Prescriptions
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('education')}
            className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
              activeTab === 'education'
                ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                : 'bg-white text-slate-800 border-slate-200 hover:border-teal-400'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${activeTab === 'education' ? 'bg-teal-800 text-white' : 'bg-teal-50 text-teal-700'}`}>
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold">Patient Education Library</p>
                <p className={`text-[11px] ${activeTab === 'education' ? 'text-teal-200' : 'text-slate-500'}`}>
                  Articles, Videos & Indian Helplines (+91)
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Tab Route Views */}
        {activeTab === 'consultation' && (
          <DoctorConsultation
            doctors={doctors}
            onStartInstantCall={handleStartInstantCall}
            onBookAppointment={handleBookAppointment}
            activePatientName={currentProfile.fullName}
          />
        )}

        {activeTab === 'symptom_checker' && (
          <SymptomChecker
            doctors={doctors}
            patientProfile={currentProfile}
            onConsultDoctor={handleConsultFromSymptomChecker}
            onEmergencyTrigger={() => setActiveTab('emergency')}
            onOrderPharmacy={() => setActiveTab('pharmacy')}
          />
        )}

        {activeTab === 'med_management' && (
          <MedicationManagement
            medications={prescribedMedications}
            doseLogs={doseLogs}
            adherence={adherenceSummary}
            onMarkDose={handleMarkDose}
            onAddMedication={handleAddMedication}
            onDeleteMedication={handleDeleteMedication}
            onOrderPharmacyRefill={handleOrderPharmacyRefill}
            patientName={currentProfile.fullName}
          />
        )}

        {activeTab === 'education' && (
          <PatientEducation
            onConsultDoctor={handleConsultFromSymptomChecker}
          />
        )}

        {activeTab === 'checkups' && (
          <HealthCheckup
            packages={packages}
            onBookPackage={handleBookPackage}
            activePatientName={currentProfile.fullName}
          />
        )}

        {activeTab === 'scans' && (
          <ScanReports
            reports={diagnosticReports}
            onOpenConsultationWithReport={handleOpenConsultationWithReport}
          />
        )}

        {activeTab === 'history' && (
          <PatientCaseHistory
            profiles={patientProfiles}
            activeProfileId={activeProfileId}
            onSelectProfile={setActiveProfileId}
            onAddVitalRecord={handleAddVitalRecord}
            onAddEncounter={handleAddEncounter}
          />
        )}

        {activeTab === 'pharmacy' && (
          <Pharmacy
            items={pharmacyItems}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onPlaceOrder={handlePlaceOrder}
            activeOrders={activeOrders}
            isCartDrawerOpen={isCartDrawerOpen}
            onCloseCartDrawer={() => setIsCartDrawerOpen(false)}
            activePatientAddress="450 Healthcare Enclave, Koramangala, Bengaluru, Karnataka"
          />
        )}

        {activeTab === 'emergency' && (
          <EmergencyCare
            hospitals={MOCK_EMERGENCY_HOSPITALS}
            activePatientName={currentProfile.fullName}
            activePatientAddress="450 Healthcare Enclave, Koramangala, Bengaluru, Karnataka"
          />
        )}

        {activeTab === 'accidental' && (
          <AccidentalCare
            activePatientName={currentProfile.fullName}
          />
        )}

        {activeTab === 'discharge' && (
          <DischargeSummaries
            summaries={MOCK_DISCHARGE_SUMMARIES}
          />
        )}
      </main>

      {/* Secure Telehealth Video Conferencing Suite Modal */}
      {isVideoModalOpen && (
        <VideoConferenceModal
          doctor={activeCallDoctor}
          patientName={currentProfile.fullName}
          onClose={() => setIsVideoModalOpen(false)}
          availableReports={diagnosticReports}
          onOrderMedicinesFromPrescription={handleOrderFromPrescription}
        />
      )}

      {/* Quiet Clinical Footer with Indian Emergency Contacts */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-slate-800">CarePulse Clinical Network (India)</span>
            <span>·</span>
            <span>National Emergency: <strong className="text-rose-600 font-mono">+91 112</strong></span>
            <span>·</span>
            <span>Ambulance: <strong className="text-rose-600 font-mono">+91 108</strong></span>
            <span>·</span>
            <span>Tele-Health: <strong className="text-teal-700 font-mono">+91 104</strong></span>
          </div>
          <div>
            <span>© 2026 CarePulse Clinical Systems. All patient health records encrypted at rest and in transit.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
