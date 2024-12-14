import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Car } from '../../types/car';
import { ImageUpload } from '../upload/ImageUpload';
import { SearchableSelect } from '../common/SearchableSelect';
import { YearSelect } from '../common/YearSelect';
import { PriceInput } from '../common/PriceInput';
import { RangeInput } from '../common/RangeInput';
import { BooleanToggle } from '../common/BooleanToggle';
import { generateCarDescription } from '../../utils/descriptionGenerator';
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
  locations,
  regionalSpecs,
} from '../../data/carOptions';

interface CarFormProps {
  initialData?: Partial<Car>;
  onSubmit: (data: Partial<Car>) => void;
  isLoading?: boolean;
}

export const CarForm: React.FC<CarFormProps> = ({
  initialData = {},
  onSubmit,
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    make: initialData.make || '',
    model: initialData.model || '',
    year: initialData.year || new Date().getFullYear(),
    price: initialData.price || 0,
    mileage: initialData.mileage || 0,
    condition: initialData.condition || 'used',
    location: initialData.location || '',
    fuelType: initialData.fuelType || '',
    transmission: initialData.transmission || '',
    regionalSpec: initialData.regionalSpec || 'GCC',
    description: initialData.description || '',
    engineCapacity: initialData.engineCapacity || '',
    horsepower: initialData.horsepower || '',
    cylinders: initialData.cylinders || '',
    warranty: initialData.warranty || '',
    targetMarket: initialData.targetMarket || '',
    steeringSide: initialData.steeringSide || 'left',
    trim: initialData.trim || '',
    bodyType: initialData.bodyType || '',
    sellerType: initialData.sellerType || '',
    dealerName: initialData.dealerName || '',
    exteriorColor: initialData.exteriorColor || '',
    interiorColor: initialData.interiorColor || '',
    serviceHistory: initialData.serviceHistory || '',
    isFirstOwner: initialData.isFirstOwner || false,
    hasWarranty: initialData.hasWarranty || false,
    hasServiceHistory: initialData.hasServiceHistory || false,
    hasAccidents: initialData.hasAccidents || false,
    images: initialData.images || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Reset model when make changes
      if (field === 'make') {
        newData.model = '';
      }

      // Generate description when certain fields change
      const descriptionTriggerFields: (keyof typeof formData)[] = [
        'make', 'model', 'year', 'mileage', 'condition',
        'engineCapacity', 'transmission', 'fuelType', 'horsepower',
        'exteriorColor', 'interiorColor', 'regionalSpec',
        'isFirstOwner', 'hasWarranty', 'hasServiceHistory', 'hasAccidents',
        'location', 'sellerType', 'dealerName'
      ];

      if (descriptionTriggerFields.includes(field)) {
        newData.description = generateCarDescription(newData);
      }

      return newData;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('cars.images')}
        </label>
        <ImageUpload
          images={formData.images}
          onImagesChange={(images) => handleChange('images', images)}
          maxImages={5}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SearchableSelect
          label={t('cars.make')}
          value={formData.make}
          options={carMakes.map(make => ({ value: make, label: make }))}
          onChange={(value) => handleChange('make', value)}
          placeholder={t('cars.selectMake')}
          disabled={isLoading}
        />

        <SearchableSelect
          label={t('cars.model')}
          value={formData.model}
          options={(carModels[formData.make] || []).map(model => ({ 
            value: model, 
            label: model 
          }))}
          onChange={(value) => handleChange('model', value)}
          placeholder={t('cars.selectModel')}
          disabled={!formData.make || isLoading}
        />

        <YearSelect
          label={t('cars.year')}
          value={formData.year}
          onChange={(value) => handleChange('year', value)}
          disabled={isLoading}
        />

        <PriceInput
          label={t('cars.price')}
          value={formData.price}
          onChange={(value) => handleChange('price', value)}
          disabled={isLoading}
        />

        <RangeInput
          label={t('cars.mileage')}
          minValue={formData.mileage}
          maxValue={formData.mileage}
          onMinChange={(value) => handleChange('mileage', value)}
          onMaxChange={() => {}}
          step={1000}
          suffix="km"
          disabled={isLoading}
        />

        <SearchableSelect
          label={t('cars.location')}
          value={formData.location}
          options={locations.map(location => ({ 
            value: location, 
            label: location 
          }))}
          onChange={(value) => handleChange('location', value)}
          placeholder={t('cars.selectLocation')}
          disabled={isLoading}
        />

        <SearchableSelect
          label={t('cars.condition')}
          value={formData.condition}
          options={[
            { value: 'new', label: t('cars.conditions.new') },
            { value: 'used', label: t('cars.conditions.used') },
          ]}
          onChange={(value) => handleChange('condition', value as 'new' | 'used')}
          disabled={isLoading}
        />

        <SearchableSelect
          label={t('cars.bodyType')}
          value={formData.bodyType}
          options={bodyTypes.map(type => ({ value: type, label: type }))}
          onChange={(value) => handleChange('bodyType', value)}
          placeholder={t('cars.selectBodyType')}
          disabled={isLoading}
        />

        <SearchableSelect
          label={t('cars.transmission')}
          value={formData.transmission}
          options={transmissionTypes.map(type => ({ value: type, label: type }))}
          onChange={(value) => handleChange('transmission', value)}
          placeholder={t('cars.selectTransmission')}
          disabled={isLoading}
        />

        <SearchableSelect
          label={t('cars.regionalSpec')}
          value={formData.regionalSpec}
          options={regionalSpecs.map(spec => ({ value: spec, label: spec }))}
          onChange={(value) => handleChange('regionalSpec', value)}
          placeholder={t('cars.selectSpec')}
          disabled={isLoading}
        />

        <SearchableSelect
          label={t('cars.exteriorColor')}
          value={formData.exteriorColor}
          options={exteriorColors.map(color => ({ value: color, label: color }))}
          onChange={(value) => handleChange('exteriorColor', value)}
          placeholder={t('cars.selectColor')}
          disabled={isLoading}
        />

        <SearchableSelect
          label={t('cars.interiorColor')}
          value={formData.interiorColor}
          options={interiorColors.map(color => ({ value: color, label: color }))}
          onChange={(value) => handleChange('interiorColor', value)}
          placeholder={t('cars.selectColor')}
          disabled={isLoading}
        />

        <SearchableSelect
          label={t('cars.engineCapacity')}
          value={formData.engineCapacity}
          options={engineCapacities.map(capacity => ({ 
            value: capacity, 
            label: capacity 
          }))}
          onChange={(value) => handleChange('engineCapacity', value)}
          placeholder={t('cars.selectEngine')}
          disabled={isLoading}
        />

        <SearchableSelect
          label={t('cars.cylinders')}
          value={formData.cylinders}
          options={cylinderOptions.map(cylinder => ({ 
            value: cylinder, 
            label: cylinder 
          }))}
          onChange={(value) => handleChange('cylinders', value)}
          placeholder={t('cars.selectCylinders')}
          disabled={isLoading}
        />

        <div className="space-y-4">
          <BooleanToggle
            label={t('cars.isFirstOwner')}
            value={formData.isFirstOwner}
            onChange={(value) => handleChange('isFirstOwner', value)}
            disabled={isLoading}
          />

          <BooleanToggle
            label={t('cars.hasWarranty')}
            value={formData.hasWarranty}
            onChange={(value) => handleChange('hasWarranty', value)}
            disabled={isLoading}
          />

          <BooleanToggle
            label={t('cars.hasServiceHistory')}
            value={formData.hasServiceHistory}
            onChange={(value) => handleChange('hasServiceHistory', value)}
            disabled={isLoading}
          />

          <BooleanToggle
            label={t('cars.hasAccidents')}
            value={formData.hasAccidents}
            onChange={(value) => handleChange('hasAccidents', value)}
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('cars.description')}
        </label>
        <textarea
          name="description"
          rows={6}
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          disabled={isLoading}
          placeholder={t('cars.descriptionPlaceholder')}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? t('common.loading') : t('common.save')}
        </button>
      </div>
    </form>
  );
};