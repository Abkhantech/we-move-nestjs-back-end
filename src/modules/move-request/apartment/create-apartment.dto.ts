import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
export class CreateApartmentDto {
  @ApiProperty({
    description: 'Floor',
    example: '3'
  })
  @IsString()
  floor_no: number;

  @ApiProperty({
    description: 'availability',
    example: true
  })
  @IsOptional()
  is_elevator_available: boolean;

  @ApiProperty({
    description: 'accessibility',
    example: true
  })
  @IsOptional()
  is_elevator_accessible: boolean;

  @ApiProperty({
    description: 'Freigh or regular',
    example: 'Regular'
  })
  @IsOptional()
  elevator_type: string;

  @ApiProperty({
    description: 'Address of apartment',
    example: '123 Main St'
  })
  @IsOptional()
  apt_address: string;

}
