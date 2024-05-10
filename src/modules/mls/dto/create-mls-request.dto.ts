import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMlsRequestDto {
  @ApiProperty({
    description: 'MLS active',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  mls_active: boolean;

  @ApiProperty({
    description: 'MLS pending',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  mls_pending: boolean;

  @ApiProperty({
    description: 'MLS listing min',
    example: 1000,
  })
  @IsNumber()
  @IsOptional()
  mls_listing_min: number;

  @ApiProperty({
    description: 'City Name',
    example: 'New York',
  })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({
    description: 'State Name',
    example: 'New York',
  })
  @IsString()
  @IsOptional()
  state: string;

  @ApiProperty({
    description: 'Number of records to fetch',
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  no_of_records: number;

  @ApiProperty({
    description: 'Number of min beds to fetch',
    example: 2,
  })
  @IsNumber()
  @IsOptional()
  beds_min: number;

  @ApiProperty({
    description: 'Pagin number',
    example: 2,
  })
  @IsNumber()
  @IsOptional()
  result_index: number;
}
