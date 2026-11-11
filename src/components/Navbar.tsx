import React from 'react';
import { 
  Stethoscope, 
  PhoneCall, 
  Video, 
  ShoppingCart, 
  AlertCircle,
  Sparkles,
  Pill,
  BookOpen
} from 'lucide-react';

export type NavTab = 
  | 'consultation' 
  | 'symptom_checker'
  | 'med_management'
  | 'education'
  | 'checkups' 
  | 'scans' 
  | 'history' 
  | 'pharmacy' 
  | 'discharge' 
  | 'accidental' 
  | 'emergency';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  cartItemCount: number;
  onOpenCart: () => void;
  onQuickConsult: () => void;
  onTriggerSos: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  cartItemCount,
  onOpenCart,
  onQuickConsult,
  onTriggerSos
}) => {
  const navItems: { id: NavTab; label: string; highlight?: boolean }[] = [
    { id: 'consultation', label: 'Doctors' },
    { id: 'symptom_checker', label: 'AI Symptom Checker', highlight: true },
    { id: 'med_management', label: 'Med Reminders' },
    { id: 'education', label: 'Patient Education' },
    { id: 'checkups', label: 'Health Checkup' },
    { id: 'scans', label: 'Scan & Lab Reports' },
    { id: 'history', label: 'Patient History' },
    { id: 'pharmacy', label: 'Pharmacy' },
    { id: 'discharge', label: 'Discharge Summaries' },
    { id: 'accidental', label: 'Accidental Care' },
    { id: 'emergency', label: 'Emergency SOS' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Banner Notice with Indian Country Codes */}
      <div className="bg-slate-900 text-slate-300 px-4 py-1.5 text-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-white">CarePulse Clinical Network</span>
          <span className="text-slate-500">|</span>
          <span>
            24/7 Emergency (India):{' '}
            <strong className="text-rose-400 font-mono">+91 112</strong> /{' '}
            <strong className="text-rose-400 font-mono">+91 108</strong>
          </span>
          <span className="hidden md:inline text-slate-500">·</span>
          <span className="hidden md:inline text-teal-400">
            Telemedicine Helpline: <strong className="font-mono text-teal-300">+91 104</strong>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onTriggerSos} 
            className="flex items-center gap-1.5 text-rose-300 hover:text-white font-medium transition-colors"
          >
            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
            <span>Emergency Ambulance</span>
          </button>
        </div>
      </div>

      {/* Main Top Bar adhering strictly to 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <button 
          onClick={() => onSelectTab('consultation')} 
          className="flex items-center gap-2.5 text-left group shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1">
              Care<span className="text-teal-600">Pulse</span>
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (single line, no pill badges) */}
        <nav className="hidden xl:flex items-center gap-4 text-sm font-medium text-slate-600 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 flex items-center gap-1.5 ${
                  isActive 
                    ? 'text-teal-700 border-teal-600 font-semibold' 
                    : 'text-slate-600 hover:text-slate-900 border-transparent'
                } ${item.id === 'emergency' ? 'text-rose-600 hover:text-rose-700' : ''}`}
              >
                {item.id === 'symptom_checker' && <Sparkles className="w-3.5 h-3.5 text-teal-600" />}
                {item.id === 'med_management' && <Pill className="w-3.5 h-3.5 text-teal-600" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Medium-screen Compact Navigation Links */}
        <nav className="hidden lg:flex xl:hidden items-center gap-3 text-xs font-medium text-slate-600">
          {[
            { id: 'consultation', label: 'Doctors' },
            { id: 'symptom_checker', label: 'AI Triage' },
            { id: 'med_management', label: 'Med Reminders' },
            { id: 'education', label: 'Education' },
            { id: 'scans', label: 'Scans' },
            { id: 'pharmacy', label: 'Pharmacy' },
            { id: 'emergency', label: 'SOS' },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id as NavTab)}
                className={`py-1 border-b-2 whitespace-nowrap ${
                  isActive ? 'text-teal-700 border-teal-600 font-semibold' : 'text-slate-600 border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Quick Tools */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Pharmacy Cart Trigger */}
          <button
            onClick={onOpenCart}
            aria-label="View Cart"
            className="relative p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center font-mono">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Quick SOS Trigger Button with Indian Code */}
          <button
            onClick={onTriggerSos}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors whitespace-nowrap"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>SOS (+91 112)</span>
          </button>

          {/* Primary CTA: Start Virtual Consultation */}
          <button
            onClick={onQuickConsult}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            <Video className="w-4 h-4" />
            <span>Virtual Consultation</span>
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Navigation Scroller */}
      <div className="lg:hidden border-t border-slate-100 px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === item.id
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
            }`}
          >
            {item.id === 'symptom_checker' && <Sparkles className="w-3 h-3 text-teal-300" />}
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
