import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
export class CreatePackagingDto {
  @ApiProperty({
    description: 'Packaging Type',
    example: 'Custom Package or Full Package'
  })
  @IsOptional()
  packaging_type: string;

  @ApiProperty({
    description: 'Packaging Payment',
    example:400
  })
  @IsOptional()
  packaging_payment: number;

  @ApiProperty({
    description: 'Packaging Type',
    example: 'boxes-only, boxes-and-labor, labor-only'
  })
  @IsOptional()
  custom_packaging_preference:string

  @ApiProperty({
    description: 'Number of dish boxes',
    example:2
  })
  @IsOptional()
  dish_boxes: number;

  @ApiProperty({
    description: 'Number of wardrob boxes',
    example:2
  })
  @IsOptional()
  wardrobe_boxes: number;

  @ApiProperty({
    description: 'Number of med boxes',
    example:2
  })
  @IsOptional()
  med_boxes: number;

  @ApiProperty({
    description: 'Number of large boxes',
    example:2
  })
  @IsOptional()
  large_boxes: number;

  @ApiProperty({
    description: 'Number of book boxes',
    example:2
  })
  @IsOptional()
  book_boxes: number;

  @ApiProperty({
    description: 'Number of picture boxes',
    example:2
  })
  @IsOptional()
  small_picture_boxes: number;

  @ApiProperty({
    description: 'Number of picture boxes',
    example:2
  })
  @IsOptional()
  medium_picture_boxes: number;

  @ApiProperty({
    description: 'Number of picture boxes',
    example:2
  })
  @IsOptional()
  large_picture_boxes: number;

  @ApiProperty({
    description: 'Number of picture boxes',
    example:2
  })
  @IsOptional()
  extra_large_picture_boxes: number;

  @ApiProperty({
    description: 'Number of picture boxes',
    example:2
  })
  @IsOptional()
  mattress_covers: number;

  @ApiProperty({
    description: 'Number of picture boxes',
    example:2
  })
  @IsOptional()
  packing_tapes: number;

  @ApiProperty({
    description: 'Number of tv boxes',
    example:2
  })
  @IsOptional()
  tv_boxes: number;
}
