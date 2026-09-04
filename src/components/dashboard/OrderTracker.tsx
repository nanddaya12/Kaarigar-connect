import React from 'react';
import { ServiceRequest, RequestStatus } from '../../types/database.types';
import { Phone, AlertTriangle, ShieldCheck, CheckCircle2, Bike, Wrench, FileCheck, DoorOpen } from 'lucide-react';
import { Button } from '../ui/Button';
import { useToast } from '../../context/ToastContext';

interface OrderTrackerProps {
  request: ServiceRequest;
  onUpdateStatus?: (status: RequestStatus) => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ request, onUpdateStatus }) => {
  const { showToast } = useToast();

  const steps = [
    { key: 'requested', label: 'Dispatched', icon: FileCheck },
    { key: 'on_the_way', label: 'En Route', icon: Bike },
    { key: 'accepted', label: 'At Doorstep', icon: DoorOpen },
    { key: 'in_progress', label: 'In Progress', icon: Wrench },
    { key: 'completed', label: 'Completed', icon: CheckCircle2 }
  ];

  const currentIdx = steps.findIndex(s => s.key === request.status);

  const handleSos = () => {
    showToast(
      `🚨 Emergency SOS Alert Dispatched!`,
      `Saddar Police Division & Sindh Guild Security notified for Order #${request.id}.`,
      'error'
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Tracker Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#004331] text-xs font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            LIVE DISPATCH TRACKER · ORDER #{request.id}
          </div>
          <h2 className="font-headline font-bold text-xl text-slate-900">{request.service_name}</h2>
          <p className="text-xs text-slate-500">{request.customer_address}</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="tel:03008392019">
            <Button variant="primary" size="sm">
              <Phone className="w-4 h-4 mr-1.5" /> Call Technician
            </Button>
          </a>
          <Button variant="danger" size="sm" onClick={handleSos}>
            <AlertTriangle className="w-4 h-4 mr-1" /> Emergency SOS
          </Button>
        </div>
      </div>

      {/* Timeline Cards */}
      <div className="grid grid-cols-5 gap-2 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isDone = idx <= currentIdx;
          const isCurrent = idx === currentIdx;
          return (
            <div key={s.key} className={`flex flex-col items-center gap-1 ${isCurrent ? 'scale-105' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${isDone ? 'bg-[#004331] text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[11px] font-bold ${isDone ? 'text-[#004331]' : 'text-slate-400'}`}>{s.label}</span>
            </div>
          );
        })}
      </div>

      {/* Main Section: Live Map + Doorstep PIN Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Live Map Animation */}
        <div className="lg:col-span-7 bg-[#1a2636] h-[380px] rounded-2xl relative overflow-hidden shadow-inner border border-slate-700 flex flex-col justify-between p-4">
          <div className="absolute inset-0 bg-[radial-gradient(#2d3d54_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
            <div className="px-3 py-1 bg-[#004331] text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
              <Bike className="w-3.5 h-3.5" />
              {request.kaarigar_name || 'Imran Ali'} ({request.eta_minutes} Mins)
            </div>
            <div className="w-3 h-3 bg-[#004331] transform rotate-45 -mt-1"></div>
          </div>

          <div className="relative z-10 flex justify-between items-start">
            <span className="px-3 py-1 bg-white/90 text-slate-900 text-xs font-bold rounded-lg backdrop-blur-xs">
              Sector: Latifabad Unit 6
            </span>
            <span className="px-3 py-1 bg-white/90 text-[#004331] text-xs font-bold rounded-lg backdrop-blur-xs">
              GPS Signal: Strong
            </span>
          </div>

          <div className="relative z-10 bg-white/90 backdrop-blur-md p-3 rounded-xl flex items-center justify-between text-xs text-slate-900">
            <span>Estimated Arrival: <strong className="text-[#004331] font-bold">{request.eta_minutes} Mins</strong></span>
            <span className="text-slate-500">Live Telemetry Synchronized</span>
          </div>
        </div>

        {/* Doorstep Safety PIN & Technician Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#004331] text-white p-6 rounded-2xl shadow-xl space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold opacity-90">Doorstep Safety Verification</span>
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-xs opacity-80">Show this PIN to technician before granting entry:</p>
              <div className="text-4xl font-mono font-extrabold tracking-widest mt-1 bg-white/20 py-2 px-4 rounded-xl text-center shadow-inner text-amber-300">
                #{request.safety_pin}
              </div>
            </div>
            <p className="text-[11px] opacity-75">Matches NADRA CNIC Record: SD-8821</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80" alt="Tech" className="w-12 h-12 rounded-full object-cover border-2 border-[#004331]" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{request.kaarigar_name || 'Imran Ali'}</h4>
                <p className="text-xs text-slate-500">Senior Electrician & Plumber</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#004331] bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                  ✓ Sindh Guild Badge SD-8821
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Payment Method:</span>
              <strong className="text-slate-900 uppercase">{request.payment_method}</strong>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Total Payable:</span>
              <strong className="text-[#004331] font-mono text-sm">Rs. {request.estimated_cost}</strong>
            </div>

            {onUpdateStatus && (
              <div className="pt-3 border-t border-slate-100 space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Demo Status Simulator</label>
                <div className="flex flex-wrap gap-1">
                  <button onClick={() => onUpdateStatus('on_the_way')} className="px-2 py-1 bg-slate-100 text-slate-800 text-[10px] font-bold rounded hover:bg-slate-200">En Route</button>
                  <button onClick={() => onUpdateStatus('accepted')} className="px-2 py-1 bg-slate-100 text-slate-800 text-[10px] font-bold rounded hover:bg-slate-200">Arrived</button>
                  <button onClick={() => onUpdateStatus('in_progress')} className="px-2 py-1 bg-slate-100 text-slate-800 text-[10px] font-bold rounded hover:bg-slate-200">Work Started</button>
                  <button onClick={() => onUpdateStatus('completed')} className="px-2 py-1 bg-[#004331] text-white text-[10px] font-bold rounded">Completed</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
