import { create } from 'zustand';
import { UserProfile } from '../types/user';

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (user: UserProfile) => void;
  logout: () => void;
  isDealer: () => boolean;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  isDealer: () => get().user?.role === 'dealer',
  isAdmin: () => get().user?.role === 'admin',
}));