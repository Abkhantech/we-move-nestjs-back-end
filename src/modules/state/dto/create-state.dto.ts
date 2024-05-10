import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateZipCodeDto } from "src/modules/zip-code/dto/create-state-zip-code.dto";

export class CreateStateDto {
  @ApiProperty({
    description: 'Pickup Service State',
    example: 'EFU'
  })
  @IsString()
  @IsNotEmpty()
  pickup_service_state: string;

  @ApiProperty({
    description: 'Pickup Service State',
    example: [
      {
        zip_code: '22222'
      },
      {
        zip_code: '33333'
      }
    ]
  })
  @IsString()
  @IsOptional()
  zip_codes: CreateZipCodeDto[];

  @ApiProperty({
    description: 'Contact Name',
    example: 'John White',
  })
  @IsOptional()
  @IsString()
  point_of_contact_name: string;

  @ApiProperty({
    description: 'Phone number',
    example: '+1234567890',
  })
  @IsOptional()
  @IsString()
  point_of_contact_phone_number: string;
  
}
