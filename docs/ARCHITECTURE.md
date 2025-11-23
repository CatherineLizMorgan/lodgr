# Lodgr Platform Architecture

## Overview

Lodgr is built using a modern, scalable architecture with a clear separation between frontend and backend services.

## Technology Stack

### Frontend
- **Framework**: Next.js 15 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API / Zustand (to be implemented)
- **Maps**: Mapbox GL JS or Google Maps API
- **Payments**: Stripe Elements
- **HTTP Client**: Axios / Fetch API

### Backend
- **Framework**: NestJS (Node.js)
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: class-validator, class-transformer
- **API Documentation**: Swagger/OpenAPI (to be implemented)

### Infrastructure
- **Caching**: Redis (optional, for session management and caching)
- **Storage**: AWS S3 or similar (for images)
- **Email**: SendGrid or AWS SES
- **Payments**: Stripe
- **Deployment**: TBD (Docker, AWS, Vercel, etc.)

## Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│                   Frontend                      │
│              (Next.js + React)                  │
│                                                 │
│  ┌─────────┐  ┌─────────┐  ┌────────────┐     │
│  │  Pages  │  │Components│  │  Services  │     │
│  └─────────┘  └─────────┘  └────────────┘     │
│                                                 │
│  ┌─────────────────────────────────────┐       │
│  │         API Client Layer            │       │
│  └─────────────────────────────────────┘       │
└──────────────────┬──────────────────────────────┘
                   │ HTTP/HTTPS
                   │ (REST API)
┌──────────────────▼──────────────────────────────┐
│                  Backend                        │
│                 (NestJS)                        │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │Controllers│  │ Services │  │   DTOs   │     │
│  └──────────┘  └──────────┘  └──────────┘     │
│                                                 │
│  ┌──────────────────────────────────────┐      │
│  │          Prisma ORM Layer            │      │
│  └──────────────────────────────────────┘      │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│             PostgreSQL Database                 │
│                                                 │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐  │
│  │ Users  │ │Listings│ │ Events │ │Bookings│  │
│  └────────┘ └────────┘ └────────┘ └────────┘  │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│           External Services                     │
│                                                 │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐  │
│  │ Stripe │ │Mapbox/ │ │  AWS   │ │SendGrid│  │
│  │        │ │ Google │ │   S3   │ │        │  │
│  └────────┘ └────────┘ └────────┘ └────────┘  │
└─────────────────────────────────────────────────┘
```

## Project Structure

```
lodgr/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # Next.js app directory (pages, layouts)
│   ├── components/          # Reusable React components
│   ├── lib/                 # Utility functions and helpers
│   ├── services/            # API service layer
│   ├── types/               # TypeScript type definitions
│   ├── public/              # Static assets
│   └── package.json
│
├── backend/                 # NestJS backend application
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # Users module
│   │   ├── listings/       # Listings module
│   │   ├── events/         # Events module
│   │   ├── bookings/       # Bookings module
│   │   ├── payments/       # Payments module
│   │   ├── reviews/        # Reviews module
│   │   ├── common/         # Shared utilities, guards, interceptors
│   │   └── main.ts         # Application entry point
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── package.json
│
├── mobile/                  # React Native mobile app (future)
│
├── docs/                    # Documentation
│   ├── SETUP.md
│   ├── API.md
│   ├── SCHEMA.md
│   └── ARCHITECTURE.md
│
├── scripts/                 # Deployment and utility scripts
│
├── README.md
├── CONTRIBUTION.md
└── USAGE.md
```

## Core Modules

### Authentication Module
- User registration and login
- JWT token generation and validation
- Password hashing (bcrypt)
- Email verification
- Password reset

### Users Module
- User profile management
- Host/guest role management
- Reputation system
- Avatar upload

### Listings Module
- CRUD operations for listings
- Image upload and management
- Geospatial queries (distance calculations)
- Availability calendar
- Dynamic pricing

### Events Module
- Event management
- Event-listing associations
- Distance calculations from venues
- Event search and filtering

### Bookings Module
- Booking creation and management
- Availability checking
- Booking status workflow
- Calendar blocking

### Payments Module
- Stripe integration
- Payment processing
- Refund handling
- Payout management for hosts

### Reviews Module
- Review creation
- Rating calculation
- Reputation score updates

## Security Considerations

### Authentication & Authorization
- JWT tokens with expiration
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Email verification required

### Data Protection
- Input validation on all endpoints
- SQL injection prevention (Prisma ORM)
- XSS protection
- CORS configuration
- Rate limiting

### Payment Security
- PCI compliance through Stripe
- No storage of credit card data
- Webhook signature verification
- Secure API keys management

## Scalability Considerations

### Database
- Indexed columns for frequent queries
- Connection pooling
- Read replicas for scaling reads
- Database migrations versioning

### Caching
- Redis for session management
- API response caching
- Static asset CDN

### API Design
- Pagination for list endpoints
- Efficient database queries
- Lazy loading of images
- Background jobs for heavy operations

## Development Workflow

1. **Local Development**
   - Frontend runs on port 3000
   - Backend runs on port 3001
   - PostgreSQL on port 5432

2. **Code Quality**
   - ESLint for linting
   - Prettier for formatting
   - TypeScript for type safety
   - Unit tests (Jest)
   - E2E tests (to be implemented)

3. **Version Control**
   - Git for version control
   - Feature branches
   - Pull request reviews
   - Conventional commits

## Future Enhancements

- [ ] Mobile application (React Native)
- [ ] Real-time messaging (WebSocket)
- [ ] Push notifications
- [ ] Advanced search filters
- [ ] AI-powered recommendations
- [ ] Multi-language support
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Micro-insurance integration
- [ ] Social features (user connections)

## Deployment Strategy

### Development
- Local development environment
- Environment-specific configurations

### Staging (Future)
- Staging environment for testing
- Automated deployment from develop branch

### Production (Future)
- Blue-green deployment
- Automated backups
- Monitoring and logging
- Auto-scaling based on load

## Monitoring & Logging

### Logging
- Structured logging (Winston or similar)
- Log levels (error, warn, info, debug)
- Centralized log aggregation

### Monitoring
- Application performance monitoring
- Error tracking (Sentry or similar)
- Uptime monitoring
- Database performance metrics

### Alerts
- Error rate thresholds
- Response time alerts
- Database connection issues
- Payment failures

## Contact

For architecture questions or suggestions:
catherinelizmorgan@gmail.com
