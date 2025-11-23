'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { eventsService } from '../services/events.service';
import { Event } from '../types';

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await eventsService.getEvents({ isActive: true });
      setEvents(response.data.slice(0, 6)); // Show first 6 events
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-blue-600">Lodgr</h1>
              <span className="ml-3 text-sm text-gray-600">Event Accommodation Made Easy</span>
            </div>
            <nav className="flex gap-4">
              <Link href="/events" className="text-gray-700 hover:text-blue-600">
                Events
              </Link>
              <Link href="/listings" className="text-gray-700 hover:text-blue-600">
                Listings
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Sign Up
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Affordable Accommodation for Global Events
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Find budget-friendly places to stay during the World Cup, Olympics, F1 races, concerts, and more.
            From couches to private rooms, we have you covered.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/events"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Browse Events
            </Link>
            <Link
              href="/listings"
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Find Accommodation
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Why Choose Lodgr?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🛏️</div>
            <h4 className="text-xl font-semibold mb-2">Multi-Tier Options</h4>
            <p className="text-gray-600">
              Choose from couches, shared rooms, private rooms, or entire homes. Find what fits your budget.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🎯</div>
            <h4 className="text-xl font-semibold mb-2">Event-Focused</h4>
            <p className="text-gray-600">
              Search by distance to stadiums, arenas, and fan zones. Get exactly where you need to be.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🔐</div>
            <h4 className="text-xl font-semibold mb-2">Safe & Verified</h4>
            <p className="text-gray-600">
              Identity verification, reviews, and secure payments ensure a safe experience for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Upcoming Events</h3>
        {loading ? (
          <div className="text-center text-gray-600">Loading events...</div>
        ) : events.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="text-sm text-blue-600 font-semibold mb-2 uppercase">
                  {event.eventType.replace('_', ' ')}
                </div>
                <h4 className="text-xl font-bold mb-2">{event.name}</h4>
                <p className="text-gray-600 mb-2">📍 {event.city}, {event.country}</p>
                <p className="text-gray-600 mb-2">🏟️ {event.venueName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <p className="mb-4">No upcoming events yet.</p>
            <p className="text-sm">Check back soon for exciting events!</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Host?</h3>
          <p className="text-xl mb-8">
            Turn your extra space into income during major events. List your couch, spare room, or entire home.
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Become a Host
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Lodgr. Making global events accessible, affordable, and socially connected.
          </p>
        </div>
      </footer>
    </div>
  );
}
