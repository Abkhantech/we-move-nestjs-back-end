import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { CreateAddressDto } from 'src/modules/address/dto/create-address.dto';

export class FindDistanceDto {
  @ApiProperty({
    description: 'pickup address',
    example: 'New York'
  })
  @IsString()
  @IsNotEmpty()
  pickup_address: string;

  @ApiProperty({
    description: 'pickup address',
    example: 'New York'
  })
  @IsNumber()
  @IsNotEmpty()
  moveRequestId: number;

  @ApiProperty({
    description: 'delivery address',
    example: 'Brooklyn'
  })
  @IsString()
  @IsNotEmpty()
  delivery_address: string;
  
}
