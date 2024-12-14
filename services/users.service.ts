import { apiRequest } from '../api/client';
import { API_ENDPOINTS } from '../api/config';
import { Car } from '../types/car';
import { UserProfile } from '../types/user';

export const usersService = {
  async getProfile(): Promise<UserProfile> {
    return apiRequest(API_ENDPOINTS.users.profile);
  },

  async updateProfile(data: Partial<UserProfile> | FormData): Promise<UserProfile> {
    const headers: Record<string, string> = {};
    
    // If data is FormData (for file uploads), don't set Content-Type
    if (!(data instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    return apiRequest(API_ENDPOINTS.users.profile, {
      method: 'PUT',
      body: data instanceof FormData ? data : JSON.stringify(data),
      headers,
    });
  },

  async updateProfileImage(file: File): Promise<UserProfile> {
    const formData = new FormData();
    formData.append('avatar', file);
    
    return this.updateProfile(formData);
  },

  async getListings(): Promise<Car[]> {
    return apiRequest(API_ENDPOINTS.users.listings);
  },
};