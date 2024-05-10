import { PartialType } from '@nestjs/swagger';
import { CreateLocalCarrierDto } from './create-local-carrier.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLocalCarrierDto extends PartialType(CreateLocalCarrierDto) {
  @ApiProperty({
    description: 'Company name',
    example: 'Shafi Group',
  })
  @IsNotEmpty()
  @IsString()
  company_name: string;

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
    description: 'Zip code of the User',
    example: '11230',
  })
  @IsNotEmpty()
  @IsString()
  zip_code: string;

  @ApiProperty({
    description: 'DOT Number',
    example: '(123) 456-7890',
  })
  @IsString()
  @IsNotEmpty()
  dot_number: string;

  @ApiProperty({
    description: 'MC Number',
    example: '(323) 987-6543',
  })
  @IsString()
  @IsNotEmpty()
  mc_number: string;

  @ApiProperty({
    description: 'Company License',
    example: '2345Ab12',
  })
  @IsNotEmpty()
  company_license: any;

  @ApiProperty({
    description: 'Driver License',
    example: '2345Ab12',
  })
  @IsNotEmpty()
  owner_driver_license: any;

  @ApiProperty({
    description: 'Main Phone Number',
    example: '+14155552671',
  })
  @IsString()
  @IsNotEmpty()
  owner_phone_number: string;

  @ApiProperty({
    description: 'Arbitration County',
    example: '2345Ab12',
  })
  @IsString()
  @IsNotEmpty()
  arbitrationCounty: string;

  @ApiProperty({
    description: 'Arbitration State',
    example: '2345Ab12',
  })
  @IsString()
  @IsNotEmpty()
  arbitrationState: string;

  @ApiProperty({
    description: 'Email',
    example: 'abc@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  owner_email: string;

  @ApiProperty({
    description: 'Email',
    example: 'abc@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  owner_office_phone: string;

  @ApiProperty({
    description: 'Trucks In Operation',
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  trucks_in_operatiion: number;

  @ApiProperty({
    description: 'Years In Business',
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  years_in_business: number;

  @ApiProperty({
    description: 'Person Registering Business First Name',
    example: 'Robin',
  })
  @IsString()
  @IsNotEmpty()
  owner_name: string;


  @ApiProperty({
    description: 'Activation Status',
    example: 'true',
  })
  @IsBoolean()
  @IsOptional()
  activation_status: boolean;
}
