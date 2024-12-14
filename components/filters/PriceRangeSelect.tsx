import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DollarSign } from 'lucide-react';

const priceRanges = [
  { min: 0, max: 10000, label: 'Under $10,000' },
  { min: 10000, max: 20000, label: '$10,000 - $20,000' },
  { min: 20000, max: 30000, label: '$20,000 - $30,000' },
  { min: 30000, max: 50000, label: '$30,000 - $50,000' },
  { min: 50000, max: 75000, label: '$50,000 - $75,000' },
  { min: 75000, max: 100000, label: '$75,000 - $100,000' },
  { min: 100000, max: null, label: 'Over $100,000' },
];

interface PriceRangeSelectProps {
  fromValue?: number;
  toValue?: number;
  onFromChange: (value: number) => void;
  onToChange: (value: number) => void;
}

export const PriceRangeSelect: React.FC<PriceRangeSelectProps> = ({
  fromValue,
  toValue,
  onFromChange,
  onToChange,
}) => {
  const { t } = useTranslation();
  const [isCustom, setIsCustom] = useState(false);

  const handleRangeSelect = (min: number, max: number | null) => {
    onFromChange(min);
    if (max) onToChange(max);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {t('filters.priceRange')}
      </label>

      <div className="space-y-2">
        {priceRanges.map(({ min, max, label }) => (
          <button
            key={label}
            onClick={() => {
              setIsCustom(false);
              handleRangeSelect(min, max);
            }}
            className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
              !isCustom && fromValue === min && toValue === max
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <DollarSign className="h-4 w-4 mr-2" />
            {label}
          </button>
        ))}

        <button
          onClick={() => setIsCustom(true)}
          className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
            isCustom ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'hover:bg-gray-50 text-gray-700'
          }`}
        >
          <DollarSign className="h-4 w-4 mr-2" />
          {t('filters.customRange')}
        </button>

        {isCustom && (
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="number"
              value={fromValue || ''}
              onChange={(e) => onFromChange(parseInt(e.target.value) || 0)}
              placeholder={t('filters.minPrice')}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              value={toValue || ''}
              onChange={(e) => onToChange(parseInt(e.target.value) || 0)}
              placeholder={t('filters.maxPrice')}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};