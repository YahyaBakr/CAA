import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

interface RangeInputProps {
  label?: string;
  minValue: number | '';
  maxValue: number | '';
  onMinChange: (value: number | '') => void;
  onMaxChange: (value: number | '') => void;
  step?: number;
  minPlaceholder?: string;
  maxPlaceholder?: string;
  prefix?: string;
  suffix?: string;
  error?: string;
  compact?: boolean;
  presets?: { label: string; min: number; max: number }[];
}

export const RangeInput: React.FC<RangeInputProps> = ({
  label,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  step = 1,
  minPlaceholder,
  maxPlaceholder,
  prefix,
  suffix,
  error,
  compact = false,
  presets
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    if (minValue === '' && maxValue === '') {
      setDisplayValue(t('common.any'));
    } else if (minValue !== '' && maxValue === '') {
      setDisplayValue(`${prefix || ''}${minValue}${suffix || ''} +`);
    } else if (minValue === '' && maxValue !== '') {
      setDisplayValue(`< ${prefix || ''}${maxValue}${suffix || ''}`);
    } else if (minValue !== '' && maxValue !== '') {
      setDisplayValue(`${prefix || ''}${minValue} - ${maxValue}${suffix || ''}`);
    }
  }, [minValue, maxValue, prefix, suffix, t]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : Number(e.target.value);
    onMinChange(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : Number(e.target.value);
    onMaxChange(value);
  };

  const handlePresetClick = (min: number, max: number) => {
    onMinChange(min);
    onMaxChange(max);
    setIsOpen(false);
  };

  const handleClear = () => {
    onMinChange('');
    onMaxChange('');
  };

  const inputClasses = compact
    ? 'h-9 text-sm'
    : 'h-10';

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 ${inputClasses} border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500`}
      >
        <span className={`text-sm ${minValue === '' && maxValue === '' ? 'text-gray-400' : 'text-gray-900'}`}>
          {displayValue}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-72 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex-1">
                <input
                  type="number"
                  value={minValue}
                  onChange={handleMinChange}
                  step={step}
                  placeholder={minPlaceholder || t('common.min')}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <span className="text-gray-400">-</span>
              <div className="flex-1">
                <input
                  type="number"
                  value={maxValue}
                  onChange={handleMaxChange}
                  step={step}
                  placeholder={maxPlaceholder || t('common.max')}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {presets && (
              <div className="space-y-1">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handlePresetClick(preset.min, preset.max)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-4 flex justify-between">
              <button
                type="button"
                onClick={handleClear}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                {t('common.clear')}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                {t('common.apply')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};