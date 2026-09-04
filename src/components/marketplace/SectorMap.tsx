import React, { useState, useEffect } from 'react';
import { ProviderProfile } from '../../types/database.types';
import { Compass, Layers, Navigation, MapPin, PhoneCall, Crosshair, CheckCircle2 } from 'lucide-react';

interface SectorMapProps {
  providers: ProviderProfile[];
  onSelectProvider: (id: string) => void;
}

export const SectorMap: React.FC<SectorMapProps> = ({ providers, onSelectProvider }) => {
  const [mapType, setMapType] = useState<'satellite' | 'roadmap'>('satellite');
  const [activeSector, setActiveSector] = useState<string>('Latifabad Unit 6');
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationStatus, setLocationStatus] = useState<string>('');

  // Hyderabad Google Maps Corridors
  const sectors = [
    { name: 'Latifabad Unit 6', query: 'Latifabad+Unit+6+Hyderabad+Pakistan', lat: 25.3670, lng: 68.3690 },
    { name: 'Qasimabad Phase 1', query: 'Qasimabad+Hyderabad+Pakistan', lat: 25.4050, lng: 68.3300 },
    { name: 'Saddar Bazaar & Cantt', query: 'Saddar+Bazaar+Hyderabad+Pakistan', lat: 25.3960, lng: 68.3578 },
    { name: 'Auto Bhan Road', query: 'Auto+Bhan+Road+Hyderabad+Pakistan', lat: 25.3780, lng: 68.3540 },
    { name: 'Citizen Colony', query: 'Citizen+Colony+Hyderabad+Pakistan', lat: 25.4120, lng: 68.3450 }
  ];

  const activeSectorInfo = sectors.find(s => s.name === activeSector) || sectors[0];

  // Geolocation Capture Handler
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
          setLocationStatus(`Live Location: ${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`);
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

  // Google Maps Embed URL (t=k for Satellite, t=m for Standard Map)
  const mapTypeParam = mapType === 'satellite' ? 'k' : 'm';
  const embedQuery = userCoords 
    ? `${userCoords.lat},${userCoords.lng}` 
    : activeSectorInfo.query;
  const googleMapEmbedUrl = `https://maps.google.com/maps?q=${embedQuery}&t=${mapTypeParam}&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="space-y-4">
      {/* Map Control Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl shadow-md border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-[#004331] flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-headline font-extrabold text-base text-slate-900 leading-none">
                Google Maps GPS Directory
              </h3>
              {userCoords ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#004331] text-[10px] font-extrabold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> GPS Active
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold">
                  Sector Mode
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {locationStatus || 'Real-time dispatch radar across Hyderabad sectors'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Live Location Capture Button */}
          <button
            onClick={handleCaptureLiveLocation}
            disabled={isLocating}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#004331] text-xs font-extrabold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Crosshair className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin text-amber-600' : 'text-[#004331]'}`} />
            <span>{isLocating ? 'Capturing GPS...' : userCoords ? 'Recenter Live Location' : 'Capture My Location'}</span>
          </button>

          {/* Google Maps View Switcher (Satellite vs Roadmap) */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setMapType('satellite')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                mapType === 'satellite'
                  ? 'bg-[#004331] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>🛰️ Satellite</span>
            </button>

            <button
              onClick={() => setMapType('roadmap')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                mapType === 'roadmap'
                  ? 'bg-[#004331] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>🗺️ Roadmap</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sector Focus Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
        <span className="text-xs font-bold text-slate-500 shrink-0 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-amber-600" /> Hyderabad Sector Focus:
        </span>
        {sectors.map((sec) => (
          <button
            key={sec.name}
            onClick={() => {
              setActiveSector(sec.name);
              setUserCoords(null); // Return to sector view
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              activeSector === sec.name && !userCoords
                ? 'bg-slate-900 text-white shadow-md scale-102 ring-2 ring-slate-800'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {sec.name}
          </button>
        ))}
      </div>

      {/* Main Clean Google Map iFrame (NO EXTRA BARS / OVERLAYS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 relative w-full h-[520px] rounded-3xl overflow-hidden shadow-xl border border-slate-300">
          <iframe
            title="Google Maps Hyderabad"
            width="100%"
            height="100%"
            src={googleMapEmbedUrl}
            className="border-0 w-full h-full"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Live Active Kaarigar Pins Sidebar */}
        <div className="lg:col-span-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-lg space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-headline font-extrabold text-sm text-slate-900">Craftsmen in {activeSector}</h4>
              <span className="text-[10px] font-extrabold text-[#004331] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {providers.length} Active
              </span>
            </div>

            <div className="space-y-3 mt-3 max-h-[380px] overflow-y-auto pr-1">
              {providers.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelectProvider(p.id)}
                  className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={p.avatar_url} alt={p.name} className="w-9 h-9 rounded-full object-cover border border-emerald-600" />
                      <div>
                        <p className="font-extrabold text-xs text-slate-900 group-hover:text-[#004331] leading-tight">{p.name}</p>
                        <p className="text-[10px] text-emerald-800 font-bold">{p.profession}</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-xs">
                      Rs. {p.starting_price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200/60 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-600" /> {p.service_area}
                    </span>
                    <span className="text-amber-800 font-bold">★ {p.rating} ({p.review_count})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#004331] text-white flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-emerald-200 uppercase">Emergency Dispatch</p>
              <p className="font-extrabold text-xs text-white">022-2784910</p>
            </div>
            <a
              href="tel:0222784910"
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-extrabold shadow-sm transition-colors flex items-center gap-1"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
