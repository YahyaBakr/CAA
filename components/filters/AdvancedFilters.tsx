import React from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { CarFilters } from '../../types/car';
import { ComboBox } from '../common/ComboBox';
import { 
  regionalSpecs, 
  sellerTypes, 
  fuelTypes,
  dealerNames,
  seatOptions 
} from '../../data/carOptions';

interface AdvancedFiltersProps {
  filters: CarFilters;
  onFilterChange: (filters: CarFilters) => void;
  onClose: () => void;
  isOpen: boolean;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFilterChange,
  onClose,
  isOpen,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleChange = (field: keyof CarFilters, value: any) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {t('filters.advancedFilters')}
              </h3>
              <button
                onClick={onClose}
                className="rounded-md text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <ComboBox
                label={t('cars.regionalSpec')}
                value={filters.regionalSpec || ''}
                onChange={(value) => handleChange('regionalSpec', value)}
                options={regionalSpecs}
                placeholder={t('filters.selectRegionalSpec')}
              />

              <ComboBox
                label={t('filters.sellerType')}
                value={filters.sellerType || ''}
                onChange={(value) => handleChange('sellerType', value)}
                options={sellerTypes}
                placeholder={t('filters.selectSellerType')}
              />

              <ComboBox
                label={t('cars.seats')}
                value={filters.seats?.toString() || ''}
                onChange={(value) => handleChange('seats', parseInt(value))}
                options={seatOptions}
                placeholder={t('filters.selectSeats')}
              />

              <ComboBox
                label={t('cars.fuelType')}
                value={filters.fuelType || ''}
                onChange={(value) => handleChange('fuelType', value)}
                options={fuelTypes}
                placeholder={t('filters.selectFuelType')}
              />

              {filters.sellerType === 'dealer' && (
                <ComboBox
                  label={t('filters.dealerName')}
                  value={filters.dealerName || ''}
                  onChange={(value) => handleChange('dealerName', value)}
                  options={dealerNames}
                  placeholder={t('filters.selectDealer')}
                />
              )}
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {t('common.apply')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};