import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { toast } from 'react-hot-toast';

interface FavoriteButtonProps {
  carId: string;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  carId,
  className = ''
}) => {
  const { t } = useTranslation();
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const isFavorited = isFavorite(carId);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorited) {
      removeFavorite(carId);
      toast.success(t('favorites.removed'));
    } else {
      addFavorite(carId);
      toast.success(t('favorites.added'));
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${className}`}
      aria-label={isFavorited ? t('favorites.remove') : t('favorites.add')}
    >
      <Heart
        className={`h-5 w-5 ${
          isFavorited 
            ? 'fill-red-500 text-red-500' 
            : 'text-gray-600'
        }`}
      />
    </button>
  );
};