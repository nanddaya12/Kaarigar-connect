import React, { useState, useEffect } from 'react';
import { ProviderProfile } from '../../types/database.types';
import { marketplaceService } from '../../services/marketplaceService';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Clock, 
  Award, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  Zap, 
  Heart, 
  Calendar,
  Wrench,
  ThumbsUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface KaarigarProfilePageProps {
  providerId: string;
  onBookNow: (provider: ProviderProfile) => void;
}

export const KaarigarProfilePage: React.FC<KaarigarProfilePageProps> = ({
  providerId,
  onBookNow,
}) => {
  const { toggleSaveProvider, isProviderSaved } = useAuth();
  const [provider, setProvider] = useState<ProviderProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'reviews'>('about');

  useEffect(() => {
    marketplaceService.getProviderById(providerId).then(setProvider);
  }, [providerId]);

  if (!provider) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-slate-100 animate-spin mx-auto"></div>
        <p className="text-sm font-bold text-slate-500">Loading Kaarigar Profile...</p>
      </div>
    );
  }

  const isSaved = isProviderSaved(provider.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8 pb-24 md:pb-12">
      
      {/* Header Banner Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative">
              <img
                src={provider.avatar_url}
                alt={provider.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-[#004331]/20 border-2 border-white shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#004331] text-white rounded-full flex items-center justify-center text-xs font-extrabold ring-2 ring-white">
                ✓
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-headline font-extrabold text-xl sm:text-2xl text-slate-900">{provider.name}</h1>
                <span title="NADRA CNIC & Sindh Police Verified">
                  <ShieldCheck className="w-5 h-5 text-[#004331]" />
                </span>
              </div>
              <p className="font-bold text-sm text-[#004331]">{provider.profession}</p>

              <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
                <span className="flex items-center gap-1 font-extrabold text-amber-950 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{provider.rating}</span>
                  <span className="text-slate-500 font-normal">({provider.review_count} reviews)</span>
                </span>
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" /> 1.8 km · {provider.service_area}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => toggleSaveProvider(provider.id)}
              className={`p-3 rounded-2xl border transition-colors ${
                isSaved ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
              title="Save Provider"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500' : ''}`} />
            </button>
            <button
              onClick={() => onBookNow(provider)}
              className="px-6 py-3 rounded-2xl bg-[#004331] hover:bg-[#0d5c46] text-white font-extrabold text-sm shadow-md transition-colors flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Request Service</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs">
          <div className="p-3 bg-slate-50 rounded-2xl space-y-0.5">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase">Experience</span>
            <p className="font-extrabold text-sm text-slate-900">{provider.experience_years} Years</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl space-y-0.5">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase">Starting Rate</span>
            <p className="font-extrabold text-sm text-[#004331]">Rs. {provider.starting_price}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl space-y-0.5">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase">Avg Response</span>
            <p className="font-extrabold text-sm text-slate-900">{provider.response_time}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl space-y-0.5">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase">Jobs Done</span>
            <p className="font-extrabold text-sm text-slate-900">{provider.jobs_completed}+ Completed</p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {(['about', 'services', 'reviews'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold capitalize transition-all ${
              activeTab === tab
                ? 'bg-[#004331] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'about' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-headline font-extrabold text-base text-slate-900">About {provider.name}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{provider.bio}</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-headline font-extrabold text-base text-slate-900">Sindh Guild Credentials</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <ShieldCheck className="w-5 h-5 text-[#004331]" />
                <div>
                  <p className="font-extrabold text-slate-900">NADRA CNIC Verified</p>
                  <p className="text-[10px] text-slate-500">Police Background Clear</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-2xl border border-amber-200">
                <Award className="w-5 h-5 text-amber-700" />
                <div>
                  <p className="font-extrabold text-slate-900">Guild Badge {provider.guild_badge}</p>
                  <p className="text-[10px] text-slate-500">{provider.guild_level}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'services' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-headline font-extrabold text-base text-slate-900">Specialized Skills & Trade Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {provider.skills.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-[#004331]" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-headline font-extrabold text-base text-slate-900">Customer Feedback ({provider.reviews.length})</h3>
          <div className="space-y-3">
            {provider.reviews.map((r) => (
              <div key={r.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">{r.author}</span>
                  <span className="text-[10px] text-slate-400">{r.date}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(r.rating)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 font-normal italic">"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Sticky Bottom CTA */}
      <div className="md:hidden fixed bottom-14 left-0 right-0 z-40 bg-white/95 backdrop-blur-md p-3 border-t border-slate-200 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[9px] font-extrabold text-slate-400 uppercase">Starting From</span>
          <p className="font-headline font-extrabold text-base text-[#004331]">Rs. {provider.starting_price}</p>
        </div>
        <button
          onClick={() => onBookNow(provider)}
          className="flex-grow py-3 rounded-2xl bg-[#004331] text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5"
        >
          <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>Request Service</span>
        </button>
      </div>

    </div>
  );
};
