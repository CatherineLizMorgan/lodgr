import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(guestId: string, createBookingDto: CreateBookingDto) {
    const { listingId, checkIn, checkOut, numberOfGuests } = createBookingDto;

    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (numberOfGuests > listing.maxGuests) {
      throw new BadRequestException(
        `Number of guests exceeds maximum allowed (${listing.maxGuests})`,
      );
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate >= checkOutDate) {
      throw new BadRequestException('Check-out date must be after check-in date');
    }

    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    const totalPrice = nights * listing.pricePerNight;

    const booking = await this.prisma.booking.create({
      data: {
        listingId,
        guestId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        numberOfGuests,
        totalPrice,
        status: 'pending',
      },
      include: {
        listing: {
          select: {
            title: true,
            city: true,
            country: true,
            images: true,
          },
        },
      },
    });

    return booking;
  }

  async findMyBookings(userId: string) {
    const bookings = await this.prisma.booking.findMany({
      where: { guestId: userId },
      include: {
        listing: {
          select: {
            id: true,
            title: true,
            city: true,
            country: true,
            images: true,
            host: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return { data: bookings };
  }

  async findOne(id: string, userId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        listing: {
          include: {
            host: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                phone: true,
                email: true,
                avatarUrl: true,
              },
            },
          },
        },
        guest: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            email: true,
            avatarUrl: true,
          },
        },
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.guestId !== userId && booking.listing.hostId !== userId) {
      throw new BadRequestException('You do not have access to this booking');
    }

    return booking;
  }

  async cancel(id: string, userId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.guestId !== userId) {
      throw new BadRequestException('You can only cancel your own bookings');
    }

    if (booking.status === 'cancelled') {
      throw new BadRequestException('Booking is already cancelled');
    }

    const updatedBooking = await this.prisma.booking.update({
      where: { id },
      data: { status: 'cancelled' },
    });

    return updatedBooking;
  }
}
