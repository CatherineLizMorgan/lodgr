import { IsString, IsNumber, IsArray, IsBoolean, IsOptional, Min, Max } from 'class-validator';

export class UpdateListingDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  accommodationType?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  pricePerNight?: number;

  @IsNumber()
  @Min(1)
  @Max(20)
  @IsOptional()
  maxGuests?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  amenities?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
