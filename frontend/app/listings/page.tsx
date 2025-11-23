'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { listingsService } from '../../services/listings.service';
import { Listing } from '../../types';

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    accommodationType: '',
    maxPrice: '',
  });

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    try {
      const response = await listingsService.getListings(filters);
      setListings(response.data);
    } catch (error) {
      console.error('Failed to load listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    loadListings();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Lodgr
            </Link>
            <nav className="flex gap-4">
              <Link href="/events" className="text-gray-700 hover:text-blue-600">
                Events
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Find Accommodation</h1>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                placeholder="e.g., Paris"
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={filters.accommodationType}
                onChange={(e) => setFilters({ ...filters, accommodationType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">All types</option>
                <option value="couch">Couch</option>
                <option value="shared">Shared room</option>
                <option value="private">Private room</option>
                <option value="entire">Entire place</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
              <input
                type="number"
                placeholder="$ per night"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Listings */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-600">Loading listings...</div>
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {listing.images && listing.images.length > 0 ? (
                    <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-gray-400 text-4xl">🏠</div>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-xs text-blue-600 font-semibold uppercase mb-1">
                    {listing.accommodationType}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{listing.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    📍 {listing.city}, {listing.country}
                  </p>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{listing.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-bold text-blue-600">
                      ${listing.pricePerNight}
                      <span className="text-sm text-gray-600 font-normal">/night</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Up to {listing.maxGuests} guests
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-600 mb-4">No listings found.</div>
            <p className="text-sm text-gray-500">Try adjusting your search filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
