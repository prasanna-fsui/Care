import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Check, 
  Clock, 
  Home, 
  Building2, 
  Calendar, 
  ChevronRight, 
  ChevronDown, 
  X,
  FileCheck2,
  Droplet
} from 'lucide-react';
import { HealthCheckupPackage, PackageBooking } from '../types/medical';

interface HealthCheckupProps {
  packages: HealthCheckupPackage[];
  onBookPackage: (booking: PackageBooking) => void;
  activePatientName: string;
}

export const HealthCheckup: React.FC<HealthCheckupProps> = ({
  packages,
  onBookPackage,
  activePatientName
}) => {
  const [selectedPackage, setSelectedPackage] = useState<HealthCheckupPackage | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [collectionType, setCollectionType] = useState<'home_pickup' | 'center_visit'>('home_pickup');
  const [homeAddress, setHomeAddress] = useState('742 Evergreen Terrace, Apt 4B, Metro District');
  const [bookingDate, setBookingDate] = useState('Tomorrow, Nov 12');
  const [bookingSlot, setBookingSlot] = useState('07:00 AM - 08:30 AM (Fasting)');
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
  const [confirmedBooking, setConfirmedBooking] = useState<PackageBooking | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const toggleCategory = (catName: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catName]: !prev[catName]
    }));
  };

  const handleOpenBooking = (pkg: HealthCheckupPackage) => {
    setSelectedPackage(pkg);
    setIsBookingModalOpen(true);
  };

  const handleConfirmPackageBooking = () => {
    if (!selectedPackage) return;
    const newBooking: PackageBooking = {
      id: `CHK-${Date.now().toString().slice(-6)}`,
      packageId: selectedPackage.id,
      packageName: selectedPackage.title,
      patientName: activePatientName,
      collectionType,
      address: collectionType === 'home_pickup' ? homeAddress : 'CarePulse Central Diagnostic Hospital, West Wing Lab 2',
      date: bookingDate,
      timeSlot: bookingSlot,
      price: selectedPackage.price,
      status: 'phlebotomist_assigned'
    };

    onBookPackage(newBooking);
    setConfirmedBooking(newBooking);
    setIsBookingModalOpen(false);
    setIsSuccessOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Master Health Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <p className="text-teal-700 text-xs font-bold uppercase tracking-wider mb-1">
              Preventive Diagnostic Care & Wellness
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Master Health Check-up Packages
            </h1>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              Early detection saves lives. Choose comprehensive multi-organ diagnostic screenings covering cardiac, metabolic, hepatic, and hematologic biomarkers with doorstep sample pickup or center visits.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-3">
              <Droplet className="w-4 h-4 text-teal-600 shrink-0" />
              <span>NABL & CAP Certified Automated Central Labs</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Free Post-Report Physician Tele-Consultation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:border-slate-300 transition-all"
          >
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-wider font-mono">
                    {pkg.totalTests} Comprehensive Parameters
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{pkg.title}</h3>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs text-slate-400 line-through mr-1.5 font-mono">₹{pkg.originalPrice}</span>
                  <span className="text-xl font-extrabold text-slate-900 font-mono">₹{pkg.price}</span>
                </div>
              </div>

              <p className="text-slate-600 text-xs mt-2 leading-relaxed">{pkg.tagline}</p>

              {/* Fasting & Turnaround tags */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Fasting: <strong className="text-slate-800">{pkg.fastingRequiredHours}h required</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  <span>Report in: <strong className="text-slate-800">{pkg.reportTurnaround}</strong></span>
                </div>
              </div>

              {/* Organ Profile Test Categories Breakdown */}
              <div className="mt-4 space-y-2 flex-1">
                <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Test Inclusions Breakdown
                </p>
                <div className="space-y-1.5">
                  {pkg.categories.slice(0, 4).map((cat) => {
                    const isExpanded = expandedCategories[`${pkg.id}-${cat.category}`];
                    return (
                      <div key={cat.category} className="border border-slate-100 rounded-lg p-2.5 bg-slate-50/60">
                        <button
                          type="button"
                          onClick={() => toggleCategory(`${pkg.id}-${cat.category}`)}
                          className="w-full flex items-center justify-between text-left text-xs font-medium text-slate-800"
                        >
                          <span>{cat.category}</span>
                          {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                          )}
                        </button>
                        {isExpanded && (
                          <div className="mt-2 pt-2 border-t border-slate-200/60 flex flex-wrap gap-1">
                            {cat.tests.map((t) => (
                              <span key={t} className="text-[11px] text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Fasting Preparation Note */}
              <div className="mt-4 p-3 bg-amber-50/60 border border-amber-200/60 rounded-lg text-[11px] text-amber-900 leading-relaxed">
                <strong>Patient Fasting Instruction:</strong> {pkg.preparationNotes[0]}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500">Includes Phlebotomist Home Visit</span>
              <button
                onClick={() => handleOpenBooking(pkg)}
                className="py-2.5 px-5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                <span>Book Check-up (₹{pkg.price})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && selectedPackage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 text-slate-900 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pb-3 border-b border-slate-100">
              <span className="text-teal-700 text-xs font-bold uppercase tracking-wider">Book Health Check-up</span>
              <h3 className="font-bold text-slate-900 text-lg mt-0.5">{selectedPackage.title}</h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Total Price: <strong className="text-slate-900 font-mono">₹{selectedPackage.price}</strong> ({selectedPackage.totalTests} Tests)
              </p>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              {/* Sample Collection Mode */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Collection Preference</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCollectionType('home_pickup')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-xs font-medium transition-colors ${
                      collectionType === 'home_pickup'
                        ? 'border-teal-600 bg-teal-50 text-teal-900'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Home className="w-4 h-4 text-teal-700" />
                    <span>Home Sample Pickup</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCollectionType('center_visit')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-xs font-medium transition-colors ${
                      collectionType === 'center_visit'
                        ? 'border-teal-600 bg-teal-50 text-teal-900'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-teal-700" />
                    <span>Hospital Center Visit</span>
                  </button>
                </div>
              </div>

              {/* Address Field if Home Pickup */}
              {collectionType === 'home_pickup' && (
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Doorstep Sample Collection Address</label>
                  <input
                    type="text"
                    value={homeAddress}
                    onChange={(e) => setHomeAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Certified phlebotomist with temperature-controlled sterile vacutainers will arrive at your door.
                  </p>
                </div>
              )}

              {/* Date selection */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Preferred Sample Date</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Tomorrow, Nov 12', 'Thursday, Nov 13', 'Friday, Nov 14'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setBookingDate(d)}
                      className={`py-2 px-2 text-center rounded-lg border text-xs font-medium transition-colors ${
                        bookingDate === d
                          ? 'border-teal-600 bg-teal-50 text-teal-900'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slot (Fasting) */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Morning Fasting Time Slot</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    '06:30 AM - 07:30 AM',
                    '07:30 AM - 08:30 AM',
                    '08:30 AM - 09:30 AM',
                    '09:30 AM - 10:30 AM'
                  ].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setBookingSlot(s)}
                      className={`py-2 px-2 text-center rounded-lg border text-xs font-medium transition-colors ${
                        bookingSlot.includes(s)
                          ? 'border-teal-600 bg-teal-700 text-white font-semibold'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Patient info reminder */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500">Patient: </span>
                <strong className="text-slate-900">{activePatientName}</strong>
                <span className="text-slate-400"> (48M · Self)</span>
              </div>

              {/* Confirm Booking CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleConfirmPackageBooking}
                  className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm Package Booking (₹{selectedPackage.price})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Success Dialog */}
      {isSuccessOpen && confirmedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 text-slate-900 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
              <FileCheck2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">Health Checkup Booked!</h3>
              <p className="text-slate-600 text-xs mt-1">
                Your appointment ID is <strong className="font-mono text-slate-900">{confirmedBooking.id}</strong>.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Package</span>
                <span className="font-semibold text-slate-800">{confirmedBooking.packageName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Collection Slot</span>
                <span className="font-semibold text-slate-800">{confirmedBooking.date} ({confirmedBooking.timeSlot})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pickup Type</span>
                <span className="font-semibold text-teal-700 capitalize">{confirmedBooking.collectionType.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location</span>
                <span className="text-slate-800 truncate max-w-[200px]">{confirmedBooking.address}</span>
              </div>
            </div>

            <button
              onClick={() => setIsSuccessOpen(false)}
              className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
