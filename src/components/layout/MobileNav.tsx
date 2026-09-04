import React from 'react';
import { Home, Map, Receipt, Wrench, ShieldCheck, Inbox, Briefcase, MessageSquare, User, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface MobileNavProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeView, onNavigate }) => {
  const { role } = useAuth();

  const customerItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Map },
    { id: 'tracking', label: 'Requests', icon: Receipt },
    { id: 'chat_view', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const providerItems = [
    { id: 'provider', label: 'Home', icon: Home },
    { id: 'provider_requests', label: 'Requests', icon: Inbox },
    { id: 'provider_jobs', label: 'Jobs', icon: Briefcase },
    { id: 'chat_view', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const adminItems = [
    { id: 'admin', label: 'Home', icon: Home },
    { id: 'admin_verification', label: 'Verify', icon: ShieldCheck },
    { id: 'admin_users', label: 'Users', icon: Users },
    { id: 'admin_requests', label: 'Orders', icon: Receipt },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const items = role === 'customer' 
    ? customerItems 
    : role === 'provider' 
    ? providerItems 
    : adminItems;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#004331] text-white border-t border-emerald-800 shadow-2xl py-2 px-3 flex items-center justify-around lg:hidden">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
              isActive
                ? 'text-slate-950 font-extrabold bg-amber-500 scale-105 shadow-md'
                : 'text-emerald-200 hover:text-white font-medium'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-slate-950' : 'text-emerald-300'}`} />
            <span className="text-[10px] leading-none tracking-tight font-bold">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
