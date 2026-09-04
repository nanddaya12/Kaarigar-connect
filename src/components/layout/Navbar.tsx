import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  ShieldCheck, 
  ChevronDown, 
  Bell, 
  Phone, 
  Wrench, 
  Menu, 
  X, 
  Sparkles,
  Map,
  Bike,
  Crosshair
} from 'lucide-react';
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
  const [showLocalityMenu, setShowLocalityMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'UR'>('EN');

  const coverageCorridors = [
    { name: 'Latifabad (Units 1-12)', value: 'Latifabad Unit 6' },
    { name: 'Qasimabad (Phases 1-2)', value: 'Qasimabad Phase 1' },
    { name: 'Auto Bhan Road', value: 'Auto Bhan Road' },
    { name: 'Saddar & Cantt', value: 'Saddar Bazaar & Cantt' },
    { name: 'Citizen Colony / Wadhu Wah', value: 'Citizen Colony' }
  ];

  const navItems = [
    { id: 'home', label: 'Services', icon: Sparkles },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'ai_triage', label: 'AI Triage', icon: Sparkles, badge: true },
    { id: 'tracking', label: 'Live Orders', icon: Bike },
    { id: 'provider', label: 'Pro Console', icon: Wrench },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#004331] text-white shadow-xl border-b border-emerald-800/80 backdrop-blur-md">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
        
        {/* BRAND LOGO & LOCALITY SELECTOR */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group focus:outline-none shrink-0 text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 font-headline font-extrabold text-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              K
            </div>
            <div className="flex flex-col">
              <span className="font-headline font-extrabold text-base text-white leading-none tracking-tight">
                Kaarigar<span className="text-amber-400">Connect</span>
              </span>
              <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-widest leading-none mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Hyderabad · Sindh
              </span>
            </div>
          </button>

          <div className="h-5 w-px bg-emerald-800 hidden md:block"></div>

          {/* Location Dropdown Picker */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setShowLocalityMenu(!showLocalityMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-700/80 text-white rounded-full text-xs font-semibold transition-colors shadow-xs"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate max-w-[130px] font-bold">{locality}</span>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            </button>

            {showLocalityMenu && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-slate-900 text-white rounded-2xl shadow-2xl p-2.5 z-50 border border-slate-700 animate-in fade-in zoom-in-95 duration-150">
                <p className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider px-2 py-1">
                  Hyderabad Coverage Corridors
                </p>
                <div className="space-y-0.5 mt-1">
                  {coverageCorridors.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => {
                        setLocality(c.value);
                        setShowLocalityMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                        c.value === locality
                          ? 'bg-emerald-800 text-white font-bold'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>{c.name}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden lg:flex items-center gap-1 bg-emerald-950/60 p-1 rounded-2xl border border-emerald-800/80">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md scale-102'
                    : 'text-emerald-100 hover:text-white hover:bg-emerald-900/60'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>}
              </button>
            );
          })}
        </nav>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-700/80 text-emerald-100 hover:text-white text-xs font-semibold transition-colors"
            title="Search Services (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden xl:inline text-slate-200">Search plumber, electrician...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] bg-slate-900 text-emerald-300 rounded border border-emerald-700 font-mono">⌘K</kbd>
          </button>

          {/* Hotline Helpline */}
          <a
            href="tel:0222784910"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold transition-colors shadow-md"
            title="Guild Dispatcher Helpline"
          >
            <Phone className="w-3.5 h-3.5 text-slate-950" />
            <span>022-2784910</span>
          </a>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'EN' ? 'UR' : 'EN')}
            className="px-2.5 py-1 bg-emerald-900/80 hover:bg-emerald-900 text-emerald-100 rounded-full text-[11px] font-bold transition-colors border border-emerald-700"
            title="Switch Language"
          >
            {language === 'EN' ? 'اردو' : 'EN'}
          </button>

          {/* Notifications Bell */}
          <button
            onClick={onOpenChat}
            className="relative p-2 rounded-full hover:bg-emerald-900 text-emerald-100 transition-colors"
            title="Messages & Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-[#004331]"></span>
          </button>

          {/* User Persona Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="relative block group focus:outline-none"
              title="Persona View"
            >
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center ring-2 ring-amber-300 group-hover:scale-105 transition-all">
                {role === 'customer' ? '🧑' : role === 'provider' ? '🛠️' : '🛡️'}
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-slate-900 text-white rounded-2xl shadow-2xl p-2.5 z-50 border border-slate-700 animate-in fade-in zoom-in-95 duration-150">
                <p className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider px-2 py-1">
                  Select User Persona
                </p>
                {(['customer', 'provider', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      setShowProfileMenu(false);
                      if (r === 'provider') handleNavClick('provider');
                      else if (r === 'admin') handleNavClick('admin');
                      else handleNavClick('home');
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium capitalize flex items-center justify-between ${
                      role === r
                        ? 'bg-emerald-800 text-white font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{r === 'customer' ? '🧑 Customer' : r === 'provider' ? '🛠️ Provider' : '🛡️ Admin Auditor'}</span>
                    {role === r && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Drawer Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE SLIDE-DOWN DRAWER MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700 space-y-2">
            <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" /> Active Hyderabad Sector
            </span>
            <select
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full bg-slate-900 text-xs font-bold text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none"
            >
              {coverageCorridors.map((c) => (
                <option key={c.value} value={c.value}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`p-3 rounded-2xl text-xs font-extrabold text-left flex items-center gap-2.5 transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-100">
            <div>
              <p className="text-[10px] font-bold text-amber-400 uppercase">Emergency Hotline</p>
              <p className="font-extrabold text-sm text-white">022-2784910</p>
            </div>
            <a
              href="tel:0222784910"
              className="px-3.5 py-1.5 bg-amber-500 text-slate-950 rounded-xl text-xs font-extrabold shadow-sm"
            >
              Call Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
