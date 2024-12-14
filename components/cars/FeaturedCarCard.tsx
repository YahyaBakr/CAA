import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Crown, MapPin, Gauge, MessageCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import arSA from 'date-fns/locale/ar-SA';
import { Car } from '../../types/car';
import { formatCurrency } from '../../utils/formatters';
import { ImageCarousel } from '../carousel/ImageCarousel';
import { ShareButtons } from '../common/ShareButtons';
import { FavoriteButton } from '../common/FavoriteButton';
import { RegionalSpecBadge } from './RegionalSpecBadge';
import { useAuthStore } from '../../store/useAuthStore';
import { useProfile } from '../../hooks/useProfile';

interface FeaturedCarCardProps {
  car: Car;
  onContactClick: (carId: string) => void;
}

export const FeaturedCarCard: React.FC<FeaturedCarCardProps> = ({ 
  car,
  onContactClick,
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { getSellerInfo } = useProfile();
  const seller = getSellerInfo(car.sellerId);

  const handleCardClick = () => {
    navigate(`/cars/${car.id}`);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    onContactClick(car.id);
  };

  const timeAgo = formatDistanceToNow(new Date(car.createdAt), { 
    addSuffix: true,
    locale: i18n.language === 'ar' ? arSA : undefined
  });

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full border-2 border-amber-200"
    >
      {/* Featured Badge */}
      <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-2 py-1 rounded-full flex items-center shadow-sm text-xs">
        <Crown className="w-3 h-3 mr-1" />
        <span className="font-medium">{t('cars.featured')}</span>
      </div>
      
      <div className="relative h-40">
        <ImageCarousel 
          images={car.images} 
          alt={`${car.make} ${car.model}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex space-x-1">
          <FavoriteButton carId={car.id} />
          <ShareButtons 
            url={`${window.location.origin}/cars/${car.id}`}
            title={`${car.make} ${car.model} ${car.year}`}
          />
        </div>
      </div>

      <div className="p-3">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
              {car.make} {car.model}
            </h3>
            <div className="flex items-center mt-0.5">
              <RegionalSpecBadge spec={car.regionalSpec} />
              <span className="mx-1 text-gray-300">•</span>
              <span className="text-xs text-gray-600">{car.year}</span>
            </div>
          </div>
          <p className="text-sm font-bold text-amber-600 whitespace-nowrap">
            {formatCurrency(car.price)}
          </p>
        </div>

        <div className="space-y-1 text-xs text-gray-600">
          <div className="flex items-center">
            <Gauge className="h-3 w-3 mr-1 flex-shrink-0 text-amber-500" />
            <span className="truncate">{car.mileage.toLocaleString()} km</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1 flex-shrink-0 text-amber-500" />
            <span className="truncate">{car.location}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1 flex-shrink-0 text-amber-500" />
            <span className="truncate">{timeAgo}</span>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
          {seller && (
            <div className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center">
                <span className="text-amber-600 text-xs font-medium">
                  {seller.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="ml-1.5 text-xs text-gray-600 truncate max-w-[100px]">
                {seller.name}
              </span>
            </div>
          )}
          <button
            onClick={handleContactClick}
            className="inline-flex items-center px-2 py-1 text-xs font-medium text-amber-700 bg-amber-50 rounded-full hover:bg-amber-100"
          >
            <MessageCircle className="h-3 w-3 mr-1" />
            {t('cars.contact')}
          </button>
        </div>
      </div>
    </div>
  );
};