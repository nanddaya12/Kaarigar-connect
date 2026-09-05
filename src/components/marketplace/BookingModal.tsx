import React, { useEffect, useRef, useState } from 'react';
import { ProviderProfile, ServiceRequest } from '../../types/database.types';
import { 
  X, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Upload, 
  Calendar, 
  FileText, 
  Zap, 
  AlertCircle,
  Phone
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { bookingService } from '../../services/bookingService';

interface BookingModalProps {
  provider: ProviderProfile;
  onClose: () => void;
  onSuccess: (request: ServiceRequest) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  provider,
  onClose,
  onSuccess,
}) => {
  const { locality } = useAuth();
  const [step, setStep] = useState<number>(1);
  const [selectedSkill, setSelectedSkill] = useState<string>(provider.skills[0] || 'General Maintenance');
  const [problemDescription, setProblemDescription] = useState<string>('');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [customDate, setCustomDate] = useState<string>('');
  const [sectorAddress, setSectorAddress] = useState<string>(`House/Plot, Street 4, ${locality}`);
  const [preferredDate, setPreferredDate] = useState<string>('Today Afternoon');
  const [preferredTime, setPreferredTime] = useState<string>('02:00 PM - 04:00 PM');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'easypaisa' | 'jazzcash'>('cod');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createdRequest, setCreatedRequest] = useState<ServiceRequest | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const photoInputRef = useRef<HTMLInputElement>(null);
  const photoObjectUrls = useRef<string[]>([]);

  useEffect(() => () => {
    photoObjectUrls.current.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  const validateCurrentStep = (): boolean => {
    setErrorMessage('');
    if (step === 2) {
      if (!problemDescription || problemDescription.trim().length < 10) {
        setErrorMessage('Please describe the problem in at least 10 characters (e.g. AC cooling trip issue).');
        return false;
      }
    }
    if (step === 4) {
      if (!sectorAddress || sectorAddress.trim().length < 5) {
        setErrorMessage('Please provide a valid doorstep street & house address.');
        return false;
      }
    }
    if (step === 5 && preferredDate === 'Choose a date' && !customDate) {
      setErrorMessage('Please choose a date for your service request.');
      return false;
    }
    return true;
  };

  const handlePhotosSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const invalidFile = files.find((file) => !file.type.startsWith('image/') || file.size > 10 * 1024 * 1024);

    if (invalidFile) {
      setErrorMessage('Please choose image files under 10 MB.');
      event.target.value = '';
      return;
    }

    const remainingSlots = Math.max(0, 3 - uploadedPhotos.length);
    const newUrls = files.slice(0, remainingSlots).map((file) => URL.createObjectURL(file));
    photoObjectUrls.current.push(...newUrls);
    setUploadedPhotos((current) => [...current, ...newUrls]);
    setErrorMessage('');
    event.target.value = '';
  };

  const removePhoto = (photoUrl: string) => {
    URL.revokeObjectURL(photoUrl);
    photoObjectUrls.current = photoObjectUrls.current.filter((url) => url !== photoUrl);
    setUploadedPhotos((current) => current.filter((url) => url !== photoUrl));
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setErrorMessage('');
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    try {
      const newReq = await bookingService.createRequest({
        customer_id: 'cust-101',
        provider_id: provider.id,
        kaarigar_name: provider.name,
        category: provider.category,
        service_title: `${selectedSkill} - ${provider.name}`,
        problem_description: problemDescription || 'Emergency doorstep repair request',
        photos: uploadedPhotos,
        location_address: sectorAddress,
        preferred_date: preferredDate === 'Choose a date' && customDate ? customDate : preferredDate,
        preferred_time: preferredTime,
        payment_method: paymentMethod,
        budget: provider.starting_price + 300,
        urgency: preferredDate.includes('Express') ? 'express' : preferredDate.includes('Today') ? 'today' : 'scheduled',
      });
      setCreatedRequest(newReq);
      setStep(7); // Success step
    } catch (err) {
      console.error(err);
      setErrorMessage('We could not create your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl max-w-xl w-full space-y-6 relative my-8">
        
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <img src={provider.avatar_url} alt={provider.name} className="w-10 h-10 rounded-2xl object-cover ring-2 ring-[#004331]/20" />
            <div>
              <h3 className="font-headline font-extrabold text-base text-slate-900 leading-tight">Request Service</h3>
              <p className="text-xs text-slate-500 font-medium">{provider.name} · {provider.profession}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Stepper (Steps 1 to 6) */}
        {step < 7 && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span className="text-[#004331]">Step {step} of 6</span>
              <span>
                {step === 1 && 'Select Service'}
                {step === 2 && 'Describe Issue'}
                {step === 3 && 'Upload Photos'}
                {step === 4 && 'Address Location'}
                {step === 5 && 'Date & Time'}
                {step === 6 && 'Review & Confirm'}
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#004331] transition-all duration-300 rounded-full"
                style={{ width: `${(step / 6) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* STEP 1: Select Skill */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="font-headline font-extrabold text-sm text-slate-900">Step 1: Choose Service Skill Needed</h4>
            <div className="space-y-2">
              {provider.skills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => setSelectedSkill(skill)}
                  className={`w-full text-left p-3.5 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between ${
                    selectedSkill === skill
                      ? 'bg-emerald-50 text-[#004331] border-[#004331] shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{skill}</span>
                  {selectedSkill === skill && <CheckCircle2 className="w-4 h-4 text-[#004331]" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Describe Issue */}
        {step === 2 && (
          <div className="space-y-4">
            <h4 className="font-headline font-extrabold text-sm text-slate-900">Step 2: Describe What Needs Fixing *</h4>
            <div className="space-y-2">
              <textarea
                rows={4}
                value={problemDescription}
                onChange={(e) => {
                  setProblemDescription(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Example: AC inverter PCB unit trip in peak heat, gas leakage test needed..."
                className={`w-full p-3.5 bg-slate-50 border rounded-2xl text-xs font-medium text-slate-900 focus:outline-none ${
                  errorMessage ? 'border-red-500 ring-2 ring-red-200' : 'border-slate-200 focus:ring-2 focus:ring-[#004331]'
                }`}
              ></textarea>
              {errorMessage ? (
                <p className="text-xs font-bold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errorMessage}
                </p>
              ) : (
                <p className="text-[11px] text-slate-400 font-medium">Be as specific as possible so the craftsman brings exact tools.</p>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: Photos Upload */}
        {step === 3 && (
          <div className="space-y-4">
            <h4 className="font-headline font-extrabold text-sm text-slate-900">Step 3: Upload Optional Photos</h4>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              multiple
              className="sr-only"
              onChange={handlePhotosSelected}
            />
            <button
              type="button"
              onClick={() => photoInputRef.current?.click()}
              className="w-full p-6 border-2 border-dashed border-slate-200 hover:border-[#004331] rounded-2xl bg-slate-50 text-center space-y-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#004331]"
            >
              <Upload className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-xs font-bold text-slate-700">Add photos of the problem area</p>
              <p className="text-[10px] text-slate-400">Up to 3 JPG, PNG, or WebP images · 10 MB each</p>
            </button>
            {uploadedPhotos.length > 0 && (
              <div className="grid grid-cols-3 gap-2" aria-label={`${uploadedPhotos.length} selected photos`}>
                {uploadedPhotos.map((photoUrl, index) => (
                  <div key={photoUrl} className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                    <img src={photoUrl} alt={`Selected problem photo ${index + 1}`} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(photoUrl)}
                      className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-slate-900/80 text-white hover:bg-slate-900"
                      aria-label={`Remove photo ${index + 1}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errorMessage && (
              <p className="text-xs font-bold text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errorMessage}
              </p>
            )}
          </div>
        )}

        {/* STEP 4: Address Location */}
        {step === 4 && (
          <div className="space-y-4">
            <h4 className="font-headline font-extrabold text-sm text-slate-900">Step 4: Confirm Doorstep Location *</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-[#004331]">
                <MapPin className="w-4 h-4" />
                <span>Sector: {locality}</span>
              </div>
              <input
                type="text"
                value={sectorAddress}
                onChange={(e) => {
                  setSectorAddress(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="House/Plot number, Street address..."
                className={`w-full p-3 bg-slate-50 border rounded-xl text-xs font-bold text-slate-900 focus:outline-none ${
                  errorMessage ? 'border-red-500 ring-2 ring-red-200' : 'border-slate-200'
                }`}
              />
              {errorMessage && (
                <p className="text-xs font-bold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errorMessage}
                </p>
              )}
            </div>
          </div>
        )}

        {/* STEP 5: Date and Time */}
        {step === 5 && (
          <div className="space-y-4">
            <h4 className="font-headline font-extrabold text-sm text-slate-900">Step 5: Select Preferred Schedule</h4>
            <div className="grid grid-cols-2 gap-3">
              {['Today Express (< 30 Mins)', 'Today Afternoon', 'Tomorrow Morning', 'Choose a date'].map((d) => (
                <button
                  key={d}
                  onClick={() => setPreferredDate(d)}
                  className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all ${
                    preferredDate === d
                      ? 'bg-emerald-50 text-[#004331] border-[#004331]'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
            {preferredDate === 'Choose a date' && (
              <label className="block space-y-1.5">
                <span className="text-[11px] font-extrabold text-slate-500 uppercase">Service date</span>
                <input
                  type="date"
                  value={customDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(event) => {
                    setCustomDate(event.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004331]"
                />
              </label>
            )}
            <div className="space-y-1.5">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase">Arrival window</span>
              <div className="grid grid-cols-2 gap-2">
                {['10:00 AM - 12:00 PM', '02:00 PM - 04:00 PM', '05:00 PM - 07:00 PM', '07:00 PM - 09:00 PM'].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setPreferredTime(time)}
                    className={`rounded-xl border p-2.5 text-xs font-bold transition-colors ${
                      preferredTime === time
                        ? 'border-[#004331] bg-emerald-50 text-[#004331]'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            {errorMessage && (
              <p className="text-xs font-bold text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errorMessage}
              </p>
            )}
          </div>
        )}

        {/* STEP 6: Review & Price Summary */}
        {step === 6 && (
          <div className="space-y-4">
            <h4 className="font-headline font-extrabold text-sm text-slate-900">Step 6: Review Order & Pricing</h4>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Service Trade:</span>
                <span className="font-bold text-slate-900">{selectedSkill}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Base Visit Rate:</span>
                <span className="font-bold text-slate-900">Rs. {provider.starting_price}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Estimated Labor:</span>
                <span className="font-bold text-slate-900">Rs. 300</span>
              </div>
              <div className="flex justify-between py-1 pt-2 text-sm font-extrabold text-[#004331]">
                <span>Total Estimated Cost:</span>
                <span>Rs. {provider.starting_price + 300}</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">This is an estimate. Any additional parts will be explained and approved before work begins.</p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase">Payment Method</span>
              <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                {(['cod', 'easypaisa', 'jazzcash'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setPaymentMethod(m)}
                    className={`p-2.5 rounded-xl border uppercase transition-all ${
                      paymentMethod === m
                        ? 'bg-[#004331] text-white border-[#004331]'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            {errorMessage && (
              <p className="text-xs font-bold text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errorMessage}
              </p>
            )}
          </div>
        )}

        {/* STEP 7: SUCCESS STEP */}
        {step === 7 && createdRequest && (
          <div className="text-center py-4 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#004331] flex items-center justify-center mx-auto shadow-md animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="font-headline font-extrabold text-xl text-slate-900">Service Request Confirmed!</h3>
              <p className="text-xs text-slate-500 font-medium">Your order has been assigned to {provider.name}</p>
            </div>

            {/* Doorstep PIN Card */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 max-w-sm mx-auto space-y-1">
              <span className="text-[10px] font-extrabold text-amber-900 uppercase tracking-widest">Doorstep Security PIN</span>
              <p className="font-mono font-extrabold text-3xl text-amber-950 tracking-widest">#{createdRequest.safety_pin}</p>
              <p className="text-[11px] text-amber-900 font-medium">Verify this PIN before letting technician inside.</p>
            </div>

            <button
              onClick={() => {
                onSuccess(createdRequest);
              }}
              className="w-full py-3 rounded-2xl bg-[#004331] text-white font-extrabold text-xs shadow-md"
            >
              Track Live Order Status
            </button>
          </div>
        )}

        {/* Bottom Modal Navigation Action Bar */}
        {step < 7 && (
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {step > 1 ? (
              <button
                onClick={handlePrevStep}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div></div>}

            {step < 6 ? (
              <button
                onClick={handleNextStep}
                className="px-5 py-2.5 rounded-xl bg-[#004331] hover:bg-[#0d5c46] text-white font-extrabold text-xs flex items-center gap-1 transition-colors shadow-xs"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleConfirmBooking}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1.5 transition-colors shadow-md"
              >
                <span>{isSubmitting ? 'Submitting...' : 'Confirm Request'}</span>
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
