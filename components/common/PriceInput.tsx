import React from 'react';
import { useTranslation } from 'react-i18next';
import { DollarSign } from 'lucide-react';
import { useCurrencyStore } from '../../config/currency';

interface PriceInputProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  minPrice?: number;
  disabled?: boolean;
  error?: string;
}

export const PriceInput: React.FC<PriceInputProps> = ({
  value,
  onChange,
  label,
  minPrice = 1000,
  disabled = false,
  error,
}) => {
  const { t } = useTranslation();
  const { currentCurrency } = useCurrencyStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (newValue >= minPrice || !newValue) {
      onChange(newValue);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500">{currentCurrency.symbol}</span>
        </div>
        <input
          type="number"
          value={value || ''}
          onChange={handleChange}
          min={minPrice}
          step="100"
          disabled={disabled}
          className={`block w-full pl-10 pr-12 sm:text-sm rounded-md ${
            disabled ? 'bg-gray-50 cursor-not-allowed' : ''
          } ${
            error
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
          placeholder={t('common.enterPrice')}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{currentCurrency.code}</span>
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {value > 0 && value < minPrice && (
        <p className="mt-1 text-sm text-red-600">
          {t('validation.minPrice', { min: minPrice })}
        </p>
      )}
    </div>
  );
};