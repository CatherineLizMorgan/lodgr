import { IsString, IsNotEmpty, IsDateString, IsNumber, Min, Max } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  eventType: string; // 'world_cup', 'olympics', 'f1', 'concert', 'convention'

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsNumber()
  @Min(-90)
  @Max(90)
  venueLatitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  venueLogitude: number;

  @IsString()
  @IsNotEmpty()
  venueName: string;

  @IsString()
  description?: string;
}
