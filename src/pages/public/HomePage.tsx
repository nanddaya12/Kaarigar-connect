import React, { useState, useEffect } from 'react';
import { Search, MapPin, Map, ShieldCheck, Zap, Phone, Wrench, Clock, Award, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { marketplaceService } from '../../services/marketplaceService';
import { ProviderProfile, ServiceCategory } from '../../types/database.types';
import { KaarigarCard } from '../../components/marketplace/KaarigarCard';
import { CategoryFilter } from '../../components/marketplace/CategoryFilter';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

interface HomePageProps {
  onSelectKaarigar: (id: string) => void;
  onBookKaarigar: (provider: ProviderProfile) => void;
  onNavigate: (view: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectKaarigar,
  onBookKaarigar,
  onNavigate,
}) => {
  const { locality, setLocality } = useAuth();
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [providers, setProviders] = useState<ProviderProfile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('AC Inverter PCB Diagnostics');
  const [urgency, setUrgency] = useState<string>('express');

  const frequentSearches = [
    { label: 'Split AC Servicing', query: 'AC' },
    { label: 'Submersible Water Motor', query: 'Motor' },
    { label: 'UPS Dual Battery Wiring', query: 'UPS' },
    { label: 'Car EFI Tuning', query: 'EFI' },
    { label: 'Refrigerator Gas Leakage', query: 'Fridge' }
  ];

  const trustHighlights = [
    {
      title: '100% CNIC & Police Checked',
      desc: 'Verified by Sindh Police Branch',
      icon: ShieldCheck
    },
    {
      title: 'Standard Sindh Tariffs',
      desc: 'Zero peak-hour overcharging',
      icon: Award
    },
    {
      title: '30-Day Guarantee',
      desc: 'Full rework protection',
      icon: CheckCircle2
    },
    {
      title: '30-Min Emergency Response',
      desc: 'Instant doorstep arrival',
      icon: Zap
    }
  ];

  useEffect(() => {
    marketplaceService.getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    marketplaceService.getProviders(selectedCategory, searchQuery, locality).then(setProviders);
  }, [selectedCategory, searchQuery, locality]);

  return (
    <div className="space-y-10 py-2 sm:py-4">
      {/* HERO SECTION - EXACT STITCH SPECIFICATION */}
      <section className="bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-10">
          
          {/* Top Telemetry Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[#004331] text-xs font-bold border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-[#004331] animate-ping"></span>
              <span className="font-extrabold">SINDH GUILD CERTIFIED NETWORK</span>
              <span className="text-slate-300">·</span>
              <span className="font-medium">HYDERABAD DISTRICT DIVISION</span>
            </div>

            <div className="inline-flex items-center flex-wrap gap-3 px-4 py-1.5 rounded-full bg-emerald-50/70 border border-emerald-200/60 shadow-xs text-xs">
              <div className="flex items-center gap-1 text-[#004331] font-extrabold uppercase tracking-wider text-[11px]">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Live Telemetry</span>
              </div>
              <span className="font-bold text-slate-800">142 Kaarigars Active</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600">Avg Arrival: <strong className="text-[#004331] font-extrabold">18 Mins</strong></span>
              <span className="text-slate-300">|</span>
              <span className="text-amber-800 font-extrabold">0% Hidden Surcharges</span>
            </div>
          </div>

          {/* Main Editorial Headline Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-8">
            <div className="lg:col-span-8 flex flex-col space-y-3">
              <h1 className="font-headline font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
                Find trusted local help in <span className="text-[#004331] underline decoration-amber-400 decoration-wavy underline-offset-4">Hyderabad</span>.
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed font-normal">
                From an emergency AC breakdown in peak 42°C heat to instant water motor rewinding, connect with NADRA-verified skilled craftsmen within 30 minutes.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm w-full max-w-sm flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Peak Summer Hotline</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[#004331] bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Active Now
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#004331] text-white flex items-center justify-center shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <a href="tel:0222784910" className="font-headline font-extrabold text-xl text-[#004331] leading-none hover:underline">
                      022-2784910
                    </a>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Direct Saddar Guild Dispatcher</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Master Search Terminal Box */}
          <div className="p-3 rounded-2xl bg-slate-100 shadow-xl border border-slate-200 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center bg-white p-3 rounded-xl shadow-xs border border-slate-200">
              
              {/* Input: Service Needed */}
              <div className="md:col-span-5 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                <Wrench className="w-5 h-5 text-[#004331] shrink-0" />
                <div className="flex flex-col w-full min-w-0">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider" htmlFor="hero-svc-input">
                    Service Needed
                  </label>
                  <input
                    id="hero-svc-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="AC inverter PCB, plumber, UPS electrician..."
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-800 focus:outline-none truncate font-semibold"
                  />
                </div>
              </div>

              <div className="hidden md:block w-px h-8 bg-slate-200"></div>

              {/* Input: Locality */}
              <div className="md:col-span-3 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0" />
                <div className="flex flex-col w-full min-w-0">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider" htmlFor="hero-loc-select">
                    Hyderabad Sector
                  </label>
                  <select
                    id="hero-loc-select"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-800 focus:outline-none truncate cursor-pointer font-extrabold"
                  >
                    <option value="Latifabad Unit 6">Latifabad Unit 6</option>
                    <option value="Latifabad Unit 2 & 3">Latifabad Unit 2 & 3</option>
                    <option value="Qasimabad Phase 1">Qasimabad Phase 1</option>
                    <option value="Qasimabad Phase 2">Qasimabad Phase 2</option>
                    <option value="Auto Bhan Road">Auto Bhan Road corridor</option>
                    <option value="Citizen Colony">Citizen Colony / Wadhu Wah</option>
                    <option value="Saddar Bazaar & Cantt">Saddar Bazaar & Cantt</option>
                  </select>
                </div>
              </div>

              <div className="hidden md:block w-px h-8 bg-slate-200"></div>

              {/* Input: Urgency Window */}
              <div className="md:col-span-2 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                <Clock className="w-5 h-5 text-amber-800 shrink-0" />
                <div className="flex flex-col w-full min-w-0">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider" htmlFor="hero-urgency-select">
                    Urgency
                  </label>
                  <select
                    id="hero-urgency-select"
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-800 focus:outline-none truncate cursor-pointer font-bold"
                  >
                    <option value="express">Express (&lt; 45 mins)</option>
                    <option value="today">Today Afternoon</option>
                    <option value="tomorrow">Tomorrow Morning</option>
                    <option value="scheduled">Schedule Custom Date</option>
                  </select>
                </div>
              </div>

              {/* Search CTA Button */}
              <div className="md:col-span-2">
                <Button
                  onClick={() => onNavigate('map')}
                  variant="primary"
                  className="w-full h-11 rounded-lg bg-[#004331] hover:bg-[#0d5c46] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Search Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mr-1">Frequent Searches:</span>
            {frequentSearches.map((item) => (
              <button
                key={item.label}
                onClick={() => setSearchQuery(item.query)}
                className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-medium transition-colors flex items-center gap-1.5 border border-slate-200"
              >
                <Sparkles className="w-3 h-3 text-[#004331]" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Four Trust Highlights Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50/80 rounded-2xl p-4 border border-slate-200">
            {trustHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#004331]/10 text-[#004331] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 leading-snug">{item.title}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-headline font-extrabold text-lg sm:text-xl text-slate-900">Marketplace Categories</h2>
          <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#004331]" /> Guild Certified Standards
          </span>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </section>

      {/* FEATURED KAARIGARS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline font-extrabold text-lg sm:text-xl text-slate-900">Available Kaarigars in {locality}</h2>
            <p className="text-xs text-slate-500 font-medium">NADRA CNIC Verified · Instant Doorstep Dispatch</p>
          </div>
          <span className="text-xs text-[#004331] font-extrabold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {providers.length} Craftsmen Found
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {providers.map((p) => (
            <KaarigarCard
              key={p.id}
              provider={p}
              onSelectProfile={onSelectKaarigar}
              onBookNow={onBookKaarigar}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
