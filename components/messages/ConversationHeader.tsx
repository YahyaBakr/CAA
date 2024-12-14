import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { Conversation } from '../../types/message';

interface ConversationHeaderProps {
  conversation: Conversation;
  onBack?: () => void;
}

export const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  conversation,
  onBack,
}) => {
  const { t } = useTranslation();

  return (
    <div className="border-b p-4 flex items-center space-x-4">
      {onBack && (
        <button
          onClick={onBack}
          className="p-1 rounded-full hover:bg-gray-100 lg:hidden"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      )}
      <div>
        <h2 className="font-semibold">
          {conversation.participants.join(', ')}
        </h2>
        <p className="text-sm text-gray-500">
          {t('cars.make')} {conversation.carId}
        </p>
      </div>
    </div>
  );
};