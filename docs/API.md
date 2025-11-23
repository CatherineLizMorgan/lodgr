# Lodgr API Documentation

Base URL: `http://localhost:3001/api` (development)

## Authentication

Most endpoints require authentication using JWT tokens.

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Register
```
POST /auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "firstName": "Jane",
  "lastName": "Smith",
  "phone": "+1234567890"
}

Response: Same as login
```

### Authenticated Requests

Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_token>
```

---

## Users

### Get Current User
```
GET /users/me
Authorization: Bearer <token>

Response:
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "isVerified": true,
  "isHost": false,
  "reputationScore": 4.8
}
```

### Update Profile
```
PATCH /users/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Travel enthusiast",
  "phone": "+1234567890"
}
```

---

## Listings

### Get All Listings
```
GET /listings?city=London&accommodationType=private&maxPrice=100

Query Parameters:
- city (optional)
- country (optional)
- accommodationType (optional): couch, shared, private, entire
- minPrice (optional)
- maxPrice (optional)
- maxGuests (optional)
- page (default: 1)
- limit (default: 20)

Response:
{
  "data": [
    {
      "id": "uuid",
      "title": "Cozy Room Near Stadium",
      "description": "...",
      "accommodationType": "private",
      "pricePerNight": 75,
      "maxGuests": 2,
      "city": "London",
      "country": "UK",
      "images": ["url1", "url2"],
      "host": {
        "id": "uuid",
        "firstName": "Jane",
        "reputationScore": 4.9
      }
    }
  ],
  "total": 150,
  "page": 1,
  "totalPages": 8
}
```

### Get Listing by ID
```
GET /listings/:id

Response:
{
  "id": "uuid",
  "title": "Cozy Room Near Stadium",
  "description": "Full description here...",
  "accommodationType": "private",
  "pricePerNight": 75,
  "maxGuests": 2,
  "address": "123 Main St",
  "city": "London",
  "country": "UK",
  "latitude": 51.5074,
  "longitude": -0.1278,
  "amenities": ["wifi", "parking", "kitchen"],
  "images": ["url1", "url2"],
  "host": {
    "id": "uuid",
    "firstName": "Jane",
    "lastName": "S.",
    "avatarUrl": "url",
    "reputationScore": 4.9
  }
}
```

### Create Listing (Host Only)
```
POST /listings
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Cozy Room Near Stadium",
  "description": "Perfect for event attendees",
  "accommodationType": "private",
  "pricePerNight": 75,
  "maxGuests": 2,
  "address": "123 Main St",
  "city": "London",
  "country": "UK",
  "latitude": 51.5074,
  "longitude": -0.1278,
  "amenities": ["wifi", "parking"],
  "images": ["url1", "url2"]
}
```

### Update Listing
```
PATCH /listings/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "pricePerNight": 80,
  "isActive": true
}
```

### Delete Listing
```
DELETE /listings/:id
Authorization: Bearer <token>
```

---

## Events

### Get All Events
```
GET /events?city=Paris&startDate=2024-07-01

Query Parameters:
- city (optional)
- country (optional)
- eventType (optional): world_cup, olympics, f1, concert, convention
- startDate (optional)
- endDate (optional)
- isActive (optional, default: true)

Response:
{
  "data": [
    {
      "id": "uuid",
      "name": "Paris 2024 Olympics",
      "eventType": "olympics",
      "startDate": "2024-07-26",
      "endDate": "2024-08-11",
      "city": "Paris",
      "country": "France",
      "venueName": "Stade de France",
      "venueLatitude": 48.9244,
      "venueLogitude": 2.3601
    }
  ]
}
```

### Get Listings Near Event
```
GET /events/:eventId/listings?maxDistance=5&accommodationType=couch

Query Parameters:
- maxDistance (km, optional)
- accommodationType (optional)
- maxPrice (optional)
- limit (optional, default: 20)

Response:
{
  "event": {
    "id": "uuid",
    "name": "Paris 2024 Olympics",
    "venueName": "Stade de France"
  },
  "listings": [
    {
      "id": "uuid",
      "title": "Apartment 2km from Stadium",
      "pricePerNight": 60,
      "accommodationType": "private",
      "distanceToVenue": 2.1,
      "images": ["url"]
    }
  ]
}
```

---

## Bookings

### Create Booking
```
POST /bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "listingId": "uuid",
  "checkIn": "2024-07-26",
  "checkOut": "2024-07-30",
  "numberOfGuests": 2
}

Response:
{
  "id": "uuid",
  "listingId": "uuid",
  "checkIn": "2024-07-26",
  "checkOut": "2024-07-30",
  "numberOfGuests": 2,
  "totalPrice": 300,
  "status": "pending"
}
```

### Get My Bookings
```
GET /bookings/my-bookings
Authorization: Bearer <token>

Response:
{
  "data": [
    {
      "id": "uuid",
      "listing": {
        "title": "Cozy Room",
        "city": "Paris"
      },
      "checkIn": "2024-07-26",
      "checkOut": "2024-07-30",
      "totalPrice": 300,
      "status": "confirmed"
    }
  ]
}
```

### Cancel Booking
```
PATCH /bookings/:id/cancel
Authorization: Bearer <token>
```

---

## Reviews

### Create Review
```
POST /reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "recipientId": "uuid",
  "rating": 5,
  "comment": "Great host, highly recommended!"
}
```

### Get User Reviews
```
GET /users/:userId/reviews

Response:
{
  "data": [
    {
      "id": "uuid",
      "author": {
        "firstName": "John",
        "avatarUrl": "url"
      },
      "rating": 5,
      "comment": "Great host!",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "averageRating": 4.8,
  "totalReviews": 23
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

Common status codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 500: Internal Server Error

---

## Rate Limiting

API requests are limited to:
- 100 requests per minute per IP (unauthenticated)
- 200 requests per minute per user (authenticated)

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```
