import React, { useState } from 'react';
import { ProviderProfile, ServiceRequest } from '../../types/database.types';
import { X, Upload, Shield, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { bookingService } from '../../services/bookingService';
import { formatCurrency, sanitizeInput } from '../../lib/utils';

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
  const [step, setStep] = useState(1);
  const [notes, setNotes] = useState('');
  const [address, setAddress] = useState('House 42, Block C, Latifabad Unit 6, Hyderabad');
  const [urgency, setUrgency] = useState<'express' | 'today' | 'scheduled'>('express');
  const [timeSlot, setTimeSlot] = useState('Immediate Dispatch (ETA 18 mins)');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Service');
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);

  const extraUrgencyFee = urgency === 'express' ? 200 : 0;
  const estimatedCost = provider.starting_price + 800 + extraUrgencyFee;

  const handleConfirm = async () => {
    const newReq = await bookingService.createRequest({
      providerId: provider.id,
      kaarigarName: provider.name,
      serviceName: notes ? sanitizeInput(notes) : `${provider.profession} Diagnostic`,
      category: provider.category,
      description: notes ? sanitizeInput(notes) : 'Standard Inspection & Diagnostic',
      location: sanitizeInput(address),
      urgency,
      estimatedCost,
      paymentMethod
    });
    onSuccess(newReq);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-lg w-full border border-outline-variant/40 animate-fade-in space-y-5">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
          <div>
            <span className="text-[10px] font-bold text-outline uppercase tracking-wider">Step {step} of 4</span>
            <h3 className="font-headline font-bold text-lg text-on-surface">Book {provider.name}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-surface-container-low text-outline">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl">
              <img src={provider.avatar_url} alt={provider.name} className="w-12 h-12 rounded-full object-cover border border-primary/40" />
              <div>
                <h4 className="font-bold text-on-surface text-sm">{provider.name}</h4>
                <p className="text-xs text-on-surface-variant">{provider.profession} · <span className="text-primary font-semibold">Rs. {provider.starting_price} Base Fee</span></p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1">Describe the Issue</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g. Inverter AC compressor making buzzing noise, cooling reduced in main bedroom..."
                className="w-full p-3 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm focus:outline-none focus:border-primary text-on-surface"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1">Attach Photo / Video (Optional)</label>
              <div
                onClick={() => setUploadedPhoto('fault_area_photo.jpg')}
                className="border-2 border-dashed border-outline-variant/60 rounded-xl p-4 text-center hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                <Upload className="w-6 h-6 text-primary mx-auto" />
                <p className="text-xs text-on-surface-variant font-medium mt-1">Tap to upload picture of unit / fault area</p>
              </div>
              {uploadedPhoto && (
                <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 bg-primary text-white text-xs rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" /> Photo Attached
                </div>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1">Service Address (Hyderabad)</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm focus:outline-none focus:border-primary text-on-surface font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1">Dispatch Urgency</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setUrgency('express')}
                  className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${urgency === 'express' ? 'bg-primary-container/10 border-primary text-primary font-bold' : 'border-outline-variant text-on-surface'}`}
                >
                  <span className="text-xs uppercase tracking-wider">⚡ Express</span>
                  <span className="text-sm">&lt; 45 Mins Arrival</span>
                  <span className="text-[10px] text-tertiary font-semibold">+Rs. 200 Priority</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency('today')}
                  className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${urgency === 'today' ? 'bg-primary-container/10 border-primary text-primary font-bold' : 'border-outline-variant text-on-surface'}`}
                >
                  <span className="text-xs uppercase tracking-wider">📅 Today Afternoon</span>
                  <span className="text-sm">Flexible Window</span>
                  <span className="text-[10px] text-outline font-semibold">Standard Rate</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1">Select Time Slot</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full p-3 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm focus:outline-none focus:border-primary text-on-surface font-medium cursor-pointer"
              >
                <option value="Immediate Dispatch (ETA 18 mins)">Immediate Dispatch (ETA 18 mins)</option>
                <option value="Today: 4:00 PM - 5:00 PM">Today: 4:00 PM - 5:00 PM</option>
                <option value="Today: 6:00 PM - 7:00 PM">Today: 6:00 PM - 7:00 PM</option>
                <option value="Tomorrow Morning 10:00 AM">Tomorrow Morning 10:00 AM</option>
              </select>
            </div>

            <div className="p-3 bg-surface-container-low rounded-xl text-xs space-y-1 text-on-surface-variant">
              <p className="font-bold text-on-surface flex items-center gap-1">
                <Shield className="w-4 h-4 text-primary" /> Sindh Guild Protection Guarantee
              </p>
              <p>All service visits include NADRA identity verification, upfront rate card confirmation, and 7-day labor warranty.</p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="p-4 bg-surface-container-lowest border border-outline-variant/60 rounded-xl space-y-2 text-sm">
              <h4 className="font-bold text-on-surface border-b border-outline-variant/40 pb-2">Price Summary</h4>
              <div className="flex justify-between text-on-surface-variant text-xs">
                <span>Base Visit & Inspection Fee</span>
                <span className="font-mono">{formatCurrency(provider.starting_price)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant text-xs">
                <span>Labor & Fault Diagnosis</span>
                <span className="font-mono">{formatCurrency(800)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant text-xs">
                <span>Express Priority Fee</span>
                <span className="font-mono">{formatCurrency(extraUrgencyFee)}</span>
              </div>
              <div className="flex justify-between text-on-surface font-bold pt-2 border-t border-outline-variant/40 text-base">
                <span>Total Estimated Payable</span>
                <span className="text-primary font-mono">{formatCurrency(estimatedCost)}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1">Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                {['Cash on Service', 'JazzCash / EasyPaisa', 'Credit Card'].map(method => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold ${paymentMethod === method ? 'bg-primary-container/10 border-primary text-primary' : 'border-outline-variant text-on-surface'}`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-outline-variant/30">
          {step > 1 ? (
            <Button variant="outline" size="sm" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
          ) : <div></div>}

          {step < 4 ? (
            <Button variant="primary" size="sm" onClick={() => setStep(step + 1)}>
              Continue <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button variant="primary" size="md" onClick={handleConfirm}>
              Confirm & Dispatch <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
