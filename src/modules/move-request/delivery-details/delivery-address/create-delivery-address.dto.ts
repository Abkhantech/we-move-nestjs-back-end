import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { DeliveryAddressType } from './delivery-address.entity';
export class CreateDeliveryAddressDto {

  @ApiProperty({
    description: 'Complete Address',
    example: DeliveryAddressType.Home
  })
  @IsOptional()
  delivery_location_type: DeliveryAddressType;

  @ApiProperty({
    description: 'Complete Address',
    example: '234 Main St'
  })
  @IsOptional()
  complete_address: string;

  @ApiProperty({
    description: 'If Stairs are present',
    example:true
  })
  @IsOptional()
  stiars_present: boolean;

  @ApiProperty({
    description: 'If elevator can be accessed',
    example:false
  })
  @IsOptional()
  is_elevator_accessible: boolean;

  @ApiProperty({
    description: 'Number of flights',
    example:3
  })
  @IsOptional()
  no_of_flights: number;

  @ApiProperty({
    description: 'Number of floors',
    example:6
  })
  @IsOptional()
  floor_no: number;
}
