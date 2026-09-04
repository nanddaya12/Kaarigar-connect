import React, { useState } from 'react';
import { 
  X, 
  Wrench, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  FileText, 
  User, 
  Award, 
  DollarSign, 
  ArrowRight, 
  ArrowLeft,
  UploadCloud,
  Check
} from 'lucide-react';
import { Button } from '../ui/Button';

interface ProviderOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const ProviderOnboardingModal: React.FC<ProviderOnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    cnic: '',
    locality: 'Latifabad Unit 6',
    profession: 'Senior Electrician',
    startingPrice: '1500',
    experienceYears: '5',
    serviceDescription: '',
    cnicUploaded: false,
    guildCertUploaded: false,
  });

  if (!isOpen) return null;

  const totalSteps = 7;

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  const trades = [
    'Electrician',
    'Plumber',
    'AC Technician',
    'Car Mechanic',
    'Bike Mechanic',
    'Carpenter',
    'Painter',
    'Cleaning & Sanitation',
    'Appliance Repair',
    'Solar Technician',
  ];

  const coverageAreas = [
    'Latifabad (Units 1-12)',
    'Qasimabad (Phases 1-2)',
    'Auto Bhan Road',
    'Saddar Bazaar & Cantt',
    'Citizen Colony / Wadhu Wah',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-[#004331] text-white p-6 relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-bold flex items-center justify-center shadow-md">
              <Wrench className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h2 className="font-headline font-extrabold text-lg text-white">
                Become a Verified Kaarigar
              </h2>
              <p className="text-xs text-emerald-200 font-medium">
                Join Hyderabad’s top network of trusted home & automotive experts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-emerald-800 text-emerald-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-[#004331] text-amber-400 font-bold text-xs rounded-full">
              Step {step} of {totalSteps}
            </span>
            <span className="text-xs font-bold text-slate-700">
              {step === 1 && 'Basic Information'}
              {step === 2 && 'Select Your Trade'}
              {step === 3 && 'Services & Rates'}
              {step === 4 && 'Service Coverage Area'}
              {step === 5 && 'Experience & Bio'}
              {step === 6 && 'Verification Documents'}
              {step === 7 && 'Review & Submit'}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i + 1 === step
                    ? 'w-6 bg-amber-500'
                    : i + 1 < step
                    ? 'w-2 bg-[#004331]'
                    : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* STEP 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-[#004331]">
                <User className="w-5 h-5" />
                <h3 className="font-bold text-base text-slate-900">Personal Information</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name (as on CNIC)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dayanand Sharma / Imran Ali"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004331]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="0300-1234567"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004331]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">CNIC Number</label>
                    <input
                      type="text"
                      required
                      placeholder="41304-XXXXXXX-X"
                      value={formData.cnic}
                      onChange={(e) => handleChange('cnic', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004331]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Profession */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-[#004331]">
                <Wrench className="w-5 h-5" />
                <h3 className="font-bold text-base text-slate-900">Primary Profession</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {trades.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => handleChange('profession', t)}
                    className={`p-3 rounded-2xl border text-xs font-extrabold text-left transition-all flex items-center justify-between ${
                      formData.profession === t
                        ? 'bg-[#004331] text-white border-[#004331] shadow-md'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <span>{t}</span>
                    {formData.profession === t && <Check className="w-4 h-4 text-amber-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Services & Rates */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-[#004331]">
                <DollarSign className="w-5 h-5" />
                <h3 className="font-bold text-base text-slate-900">Services & Pricing</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Starting Service Inspection Fee (Rs.)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-sm font-bold text-slate-400">Rs.</span>
                    <input
                      type="number"
                      required
                      value={formData.startingPrice}
                      onChange={(e) => handleChange('startingPrice', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004331]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Service Specialty Description</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe what services you excel at (e.g., Inverter AC PCB repairs, plumbing pipe leak fittings)..."
                    value={formData.serviceDescription}
                    onChange={(e) => handleChange('serviceDescription', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004331]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Service Coverage Area */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-[#004331]">
                <MapPin className="w-5 h-5" />
                <h3 className="font-bold text-base text-slate-900">Hyderabad Service Area</h3>
              </div>

              <div className="space-y-2">
                {coverageAreas.map((area) => (
                  <button
                    type="button"
                    key={area}
                    onClick={() => handleChange('locality', area)}
                    className={`w-full p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-between transition-all ${
                      formData.locality === area
                        ? 'bg-[#004331] text-white border-[#004331] shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span>{area}</span>
                    {formData.locality === area && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Experience */}
          {step === 5 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-[#004331]">
                <Award className="w-5 h-5" />
                <h3 className="font-bold text-base text-slate-900">Experience & Qualifications</h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Years of Practical Work Experience</label>
                <select
                  value={formData.experienceYears}
                  onChange={(e) => handleChange('experienceYears', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 focus:outline-none"
                >
                  <option value="1">1 - 2 Years</option>
                  <option value="3">3 - 5 Years</option>
                  <option value="5">5 - 10 Years</option>
                  <option value="10">10+ Years (Senior Master Craftsman)</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 6: Verification Documents */}
          {step === 6 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-[#004331]">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-bold text-base text-slate-900">NADRA & Sindh Police Guild Verification</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleChange('cnicUploaded', !formData.cnicUploaded)}
                  className={`p-4 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center transition-all ${
                    formData.cnicUploaded
                      ? 'bg-emerald-50 border-emerald-600 text-[#004331]'
                      : 'bg-slate-50 border-slate-300 hover:border-slate-400 text-slate-600'
                  }`}
                >
                  <UploadCloud className="w-7 h-7 mb-1" />
                  <span className="font-extrabold text-xs">CNIC Front & Back</span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {formData.cnicUploaded ? '✓ Uploaded' : 'Click to Upload'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleChange('guildCertUploaded', !formData.guildCertUploaded)}
                  className={`p-4 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center transition-all ${
                    formData.guildCertUploaded
                      ? 'bg-emerald-50 border-emerald-600 text-[#004331]'
                      : 'bg-slate-50 border-slate-300 hover:border-slate-400 text-slate-600'
                  }`}
                >
                  <Award className="w-7 h-7 mb-1" />
                  <span className="font-extrabold text-xs">Guild Certificate (Optional)</span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {formData.guildCertUploaded ? '✓ Uploaded' : 'Click to Upload'}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 7: Review & Submit */}
          {step === 7 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-[#004331]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-extrabold text-sm text-slate-900">Application Summary</h3>
                </div>
                <div className="text-xs space-y-1 text-slate-700 font-medium">
                  <p><strong>Name:</strong> {formData.fullName || 'Dayanand Sharma'}</p>
                  <p><strong>Trade:</strong> {formData.profession}</p>
                  <p><strong>Coverage:</strong> {formData.locality}</p>
                  <p><strong>Starting Rate:</strong> Rs. {formData.startingPrice}</p>
                  <p><strong>Experience:</strong> {formData.experienceYears} Years</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-900 font-medium">
                  By submitting, your profile will be sent to the Sindh Craftsman Guild Verification Committee for CNIC and background check.
                </p>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            {step > 1 ? (
              <Button type="button" variant="outline" size="sm" onClick={handlePrev}>
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
            ) : (
              <div />
            )}

            {step < totalSteps ? (
              <Button type="button" variant="primary" size="sm" onClick={handleNext}>
                Next <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button type="submit" variant="primary" size="sm">
                Submit Application <CheckCircle2 className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
