export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  carId: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  carId: string;
  lastMessage?: Message;
  unreadCount: number;
}