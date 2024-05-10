import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateDeliveryAddressDto } from '../delivery-address/create-delivery-address.dto';
import { CreatePackagingDto } from '../packaging/create-packaging.dto';
export class CreateDeliveryDetailsDto {
  @ApiProperty({
    description: 'If A determined delivery address is available or not',
    example: true,
  })
  @IsOptional()
  determined_delivery_address: boolean;

  @ApiProperty({
    description: 'Delivery Address - one or more than one',
    example: [
      {
        complete_address: '123 Main St',
        stiars_present: false,
        is_elevator_accessible: true,
        no_of_flights: 4,
        floor_no: 6,
      },
    ],
  })
  @IsOptional()
  delivery_addresses: CreateDeliveryAddressDto[];

  @ApiProperty({
    description: 'Package type and Boxing details',
    example: 
      {
        packaging_type: 'Customized Package',
        custom_packaging_preference: 'Boxes-and-Packing',
        packaging_payment: 400,
        dish_boxes: 3,
        wardrobe_boxes:5,
        med_boxes: 1,
        large_boxes: 6,
        book_boxes:2,
        small_picture_boxes:0,
        medium_picture_boxes: 0,
        large_picture_boxes: 0,
        packing_tapes:0,
        extra_large_picture_boxes: 0,
        mattress_covers: 0,
        tv_boxes:2,
      },
  })
  @IsOptional()
  packaging: CreatePackagingDto;

  @ApiProperty({
    description: 'If there are more than one address to drop load',
    example: false,
  })
  @IsOptional()
  additional_stops: boolean;

  @ApiProperty({
    description: 'If packaging is required or not',
    example: false,
  })
  @IsOptional()
  packagaing_required: boolean;

  @ApiProperty({
    description: 'Do you require a shuttle service?',
    example: true,
  })
  @IsOptional()
  shuttle_required:string

  @ApiProperty({
    description: 'Can we get a large truck infront of your house?',
    example: true,
  })
  @IsOptional()
  open_location: string;
}
