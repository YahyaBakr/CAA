import React from 'react';
import { useTranslation } from 'react-i18next';
import { Car } from '../../../types/car';

interface CarFeaturesProps {
  car: Car;
}

export const CarFeatures: React.FC<CarFeaturesProps> = ({ car }) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="text-lg font-medium mb-2">{t('cars.transmission')}</h3>
        <p className="text-gray-600">{car.transmission}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">{t('cars.fuelType')}</h3>
        <p className="text-gray-600">{car.fuelType}</p>
      </div>
    </div>
  );
};