import React from 'react';
import { useTranslation } from 'react-i18next';
import { CreditCard, Trash2, Star } from 'lucide-react';
import { SavedCard } from '../../types/payment';

interface SavedCardsProps {
  cards: SavedCard[];
  onDelete: (cardId: string) => void;
  onSetDefault: (cardId: string) => void;
}

export const SavedCards: React.FC<SavedCardsProps> = ({
  cards,
  onDelete,
  onSetDefault,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">
        {t('payment.savedCards')}
      </h3>

      {cards.length === 0 ? (
        <p className="text-gray-500 text-sm">{t('payment.noSavedCards')}</p>
      ) : (
        <div className="grid gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg border p-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-50 rounded-md">
                  <CreditCard className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {card.brand} •••• {card.last4}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t('payment.expires')}: {card.expiryMonth}/{card.expiryYear}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {card.isDefault ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Star className="h-3 w-3 mr-1" />
                    {t('payment.default')}
                  </span>
                ) : (
                  <button
                    onClick={() => onSetDefault(card.id)}
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    {t('payment.setDefault')}
                  </button>
                )}
                <button
                  onClick={() => onDelete(card.id)}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};