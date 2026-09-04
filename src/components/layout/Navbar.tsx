import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  ShieldCheck, 
  UserCheck, 
  ChevronDown, 
  Bell, 
  Bike, 
  Menu, 
  X, 
  Sparkles, 
  Map, 
  ShieldAlert,
  PhoneCall
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
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showLocalityMenu, setShowLocalityMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const localities = [
    'Latifabad Unit 6',
    'Latifabad Unit 2 & 3',
    'Qasimabad Phase 1',
    'Qasimabad Phase 2',
    'Auto Bhan Road',
    'Saddar Bazaar & Cantt',
    'Citizen Colony & Wadhu Wah'
  ];

  const navLinks = [
    { id: 'home', label: 'Explore Services', icon: Sparkles },
    { id: 'map', label: 'Sector Map', icon: Map },
    { id: 'ai_triage', label: 'AI Triage', icon: Sparkles },
    { id: 'tracking', label: 'Live Tracking', icon: Bike },
    { id: 'security', label: 'Security Center', icon: ShieldAlert },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-950/10 shadow-xs transition-all">
      <div className="h-16 md:h-20 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* BRAND LOGO & LOCALITY SELECTOR */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-teal-900 flex items-center justify-center text-white font-extrabold text-lg sm:text-xl shadow-md group-hover:scale-105 transition-transform border border-emerald-700/30">
              K
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-headline font-extrabold text-base sm:text-lg text-emerald-950 tracking-tight leading-none">
                  Kaarigar<span className="text-emerald-700">Connect</span>
                </span>
                <span className="hidden xs:inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-0.5">
                Hyderabad · Sindh
              </span>
            </div>
          </button>

          <div className="h-6 w-[1px] bg-slate-200 hidden md:block"></div>

          {/* Location Dropdown Picker (Desktop/Tablet) */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowLocalityMenu(!showLocalityMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50/80 hover:bg-emerald-100/70 border border-emerald-200/60 text-emerald-900 rounded-full text-xs font-semibold transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span className="truncate max-w-[120px] lg:max-w-[160px]">{locality}</span>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            </button>

            {showLocalityMenu && (
              <div className="absolute left-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-2xl p-2 z-50 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hyderabad Sectors</p>
                </div>
                <div className="space-y-0.5 max-h-60 overflow-y-auto">
                  {localities.map(loc => (
                    <button
                      key={loc}
                      onClick={() => {
                        setLocality(loc);
                        setShowLocalityMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                        loc === locality 
                          ? 'bg-emerald-50 text-emerald-800 font-bold' 
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{loc}</span>
                      {loc === locality && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DESKTOP NAVIGATION LINKS (lg screens) */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 p-1 rounded-2xl border border-slate-200/60">
          {navLinks.map(link => {
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive 
                    ? 'bg-emerald-800 text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-600 text-xs font-medium transition-colors border border-slate-200"
            title="Search Services"
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
            <span className="hidden xl:inline text-slate-500">Search plumber, electrician...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] bg-white rounded border border-slate-200 text-slate-400 font-mono">⌘K</kbd>
          </button>

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="px-2.5 sm:px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-900 hover:bg-amber-500/20 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-700" />
              <span className="capitalize text-[11px] sm:text-xs">{role}</span>
              <ChevronDown className="w-3 h-3 text-amber-700" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-2xl p-2 z-50 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
                <p className="text-[10px] font-bold text-slate-400 uppercase px-3 py-1 tracking-wider">Switch View Persona</p>
                {(['customer', 'provider', 'admin'] as UserRole[]).map(r => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      setShowRoleMenu(false);
                      if (r === 'provider') handleNavClick('provider');
                      else if (r === 'admin') handleNavClick('admin');
                      else handleNavClick('home');
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium capitalize flex items-center justify-between ${
                      role === r 
                        ? 'text-emerald-800 font-bold bg-emerald-50' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{r === 'customer' ? '🧑 Customer' : r === 'provider' ? '🛠️ Provider' : '🛡️ Admin Auditor'}</span>
                    {role === r && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notification Chat Icon */}
          <button
            onClick={onOpenChat}
            className="relative p-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
            title="Messages"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
          </button>

          {/* Live Order Tracker Link */}
          <button
            onClick={() => handleNavClick('tracking')}
            className="relative p-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors hidden xs:flex"
            title="Live Order Tracking"
          >
            <Bike className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </button>

          {/* Mobile Hamburger Drawer Toggle (lg:hidden) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE & TABLET SLIDE-DOWN DRAWER MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          
          {/* Mobile Sector Location Selector */}
          <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" /> Active Hyderabad Sector
              </span>
              <span className="text-[10px] font-bold text-emerald-700">Verified</span>
            </div>
            <select
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full bg-white text-xs font-bold text-slate-800 p-2.5 rounded-xl border border-emerald-300 focus:outline-none"
            >
              {localities.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = activeView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`p-3 rounded-2xl text-xs font-bold text-left flex items-center gap-2.5 transition-all ${
                    isActive 
                      ? 'bg-emerald-800 text-white shadow-md' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => handleNavClick('provider')}
              className={`p-3 rounded-2xl text-xs font-bold text-left flex items-center gap-2.5 transition-all ${
                activeView === 'provider' ? 'bg-emerald-800 text-white shadow-md' : 'bg-slate-100 text-slate-700'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Provider Console</span>
            </button>
          </div>

          {/* Emergency Hotline Quick Bar */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-950">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-amber-700" />
              <div>
                <p className="text-[10px] font-bold text-amber-800 uppercase leading-none">Emergency Hotline</p>
                <p className="font-extrabold text-sm text-amber-900 leading-tight">022-2784910</p>
              </div>
            </div>
            <a
              href="tel:0222784910"
              className="px-3 py-1.5 bg-amber-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-amber-700"
            >
              Call Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
