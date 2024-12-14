import { create } from 'zustand';

export interface Currency {
  code: string;
  symbol: string;
  position: 'before' | 'after';
  decimalPlaces: number;
}

interface CurrencyState {
  currentCurrency: Currency;
  setCurrentCurrency: (currency: Currency) => void;
}

// Default currency configuration
const defaultCurrency: Currency = {
  code: 'AED',
  symbol: 'د.إ',
  position: 'before',
  decimalPlaces: 2,
};

export const useCurrencyStore = create<CurrencyState>((set) => ({
  currentCurrency: defaultCurrency,
  setCurrentCurrency: (currency) => set({ currentCurrency: currency }),
}));