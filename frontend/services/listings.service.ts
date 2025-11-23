import { apiClient } from '../lib/api-client';
import { Listing, PaginatedResponse } from '../types';

export const listingsService = {
  async getListings(params?: {
    city?: string;
    country?: string;
    accommodationType?: string;
    minPrice?: number;
    maxPrice?: number;
    maxGuests?: number;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Listing>> {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
    }
    return apiClient.get<PaginatedResponse<Listing>>(
      `/listings?${query.toString()}`,
    );
  },

  async getListing(id: string): Promise<Listing> {
    return apiClient.get<Listing>(`/listings/${id}`);
  },

  async createListing(data: {
    title: string;
    description: string;
    accommodationType: string;
    pricePerNight: number;
    maxGuests: number;
    address: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    amenities: string[];
    images: string[];
  }): Promise<Listing> {
    return apiClient.post<Listing>('/listings', data);
  },

  async updateListing(
    id: string,
    data: Partial<Listing>,
  ): Promise<Listing> {
    return apiClient.patch<Listing>(`/listings/${id}`, data);
  },

  async deleteListing(id: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/listings/${id}`);
  },

  async getMyListings(): Promise<Listing[]> {
    return apiClient.get<Listing[]>('/listings/my-listings');
  },
};
