import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Map, 
  ShieldCheck, 
  Zap, 
  Phone, 
  Wrench, 
  Clock, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Star, 
  ChevronDown, 
  Shield, 
  FileText, 
  HelpCircle,
  ArrowRight,
  PhoneCall
} from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState<string>(''); // Default empty so all craftsmen load immediately!
  const [urgency, setUrgency] = useState<string>('express');
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  const frequentSearches = [
    { label: 'Split AC Servicing', query: 'AC' },
    { label: 'Submersible Water Motor', query: 'Motor' },
    { label: 'UPS Dual Battery Wiring', query: 'UPS' },
    { label: 'Car EFI Tuning', query: 'EFI' },
    { label: 'Refrigerator Gas Leakage', query: 'Compressor' }
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

  const workflowSteps = [
    {
      step: '01',
      title: 'Search or AI Voice Triage',
      desc: 'Enter your issue or use Voice AI to diagnose AC, electrical, or plumbing breakdown.',
      icon: Sparkles
    },
    {
      step: '02',
      title: 'GPS Proximity Match',
      desc: 'Connect with verified Kaarigars active within 5 km of your Hyderabad sector.',
      icon: MapPin
    },
    {
      step: '03',
      title: 'Doorstep PIN Verifier',
      desc: 'Verify 4-digit security PIN (#8942) before technician enters your home.',
      icon: ShieldCheck
    },
    {
      step: '04',
      title: 'Standard Tariff Payment',
      desc: 'Pay cash on delivery or EasyPaisa/JazzCash with 0% peak-hour surcharge.',
      icon: CheckCircle2
    }
  ];

  const officialTariffs = [
    { service: 'Inverter AC Chemical Servicing & Gas Refill', category: 'AC & Cooling', rate: 'Rs. 1,800', estTime: '45 Mins' },
    { service: 'Submersible Water Pump Motor Rewinding', category: 'Plumbing & Motor', rate: 'Rs. 1,200', estTime: '60 Mins' },
    { service: 'UPS Dual Battery Backup Line Wiring', category: 'Electrician & UPS', rate: 'Rs. 800', estTime: '30 Mins' },
    { service: 'Seepage Wall Treatment & Roof Heat Shield', category: 'Painting & Seepage', rate: 'Rs. 2,500', estTime: '120 Mins' },
    { service: 'Main Entrance Lock Alignment & Repair', category: 'Carpentry & Doors', rate: 'Rs. 600', estTime: '30 Mins' }
  ];

  const customerReviews = [
    {
      name: 'Tariq Mansoor',
      sector: 'Qasimabad Phase 1',
      service: 'AC PCB Inverter Fix',
      rating: 5,
      comment: 'Imran Ali arrived within 18 minutes during peak 42°C afternoon heat. Showed CNIC badge and fixed the inverter PCB right in front of us.',
      date: '2 days ago'
    },
    {
      name: 'Dr. Sarah Ahmed',
      sector: 'Auto Bhan Road',
      service: 'Sanitary & Motor Repair',
      rating: 5,
      comment: 'Water motor stopped at 8 AM. Master Tariq diagnosed the capacitor fault and had water running again by 8:45 AM. Excellent guild standard!',
      date: '1 week ago'
    },
    {
      name: 'Bilal Sheikh',
      sector: 'Latifabad Unit 6',
      service: 'UPS Wiring & Breaker Box',
      rating: 5,
      comment: 'Very professional. Transparent pricing according to official Sindh tariff table. Will definitely recommend KaarigarConnect.',
      date: '3 days ago'
    }
  ];

  const faqs = [
    {
      q: 'How are Kaarigars verified for safety?',
      a: 'Every craftsman on KaarigarConnect undergoes mandatory NADRA CNIC verification and criminal background clearance with the Sindh Police Branch. Each technician carries an active Guild Digital Badge (e.g. SD-8821).'
    },
    {
      q: 'What is the Doorstep Verification PIN?',
      a: 'When you confirm a booking, a unique 4-digit PIN (e.g. #8942) is generated in your app. The technician must state this PIN before entering your home.'
    },
    {
      q: 'Are there extra charges during peak summer heatwave hours?',
      a: 'No. All rates follow official Sindh Guild Tariff Standards with 0% hidden surcharges or peak-hour pricing gouging.'
    },
    {
      q: 'What payment methods are supported?',
      a: 'You can pay directly via Cash on Delivery (COD), EasyPaisa, or JazzCash after the service is completed to your satisfaction.'
    }
  ];

  useEffect(() => {
    marketplaceService.getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    marketplaceService.getProviders(selectedCategory, searchQuery, locality).then(setProviders);
  }, [selectedCategory, searchQuery, locality]);

  return (
    <div className="space-y-12 sm:space-y-16 py-2 sm:py-4">
      {/* 1. HERO SECTION & MASTER SEARCH TERMINAL */}
      <section className="bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12 space-y-6">
          
          {/* Telemetry Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-[#004331] text-xs font-bold border border-slate-200">
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

          {/* Headline Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 flex flex-col space-y-3">
              <h1 className="font-headline font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
                Find trusted local help in <span className="text-[#004331] underline decoration-amber-400 decoration-wavy underline-offset-4">Hyderabad</span>.
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed font-normal">
                From an emergency AC breakdown in peak 42°C heat to instant water motor rewinding, connect with NADRA-verified skilled craftsmen within 30 minutes.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm w-full max-w-sm flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Peak Summer Hotline</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[#004331] bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Active Now
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#004331] text-white flex items-center justify-center shadow-sm">
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
          <div className="p-3 rounded-2xl bg-slate-100 shadow-xl border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center bg-white p-3 rounded-xl shadow-xs border border-slate-200">
              
              {/* Service Input */}
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
                    placeholder="Search AC PCB, plumber, electrician, motor..."
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-800 focus:outline-none truncate font-semibold"
                  />
                </div>
              </div>

              <div className="hidden md:block w-px h-8 bg-slate-200"></div>

              {/* Locality Dropdown */}
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

              {/* Urgency Dropdown */}
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

              {/* Search CTA */}
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

          {/* Frequent Searches Chips */}
          <div className="flex flex-wrap items-center gap-2">
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

          {/* 4 Trust Highlights Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50/80 rounded-2xl p-4 border border-slate-200">
            {trustHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#004331]/10 text-[#004331] flex items-center justify-center shrink-0">
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

      {/* 2. CATEGORY FILTERS & FEATURED CRAFTSMEN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline font-extrabold text-xl sm:text-2xl text-slate-900">Marketplace Categories</h2>
            <p className="text-xs text-slate-500 font-medium">Select a service trade to filter verified craftsmen</p>
          </div>
          <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-[#004331]" /> Guild Certified Standards
          </span>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="flex items-center justify-between pt-4">
          <div>
            <h3 className="font-headline font-extrabold text-lg sm:text-xl text-slate-900">Available Kaarigars in {locality}</h3>
            <p className="text-xs text-slate-500 font-medium">NADRA CNIC Verified · Instant 30-Min Doorstep Dispatch</p>
          </div>
          <span className="text-xs text-[#004331] font-extrabold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {providers.length} Craftsmen Active
          </span>
        </div>

        {/* Kaarigars Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* 3. HOW IT WORKS 4-STEP WORKFLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-8 shadow-xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-extrabold uppercase tracking-wider border border-emerald-500/30">
              Simple & Verified
            </span>
            <h2 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">How KaarigarConnect Works</h2>
            <p className="text-xs sm:text-sm text-slate-400">4-step dispatch workflow designed for safety and speed across Hyderabad.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-headline font-extrabold text-2xl text-slate-700">{s.step}</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-white">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. OFFICIAL SINDH DISTRICT TARIFF RATE CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-headline font-extrabold text-xl sm:text-2xl text-slate-900">Official Sindh District Tariff Rates</h2>
            <p className="text-xs text-slate-500 font-medium">Standardized pricing table enforced across all Hyderabad sectors</p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
            0% Overcharging Policy
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 border-b border-slate-200 uppercase text-[10px] font-extrabold text-slate-500 tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Service Description</th>
                  <th className="px-6 py-3.5">Trade Category</th>
                  <th className="px-6 py-3.5">Standard Rate</th>
                  <th className="px-6 py-3.5">Est. Arrival</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {officialTariffs.map((t, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{t.service}</td>
                    <td className="px-6 py-4 font-semibold text-[#004331]">{t.category}</td>
                    <td className="px-6 py-4 font-extrabold text-slate-900">{t.rate}</td>
                    <td className="px-6 py-4 text-slate-500">{t.estTime}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => onNavigate('map')}
                        className="px-3 py-1.5 rounded-lg bg-[#004331] text-white hover:bg-[#0d5c46] font-bold text-[11px] transition-colors"
                      >
                        Book Dispatch
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. RECENT CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900">Verified Customer Reviews</h2>
          <p className="text-xs text-slate-500 font-medium">Real feedback from householders in Qasimabad, Latifabad & Saddar.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {customerReviews.map((r, i) => (
            <div key={i} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(r.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{r.date}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-normal italic">"{r.comment}"</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-xs text-slate-900">{r.name}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{r.sector} · {r.service}</p>
                </div>
                <ShieldCheck className="w-4 h-4 text-[#004331]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. INTERACTIVE FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-headline font-extrabold text-2xl text-slate-900">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500 font-medium">Everything you need to know about safety, pricing, and dispatch.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaqIndex === idx;
            return (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <button
                  onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#004331]" /> {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#004331] to-[#0d5c46] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h2 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">Need Emergency Help Right Now?</h2>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium">
              Call our Saddar Guild Dispatch helpline or open the Google Maps live directory for instant dispatch within 30 minutes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:0222784910"
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-lg transition-colors flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call 022-2784910</span>
            </a>
            <Button
              onClick={() => onNavigate('map')}
              variant="secondary"
              className="px-5 py-3 rounded-xl bg-white text-[#004331] hover:bg-slate-100 font-extrabold text-xs flex items-center gap-2"
            >
              <Map className="w-4 h-4" />
              <span>Open Google Maps</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
