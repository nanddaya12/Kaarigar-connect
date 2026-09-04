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
  Shield,
  UserCheck,
  CheckCircle2,
  Power,
  Users,
  FileText,
  Grid,
  Star,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  Inbox
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
  const { role, setRole, locality, setLocality, isAvailable, toggleAvailability } = useAuth();
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

  // Role-Specific Desktop Nav Links
  const customerNavItems = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'explore', label: 'Explore', icon: Map },
    { id: 'how_it_works', label: 'How It Works', icon: HelpCircle },
    { id: 'provider', label: 'Become a Provider', icon: Wrench },
  ];

  const providerNavItems = [
    { id: 'provider', label: 'Dashboard', icon: Sparkles },
    { id: 'provider_requests', label: 'Requests', icon: Inbox, badge: true },
    { id: 'provider_jobs', label: 'Jobs', icon: Bike },
    { id: 'chat_view', label: 'Messages', icon: Bell },
    { id: 'provider_earnings', label: 'Earnings', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: UserCheck },
  ];

  const adminNavItems = [
    { id: 'admin', label: 'Dashboard', icon: Sparkles },
    { id: 'admin_users', label: 'Users', icon: Users },
    { id: 'admin_providers', label: 'Providers', icon: Wrench },
    { id: 'admin_verification', label: 'Verification', icon: ShieldCheck, badge: true },
    { id: 'admin_requests', label: 'Requests', icon: FileText },
    { id: 'admin_categories', label: 'Categories', icon: Grid },
    { id: 'admin_reviews', label: 'Reviews', icon: Star },
    { id: 'admin_reports', label: 'Reports', icon: AlertTriangle },
  ];

  const currentNavItems = role === 'customer' 
    ? customerNavItems 
    : role === 'provider' 
    ? providerNavItems 
    : adminNavItems;

  const handleNavClick = (viewId: string) => {
    if (viewId === 'chat_view') {
      onOpenChat();
    } else {
      onNavigate(viewId);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#004331] text-white shadow-xl border-b border-emerald-800/80 backdrop-blur-md">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
        
        {/* BRAND LOGO & LOCALITY SELECTOR */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick(role === 'customer' ? 'home' : role === 'provider' ? 'provider' : 'admin')}
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

          {/* Location Dropdown Picker (For Customers/Providers) */}
          {role !== 'admin' && (
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
          )}
        </div>

        {/* ROLE-SPECIFIC DESKTOP NAV LINKS */}
        <nav className="hidden lg:flex items-center gap-1 bg-emerald-950/60 p-1 rounded-2xl border border-emerald-800/80">
          {currentNavItems.map((item) => {
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
          {/* Provider Availability Toggle Button */}
          {role === 'provider' && (
            <button
              onClick={toggleAvailability}
              className={`px-3 py-1.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5 border shadow-sm ${
                isAvailable
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              <Power className={`w-3.5 h-3.5 ${isAvailable ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{isAvailable ? 'AVAILABLE ●' : 'OFFLINE'}</span>
            </button>
          )}

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
              <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900 text-white rounded-2xl shadow-2xl p-2.5 z-50 border border-slate-700 animate-in fade-in zoom-in-95 duration-150">
                <p className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider px-2 py-1">
                  Switch Active Role Experience
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
                    <span>{r === 'customer' ? '🧑 Customer' : r === 'provider' ? '🛠️ Provider' : '🛡️ Admin Console'}</span>
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
            {currentNavItems.map((item) => {
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
        </div>
      )}
    </header>
  );
};
