import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { CarForm } from '../components/cars/CarForm';
import { Car } from '../types/car';

export const EditListingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [car, setCar] = React.useState<Car | null>(null);

  React.useEffect(() => {
    // TODO: Implement actual API call to fetch car details
    const fetchCar = async () => {
      try {
        // Mock data for now
        const mockCar: Car = {
          id: '1',
          make: 'Toyota',
          model: 'Camry',
          year: 2020,
          price: 25000,
          mileage: 30000,
          condition: 'used',
          location: 'New York',
          fuelType: 'Gasoline',
          transmission: 'Automatic',
          images: [],
          sellerId: 'user1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setCar(mockCar);
      } catch (error) {
        console.error('Failed to fetch car:', error);
        navigate('/');
      }
    };

    if (id) {
      fetchCar();
    }
  }, [id, navigate]);

  const handleSubmit = async (data: Partial<Car>) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual API call
      console.log('Updating listing:', { id, ...data });
      navigate('/');
    } catch (error) {
      console.error('Failed to update listing:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!car) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {t('cars.editListing')}
          </h1>
          <CarForm
            initialData={car}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};