import React, { useState } from 'react';
import { 
  Search, 
  Video, 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  Award, 
  Check, 
  User, 
  X,
  FileCheck
} from 'lucide-react';
import { Doctor, Specialty, Appointment } from '../types/medical';

interface DoctorConsultationProps {
  doctors: Doctor[];
  onStartInstantCall: (doctor: Doctor) => void;
  onBookAppointment: (appointment: Appointment) => void;
  activePatientName: string;
}

export const DoctorConsultation: React.FC<DoctorConsultationProps> = ({
  doctors,
  onStartInstantCall,
  onBookAppointment,
  activePatientName
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);
  const [bookingType, setBookingType] = useState<'video' | 'in-person'>('video');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow, Nov 12');
  const [reason, setReason] = useState('');
  const [symptomTags, setSymptomTags] = useState<string[]>([]);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  const specialties: string[] = [
    'All',
    'Cardiology',
    'Neurology',
    'Internal Medicine',
    'Pediatrics',
    'Orthopedics',
    'Pulmonology'
  ];

  const commonSymptoms = [
    'Chest Pain / Palpitations',
    'Persistent Headache',
    'Cervical Neck Strain',
    'Shortness of Breath',
    'Knee Joint Pain',
    'Blood Sugar Review',
    'Routine Medication Refill'
  ];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  const toggleSymptom = (sym: string) => {
    setSymptomTags((prev) =>
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
    );
  };

  const handleConfirmBooking = () => {
    if (!selectedDoctorForBooking || !selectedSlot) return;

    const newAppointment: Appointment = {
      id: `APT-${Date.now()}`,
      doctorId: selectedDoctorForBooking.id,
      doctorName: selectedDoctorForBooking.name,
      doctorSpecialty: selectedDoctorForBooking.specialty,
      doctorAvatar: selectedDoctorForBooking.avatarUrl,
      patientName: activePatientName,
      patientAge: 48,
      patientGender: 'Male',
      date: selectedDate,
      timeSlot: selectedSlot,
      type: bookingType,
      reason: reason || 'Clinical Consultation',
      symptoms: symptomTags,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    onBookAppointment(newAppointment);
    setConfirmedAppointment(newAppointment);
    setSelectedDoctorForBooking(null);
    setIsSuccessModalOpen(true);
    setReason('');
    setSymptomTags([]);
    setSelectedSlot('');
  };

  return (
    <div className="space-y-8">
      {/* Hero Header with Clinical Context */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-teal-700 text-xs font-bold uppercase tracking-wider mb-1">
            Clinical Telehealth & In-Clinic Specialists
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Consult Board-Certified Senior Physicians & Surgeons
          </h1>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            Schedule virtual telehealth video consultations or hospital outpatient visits with experienced chief consultants across cardiology, neurology, pediatrics, orthopedics, and internal medicine.
          </p>
        </div>

        {/* Search & Specialty Filter Controls */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by doctor name, specialty, condition, or hospital..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
            />
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {specialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  selectedSpecialty === spec
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:border-slate-300 hover:shadow-sm transition-all"
          >
            {/* Top Doctor Meta Info */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-start gap-4">
                <img
                  src={doc.avatarUrl}
                  alt={doc.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-lg object-cover border border-slate-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="font-bold text-slate-900 text-base truncate">{doc.name}</h3>
                  </div>
                  <p className="text-teal-700 text-xs font-semibold">{doc.specialty}</p>
                  <p className="text-slate-500 text-[11px] truncate mt-0.5">{doc.degree}</p>

                  <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-600">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold ml-1 text-slate-800">{doc.rating}</span>
                    </div>
                    <span className="text-slate-300">·</span>
                    <span>{doc.reviewCount} reviews</span>
                    <span className="text-slate-300">·</span>
                    <span className="flex items-center gap-1">
                      <Award className="w-3 h-3 text-teal-600" />
                      {doc.experienceYears}y exp
                    </span>
                  </div>
                </div>
              </div>

              {/* Hospital Affiliation */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{doc.hospital}</span>
              </div>

              <p className="text-slate-600 text-xs mt-2 line-clamp-2 leading-relaxed">
                {doc.bio}
              </p>

              {/* Available slot preview & consultation fee */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  <span className="text-[11px] font-medium">Next: <strong className="text-slate-900 font-semibold">{doc.nextAvailable}</strong></span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Fee: </span>
                  <span className="font-bold text-slate-900 text-sm font-mono">₹{doc.consultationFee}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2">
              <button
                onClick={() => onStartInstantCall(doc)}
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Video Visit</span>
              </button>
              <button
                onClick={() => {
                  setSelectedDoctorForBooking(doc);
                  setSelectedSlot(doc.slots[0] || '10:00 AM');
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Slot</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Appointment Booking Modal */}
      {selectedDoctorForBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 text-slate-900 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedDoctorForBooking(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <img
                src={selectedDoctorForBooking.avatarUrl}
                alt={selectedDoctorForBooking.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-lg object-cover border border-slate-200"
              />
              <div>
                <h3 className="font-bold text-slate-900 text-base">{selectedDoctorForBooking.name}</h3>
                <p className="text-teal-700 text-xs font-medium">{selectedDoctorForBooking.specialty} · {selectedDoctorForBooking.hospital}</p>
                <p className="text-slate-500 text-xs">Consultation Fee: <span className="font-bold text-slate-900 font-mono">₹{selectedDoctorForBooking.consultationFee}</span></p>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              {/* Patient Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Consulting Patient</label>
                <div className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                  <User className="w-4 h-4 text-teal-700" />
                  <span className="font-semibold text-slate-900">{activePatientName}</span>
                  <span className="text-slate-500">(Age: 48 · Male)</span>
                </div>
              </div>

              {/* Consultation Type Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Consultation Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setBookingType('video')}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-medium transition-colors ${
                      bookingType === 'video'
                        ? 'border-teal-600 bg-teal-50 text-teal-900'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Video className="w-4 h-4 text-teal-700" />
                    <span>Telehealth Video</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingType('in-person')}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-medium transition-colors ${
                      bookingType === 'in-person'
                        ? 'border-teal-600 bg-teal-50 text-teal-900'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-teal-700" />
                    <span>In-Clinic Hospital</span>
                  </button>
                </div>
              </div>

              {/* Date selection */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Preferred Consultation Date</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Today, Nov 11', 'Tomorrow, Nov 12', 'Thursday, Nov 13'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDate(d)}
                      className={`py-2 px-2 text-center rounded-lg border text-xs font-medium transition-colors ${
                        selectedDate === d
                          ? 'border-teal-600 bg-teal-50 text-teal-900'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Select Available Time Slot</label>
                <div className="grid grid-cols-3 gap-2">
                  {selectedDoctorForBooking.slots.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSlot(s)}
                      className={`py-2 px-2 text-center rounded-lg border text-xs font-medium transition-colors ${
                        selectedSlot === s
                          ? 'border-teal-600 bg-teal-700 text-white font-semibold'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Common Symptoms checklist */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Related Symptoms / Primary Concern</label>
                <div className="flex flex-wrap gap-1.5">
                  {commonSymptoms.map((sym) => {
                    const isSelected = symptomTags.includes(sym);
                    return (
                      <button
                        key={sym}
                        type="button"
                        onClick={() => toggleSymptom(sym)}
                        className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                          isSelected
                            ? 'bg-teal-100 border-teal-300 text-teal-900 font-medium'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {sym}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reason / Clinical Notes */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Additional Notes for Doctor</label>
                <textarea
                  rows={2}
                  placeholder="Describe your current discomfort, duration, or any medications..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white"
                />
              </div>

              {/* Confirmation CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm Appointment (₹{selectedDoctorForBooking.consultationFee})</span>
                </button>
                <p className="text-[11px] text-slate-500 text-center mt-2">
                  No cancellation fees up to 2 hours before the scheduled time slot.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Success Dialog */}
      {isSuccessModalOpen && confirmedAppointment && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 text-slate-900 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
              <FileCheck className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">Appointment Confirmed!</h3>
              <p className="text-slate-600 text-xs mt-1">
                Your consultation request has been booked with {confirmedAppointment.doctorName}.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Appointment ID</span>
                <span className="font-mono font-semibold text-slate-800">{confirmedAppointment.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Slot</span>
                <span className="font-semibold text-slate-800">{confirmedAppointment.date} at {confirmedAppointment.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Visit Mode</span>
                <span className="font-semibold text-teal-700 capitalize">{confirmedAppointment.type} Visit</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Patient</span>
                <span className="font-semibold text-slate-800">{confirmedAppointment.patientName}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="flex-1 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
