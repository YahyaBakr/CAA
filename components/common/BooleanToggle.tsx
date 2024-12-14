import React from 'react';
import { Check } from 'lucide-react';

interface BooleanToggleProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export const BooleanToggle: React.FC<BooleanToggleProps> = ({
  label,
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <button
        type="button"
        onClick={() => !disabled && onChange(!value)}
        className={`${
          value ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={disabled}
      >
        <span
          className={`${
            value ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        >
          <span
            className={`${
              value ? 'opacity-100' : 'opacity-0'
            } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
          >
            <Check className="h-3 w-3 text-blue-600" />
          </span>
        </span>
      </button>
    </div>
  );
};