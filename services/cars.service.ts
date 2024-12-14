import { apiRequest } from '../api/client';
import { API_ENDPOINTS } from '../api/config';
import { Car, CarFilters } from '../types/car';

export const carsService = {
  async list(filters?: CarFilters): Promise<Car[]> {
    return apiRequest(API_ENDPOINTS.cars.list, {
      params: filters as Record<string, string>,
    });
  },

  async create(data: Partial<Car>): Promise<Car> {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'images' && Array.isArray(value)) {
        value.forEach((image) => {
          formData.append('images', image);
        });
      } else {
        formData.append(key, String(value));
      }
    });

    return apiRequest(API_ENDPOINTS.cars.create, {
      method: 'POST',
      body: formData,
    });
  },

  async update(id: string, data: Partial<Car>): Promise<Car> {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'images' && Array.isArray(value)) {
        value.forEach((image) => {
          formData.append('images', image);
        });
      } else {
        formData.append(key, String(value));
      }
    });

    return apiRequest(API_ENDPOINTS.cars.update(id), {
      method: 'PUT',
      body: formData,
    });
  },

  async delete(id: string): Promise<void> {
    await apiRequest(API_ENDPOINTS.cars.delete(id), {
      method: 'DELETE',
    });
  },

  async get(id: string): Promise<Car> {
    return apiRequest(API_ENDPOINTS.cars.get(id));
  },
};