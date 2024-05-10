import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'Mobile Number of user',
    example: '+13155042018',
  })
  @IsString()
  @IsNotEmpty()
  phone_number: string;
}
