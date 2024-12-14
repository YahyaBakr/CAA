import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SlidersHorizontal, X } from 'lucide-react';
import { CarFilters } from '../../types/car';
import { SearchableSelect } from '../common/SearchableSelect';
import { RangeInput } from '../common/RangeInput';
import { locations } from '../../data/locations';
import { 
  carMakes, 
  carModels,
  bodyTypes,
  transmissionTypes,
  sellerTypes,
  dealerNames,
  exteriorColors,
  interiorColors,
  engineCapacities,
  cylinderOptions,
  fuelTypes,
  regionalSpecs,
  serviceHistoryOptions
} from '../../data/carOptions';

export const SearchFilters: React.FC<{
  filters: CarFilters;
  onFilterChange: (filters: CarFilters) => void;
}> = ({ filters, onFilterChange }) => {
  const { t, i18n } = useTranslation();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const isRTL = i18n.dir() === 'rtl';

  const handleFilterChange = (field: keyof CarFilters, value: any) => {
    const newFilters = { ...filters, [field]: value };
    if (field === 'make') delete newFilters.model;
    onFilterChange(newFilters);
  };

  const modelOptions = filters.make ? carModels[filters.make] || [] : [];

  return (
    <div className="bg-white rounded-lg shadow-sm mb-4" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Basic Filters */}
      <div className="p-2 flex flex-wrap gap-2">
        <div className="w-full sm:w-40">
          <SearchableSelect
            value={filters.location || ''}
            options={locations.map(location => ({ value: location, label: location }))}
            onChange={(value) => handleFilterChange('location', value)}
            placeholder={t('filters.selectLocation')}
            compact
          />
        </div>

        <div className="w-full sm:w-40">
          <SearchableSelect
            value={filters.make || ''}
            options={carMakes.map(make => ({ value: make, label: make }))}
            onChange={(value) => handleFilterChange('make', value)}
            placeholder={t('filters.selectMake')}
            compact
          />
        </div>

        <div className="w-full sm:w-40">
          <SearchableSelect
            value={filters.model || ''}
            options={modelOptions.map(model => ({ value: model, label: model }))}
            onChange={(value) => handleFilterChange('model', value)}
            placeholder={t('filters.selectModel')}
            disabled={!filters.make}
            compact
          />
        </div>

        <div className="w-full sm:w-48">
          <RangeInput
            minValue={filters.priceFrom || ''}
            maxValue={filters.priceTo || ''}
            onMinChange={(value) => handleFilterChange('priceFrom', value)}
            onMaxChange={(value) => handleFilterChange('priceTo', value)}
            step={1000}
            minPlaceholder={t('filters.minPrice')}
            maxPlaceholder={t('filters.maxPrice')}
            compact
          />
        </div>

        <div className="w-full sm:w-48">
          <RangeInput
            minValue={filters.yearFrom || ''}
            maxValue={filters.yearTo || ''}
            onMinChange={(value) => handleFilterChange('yearFrom', value)}
            onMaxChange={(value) => handleFilterChange('yearTo', value)}
            step={1}
            minPlaceholder={t('filters.yearFrom')}
            maxPlaceholder={t('filters.yearTo')}
            compact
          />
        </div>

        <div className="w-full sm:w-48">
          <RangeInput
            minValue={filters.mileageFrom || ''}
            maxValue={filters.mileageTo || ''}
            onMinChange={(value) => handleFilterChange('mileageFrom', value)}
            onMaxChange={(value) => handleFilterChange('mileageTo', value)}
            step={1000}
            suffix="km"
            minPlaceholder={t('filters.mileageFrom')}
            maxPlaceholder={t('filters.mileageTo')}
            compact
          />
        </div>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full sm:w-auto h-9 px-3 inline-flex items-center justify-center text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          <SlidersHorizontal className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('filters.moreFilters')}
        </button>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvanced && (
        <div className="border-t border-gray-200 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {t('filters.advancedFilters')}
            </h3>
            <button
              onClick={() => setShowAdvanced(false)}
              className="p-1 text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Vehicle Details */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">{t('filters.vehicleDetails')}</h4>
              
              <SearchableSelect
                label={t('cars.bodyType')}
                value={filters.bodyType || ''}
                options={bodyTypes.map(type => ({ value: type, label: t(`cars.bodyTypes.${type.toLowerCase()}`) }))}
                onChange={(value) => handleFilterChange('bodyType', value)}
                placeholder={t('filters.selectBodyType')}
              />

              <SearchableSelect
                label={t('cars.transmission')}
                value={filters.transmission || ''}
                options={transmissionTypes.map(type => ({ value: type, label: t(`cars.transmissions.${type.toLowerCase()}`) }))}
                onChange={(value) => handleFilterChange('transmission', value)}
                placeholder={t('filters.selectTransmission')}
              />

              <SearchableSelect
                label={t('cars.fuelType')}
                value={filters.fuelType || ''}
                options={fuelTypes.map(type => ({ value: type, label: t(`cars.fuelTypes.${type.toLowerCase()}`) }))}
                onChange={(value) => handleFilterChange('fuelType', value)}
                placeholder={t('filters.selectFuelType')}
              />
            </div>

            {/* Engine & Performance */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">{t('filters.enginePerformance')}</h4>
              
              <SearchableSelect
                label={t('cars.engineCapacity')}
                value={filters.engineCapacity || ''}
                options={engineCapacities.map(capacity => ({ value: capacity, label: capacity }))}
                onChange={(value) => handleFilterChange('engineCapacity', value)}
                placeholder={t('filters.selectEngine')}
              />

              <SearchableSelect
                label={t('cars.cylinders')}
                value={filters.cylinders || ''}
                options={cylinderOptions.map(cylinder => ({ value: cylinder, label: cylinder }))}
                onChange={(value) => handleFilterChange('cylinders', value)}
                placeholder={t('filters.selectCylinders')}
              />

              <SearchableSelect
                label={t('cars.regionalSpec')}
                value={filters.regionalSpec || ''}
                options={regionalSpecs.map(spec => ({ value: spec, label: t(`cars.specs.${spec.toLowerCase()}`) }))}
                onChange={(value) => handleFilterChange('regionalSpec', value)}
                placeholder={t('filters.selectSpec')}
              />
            </div>

            {/* Colors & Appearance */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">{t('filters.colorsAppearance')}</h4>
              
              <SearchableSelect
                label={t('cars.exteriorColor')}
                value={filters.exteriorColor || ''}
                options={exteriorColors.map(color => ({ value: color, label: t(`cars.colors.${color.toLowerCase()}`) }))}
                onChange={(value) => handleFilterChange('exteriorColor', value)}
                placeholder={t('filters.selectColor')}
              />

              <SearchableSelect
                label={t('cars.interiorColor')}
                value={filters.interiorColor || ''}
                options={interiorColors.map(color => ({ value: color, label: t(`cars.colors.${color.toLowerCase()}`) }))}
                onChange={(value) => handleFilterChange('interiorColor', value)}
                placeholder={t('filters.selectColor')}
              />
            </div>

            {/* Seller Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">{t('filters.sellerInfo')}</h4>
              
              <SearchableSelect
                label={t('cars.sellerType')}
                value={filters.sellerType || ''}
                options={sellerTypes.map(type => ({ value: type, label: t(`cars.sellerTypes.${type.toLowerCase()}`) }))}
                onChange={(value) => handleFilterChange('sellerType', value)}
                placeholder={t('filters.selectSellerType')}
              />

              {filters.sellerType === 'Dealer' && (
                <SearchableSelect
                  label={t('cars.dealerName')}
                  value={filters.dealerName || ''}
                  options={dealerNames.map(name => ({ value: name, label: name }))}
                  onChange={(value) => handleFilterChange('dealerName', value)}
                  placeholder={t('filters.selectDealer')}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
