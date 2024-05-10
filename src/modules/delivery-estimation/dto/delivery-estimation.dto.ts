import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class DeliveryEstimationDto {
  @ApiProperty({
    description: 'approximated days to cover 0 to 500 miles',
    example: '2-3 days'
  })
  @IsString()
  @IsNotEmpty()
  estimation_0_to_500_miles: string;

  @ApiProperty({
    description: 'approximated days to cover 501 to 1000 miles',
    example: '3-7 days'
  })
  @IsString()
  @IsNotEmpty()
  estimation_501_to_1000_miles: string;

  @ApiProperty({
    description: 'approximated days to cover 1001 to 1500 miles',
    example: '7-15 days'
  })
  @IsString()
  @IsNotEmpty()
  estimation_1001_to_1500_miles: string;
  
  @ApiProperty({
    description: 'approximated days to cover 1501 to 4000 miles',
    example: '15-21 days'
  })
  @IsString()
  @IsNotEmpty()
  estimation_1501_to_4000_miles: string
}
