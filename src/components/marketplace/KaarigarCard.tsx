import React from 'react';
import { ProviderProfile } from '../../types/database.types';
import { Star, ShieldCheck, MapPin, Clock, Heart, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface KaarigarCardProps {
  provider: ProviderProfile;
  onSelectProfile: (id: string) => void;
  onBookNow: (provider: ProviderProfile) => void;
}

export const KaarigarCard: React.FC<KaarigarCardProps> = ({
  provider,
  onSelectProfile,
  onBookNow,
}) => {
  const { toggleSaveProvider, isProviderSaved } = useAuth();
  const isSaved = isProviderSaved(provider.id);

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group relative overflow-hidden">
      
      {/* Top Header Row */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={provider.avatar_url}
                alt={provider.name}
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#004331]/20 group-hover:ring-[#004331] transition-all"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#004331] text-white rounded-full flex items-center justify-center text-[9px] font-extrabold ring-2 ring-white">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 
                  onClick={() => onSelectProfile(provider.id)}
                  className="font-headline font-extrabold text-base text-slate-900 hover:text-[#004331] cursor-pointer transition-colors leading-tight"
                >
                  {provider.name}
                </h3>
                <ShieldCheck className="w-4 h-4 text-[#004331]" title="NADRA CNIC & Sindh Police Verified" />
              </div>
              <p className="text-xs font-bold text-[#004331]">{provider.profession}</p>
            </div>
          </div>

          {/* Save / Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveProvider(provider.id);
            }}
            className={`p-2 rounded-xl transition-colors border ${
              isSaved
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-rose-500 hover:bg-rose-50/50'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save provider'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Rating & Distance Telemetry */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2.5 py-1 rounded-lg border border-amber-200/60 font-extrabold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{provider.rating}</span>
            <span className="text-slate-400 font-normal">({provider.review_count} reviews)</span>
          </div>

          <div className="flex items-center gap-1 text-slate-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <span>1.8 km away · {provider.service_area}</span>
          </div>
        </div>

        {/* Status & Response Time Pills */}
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#004331] font-extrabold border border-emerald-200/60 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Available Today
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold border border-slate-200 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" /> Responds in ~{provider.response_time}
          </span>
        </div>

        {/* Skills Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {provider.skills.slice(0, 3).map((skill, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Pricing & CTA Actions */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block leading-none">Starting From</span>
          <span className="font-headline font-extrabold text-base text-slate-900 leading-tight">
            Rs. {provider.starting_price.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectProfile(provider.id)}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
          >
            View Profile
          </button>
          <button
            onClick={() => onBookNow(provider)}
            className="px-3.5 py-2 rounded-xl bg-[#004331] hover:bg-[#0d5c46] text-white font-extrabold text-xs transition-colors shadow-xs flex items-center gap-1"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Request</span>
          </button>
        </div>
      </div>

    </div>
  );
};
