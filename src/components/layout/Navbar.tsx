import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  ChevronDown, 
  Bell, 
  Wrench, 
  Menu, 
  X, 
  Sparkles,
  Map,
  Bike,
  ShieldCheck,
  Power,
  Users,
  FileText,
  Grid,
  Star,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  Inbox,
  User,
  Bookmark,
  Settings,
  LogOut,
  Receipt,
  MessageSquare
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

interface NavbarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  onOpenSearch: () => void;
  onOpenChat: () => void;
  onOpenProviderOnboarding: () => void;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  onOpenSearch,
  onOpenChat,
  onOpenProviderOnboarding,
}) => {
  const { role, locality, setLocality, isAvailable, toggleAvailability, user, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [showLocalityMenu, setShowLocalityMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const coverageCorridors = [
    { name: 'Latifabad (Units 1-12)', value: 'Latifabad Unit 6' },
    { name: 'Qasimabad (Phases 1-2)', value: 'Qasimabad Phase 1' },
    { name: 'Auto Bhan Road', value: 'Auto Bhan Road' },
    { name: 'Saddar Bazaar & Cantt', value: 'Saddar Bazaar & Cantt' },
    { name: 'Citizen Colony / Wadhu Wah', value: 'Citizen Colony' }
  ];

  // Role-Specific Desktop Nav Links
  const customerNavItems: NavigationItem[] = [
    { id: 'home', label: t('home'), icon: Sparkles },
    { id: 'explore', label: t('explore'), icon: Map },
    { id: 'how_it_works', label: t('how_it_works'), icon: HelpCircle },
    { id: 'become_provider', label: t('become_provider'), icon: Wrench },
  ];

  const providerNavItems: NavigationItem[] = [
    { id: 'provider', label: t('dashboard'), icon: Sparkles },
    { id: 'provider_requests', label: t('requests'), icon: Inbox, badge: true },
    { id: 'provider_jobs', label: t('jobs'), icon: Bike },
    { id: 'chat_view', label: t('messages'), icon: Bell },
    { id: 'provider_earnings', label: t('earnings'), icon: TrendingUp },
    { id: 'profile', label: t('profile'), icon: User },
  ];

  const adminNavItems: NavigationItem[] = [
    { id: 'admin', label: t('dashboard'), icon: Sparkles },
    { id: 'admin_users', label: t('users'), icon: Users },
    { id: 'admin_providers', label: t('providers'), icon: Wrench },
    { id: 'admin_verification', label: t('verification'), icon: ShieldCheck, badge: true },
    { id: 'admin_requests', label: t('requests'), icon: FileText },
    { id: 'admin_categories', label: t('categories'), icon: Grid },
    { id: 'admin_reviews', label: t('reviews'), icon: Star },
    { id: 'admin_reports', label: t('reports'), icon: AlertTriangle },
  ];

  const currentNavItems: NavigationItem[] = role === 'customer'
    ? customerNavItems 
    : role === 'provider' 
    ? providerNavItems 
    : adminNavItems;

  const handleNavClick = (viewId: string) => {
    if (viewId === 'chat_view') {
      onOpenChat();
    } else if (viewId === 'become_provider') {
      onOpenProviderOnboarding();
    } else {
      onNavigate(viewId);
    }
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    setShowProfileMenu(false);
    onNavigate('home');
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
                {t('brand_title').split(' ')[0]}<span className="text-amber-400">Connect</span>
              </span>
              <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-widest leading-none mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> {t('tagline')}
              </span>
            </div>
          </button>

          <div className="h-5 w-px bg-emerald-800 hidden md:block"></div>

          {/* Location Dropdown Picker */}
          {role !== 'admin' && (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setShowLocalityMenu(!showLocalityMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-700/80 text-white rounded-full text-xs font-semibold transition-colors shadow-xs"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate max-w-[130px] font-bold">📍 {locality}</span>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              </button>

              {showLocalityMenu && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-slate-900 text-white rounded-2xl shadow-2xl p-2.5 z-50 border border-slate-700 animate-in fade-in zoom-in-95 duration-150">
                  <p className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider px-2 py-1">
                    Hyderabad Sectors & Corridors
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
            <span className="hidden xl:inline text-slate-200">{t('search_placeholder')}</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] bg-slate-900 text-emerald-300 rounded border border-emerald-700 font-mono">⌘K</kbd>
          </button>

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

          {/* CLEAN CUSTOMER PROFILE DROPDOWN MENU */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="relative block group focus:outline-none"
              title="User Account Menu"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-amber-400 group-hover:scale-105 transition-transform"
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-slate-900 text-white rounded-2xl shadow-2xl p-3 z-50 border border-slate-700 animate-in fade-in zoom-in-95 duration-150">
                {/* User Card */}
                <div className="p-2 border-b border-slate-800 pb-3 mb-2 flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-amber-400" />
                  <div className="overflow-hidden">
                    <p className="font-extrabold text-sm text-white truncate">{user.name}</p>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                      {role.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Account Navigation Links */}
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      onNavigate('profile');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white flex items-center gap-2.5 transition-colors"
                  >
                    <User className="w-4 h-4 text-amber-400" /> {t('profile')}
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('tracking');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white flex items-center gap-2.5 transition-colors"
                  >
                    <Receipt className="w-4 h-4 text-emerald-400" /> {t('requests')}
                  </button>

                  <button
                    onClick={() => {
                      onOpenChat();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white flex items-center gap-2.5 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-sky-400" /> {t('messages')}
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('saved');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white flex items-center gap-2.5 transition-colors"
                  >
                    <Bookmark className="w-4 h-4 text-amber-400" /> {t('saved_providers')}
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('settings');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white flex items-center gap-2.5 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-400" /> {t('settings')}
                  </button>
                </div>

                <div className="my-2 border-t border-slate-800" />

                {/* Become a Provider Pathway */}
                {role === 'customer' && (
                  <button
                    onClick={() => {
                      onOpenProviderOnboarding();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-extrabold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-2.5 transition-colors shadow-md mb-2"
                  >
                    <Wrench className="w-4 h-4 text-slate-950" /> {t('become_provider')}
                  </button>
                )}

                {/* Sign Out */}
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/40 flex items-center gap-2.5 transition-colors"
                >
                  <LogOut className="w-4 h-4 text-red-400" /> {t('sign_out')}
                </button>
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
