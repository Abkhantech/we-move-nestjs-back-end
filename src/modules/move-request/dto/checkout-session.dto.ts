import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class CheckoutSessionDto {
  @ApiProperty({
    description: 'price of product',
    example: 2000,
  })
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Canonical ID of moverequest',
    example: 'sjnaljsdnasljd',
  })
  @IsOptional()
  @IsString()
  canonical_id: string;
}
