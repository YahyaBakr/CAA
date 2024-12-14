import { useQuery } from '@tanstack/react-query';
import { Car } from '../types/car';

// Mock data for demonstration
const mockCar: Car = {
  id: '1',
  make: 'BMW',
  model: 'M4',
  year: 2023,
  price: 85000,
  mileage: 5000,
  condition: 'new',
  location: 'Los Angeles, CA',
  fuelType: 'Gasoline',
  transmission: 'Automatic',
  regionalSpec: 'GCC',
  images: [
    'https://images.unsplash.com/photo-1617814076668-4af3ff1dd40f?auto=format&fit=crop&q=80&w=1536',
    'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&q=80&w=1536',
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1536'
  ],
  sellerId: 'user1',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z',
};

export function useCarDetails(id: string) {
  const carQuery = useQuery({
    queryKey: ['car', id],
    queryFn: () => Promise.resolve(mockCar), // Mock API call
  });

  return {
    car: carQuery.data,
    isLoading: carQuery.isLoading,
    error: carQuery.error,
  };
}