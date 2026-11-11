import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Video as VideoIcon, 
  VideoOff, 
  PhoneOff, 
  Share2, 
  FileText, 
  Activity, 
  MessageSquare, 
  Download, 
  ShieldCheck, 
  Send, 
  ZoomIn, 
  ZoomOut, 
  RotateCw,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Doctor, DiagnosticReport } from '../types/medical';

interface VideoConferenceModalProps {
  doctor: Doctor;
  patientName: string;
  onClose: () => void;
  availableReports: DiagnosticReport[];
  onOrderMedicinesFromPrescription?: (meds: string[]) => void;
}

interface ChatMessage {
  id: string;
  sender: 'Doctor' | 'Patient';
  text: string;
  time: string;
}

interface PrescriptionEntry {
  id: string;
  drug: string;
  dosage: string;
  frequency: string;
  instructions: string;
}

export const VideoConferenceModal: React.FC<VideoConferenceModalProps> = ({
  doctor,
  patientName,
  onClose,
  availableReports,
  onOrderMedicinesFromPrescription
}) => {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activeSidePanel, setActiveSidePanel] = useState<'prescription' | 'scans' | 'chat'>('prescription');
  const [callDurationSeconds, setCallDurationSeconds] = useState(135); // start at ~2m15s for realistic feel
  const [isEnded, setIsEnded] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // Scan co-reviewer state
  const [selectedScanReport, setSelectedScanReport] = useState<DiagnosticReport>(availableReports[0]);
  const [scanZoom, setScanZoom] = useState(100);
  const [scanContrast, setScanContrast] = useState<'normal' | 'high' | 'invert'>('normal');

  // Live Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'Doctor',
      text: `Hello ${patientName}, I have reviewed your MRI report and previous vitals. How are your headaches today?`,
      time: '14:31'
    },
    {
      id: '2',
      sender: 'Patient',
      text: 'Good afternoon Dr. The neck stiffness is slightly better with rest, but I feel mild tightness when working long hours.',
      time: '14:32'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // Doctor's Live Digital Prescription Pad
  const [prescriptions, setPrescriptions] = useState<PrescriptionEntry[]>([
    {
      id: 'rx-1',
      drug: 'Thiocolchicoside (Muscoril)',
      dosage: '4 mg',
      frequency: 'Twice daily after meals',
      instructions: 'For 5 days to relieve cervical muscle spasm'
    },
    {
      id: 'rx-2',
      drug: 'Paracetamol',
      dosage: '650 mg',
      frequency: 'SOS (As needed for pain)',
      instructions: 'Maximum 3 tablets a day with plenty of water'
    }
  ]);

  const [clinicalDiagnosis, setClinicalDiagnosis] = useState('Cervicogenic cephalalgia with secondary trapezial spasm');
  const [doctorAdvice, setDoctorAdvice] = useState('Maintain ergonomic computer screen height. 15-minute cervical range-of-motion stretching twice daily.');
  const [isPrescriptionSigned, setIsPrescriptionSigned] = useState(true);

  // New prescription line input
  const [newDrug, setNewDrug] = useState('');
  const [newDose, setNewDose] = useState('');
  const [newFreq, setNewFreq] = useState('Once daily');
  const [newNotes, setNewNotes] = useState('');

  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Call timer interval
  useEffect(() => {
    if (isEnded) return;
    const interval = setInterval(() => {
      setCallDurationSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isEnded]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'Patient',
      text: inputMsg.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputMsg('');

    // Simulated doctor response
    setTimeout(() => {
      const docResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'Doctor',
        text: 'Noted. I have updated your prescription pad with supportive medication and ergonomic posture guidelines.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, docResponse]);
    }, 1500);
  };

  const handleAddPrescription = () => {
    if (!newDrug.trim()) return;
    const newItem: PrescriptionEntry = {
      id: Date.now().toString(),
      drug: newDrug.trim(),
      dosage: newDose || 'As directed',
      frequency: newFreq,
      instructions: newNotes || 'Take with water'
    };
    setPrescriptions((prev) => [...prev, newItem]);
    setNewDrug('');
    setNewDose('');
    setNewNotes('');
  };

  const handleRemovePrescription = (id: string) => {
    setPrescriptions((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDownloadPrescription = () => {
    const content = `
CAREPULSE CLINICAL NETWORK - OFFICIAL E-PRESCRIPTION
=====================================================
Consulting Physician: ${doctor.name}, ${doctor.degree}
Specialty: ${doctor.specialty}
Hospital: ${doctor.hospital}
License / NPI: CP-MED-${doctor.id.toUpperCase()}-2026
-----------------------------------------------------
Patient: ${patientName}
Date: ${new Date().toLocaleDateString()}
Clinical Diagnosis: ${clinicalDiagnosis}

MEDICATIONS PRESCRIBED:
${prescriptions.map((p, idx) => `${idx + 1}. ${p.drug} - ${p.dosage}\n   Frequency: ${p.frequency}\n   Instructions: ${p.instructions}`).join('\n\n')}

PHYSICIAN CLINICAL ADVICE:
${doctorAdvice}

Digitally signed & verified by ${doctor.name}
-----------------------------------------------------
CarePulse Telehealth Virtual Care Platform (HIPAA Certified)
    `;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `E-Prescription-${patientName.replace(/\s+/g, '_')}-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col overflow-hidden text-slate-100">
      {/* Top Telehealth Control Bar */}
      <div className="h-14 border-b border-slate-800 bg-slate-900/90 px-4 sm:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-white text-sm">Virtual Consultation Room</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span>{doctor.name} ({doctor.specialty})</span>
            <span className="text-slate-500">·</span>
            <span className="font-mono text-teal-400 font-semibold">{formatTimer(callDurationSeconds)}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="hidden md:flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>256-Bit Encrypted WebRTC Session</span>
          </div>
          <div className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono">
            1080p Full HD · 60 FPS
          </div>
        </div>
      </div>

      {/* Main Consultation Viewport Split: Video Arena & Interactive Clinical Panel */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side: Video Streams & Controls */}
        <div className="flex-1 flex flex-col bg-slate-950 p-3 sm:p-4 relative">
          {/* Main Stage: Doctor's Feed */}
          <div className="flex-1 relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
            {/* Real doctor portrait backdrop with ambient lighting & clinical HUD */}
            <img 
              src={doctor.avatarUrl} 
              alt={doctor.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />

            {/* Doctor Info Badge on Screen */}
            <div className="absolute top-4 left-4 flex items-center gap-2.5 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <div className="text-xs">
                <p className="font-semibold text-white">{doctor.name}</p>
                <p className="text-slate-400 text-[11px]">{doctor.specialty} · {doctor.hospital}</p>
              </div>
            </div>

            {/* Simulated Live Audio Spectrum Indicator for Active Speaker */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-slate-900/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-300">
              <span className="text-[11px]">Speaking:</span>
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-1 bg-teal-400 rounded-full animate-pulse h-2" />
                <span className="w-1 bg-teal-400 rounded-full animate-pulse h-3.5" />
                <span className="w-1 bg-teal-400 rounded-full animate-pulse h-2.5" />
                <span className="w-1 bg-teal-400 rounded-full animate-pulse h-1.5" />
              </div>
            </div>

            {/* Real-time Patient Vitals HUD Overlaid on Video */}
            <div className="absolute top-4 right-4 bg-slate-900/85 backdrop-blur-md border border-slate-700/70 rounded-lg p-2.5 text-xs shadow-lg space-y-1.5 min-w-[150px]">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3 text-rose-400" />
                  Live Vitals
                </span>
                <span className="text-emerald-400 font-mono text-[10px]">Sync OK</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Heart Rate</span>
                <span className="font-mono text-white font-medium">74 bpm</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Blood Pressure</span>
                <span className="font-mono text-white font-medium">124 / 82</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Oxygen (SpO2)</span>
                <span className="font-mono text-emerald-400 font-medium">99%</span>
              </div>
            </div>

            {/* Patient Picture-in-Picture Self-View */}
            <div className="absolute bottom-4 right-4 w-36 h-28 sm:w-48 sm:h-36 rounded-lg overflow-hidden border-2 border-slate-700 bg-slate-800 shadow-2xl relative">
              {isVideoOff ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-400 p-2 text-center text-xs">
                  <VideoOff className="w-6 h-6 mb-1 text-slate-500" />
                  <span>Camera Paused</span>
                </div>
              ) : (
                <div className="w-full h-full relative bg-slate-900 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-teal-700 text-white font-bold flex items-center justify-center text-lg">
                    {patientName.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="absolute inset-0 bg-teal-950/20" />
                  <div className="absolute bottom-1.5 left-2 text-[10px] bg-slate-950/80 px-1.5 py-0.5 rounded text-slate-200">
                    You ({patientName})
                  </div>
                </div>
              )}
              {isMicMuted && (
                <div className="absolute top-1.5 right-1.5 p-1 bg-rose-600 rounded-full text-white">
                  <MicOff className="w-3 h-3" />
                </div>
              )}
            </div>
          </div>

          {/* Bottom Floating Control Deck */}
          <div className="h-16 flex items-center justify-center gap-3 mt-3">
            <button
              onClick={() => setIsMicMuted(!isMicMuted)}
              title={isMicMuted ? 'Unmute Microphone' : 'Mute Microphone'}
              className={`p-3 rounded-full transition-colors ${
                isMicMuted 
                  ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              title={isVideoOff ? 'Start Video Camera' : 'Stop Video Camera'}
              className={`p-3 rounded-full transition-colors ${
                isVideoOff 
                  ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <VideoIcon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => {
                setIsScreenSharing(!isScreenSharing);
                setActiveSidePanel('scans');
              }}
              title="Share Scan / Medical Report"
              className={`p-3 rounded-full transition-colors ${
                isScreenSharing 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              <Share2 className="w-5 h-5" />
            </button>

            {/* End Call Button */}
            <button
              onClick={() => setIsEnded(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-lg transition-transform hover:scale-105"
            >
              <PhoneOff className="w-5 h-5" />
              <span>Leave Visit</span>
            </button>
          </div>
        </div>

        {/* Right Side: Clinical Interactive Workspace Panel */}
        <div className="w-full lg:w-[440px] xl:w-[480px] bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col shrink-0">
          {/* Workspace Tabs */}
          <div className="p-2 border-b border-slate-800 grid grid-cols-3 gap-1 bg-slate-950/60">
            <button
              onClick={() => setActiveSidePanel('prescription')}
              className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-md transition-colors ${
                activeSidePanel === 'prescription'
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>E-Prescription</span>
            </button>
            <button
              onClick={() => setActiveSidePanel('scans')}
              className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-md transition-colors ${
                activeSidePanel === 'scans'
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Scan Co-Review</span>
            </button>
            <button
              onClick={() => setActiveSidePanel('chat')}
              className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-md transition-colors ${
                activeSidePanel === 'chat'
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Clinical Chat</span>
            </button>
          </div>

          {/* TAB 1: E-Prescription Live Workspace */}
          {activeSidePanel === 'prescription' && (
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-lg">
                <div className="flex items-center justify-between pb-2 border-b border-slate-700 mb-2">
                  <div>
                    <h4 className="font-bold text-white text-sm">Doctor's Digital Prescription Pad</h4>
                    <p className="text-slate-400 text-[11px]">{doctor.name} · License #NPI-89401</p>
                  </div>
                  <button
                    onClick={handleDownloadPrescription}
                    className="flex items-center gap-1 text-[11px] bg-teal-800/60 hover:bg-teal-700 text-teal-200 px-2.5 py-1 rounded border border-teal-600/50 transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download Rx</span>
                  </button>
                </div>

                {/* Clinical Diagnosis input */}
                <div className="space-y-1 mb-3">
                  <label className="text-slate-400 text-[11px] font-medium">Clinical Impression / Working Diagnosis</label>
                  <input
                    type="text"
                    value={clinicalDiagnosis}
                    onChange={(e) => setClinicalDiagnosis(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100 text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>

                {/* Prescribed Drugs List */}
                <div className="space-y-2">
                  <p className="text-slate-300 font-semibold text-[11px] uppercase tracking-wider">Prescribed Medications</p>
                  {prescriptions.map((p, idx) => (
                    <div key={p.id} className="p-2.5 bg-slate-900/90 border border-slate-700/80 rounded flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-teal-400 font-bold">{idx + 1}.</span>
                          <span className="font-semibold text-white">{p.drug}</span>
                          <span className="text-slate-400">({p.dosage})</span>
                        </div>
                        <p className="text-slate-300 text-[11px] mt-0.5 font-medium">{p.frequency}</p>
                        <p className="text-slate-400 text-[11px]">{p.instructions}</p>
                      </div>
                      <button
                        onClick={() => handleRemovePrescription(p.id)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add New Prescription Row */}
                <div className="mt-3 p-2 bg-slate-950/70 border border-slate-800 rounded space-y-2">
                  <p className="text-slate-400 font-medium text-[11px]">Add Medication to Prescription</p>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Medication Name (e.g. Atorvastatin)"
                      value={newDrug}
                      onChange={(e) => setNewDrug(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-teal-500"
                    />
                    <input
                      type="text"
                      placeholder="Strength / Dose (e.g. 20mg)"
                      value={newDose}
                      onChange={(e) => setNewDose(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={newFreq}
                      onChange={(e) => setNewFreq(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-teal-500"
                    >
                      <option value="Once daily (OD)">Once daily (OD)</option>
                      <option value="Twice daily (BD)">Twice daily (BD)</option>
                      <option value="Thrice daily (TID)">Thrice daily (TID)</option>
                      <option value="At bedtime (HS)">At bedtime (HS)</option>
                      <option value="SOS / As needed">SOS / As needed</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Duration & instructions"
                      value={newNotes}
                      onChange={(e) => setNewNotes(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <button
                    onClick={handleAddPrescription}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-teal-700 hover:bg-teal-600 text-white rounded text-xs font-medium transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Digital Rx</span>
                  </button>
                </div>

                {/* Doctor's Advice Box */}
                <div className="mt-3 space-y-1">
                  <label className="text-slate-400 text-[11px] font-medium">Physician General Recommendations</label>
                  <textarea
                    rows={2}
                    value={doctorAdvice}
                    onChange={(e) => setDoctorAdvice(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>

                {/* Doctor Digital Signature Status */}
                <div className="mt-3 pt-3 border-t border-slate-700 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 text-teal-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Digital Cryptographic Signature Verified</span>
                  </div>
                  <span className="font-mono text-slate-400">{doctor.name}</span>
                </div>
              </div>

              {/* Instant Pharmacy Forward Option */}
              {onOrderMedicinesFromPrescription && (
                <button
                  onClick={() => {
                    const drugs = prescriptions.map((p) => p.drug);
                    onOrderMedicinesFromPrescription(drugs);
                  }}
                  className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg text-center shadow-sm transition-colors"
                >
                  Forward Prescriptions to In-App Pharmacy
                </button>
              )}
            </div>
          )}

          {/* TAB 2: Scan Co-Review Screen Share */}
          {activeSidePanel === 'scans' && (
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">Diagnostic Scan Co-Examiner</h4>
                  <p className="text-slate-400 text-[11px]">Synchronous radiology view during call</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setScanZoom((z) => Math.max(70, z - 10))}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-200"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-slate-400 text-[11px] px-1">{scanZoom}%</span>
                  <button
                    onClick={() => setScanZoom((z) => Math.min(180, z + 10))}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-200"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setScanContrast(
                        scanContrast === 'normal' ? 'high' : scanContrast === 'high' ? 'invert' : 'normal'
                      );
                    }}
                    className={`p-1.5 rounded transition-colors ${
                      scanContrast !== 'normal' ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-200'
                    }`}
                    title="Window Contrast Preset"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Select Report to inspect */}
              <div className="space-y-1">
                <label className="text-slate-400 text-[11px]">Select Patient Report for Review:</label>
                <select
                  value={selectedScanReport.id}
                  onChange={(e) => {
                    const rep = availableReports.find((r) => r.id === e.target.value);
                    if (rep) setSelectedScanReport(rep);
                  }}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100 text-xs focus:outline-none focus:border-teal-500"
                >
                  {availableReports.map((r) => (
                    <option key={r.id} value={r.id}>
                      [{r.modality}] {r.title} ({r.date})
                    </option>
                  ))}
                </select>
              </div>

              {/* Interactive Scan Canvas / Image Display */}
              <div className="relative rounded-lg overflow-hidden border border-slate-700 bg-black min-h-[260px] flex items-center justify-center p-2">
                {selectedScanReport.imageUrl ? (
                  <img
                    src={selectedScanReport.imageUrl}
                    alt={selectedScanReport.title}
                    referrerPolicy="no-referrer"
                    style={{
                      transform: `scale(${scanZoom / 100})`,
                      filter:
                        scanContrast === 'high'
                          ? 'contrast(160%) brightness(110%)'
                          : scanContrast === 'invert'
                          ? 'invert(100%) contrast(140%)'
                          : 'none',
                      transition: 'transform 0.15s ease-out'
                    }}
                    className="max-h-[300px] object-contain rounded"
                  />
                ) : (
                  <div className="p-4 text-center text-slate-400">
                    <Activity className="w-8 h-8 mx-auto text-teal-400 mb-2" />
                    <p className="font-semibold text-white">Diagnostic Laboratory Panel</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {selectedScanReport.labResults?.length || 0} Biomarkers evaluated by {selectedScanReport.radiologist}
                    </p>
                  </div>
                )}

                {/* DICOM calibration overlay indicator */}
                <div className="absolute bottom-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] font-mono text-teal-300">
                  DICOM 3.0 · Preset: {scanContrast.toUpperCase()} · Co-view Active
                </div>
              </div>

              {/* Radiologist Official Impression */}
              <div className="p-3 bg-slate-800/70 border border-slate-700 rounded-lg space-y-1.5">
                <p className="font-semibold text-white text-xs">Official Radiologist Impression</p>
                <p className="text-slate-300 text-xs leading-relaxed">{selectedScanReport.impression}</p>
                <p className="text-[11px] text-slate-400 italic">Reported by {selectedScanReport.radiologist}</p>
              </div>
            </div>
          )}

          {/* TAB 3: Clinical Chat */}
          {activeSidePanel === 'chat' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Message History */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === 'Patient' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-[11px] text-slate-400">
                      <span className="font-medium text-slate-300">
                        {m.sender === 'Doctor' ? doctor.name : 'You'}
                      </span>
                      <span>·</span>
                      <span className="font-mono">{m.time}</span>
                    </div>
                    <div
                      className={`max-w-[85%] p-3 rounded-lg text-xs ${
                        m.sender === 'Patient'
                          ? 'bg-teal-700 text-white rounded-br-none'
                          : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-950/50 flex gap-2">
                <input
                  type="text"
                  placeholder="Type a clinical query or symptom update..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition-colors flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Call Ended Summary Modal Dialog */}
      {isEnded && (
        <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 text-slate-100 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-teal-900/60 border border-teal-500/40 text-teal-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-white">Consultation Completed</h3>
              <p className="text-slate-400 text-xs mt-1">
                Total Visit Duration: <strong className="font-mono text-white">{formatTimer(callDurationSeconds)}</strong> with {doctor.name}
              </p>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 text-xs space-y-2">
              <p className="font-semibold text-white">Clinical Diagnosis:</p>
              <p className="text-slate-300">{clinicalDiagnosis}</p>
              <p className="font-semibold text-white mt-2">Active Prescriptions ({prescriptions.length}):</p>
              <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                {prescriptions.map((p) => (
                  <li key={p.id}>
                    <span className="font-medium text-white">{p.drug}</span> ({p.dosage}) - {p.frequency}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleDownloadPrescription}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Signed E-Prescription (PDF/Text)</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs rounded-lg transition-colors"
              >
                Return to Clinical Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
