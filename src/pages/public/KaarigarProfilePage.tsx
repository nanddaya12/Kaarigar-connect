import React, { useState, useEffect } from 'react';
import { ProviderProfile } from '../../types/database.types';
import { marketplaceService } from '../../services/marketplaceService';
import { ShieldCheck, Star, MapPin, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { formatCurrency } from '../../lib/utils';

interface KaarigarProfilePageProps {
  providerId: string;
  onBookNow: (provider: ProviderProfile) => void;
}

export const KaarigarProfilePage: React.FC<KaarigarProfilePageProps> = ({
  providerId,
  onBookNow,
}) => {
  const [provider, setProvider] = useState<ProviderProfile | null>(null);

  useEffect(() => {
    marketplaceService.getProviderById(providerId).then(setProvider);
  }, [providerId]);

  if (!provider) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6">
      <div className="bg-white border border-outline-variant/40 rounded-3xl p-8 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-outline-variant/30 pb-6">
          <div className="flex items-center gap-5">
            <img
              src={provider.avatar_url}
              alt={provider.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-primary shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-headline font-bold text-2xl text-on-surface">{provider.name}</h1>
                <span className="px-2.5 py-0.5 bg-primary-container/20 text-primary text-xs font-bold rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Guild Certified {provider.guild_badge}
                </span>
              </div>
              <p className="text-sm text-on-surface-variant font-medium">{provider.profession} · {provider.experience_years} Years Experience</p>
              <p className="text-xs text-outline flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-primary" /> Sector Coverage: {provider.service_area} & surrounding Hyderabad
              </p>
            </div>
          </div>

          <Button variant="primary" size="md" onClick={() => onBookNow(provider)}>
            <span>Request Service</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
            <span className="text-xs text-outline font-bold uppercase">Rating</span>
            <div className="text-xl font-extrabold text-tertiary mt-1 flex items-center justify-center gap-1">
              <Star className="w-5 h-5 fill-tertiary" /> {provider.rating} / 5.0
            </div>
          </div>
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
            <span className="text-xs text-outline font-bold uppercase">Jobs Completed</span>
            <div className="text-xl font-extrabold text-primary mt-1">{provider.jobs_completed}+ Jobs</div>
          </div>
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
            <span className="text-xs text-outline font-bold uppercase">Base Visit Rate</span>
            <div className="text-xl font-extrabold text-on-surface font-mono mt-1">{formatCurrency(provider.starting_price)}</div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-lg text-on-surface">About Craftsman</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">{provider.bio}</p>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-lg text-on-surface">Specialized Skillset</h3>
          <div className="flex flex-wrap gap-2">
            {provider.skills.map((s, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-surface-container-low text-on-surface font-semibold text-xs rounded-xl border border-outline-variant/30">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-outline-variant/30">
          <h3 className="font-bold text-lg text-on-surface">Verified Customer Reviews ({provider.reviews.length})</h3>
          <div className="space-y-3">
            {provider.reviews.map(r => (
              <div key={r.id} className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-xs text-on-surface">{r.author}</strong>
                  <span className="text-[11px] text-tertiary font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-tertiary" /> {r.rating}.0 · {r.date}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
