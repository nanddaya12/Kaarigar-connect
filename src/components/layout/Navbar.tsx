import React, { useState } from 'react';
import { MapPin, Search, ShieldCheck, UserCheck, ChevronDown, Bell, Bike } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/database.types';

interface NavbarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  onOpenSearch: () => void;
  onOpenChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  onOpenSearch,
  onOpenChat,
}) => {
  const { role, setRole, locality, setLocality } = useAuth();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showLocalityMenu, setShowLocalityMenu] = useState(false);

  const localities = [
    'Latifabad Unit 6',
    'Latifabad Unit 2 & 3',
    'Qasimabad Phase 1',
    'Qasimabad Phase 2',
    'Auto Bhan Road',
    'Saddar Bazaar & Cantt',
    'Citizen Colony & Wadhu Wah'
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-outline-variant/40 shadow-xs">
      <div className="h-20 max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
        {/* Brand Logo & Locality Selector */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
              K
            </div>
            <div className="flex flex-col">
              <span className="font-headline font-bold text-lg text-primary leading-tight">KaarigarConnect</span>
              <span className="text-[10px] font-semibold text-outline uppercase tracking-wider">Hyderabad, Sindh</span>
            </div>
          </button>

          <div className="h-7 w-[1px] bg-outline-variant/60 hidden sm:block"></div>

          {/* Sector Dropdown Picker */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setShowLocalityMenu(!showLocalityMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-full text-xs font-semibold transition-colors"
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span>{locality}</span>
              <ChevronDown className="w-3.5 h-3.5 text-outline" />
            </button>

            {showLocalityMenu && (
              <div className="absolute left-0 top-full mt-1 w-56 bg-surface-container-lowest rounded-xl shadow-xl p-2 z-50 border border-outline-variant/40 animate-fade-in">
                <p className="text-[10px] font-bold text-outline uppercase px-2 py-1 tracking-wider">Hyderabad Sectors</p>
                <div className="space-y-0.5 mt-1">
                  {localities.map(loc => (
                    <button
                      key={loc}
                      onClick={() => {
                        setLocality(loc);
                        setShowLocalityMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between ${loc === locality ? 'bg-primary-container/10 text-primary font-bold' : 'text-on-surface hover:bg-surface-container-low'}`}
                    >
                      <span>{loc}</span>
                      {loc === locality && <ShieldCheck className="w-3.5 h-3.5 text-primary" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {[
            { id: 'home', label: 'Explore Services' },
            { id: 'map', label: 'Find Kaarigar (Map)' },
            { id: 'ai_triage', label: '🤖 AI Triage' },
            { id: 'tracking', label: 'Live Tracking' },
            { id: 'security', label: '🛡️ Security Center' },
          ].map(link => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${activeView === link.id ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'}`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Controls & Role Switcher */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenSearch}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant text-xs font-medium transition-colors border border-outline-variant/30"
          >
            <Search className="w-4 h-4 text-outline" />
            <span>Search plumber, electrician...</span>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-white rounded border text-outline font-mono">⌘K</kbd>
          </button>

          {/* Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="px-3 py-1.5 bg-primary-container/10 border border-primary/30 text-primary hover:bg-primary-container/20 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
            >
              <UserCheck className="w-4 h-4" />
              <span className="capitalize">{role}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl p-2 z-50 border border-outline-variant/40 animate-fade-in">
                <p className="text-[10px] font-bold text-outline uppercase px-2 py-1">Switch View Persona</p>
                {(['customer', 'provider', 'admin'] as UserRole[]).map(r => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      setShowRoleMenu(false);
                      if (r === 'provider') onNavigate('provider');
                      else if (r === 'admin') onNavigate('admin');
                      else onNavigate('home');
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium capitalize ${role === r ? 'text-primary font-bold bg-primary-container/10' : 'text-on-surface hover:bg-surface-container-low'}`}
                  >
                    {r === 'customer' ? '🧑 Customer' : r === 'provider' ? '🛠️ Provider' : '🛡️ Admin Auditor'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Chat & Order Buttons */}
          <button
            onClick={onOpenChat}
            className="relative p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors"
            title="Messages"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-tertiary"></span>
          </button>

          <button
            onClick={() => onNavigate('tracking')}
            className="relative p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors"
            title="Live Order Tracking"
          >
            <Bike className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
