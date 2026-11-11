import React, { useState } from 'react';
import { 
  User, 
  Activity, 
  AlertTriangle, 
  ShieldCheck, 
  Plus, 
  Calendar, 
  Heart, 
  TrendingUp, 
  X, 
  Check, 
  FileText
} from 'lucide-react';
import { PatientProfile, VitalRecord, ClinicalEncounter } from '../types/medical';

interface PatientCaseHistoryProps {
  profiles: PatientProfile[];
  activeProfileId: string;
  onSelectProfile: (id: string) => void;
  onAddVitalRecord: (patientId: string, vital: VitalRecord) => void;
  onAddEncounter: (patientId: string, encounter: ClinicalEncounter) => void;
}

export const PatientCaseHistory: React.FC<PatientCaseHistoryProps> = ({
  profiles,
  activeProfileId,
  onSelectProfile,
  onAddVitalRecord,
  onAddEncounter
}) => {
  const currentProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];

  const [selectedVitalMetric, setSelectedVitalMetric] = useState<'bp' | 'sugar' | 'pulse' | 'spO2'>('bp');
  const [isLogVitalOpen, setIsLogVitalOpen] = useState(false);
  const [isAddEncounterOpen, setIsAddEncounterOpen] = useState(false);

  // New Vital Form State
  const [newSystolic, setNewSystolic] = useState('124');
  const [newDiastolic, setNewDiastolic] = useState('82');
  const [newPulse, setNewPulse] = useState('74');
  const [newSugar, setNewSugar] = useState('106');
  const [newSpO2, setNewSpO2] = useState('99');
  const [newTemp, setNewTemp] = useState('98.4');
  const [vitalNotes, setVitalNotes] = useState('');

  // New Encounter Form State
  const [encounterDoc, setEncounterDoc] = useState('');
  const [encounterSpec, setEncounterSpec] = useState('Cardiology');
  const [encounterFacility, setEncounterFacility] = useState('Metro Health Center');
  const [encounterComplaint, setEncounterComplaint] = useState('');
  const [encounterDiagnosis, setEncounterDiagnosis] = useState('');
  const [encounterTreatment, setEncounterTreatment] = useState('');
  const [encounterPrescriptions, setEncounterPrescriptions] = useState('');

  const handleSaveVital = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: VitalRecord = {
      id: `vit-${Date.now()}`,
      date: 'Today, Nov 11',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      systolicBp: Number(newSystolic) || 120,
      diastolicBp: Number(newDiastolic) || 80,
      heartRate: Number(newPulse) || 72,
      bloodSugar: Number(newSugar) || 100,
      spO2: Number(newSpO2) || 98,
      temperature: Number(newTemp) || 98.6,
      notes: vitalNotes || 'Self-logged reading'
    };

    onAddVitalRecord(currentProfile.id, newRecord);
    setIsLogVitalOpen(false);
    setVitalNotes('');
  };

  const handleSaveEncounter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!encounterDoc.trim() || !encounterDiagnosis.trim()) return;

    const newEnc: ClinicalEncounter = {
      id: `enc-${Date.now()}`,
      date: 'Nov 11, 2026',
      doctorName: encounterDoc.trim(),
      specialty: encounterSpec,
      facility: encounterFacility,
      chiefComplaint: encounterComplaint || 'Consultation follow-up',
      clinicalDiagnosis: encounterDiagnosis,
      treatmentPlan: encounterTreatment || 'Follow prescribed regimen',
      prescriptions: encounterPrescriptions.split(',').map((p) => p.trim()).filter(Boolean)
    };

    onAddEncounter(currentProfile.id, newEnc);
    setIsAddEncounterOpen(false);
    setEncounterDoc('');
    setEncounterDiagnosis('');
    setEncounterComplaint('');
    setEncounterTreatment('');
    setEncounterPrescriptions('');
  };

  // Metric trend calculation for visual SVG chart
  const vitals = [...currentProfile.vitalsHistory].reverse();
  const maxPoints = vitals.length;

  return (
    <div className="space-y-8">
      {/* Patient Profile Header Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-teal-700 text-white font-extrabold flex items-center justify-center text-xl shrink-0 shadow-sm">
              {currentProfile.fullName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900">{currentProfile.fullName}</h1>
                <span className="text-xs bg-teal-100 text-teal-800 font-semibold px-2.5 py-0.5 rounded">
                  {currentProfile.relationship}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-600">
                <span>{currentProfile.age} Years</span>
                <span className="text-slate-300">·</span>
                <span>{currentProfile.gender}</span>
                <span className="text-slate-300">·</span>
                <span>Blood: <strong className="text-slate-900 font-mono">{currentProfile.bloodGroup}</strong></span>
                <span className="text-slate-300">·</span>
                <span>Weight: <strong className="text-slate-900 font-mono">{currentProfile.weightKg} kg</strong></span>
                <span className="text-slate-300">·</span>
                <span>Height: <strong className="text-slate-900 font-mono">{currentProfile.heightCm} cm</strong></span>
              </div>
            </div>
          </div>

          {/* Family Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Switch Profile:</span>
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
              {profiles.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onSelectProfile(p.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    p.id === currentProfile.id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {p.fullName} ({p.relationship})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chronic Conditions & Allergies Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Chronic Conditions */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-teal-700" />
              <span>Active Chronic Medical Conditions</span>
            </h3>
            <span className="text-xs font-mono text-slate-500">{currentProfile.chronicConditions.length} Recorded</span>
          </div>

          <ul className="space-y-2 text-xs">
            {currentProfile.chronicConditions.map((cond, idx) => (
              <li key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between">
                <span className="font-semibold text-slate-800">{cond}</span>
                <span className="text-[11px] text-teal-700 font-medium">Under Medical Protocol</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Drug & Clinical Allergies */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-rose-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Drug & Environmental Allergies</span>
            </h3>
            <span className="text-xs font-mono text-rose-600 font-bold">{currentProfile.allergies.length} Flagged</span>
          </div>

          <ul className="space-y-2 text-xs">
            {currentProfile.allergies.map((all, idx) => (
              <li key={idx} className="p-2.5 bg-rose-50/70 rounded-lg border border-rose-200 flex items-start justify-between">
                <div>
                  <span className="font-bold text-rose-950">{all.allergen}</span>
                  <p className="text-[11px] text-rose-800 mt-0.5">Reaction: {all.reaction}</p>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-200 text-rose-900">
                  {all.severity}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interactive Longitudinal Vitals Tracker with SVG Graph */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-700" />
              <span>Longitudinal Vitals Tracker & Trends</span>
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">
              Multi-week monitoring of hemodynamic & metabolic indicators
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Metric Selector Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
              <button
                onClick={() => setSelectedVitalMetric('bp')}
                className={`px-3 py-1.5 font-semibold rounded-md transition-colors ${
                  selectedVitalMetric === 'bp' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                Blood Pressure
              </button>
              <button
                onClick={() => setSelectedVitalMetric('sugar')}
                className={`px-3 py-1.5 font-semibold rounded-md transition-colors ${
                  selectedVitalMetric === 'sugar' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                Blood Glucose
              </button>
              <button
                onClick={() => setSelectedVitalMetric('pulse')}
                className={`px-3 py-1.5 font-semibold rounded-md transition-colors ${
                  selectedVitalMetric === 'pulse' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                Heart Rate
              </button>
              <button
                onClick={() => setSelectedVitalMetric('spO2')}
                className={`px-3 py-1.5 font-semibold rounded-md transition-colors ${
                  selectedVitalMetric === 'spO2' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                SpO2 %
              </button>
            </div>

            <button
              onClick={() => setIsLogVitalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Reading</span>
            </button>
          </div>
        </div>

        {/* Metric Chart Visualization */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="h-56 w-full flex items-end justify-between gap-4 pt-6 pb-2 px-2">
            {vitals.map((v, i) => {
              let val = v.systolicBp;
              let label = `${v.systolicBp}/${v.diastolicBp}`;
              let heightPct = ((val - 90) / (160 - 90)) * 100;

              if (selectedVitalMetric === 'sugar') {
                val = v.bloodSugar;
                label = `${v.bloodSugar} mg/dL`;
                heightPct = ((val - 60) / (180 - 60)) * 100;
              } else if (selectedVitalMetric === 'pulse') {
                val = v.heartRate;
                label = `${v.heartRate} bpm`;
                heightPct = ((val - 50) / (120 - 50)) * 100;
              } else if (selectedVitalMetric === 'spO2') {
                val = v.spO2;
                label = `${v.spO2}%`;
                heightPct = ((val - 90) / (100 - 90)) * 100;
              }

              heightPct = Math.min(100, Math.max(15, heightPct));

              return (
                <div key={v.id} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono font-bold text-slate-700 bg-white border border-slate-200 px-1.5 py-0.5 rounded mb-1 shadow-xs whitespace-nowrap">
                    {label}
                  </div>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full max-w-[40px] bg-teal-600 rounded-t-md hover:bg-teal-700 transition-all flex items-end justify-center pb-1"
                  >
                    <span className="text-[9px] font-mono text-teal-100 group-hover:hidden">
                      {val}
                    </span>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-500 font-mono text-center truncate w-full">
                    {v.date.replace(', 2026', '')}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600">
            <span>
              Target Zone:{' '}
              <strong className="text-slate-900 font-mono">
                {selectedVitalMetric === 'bp' && '< 130 / 80 mmHg'}
                {selectedVitalMetric === 'sugar' && '70 – 100 mg/dL (Fasting)'}
                {selectedVitalMetric === 'pulse' && '60 – 85 bpm'}
                {selectedVitalMetric === 'spO2' && '95% – 100%'}
              </strong>
            </span>
            <span className="text-slate-400">Total Entries: {vitals.length}</span>
          </div>
        </div>

        {/* Detailed Vitals Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Date & Time</th>
                <th className="py-2.5 px-4">Blood Pressure</th>
                <th className="py-2.5 px-4">Pulse Rate</th>
                <th className="py-2.5 px-4">Blood Glucose</th>
                <th className="py-2.5 px-4">SpO2</th>
                <th className="py-2.5 px-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentProfile.vitalsHistory.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-4 font-mono text-slate-700">{rec.date} · {rec.time}</td>
                  <td className="py-2.5 px-4 font-mono font-semibold text-slate-900">
                    {rec.systolicBp}/{rec.diastolicBp} mmHg
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-800">{rec.heartRate} bpm</td>
                  <td className="py-2.5 px-4 font-mono text-slate-800">{rec.bloodSugar} mg/dL</td>
                  <td className="py-2.5 px-4 font-mono text-emerald-700 font-semibold">{rec.spO2}%</td>
                  <td className="py-2.5 px-4 text-slate-500">{rec.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clinical Encounter History Timeline */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-700" />
              <span>Past Clinical Consultations & Encounters</span>
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">Chronological outpatient and specialist visit records</p>
          </div>
          <button
            onClick={() => setIsAddEncounterOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Encounter</span>
          </button>
        </div>

        <div className="space-y-4">
          {currentProfile.encounters.map((enc) => (
            <div key={enc.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-200/60">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{enc.doctorName}</span>
                  <span className="text-teal-700 text-xs font-medium">({enc.specialty})</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-500 text-xs">{enc.facility}</span>
                </div>
                <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {enc.date}
                </span>
              </div>

              <div className="text-xs space-y-1.5">
                <p>
                  <strong className="text-slate-700">Chief Complaint: </strong>
                  <span className="text-slate-600">{enc.chiefComplaint}</span>
                </p>
                <p>
                  <strong className="text-slate-700">Clinical Diagnosis: </strong>
                  <span className="font-semibold text-slate-900">{enc.clinicalDiagnosis}</span>
                </p>
                <p>
                  <strong className="text-slate-700">Treatment Plan: </strong>
                  <span className="text-slate-600">{enc.treatmentPlan}</span>
                </p>

                {enc.prescriptions.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-200/50 flex flex-wrap gap-1.5 items-center">
                    <span className="text-[11px] font-semibold text-slate-500">Prescriptions:</span>
                    {enc.prescriptions.map((rx, idx) => (
                      <span key={idx} className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[11px] font-mono text-slate-800">
                        {rx}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Immunization Registry */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-700" />
          <span>Vaccination & Immunization Registry</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {currentProfile.immunizations.map((imm, idx) => (
            <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start justify-between">
              <div>
                <p className="font-bold text-slate-900">{imm.vaccine}</p>
                <p className="text-slate-500 text-[11px] mt-0.5">{imm.provider}</p>
              </div>
              <span className="font-mono text-slate-600 text-[11px] bg-white px-2 py-0.5 rounded border border-slate-200">
                {imm.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Log Vital Modal */}
      {isLogVitalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 text-slate-900 shadow-2xl relative">
            <button
              onClick={() => setIsLogVitalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-900 mb-4">Log New Vitals Measurement</h3>

            <form onSubmit={handleSaveVital} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Systolic BP (mmHg)</label>
                  <input
                    type="number"
                    value={newSystolic}
                    onChange={(e) => setNewSystolic(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Diastolic BP (mmHg)</label>
                  <input
                    type="number"
                    value={newDiastolic}
                    onChange={(e) => setNewDiastolic(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Heart Rate (bpm)</label>
                  <input
                    type="number"
                    value={newPulse}
                    onChange={(e) => setNewPulse(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Blood Sugar (mg/dL)</label>
                  <input
                    type="number"
                    value={newSugar}
                    onChange={(e) => setNewSugar(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">SpO2 Oxygen (%)</label>
                  <input
                    type="number"
                    value={newSpO2}
                    onChange={(e) => setNewSpO2(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Temperature (°F)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newTemp}
                    onChange={(e) => setNewTemp(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">Activity Notes / Context</label>
                <input
                  type="text"
                  placeholder="e.g. Fasting morning, post-run, after medication"
                  value={vitalNotes}
                  onChange={(e) => setVitalNotes(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 mt-2 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Vital Record</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Encounter Modal */}
      {isAddEncounterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 text-slate-900 shadow-2xl relative">
            <button
              onClick={() => setIsAddEncounterOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-900 mb-4">Record Clinical Encounter</h3>

            <form onSubmit={handleSaveEncounter} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Consulting Physician</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Rajesh Narang"
                    value={encounterDoc}
                    onChange={(e) => setEncounterDoc(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Specialty</label>
                  <input
                    type="text"
                    placeholder="e.g. Neurology"
                    value={encounterSpec}
                    onChange={(e) => setEncounterSpec(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">Facility / Hospital</label>
                <input
                  type="text"
                  placeholder="e.g. Metropolitan Medical Center"
                  value={encounterFacility}
                  onChange={(e) => setEncounterFacility(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">Chief Complaint</label>
                <input
                  type="text"
                  placeholder="Primary issue reported"
                  value={encounterComplaint}
                  onChange={(e) => setEncounterComplaint(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">Clinical Diagnosis</label>
                <input
                  type="text"
                  placeholder="Confirmed diagnosis"
                  value={encounterDiagnosis}
                  onChange={(e) => setEncounterDiagnosis(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">Treatment Plan</label>
                <textarea
                  rows={2}
                  placeholder="Physician advice & follow-up instructions"
                  value={encounterTreatment}
                  onChange={(e) => setEncounterTreatment(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">Prescriptions (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Metformin 500mg, Lisinopril 10mg"
                  value={encounterPrescriptions}
                  onChange={(e) => setEncounterPrescriptions(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 mt-2 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg transition-colors"
              >
                Save Clinical Encounter
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
