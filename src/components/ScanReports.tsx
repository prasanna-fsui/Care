import React, { useState } from 'react';
import { 
  FileText, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Sliders, 
  Download, 
  Share2, 
  CheckCircle2, 
  Calendar, 
  ChevronRight,
  Eye,
  Crosshair
} from 'lucide-react';
import { DiagnosticReport } from '../types/medical';

interface ScanReportsProps {
  reports: DiagnosticReport[];
  onOpenConsultationWithReport: (report: DiagnosticReport) => void;
}

export const ScanReports: React.FC<ScanReportsProps> = ({
  reports,
  onOpenConsultationWithReport
}) => {
  const [selectedReportId, setSelectedReportId] = useState<string>(reports[0]?.id || '');
  const [activeSlice, setActiveSlice] = useState<number>(6);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [windowPreset, setWindowPreset] = useState<'standard' | 'contrast' | 'invert' | 'bone'>('standard');
  const [isCalipersActive, setIsCalipersActive] = useState<boolean>(false);
  const [caliperMeasurement, setCaliperMeasurement] = useState<string>('14.2 mm (Transverse Diameter)');
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);

  const selectedReport = reports.find((r) => r.id === selectedReportId) || reports[0];

  const handleDownloadReport = () => {
    const textReport = `
CAREPULSE RADIOLOGY & CLINICAL PATHOLOGY NETWORK
OFFICIAL VERIFIED DIAGNOSTIC REPORT
==================================================
Report ID: ${selectedReport.id}
Patient: ${selectedReport.patientName}
Date of Examination: ${selectedReport.date}
Modality: ${selectedReport.modality}
Examination: ${selectedReport.title}
Organ / System: ${selectedReport.organ}
Referring Consultant: ${selectedReport.referringDoctor}
Reporting Radiologist: ${selectedReport.radiologist}
Status: VERIFIED & AUDITED
--------------------------------------------------

CLINICAL FINDINGS:
${selectedReport.findings.map((f, i) => `${i + 1}. ${f}`).join('\n')}

RADIOLOGICAL IMPRESSION:
${selectedReport.impression}

RECOMMENDATIONS & FOLLOW-UP:
${selectedReport.recommendations.map((r, i) => `· ${r}`).join('\n')}

${selectedReport.labResults ? `\nLABORATORY BIOMARKERS:\n${selectedReport.labResults.map((l) => `${l.parameter}: ${l.value} ${l.unit} [Ref: ${l.referenceMin} - ${l.referenceMax}] - ${l.status.toUpperCase()}`).join('\n')}` : ''}

Digitally Authenticated by ${selectedReport.radiologist}
CarePulse Diagnostic Information System (PACS / DICOM 3.0 Compliant)
    `;

    const blob = new Blob([textReport], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Diagnostic-Report-${selectedReport.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccessMsg('Report downloaded successfully.');
    setTimeout(() => setDownloadSuccessMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-teal-700 text-xs font-bold uppercase tracking-wider mb-1">
            Diagnostic Imaging & Laboratory Diagnostics
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Scan & Pathology Reports
          </h1>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            High-resolution diagnostic imaging viewer with DICOM multi-slice inspection, interactive window leveling, radiological impressions, and standardized laboratory reference range monitors.
          </p>
        </div>
      </div>

      {downloadSuccessMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{downloadSuccessMsg}</span>
          </div>
        </div>
      )}

      {/* Main Grid: Left List + Right Interactive DICOM / Lab Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Report Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Diagnostic Records ({reports.length})
          </h2>
          <div className="space-y-2">
            {reports.map((rep) => {
              const isSelected = rep.id === selectedReport.id;
              return (
                <button
                  key={rep.id}
                  onClick={() => {
                    setSelectedReportId(rep.id);
                    setZoomLevel(100);
                    setActiveSlice(6);
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-teal-50/60 border-teal-600 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded">
                      {rep.modality}
                    </span>
                    <span className="text-slate-500 text-xs flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {rep.date}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mt-2 line-clamp-1">{rep.title}</h3>
                  <p className="text-slate-500 text-xs mt-0.5">Organ: {rep.organ}</p>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="truncate max-w-[170px]">{rep.referringDoctor}</span>
                    <span className="text-teal-700 font-semibold flex items-center gap-0.5">
                      View Report <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Diagnostic Viewer (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {/* Report Header */}
            <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
                    {selectedReport.modality}
                  </span>
                  <span className="text-xs text-slate-500">ID: {selectedReport.id}</span>
                  <span className="text-xs text-slate-500">·</span>
                  <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Physician Verified
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mt-1">{selectedReport.title}</h2>
                <p className="text-slate-500 text-xs">
                  Referred by <strong className="text-slate-700">{selectedReport.referringDoctor}</strong> · Reported by {selectedReport.radiologist}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleDownloadReport}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span>Download File</span>
                </button>
                <button
                  onClick={() => onOpenConsultationWithReport(selectedReport)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Review in Video Visit</span>
                </button>
              </div>
            </div>

            {/* If Report has Scan Image: Render Full DICOM Viewer */}
            {selectedReport.imageUrl ? (
              <div className="p-4 bg-slate-950 text-slate-200">
                {/* DICOM Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-900 rounded-lg border border-slate-800 text-xs mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-slate-400 text-[11px] mr-1">Window:</span>
                    {(['standard', 'contrast', 'invert', 'bone'] as const).map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setWindowPreset(preset)}
                        className={`px-2 py-1 rounded text-[11px] font-medium uppercase transition-colors ${
                          windowPreset === preset
                            ? 'bg-teal-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Calipers toggle */}
                    <button
                      onClick={() => setIsCalipersActive(!isCalipersActive)}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                        isCalipersActive
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <Crosshair className="w-3 h-3" />
                      <span>Caliper Tool</span>
                    </button>

                    <button
                      onClick={() => setZoomLevel((z) => Math.max(80, z - 10))}
                      className="p-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-slate-400 text-xs min-w-[42px] text-center">
                      {zoomLevel}%
                    </span>
                    <button
                      onClick={() => setZoomLevel((z) => Math.min(180, z + 10))}
                      className="p-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setZoomLevel(100);
                        setWindowPreset('standard');
                        setIsCalipersActive(false);
                      }}
                      className="p-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                      title="Reset View"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* DICOM Scan Display Surface */}
                <div className="relative rounded-lg overflow-hidden bg-black border border-slate-800 flex items-center justify-center min-h-[380px] p-2">
                  <img
                    src={selectedReport.imageUrl}
                    alt={selectedReport.title}
                    referrerPolicy="no-referrer"
                    style={{
                      transform: `scale(${zoomLevel / 100})`,
                      filter:
                        windowPreset === 'contrast'
                          ? 'contrast(170%) brightness(110%)'
                          : windowPreset === 'invert'
                          ? 'invert(100%) contrast(150%)'
                          : windowPreset === 'bone'
                          ? 'contrast(210%) brightness(85%) grayscale(100%)'
                          : 'contrast(100%)',
                      transition: 'transform 0.15s ease-out'
                    }}
                    className="max-h-[420px] object-contain rounded"
                  />

                  {/* DICOM Clinical Telemetry Watermark & Calibration Overlays */}
                  <div className="absolute top-3 left-3 bg-slate-950/80 px-2 py-1 rounded text-[11px] font-mono text-teal-300 space-y-0.5">
                    <div>STUDY: MR BRAIN NEURO-AXIAL</div>
                    <div>SLICE: {activeSlice} / {selectedReport.slicesCount || 16} (5.0mm)</div>
                    <div>FOV: 240mm · TE: 14ms · TR: 520ms</div>
                  </div>

                  <div className="absolute top-3 right-3 bg-slate-950/80 px-2 py-1 rounded text-[11px] font-mono text-slate-300 text-right space-y-0.5">
                    <div>PATIENT: {selectedReport.patientName}</div>
                    <div>ACQ: AXIAL T1 SE</div>
                    <div>W: 450 L: 120</div>
                  </div>

                  {/* Caliper measurement overlay line if active */}
                  {isCalipersActive && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="relative w-48 border-t-2 border-dashed border-rose-500">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[10px] font-mono px-2 py-0.5 rounded shadow">
                          {caliperMeasurement}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Slice Selector Slider */}
                  <div className="absolute bottom-3 inset-x-4 bg-slate-950/85 backdrop-blur-xs p-2 rounded-lg border border-slate-800 flex items-center gap-3">
                    <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap">
                      Slice {activeSlice} / {selectedReport.slicesCount || 16}
                    </span>
                    <input
                      type="range"
                      min={1}
                      max={selectedReport.slicesCount || 16}
                      value={activeSlice}
                      onChange={(e) => setActiveSlice(Number(e.target.value))}
                      className="w-full accent-teal-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {/* If Pathology / Lab Panel: Visual Reference Range Bars */}
            {selectedReport.labResults && (
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-teal-700" />
                  <span>Biomarker Laboratory Profile & Normal Limits</span>
                </h3>

                <div className="space-y-4">
                  {selectedReport.labResults.map((lab) => {
                    const isAbnormal = lab.status === 'high' || lab.status === 'low';
                    const percent = Math.min(
                      100,
                      Math.max(
                        0,
                        ((lab.value - lab.referenceMin) / (lab.referenceMax - lab.referenceMin)) * 60 + 20
                      )
                    );

                    return (
                      <div key={lab.parameter} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-bold text-slate-900">{lab.parameter}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-slate-900 text-sm">
                              {lab.value} <span className="text-xs font-normal text-slate-500">{lab.unit}</span>
                            </span>
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                                lab.status === 'normal'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              {lab.status}
                            </span>
                          </div>
                        </div>

                        {/* Visual Range Bar */}
                        <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden my-2">
                          {/* Normal safe zone marker */}
                          <div className="absolute inset-y-0 left-[20%] right-[20%] bg-emerald-200" />
                          {/* Value point */}
                          <div
                            style={{ left: `${percent}%` }}
                            className={`absolute top-0 w-2.5 h-2.5 -mt-0.25 rounded-full border border-white shadow-xs ${
                              isAbnormal ? 'bg-amber-600' : 'bg-emerald-600'
                            }`}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span>Ref Range: {lab.referenceMin} – {lab.referenceMax} {lab.unit}</span>
                          <span>Standard Serum Assay</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Findings & Radiologist Impression */}
            <div className="p-6 space-y-5 text-xs">
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-teal-700" />
                  <span>Clinical Observations & Findings</span>
                </h3>
                <ul className="space-y-1.5 text-slate-700 list-disc list-inside leading-relaxed pl-1">
                  {selectedReport.findings.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-xl space-y-1">
                <h4 className="font-bold text-teal-950 text-xs uppercase tracking-wider">
                  Radiological / Clinical Impression
                </h4>
                <p className="text-teal-950 font-medium leading-relaxed">{selectedReport.impression}</p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                  Recommended Action Plan
                </h3>
                <ul className="space-y-1 text-slate-600 list-disc list-inside">
                  {selectedReport.recommendations.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
