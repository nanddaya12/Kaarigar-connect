import React, { useState } from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Users, 
  Wrench, 
  Grid, 
  Star, 
  AlertTriangle, 
  Search, 
  DollarSign,
  TrendingUp,
  Plus
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';

interface AdminDashboardPageProps {
  activeTab?: string;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ activeTab = 'admin' }) => {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  // Analytics Chart Data
  const revenueTrendData = [
    { day: 'Mon', jobs: 24, revenue: 38000 },
    { day: 'Tue', jobs: 32, revenue: 49000 },
    { day: 'Wed', jobs: 28, revenue: 42000 },
    { day: 'Thu', jobs: 40, revenue: 64000 },
    { day: 'Fri', jobs: 45, revenue: 72000 },
    { day: 'Sat', jobs: 52, revenue: 89000 },
    { day: 'Sun', jobs: 38, revenue: 58000 },
  ];

  // Mock Verification Queue
  const [providers, setProviders] = useState([
    { id: '1', name: 'Imran Ali', profession: 'Senior Electrician', status: 'verified', badge: 'SD-8821', cnic: '41304-1234567-1', locality: 'Latifabad Unit 6' },
    { id: '2', name: 'Master Tariq', profession: 'HVAC Specialist', status: 'verified', badge: 'SD-9102', cnic: '41304-9876543-3', locality: 'Qasimabad Phase 1' },
    { id: '3', name: 'Asif Carpenter', profession: 'Cabinet Specialist', status: 'pending', badge: 'SD-9941', cnic: '41304-5544332-9', locality: 'Saddar Bazaar' },
    { id: '4', name: 'Kamran Solar', profession: 'Solar Inverter Installer', status: 'pending', badge: 'SD-9952', cnic: '41304-1122334-5', locality: 'Auto Bhan Road' }
  ]);

  // Mock Users
  const [users, setUsers] = useState([
    { id: 'u1', name: 'Dayanand Sharma', email: 'nanddaya12@github.com', role: 'customer', status: 'active', dateJoined: '2026-01-15' },
    { id: 'u2', name: 'Imran Ali', email: 'imran.electrician@gmail.com', role: 'provider', status: 'active', dateJoined: '2025-11-20' },
    { id: 'u3', name: 'Shahid Mehmood', email: 'shahid.hyderabad@gmail.com', role: 'customer', status: 'active', dateJoined: '2026-02-04' },
    { id: 'u4', name: 'Master Tariq', email: 'tariq.hvac@gmail.com', role: 'provider', status: 'active', dateJoined: '2025-08-12' }
  ]);

  // Mock Categories
  const [categories] = useState([
    { id: 'c1', name: 'Electrician', icon: '⚡', baseRate: 1500, activeCount: 18 },
    { id: 'c2', name: 'Plumber', icon: '🚰', baseRate: 1200, activeCount: 14 },
    { id: 'c3', name: 'AC Technician', icon: '❄️', baseRate: 1800, activeCount: 22 },
    { id: 'c4', name: 'Car Mechanic', icon: '🚗', baseRate: 2000, activeCount: 9 },
    { id: 'c5', name: 'Bike Mechanic', icon: '🏍️', baseRate: 800, activeCount: 11 }
  ]);

  // Mock Reviews
  const [reviews] = useState([
    { id: 'r1', customer: 'Shahid Mehmood', provider: 'Imran Ali', rating: 5, text: 'Arrived within 15 mins in Latifabad. Excellent PCB repair!', date: 'Today' },
    { id: 'r2', customer: 'Zainab Bibi', provider: 'Master Tariq', rating: 5, text: 'Very professional HVAC gas refill service.', date: 'Yesterday' }
  ]);

  const handleVerify = (id: string, name: string) => {
    setProviders(providers.map(p => p.id === id ? { ...p, status: 'verified' } : p));
    showToast(`Badge Approved`, `${name} is now verified under Sindh Guild SD-9941`, 'success');
  };

  const handleReject = (id: string, name: string) => {
    setProviders(providers.filter(p => p.id !== id));
    showToast(`Application Rejected`, `Notification sent to ${name}`, 'error');
  };

  const handleToggleUser = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
    showToast(`User Status Updated`, `Account is now ${newStatus}`, 'info');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-6 px-4 sm:px-6">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#004331] text-amber-400 flex items-center justify-center font-bold shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-headline font-extrabold text-2xl text-slate-900">
                Admin Oversight & Analytics Console
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                NADRA CNIC verification, Sindh Guild accreditation, and platform revenue metrics for Hyderabad.
              </p>
            </div>
          </div>
          <span className="px-3.5 py-1.5 bg-emerald-50 text-[#004331] border border-emerald-200 text-xs font-extrabold rounded-full">
            Guild Division: Hyderabad Sindh
          </span>
        </div>

        {/* Metric Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase">Verified Members</span>
            <p className="font-headline font-extrabold text-xl text-[#004331]">
              {providers.filter(p => p.status === 'verified').length} Active
            </p>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase">Pending Audits</span>
            <p className="font-headline font-extrabold text-xl text-amber-600">
              {providers.filter(p => p.status === 'pending').length} Requests
            </p>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase">Weekly Revenue</span>
            <p className="font-headline font-extrabold text-xl text-slate-900 font-mono">Rs. 412,000</p>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase">Platform Rating</span>
            <p className="font-headline font-extrabold text-xl text-amber-500">★ 4.9 / 5.0</p>
          </div>
        </div>
      </div>

      {/* OVERVIEW ANALYTICS CHARTS (Phase 5 Item 9) */}
      {activeTab === 'admin' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#004331]" /> Weekly Revenue Trend (Rs.)
              </h3>
              <span className="text-xs font-bold text-emerald-800">Hyderabad Sectors</span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueTrendData}>
                  <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#0f172a', color: '#fff', borderRadius: '12px' }} />
                  <Bar dataKey="revenue" fill="#004331" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-amber-500" /> Daily Jobs Dispatched
              </h3>
              <span className="text-xs font-bold text-slate-400">Past 7 Days</span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueTrendData}>
                  <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip contentStyle={{ background: '#0f172a', color: '#fff', borderRadius: '12px' }} />
                  <Line type="monotone" dataKey="jobs" stroke="#d97706" strokeWidth={3} dot={{ r: 5, fill: '#d97706' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* VERIFICATION QUEUE TAB */}
      {(activeTab === 'admin' || activeTab === 'admin_verification') && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#004331]" /> Verification Queue
            </h3>
            <span className="text-xs font-bold text-slate-500">NADRA CNIC + Sindh Guild Accreditation</span>
          </div>

          <div className="space-y-3">
            {providers.map((p) => (
              <div key={p.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900">{p.name}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded ${
                      p.status === 'verified' ? 'bg-emerald-100 text-[#004331]' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {p.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {p.profession} · CNIC: {p.cnic} · {p.locality}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {p.status === 'pending' ? (
                    <>
                      <Button variant="primary" size="sm" onClick={() => handleVerify(p.id, p.name)}>
                        <CheckCircle2 className="w-4 h-4 mr-1" /> Approve Badge
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleReject(p.id, p.name)}>
                        <XCircle className="w-4 h-4 mr-1" /> Reject
                      </Button>
                    </>
                  ) : (
                    <span className="text-xs text-[#004331] font-extrabold flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4" /> Guild Badge {p.badge} Active
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* USERS TAB */}
      {activeTab === 'admin_users' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#004331]" /> Registered Platform Users
            </h3>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search user name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-extrabold uppercase">
                  <th className="pb-3 px-2">User Name</th>
                  <th className="pb-3 px-2">Email</th>
                  <th className="pb-3 px-2">Role</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {users
                  .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="py-3 px-2 font-bold text-slate-900">{u.name}</td>
                      <td className="py-3 px-2 text-slate-600">{u.email}</td>
                      <td className="py-3 px-2 capitalize font-bold text-[#004331]">{u.role}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          u.status === 'active' ? 'bg-emerald-100 text-[#004331]' : 'bg-red-100 text-red-800'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <button
                          onClick={() => handleToggleUser(u.id, u.status)}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        >
                          {u.status === 'active' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PROVIDERS TAB */}
      {activeTab === 'admin_providers' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#004331]" /> Active Guild Craftsmen Directory
            </h3>
            <span className="text-xs font-bold text-emerald-800">Hyderabad Sindh Division</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {providers.map((p) => (
              <div key={p.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-slate-900">{p.name}</span>
                  <span className="text-xs font-mono font-bold text-[#004331] bg-emerald-50 px-2 py-0.5 rounded">
                    {p.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">{p.profession} · {p.locality}</p>
                <div className="text-[11px] text-slate-400 font-medium">CNIC: {p.cnic}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
