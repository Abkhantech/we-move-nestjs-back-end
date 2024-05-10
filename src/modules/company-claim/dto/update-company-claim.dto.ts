import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateClaimDto {
  @ApiProperty({
    description: 'chat support url',
    example: 'www.xyz.com/support'
  })
  @IsString()
  @IsNotEmpty()
  chat_support_url: string;

  @ApiProperty({
    description: 'name of representative',
    example: 'David Beckham'
  })
  @IsString()
  @IsNotEmpty()
  post_claim_customer_support_representative: string;

  @ApiProperty({
    description: 'Phone number of suport',
    example: '+111111111'
  })
  @IsString()
  @IsNotEmpty()
  phone_support: string;
  
  @ApiProperty({
    description: 'Website of claim support',
    example: 'www.xyz.com/support'
  })
  @IsString()
  @IsNotEmpty()
  website: string
}
