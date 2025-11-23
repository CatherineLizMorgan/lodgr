import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async create(
    @CurrentUser() user: any,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    return this.bookingsService.create(user.id, createBookingDto);
  }

  @Get('my-bookings')
  async getMyBookings(@CurrentUser() user: any) {
    return this.bookingsService.findMyBookings(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.bookingsService.findOne(id, user.id);
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string, @CurrentUser() user: any) {
    return this.bookingsService.cancel(id, user.id);
  }
}
