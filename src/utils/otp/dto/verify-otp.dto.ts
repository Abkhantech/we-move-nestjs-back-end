import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerfyOtpDto {
  @ApiProperty({
    description: 'Mobile Number of user',
    example: '+13155042018',
  })
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({
    description: 'User OTP',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  otp: string;
}
