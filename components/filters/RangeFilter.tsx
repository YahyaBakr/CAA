import React from 'react';
import { useTranslation } from 'react-i18next';

interface RangeFilterProps {
  label: string;
  minValue: number | '';
  maxValue: number | '';
  onMinChange: (value: number | '') => void;
  onMaxChange: (value: number | '') => void;
  step?: number;
  minPlaceholder?: string;
  maxPlaceholder?: string;
  prefix?: string;
  suffix?: string;
}

export const RangeFilter: React.FC<RangeFilterProps> = ({
  label,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  step = 1,
  minPlaceholder,
  maxPlaceholder,
  prefix,
  suffix
}) => {
  const { t } = useTranslation();

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : Number(e.target.value);
    onMinChange(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : Number(e.target.value);
    onMaxChange(value);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          {prefix && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">{prefix}</span>
            </div>
          )}
          <input
            type="number"
            value={minValue}
            onChange={handleMinChange}
            step={step}
            placeholder={minPlaceholder || t('filters.min')}
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
              prefix ? 'pl-7' : ''
            } ${suffix ? 'pr-12' : ''}`}
          />
          {suffix && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">{suffix}</span>
            </div>
          )}
        </div>
        <span className="text-gray-500">-</span>
        <div className="relative flex-1">
          {prefix && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">{prefix}</span>
            </div>
          )}
          <input
            type="number"
            value={maxValue}
            onChange={handleMaxChange}
            step={step}
            placeholder={maxPlaceholder || t('filters.max')}
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
              prefix ? 'pl-7' : ''
            } ${suffix ? 'pr-12' : ''}`}
          />
          {suffix && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">{suffix}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};