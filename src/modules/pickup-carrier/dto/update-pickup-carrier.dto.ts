import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreatePickupCarrierDto } from './create-pickup-carrier.dto';

export class UpdatePickupCarrierDto {
  @ApiProperty({
    description: 'Company name',
    example: 'Shafi Group',
  })
  @IsOptional()
  @IsString()
  company_name: string;

  @ApiProperty({
    description: 'Street address of the User',
    example: '1202 Ave K',
  })
  @IsOptional()
  @IsString()
  street_address: string;

  @ApiProperty({
    description: 'City of the User',
    example: 'Brooklyn, NY',
  })
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty({
    description: 'State of the User',
    example: 'New York',
  })
  @IsOptional()
  @IsString()
  state: string;

  @ApiProperty({
    description: 'Zip code of the User',
    example: '11230',
  })
  @IsOptional()
  @IsString()
  zip_code: string;

  @ApiProperty({
    description: 'DOT Number',
    example: '(123) 456-7890',
  })
  @IsString()
  @IsOptional()
  dot_number: string;

  @ApiProperty({
    description: 'MC Number',
    example: '(323) 987-6543',
  })
  @IsString()
  @IsOptional()
  mc_number: string;

  @ApiProperty({
    description: 'Company License',
    example: '2345Ab12',
  })
  @IsOptional()
  company_license: any;

  @ApiProperty({
    description: 'Driver License',
    example: '2345Ab12',
  })
  @IsOptional()
  owner_driver_license: any;

  @ApiProperty({
    description: 'Main Phone Number',
    example: '+14155552671',
  })
  @IsString()
  @IsOptional()
  owner_phone_number: string;

  @ApiProperty({
    description: 'Arbitration County',
    example: '2345Ab12',
  })
  @IsString()
  @IsOptional()
  arbitrationCounty: string;

  @ApiProperty({
    description: 'Arbitration State',
    example: '2345Ab12',
  })
  @IsString()
  @IsOptional()
  arbitrationState: string;

  @ApiProperty({
    description: 'Email',
    example: 'abc@gmail.com',
  })
  @IsString()
  @IsOptional()
  owner_email: string;

  @ApiProperty({
    description: 'Email',
    example: 'abc@gmail.com',
  })
  @IsString()
  @IsOptional()
  owner_office_phone: string;

  @ApiProperty({
    description: 'Trucks In Operation',
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  trucks_in_operatiion: number;

  @ApiProperty({
    description: 'Years In Business',
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  years_in_business: number;

  @ApiProperty({
    description: 'Person Registering Business First Name',
    example: 'Robin',
  })
  @IsString()
  @IsOptional()
  owner_name: string;

  @ApiProperty({
    description: 'Activation Status',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  activation_status: boolean;
}
