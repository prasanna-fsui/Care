import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  AlertCircle, 
  Pill, 
  Building2, 
  CheckCircle2, 
  Printer, 
  HeartHandshake, 
  Bell
} from 'lucide-react';
import { DischargeSummaryRecord } from '../types/medical';

interface DischargeSummariesProps {
  summaries: DischargeSummaryRecord[];
}

export const DischargeSummaries: React.FC<DischargeSummariesProps> = ({
  summaries
}) => {
  const [selectedSummaryId, setSelectedSummaryId] = useState<string>(summaries[0]?.id || '');
  const [calendarSyncSuccess, setCalendarSyncSuccess] = useState(false);

  const selectedSummary = summaries.find((s) => s.id === selectedSummaryId) || summaries[0];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadSummary = () => {
    const textData = `
================================================================================
ST. JUDE HOSPITAL & CLINICAL HEALTHCARE NETWORK
INPATIENT CLINICAL DISCHARGE SUMMARY RECORD
================================================================================
DISCHARGE ID: ${selectedSummary.dischargeId}
PATIENT MRN: ${selectedSummary.patientMrn}
PATIENT NAME: ${selectedSummary.patientName}
ADMISSION DATE: ${selectedSummary.admissionDate}
DISCHARGE DATE: ${selectedSummary.dischargeDate}
LENGTH OF STAY: ${selectedSummary.lengthOfStayDays} Days
DEPARTMENT: ${selectedSummary.department}
ATTENDING CONSULTANT: ${selectedSummary.admittingConsultant}
--------------------------------------------------------------------------------
1. PRIMARY DISCHARGE DIAGNOSIS:
${selectedSummary.dischargeDiagnoses.primary}

SECONDARY CO-MORBIDITIES:
${selectedSummary.dischargeDiagnoses.secondary.map((s, i) => `· ${s}`).join('\n')}

2. SURGICAL / INTERVENTIONAL PROCEDURES:
${selectedSummary.surgicalProcedures.map((p, i) => `· ${p.name} (${p.date}) by ${p.surgeon} ${p.implantsUsed ? `[Implant: ${p.implantsUsed}]` : ''}`).join('\n')}

3. SUMMARY OF HOSPITAL COURSE:
${selectedSummary.hospitalCourse}

4. DISCHARGE VITALS:
BP: ${selectedSummary.dischargeVitals.bp} | Pulse: ${selectedSummary.dischargeVitals.pulse} | SpO2: ${selectedSummary.dischargeVitals.spO2} | Temp: ${selectedSummary.dischargeVitals.temperature} | Glucose: ${selectedSummary.dischargeVitals.randomSugar}

5. DISCHARGE MEDICATION REGIMEN:
${selectedSummary.dischargeMedications.map((m, i) => `${i + 1}. ${m.drug} (${m.dosage}) - ${m.frequency} [Timing: ${m.timing}] - ${m.foodRelation} for ${m.durationDays} days`).join('\n')}

6. POST-DISCHARGE RECOVERY INSTRUCTIONS:
${selectedSummary.postDischargeInstructions.map((inst, i) => `· ${inst}`).join('\n')}

7. CRITICAL WARNING SIGNS (RETURN TO ER IMMEDIATELY):
${selectedSummary.warningSignsSeekImmediateCare.map((w, i) => `! ${w}`).join('\n')}

8. SCHEDULED OUTPATIENT FOLLOW-UP:
Date & Time: ${selectedSummary.followUpSchedule.date}
Consulting Doctor: ${selectedSummary.followUpSchedule.doctor}
Clinic: ${selectedSummary.followUpSchedule.department}
Pre-visit Tests: ${selectedSummary.followUpSchedule.testsToCompleteBefore.join(', ')}
================================================================================
Digitally Approved by ${selectedSummary.admittingConsultant}
    `;

    const blob = new Blob([textData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Discharge-Summary-${selectedSummary.dischargeId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSyncFollowUpToCalendar = () => {
    setCalendarSyncSuccess(true);
    setTimeout(() => setCalendarSyncSuccess(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-teal-700 text-xs font-bold uppercase tracking-wider mb-1">
            Inpatient Medical Records & Post-Operative Continuity
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Hospital Discharge Summaries
          </h1>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            Official hospital stay discharge records, surgical notes, post-operative wound care protocols, daily medication schedules, and outpatient follow-up calendars.
          </p>
        </div>
      </div>

      {calendarSyncSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Follow-up appointment synced with calendar and reminders enabled.</span>
          </div>
        </div>
      )}

      {/* Main Split Layout: Left Record Selector + Right Detailed Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Summary Records List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Inpatient Admissions ({summaries.length})
          </h2>

          <div className="space-y-2">
            {summaries.map((sum) => {
              const isSelected = sum.id === selectedSummary.id;
              return (
                <button
                  key={sum.id}
                  onClick={() => setSelectedSummaryId(sum.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-teal-50/60 border-teal-600 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded">
                      {sum.dischargeId}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {sum.lengthOfStayDays}d stay
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mt-2 line-clamp-1">
                    {sum.surgicalProcedures[0]?.name || sum.department}
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5">{sum.department}</p>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Discharged: {sum.dischargeDate}</span>
                    <span className="font-semibold text-teal-700">View Summary</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: In-Depth Discharge Document (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          {/* Document Header with Hospital Crest & Actions */}
          <div className="p-6 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  St. Jude Hospital & Clinical Network
                </span>
                <span className="text-slate-300">·</span>
                <span className="font-mono text-xs text-slate-500">{selectedSummary.patientMrn}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                Discharge Summary: {selectedSummary.dischargeId}
              </h2>
              <p className="text-slate-500 text-xs">
                Admitted: <strong>{selectedSummary.admissionDate}</strong> · Discharged: <strong>{selectedSummary.dischargeDate}</strong> ({selectedSummary.lengthOfStayDays} Days Stay)
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrint}
                className="p-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                title="Print Hospital Document"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                onClick={handleDownloadSummary}
                className="flex items-center gap-1.5 px-3 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Record</span>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6 text-xs leading-relaxed text-slate-700">
            {/* Primary & Secondary Diagnoses */}
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-teal-800">
                1. Discharge Diagnoses
              </h3>
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <p>
                  <strong className="text-slate-900">Primary Diagnosis: </strong>
                  <span className="font-semibold text-slate-800">{selectedSummary.dischargeDiagnoses.primary}</span>
                </p>
                <div>
                  <strong className="text-slate-900">Co-Existing Conditions: </strong>
                  <ul className="list-disc list-inside text-slate-600 mt-1 space-y-0.5">
                    {selectedSummary.dischargeDiagnoses.secondary.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Surgical Procedures Undertaken */}
            {selectedSummary.surgicalProcedures.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-teal-800">
                  2. Surgical & Interventional Procedures
                </h3>
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                  {selectedSummary.surgicalProcedures.map((proc, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{proc.name}</span>
                        <span className="font-mono text-slate-500">{proc.date}</span>
                      </div>
                      <p className="text-slate-600">Operating Surgeon: <strong>{proc.surgeon}</strong></p>
                      {proc.implantsUsed && (
                        <p className="text-teal-900 bg-teal-50 p-1.5 rounded border border-teal-200 font-mono text-[11px]">
                          Device Implant: {proc.implantsUsed}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Summary of Hospital Course */}
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-teal-800">
                3. Clinical Hospital Course
              </h3>
              <p className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 leading-relaxed">
                {selectedSummary.hospitalCourse}
              </p>
            </div>

            {/* Discharge Hemodynamic Vitals */}
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-teal-800">
                4. Hemodynamic Discharge Status
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase">Blood Pressure</span>
                  <p className="font-mono font-bold text-slate-900 text-xs mt-0.5">{selectedSummary.dischargeVitals.bp}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase">Pulse</span>
                  <p className="font-mono font-bold text-slate-900 text-xs mt-0.5">{selectedSummary.dischargeVitals.pulse}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase">SpO2 Oxygen</span>
                  <p className="font-mono font-bold text-emerald-700 text-xs mt-0.5">{selectedSummary.dischargeVitals.spO2}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase">Temperature</span>
                  <p className="font-mono font-bold text-slate-900 text-xs mt-0.5">{selectedSummary.dischargeVitals.temperature}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase">Blood Glucose</span>
                  <p className="font-mono font-bold text-slate-900 text-xs mt-0.5">{selectedSummary.dischargeVitals.randomSugar}</p>
                </div>
              </div>
            </div>

            {/* Discharge Medication Regimen Schedule */}
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-teal-800 flex items-center gap-1.5">
                <Pill className="w-4 h-4 text-teal-700" />
                <span>5. Discharge Medication Schedule</span>
              </h3>

              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Medication & Strength</th>
                      <th className="py-2.5 px-3">Frequency</th>
                      <th className="py-2.5 px-3">Daily Timing</th>
                      <th className="py-2.5 px-3">Food Intake</th>
                      <th className="py-2.5 px-3">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedSummary.dischargeMedications.map((med, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-semibold text-slate-900">
                          {med.drug} <span className="font-mono text-slate-500 font-normal">({med.dosage})</span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-700">{med.frequency}</td>
                        <td className="py-2.5 px-3 font-medium text-teal-800">{med.timing}</td>
                        <td className="py-2.5 px-3 text-slate-600">{med.foodRelation}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-800">{med.durationDays} Days</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Post-Discharge Care & Red Flag Signs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Instructions */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-teal-700" />
                  <span>Post-Discharge Rehabilitation Rules</span>
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px]">
                  {selectedSummary.postDischargeInstructions.map((inst, idx) => (
                    <li key={idx}>{inst}</li>
                  ))}
                </ul>
              </div>

              {/* Warning Signs */}
              <div className="p-4 bg-rose-50 rounded-lg border border-rose-200 space-y-2">
                <h4 className="font-bold text-rose-900 text-xs flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Emergency Signs (Return to ER Immediately)</span>
                </h4>
                <ul className="list-disc list-inside space-y-1 text-rose-800 text-[11px]">
                  {selectedSummary.warningSignsSeekImmediateCare.map((warn, idx) => (
                    <li key={idx}>{warn}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Scheduled Follow-Up Appointment */}
            <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-teal-900 font-bold text-xs uppercase tracking-wider">
                  <Calendar className="w-4 h-4 text-teal-700" />
                  <span>Scheduled Outpatient Follow-up</span>
                </div>
                <p className="text-slate-800 text-xs font-semibold">
                  {selectedSummary.followUpSchedule.date} with {selectedSummary.followUpSchedule.doctor}
                </p>
                <p className="text-slate-500 text-[11px]">{selectedSummary.followUpSchedule.department}</p>
                <p className="text-slate-600 text-[11px]">
                  Required pre-tests: <strong className="text-slate-800">{selectedSummary.followUpSchedule.testsToCompleteBefore.join(', ')}</strong>
                </p>
              </div>

              <button
                onClick={handleSyncFollowUpToCalendar}
                className="flex items-center gap-1.5 px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Sync to Calendar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
