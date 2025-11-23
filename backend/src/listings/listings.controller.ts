import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @CurrentUser() user: any,
    @Body() createListingDto: CreateListingDto,
  ) {
    return this.listingsService.create(user.id, createListingDto);
  }

  @Get()
  async findAll(@Query() query: any) {
    return this.listingsService.findAll(query);
  }

  @Get('my-listings')
  @UseGuards(JwtAuthGuard)
  async getMyListings(@CurrentUser() user: any) {
    return this.listingsService.findByHost(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.listingsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() updateListingDto: UpdateListingDto,
  ) {
    return this.listingsService.update(id, user.id, updateListingDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.listingsService.remove(id, user.id);
  }
}
