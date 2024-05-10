import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateInsuranceDto {
  @ApiProperty({
    description: 'Insurance Company',
    example: 'EFU'
  })
  @IsNotEmpty()
  @IsString()
  insurance_company: string;

  @ApiProperty({
    description: 'Phone Number',
    example: '+14155552671'
  })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty({
    description: 'Insurance Claim Information',
    example: 'You need to bring your CNIC'
  })
  @IsNotEmpty()
  insurance_document: string;
}
