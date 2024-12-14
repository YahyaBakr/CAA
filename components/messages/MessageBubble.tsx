import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Message } from '../../types/message';
import { MessageStatus } from './MessageStatus';

interface MessageBubbleProps {
  message: Message;
  isSender: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isSender,
}) => {
  return (
    <div
      className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isSender
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap break-words">
          {message.content}
        </p>
        <div
          className={`flex items-center justify-end mt-1 space-x-1 text-xs ${
            isSender ? 'text-blue-200' : 'text-gray-500'
          }`}
        >
          <span>
            {formatDistanceToNow(new Date(message.createdAt), {
              addSuffix: true,
            })}
          </span>
          {isSender && (
            <MessageStatus sent={true} read={message.read} />
          )}
        </div>
      </div>
    </div>
  );
};