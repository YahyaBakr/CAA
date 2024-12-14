import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDownAZ, ArrowUpAZ, Clock, Calendar } from 'lucide-react';

interface OrderBySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const OrderBySelect: React.FC<OrderBySelectProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  const options = [
    { value: 'price_asc', label: t('filters.orderPriceAsc'), icon: ArrowDownAZ },
    { value: 'price_desc', label: t('filters.orderPriceDesc'), icon: ArrowUpAZ },
    { value: 'date_desc', label: t('filters.orderDateDesc'), icon: Clock },
    { value: 'year_desc', label: t('filters.orderYearDesc'), icon: Calendar },
  ];

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="">{t('filters.orderBy')}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};