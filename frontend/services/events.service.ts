import { apiClient } from '../lib/api-client';
import { Event, Listing } from '../types';

export const eventsService = {
  async getEvents(params?: {
    city?: string;
    country?: string;
    eventType?: string;
    startDate?: string;
    endDate?: string;
    isActive?: boolean;
  }): Promise<{ data: Event[] }> {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
    }
    return apiClient.get<{ data: Event[] }>(
      `/events?${query.toString()}`,
    );
  },

  async getEvent(id: string): Promise<Event> {
    return apiClient.get<Event>(`/events/${id}`);
  },

  async getListingsNearEvent(
    eventId: string,
    params?: {
      maxDistance?: number;
      accommodationType?: string;
      maxPrice?: number;
      limit?: number;
    },
  ): Promise<{ event: Partial<Event>; listings: Listing[] }> {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
    }
    return apiClient.get<{ event: Partial<Event>; listings: Listing[] }>(
      `/events/${eventId}/listings?${query.toString()}`,
    );
  },
};
