import React from 'react';
import { useTranslation } from 'react-i18next';
import { SavedCards } from '../../components/payment/SavedCards';
import { PaymentForm } from '../../components/payment/PaymentForm';
import { SavedCard } from '../../types/payment';
import { toast } from 'react-hot-toast';

// Mock data for demonstration
const mockSavedCards: SavedCard[] = [
  {
    id: '1',
    last4: '4242',
    brand: 'Visa',
    expiryMonth: '12',
    expiryYear: '24',
    isDefault: true,
  },
  {
    id: '2',
    last4: '5555',
    brand: 'Mastercard',
    expiryMonth: '08',
    expiryYear: '25',
    isDefault: false,
  },
];

export const PaymentsPage: React.FC = () => {
  const { t } = useTranslation();
  const [cards, setCards] = React.useState<SavedCard[]>(mockSavedCards);

  const handleDeleteCard = (cardId: string) => {
    setCards(cards.filter(card => card.id !== cardId));
    toast.success(t('payment.cardDeleted'));
  };

  const handleSetDefaultCard = (cardId: string) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === cardId,
    })));
    toast.success(t('payment.defaultCardSet'));
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t('dealer.payments')}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {t('dealer.paymentsDescription')}
          </p>
        </div>

        <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
          <div className="p-6">
            <SavedCards
              cards={cards}
              onDelete={handleDeleteCard}
              onSetDefault={handleSetDefaultCard}
            />
          </div>

          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t('payment.addNewCard')}
            </h3>
            <PaymentForm
              onSubmit={(data) => {
                console.log('New card data:', data);
                toast.success(t('payment.cardAdded'));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};