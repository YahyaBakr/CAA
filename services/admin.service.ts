import { apiRequest } from '../api/client';
import { API_ENDPOINTS } from '../api/config';
import { Car } from '../types/car';

export const adminService = {
  async getPendingListings(): Promise<Car[]> {
    return apiRequest('/admin/listings/pending');
  },

  async approveListing(id: string): Promise<void> {
    return apiRequest(`/admin/listings/${id}/approve`, {
      method: 'POST',
    });
  },

  async rejectListing(id: string, reason: string): Promise<void> {
    return apiRequest(`/admin/listings/${id}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  },

  async getFeaturedListings(): Promise<Car[]> {
    return apiRequest('/admin/listings/featured');
  },

  async approveFeatured(id: string): Promise<void> {
    return apiRequest(`/admin/listings/${id}/featured/approve`, {
      method: 'POST',
    });
  },

  async rejectFeatured(id: string): Promise<void> {
    return apiRequest(`/admin/listings/${id}/featured/reject`, {
      method: 'POST',
    });
  },
};