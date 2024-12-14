import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../../hooks/useAdmin';
import { Car } from '../../types/car';
import { formatCurrency } from '../../utils/formatters';
import { Crown } from 'lucide-react';

export const AdminFeaturedPage: React.FC = () => {
  const { t } = useTranslation();
  const {
    featuredListings,
    isLoading,
    approveFeatured,
    rejectFeatured,
  } = useAdmin();

  const renderFeaturedRequest = (car: Car) => (
    <div key={car.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Crown className="h-6 w-6 text-amber-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              {car.make} {car.model} {car.year}
            </h3>
          </div>
          <span className="text-lg font-bold text-blue-600">
            {formatCurrency(car.price)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div>
            <span className="text-gray-500">{t('cars.location')}:</span>
            <span className="ml-2">{car.location}</span>
          </div>
          <div>
            <span className="text-gray-500">{t('cars.mileage')}:</span>
            <span className="ml-2">{car.mileage.toLocaleString()} km</span>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => approveFeatured(car.id)}
            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700"
          >
            {t('admin.approveFeatured')}
          </button>
          <button
            onClick={() => rejectFeatured(car.id)}
            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            {t('admin.rejectFeatured')}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          {t('admin.featuredRequests')}
        </h1>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : featuredListings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Crown className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {t('admin.noFeaturedRequests')}
          </h3>
        </div>
      ) : (
        <div className="grid gap-6">
          {featuredListings.map(renderFeaturedRequest)}
        </div>
      )}
    </div>
  );
};