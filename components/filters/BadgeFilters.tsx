import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import { badges } from '../../data/carOptions';

interface BadgeFiltersProps {
  selected: Record<string, boolean>;
  onChange: (id: string, value: boolean) => void;
}

export const BadgeFilters: React.FC<BadgeFiltersProps> = ({ selected, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {t('filters.badges')}
      </label>
      <div className="flex flex-wrap gap-2">
        {badges.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onChange(id, !selected[id])}
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selected[id]
                ? 'bg-blue-100 text-blue-800 border-blue-200'
                : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
            } border`}
          >
            {selected[id] && <Check className="w-4 h-4 mr-1" />}
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};