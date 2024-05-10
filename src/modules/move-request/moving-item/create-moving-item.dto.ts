import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
export class CreateMovingItemDto {
  @ApiProperty({
    description: 'Name of the item',
    example: 'Table'
  })
  @IsString()
  item_name: string;

  @ApiProperty({
    description: 'Width of the item',
    example: 20
  })
  @IsOptional()
  item_width: number;

  @ApiProperty({
    description: 'Length of the item',
    example: 15
  })
  @IsOptional()
  item_length: number;


  @ApiProperty({
    description: 'Height of the item',
    example: 22
  })
  @IsOptional()
  item_height: number;
}
