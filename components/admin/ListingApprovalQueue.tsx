import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check, X, AlertTriangle } from 'lucide-react';
import { Car } from '../../types/car';
import { formatCurrency } from '../../utils/formatters';
import { ImageCarousel } from '../carousel/ImageCarousel';

interface ListingApprovalQueueProps {
  listings: Car[];
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  isLoading?: boolean;
}

export const ListingApprovalQueue: React.FC<ListingApprovalQueueProps> = ({
  listings,
  onApprove,
  onReject,
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const [rejectionReason, setRejectionReason] = React.useState<string>('');
  const [selectedListing, setSelectedListing] = React.useState<string | null>(null);

  const handleReject = (id: string) => {
    onReject(id, rejectionReason);
    setRejectionReason('');
    setSelectedListing(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          {t('admin.noListings')}
        </h3>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {listings.map((listing) => (
        <div
          key={listing.id}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="aspect-w-16 aspect-h-9">
              <ImageCarousel
                images={listing.images}
                alt={`${listing.make} ${listing.model}`}
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {listing.make} {listing.model} {listing.year}
                </h3>
                <p className="text-lg font-bold text-blue-600">
                  {formatCurrency(listing.price)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">{t('cars.mileage')}:</span>
                  <span className="ml-2">{listing.mileage.toLocaleString()} km</span>
                </div>
                <div>
                  <span className="text-gray-500">{t('cars.location')}:</span>
                  <span className="ml-2">{listing.location}</span>
                </div>
                <div>
                  <span className="text-gray-500">{t('cars.condition')}:</span>
                  <span className="ml-2">{listing.condition}</span>
                </div>
                <div>
                  <span className="text-gray-500">{t('cars.transmission')}:</span>
                  <span className="ml-2">{listing.transmission}</span>
                </div>
              </div>

              {listing.isFeatured && (
                <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                  <p className="text-amber-800 text-sm font-medium">
                    {t('admin.featuredRequest')}
                  </p>
                </div>
              )}

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => onApprove(listing.id)}
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <Check className="h-4 w-4 mr-2" />
                  {t('admin.approve')}
                </button>
                <button
                  onClick={() => setSelectedListing(listing.id)}
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  <X className="h-4 w-4 mr-2" />
                  {t('admin.reject')}
                </button>
              </div>
            </div>
          </div>

          {selectedListing === listing.id && (
            <div className="border-t p-6 bg-gray-50">
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder={t('admin.rejectionReasonPlaceholder')}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
              />
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => setSelectedListing(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={() => handleReject(listing.id)}
                  disabled={!rejectionReason.trim()}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  {t('admin.confirmReject')}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};