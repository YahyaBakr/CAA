import React from 'react';
import { Check, CheckCheck } from 'lucide-react';

interface MessageStatusProps {
  sent: boolean;
  read: boolean;
}

export const MessageStatus: React.FC<MessageStatusProps> = ({ sent, read }) => {
  if (!sent) {
    return (
      <div className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-transparent animate-spin" />
    );
  }

  if (read) {
    return <CheckCheck className="h-4 w-4 text-blue-500" />;
  }

  return <Check className="h-4 w-4 text-gray-500" />;
};