import React, { useState } from 'react';
import { ShieldCheck, Zap, MapPin } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const ProviderDashboardPage: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [todayEarnings, setTodayEarnings] = useState(4200);

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-6">
      {/* Provider Header */}
      <div className="bg-white border border-outline-variant/40 rounded-2xl p-6 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80" alt="Tech" className="w-16 h-16 rounded-full object-cover border-2 border-primary shadow-md" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-xl text-on-surface">Imran Ali</h2>
              <span className="px-2 py-0.5 bg-primary-container/20 text-primary text-xs font-bold rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Sindh Guild SD-8821
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">Senior Electrician & Plumber · Latifabad Unit 6</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-outline">Today's Earnings</span>
            <div className="text-xl font-bold text-primary font-mono">Rs. {todayEarnings}</div>
          </div>
          <Button
            onClick={() => setIsOnline(!isOnline)}
            variant={isOnline ? 'primary' : 'outline'}
            size="md"
          >
            <span className={`w-2.5 h-2.5 rounded-full mr-2 ${isOnline ? 'bg-green-400 animate-ping' : 'bg-gray-400'}`}></span>
            {isOnline ? 'ONLINE - RECEIVING JOBS' : 'OFFLINE - PAUSED'}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-sm">
          <span className="text-xs font-bold text-outline uppercase">Jobs Today</span>
          <div className="text-2xl font-extrabold text-on-surface mt-1">4 Jobs</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-sm">
          <span className="text-xs font-bold text-outline uppercase">Rating</span>
          <div className="text-2xl font-extrabold text-tertiary mt-1">⭐ 4.9 / 5.0</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-sm">
          <span className="text-xs font-bold text-outline uppercase">Acceptance Rate</span>
          <div className="text-2xl font-extrabold text-primary mt-1">98.5%</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-sm">
          <span className="text-xs font-bold text-outline uppercase">Guild Tier</span>
          <div className="text-2xl font-extrabold text-secondary mt-1">Tier 1 Master</div>
        </div>
      </div>

      {/* Incoming Offers */}
      <div className="bg-white border border-outline-variant/40 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
          <h3 className="font-bold text-lg text-on-surface flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" /> Incoming Job Dispatches
          </h3>
          <span className="text-xs text-outline font-mono">Auto-Refresh Active</span>
        </div>

        <div className="p-4 bg-surface-container-low border border-outline-variant/40 rounded-xl flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-on-surface">AC Inverter PCB & Refrigerant Diagnostic</span>
              <span className="px-2 py-0.5 bg-tertiary/20 text-tertiary text-[10px] font-bold rounded">Express (&lt; 45 mins)</span>
            </div>
            <p className="text-xs text-on-surface-variant flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-primary" /> House 42, Block C, Latifabad Unit 6, Hyderabad
            </p>
            <p className="text-xs text-outline">Client: Shahid Mehmood (0301-5544332)</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-outline uppercase font-bold">Estimated Payout</span>
              <div className="text-base font-extrabold text-primary font-mono">Rs. 1,800</div>
            </div>
            <Button
              onClick={() => {
                setTodayEarnings(todayEarnings + 1800);
                alert('Job Accepted! Customer notified of your arrival ETA (14 mins).');
              }}
              variant="primary"
              size="sm"
            >
              Accept Job
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
