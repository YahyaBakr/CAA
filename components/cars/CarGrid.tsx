import React from 'react';
import { Car } from '../../types/car';
import { CarCard } from './CarCard';
import { FeaturedCarCard } from './FeaturedCarCard';
import { CarSkeleton } from './CarSkeleton';

interface CarGridProps {
  cars: Car[];
  onContactClick: (carId: string) => void;
  isLoading?: boolean;
  pageSize?: number;
}

export const CarGrid: React.FC<CarGridProps> = ({ 
  cars, 
  onContactClick,
  isLoading = false,
  pageSize = 12
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: pageSize }).map((_, index) => (
          <CarSkeleton key={index} isFeatured={index < Math.ceil(pageSize * 0.8)} />
        ))}
      </div>
    );
  }

  // Calculate featured ratio (80% featured, 20% normal)
  const featuredCount = Math.ceil(pageSize * 0.8);
  const normalCount = pageSize - featuredCount;

  // Split and sort cars
  const featuredCars = cars
    .filter(car => car.isFeatured)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, featuredCount);

  const normalCars = cars
    .filter(car => !car.isFeatured)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, normalCount);

  // Combine cars maintaining the ratio
  const displayCars = [...featuredCars, ...normalCars];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {displayCars.map((car) => (
        car.isFeatured ? (
          <FeaturedCarCard 
            key={car.id} 
            car={car} 
            onContactClick={onContactClick} 
          />
        ) : (
          <CarCard 
            key={car.id} 
            car={car} 
            onContactClick={onContactClick} 
          />
        )
      ))}
      {displayCars.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500">No cars found</p>
        </div>
      )}
    </div>
  );
};