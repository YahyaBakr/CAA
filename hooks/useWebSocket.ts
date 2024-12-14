import { useEffect, useRef, useCallback } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNotificationsStore } from '../store/useNotificationsStore';
import { toast } from 'react-hot-toast';

interface WebSocketMessage {
  type: string;
  payload: any;
}

export function useWebSocket() {
  const { user } = useAuthStore();
  const { addNotification } = useNotificationsStore();
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  const connect = useCallback(() => {
    if (!user) return;

    // Clear any existing connection
    if (wsRef.current) {
      wsRef.current.close();
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No authentication token found for WebSocket connection');
        return;
      }

      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.hostname}:5000/ws`;
      
      const ws = new WebSocket(`${wsUrl}?token=${token}`);

      ws.onopen = () => {
        console.log('WebSocket connected');
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = undefined;
        }
      };

      ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          
          if (message.type === 'NEW_MESSAGE') {
            const { senderId, content, conversationId, messageId } = message.payload;
            
            // Add notification
            addNotification({
              id: messageId,
              type: 'message',
              content: `New message: ${content}`,
              createdAt: new Date().toISOString(),
              read: false,
              data: {
                conversationId,
                messageId,
              },
            });

            // Show toast notification
            toast.success('New message received', {
              duration: 3000,
              position: 'top-right',
            });
          }
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected, attempting to reconnect...');
        if (user) {
          reconnectTimeoutRef.current = setTimeout(connect, 5000);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        toast.error('Connection error. Attempting to reconnect...');
      };

      wsRef.current = ws;
    } catch (error) {
      console.error('Failed to establish WebSocket connection:', error);
      reconnectTimeoutRef.current = setTimeout(connect, 5000);
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [user, addNotification]);

  useEffect(() => {
    const cleanup = connect();
    return () => cleanup?.();
  }, [connect]);
}