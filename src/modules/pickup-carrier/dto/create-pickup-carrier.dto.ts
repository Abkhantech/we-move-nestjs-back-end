import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { DeliveryEstimationDto } from 'src/modules/delivery-estimation/dto/delivery-estimation.dto';
import { CreateInsuranceDto } from 'src/modules/insurance/dto/create-insurance.dto';
import { CreateStateDto } from 'src/modules/state/dto/create-state.dto';

export class CreatePickupCarrierDto {
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
    description: 'Company License',
    example: '2345Ab12',
  })
  @IsNotEmpty()
  w9_form: any;

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
  arbitrationCounty: string

  @ApiProperty({
    description: 'Arbitration State',
    example: '2345Ab12',
  })
  @IsString()
  @IsNotEmpty()
  arbitrationState: string

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

  @ApiProperty({
    description: 'states of the Pickup-carrier',
    example: [
      {
        pickup_service_states: 'CA',
      },
      {
        pickup_service_states: 'NA',
      },
    ],
  })
  @IsOptional()
  states: CreateStateDto[];

  @ApiProperty({
    description: 'approximation of days to cover distances',
    example:{
      estimation_0_to_500_miles: '2-3 days',
      estimation_501_to_1000_miles: '3-7 days',
      estimation_1001_to_1500_miles: '7-15 days',
      estimation_1501_to_4000_miles: '7-21 days',
    }
  })
  @IsOptional()
  delivery_approximations: DeliveryEstimationDto;
}
