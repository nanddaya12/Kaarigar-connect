import React from 'react';
import { ServiceCategory } from '../../types/database.types';
import { Grid, Bolt, Snowflake, Wrench, Paintbrush, Hammer } from 'lucide-react';

interface CategoryFilterProps {
  categories: ServiceCategory[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'electrical':
        return Bolt;
      case 'ac_repair':
        return Snowflake;
      case 'plumbing':
        return Wrench;
      case 'painting':
        return Paintbrush;
      case 'carpentry':
        return Hammer;
      default:
        return Grid;
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x touch-pan-x">
      <button
        onClick={() => onSelectCategory('all')}
        className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 shrink-0 snap-start transition-all shadow-xs ${
          selectedCategory === 'all'
            ? 'bg-emerald-800 text-white shadow-md scale-102 ring-2 ring-emerald-700/30'
            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
        }`}
      >
        <Grid className="w-4 h-4" />
        <span className="whitespace-nowrap">All Services</span>
      </button>

      {categories.map(cat => {
        const IconComponent = getCategoryIcon(cat.slug);
        const isSelected = selectedCategory === cat.slug;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.slug)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 shrink-0 snap-start transition-all shadow-xs ${
              isSelected
                ? 'bg-emerald-800 text-white shadow-md scale-102 ring-2 ring-emerald-700/30'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <IconComponent className="w-4 h-4" />
            <span className="whitespace-nowrap">{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};
