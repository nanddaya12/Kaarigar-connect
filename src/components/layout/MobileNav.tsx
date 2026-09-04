import React from 'react';
import { Home, Map, Mic, Receipt, Wrench } from 'lucide-react';

interface MobileNavProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeView, onNavigate }) => {
  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'ai_triage', label: 'Voice AI', icon: Mic },
    { id: 'tracking', label: 'Orders', icon: Receipt },
    { id: 'provider', label: 'Console', icon: Wrench },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-outline-variant/60 py-2 px-4 flex items-center justify-around xl:hidden shadow-lg">
      {items.map(item => {
        const Icon = item.icon;
        const isActive = activeView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-0.5 transition-colors ${isActive ? 'text-primary font-bold' : 'text-outline'}`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px]">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
