import React from 'react';
import { useTranslation } from 'react-i18next';
import { ConversationList } from '../components/messages/ConversationList';
import { MessageList } from '../components/messages/MessageList';
import { MessageInput } from '../components/messages/MessageInput';
import { ConversationHeader } from '../components/messages/ConversationHeader';
import { useMessages } from '../hooks/useMessages';
import { useWebSocket } from '../hooks/useWebSocket';
import { Conversation } from '../types/message';

export const MessagesPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedConversation, setSelectedConversation] = React.useState<Conversation | null>(null);
  const [isMobileView, setIsMobileView] = React.useState(window.innerWidth < 1024);
  const [showConversation, setShowConversation] = React.useState(!isMobileView);

  const {
    conversations,
    messages,
    sendMessage,
    isLoadingConversations,
    isLoadingMessages,
    isSending,
  } = useMessages(selectedConversation?.id);

  useWebSocket((message) => {
    if (message.type === 'NEW_MESSAGE') {
      // Messages will be automatically updated through React Query
      console.log('New message received:', message.payload);
    }
  });

  React.useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      setIsMobileView(isMobile);
      if (!isMobile) {
        setShowConversation(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    if (isMobileView) {
      setShowConversation(true);
    }
  };

  const handleBack = () => {
    setShowConversation(false);
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedConversation) return;

    await sendMessage({
      conversationId: selectedConversation.id,
      content,
    });
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white shadow-sm rounded-lg overflow-hidden">
      {(!isMobileView || !showConversation) && (
        <ConversationList
          conversations={conversations}
          selectedId={selectedConversation?.id}
          onSelect={handleConversationSelect}
          isLoading={isLoadingConversations}
        />
      )}

      {(!isMobileView || showConversation) && (
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              <ConversationHeader
                conversation={selectedConversation}
                onBack={isMobileView ? handleBack : undefined}
              />
              <MessageList
                messages={messages}
                isLoading={isLoadingMessages}
              />
              <MessageInput
                onSend={handleSendMessage}
                isLoading={isSending}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              {t('messages.selectConversation')}
            </div>
          )}
        </div>
      )}
    </div>
  );
};