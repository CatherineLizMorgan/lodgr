import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    const event = await this.prisma.event.create({
      data: createEventDto,
    });

    return event;
  }

  async findAll(query: any) {
    const { city, country, eventType, startDate, endDate, isActive = true } = query;

    const where: any = {
      isActive: isActive === 'true',
    };

    if (city) where.city = { contains: city, mode: 'insensitive' };
    if (country) where.country = { contains: country, mode: 'insensitive' };
    if (eventType) where.eventType = eventType;
    if (startDate || endDate) {
      where.AND = [];
      if (startDate) where.AND.push({ endDate: { gte: new Date(startDate) } });
      if (endDate) where.AND.push({ startDate: { lte: new Date(endDate) } });
    }

    const events = await this.prisma.event.findMany({
      where,
      orderBy: { startDate: 'asc' },
    });

    return { data: events };
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async getListingsNearEvent(eventId: string, query: any) {
    const { maxDistance, accommodationType, maxPrice, limit = 20 } = query;

    const event = await this.findOne(eventId);

    const where: any = {
      eventListings: {
        some: {
          eventId,
        },
      },
      isActive: true,
    };

    if (accommodationType) where.accommodationType = accommodationType;
    if (maxPrice) where.pricePerNight = { lte: parseFloat(maxPrice) };

    const listings = await this.prisma.listing.findMany({
      where,
      include: {
        host: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
            reputationScore: true,
          },
        },
        eventListings: {
          where: { eventId },
          select: {
            distanceToVenue: true,
          },
        },
      },
      take: parseInt(limit),
    });

    const listingsWithDistance = listings
      .map((listing) => ({
        ...listing,
        distanceToVenue: listing.eventListings[0]?.distanceToVenue || null,
        eventListings: undefined,
      }))
      .filter((listing) => !maxDistance || listing.distanceToVenue <= parseFloat(maxDistance))
      .sort((a, b) => (a.distanceToVenue || 0) - (b.distanceToVenue || 0));

    return {
      event: {
        id: event.id,
        name: event.name,
        venueName: event.venueName,
      },
      listings: listingsWithDistance,
    };
  }
}
