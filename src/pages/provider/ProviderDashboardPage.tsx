import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Zap, 
  MapPin, 
  Inbox, 
  Briefcase, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Wallet,
  Phone,
  User,
  Power
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

interface ProviderDashboardPageProps {
  activeTab?: string;
}

export const ProviderDashboardPage: React.FC<ProviderDashboardPageProps> = ({ activeTab = 'provider' }) => {
  const { showToast } = useToast();
  const [isOnline, setIsOnline] = useState(true);
  const [todayEarnings, setTodayEarnings] = useState(4200);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('3500');
  const [withdrawMethod, setWithdrawMethod] = useState<'jazzcash' | 'easypaisa' | 'bank'>('jazzcash');

  // Distinct incoming requests list (Phase 1 Item 5)
  const [incomingRequests, setIncomingRequests] = useState([
    {
      id: 'req-1',
      title: 'AC Inverter PCB & Refrigerant Diagnostic',
      address: 'House 42, Block C, Latifabad Unit 6',
      client: 'Shahid Mehmood',
      phone: '0301-5544332',
      payout: 1800,
      badge: 'Express (< 45 mins)',
      time: '10 Mins Ago'
    },
    {
      id: 'req-2',
      title: 'Kitchen Pipe Leak & Basin Trap Fitting',
      address: 'Plot 18, Phase 1, Qasimabad',
      client: 'Zainab Bibi',
      phone: '0333-8877665',
      payout: 1200,
      badge: 'Today Afternoon',
      time: '25 Mins Ago'
    }
  ]);

  // Distinct active in-progress jobs list (Phase 1 Item 5)
  const [activeJobs, setActiveJobs] = useState([
    {
      id: 'job-101',
      title: 'Main Electrical Breaker Trip & Short Circuit Repair',
      address: 'House 112, Street 4, Latifabad Unit 6',
      client: 'Rashid Khan',
      phone: '0302-9988776',
      payout: 2500,
      status: 'in_progress',
      pin: '8942'
    }
  ]);

  const handleAcceptJob = (reqId: string, payout: number, title: string) => {
    setIncomingRequests(incomingRequests.filter((r) => r.id !== reqId));
    setTodayEarnings((prev) => prev + payout);
    showToast(
      'Job Accepted!',
      `Accepted: ${title}. Customer notified of your arrival ETA (14 mins).`,
      'success'
    );
  };

  const handleDeclineJob = (reqId: string, title: string) => {
    setIncomingRequests(incomingRequests.filter((r) => r.id !== reqId));
    showToast('Job Declined', `Request for ${title} passed to next available technician.`, 'info');
  };

  const handleUpdateJobStatus = (jobId: string, newStatus: string) => {
    setActiveJobs(
      activeJobs.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j))
    );
    showToast('Job Status Updated', `Job #${jobId} status is now ${newStatus.replace('_', ' ').toUpperCase()}`, 'success');
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawModalOpen(false);
    showToast(
      'Payout Request Submitted!',
      `Rs. ${withdrawAmount} requested via ${withdrawMethod.toUpperCase()}. Funds arrive in 15-30 minutes.`,
      'success'
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-6 px-4 sm:px-6">
      {/* Provider Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80"
            alt="Imran Ali"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#004331] shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline font-extrabold text-xl text-slate-900">Imran Ali</h2>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-[#004331] text-xs font-bold rounded-full flex items-center gap-1 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Sindh Guild SD-8821
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Senior Electrician & Plumber · Latifabad Unit 6
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] uppercase font-extrabold text-slate-400">Today's Total Earnings</span>
            <div className="text-2xl font-extrabold text-[#004331] font-mono">Rs. {todayEarnings}</div>
          </div>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 border shadow-sm ${
              isOnline
                ? 'bg-[#004331] text-amber-400 border-[#004331]'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <Power className={`w-4 h-4 ${isOnline ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
            <span>{isOnline ? 'ONLINE - RECEIVING DISPATCHES' : 'OFFLINE - PAUSED'}</span>
          </button>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase">Jobs Completed Today</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">4 Jobs</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase">Craftsman Rating</span>
          <div className="text-2xl font-extrabold text-amber-500 mt-1">⭐ 4.9 / 5.0</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase">Acceptance Rate</span>
          <div className="text-2xl font-extrabold text-[#004331] mt-1">98.5%</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase">Guild Tier</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">Tier 1 Master</div>
        </div>
      </div>

      {/* VIEW TAB 1: INCOMING REQUESTS TAB */}
      {(activeTab === 'provider' || activeTab === 'provider_requests') && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" /> Incoming Job Dispatches ({incomingRequests.length})
            </h3>
            <span className="text-xs font-bold text-slate-400">Realtime Dispatch Listener Active</span>
          </div>

          {incomingRequests.length > 0 ? (
            <div className="space-y-3">
              {incomingRequests.map((r) => (
                <div key={r.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900">{r.title}</span>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-extrabold rounded-full">
                        {r.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" /> {r.address}
                    </p>
                    <p className="text-[11px] text-slate-400">Client: {r.client} ({r.phone}) · {r.time}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-extrabold">Payout</span>
                      <div className="text-base font-extrabold text-[#004331] font-mono">Rs. {r.payout}</div>
                    </div>
                    <Button variant="primary" size="sm" onClick={() => handleAcceptJob(r.id, r.payout, r.title)}>
                      Accept Job
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeclineJob(r.id, r.title)}>
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-400 font-medium">
              No new pending dispatches at this moment. Stay online to receive instant sector calls!
            </div>
          )}
        </div>
      )}

      {/* VIEW TAB 2: ACTIVE JOBS TAB */}
      {(activeTab === 'provider_jobs' || activeTab === 'provider') && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#004331]" /> Active In-Progress Jobs ({activeJobs.length})
            </h3>
            <span className="text-xs font-bold text-emerald-800">Assigned & Doorstep En Route</span>
          </div>

          <div className="space-y-3">
            {activeJobs.map((j) => (
              <div key={j.id} className="p-4 bg-[#004331] text-white rounded-2xl space-y-3 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800 pb-2">
                  <div>
                    <h4 className="font-extrabold text-sm text-white">{j.title}</h4>
                    <p className="text-xs text-emerald-200 font-medium flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" /> {j.address}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-300 uppercase font-bold">Estimated Payout</span>
                    <p className="font-mono font-extrabold text-base text-amber-400">Rs. {j.payout}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="bg-white/10 px-2.5 py-1 rounded-xl text-white font-mono">PIN: #{j.pin}</span>
                    <span>Client: <strong>{j.client}</strong> ({j.phone})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {j.status === 'in_progress' ? (
                      <button
                        onClick={() => handleUpdateJobStatus(j.id, 'completed')}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-sm flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-4 h-4 text-slate-950" /> Mark Completed
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-300 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Completed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW TAB 3: EARNINGS & WITHDRAWAL TAB */}
      {(activeTab === 'provider_earnings') && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#004331]" /> Earnings & Payout Wallet
              </h3>
              <p className="text-xs text-slate-500 font-medium">Daily income summary and instant mobile wallet withdrawals.</p>
            </div>
            <button
              onClick={() => setWithdrawModalOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Wallet className="w-4 h-4" /> Withdraw Earnings
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-[10px] font-extrabold text-emerald-800 uppercase">Available Payout Balance</span>
              <p className="font-mono font-extrabold text-3xl text-[#004331]">Rs. {todayEarnings}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase">This Week Total</span>
              <p className="font-mono font-extrabold text-2xl text-slate-900">Rs. 24,500</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase">Completed Jobs</span>
              <p className="font-mono font-extrabold text-2xl text-slate-900">18 Jobs</p>
            </div>
          </div>
        </div>
      )}

      {/* WITHDRAWAL MODAL */}
      {withdrawModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-[#004331]" /> Withdraw Earnings
              </h3>
              <button onClick={() => setWithdrawModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Withdrawal Amount (Rs.)</label>
                <input
                  type="number"
                  required
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Payout Account</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['jazzcash', 'easypaisa', 'bank'] as const).map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setWithdrawMethod(m)}
                      className={`p-2.5 rounded-xl border text-xs font-bold uppercase ${
                        withdrawMethod === m
                          ? 'bg-[#004331] text-white border-[#004331]'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#004331] text-white font-extrabold text-xs shadow-md"
              >
                Confirm Payout Transfer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
