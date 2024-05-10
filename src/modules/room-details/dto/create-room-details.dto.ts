import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateMovingItemDto } from 'src/modules/move-request/moving-item/create-moving-item.dto';

export class CreateRoomDetailsDto {

  @ApiProperty({
    description: 'URL of the video on s3',
    example: 3,
  })
  @IsNumber()
  @IsOptional()
  moveRequestId: number;

  @ApiProperty({
    description: 'Room Details ID',
    example: 3,
  })
  @IsNumber()
  @IsOptional()
  roomDetailId: number;

  @ApiProperty({
    description: 'URL of the video on s3',
    example: '-',
  })
  @IsString()
  @IsOptional()
  video_url: string;

  @ApiProperty({
    description: 'title of the video',
    example: 'Bedroom',
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    description: 'Storage',
    example: [
      {
        item_name: 'Table',
        item_width: 20,
        item_length: 15,
        item_height: 22,
      },
    ],
  })
  @IsOptional()
  items: CreateMovingItemDto[];
  
}
