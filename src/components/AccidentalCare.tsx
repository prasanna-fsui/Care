import React, { useState } from 'react';
import { 
  AlertOctagon, 
  ShieldAlert, 
  Flame, 
  Bone, 
  Brain, 
  Bandage, 
  CheckCircle2, 
  Download, 
  CreditCard, 
  Building, 
  Check, 
  X,
  FileBadge
} from 'lucide-react';
import { CasualtyFastTrackToken } from '../types/medical';

interface AccidentalCareProps {
  activePatientName: string;
}

export const AccidentalCare: React.FC<AccidentalCareProps> = ({
  activePatientName
}) => {
  const [activeProtocolTab, setActiveProtocolTab] = useState<'bleeding' | 'burns' | 'fractures' | 'head_trauma'>('bleeding');
  
  // Fast-Track Casualty Pass state
  const [fastTrackToken, setFastTrackToken] = useState<CasualtyFastTrackToken | null>(null);
  const [injuryType, setInjuryType] = useState('Compound Fracture / Severe Laceration');
  const [isGeneratingPass, setIsGeneratingPass] = useState(false);

  // Cashless Pre-Auth State
  const [policyNumber, setPolicyNumber] = useState('MED-BCBS-890214-X');
  const [insurerName, setInsurerName] = useState('BlueCross Comprehensive Health');
  const [preAuthStatus, setPreAuthStatus] = useState<'idle' | 'submitting' | 'approved'>('idle');
  const [preAuthId, setPreAuthId] = useState<string | null>(null);

  const handleGenerateFastTrackPass = () => {
    setIsGeneratingPass(true);
    setTimeout(() => {
      const token: CasualtyFastTrackToken = {
        tokenNumber: `CASUALTY-${Date.now().toString().slice(-4)}`,
        patientName: activePatientName,
        age: 52,
        injuryCategory: injuryType,
        triagePriority: 'Orange - Emergent',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        erAssignedBay: 'Trauma Resuscitation Bay 03',
        attendingPhysician: 'Dr. Vikramaditya Rathore, MS, MCh (On-Duty Trauma Surgeon)'
      };
      setFastTrackToken(token);
      setIsGeneratingPass(false);
    }, 800);
  };

  const handlePreAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPreAuthStatus('submitting');
    setTimeout(() => {
      setPreAuthStatus('approved');
      setPreAuthId(`AUTH-TPA-${Date.now().toString().slice(-6)}`);
    }, 1200);
  };

  const handleDownloadPass = () => {
    if (!fastTrackToken) return;
    const passContent = `
CAREPULSE CASUALTY & ACCIDENTAL CARE NETWORK
PRIORITY EMERGENCY ADMISSION PASS
===========================================
PASS TOKEN: ${fastTrackToken.tokenNumber}
PATIENT: ${fastTrackToken.patientName} (Age: ${fastTrackToken.age})
INJURY CATEGORY: ${fastTrackToken.injuryCategory}
TRIAGE LEVEL: ${fastTrackToken.triagePriority}
TIMESTAMP: ${fastTrackToken.timestamp}
ASSIGNED ER BAY: ${fastTrackToken.erAssignedBay}
CHIEF TRAUMA SURGEON: ${fastTrackToken.attendingPhysician}
-------------------------------------------
INSTRUCTIONS FOR CASUALTY ENTRY:
1. Present this digital pass to the ER triage security desk.
2. Fast-track bypass enabled for immediate surgeon review.
3. Cashless insurance desk notified.
===========================================
    `;
    const blob = new Blob([passContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Casualty-Pass-${fastTrackToken.tokenNumber}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-rose-700 text-xs font-bold uppercase tracking-wider mb-1">
            Acute Trauma, Fractures & Casualty Protocols
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Accidental Care & Emergency Trauma Desk
          </h1>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            Immediate clinical guidance for accident scenes, first-responder injury stabilization, priority casualty ER token generation to bypass triage queues, and instant cashless insurance pre-authorization.
          </p>
        </div>
      </div>

      {/* 2 Key Action Columns: Priority Casualty Pass & Cashless Pre-Auth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fast-Track Casualty Pass Generator */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <FileBadge className="w-5 h-5 text-rose-600" />
              <h2 className="text-base font-bold text-slate-900">
                Priority Casualty Fast-Track ER Pass
              </h2>
            </div>
            <p className="text-slate-500 text-xs mt-2 leading-relaxed">
              En route to the hospital casualty unit? Generate a priority digital token to notify the on-duty trauma surgical team and reserve an acute resuscitation bay before your vehicle arrives.
            </p>

            <div className="mt-4 space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Accident / Trauma Category</label>
                <select
                  value={injuryType}
                  onChange={(e) => setInjuryType(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-rose-600"
                >
                  <option value="Compound Fracture / Severe Laceration">Compound Fracture / Severe Laceration</option>
                  <option value="Motor Vehicle Road Collision (RTA)">Motor Vehicle Road Collision (RTA)</option>
                  <option value="Fall from Height with Spine / Pelvic Injury">Fall from Height with Spine / Pelvic Injury</option>
                  <option value="Deep Burn / Chemical Inhalation">Deep Burn / Chemical Inhalation</option>
                  <option value="Head Impact with Loss of Consciousness">Head Impact with Loss of Consciousness</option>
                </select>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600">Patient: <strong>{activePatientName} (48M)</strong></span>
                <span className="text-rose-700 font-bold font-mono">Priority Bay Reserving</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            {!fastTrackToken ? (
              <button
                onClick={handleGenerateFastTrackPass}
                disabled={isGeneratingPass}
                className="w-full py-3 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <AlertOctagon className="w-4 h-4" />
                <span>{isGeneratingPass ? 'Broadcasting to Trauma Team...' : 'Generate Emergency Casualty Pass'}</span>
              </button>
            ) : (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-rose-200">
                  <span className="text-xs font-bold text-rose-900 font-mono">{fastTrackToken.tokenNumber}</span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-600 text-white">
                    {fastTrackToken.triagePriority}
                  </span>
                </div>
                <div className="text-xs space-y-1">
                  <p><strong className="text-slate-800">Assigned Bay: </strong><span className="font-semibold text-rose-900">{fastTrackToken.erAssignedBay}</span></p>
                  <p><strong className="text-slate-800">Attending Surgeon: </strong>{fastTrackToken.attendingPhysician}</p>
                  <p><strong className="text-slate-800">Generated: </strong>{fastTrackToken.timestamp}</p>
                </div>
                <button
                  onClick={handleDownloadPass}
                  className="w-full py-2 bg-rose-700 hover:bg-rose-800 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Digital ER Entry Pass</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Cashless Mediclaim & Emergency Pre-Authorization */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <CreditCard className="w-5 h-5 text-teal-700" />
              <h2 className="text-base font-bold text-slate-900">
                Cashless Mediclaim & TPA Pre-Authorization
              </h2>
            </div>
            <p className="text-slate-500 text-xs mt-2 leading-relaxed">
              Expedite hospital admission paperwork. Submit your health insurance policy number for instant digital pre-authorization approval with zero out-of-pocket delays.
            </p>

            <form onSubmit={handlePreAuthSubmit} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Health Insurance Company</label>
                <input
                  type="text"
                  value={insurerName}
                  onChange={(e) => setInsurerName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Policy / Member ID Number</label>
                <input
                  type="text"
                  value={policyNumber}
                  onChange={(e) => setPolicyNumber(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                  required
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600">Hospital Desk: <strong>St. Jude Central TPA</strong></span>
                <span className="text-emerald-700 font-semibold">Pre-Approval Tier 1</span>
              </div>

              <button
                type="submit"
                disabled={preAuthStatus === 'submitting'}
                className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <Building className="w-4 h-4" />
                <span>
                  {preAuthStatus === 'submitting'
                    ? 'Transmitting to Insurer TPA...'
                    : 'Submit Cashless Pre-Approval'}
                </span>
              </button>
            </form>
          </div>

          {preAuthStatus === 'approved' && preAuthId && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Cashless Pre-Authorization Approved!</span>
              </div>
              <p className="text-emerald-900">
                Pre-Auth Ref: <strong className="font-mono">{preAuthId}</strong>. Zero deposit required upon ER casualty arrival.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Acute Trauma Protocol Guides (First-Aid Stabilization) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>Acute Trauma First-Responder Protocols</span>
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">
              Evidence-based stabilization actions before ambulance arrival
            </p>
          </div>

          {/* Protocol Switcher Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'bleeding', label: 'Severe Bleeding', icon: Bandage },
              { id: 'burns', label: 'Burn Injuries', icon: Flame },
              { id: 'fractures', label: 'Fractures & Spine', icon: Bone },
              { id: 'head_trauma', label: 'Head & Concussion', icon: Brain }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveProtocolTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    activeProtocolTab === tab.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Severe Bleeding */}
        {activeProtocolTab === 'bleeding' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="font-mono text-xs font-bold text-rose-700">01. Direct Pressure</span>
              <p className="text-slate-700">
                Apply firm, continuous direct pressure over the bleeding site with sterile gauze, clean cloth, or palm. Do not remove soaked gauze; add more layers on top.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="font-mono text-xs font-bold text-rose-700">02. Tourniquet Placement</span>
              <p className="text-slate-700">
                For limb arterial spurting, apply a commercial tourniquet 2–3 inches above the wound (never over a joint). Tighten windlass until bleeding ceases and record time.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="font-mono text-xs font-bold text-rose-700">03. Shock Prevention</span>
              <p className="text-slate-700">
                Keep the patient warm with a blanket. Elevate legs slightly if no pelvic/spinal fracture is suspected to preserve central arterial perfusion.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Burns */}
        {activeProtocolTab === 'burns' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="font-mono text-xs font-bold text-amber-700">01. Cool with Water</span>
              <p className="text-slate-700">
                Immediately cool thermal burns with clean, cool running water for 15–20 minutes. Never use ice, toothpaste, butter, or greasy ointments.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="font-mono text-xs font-bold text-amber-700">02. Protect Blisters</span>
              <p className="text-slate-700">
                Do not pop blisters as intact skin acts as a sterile biologic barrier against severe hospital infection. Remove restrictive rings and watches before swelling begins.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="font-mono text-xs font-bold text-amber-700">03. Sterile Cover</span>
              <p className="text-slate-700">
                Cover the burned area loosely with clean, non-adherent sterile plastic wrap or a sterile dressing. Seek immediate Level-1 burn center evaluation.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Fractures & Spine */}
        {activeProtocolTab === 'fractures' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="font-mono text-xs font-bold text-teal-700">01. Cervical Spine Motion</span>
              <p className="text-slate-700">
                If motor vehicle impact or fall occurred, do NOT move the patient's neck or back. Manually hold the head in neutral alignment until EMS arrives.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="font-mono text-xs font-bold text-teal-700">02. Splint as Found</span>
              <p className="text-slate-700">
                Immobilize fractured limbs above and below the injured joint using rigid cardboard, rolled magazines, or padded splints. Never attempt to push exposed bones back.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="font-mono text-xs font-bold text-teal-700">03. Neurovascular Check</span>
              <p className="text-slate-700">
                Check distal pulses (radial or pedal) and skin color/temperature to ensure limb circulation is not compromised by displaced bone fragments.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Head Trauma & Concussion */}
        {activeProtocolTab === 'head_trauma' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="font-mono text-xs font-bold text-purple-700">01. Red Flag Indicators</span>
              <p className="text-slate-700">
                Watch for unequal pupil sizes, repeated projectile vomiting, clear fluid draining from nose/ears, slurred speech, or worsening confusion.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="font-mono text-xs font-bold text-purple-700">02. No Sedation or NSAIDs</span>
              <p className="text-slate-700">
                Do not administer aspirin, ibuprofen, or sleeping aids following head trauma, as NSAIDs exacerbate potential intracranial hemorrhage.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="font-mono text-xs font-bold text-purple-700">03. Emergent CT Scan</span>
              <p className="text-slate-700">
                Patient must be transported immediately for an emergency non-contrast head CT scan to rule out epidural or subdural hematoma.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
