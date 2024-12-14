import React from 'react';
import { useTranslation } from 'react-i18next';
import { Car } from 'lucide-react';

interface BrandTagsProps {
  selectedBrand?: string;
  onBrandSelect: (brand: string) => void;
}

const popularBrands = [
  'BMW',
  'Mercedes-Benz',
  'Toyota',
  'Honda',
  'Audi',
  'Lexus',
  'Porsche',
  'Tesla',
];

export const BrandTags: React.FC<BrandTagsProps> = ({
  selectedBrand,
  onBrandSelect,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-3">
        {t('filters.popularBrands')}
      </h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onBrandSelect('')}
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !selectedBrand
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          <Car className="h-4 w-4 mr-1" />
          {t('filters.allBrands')}
        </button>
        {popularBrands.map((brand) => (
          <button
            key={brand}
            onClick={() => onBrandSelect(brand)}
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedBrand === brand
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {brand}
          </button>
        ))}
      </div>
    </div>
  );
};