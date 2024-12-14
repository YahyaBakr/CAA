import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';
import { SellerAvatar } from '../SellerAvatar';

interface ContactOptionsProps {
  sellerId: string;
  carId: string;
  onMessageClick: () => void;
}

export const ContactOptions: React.FC<ContactOptionsProps> = ({
  sellerId,
  carId,
  onMessageClick,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleContactClick = (action: 'message' | 'call') => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (action === 'message') {
      onMessageClick();
    } else {
      // Mock phone number for demonstration
      window.location.href = 'tel:+1234567890';
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <SellerAvatar sellerId={sellerId} size="lg" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleContactClick('message')}
          className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          {t('cars.chat')}
        </button>
        <button
          onClick={() => handleContactClick('call')}
          className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
        >
          <Phone className="h-5 w-5 mr-2" />
          {t('cars.call')}
        </button>
      </div>
    </div>
  );
};