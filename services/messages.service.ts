import { apiRequest } from '../api/client';
import { API_ENDPOINTS } from '../api/config';
import { Conversation, Message } from '../types/message';

export const messagesService = {
  async getConversations(): Promise<Conversation[]> {
    return apiRequest(API_ENDPOINTS.messages.conversations);
  },

  async getMessages(conversationId: string): Promise<Message[]> {
    return apiRequest(API_ENDPOINTS.messages.messages(conversationId));
  },

  async sendMessage(data: {
    conversationId?: string;
    receiverId: string;
    carId: string;
    content: string;
  }): Promise<Message> {
    return apiRequest(API_ENDPOINTS.messages.send, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};