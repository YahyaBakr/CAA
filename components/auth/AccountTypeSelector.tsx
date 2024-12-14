import React from 'react';
import { useTranslation } from 'react-i18next';
import { User, Building2 } from 'lucide-react';

interface AccountTypeSelectorProps {
  value: 'user' | 'dealer';
  onChange: (value: 'user' | 'dealer') => void;
}

export const AccountTypeSelector: React.FC<AccountTypeSelectorProps> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <button
        type="button"
        onClick={() => onChange('user')}
        className={`relative rounded-lg border p-4 flex flex-col items-center ${
          value === 'user'
            ? 'border-blue-500 ring-2 ring-blue-500'
            : 'border-gray-300'
        }`}
      >
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
            value === 'user' ? 'bg-blue-100' : 'bg-gray-100'
          }`}
        >
          <User
            className={`h-6 w-6 ${
              value === 'user' ? 'text-blue-600' : 'text-gray-600'
            }`}
          />
        </div>
        <div className="font-medium text-gray-900">{t('auth.user')}</div>
      </button>

      <button
        type="button"
        onClick={() => onChange('dealer')}
        className={`relative rounded-lg border p-4 flex flex-col items-center ${
          value === 'dealer'
            ? 'border-blue-500 ring-2 ring-blue-500'
            : 'border-gray-300'
        }`}
      >
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
            value === 'dealer' ? 'bg-blue-100' : 'bg-gray-100'
          }`}
        >
          <Building2
            className={`h-6 w-6 ${
              value === 'dealer' ? 'text-blue-600' : 'text-gray-600'
            }`}
          />
        </div>
        <div className="font-medium text-gray-900">{t('auth.dealer')}</div>
      </button>
    </div>
  );
};