import React from 'react';
import { ProviderProfile } from '../../types/database.types';
import { Compass, Navigation } from 'lucide-react';

interface SectorMapProps {
  providers: ProviderProfile[];
  onSelectProvider: (id: string) => void;
}

export const SectorMap: React.FC<SectorMapProps> = ({ providers, onSelectProvider }) => {
  const sectors = [
    { name: 'Latifabad Unit 6', x: 55, y: 65 },
    { name: 'Latifabad Unit 2 & 3', x: 48, y: 58 },
    { name: 'Qasimabad Phase 1', x: 30, y: 35 },
    { name: 'Qasimabad Phase 2', x: 25, y: 25 },
    { name: 'Auto Bhan Road', x: 42, y: 48 },
    { name: 'Saddar Bazaar & Cantt', x: 58, y: 30 },
    { name: 'Citizen Colony', x: 38, y: 42 }
  ];

  return (
    <div className="relative w-full h-[520px] bg-[#1a2636] rounded-2xl overflow-hidden shadow-inner border border-outline-variant/30 select-none">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#2d3d54_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#0d5c46_1px,transparent_1px),linear-gradient(to_bottom,#0d5c46_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      {/* Map Header */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-md border border-outline-variant/40">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-primary" />
          <span className="font-bold text-on-surface text-sm">Hyderabad Sector Map</span>
          <span className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary text-[11px] font-semibold">
            {providers.length} Kaarigars Pinpointed
          </span>
        </div>
        <button className="px-3 py-1.5 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg text-xs font-semibold flex items-center gap-1">
          <Navigation className="w-3.5 h-3.5 text-primary" />
          Recenter Latifabad
        </button>
      </div>

      {/* Sector Labels */}
      {sectors.map((s, idx) => (
        <div
          key={idx}
          className="absolute z-10 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
        >
          <span className="px-2 py-1 bg-white/80 text-on-surface-variant rounded text-[10px] font-semibold border border-outline-variant/30 backdrop-blur-xs">
            {s.name}
          </span>
        </div>
      ))}

      {/* Provider Markers */}
      {providers.map((p, idx) => {
        const sector = sectors[idx % sectors.length];
        const posX = Math.max(15, Math.min(85, sector.x + (idx % 2 === 0 ? 5 : -5)));
        const posY = Math.max(15, Math.min(85, sector.y + (idx % 2 === 0 ? -5 : 5)));

        return (
          <div
            key={p.id}
            onClick={() => onSelectProvider(p.id)}
            className="absolute z-30 transform -translate-x-1/2 -translate-y-full cursor-pointer transition-transform hover:scale-125 group"
            style={{ left: `${posX}%`, top: `${posY}%` }}
          >
            <div className="relative flex flex-col items-center">
              <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center bg-white text-on-surface p-2 rounded-lg shadow-xl border border-outline-variant/40 min-w-[140px] z-50">
                <p className="font-bold text-xs leading-tight text-primary">{p.name}</p>
                <p className="text-[10px] text-on-surface-variant truncate">{p.profession}</p>
                <span className="mt-1 px-1.5 py-0.5 bg-primary text-on-primary text-[9px] font-bold rounded">
                  Rs. {p.starting_price} Base
                </span>
              </div>

              <div className="w-10 h-10 rounded-full border-2 border-primary bg-white p-0.5 shadow-lg relative flex items-center justify-center">
                <img src={p.avatar_url} alt={p.name} className="w-full h-full rounded-full object-cover" />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                  ✓
                </span>
              </div>
              <div className="w-2 h-2 bg-primary transform rotate-45 -mt-1 shadow-md"></div>
            </div>
          </div>
        );
      })}

      {/* Map Footer Legend */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-xs text-on-surface-variant border border-outline-variant/30">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary"></span> NADRA Verified Kaarigar
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span> Instant Dispatch
          </span>
        </div>
        <span className="font-mono text-[11px] text-outline">HYD-GPS: 25.3960° N, 68.3578° E</span>
      </div>
    </div>
  );
};
