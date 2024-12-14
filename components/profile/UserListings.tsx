import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useUserListings } from '../../hooks/useUserListings';
import { CarGrid } from '../cars/CarGrid';

export const UserListings: React.FC = () => {
  const { t } = useTranslation();
  const { listings, isLoading } = useUserListings();

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">{t('common.loading')}</p>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">{t('profile.noListings')}</p>
        <Link
          to="/listings/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          {t('cars.addListing')}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          {t('profile.myListings')}
        </h2>
        <Link
          to="/listings/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          {t('cars.addListing')}
        </Link>
      </div>
      <CarGrid
        cars={listings}
        onContactClick={() => {}}
        showEditButton
        showDeleteButton
      />
    </div>
  );
};