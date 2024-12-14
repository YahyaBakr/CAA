import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatDistanceToNow } from 'date-fns';
import { Conversation } from '../../types/message';

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isSelected,
  onClick,
}) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
        isSelected ? 'bg-gray-50' : ''
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {conversation.participants.join(', ')}
          </p>
          {conversation.lastMessage && (
            <>
              <p className="text-sm text-gray-500 truncate">
                {conversation.lastMessage.content}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {formatDistanceToNow(new Date(conversation.lastMessage.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </>
          )}
        </div>
        {conversation.unreadCount > 0 && (
          <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-blue-600 rounded-full">
            {conversation.unreadCount}
          </span>
        )}
      </div>
    </button>
  );
};