import React from 'react';
import { Car } from '../../types/car';
import { CarHeader } from './details/CarHeader';
import { CarSpecifications } from './details/CarSpecifications';
import { CarFeatures } from './details/CarFeatures';

interface CarDetailsProps {
  car: Car;
}

export const CarDetails: React.FC<CarDetailsProps> = ({ car }) => {
  return (
    <div className="space-y-6">
      <CarHeader car={car} />
      <CarSpecifications car={car} />
      <CarFeatures car={car} />
    </div>
  );
};