import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: string[];
  addFavorite: (carId: string) => void;
  removeFavorite: (carId: string) => void;
  isFavorite: (carId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (carId) => 
        set((state) => ({
          favorites: [...state.favorites, carId]
        })),
      removeFavorite: (carId) =>
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== carId)
        })),
      isFavorite: (carId) => get().favorites.includes(carId),
    }),
    {
      name: 'favorites-storage',
    }
  )
);