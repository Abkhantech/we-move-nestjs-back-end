import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateApartmentDto } from '../apartment/create-apartment.dto';
import { CreateStorageDto } from '../storage/create-storage.dto';
export class CreateComboApartmentStorageDto {
    @ApiProperty({
        description: 'Apartment',
        example: {
          floor_no: 3,
          is_elevator_available: true,
          is_elevator_accessible: true,
          elevator_type: 'Standard',
          apt_address: '123 Main St',
        }
      })
      @IsOptional()
      apartment: CreateApartmentDto;

      @ApiProperty({
        description: 'Storage',
        example: {
            storage_size: 3,
            storage_filled: 90,
            zip_code: '11201',
            address: '123 Main St',
            storage_cubic_feet:400,
            floor_no: 3,
            is_elevator_accessible: true,
            are_stairs_present: true,
        }
      })
      @IsOptional()
      storage: CreateStorageDto; 
}
