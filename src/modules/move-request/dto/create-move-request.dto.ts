import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { CreateApartmentDto } from '../apartment/create-apartment.dto';
import { CreateComboApartmentStorageDto } from '../combo-apartment-storage/combo-apartment-storage.dto';
import { CreateComboHomeStorageDto } from '../combo-home-storage/combo-home-storage.dto';
import { CreateStorageDto } from '../storage/create-storage.dto';
import { CreateDeliveryDetailsDto } from '../delivery-details/dto/create-delivery-details.dto';
import { CreateMovingItemDto } from '../moving-item/create-moving-item.dto';
import { CreateRoomDetailsDto } from 'src/modules/room-details/dto/create-room-details.dto';
export enum MoveStatus {
  NotStarted = 'Not Started',
  InProgress = 'In Progress',
  Completed = 'Completed',
}
export class MoveRequestDto {

  @ApiProperty({
    description: 'id of the pickup carrier',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  pickup_carrier_id: number;

  @ApiProperty({
    description: 'id of the move request',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Type of Move',
    example: 'Out of state',
  })
  @IsOptional()
  @IsString()
  move_type: string;

  @ApiProperty({
    description: 'Status of Move',
    example: 'In Progress',
  })
  @IsOptional()
  move_status: MoveStatus;

  @ApiProperty({
    description: 'Status of Pickup',
    example: 'In Progress',
  })
  @IsOptional()
  pickup_status: MoveStatus;

  @ApiProperty({
    description: 'Type of location',
    example: 'Apartment',
  })
  @IsString()
  @IsOptional()
  location_type: string; //Type: Home or Apartment or Combos etc

  @ApiProperty({
    description: 'Apartment',
    example: {
      floor_no: 3,
      is_elevator_available: true,
      is_elevator_accessible: true,
      elevator_type: 'Standard',
      apt_address: '123 Main St',
    },
  })
  @IsOptional()
  apartment: CreateApartmentDto; // If user chooses Apartment only

  @ApiProperty({
    description: 'Combo-Apartment-Storage',
    example: {
      apartment: {
        floor_no: 3,
        is_elevator_available: true,
        is_elevator_accessible: true,
        elevator_type: 'Standard',
        apt_address: '123 Main St',
      },
      storage: {
        storage_size: 3,
        storage_filled: 90,
        zip_code: '11201',
        address: '123 Main St',
        storage_cubic_feet:400,
      },
    },
  })
  @IsOptional()
  combo_apartment_storage: CreateComboApartmentStorageDto; // If user chooses Combo-Apartment-Storage

  @ApiProperty({
    description: 'Home Address',
    example: '123 Main St',
  })
  @IsString()
  @IsOptional()
  home_address: string; // If user chooses home only

  @ApiProperty({
    description: 'Combo-Home-Storage',
    example: {
      home_address: '234 Main St',
      storage: {
        storage_size: 3,
        storage_filled: 90,
        zip_code: '11201',
        address: '123 Main St',
        storage_cubic_feet:400,
      },
    },
  })
  @IsOptional()
  combo_home_storage: CreateComboHomeStorageDto; // If user chooses Combo-Home-Storage

  @ApiProperty({
    description: 'Storage',
    example: {
      storage_size: 3,
      storage_filled: 90,
      zip_code: '11201',
      address: '123 Main St',
      storage_cubic_feet:400
    },
  })
  @IsOptional()
  storage: CreateStorageDto; // If user chooses Stroage only

  @ApiProperty({
    description: 'Storage',
    example: {
      determined_delivery_address: true,
      delivery_addresses: [
        {
          complete_address: '123 Main St',
          stiars_present: false,
          is_elevator_accessible: true,
          no_of_flights: 4,
          floor_no: 6,
        },
      ],
      packaging: {
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
      additional_stops: false,
      packagaing_required: false,
      open_location: 'YES',
      shuttle_required: 'NO',
    },
  })
  @IsOptional()
  delivery_details: CreateDeliveryDetailsDto;

  @ApiProperty({
    description: 'Pickup Date opening window',
    example: '2023-11-21',
  })
  @IsOptional()
  pickup_date_from: Date;

  @ApiProperty({
    description: 'Pickup Date closing window',
    example: '2023-11-21',
  })
  @IsOptional()
  pickup_date_to: Date;

  @ApiProperty({
    description: 'FADD',
    example: '2023-11-21',
  })
  @IsOptional()
  first_available_date_of_delivery:Date

  // @ApiProperty({
  //   description: 'Storage',
  //   example: 
  //   [
  //     {
  //       video_url: '',
  //       items:  [
  //         {
  //           item_name: 'Table',
  //           item_width: 20,
  //           item_length: 15,
  //           item_height: 22,
  //         },
  //       ],
  //     }
  //   ]
  // })
  // @IsOptional()
  // roomDetails: CreateRoomDetailsDto[];

  @ApiProperty({
    description: 'Number of items being moved',
    example: 7
  })
  @IsOptional()
  item_count: number;

  @ApiProperty({
    description: 'Total payment of the move',
    example: 1500
  })
  @IsOptional()
  move_payment: number;

  @ApiProperty({
    description: 'Initial deposit of the move',
    example: 1500
  })
  @IsOptional()
  initial_deposit: number;

  @ApiProperty({
    description: 'Total number of rooms',
    example: 3
  })
  @IsOptional()
  number_of_rooms:number
}
