import React, { useState, useEffect, useRef } from 'react';
import { ProviderProfile } from '../../types/database.types';
import { 
  Compass, 
  Layers, 
  Navigation, 
  MapPin, 
  Crosshair, 
  CheckCircle2, 
  Search, 
  Star, 
  ShieldCheck, 
  SlidersHorizontal,
  X,
  ExternalLink,
  ChevronRight,
  List,
  Map as MapIcon,
  PhoneCall
} from 'lucide-react';
import { Button } from '../ui/Button';

interface SectorMapProps {
  providers: ProviderProfile[];
  onSelectProvider: (id: string) => void;
  onBookNow?: (provider: ProviderProfile) => void;
}

export const SectorMap: React.FC<SectorMapProps> = ({ 
  providers, 
  onSelectProvider,
  onBookNow
}) => {
  // Default map style is ROADMAP (t=m) as requested in Section 8
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [activeSector, setActiveSector] = useState<string>('Latifabad Unit 6');
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationStatus, setLocationStatus] = useState<string>('');
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'nearby' | 'top_rated' | 'available' | 'budget'>('all');
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
  
  // Mobile View Toggle ('map' | 'list')
  const [mobileView, setMobileView] = useState<'split' | 'map' | 'list'>('split');

  const cardListRef = useRef<HTMLDivElement>(null);

  // Hyderabad Sectors
  const sectors = [
    { name: 'Latifabad Unit 6', query: 'Latifabad+Unit+6+Hyderabad+Pakistan', lat: 25.3670, lng: 68.3690 },
    { name: 'Qasimabad Phase 1', query: 'Qasimabad+Hyderabad+Pakistan', lat: 25.4050, lng: 68.3300 },
    { name: 'Saddar Bazaar & Cantt', query: 'Saddar+Bazaar+Hyderabad+Pakistan', lat: 25.3960, lng: 68.3578 },
    { name: 'Auto Bhan Road', query: 'Auto+Bhan+Road+Hyderabad+Pakistan', lat: 25.3780, lng: 68.3540 },
    { name: 'Citizen Colony', query: 'Citizen+Colony+Hyderabad+Pakistan', lat: 25.4120, lng: 68.3450 }
  ];

  const activeSectorInfo = sectors.find((s) => s.name === activeSector) || sectors[0];

  // Geolocation Handler
  const handleCaptureLiveLocation = () => {
    setIsLocating(true);
    setLocationStatus('Locating your GPS...');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserCoords({ lat, lng });
          setIsLocating(false);
          setLocationStatus(`GPS: ${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`);
        },
        (error) => {
          setIsLocating(false);
          setLocationStatus('Using sector default coordinates');
          console.warn('Geolocation error:', error.message);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setIsLocating(false);
      setLocationStatus('Geolocation not supported');
    }
  };

  useEffect(() => {
    handleCaptureLiveLocation();
  }, []);

  // Filter Providers
  const filteredProviders = providers.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedFilter === 'nearby') return parseFloat(p.distance_km || '2.0') <= 2.5;
    if (selectedFilter === 'top_rated') return p.rating >= 4.8;
    if (selectedFilter === 'available') return p.is_available;
    if (selectedFilter === 'budget') return p.starting_price <= 1000;

    return true;
  });

  const selectedProvider = providers.find((p) => p.id === selectedProviderId) || filteredProviders[0];

  // Map Embed URL
  const selectedEmbedQuery = selectedProvider
    ? `${selectedProvider.name}+${selectedProvider.locality}+Hyderabad+Pakistan`
    : userCoords 
    ? `${userCoords.lat},${userCoords.lng}` 
    : activeSectorInfo.query;

  const mapTypeParam = mapType === 'satellite' ? 'k' : 'm';
  const googleMapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(selectedEmbedQuery)}&t=${mapTypeParam}&z=15&ie=UTF8&iwloc=&output=embed`;

  // Synchronized Selection Handler
  const handleSelectProviderCard = (id: string) => {
    setSelectedProviderId(id);
    const element = document.getElementById(`provider-card-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. TOP SEARCH & LOCATION BAR */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Main Search Input */}
          <div className="relative flex-grow w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What service do you need? (e.g. AC repair, plumber, electrician...)"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004331] placeholder:text-slate-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Location Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-emerald-50 border border-emerald-200 text-[#004331] rounded-2xl text-xs font-extrabold w-full sm:w-auto">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <select
                value={activeSector}
                onChange={(e) => {
                  setActiveSector(e.target.value);
                  setUserCoords(null);
                }}
                className="bg-transparent font-extrabold focus:outline-none text-slate-900 cursor-pointer"
              >
                {sectors.map((s) => (
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Live GPS Recenter Button */}
            <button
              onClick={handleCaptureLiveLocation}
              disabled={isLocating}
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
              title="Recenter Live Location"
            >
              <Crosshair className={`w-4 h-4 ${isLocating ? 'animate-spin text-amber-600' : 'text-[#004331]'}`} />
            </button>
          </div>
        </div>

        {/* 2. HORIZONTAL FILTER CHIPS */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-slate-100 pt-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                selectedFilter === 'all'
                  ? 'bg-[#004331] text-amber-400 shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Kaarigars
            </button>

            <button
              onClick={() => setSelectedFilter('nearby')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                selectedFilter === 'nearby'
                  ? 'bg-[#004331] text-amber-400 shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              📍 Nearby (&lt;2.5 km)
            </button>

            <button
              onClick={() => setSelectedFilter('top_rated')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                selectedFilter === 'top_rated'
                  ? 'bg-[#004331] text-amber-400 shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              ★ Top Rated (4.8+)
            </button>

            <button
              onClick={() => setSelectedFilter('available')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                selectedFilter === 'available'
                  ? 'bg-[#004331] text-amber-400 shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              ⚡ Available Today
            </button>

            <button
              onClick={() => setSelectedFilter('budget')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                selectedFilter === 'budget'
                  ? 'bg-[#004331] text-amber-400 shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              💰 Under Rs. 1,000
            </button>
          </div>

          {/* Map Layer Switcher */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0 border border-slate-200">
            <button
              onClick={() => setMapType('roadmap')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                mapType === 'roadmap' ? 'bg-[#004331] text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              🗺️ Roadmap
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                mapType === 'satellite' ? 'bg-[#004331] text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              🛰️ Satellite
            </button>
          </div>
        </div>
      </div>

      {/* 3. MOBILE MAP/LIST VIEW TOGGLE BUTTONS */}
      <div className="flex lg:hidden items-center justify-between bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
        <span className="text-xs font-extrabold text-slate-800 px-2">
          {filteredProviders.length} verified professionals
        </span>
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setMobileView('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
              mobileView === 'list' ? 'bg-[#004331] text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            <List className="w-3.5 h-3.5" /> List
          </button>
          <button
            onClick={() => setMobileView('map')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
              mobileView === 'map' ? 'bg-[#004331] text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" /> Map
          </button>
        </div>
      </div>

      {/* 4. SPLIT DISCOVERY CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* LEFT COLUMN: PROVIDER CARDS LIST */}
        <div
          ref={cardListRef}
          className={`lg:col-span-5 space-y-3.5 ${
            mobileView === 'map' ? 'hidden lg:block' : 'block'
          }`}
        >
          <div className="flex items-center justify-between px-1">
            <h3 className="font-headline font-extrabold text-sm text-slate-900">
              {filteredProviders.length} verified professionals near you
            </h3>
            <span className="text-xs font-semibold text-emerald-800">Sorted by Distance</span>
          </div>

          {filteredProviders.length > 0 ? (
            <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
              {filteredProviders.map((p) => {
                const isSelected = p.id === (selectedProviderId || filteredProviders[0]?.id);
                return (
                  <div
                    key={p.id}
                    id={`provider-card-${p.id}`}
                    onClick={() => handleSelectProviderCard(p.id)}
                    className={`p-4 rounded-3xl border transition-all cursor-pointer space-y-3 ${
                      isSelected
                        ? 'bg-emerald-50/80 border-[#004331] shadow-lg ring-2 ring-[#004331]/20 scale-[1.01]'
                        : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.avatar_url}
                          alt={p.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-[#004331] shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-extrabold text-sm text-slate-900">{p.name}</h4>
                            {p.verified && <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />}
                          </div>
                          <p className="text-xs font-bold text-[#004331]">{p.profession}</p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium mt-0.5">
                            <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {p.rating} ({p.review_count})
                            </span>
                            <span>·</span>
                            <span>{p.distance_km || '1.8'} km away</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-extrabold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200 block">
                          From Rs. {p.starting_price}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-extrabold mt-1 block">
                          {p.is_available ? '⚡ Available Today' : '📅 Book Tomorrow'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-200/60 pt-2.5">
                      <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-600" /> {p.locality}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProvider(p.id);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold transition-colors"
                        >
                          View Profile
                        </button>

                        {onBookNow && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onBookNow(p);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold transition-colors shadow-xs"
                          >
                            Request
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-slate-900">No professionals found nearby</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 font-medium">
                  Try expanding your search radius, selecting a different sector, or resetting filters.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFilter('all');
                }}
              >
                Expand Search & Reset Filters
              </Button>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: MAP CONTAINER & SYNCHRONIZED PREVIEW POPUP */}
        <div
          className={`lg:col-span-7 relative w-full h-[580px] rounded-3xl overflow-hidden shadow-xl border border-slate-300 ${
            mobileView === 'list' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Map iFrame */}
          <iframe
            title="Google Maps Sector Discovery"
            width="100%"
            height="100%"
            src={googleMapEmbedUrl}
            className="border-0 w-full h-full"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          {/* Customer Location Overlay Badge */}
          <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border border-slate-200 flex items-center gap-2 text-xs font-extrabold text-slate-900">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>◎ You are in {activeSector}</span>
          </div>

          {/* SYNCHRONIZED PROVIDER MAP PREVIEW POPUP */}
          {selectedProvider && (
            <div className="absolute bottom-4 left-4 right-4 z-30 bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-2xl border border-slate-200 max-w-lg mx-auto space-y-3 animate-in slide-in-from-bottom duration-200">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedProvider.avatar_url}
                    alt={selectedProvider.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-600 shadow-md shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-headline font-extrabold text-sm text-slate-900">
                        {selectedProvider.name}
                      </h4>
                      {selectedProvider.verified && (
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs font-bold text-[#004331]">{selectedProvider.profession}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                      <span className="text-amber-700 font-bold">★ {selectedProvider.rating} ({selectedProvider.review_count} reviews)</span>
                      <span>·</span>
                      <span>{selectedProvider.distance_km || '1.8'} km away</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-extrabold text-[#004331] bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 block">
                    From Rs. {selectedProvider.starting_price}
                  </span>
                  <span className="text-[10px] text-emerald-800 font-extrabold mt-0.5 block">
                    {selectedProvider.is_available ? 'Available today' : 'Book tomorrow'}
                  </span>
                </div>
              </div>

              {/* Action Buttons inside Map Popup */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${selectedProvider.name} ${selectedProvider.locality} Hyderabad`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-600" /> Get Directions
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectProvider(selectedProvider.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold transition-colors"
                  >
                    View Profile
                  </button>

                  {onBookNow && (
                    <button
                      onClick={() => onBookNow(selectedProvider)}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold transition-colors shadow-md"
                    >
                      Request Service
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
