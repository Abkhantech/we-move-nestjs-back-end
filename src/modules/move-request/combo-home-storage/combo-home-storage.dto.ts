import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { CreateStorageDto } from '../storage/create-storage.dto';
export class CreateComboHomeStorageDto {
    @ApiProperty({
        description: 'Home Address',
        example: '234 Main St'
      })
      @IsString()
      @IsOptional()
      home_address: string  

      @ApiProperty({
        description: 'Apartment',
        example: {
            storage_size: 3,
            storage_filled: 90,
            zip_code: '11201',
            address: '123 Main St',
            storage_cubic_feet: 400,
            floor_no: 3,
            is_elevator_accessible: true,
            are_stairs_present: true,
        }
      })
      @IsOptional()
      storage: CreateStorageDto; 
}
