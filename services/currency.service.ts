import { apiRequest } from '../api/client';
import { Currency } from '../config/currency';

export const currencyService = {
  async getCurrentCurrency(): Promise<Currency> {
    return apiRequest('/settings/currency');
  },

  async updateCurrency(currency: Currency): Promise<Currency> {
    return apiRequest('/settings/currency', {
      method: 'PUT',
      body: JSON.stringify(currency),
    });
  },
};