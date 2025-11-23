import { Controller, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: any) {
    return this.usersService.findOne(user.id);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @CurrentUser() user: any,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(user.id, updateUserDto);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get(':id/reviews')
  async getUserReviews(@Param('id') id: string) {
    return this.usersService.getReviews(id);
  }
}
