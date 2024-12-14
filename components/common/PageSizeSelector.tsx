import React from 'react';
import { useTranslation } from 'react-i18next';
import { ListFilter } from 'lucide-react';

interface PageSizeSelectorProps {
  value: number;
  onChange: (size: number) => void;
  options?: number[];
}

export const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
  value,
  onChange,
  options = [12, 24, 36, 48],
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center space-x-2">
      <ListFilter className="h-5 w-5 text-gray-400" />
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="block pl-3 pr-10 py-2 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((size) => (
          <option key={size} value={size}>
            {t('pagination.itemsPerPage', { count: size })}
          </option>
        ))}
      </select>
    </div>
  );
};