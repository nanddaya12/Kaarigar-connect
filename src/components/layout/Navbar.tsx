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
  Shield,
  UserCheck
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
    { id: 'security', label: 'Standards', icon: Shield },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.06)] border-b border-slate-200/80">
      <div className="h-14 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
        
        {/* BRAND LOGO & LOCALITY SELECTOR */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group focus:outline-none shrink-0"
          >
            <div className="w-8 h-8 rounded-xl bg-[#004331] text-white flex items-center justify-center font-headline font-extrabold text-base shadow-sm group-hover:scale-105 transition-transform">
              K
            </div>
            <div className="flex flex-col text-left">
              <span className="font-headline font-extrabold text-base text-[#004331] leading-none tracking-tight">
                Kaarigar<span className="text-[#0d5c46]">Connect</span>
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">
                Hyderabad · Sindh
              </span>
            </div>
          </button>

          <div className="h-4 w-px bg-slate-200 hidden md:block"></div>

          {/* Location Dropdown Picker */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setShowLocalityMenu(!showLocalityMenu)}
              className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200/80 text-slate-800 rounded-full text-xs font-semibold transition-colors border border-slate-200"
            >
              <MapPin className="w-3.5 h-3.5 text-[#004331] shrink-0" />
              <span className="truncate max-w-[130px]">{locality}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>

            {showLocalityMenu && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl p-2.5 z-50 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-2 py-1">
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
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                        c.value === locality
                          ? 'bg-emerald-50 text-[#004331] font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{c.name}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#004331]" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-1 shrink-0">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#004331] text-white shadow-xs'
                    : 'text-slate-700 hover:text-[#004331] hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>}
              </button>
            );
          })}
        </nav>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Search Trigger Icon */}
          <button
            onClick={onOpenSearch}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-[#004331] transition-colors border border-slate-200"
            title="Quick Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Hotline Helpline */}
          <a
            href="tel:0222784910"
            className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-[#004331] text-xs font-bold border border-emerald-200/80 hover:bg-emerald-100 transition-colors"
            title="Guild Dispatcher Helpline"
          >
            <Phone className="w-3.5 h-3.5 text-[#004331]" />
            <span>022-2784910</span>
          </a>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'EN' ? 'UR' : 'EN')}
            className="px-2 py-1 bg-slate-100 hover:bg-slate-200/80 text-slate-800 rounded-full text-[11px] font-bold transition-colors border border-slate-200"
            title="Switch Language"
          >
            {language === 'EN' ? 'اردو' : 'EN'}
          </button>

          {/* Join Pro Button */}
          <button
            onClick={() => handleNavClick('provider')}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#004331] text-white hover:bg-[#0d5c46] text-xs font-bold transition-colors shadow-xs"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Join Pro</span>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={onOpenChat}
            className="relative p-1.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-[#004331] transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
          </button>

          {/* User Persona Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="relative block group focus:outline-none"
              title="Persona View"
            >
              <div className="w-7 h-7 rounded-full bg-[#004331] text-white font-bold text-xs flex items-center justify-center ring-2 ring-emerald-600/30 group-hover:ring-[#004331] transition-all">
                {role === 'customer' ? '🧑' : role === 'provider' ? '🛠️' : '🛡️'}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#004331] text-white rounded-full flex items-center justify-center text-[8px] font-bold ring-1 ring-white">
                ✓
              </span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-2xl p-2 z-50 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-2 py-1">
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
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium capitalize flex items-center justify-between ${
                      role === r
                        ? 'bg-emerald-50 text-[#004331] font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{r === 'customer' ? '🧑 Customer' : r === 'provider' ? '🛠️ Provider' : '🛡️ Admin Auditor'}</span>
                    {role === r && <ShieldCheck className="w-3.5 h-3.5 text-[#004331]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Drawer Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE SLIDE-DOWN DRAWER MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200/80 space-y-1.5">
            <span className="text-[10px] font-extrabold text-[#004331] uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Hyderabad Sector
            </span>
            <select
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full bg-white text-xs font-bold text-slate-800 p-2 rounded-lg border border-emerald-300 focus:outline-none"
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
                  className={`p-2.5 rounded-xl text-xs font-bold text-left flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-[#004331] text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-950">
            <div>
              <p className="text-[9px] font-bold text-amber-800 uppercase">Emergency Hotline</p>
              <p className="font-extrabold text-xs text-amber-900">022-2784910</p>
            </div>
            <a
              href="tel:0222784910"
              className="px-2.5 py-1 bg-amber-600 text-white rounded-lg text-xs font-bold shadow-xs"
            >
              Call
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
