import React, { useState, useEffect } from 'react';
import { Bookmark, Star, ShieldCheck, MapPin, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { marketplaceService } from '../../services/marketplaceService';
import { ProviderProfile } from '../../types/database.types';
import { KaarigarCard } from '../../components/marketplace/KaarigarCard';

interface SavedProvidersPageProps {
  onSelectKaarigar: (id: string) => void;
  onBookKaarigar: (provider: ProviderProfile) => void;
}

export const SavedProvidersPage: React.FC<SavedProvidersPageProps> = ({
  onSelectKaarigar,
  onBookKaarigar,
}) => {
  const { savedProviderIds } = useAuth();
  const [providers, setProviders] = useState<ProviderProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    marketplaceService.getProviders().then((all) => {
      setProviders(all.filter((p) => savedProviderIds.includes(p.id)));
      setLoading(false);
    });
  }, [savedProviderIds]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Bookmark className="w-6 h-6 fill-amber-500 text-amber-600" />
          </div>
          <div>
            <h2 className="font-headline font-extrabold text-2xl text-slate-900">Saved Kaarigars</h2>
            <p className="text-xs text-slate-500 font-medium">Your bookmarked trusted technicians for instant doorstep booking.</p>
          </div>
        </div>

        <span className="px-3.5 py-1.5 bg-emerald-50 text-[#004331] text-xs font-extrabold rounded-full border border-emerald-200">
          {providers.length} Bookmarked
        </span>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-slate-200 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : providers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((p) => (
            <KaarigarCard
              key={p.id}
              provider={p}
              onViewProfile={onSelectKaarigar}
              onBookNow={onBookKaarigar}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm max-w-md mx-auto">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-extrabold text-base text-slate-900">No saved providers yet</h3>
          <p className="text-xs text-slate-500 font-medium">
            Click the heart icon on any Kaarigar card while exploring to bookmark them here.
          </p>
        </div>
      )}
    </div>
  );
};
