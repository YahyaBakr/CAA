import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { useCarDetails } from '../../hooks/useCarDetails';
import { formatCurrency } from '../../utils/formatters';
import { Trash2 } from 'lucide-react';

interface FavoritesMenuProps {
  onClose: () => void;
}

export const FavoritesMenu: React.FC<FavoritesMenuProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { favorites, removeFavorite } = useFavoritesStore();

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.favorites-menu')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="favorites-menu absolute right-0 mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">
          {t('favorites.title')}
        </h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {favorites.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {t('favorites.empty')}
          </div>
        ) : (
          favorites.map((carId) => (
            <FavoriteItem
              key={carId}
              carId={carId}
              onRemove={() => removeFavorite(carId)}
            />
          ))
        )}
      </div>
    </div>
  );
};

interface FavoriteItemProps {
  carId: string;
  onRemove: () => void;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({ carId, onRemove }) => {
  const { car } = useCarDetails(carId);

  if (!car) return null;

  return (
    <div className="p-4 hover:bg-gray-50 flex items-center space-x-4">
      <div className="flex-shrink-0 w-20 h-20">
        <img
          src={car.images[0]}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex-1 min-w-0">
        <Link
          to={`/cars/${car.id}`}
          className="block text-sm font-medium text-gray-900 hover:text-blue-600"
        >
          {car.make} {car.model} {car.year}
        </Link>
        <p className="text-sm text-gray-500">{car.location}</p>
        <p className="text-sm font-semibold text-blue-600">
          {formatCurrency(car.price)}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          onRemove();
        }}
        className="p-2 text-gray-400 hover:text-red-500"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
};