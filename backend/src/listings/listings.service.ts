import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}

  async create(hostId: string, createListingDto: CreateListingDto) {
    const listing = await this.prisma.listing.create({
      data: {
        ...createListingDto,
        hostId,
      },
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
      },
    });

    return listing;
  }

  async findAll(query: any) {
    const {
      city,
      country,
      accommodationType,
      minPrice,
      maxPrice,
      maxGuests,
      page = 1,
      limit = 20,
    } = query;

    const skip = (page - 1) * limit;

    const where: any = {
      isActive: true,
    };

    if (city) where.city = { contains: city, mode: 'insensitive' };
    if (country) where.country = { contains: country, mode: 'insensitive' };
    if (accommodationType) where.accommodationType = accommodationType;
    if (maxGuests) where.maxGuests = { gte: parseInt(maxGuests) };
    if (minPrice || maxPrice) {
      where.pricePerNight = {};
      if (minPrice) where.pricePerNight.gte = parseFloat(minPrice);
      if (maxPrice) where.pricePerNight.lte = parseFloat(maxPrice);
    }

    const [listings, total] = await Promise.all([
      this.prisma.listing.findMany({
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
        },
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.listing.count({ where }),
    ]);

    return {
      data: listings,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: {
        host: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
            bio: true,
            reputationScore: true,
            isVerified: true,
          },
        },
      },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    return listing;
  }

  async update(id: string, userId: string, updateListingDto: UpdateListingDto) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.hostId !== userId) {
      throw new ForbiddenException('You can only update your own listings');
    }

    const updatedListing = await this.prisma.listing.update({
      where: { id },
      data: updateListingDto,
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
      },
    });

    return updatedListing;
  }

  async remove(id: string, userId: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.hostId !== userId) {
      throw new ForbiddenException('You can only delete your own listings');
    }

    await this.prisma.listing.delete({
      where: { id },
    });

    return { message: 'Listing deleted successfully' };
  }

  async findByHost(hostId: string) {
    const listings = await this.prisma.listing.findMany({
      where: { hostId },
      orderBy: { createdAt: 'desc' },
    });

    return listings;
  }
}
