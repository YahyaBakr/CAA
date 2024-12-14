import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messagesService } from '../services/messages.service';

export function useMessages(conversationId?: string) {
  const queryClient = useQueryClient();

  const conversationsQuery = useQuery({
    queryKey: ['conversations'],
    queryFn: messagesService.getConversations,
  });

  const messagesQuery = useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () =>
      conversationId ? messagesService.getMessages(conversationId) : Promise.resolve([]),
    enabled: !!conversationId,
  });

  const sendMessageMutation = useMutation({
    mutationFn: messagesService.sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });

  return {
    conversations: conversationsQuery.data || [],
    messages: messagesQuery.data || [],
    isLoadingConversations: conversationsQuery.isLoading,
    isLoadingMessages: messagesQuery.isLoading,
    error: conversationsQuery.error || messagesQuery.error,
    sendMessage: sendMessageMutation.mutate,
    isSending: sendMessageMutation.isPending,
  };
}