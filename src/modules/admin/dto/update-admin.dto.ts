import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @ApiProperty({
    description: 'Email',
    example: 'abc@gmail.com',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'abc@gmail',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password: string;

  @ApiProperty({
    description: 'First Name',
    example: 'Talha',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  first_name: string;

  @ApiProperty({
    description: 'Last Name',
    example: 'Arfan',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  last_name: string;

  @ApiProperty({
    description: 'Street address of the User',
    example: '1202 Ave K',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  street_address: string;

  @ApiProperty({
    description: 'City of the User',
    example: 'Brooklyn, NY',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({
    description: 'State of the User',
    example: 'New York',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  state: string;

  @ApiProperty({
    description: 'Main Phone Number',
    example: '+14155552671',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phone_number: string;
}
