import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSkipTraceDto {
  
  @ApiProperty({
    description: 'Address',
    example: '5635 E Minnesota Dr, Denver, Co 80224',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'City ',
    example: 'Denver',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'State',
    example: 'CO',
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    description: 'Zip Code',
    example: '80224',
  })
  @IsString()
  @IsNotEmpty()
  zip: string;
}
