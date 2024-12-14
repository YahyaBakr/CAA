import React from 'react';
import { formatCurrency } from '../../../utils/formatters';
import { Car } from '../../../types/car';
import { ShareButtons } from '../../common/ShareButtons';
import { FavoriteButton } from '../../common/FavoriteButton';

interface CarHeaderProps {
  car: Car;
}

export const CarHeader: React.FC<CarHeaderProps> = ({ car }) => {
  const shareUrl = `${window.location.origin}/cars/${car.id}`;
  const shareTitle = `${car.make} ${car.model} ${car.year}`;

  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {car.make} {car.model} {car.year}
        </h1>
        <p className="text-2xl font-bold text-blue-600 mt-2">
          {formatCurrency(car.price)}
        </p>
      </div>
      <div className="flex space-x-2 mt-2">
        <FavoriteButton carId={car.id} />
        <ShareButtons 
          url={shareUrl}
          title={shareTitle}
        />
      </div>
    </div>
  );
};