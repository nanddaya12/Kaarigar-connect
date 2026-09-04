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
    <div className="flex flex-wrap gap-2.5">
      <button
        onClick={() => onSelectCategory('all')}
        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${selectedCategory === 'all' ? 'bg-primary text-on-primary shadow-md' : 'bg-white border border-outline-variant/40 text-on-surface hover:bg-surface-container-low'}`}
      >
        <Grid className="w-4 h-4" />
        <span>All Services</span>
      </button>

      {categories.map(cat => {
        const IconComponent = getCategoryIcon(cat.slug);
        const isSelected = selectedCategory === cat.slug;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.slug)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${isSelected ? 'bg-primary text-on-primary shadow-md' : 'bg-white border border-outline-variant/40 text-on-surface hover:bg-surface-container-low'}`}
          >
            <IconComponent className="w-4 h-4" />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};
