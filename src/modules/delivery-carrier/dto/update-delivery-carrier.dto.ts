import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateDriverDto } from 'src/modules/driver/dto/create-driver.dto';
import { CreateInsuranceDto } from 'src/modules/insurance/dto/create-insurance.dto';

export class UpdateDeliveryCarrierDto {
  @ApiProperty({
    description: 'Company name',
    example: 'Shafi Group',
  })
  @IsOptional()
  @IsString()
  company_name: string;

  @ApiProperty({
    description: 'Company Document',
    example: 'SDocument upload',
  })
  @IsOptional()
  @IsString()
  company_license: any; //document upload

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
    description: 'HHC License Number',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  hhg_license: boolean;

  @ApiProperty({
    description: 'MC Number',
    example: '(323) 987-6543',
  })
  @IsString()
  @IsOptional()
  owner_name: string;

  @ApiProperty({
    description: 'MC Number',
    example: '(323) 987-6543',
  })
  @IsOptional()
  owner_driver_license: any; //document upload

  @ApiProperty({
    description: 'Primary Contact',
    example: '(415) 555-2671',
  })
  @IsString()
  @IsOptional()
  primary_contact: string;

  @ApiProperty({
    description: 'Main Phone Number',
    example: '+14155552671',
  })
  @IsString()
  @IsOptional()
  owner_phone_number: string;

  @ApiProperty({
    description: 'Email',
    example: 'abc@gmail.com',
  })
  @IsString()
  @IsOptional()
  company_email: string;

  @ApiProperty({
    description: 'Main Phone Number',
    example: '+14155552671',
  })
  @IsString()
  @IsOptional()
  company_phone_number: string;

  @ApiProperty({
    description: 'Count Of 53 Foot Trailers',
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  count_of_53_foot_trailers: number;

  @ApiProperty({
    description: 'Count Of Drivers',
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  count_of_drivers: number;

  @ApiProperty({
    description: 'Activation Status',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  activation_status: boolean;

  // @ApiProperty({
  //   description: 'Insurances of the Pickup-carrier',
  //   example: [
  //     {
  //       insurance_company: 'ABC',
  //       phone_number: '+16087297915',
  //       insurance_document: '...',
  //     },
  //   ],
  // })
  // @IsOptional()
  // insurances: CreateInsuranceDto[];

  // @ApiProperty({
  //   description: 'drivers of the Pickup-carrier',
  //   example: [
  //     {
  //       first_name: 'Atif',
  //       last_name: 'Atif',
  //       phone_number:'+16087297915',
  //     }
  //   ],
  // })
  // @IsOptional()
  // driver: CreateDriverDto[];
}
