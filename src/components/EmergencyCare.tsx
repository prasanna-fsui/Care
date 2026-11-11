import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  AlertTriangle, 
  Navigation, 
  MapPin, 
  Activity, 
  CheckCircle2, 
  Radio, 
  Truck, 
  Phone, 
  X,
  Compass,
  Bed
} from 'lucide-react';
import { EmergencyHospital, AmbulanceDispatch } from '../types/medical';

interface EmergencyCareProps {
  hospitals: EmergencyHospital[];
  activePatientName: string;
  activePatientAddress: string;
}

export const EmergencyCare: React.FC<EmergencyCareProps> = ({
  hospitals,
  activePatientName,
  activePatientAddress
}) => {
  const [activeDispatch, setActiveDispatch] = useState<AmbulanceDispatch | null>({
    id: 'AMB-DISP-781',
    patientName: activePatientName,
    pickupLocation: activePatientAddress,
    assignedHospital: 'Apollo Comprehensive Trauma Center, Greams Road',
    ambulanceNumber: 'ACLS-UNIT-14',
    paramedicLead: 'Officer R. Senthil Kumar (Critical Care Paramedic Lead)',
    driverPhone: '+91 98450 11208',
    status: 'en_route',
    etaMinutes: 5,
    dispatchTime: '2 mins ago'
  });

  const [isCallingHotline, setIsCallingHotline] = useState(false);
  const [selectedTriageAnswers, setSelectedTriageAnswers] = useState<{ [key: string]: boolean }>({});
  const [triageAcuityResult, setTriageAcuityResult] = useState<string | null>(null);

  // Dispatch live ETA countdown simulation
  useEffect(() => {
    if (!activeDispatch || activeDispatch.etaMinutes <= 1) return;
    const interval = setInterval(() => {
      setActiveDispatch((prev) => (prev ? { ...prev, etaMinutes: Math.max(1, prev.etaMinutes - 1) } : null));
    }, 25000);
    return () => clearInterval(interval);
  }, [activeDispatch]);

  const handleRequestAmbulance = () => {
    setActiveDispatch({
      id: `AMB-DISP-${Date.now().toString().slice(-4)}`,
      patientName: activePatientName,
      pickupLocation: activePatientAddress,
      assignedHospital: hospitals[0]?.name || 'St. Jude Comprehensive Trauma Center',
      ambulanceNumber: 'ACLS-UNIT-09',
      paramedicLead: 'Sgt. Claire Ramos, NREMT-P',
      driverPhone: '+91 98450 11208',
      status: 'dispatched',
      etaMinutes: 6,
      dispatchTime: 'Just now'
    });
  };

  const handleTriageSubmit = () => {
    const hasChestPain = selectedTriageAnswers['chest_pain'];
    const hasStroke = selectedTriageAnswers['stroke_fast'];
    const hasBleed = selectedTriageAnswers['severe_bleed'];

    if (hasChestPain || hasStroke || hasBleed) {
      setTriageAcuityResult('RED - Immediate Resuscitation & Emergency Dispatch Required');
    } else {
      setTriageAcuityResult('ORANGE - Urgent Casualty Evaluation Recommended within 30 Minutes');
    }
  };

  return (
    <div className="space-y-8">
      {/* 24/7 Red SOS Emergency Banner */}
      <div className="bg-rose-950 text-white rounded-2xl p-6 sm:p-8 border border-rose-800 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-rose-800/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-rose-300 font-mono">
                Immediate Emergency Medical Services (EMS)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Life-Threatening Emergency or Severe Trauma?
            </h1>
            <p className="text-rose-100 text-sm mt-2 leading-relaxed">
              Direct connection to regional paramedic dispatchers, advanced cardiac life-support (ACLS) ambulances, and nearest certified Level-1 trauma centers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => setIsCallingHotline(true)}
              className="flex items-center justify-center gap-2.5 px-6 py-4 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Call 24/7 Trauma Hotline (+91 112 / +91 108)</span>
            </button>

            <button
              onClick={handleRequestAmbulance}
              className="flex items-center justify-center gap-2 px-5 py-4 bg-rose-900/80 hover:bg-rose-900 border border-rose-700 text-white font-bold text-sm rounded-xl transition-colors"
            >
              <Truck className="w-5 h-5 text-rose-300" />
              <span>Dispatch Ambulance to My GPS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Ambulance Dispatch Tracker (if active) */}
      {activeDispatch && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
                <h2 className="text-base font-bold text-slate-900">
                  Live Ambulance Dispatch Tracking: {activeDispatch.ambulanceNumber}
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Assigned Unit from {activeDispatch.assignedHospital}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500">Estimated Arrival in:</span>
              <p className="text-2xl font-extrabold text-rose-600 font-mono">
                {activeDispatch.etaMinutes} MINS
              </p>
            </div>
          </div>

          {/* Interactive Simulated GPS Map Route */}
          <div className="relative h-48 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 p-4 flex flex-col justify-between">
            {/* Dark Map Grid & Vector Graphics Simulation */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
            
            {/* Simulated Route Line */}
            <div className="relative z-10 flex items-center justify-between w-full h-full px-6">
              {/* Hospital Station Point */}
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-teal-500 text-teal-400 flex items-center justify-center mx-auto shadow-lg">
                  <Navigation className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-slate-200 mt-1 block">Hospital ER</span>
              </div>

              {/* Connecting animated route */}
              <div className="flex-1 mx-4 relative flex items-center">
                <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal-500 to-rose-500 w-3/4 animate-pulse" />
                </div>
                {/* Moving Ambulance Beacon */}
                <div className="absolute left-2/3 -translate-y-4 -translate-x-1/2 flex flex-col items-center">
                  <span className="text-[10px] font-mono font-bold bg-rose-600 text-white px-1.5 py-0.5 rounded shadow">
                    Ambulance #14
                  </span>
                  <div className="w-4 h-4 rounded-full bg-rose-500 animate-ping mt-1" />
                </div>
              </div>

              {/* Patient Destination Point */}
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-rose-600/30 border-2 border-rose-500 text-rose-400 flex items-center justify-center mx-auto shadow-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-slate-200 mt-1 block">Your Location</span>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-xs text-slate-300 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-teal-400" />
                Live GPS Telemetry Syncing · Paramedic: <strong>{activeDispatch.paramedicLead}</strong>
              </span>
              <a
                href={`tel:${activeDispatch.driverPhone}`}
                className="flex items-center gap-1 text-teal-300 hover:text-white font-semibold"
              >
                <Phone className="w-3 h-3" />
                <span>Call Driver ({activeDispatch.driverPhone})</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Nearest Trauma Centers & ER Bed Availability */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Nearest Level-1 & Level-2 Trauma Hospitals
          </h2>
          <p className="text-slate-500 text-xs mt-0.5">
            Real-time ER bed occupancy, resuscitation bays, and emergency surgical suites
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hospitals.map((hosp) => (
            <div
              key={hosp.id}
              className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                    {hosp.traumaLevel}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700">
                    {hosp.distanceKm} km · {hosp.estimatedArrivalMinutes} min drive
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm mt-2">{hosp.name}</h3>
                <p className="text-slate-500 text-xs mt-0.5">{hosp.address}</p>

                <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Bed className="w-3.5 h-3.5 text-teal-700" />
                    <span>ER Beds Available:</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-700">
                    {hosp.availableErBeds} / {hosp.totalErBeds}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                  <span>ICU Ready: <strong>{hosp.icuAvailable ? 'Yes' : 'No'}</strong></span>
                  <span>·</span>
                  <span>Helipad: <strong>{hosp.helipad ? 'Active' : 'N/A'}</strong></span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex gap-2">
                <a
                  href={`tel:${hosp.hotline}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call ER Desk</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rapid Clinical Emergency Triage Questionnaire */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-700" />
            <span>Emergency Symptom Triage Acuity Assessment</span>
          </h2>
          <p className="text-slate-500 text-xs mt-0.5">
            Answer the critical indicators below for automated urgency grading and clinical protocol guidance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {[
            { key: 'chest_pain', label: 'Crushing chest tightness or radiating pain to jaw/arm' },
            { key: 'stroke_fast', label: 'Facial drooping, arm weakness, or slurred speech (FAST)' },
            { key: 'severe_bleed', label: 'Severe uncontrolled arterial bleeding or deep trauma' },
            { key: 'breath_distress', label: 'Severe shortness of breath or inability to speak in sentences' }
          ].map((q) => {
            const isChecked = !!selectedTriageAnswers[q.key];
            return (
              <button
                key={q.key}
                type="button"
                onClick={() =>
                  setSelectedTriageAnswers((prev) => ({ ...prev, [q.key]: !prev[q.key] }))
                }
                className={`p-3 rounded-lg border text-left transition-colors flex items-center justify-between gap-3 ${
                  isChecked
                    ? 'bg-rose-50 border-rose-300 text-rose-950 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{q.label}</span>
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border ${
                    isChecked ? 'bg-rose-600 border-rose-600 text-white' : 'border-slate-300 bg-white'
                  }`}
                >
                  {isChecked && <CheckCircle2 className="w-4 h-4" />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleTriageSubmit}
            className="py-2.5 px-6 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-lg text-xs shadow-sm transition-colors"
          >
            Calculate Triage Acuity Score
          </button>

          {triageAcuityResult && (
            <div className="p-3 bg-rose-100 border border-rose-300 rounded-lg text-rose-950 text-xs font-bold">
              {triageAcuityResult}
            </div>
          )}
        </div>
      </div>

      {/* Hotline Call Dialog Simulation */}
      {isCallingHotline && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-6 text-center text-white shadow-2xl space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-600/30 border border-rose-500 text-rose-400 flex items-center justify-center mx-auto animate-pulse">
              <PhoneCall className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-bold">Connecting to Emergency Trauma Dispatch</h3>
              <p className="text-slate-400 text-xs font-mono mt-1">+91 112 / +91 108 (National Priority)</p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Stay calm. A registered emergency trauma nurse is on the line. State your location and primary injury.
            </p>

            <button
              onClick={() => setIsCallingHotline(false)}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg transition-colors"
            >
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
