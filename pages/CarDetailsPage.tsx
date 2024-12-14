import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCarDetails } from '../hooks/useCarDetails';
import { CarSpecifications } from '../components/cars/details/CarSpecifications';
import { CarGallery } from '../components/cars/details/CarGallery';
import { ContactOptions } from '../components/cars/details/ContactOptions';
import { CarBreadcrumbs } from '../components/cars/details/CarBreadcrumbs';
import { DetailPageAds } from '../components/ads/DetailPageAds';
import { useAuthStore } from '../store/useAuthStore';
import { useMessages } from '../hooks/useMessages';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { ShareButtons } from '../components/common/ShareButtons';
import { FavoriteButton } from '../components/common/FavoriteButton';

export const CarDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuthStore();
  const { car, isLoading, error } = useCarDetails(id!);
  const { sendMessage } = useMessages();

  const handleContact = async () => {
    if (!isAuthenticated || !car) return;

    try {
      await sendMessage({
        receiverId: car.sellerId,
        carId: car.id,
        content: t('messages.initialMessage', { 
          make: car.make,
          model: car.model,
          year: car.year
        }),
      });
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !car) {
    return <ErrorMessage message={t('errors.carNotFound')} />;
  }

  const shareUrl = window.location.href;
  const shareTitle = `${car.make} ${car.model} ${car.year}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <CarBreadcrumbs
          location={car.location}
          make={car.make}
          model={car.model}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <div className="relative">
            <CarGallery 
              images={car.images} 
              alt={`${car.make} ${car.model}`} 
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <FavoriteButton carId={car.id} />
              <ShareButtons 
                url={shareUrl}
                title={shareTitle}
              />
            </div>
          </div>

          <CarSpecifications car={car} />

          {/* In-article Ad */}
          <DetailPageAds />
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <ContactOptions
              sellerId={car.sellerId}
              carId={car.id}
              onMessageClick={handleContact}
            />
          </div>
        </div>
      </div>
    </div>
  );
};