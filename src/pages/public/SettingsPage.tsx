import React, { useState } from 'react';
import { User, Bell, Shield, MapPin, Check, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';

export const SettingsPage: React.FC = () => {
  const { user, locality, setLocality } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [selectedLocality, setSelectedLocality] = useState(locality);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [smsAlertsEnabled, setSmsAlertsEnabled] = useState(true);

  const coverageCorridors = [
    'Latifabad Unit 6',
    'Qasimabad Phase 1',
    'Auto Bhan Road',
    'Saddar Bazaar & Cantt',
    'Citizen Colony'
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLocality(selectedLocality);
    showToast('Settings Saved', 'Your account and notification preferences have been updated.', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-6 px-4 sm:px-6 animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="font-headline font-extrabold text-2xl text-slate-900">Account Settings</h2>
          <p className="text-xs text-slate-500 font-medium">Manage your personal profile, preferred Hyderabad sector, and notifications.</p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* PROFILE SECTION */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-[#004331]" /> Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs font-bold text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs font-bold text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs font-bold text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Primary Hyderabad Sector</label>
                <select
                  value={selectedLocality}
                  onChange={(e) => setSelectedLocality(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none"
                >
                  {coverageCorridors.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#004331]" /> Dispatch Notifications
            </h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer">
                <div>
                  <span className="font-bold text-xs text-slate-900">In-App Live Chat & Status Notifications</span>
                  <p className="text-[11px] text-slate-500">Receive alerts when craftsman is en route or arrives.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="w-4 h-4 accent-[#004331]"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer">
                <div>
                  <span className="font-bold text-xs text-slate-900">SMS Doorstep Security PIN Alerts</span>
                  <p className="text-[11px] text-slate-500">Receive SMS with 4-digit security PIN upon dispatch.</p>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlertsEnabled}
                  onChange={(e) => setSmsAlertsEnabled(e.target.checked)}
                  className="w-4 h-4 accent-[#004331]"
                />
              </label>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 flex justify-end">
            <Button type="submit" variant="primary" size="md">
              <Save className="w-4 h-4 mr-1.5" /> Save Preferences
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
