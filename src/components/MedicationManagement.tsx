import React, { useState } from 'react';
import { 
  Pill, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Calendar, 
  TrendingUp, 
  AlertCircle, 
  ShoppingCart, 
  RotateCcw, 
  X, 
  Check, 
  ShieldCheck, 
  Bell,
  Trash2
} from 'lucide-react';
import { PrescribedMedication, DoseLogEntry, AdherenceSummary } from '../types/medical';

interface MedicationManagementProps {
  medications: PrescribedMedication[];
  doseLogs: DoseLogEntry[];
  adherence: AdherenceSummary;
  onMarkDose: (logId: string, status: 'taken' | 'skipped' | 'pending', skipReason?: string) => void;
  onAddMedication: (med: PrescribedMedication) => void;
  onDeleteMedication: (id: string) => void;
  onOrderPharmacyRefill: (medName: string) => void;
  patientName: string;
}

export const MedicationManagement: React.FC<MedicationManagementProps> = ({
  medications,
  doseLogs,
  adherence,
  onMarkDose,
  onAddMedication,
  onDeleteMedication,
  onOrderPharmacyRefill,
  patientName
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSlotFilter, setSelectedSlotFilter] = useState<'All' | 'Morning' | 'Afternoon' | 'Evening' | 'Bedtime'>('All');
  
  // Add Medication Form State
  const [drugName, setDrugName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [dosage, setDosage] = useState('');
  const [formType, setFormType] = useState<'Tablet' | 'Capsule' | 'Inhaler' | 'Syrup' | 'Injection' | 'Drops'>('Tablet');
  const [purpose, setPurpose] = useState('');
  const [prescribingDoctor, setPrescribingDoctor] = useState('Dr. Lakshmi Sundaram');
  const [timingSlots, setTimingSlots] = useState<('Morning' | 'Afternoon' | 'Evening' | 'Bedtime')[]>(['Morning']);
  const [reminderTime, setReminderTime] = useState('08:00 AM');
  const [foodRelation, setFoodRelation] = useState<'Before Food' | 'After Food' | 'With Food' | 'Empty Stomach'>('After Food');
  const [totalPills, setTotalPills] = useState<number>(30);
  const [durationDays, setDurationDays] = useState<number>(30);

  const toggleSlot = (slot: 'Morning' | 'Afternoon' | 'Evening' | 'Bedtime') => {
    setTimingSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const handleSaveMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!drugName.trim()) return;

    const newMed: PrescribedMedication = {
      id: `med-${Date.now()}`,
      drugName: drugName.trim(),
      brandName: brandName.trim() || undefined,
      dosage: dosage.trim() || 'Standard Dose',
      form: formType,
      purpose: purpose.trim() || 'Prescribed therapy',
      prescribedBy: prescribingDoctor.trim(),
      timingSlots: timingSlots.length > 0 ? timingSlots : ['Morning'],
      reminderTimes: [reminderTime],
      foodRelation,
      startDate: 'Nov 11, 2026',
      durationDays: Number(durationDays) || 30,
      totalPills: Number(totalPills) || 30,
      remainingPills: Number(totalPills) || 30,
      refillThreshold: 7,
      active: true
    };

    onAddMedication(newMed);
    setIsAddModalOpen(false);

    // Reset fields
    setDrugName('');
    setBrandName('');
    setDosage('');
    setPurpose('');
  };

  const filteredDoseLogs = doseLogs.filter(
    (log) => selectedSlotFilter === 'All' || log.slot === selectedSlotFilter
  );

  const lowStockMeds = medications.filter(
    (m) => m.remainingPills <= m.refillThreshold
  );

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-teal-700 text-xs font-bold uppercase tracking-wider mb-1">
              Active Prescription Tracking & Dose Compliance
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Medication Management & Adherence Tracker
            </h1>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              Track prescribed dosage regimens, set custom alarm times, log taken doses with a single tap, and monitor your clinical adherence score to safeguard cardiovascular and metabolic outcomes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Prescribed Medication</span>
            </button>
          </div>
        </div>
      </div>

      {/* Adherence Score & Streak Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Adherence Percentage */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Overall Adherence</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {adherence.overallPercentage}%
            </span>
            <span className="text-xs font-semibold text-emerald-700">Optimal (Target &gt; 85%)</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {adherence.dosesTakenThisWeek} of {adherence.dosesScheduledThisWeek} doses completed this week
          </p>
        </div>

        {/* Adherence Streak */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Current Adherence Streak</span>
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {adherence.currentStreakDays} Days
            </span>
            <span className="text-xs text-teal-700 font-semibold">Continuous</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Zero missed cardiovascular doses for 14 days
          </p>
        </div>

        {/* Active Medications Count */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Active Prescriptions</span>
            <Pill className="w-4 h-4 text-teal-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {medications.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">Daily Regimens</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Coordinated with EHR clinical history
          </p>
        </div>

        {/* Refill Alerts */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Refill Alerts</span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-600 font-mono">
              {lowStockMeds.length}
            </span>
            <span className="text-xs text-amber-700 font-semibold">Under 10 Days Left</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {lowStockMeds.length > 0 ? '1-click pharmacy refill available' : 'Sufficient stock for all meds'}
          </p>
        </div>
      </div>

      {/* Low Stock Refill Prompt Strip (if any) */}
      {lowStockMeds.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <p className="font-bold text-amber-950">
                Prescription Refill Reminder: {lowStockMeds.map((m) => m.drugName).join(', ')}
              </p>
              <p className="text-amber-800 text-[11px] mt-0.5">
                Remaining supply is below safety threshold. Order before your daily regimen is interrupted.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOrderPharmacyRefill(lowStockMeds[0].drugName)}
            className="flex items-center justify-center gap-1.5 py-2 px-4 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg transition-colors shrink-0"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Refill via Online Pharmacy</span>
          </button>
        </div>
      )}

      {/* Visual 7-Day Adherence Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              7-Day Adherence History & Daily Dosing Compliance
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">
              Verified clinical log for {patientName} (48M)
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
            Weekly Score: {adherence.overallPercentage}%
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 pt-2">
          {adherence.last7DaysLogs.map((day, idx) => (
            <div key={idx} className="flex flex-col items-center p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-mono font-semibold text-slate-600 mb-2">{day.date}</span>
              <div className="w-full bg-slate-200 rounded-full h-24 relative overflow-hidden flex items-end">
                <div
                  style={{ height: `${day.percentage}%` }}
                  className={`w-full rounded-b-full transition-all ${
                    day.percentage === 100
                      ? 'bg-teal-600'
                      : day.percentage >= 75
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                />
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-900 mt-2">
                {day.takenCount}/{day.totalCount}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">{day.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Dose Log & Interactive Actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Today's Scheduled Medication Checklist
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">
              Tap "Mark Taken" when you swallow your dose with water or food
            </p>
          </div>

          {/* Slot filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {(['All', 'Morning', 'Afternoon', 'Evening', 'Bedtime'] as const).map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlotFilter(slot)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedSlotFilter === slot
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Dose checklist */}
        <div className="space-y-3">
          {filteredDoseLogs.map((log) => {
            const isTaken = log.status === 'taken';
            const isSkipped = log.status === 'skipped';

            return (
              <div
                key={log.id}
                className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isTaken
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : isSkipped
                    ? 'bg-slate-100 border-slate-300 opacity-75'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isTaken
                        ? 'bg-emerald-600 text-white'
                        : isSkipped
                        ? 'bg-slate-400 text-white'
                        : 'bg-teal-100 text-teal-800'
                    }`}
                  >
                    <Pill className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm">{log.drugName}</h3>
                      <span className="text-slate-400 text-xs font-mono">({log.dosage})</span>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        {log.slot}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Scheduled: <strong className="font-mono text-slate-700">{log.scheduledTime}</strong></span>
                      {log.takenAt && (
                        <>
                          <span>·</span>
                          <span className="text-emerald-700 font-semibold font-mono">Taken at {log.takenAt}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isTaken ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Completed
                      </span>
                      <button
                        onClick={() => onMarkDose(log.id, 'pending')}
                        className="p-1.5 text-slate-400 hover:text-slate-600 rounded"
                        title="Reset to Pending"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : isSkipped ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <XCircle className="w-4 h-4" />
                        Skipped
                      </span>
                      <button
                        onClick={() => onMarkDose(log.id, 'pending')}
                        className="p-1.5 text-slate-400 hover:text-slate-600 rounded"
                        title="Reset to Pending"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => onMarkDose(log.id, 'taken')}
                        className="flex items-center gap-1.5 py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark Taken</span>
                      </button>
                      <button
                        onClick={() => onMarkDose(log.id, 'skipped', 'Patient Fasting')}
                        className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-medium transition-colors"
                      >
                        Skip
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prescribed Medications Catalog Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">
            Active Prescribed Medications Catalog ({medications.length})
          </h2>
          <span className="text-xs text-slate-500">Continuous Doctor Supervised</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Medication</th>
                <th className="py-2.5 px-3">Dosage & Form</th>
                <th className="py-2.5 px-3">Daily Timing</th>
                <th className="py-2.5 px-3">Food Intake</th>
                <th className="py-2.5 px-3">Prescribing Physician</th>
                <th className="py-2.5 px-3">Pills Remaining</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {medications.map((med) => {
                const isLow = med.remainingPills <= med.refillThreshold;
                return (
                  <tr key={med.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3">
                      <p className="font-bold text-slate-900">{med.drugName}</p>
                      {med.brandName && (
                        <p className="text-[11px] text-slate-400">{med.brandName}</p>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-mono text-slate-800">{med.dosage}</span>
                      <span className="text-[11px] text-slate-500 block">{med.form}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-teal-800 font-medium">{med.timingSlots.join(', ')}</span>
                      <span className="text-[11px] text-slate-400 block font-mono">{med.reminderTimes.join(', ')}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-600">{med.foodRelation}</td>
                    <td className="py-3 px-3 text-slate-700">{med.prescribedBy}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`font-mono font-bold ${
                          isLow ? 'text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200' : 'text-slate-800'
                        }`}
                      >
                        {med.remainingPills} / {med.totalPills}
                      </span>
                      {isLow && <span className="block text-[10px] text-amber-700 font-semibold mt-0.5">Low Stock</span>}
                    </td>
                    <td className="py-3 px-3 text-right space-x-2">
                      {isLow && (
                        <button
                          onClick={() => onOrderPharmacyRefill(med.drugName)}
                          className="px-2.5 py-1 bg-teal-700 hover:bg-teal-800 text-white rounded text-[11px] font-semibold transition-colors"
                        >
                          Refill
                        </button>
                      )}
                      <button
                        onClick={() => onDeleteMedication(med.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Delete Medication"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Medication Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 text-slate-900 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Pill className="w-5 h-5 text-teal-700" />
              <span>Input Prescribed Medication & Reminder</span>
            </h3>

            <form onSubmit={handleSaveMedication} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Medication Generic Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Atorvastatin, Metformin"
                    value={drugName}
                    onChange={(e) => setDrugName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Brand Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Lipitor, Glucophage"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Strength / Dosage</label>
                  <input
                    type="text"
                    placeholder="e.g. 20 mg, 500 mg"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Form</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  >
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Inhaler">Inhaler</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Injection">Injection</option>
                    <option value="Drops">Drops</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Timing Slots</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Morning', 'Afternoon', 'Evening', 'Bedtime'] as const).map((slot) => {
                    const isSelected = timingSlots.includes(slot);
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => toggleSlot(slot)}
                        className={`py-2 px-1 text-center rounded-lg border text-xs font-medium transition-colors ${
                          isSelected
                            ? 'bg-teal-700 text-white border-teal-700 font-semibold'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Reminder Alarm Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 08:00 AM"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Food Relationship</label>
                  <select
                    value={foodRelation}
                    onChange={(e) => setFoodRelation(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  >
                    <option value="After Food">After Food</option>
                    <option value="Before Food">Before Food</option>
                    <option value="With Food">With Food</option>
                    <option value="Empty Stomach">Empty Stomach</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Total Pills / Pack Size</label>
                  <input
                    type="number"
                    value={totalPills}
                    onChange={(e) => setTotalPills(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Prescribing Physician</label>
                  <input
                    type="text"
                    value={prescribingDoctor}
                    onChange={(e) => setPrescribingDoctor(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Clinical Indication / Purpose</label>
                <input
                  type="text"
                  placeholder="e.g. Blood pressure reduction, lipid control"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Medication & Set Reminders</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
