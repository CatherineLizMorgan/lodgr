# Lodgr Database Schema

This document describes the database schema for the Lodgr platform.

## Overview

The Lodgr database is built on PostgreSQL and managed through Prisma ORM. The schema supports:
- User management (hosts and guests)
- Accommodation listings
- Event management
- Bookings and payments
- Reviews and ratings

## Models

### User

Represents both hosts and guests on the platform.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| email | String | Unique email address |
| password | String | Hashed password |
| firstName | String | User's first name |
| lastName | String | User's last name |
| phone | String? | Optional phone number |
| isVerified | Boolean | Email verification status |
| isHost | Boolean | Whether user is a host |
| avatarUrl | String? | Profile picture URL |
| bio | String? | User biography |
| reputationScore | Float | Overall reputation (0-5) |
| createdAt | DateTime | Account creation date |
| updatedAt | DateTime | Last update date |

**Relations:**
- Has many `Listing` (as host)
- Has many `Booking` (as guest)
- Has many `Review` (as author and recipient)

---

### Listing

Represents an accommodation listing.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| hostId | UUID | Foreign key to User |
| title | String | Listing title |
| description | String | Detailed description |
| accommodationType | String | Type: 'couch', 'shared', 'private', 'entire' |
| pricePerNight | Float | Price in USD |
| maxGuests | Int | Maximum number of guests |
| address | String | Full address |
| city | String | City name |
| country | String | Country name |
| latitude | Float | GPS latitude |
| longitude | Float | GPS longitude |
| amenities | String[] | Array of amenity names |
| images | String[] | Array of image URLs |
| isActive | Boolean | Whether listing is active |
| createdAt | DateTime | Creation date |
| updatedAt | DateTime | Last update date |

**Relations:**
- Belongs to one `User` (host)
- Has many `Booking`
- Has many `EventListing`

---

### Event

Represents a major event (World Cup, Olympics, etc.).

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| name | String | Event name |
| eventType | String | Type: 'world_cup', 'olympics', 'f1', 'concert', 'convention' |
| startDate | DateTime | Event start date |
| endDate | DateTime | Event end date |
| city | String | Event city |
| country | String | Event country |
| venueLatitude | Float | Venue GPS latitude |
| venueLogitude | Float | Venue GPS longitude |
| venueName | String | Venue name |
| description | String? | Event description |
| isActive | Boolean | Whether event is active |
| createdAt | DateTime | Creation date |
| updatedAt | DateTime | Last update date |

**Relations:**
- Has many `EventListing`

---

### EventListing

Junction table linking events to listings with distance calculation.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| eventId | UUID | Foreign key to Event |
| listingId | UUID | Foreign key to Listing |
| distanceToVenue | Float | Distance in kilometers |
| createdAt | DateTime | Creation date |

**Constraints:**
- Unique combination of eventId and listingId

**Relations:**
- Belongs to one `Event`
- Belongs to one `Listing`

---

### Booking

Represents a reservation/booking.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| listingId | UUID | Foreign key to Listing |
| guestId | UUID | Foreign key to User |
| checkIn | DateTime | Check-in date |
| checkOut | DateTime | Check-out date |
| numberOfGuests | Int | Number of guests |
| totalPrice | Float | Total booking price |
| status | String | Status: 'pending', 'confirmed', 'cancelled', 'completed' |
| createdAt | DateTime | Creation date |
| updatedAt | DateTime | Last update date |

**Relations:**
- Belongs to one `Listing`
- Belongs to one `User` (guest)
- Has one `Payment`

---

### Payment

Represents a payment transaction.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| bookingId | UUID | Foreign key to Booking (unique) |
| amount | Float | Payment amount |
| currency | String | Currency code (default: USD) |
| paymentMethod | String | Payment method used |
| paymentStatus | String | Status: 'pending', 'completed', 'failed', 'refunded' |
| stripePaymentId | String? | Stripe payment ID |
| createdAt | DateTime | Creation date |
| updatedAt | DateTime | Last update date |

**Relations:**
- Belongs to one `Booking`

---

### Review

Represents a review from one user to another.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| authorId | UUID | Foreign key to User (reviewer) |
| recipientId | UUID | Foreign key to User (reviewed) |
| rating | Int | Rating (1-5 stars) |
| comment | String? | Optional review text |
| createdAt | DateTime | Creation date |
| updatedAt | DateTime | Last update date |

**Relations:**
- Belongs to one `User` (author)
- Belongs to one `User` (recipient)

---

## Schema Diagram

```
User (hosts/guests)
  ├── hostedListings (one-to-many with Listing)
  ├── bookings (one-to-many with Booking)
  ├── reviews (one-to-many as author)
  └── receivedReviews (one-to-many as recipient)

Listing
  ├── host (many-to-one with User)
  ├── bookings (one-to-many with Booking)
  └── eventListings (one-to-many with EventListing)

Event
  └── eventListings (one-to-many with EventListing)

EventListing (junction table)
  ├── event (many-to-one with Event)
  └── listing (many-to-one with Listing)

Booking
  ├── listing (many-to-one with Listing)
  ├── guest (many-to-one with User)
  └── payment (one-to-one with Payment)

Payment
  └── booking (one-to-one with Booking)

Review
  ├── author (many-to-one with User)
  └── recipient (many-to-one with User)
```

## Indexes

Recommended indexes for optimal performance:

- `User.email` (unique)
- `Listing.hostId`
- `Listing.city`
- `Listing.accommodationType`
- `Listing.latitude, longitude` (geospatial)
- `Event.startDate, endDate`
- `Booking.listingId`
- `Booking.guestId`
- `EventListing.eventId, listingId` (unique composite)

## Migration Guidelines

When making schema changes:

1. Update `backend/prisma/schema.prisma`
2. Run `npx prisma migrate dev --name <description>`
3. Update this documentation
4. Communicate changes to the team

## Security Notes

- Passwords must be hashed using bcrypt before storage
- Never expose user passwords in API responses
- Validate all foreign key relationships
- Implement soft deletes for critical data
