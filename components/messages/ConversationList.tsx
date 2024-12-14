import React from 'react';
import { useTranslation } from 'react-i18next';
import { Conversation } from '../../types/message';
import { formatDistanceToNow } from 'date-fns';

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (conversation: Conversation) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedId,
  onSelect,
}) => {
  const { t } = useTranslation();

  return (
    <div className="border-r border-gray-200 w-80">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">{t('messages.conversations')}</h2>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-12rem)]">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelect(conversation)}
            className={`w-full text-left p-4 hover:bg-gray-50 ${
              selectedId === conversation.id ? 'bg-gray-50' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-medium">
                  {conversation.lastMessage?.content || t('messages.newConversation')}
                </p>
                {conversation.lastMessage && (
                  <p className="text-sm text-gray-500">
                    {formatDistanceToNow(
                      new Date(conversation.lastMessage.createdAt),
                      { addSuffix: true }
                    )}
                  </p>
                )}
              </div>
              {conversation.unreadCount > 0 && (
                <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-blue-600 rounded-full">
                  {conversation.unreadCount}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};