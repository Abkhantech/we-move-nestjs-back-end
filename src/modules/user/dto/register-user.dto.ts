import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateAddressDto } from 'src/modules/address/dto/create-address.dto';

export class RegisterUserDto {
  @ApiProperty({
    description: 'Email of user',
    example: 'atif@wemove.ai'
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'First Name of user',
    example: 'Atif'
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    description: 'Last Name of user',
    example: 'Javaid'
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    description: 'Mobile Number of user',
    example: '+13155042018'
  })
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({
    description: 'Addresses of a User',
    example: [
      {
        street_address: 'Street 6',
        city: 'NY',
        state:'NY',
        zip_code:'1234567'
      }
    ],
  })
  @IsOptional()
  addresses:CreateAddressDto[]
 

}
