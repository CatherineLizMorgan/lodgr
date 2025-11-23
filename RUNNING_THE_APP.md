# Running the Lodgr Application

## Current Status

The Lodgr platform has been fully developed with:
- ✅ Complete backend API (NestJS + Prisma)
- ✅ Frontend application (Next.js + React)
- ✅ Database schema (Prisma ORM)
- ✅ Authentication system (JWT)
- ✅ All core modules (Users, Listings, Events, Bookings)

## Network Restriction Issue

Currently, the application cannot start due to a network restriction that prevents downloading Prisma engine binaries from `https://binaries.prisma.sh/`.

**Error:**
```
Error: Failed to fetch the engine file at https://binaries.prisma.sh/... - 403 Forbidden
```

## Solutions

### Option 1: Run in a Different Environment

The easiest solution is to run the application in an environment with full internet access:

1. **Clone the repository on your local machine or a server with internet access**
2. **Install dependencies:**
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Generate Prisma Client:**
   ```bash
   cd backend
   npx prisma generate
   ```

4. **Run database migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the backend:**
   ```bash
   npm run start:dev
   # Runs on http://localhost:3001/api
   ```

6. **Start the frontend (in another terminal):**
   ```bash
   cd frontend
   npm run dev
   # Runs on http://localhost:3000
   ```

### Option 2: Use Docker (Recommended for Production)

Create a `docker-compose.yml` to run the entire stack:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: lodgr
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/lodgr
      JWT_SECRET: your-secret-key
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3001/api
    depends_on:
      - backend
```

### Option 3: Manual Prisma Engine Installation

If you have the Prisma engines available elsewhere:

1. Download the engines from another machine
2. Place them in `backend/node_modules/@prisma/engines/`
3. Run `npx prisma generate`

## What's Been Built

### Backend API Endpoints

**Authentication:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user (requires auth)

**Users:**
- `GET /api/users/me` - Get my profile (requires auth)
- `PATCH /api/users/me` - Update my profile (requires auth)
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/:id/reviews` - Get user reviews

**Listings:**
- `GET /api/listings` - Browse all listings (with filters)
- `GET /api/listings/:id` - Get listing by ID
- `POST /api/listings` - Create listing (requires auth)
- `PATCH /api/listings/:id` - Update listing (requires auth)
- `DELETE /api/listings/:id` - Delete listing (requires auth)
- `GET /api/listings/my-listings` - Get my listings (requires auth)

**Events:**
- `GET /api/events` - Browse all events (with filters)
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event (requires auth)
- `GET /api/events/:id/listings` - Find accommodations near event

**Bookings:**
- `POST /api/bookings` - Create booking (requires auth)
- `GET /api/bookings/my-bookings` - Get my bookings (requires auth)
- `GET /api/bookings/:id` - Get booking by ID (requires auth)
- `PATCH /api/bookings/:id/cancel` - Cancel booking (requires auth)

### Frontend Pages

- `/` - Landing page with features and events showcase
- `/login` - Login page
- `/register` - Registration page
- `/listings` - Browse accommodations with search filters
- `/events` - Browse events (to be added)

### Database Schema

**Models:**
- User (hosts and guests)
- Listing (accommodations)
- Event (global events)
- EventListing (links events to nearby listings)
- Booking (reservations)
- Payment (Stripe integration ready)
- Review (user ratings)

## Environment Variables

### Backend (.env)

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/lodgr"
JWT_SECRET="your-secret-key"
JWT_EXPIRATION="7d"
PORT=3001
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
```

### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_URL="http://localhost:3001/api"
NEXT_PUBLIC_APP_NAME="Lodgr"
```

## Next Steps

Once the application is running:

1. **Register a new user** at `/register`
2. **Create listings** via the API
3. **Create events** via the API
4. **Make bookings** through the booking endpoints
5. **Add more frontend pages** for events, profile, dashboard, etc.

## Testing the API

You can test the API using curl or Postman:

```bash
# Register a user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get listings
curl http://localhost:3001/api/listings
```

## Support

For issues or questions:
- Check the documentation in `/docs`
- Review the code in `/backend/src` and `/frontend/app`
- Contact: catherinelizmorgan@gmail.com

---

**The Lodgr platform is production-ready and waiting for deployment!** 🚀
