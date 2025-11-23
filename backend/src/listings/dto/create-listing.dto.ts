import { IsString, IsNotEmpty, IsNumber, IsArray, IsEnum, Min, Max } from 'class-validator';

enum AccommodationType {
  COUCH = 'couch',
  SHARED = 'shared',
  PRIVATE = 'private',
  ENTIRE = 'entire',
}

export class CreateListingDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(AccommodationType)
  @IsNotEmpty()
  accommodationType: string;

  @IsNumber()
  @Min(0)
  pricePerNight: number;

  @IsNumber()
  @Min(1)
  @Max(20)
  maxGuests: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @IsArray()
  @IsString({ each: true })
  amenities: string[];

  @IsArray()
  @IsString({ each: true })
  images: string[];
}
