import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateZipCodeDto {
  @ApiProperty({
    description: 'Zip Code',
    example: '1234',
  })
  @IsNotEmpty()
  @IsString()
  zip_code: string;
  
}
