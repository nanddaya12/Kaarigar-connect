import React, { useState, useEffect } from 'react';
import { Search, MapPin, Map, ShieldCheck, Zap, Phone } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    marketplaceService.getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    marketplaceService.getProviders(selectedCategory, searchQuery, locality).then(setProviders);
  }, [selectedCategory, searchQuery, locality]);

  return (
    <div className="space-y-8 sm:space-y-12 py-4 sm:py-6">
      {/* HERO BANNER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden">
          {/* Top Telemetry Badges */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] sm:text-xs font-extrabold border border-emerald-200/50 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
              <span>SINDH GUILD CERTIFIED NETWORK · HYDERABAD DIVISION</span>
            </div>
            
            <div className="inline-flex items-center flex-wrap gap-2 text-[11px] sm:text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-200/60 w-fit">
              <span className="flex items-center gap-1 text-emerald-800 font-extrabold">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                142 Active Kaarigars
              </span>
              <span className="text-slate-300 hidden xs:inline">|</span>
              <span>Avg Arrival: <strong className="text-emerald-800 font-extrabold">18 Mins</strong></span>
              <span className="text-slate-300 hidden xs:inline">|</span>
              <span className="text-amber-700 font-extrabold">0% Hidden Surcharges</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-8 space-y-3 sm:space-y-4">
              <h1 className="font-headline font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight leading-tight sm:leading-snug">
                Find trusted local help in <span className="text-emerald-800 underline decoration-amber-400 decoration-wavy underline-offset-4">Hyderabad</span>.
              </h1>
              <p className="text-xs sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                From emergency AC breakdown in peak 42°C heat to instant water motor rewinding, connect with NADRA CNIC-verified skilled craftsmen within 30 minutes.
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Peak Summer Hotline</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">Active Now</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold shadow-md">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <a href="tel:0222784910" className="font-headline font-extrabold text-lg text-emerald-900 leading-none hover:underline">022-2784910</a>
                    <p className="text-xs text-slate-500 font-medium">Direct Saddar Guild Dispatcher</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MASTER SEARCH TERMINAL BAR */}
          <div className="mt-6 sm:mt-8 p-3 rounded-2xl bg-slate-100 shadow-md border border-slate-200/70">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center">
              <div className="md:col-span-5 flex items-center gap-3 px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 shadow-xs">
                <Search className="w-4 h-4 text-emerald-700 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search AC PCB diagnostic, plumber, electrician..."
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-800 focus:outline-none placeholder:text-slate-400 font-medium"
                />
              </div>

              <div className="md:col-span-4 flex items-center gap-3 px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 shadow-xs">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                <select
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-800 focus:outline-none font-bold cursor-pointer"
                >
                  {['Latifabad Unit 6', 'Latifabad Unit 2 & 3', 'Qasimabad Phase 1', 'Qasimabad Phase 2', 'Auto Bhan Road', 'Saddar Bazaar & Cantt', 'Citizen Colony'].map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <Button
                  onClick={() => onNavigate('map')}
                  variant="primary"
                  className="w-full py-2.5 shadow-md flex items-center justify-center gap-1.5 font-bold"
                >
                  <Map className="w-4 h-4" />
                  <span>View Map Pins</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-headline font-extrabold text-lg sm:text-xl text-slate-900">Marketplace Categories</h2>
          <span className="text-[11px] sm:text-xs text-slate-500 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Guild Certified
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
          <span className="text-xs text-emerald-800 font-extrabold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
            {providers.length} Craftsmen Found
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {providers.map(p => (
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
