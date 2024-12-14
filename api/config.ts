// Get the API base URL from environment variables or use a default
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  return `${protocol}//${hostname}:5000/api`;
};

export const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
  },
  cars: {
    list: '/cars',
    create: '/cars',
    update: (id: string) => `/cars/${id}`,
    delete: (id: string) => `/cars/${id}`,
    get: (id: string) => `/cars/${id}`,
  },
  messages: {
    conversations: '/messages/conversations',
    messages: (conversationId: string) => `/messages/conversations/${conversationId}`,
    send: '/messages',
  },
  users: {
    profile: '/users/profile',
    listings: '/users/listings',
  },
};

export const WS_CONFIG = {
  reconnectInterval: 5000,
  maxReconnectAttempts: 5,
};