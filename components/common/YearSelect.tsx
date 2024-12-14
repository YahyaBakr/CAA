import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar } from 'lucide-react';

interface YearSelectProps {
  value: number;
  onChange: (year: number) => void;
  label: string;
  minYear?: number;
  maxYear?: number;
  disabled?: boolean;
  error?: string;
}

export const YearSelect: React.FC<YearSelectProps> = ({
  value,
  onChange,
  label,
  minYear = 1900,
  maxYear = new Date().getFullYear() + 1,
  disabled = false,
  error,
}) => {
  const { t } = useTranslation();
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => maxYear - i
  );

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className={`block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none ${
            disabled ? 'bg-gray-50 cursor-not-allowed' : ''
          } ${error ? 'border-red-300' : ''}`}
        >
          <option value="">{t('common.selectYear')}</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <Calendar className="h-4 w-4 text-gray-400" />
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};