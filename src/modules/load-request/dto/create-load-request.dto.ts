import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { MoveStatus } from '../load-request.entity';

export class CreateLoadRequestDto {
  @ApiProperty({
    description: 'Pickup Carrier Id',
    example: "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
  })
  @IsNotEmpty()
  @IsString()
  pickup_crrier_id: string;

  @ApiProperty({
    description: 'Move Request Id',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  move_request_id: number;

  @ApiProperty({
    description: 'Delivery Status',
    example: 'Not Started',
  })
  delivery_status: MoveStatus;

  @ApiProperty({
    description: 'Loading State',
    example: 'NY',
  })
  @IsString()
  @IsNotEmpty()
  loading_state: string;

  @ApiProperty({
    description: 'Loading Zip Code',
    example: '1234',
  })
  @IsString()
  @IsNotEmpty()
  loading_zip_code: string;

  @ApiProperty({
    description: 'Delivery State',
    example: 'NY',
  })
  @IsString()
  @IsNotEmpty()
  delivery_state: string;

  @ApiProperty({
    description: 'Delivery Zip Code',
    example: '1234',
  })
  @IsString()
  @IsNotEmpty()
  delivery_zip_code: string;

  @ApiProperty({
    description: 'Cubic Feet',
    example: 20,
  })
  @IsNumber()
  @IsNotEmpty()
  cubic_feet: number;

  @ApiProperty({
    description: 'Balance At Delivery',
    example: 200,
  })
  @IsNumber()
  @IsNotEmpty()
  balance_at_delivery: number;

  @ApiProperty({
    description: 'Price Per Cubic Feet',
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  price_per_cubic_feet: number;

  @ApiProperty({
    description: 'First Available Date Of Delivery',
    example: '2023-11-20T08:00:00.000Z',
  })
  @IsNotEmpty()
  first_available_date_of_delivery: Date;
}
