import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateDriverDto } from 'src/modules/driver/dto/create-driver.dto';
import { CreateInsuranceDto } from 'src/modules/insurance/dto/create-insurance.dto';
import { CreateStateDto } from 'src/modules/state/dto/create-state.dto';

export class CreateDeliveryCarrierDto {
  @ApiProperty({
    description: 'Company name',
    example: 'Shafi Group',
  })
  @IsNotEmpty()
  @IsString()
  company_name: string;

  @ApiProperty({
    description: 'Company Document',
    example: 'SDocument upload',
  })
  @IsNotEmpty()
  @IsString()
  company_license: any; //document upload

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
    description: 'HHC License Number',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  hhg_license: boolean;

  @ApiProperty({
    description: 'If this is also a pickupcarrier',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  both: boolean;

  @ApiProperty({
    description: 'MC Number',
    example: '(323) 987-6543',
  })
  @IsString()
  @IsNotEmpty()
  owner_name: string;

  @ApiProperty({
    description: 'MC Number',
    example: '(323) 987-6543',
  })
  @IsNotEmpty()
  owner_driver_license: any; //document upload

  @ApiProperty({
    description: 'Primary Contact',
    example: '(415) 555-2671',
  })
  @IsString()
  @IsNotEmpty()
  primary_contact: string;

  @ApiProperty({
    description: 'Main Phone Number',
    example: '+14155552671',
  })
  @IsString()
  @IsNotEmpty()
  owner_phone_number: string;

  @ApiProperty({
    description: 'Email',
    example: 'abc@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  company_email: string;

  @ApiProperty({
    description: 'Main Phone Number',
    example: '+14155552671',
  })
  @IsString()
  @IsNotEmpty()
  company_phone_number: string;

  @ApiProperty({
    description: 'Count Of 53 Foot Trailers',
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  count_of_53_foot_trailers: number;

  @ApiProperty({
    description: 'Count Of Drivers',
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  count_of_drivers: number;
  
  @ApiProperty({
    description: 'Insurances of the Pickup-carrier',
    example: [
      {
        insurance_company: 'ABC',
        phone_number: '+16087297915',
        insurance_document: '...',
      },
    ],
  })
  @IsOptional()
  insurances: CreateInsuranceDto[]; 
}
