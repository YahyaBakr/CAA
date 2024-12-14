import { useCurrencyStore } from '../config/currency';

export const formatCurrency = (amount: number): string => {
  const { currentCurrency } = useCurrencyStore.getState();
  
  const formattedAmount = new Intl.NumberFormat('en-AE', {
    minimumFractionDigits: currentCurrency.decimalPlaces,
    maximumFractionDigits: currentCurrency.decimalPlaces,
  }).format(amount);

  return currentCurrency.position === 'before'
    ? `${currentCurrency.symbol} ${formattedAmount}`
    : `${formattedAmount} ${currentCurrency.symbol}`;
};

export const parseCurrency = (value: string): number => {
  const { currentCurrency } = useCurrencyStore.getState();
  return Number(value.replace(currentCurrency.symbol, '').trim());
};