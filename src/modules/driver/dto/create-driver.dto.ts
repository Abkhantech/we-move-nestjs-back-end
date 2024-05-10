import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDriverDto {
  @ApiProperty({
    description: 'First Name of driver',
    example: 'Atif'
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    description: 'Last Name of driver',
    example: 'Javaid'
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    description: 'Mobile Number of driver',
    example: '+13155042018'
  })
  @IsString()
  @IsNotEmpty()
  phone_number: string;
}
