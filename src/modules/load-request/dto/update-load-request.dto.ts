import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { MoveStatus } from '../load-request.entity';

export class UpdateLoadRequestDto {

  @ApiProperty({
    description: 'Delivery Status',
    example: 'Not Started',
  })
  @IsOptional()
  delivery_status: MoveStatus;

  @ApiProperty({
    description: 'Loading State',
    example: 'NY',
  })
  @IsString()
  @IsOptional()
  loading_state: string;

  @ApiProperty({
    description: 'Loading Zip Code',
    example: '1234',
  })
  @IsString()
  @IsOptional()
  loading_zip_code: string;

  @ApiProperty({
    description: 'Delivery State',
    example: 'NY',
  })
  @IsString()
  @IsOptional()
  delivery_state: string;

  @ApiProperty({
    description: 'Delivery Zip Code',
    example: '1234',
  })
  @IsString()
  @IsOptional()
  delivery_zip_code: string;

  @ApiProperty({
    description: 'Cubic Feet',
    example: 20,
  })
  @IsNumber()
  @IsOptional()
  cubic_feet: number;

  @ApiProperty({
    description: 'Balance At Delivery',
    example: 200,
  })
  @IsNumber()
  @IsOptional()
  balance_at_delivery: number;

  @ApiProperty({
    description: 'Price Per Cubic Feet',
    example: 10,
  })
  @IsNumber()
  @IsOptional()
  price_per_cubic_feet: number;

  @ApiProperty({
    description: 'First Available Date Of Delivery',
    example: '2023-11-20T08:00:00.000Z',
  })
  @IsOptional()
  first_available_date_of_delivery: Date;
}
