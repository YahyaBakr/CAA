import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ArrowDownAZ, 
  ArrowUpAZ, 
  Clock, 
  Calendar,
  Gauge
} from 'lucide-react';

interface CarSortProps {
  value: string;
  onChange: (value: string) => void;
}

export const CarSort: React.FC<CarSortProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  const options = [
    { value: 'price_asc', label: t('sort.priceAsc'), icon: ArrowDownAZ },
    { value: 'price_desc', label: t('sort.priceDesc'), icon: ArrowUpAZ },
    { value: 'date_desc', label: t('sort.dateDesc'), icon: Clock },
    { value: 'date_asc', label: t('sort.dateAsc'), icon: Clock },
    { value: 'year_desc', label: t('sort.yearDesc'), icon: Calendar },
    { value: 'year_asc', label: t('sort.yearAsc'), icon: Calendar },
    { value: 'mileage_desc', label: t('sort.mileageDesc'), icon: Gauge },
    { value: 'mileage_asc', label: t('sort.mileageAsc'), icon: Gauge },
  ];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700">{t('sort.orderBy')}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-56 pl-3 pr-10 py-2 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">{t('sort.default')}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};