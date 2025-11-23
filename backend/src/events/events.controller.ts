import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  async findAll(@Query() query: any) {
    return this.eventsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Get(':id/listings')
  async getListingsNearEvent(@Param('id') id: string, @Query() query: any) {
    return this.eventsService.getListingsNearEvent(id, query);
  }
}
