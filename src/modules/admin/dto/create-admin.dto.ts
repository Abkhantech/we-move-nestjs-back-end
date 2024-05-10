import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({
    description: 'Email',
    example: 'abc@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'abc@gmail',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'First Name',
    example: 'Talha',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    description: 'Last Name',
    example: 'Arfan',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    description: 'Street address of the User',
    example: '1202 Ave K',
  })
  @IsNotEmpty()
  @IsString()
  street_address: string;

  @ApiProperty({
    description: 'City of the User',
    example: 'Brooklyn, NY',
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    description: 'State of the User',
    example: 'New York',
  })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({
    description: 'Main Phone Number',
    example: '+14155552671',
  })
  @IsString()
  @IsNotEmpty()
  phone_number: string;

}
