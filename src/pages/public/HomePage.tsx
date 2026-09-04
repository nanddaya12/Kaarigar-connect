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
    <div className="space-y-10 py-6">
      {/* HERO BANNER SECTION */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-white border border-outline-variant/40 rounded-3xl p-8 shadow-xl relative overflow-hidden">
          {/* Top Telemetry Pill */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/10 text-primary text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              SINDH GUILD CERTIFIED NETWORK · HYDERABAD DISTRICT DIVISION
            </div>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-surface-container-low text-xs text-on-surface">
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <strong className="text-primary font-bold">142 Kaarigars Active</strong>
              </span>
              <span className="text-outline">|</span>
              <span>Avg Arrival: <strong className="text-primary font-bold">18 Mins</strong></span>
              <span className="text-outline">|</span>
              <span className="text-tertiary font-bold">0% Hidden Surcharges</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="font-headline font-extrabold text-3xl sm:text-4xl text-on-surface tracking-tight leading-tight">
                Find trusted local help in Hyderabad.
              </h1>
              <p className="text-base text-on-surface-variant max-w-2xl leading-relaxed">
                From emergency AC breakdown in peak 42°C heat to instant water motor rewinding, connect with NADRA-verified skilled craftsmen within 30 minutes.
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/40 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-outline uppercase tracking-wider">Peak Summer Hotline</span>
                  <span className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary text-[10px] font-bold">Active Now</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-headline font-bold text-lg text-primary leading-none">022-2784910</p>
                    <p className="text-xs text-on-surface-variant">Direct Saddar Guild Dispatcher</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MASTER SEARCH TERMINAL BAR */}
          <div className="mt-8 p-3 rounded-2xl bg-surface-container-low shadow-lg border border-outline-variant/30">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
              <div className="md:col-span-5 flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl border border-outline-variant/40">
                <Search className="w-5 h-5 text-primary" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search AC PCB diagnostic, plumber, electrician..."
                  className="w-full bg-transparent text-xs sm:text-sm text-on-surface focus:outline-none placeholder:text-outline font-medium"
                />
              </div>

              <div className="md:col-span-4 flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl border border-outline-variant/40">
                <MapPin className="w-5 h-5 text-secondary" />
                <select
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-on-surface focus:outline-none font-medium cursor-pointer"
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
                  className="w-full py-2.5 shadow-md flex items-center justify-center gap-1.5"
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
      <section className="max-w-7xl mx-auto px-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-headline font-bold text-xl text-on-surface">Marketplace Categories</h2>
          <span className="text-xs text-outline font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Verified Guild Standards
          </span>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </section>

      {/* FEATURED KAARIGARS GRID */}
      <section className="max-w-7xl mx-auto px-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline font-bold text-xl text-on-surface">Available Kaarigars in {locality}</h2>
            <p className="text-xs text-on-surface-variant">NADRA CNIC Verified · Instant Doorstep Dispatch</p>
          </div>
          <span className="text-xs text-primary font-bold">{providers.length} Craftsmen Found</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
