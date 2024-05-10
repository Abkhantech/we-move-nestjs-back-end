import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStateDto } from './create-state.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStateDto extends PartialType(CreateStateDto) {
  @ApiProperty({
    description: 'Pickup Service State',
    example: 'EFU'
  })
  @IsString()
  @IsNotEmpty()
  pickup_service_states: string;
}
