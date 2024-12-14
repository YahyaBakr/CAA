import React from 'react';
import { useTranslation } from 'react-i18next';
import { Crown, Check } from 'lucide-react';

interface FeaturedAdsPricingProps {
  onSelect: (duration: number) => void;
  selectedDuration?: number;
}

export const FeaturedAdsPricing: React.FC<FeaturedAdsPricingProps> = ({
  onSelect,
  selectedDuration,
}) => {
  const { t } = useTranslation();

  const plans = [
    { days: 7, price: 49.99 },
    { days: 14, price: 89.99 },
    { days: 30, price: 149.99 },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t('cars.featuredAds.title')}
        </h3>
        <p className="text-sm text-gray-600">
          {t('cars.featuredAds.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map(({ days, price }) => (
          <button
            key={days}
            onClick={() => onSelect(days)}
            className={`relative p-6 rounded-lg border-2 transition-all ${
              selectedDuration === days
                ? 'border-amber-500 bg-amber-50'
                : 'border-gray-200 hover:border-amber-200'
            }`}
          >
            {selectedDuration === days && (
              <div className="absolute -top-3 -right-3">
                <div className="bg-amber-500 rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
            <div className="flex items-center justify-center mb-4">
              <Crown className={`w-8 h-8 ${
                selectedDuration === days ? 'text-amber-500' : 'text-gray-400'
              }`} />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900">{days} {t('common.days')}</p>
              <p className="text-2xl font-bold text-amber-600 mt-2">${price}</p>
              <p className="text-sm text-gray-500 mt-1">
                ${(price / days).toFixed(2)}/{t('common.day')}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};