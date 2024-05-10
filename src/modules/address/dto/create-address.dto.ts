import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    description: 'Street address of the User',
    example: '1202 Ave K'
  })
  @IsOptional()
  @IsString()
  street_address: string;

  @ApiProperty({
    description: 'City of the User',
    example: 'Brooklyn, NY'
  })
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty({
    description: 'State of the User',
    example: 'New York'
  })
  @IsOptional()
  @IsString()
  state: string;

  @ApiProperty({
    description: 'Zip code of the User',
    example: '11230'
  })
  @IsString()
  @IsOptional()
  zip_code: string;
}

