import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { ProviderProfile } from '../../types/database.types';
import { Compass, Navigation, Layers, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

interface SectorMapProps {
  providers: ProviderProfile[];
  onSelectProvider: (id: string) => void;
}

export const SectorMap: React.FC<SectorMapProps> = ({ providers, onSelectProvider }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  
  const [mapMode, setMapMode] = useState<'street' | 'satellite'>('satellite');
  const [activeSector, setActiveSector] = useState<string>('Latifabad Unit 6');

  // Hyderabad Sector Coordinates
  const sectors = [
    { name: 'Latifabad Unit 6', lat: 25.3670, lng: 68.3690, zoom: 14 },
    { name: 'Qasimabad Phase 1', lat: 25.4050, lng: 68.3300, zoom: 14 },
    { name: 'Saddar Bazaar & Cantt', lat: 25.3960, lng: 68.3578, zoom: 15 },
    { name: 'Auto Bhan Road', lat: 25.3780, lng: 68.3540, zoom: 14 },
    { name: 'Citizen Colony', lat: 25.4120, lng: 68.3450, zoom: 14 }
  ];

  // Map Tile Sources
  const streetTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const satelliteTiles = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Leaflet Map
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [25.3960, 68.3578],
        zoom: 13,
        zoomControl: false
      });

      // Add Zoom Control to Top Right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Default Satellite Layer
      const initialLayer = L.tileLayer(satelliteTiles, {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 18
      }).addTo(map);

      tileLayerRef.current = initialLayer;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle Satellite vs Street Toggle
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const newUrl = mapMode === 'satellite' ? satelliteTiles : streetTiles;
    const attribution = mapMode === 'satellite' 
      ? 'Tiles &copy; Esri &mdash; World Imagery'
      : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    const newLayer = L.tileLayer(newUrl, { attribution, maxZoom: 18 }).addTo(map);
    tileLayerRef.current = newLayer;
  }, [mapMode]);

  // Update Markers on Map
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Clear existing non-tile layers (markers)
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add Custom Marker Pins for Providers
    providers.forEach((p, idx) => {
      const targetSector = sectors[idx % sectors.length];
      const offsetLat = (idx % 2 === 0 ? 0.002 : -0.002) * (idx + 1);
      const offsetLng = (idx % 2 === 0 ? -0.002 : 0.002) * (idx + 1);
      const lat = targetSector.lat + offsetLat;
      const lng = targetSector.lng + offsetLng;

      // Custom HTML Marker Icon
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div class="relative group cursor-pointer flex flex-col items-center">
            <div class="w-10 h-10 rounded-full ring-4 ring-emerald-600 bg-white p-0.5 shadow-2xl relative flex items-center justify-center transform transition-transform hover:scale-110">
              <img src="${p.avatar_url}" alt="${p.name}" class="w-full h-full rounded-full object-cover" />
              <span class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-700 text-white rounded-full flex items-center justify-center text-[9px] font-bold border border-white">✓</span>
            </div>
            <div class="w-2.5 h-2.5 bg-emerald-700 transform rotate-45 -mt-1 shadow-md"></div>
          </div>
        `,
        iconSize: [40, 48],
        iconAnchor: [20, 48],
        popupAnchor: [0, -48]
      });

      const popupContent = `
        <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 180px; padding: 4px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <img src="${p.avatar_url}" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover; border: 2px solid #0d5c46;" />
            <div>
              <h4 style="margin: 0; font-size: 13px; font-weight: 800; color: #0f172a;">${p.name}</h4>
              <p style="margin: 0; font-size: 11px; font-weight: 600; color: #0d5c46;">${p.profession}</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; justify-between: space-between; margin-top: 6px; font-size: 11px; background: #f1f5f9; padding: 4px 8px; border-radius: 8px;">
            <span style="font-weight: 700; color: #334155;">Rs. ${p.starting_price} Base</span>
            <span style="color: #166534; font-weight: 800;">★ ${p.rating}</span>
          </div>
          <button id="btn-select-${p.id}" style="width: 100%; margin-top: 8px; background: #0d5c46; color: white; border: none; padding: 6px 0; border-radius: 8px; font-size: 11px; font-weight: 700; cursor: pointer;">
            View Kaarigar Profile
          </button>
        </div>
      `;

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
      marker.bindPopup(popupContent);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-select-${p.id}`);
        if (btn) {
          btn.addEventListener('click', () => onSelectProvider(p.id));
        }
      });
    });
  }, [providers]);

  // Jump Map Camera to Sector
  const handleFlyToSector = (sector: typeof sectors[0]) => {
    setActiveSector(sector.name);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([sector.lat, sector.lng], sector.zoom, { duration: 1.5 });
    }
  };

  return (
    <div className="space-y-4">
      {/* Map Control Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl shadow-md border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-headline font-extrabold text-base text-slate-900 leading-none">Hyderabad Live GPS Map</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-extrabold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span> Live Satellite
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Real-time artisan dispatch radar across Hyderabad sectors</p>
          </div>
        </div>

        {/* Satellite vs Street Map Mode Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setMapMode('satellite')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              mapMode === 'satellite'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-slate-600 hover:bg-white/80'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>🛰️ Satellite View</span>
          </button>
          <button
            onClick={() => setMapMode('street')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              mapMode === 'street'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-slate-600 hover:bg-white/80'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>🗺️ Street View</span>
          </button>
        </div>
      </div>

      {/* Sector Quick Jump Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
        <span className="text-xs font-bold text-slate-500 shrink-0 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-amber-600" /> Sector Focus:
        </span>
        {sectors.map((sec) => (
          <button
            key={sec.name}
            onClick={() => handleFlyToSector(sec)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              activeSector === sec.name
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {sec.name}
          </button>
        ))}
      </div>

      {/* Interactive Map Canvas Container */}
      <div className="relative w-full h-[540px] rounded-3xl overflow-hidden shadow-xl border border-slate-300 z-10">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Map Legend Overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-white/95 backdrop-blur-md rounded-2xl text-xs font-bold text-slate-700 border border-slate-200 shadow-lg">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 ring-2 ring-emerald-200"></span> NADRA Verified Kaarigar
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-amber-200"></span> Instant Doorstep Dispatch
            </span>
          </div>
          <span className="font-mono text-[11px] text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Latifabad Unit 6 · 25.3960° N, 68.3578° E
          </span>
        </div>
      </div>
    </div>
  );
};
