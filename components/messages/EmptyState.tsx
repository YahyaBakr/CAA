import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare } from 'lucide-react';

export const EmptyState: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {t('messages.noMessages')}
      </h3>
      <p className="text-sm text-gray-500">
        {t('messages.startConversation')}
      </p>
    </div>
  );
};