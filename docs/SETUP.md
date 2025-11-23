# Lodgr Setup Guide

This guide will help you set up the Lodgr platform for local development.

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**
- **PostgreSQL** v14 or higher ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/downloads))

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd lodgr
```

## Step 2: Database Setup

### Install PostgreSQL

If you haven't already, install PostgreSQL on your system.

### Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE lodgr;

# Exit PostgreSQL
\q
```

## Step 3: Backend Setup

### Navigate to Backend Directory

```bash
cd backend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your actual values
nano .env  # or use your preferred editor
```

**Important**: Update these values in `.env`:
- `DATABASE_URL` - Your PostgreSQL connection string
- `JWT_SECRET` - A secure random string
- `STRIPE_SECRET_KEY` - Your Stripe API key (get from stripe.com)
- `MAPBOX_API_KEY` or `GOOGLE_MAPS_API_KEY` - Map service credentials

### Run Database Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations to create database tables
npx prisma migrate dev --name init
```

### Start Backend Server

```bash
# Development mode
npm run start:dev

# The backend will run on http://localhost:3001
```

## Step 4: Frontend Setup

### Navigate to Frontend Directory

```bash
cd ../frontend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local with your actual values
nano .env.local  # or use your preferred editor
```

**Important**: Update these values in `.env.local`:
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:3001/api)
- `NEXT_PUBLIC_MAPBOX_API_KEY` or `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Start Frontend Server

```bash
# Development mode
npm run dev

# The frontend will run on http://localhost:3000
```

## Step 5: Verify Installation

1. Open your browser and navigate to `http://localhost:3000`
2. You should see the Lodgr homepage
3. Backend API should be accessible at `http://localhost:3001/api`

## Troubleshooting

### Database Connection Issues

- Verify PostgreSQL is running: `pg_isready`
- Check your `DATABASE_URL` in backend `.env`
- Ensure the database `lodgr` exists

### Port Already in Use

If port 3000 or 3001 is already in use:

```bash
# Find the process using the port
lsof -i :3000  # or :3001

# Kill the process
kill -9 <PID>
```

Or change the port in your configuration.

### Prisma Issues

If you encounter Prisma errors:

```bash
cd backend
npx prisma generate
npx prisma migrate reset
```

## Next Steps

- Review the [API Documentation](./API.md)
- Check out the [Database Schema](./SCHEMA.md)
- Read the [Development Guidelines](../CONTRIBUTION.md)

## Getting Help

For issues or questions, contact: catherinelizmorgan@gmail.com
