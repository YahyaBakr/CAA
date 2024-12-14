import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { currencyService } from '../services/currency.service';
import { useCurrencyStore } from '../config/currency';

export function useCurrency() {
  const queryClient = useQueryClient();
  const { setCurrentCurrency } = useCurrencyStore();

  const currencyQuery = useQuery({
    queryKey: ['currency'],
    queryFn: currencyService.getCurrentCurrency,
    onSuccess: (data) => {
      setCurrentCurrency(data);
    },
  });

  const updateCurrencyMutation = useMutation({
    mutationFn: currencyService.updateCurrency,
    onSuccess: (data) => {
      setCurrentCurrency(data);
      queryClient.invalidateQueries({ queryKey: ['currency'] });
    },
  });

  return {
    currency: currencyQuery.data,
    isLoading: currencyQuery.isLoading,
    error: currencyQuery.error,
    updateCurrency: updateCurrencyMutation.mutate,
    isUpdating: updateCurrencyMutation.isPending,
  };
}