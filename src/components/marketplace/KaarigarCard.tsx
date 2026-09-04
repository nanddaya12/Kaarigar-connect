import React from 'react';
import { ProviderProfile } from '../../types/database.types';
import { ShieldCheck, Star, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../lib/utils';

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
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={provider.avatar_url}
              alt={provider.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-primary/40 shadow-md group-hover:scale-105 transition-transform"
            />
            <div>
              <h3 className="font-headline font-bold text-base text-on-surface leading-tight">
                {provider.name}
              </h3>
              <p className="text-xs text-on-surface-variant">{provider.profession}</p>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary-container/10 px-2 py-0.5 rounded-full mt-1">
                <ShieldCheck className="w-3 h-3 text-primary" />
                <span>CNIC & Guild Badge {provider.guild_badge}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
          {provider.bio}
        </p>

        <div className="flex flex-wrap gap-1">
          {provider.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-surface-container-low text-on-surface-variant text-[10px] font-medium rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs text-on-surface-variant pt-1">
          <span className="flex items-center gap-1 text-tertiary font-bold">
            <Star className="w-3.5 h-3.5 fill-tertiary" />
            {provider.rating} ({provider.review_count})
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-outline" />
            {provider.response_time} arrival
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-outline-variant/30 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase text-outline font-bold">Base Visit Fee</span>
          <p className="text-sm font-extrabold text-primary font-mono">
            {formatCurrency(provider.starting_price)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectProfile(provider.id)}
          >
            Profile
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onBookNow(provider)}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};
