import { IsString, IsNotEmpty, IsDateString, IsNumber, Min } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  listingId: string;

  @IsDateString()
  checkIn: string;

  @IsDateString()
  checkOut: string;

  @IsNumber()
  @Min(1)
  numberOfGuests: number;
}
