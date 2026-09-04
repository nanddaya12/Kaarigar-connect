import React from 'react';
import { Home, Map, Mic, Receipt, Wrench, ShieldCheck } from 'lucide-react';

interface MobileNavProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeView, onNavigate }) => {
  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'ai_triage', label: 'AI Voice', icon: Mic },
    { id: 'tracking', label: 'Orders', icon: Receipt },
    { id: 'provider', label: 'Console', icon: Wrench },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-2xl py-2 px-3 flex items-center justify-around lg:hidden">
      {items.map(item => {
        const Icon = item.icon;
        const isActive = activeView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
              isActive 
                ? 'text-emerald-800 font-extrabold bg-emerald-50 scale-105' 
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
            <span className="text-[10px] leading-none tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
