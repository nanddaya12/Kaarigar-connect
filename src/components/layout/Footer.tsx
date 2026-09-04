import React from 'react';
import { ShieldCheck, MapPin, Phone, Sparkles, Map, Bike, Wrench } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-900 font-extrabold flex items-center justify-center text-xl shadow-md">
                K
              </div>
              <div>
                <span className="font-headline font-extrabold text-lg text-white tracking-tight leading-none block">
                  Kaarigar<span className="text-emerald-400">Connect</span>
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                  Hyderabad District Division · Sindh
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-normal">
              Connecting households across Latifabad, Qasimabad, Saddar, and Auto Bhan with NADRA CNIC-verified skilled artisans and craftsmen within 30 minutes.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-xl w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Sindh Police Branch CNIC Verified Network</span>
            </div>
          </div>

          {/* Essential Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Essential Navigation</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> Marketplace Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('map')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Map className="w-3.5 h-3.5 text-emerald-500" /> Hyderabad Sector Map
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai_triage')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Voice Triage
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tracking')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Bike className="w-3.5 h-3.5 text-emerald-500" /> Live Order Tracking
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('provider')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-emerald-500" /> Kaarigar Provider Console
                </button>
              </li>
            </ul>
          </div>

          {/* Hotline & Coverage Corridors */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Hyderabad Helpline Hotline</h4>
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-900 flex items-center justify-center font-bold">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <a href="tel:0222784910" className="font-headline font-extrabold text-lg text-white hover:text-emerald-400 leading-none">
                    022-2784910
                  </a>
                  <p className="text-[11px] text-slate-400">Saddar Guild Dispatch Center</p>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Coverage: Latifabad Units 1-12, Qasimabad, Auto Bhan, Saddar
            </p>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© 2026 KaarigarConnect Hyderabad. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-500 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Network Operational
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
