import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';
export class CreateStorageDto {
  @ApiProperty({
    description: 'Storage size',
    example: 3
  })
  @IsOptional()
  storage_size: number;

  @ApiProperty({
    description: 'Storage filled',
    example: 90
  })
  @IsOptional()
  storage_filled: number;

  @ApiProperty({
    description: 'Storage Cubic Feet',
    example: 90
  })
  @IsOptional()
  storage_cubic_feet: number

  @ApiProperty({
    description: 'zip code',
    example: '11291'
  })
  @IsString()
  @IsOptional()
  zip_code: string;

  @ApiProperty({
    description: 'address',
    example: 'E5 St 6 WestWood Bridge'
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    description: 'Floor number',
    example: '3'
  })
  @IsString()
  @IsOptional()
  floor_no: number;

  @ApiProperty({
    description: 'Is elevator accessible?',
    example: true
  })
  @IsOptional()
  @IsBoolean()
  is_elevator_accessible: boolean;

  @ApiProperty({
    description: 'Are stairs present?',
    example: true
  })
  @IsOptional()
  @IsBoolean()
  are_stairs_present: boolean;
}
