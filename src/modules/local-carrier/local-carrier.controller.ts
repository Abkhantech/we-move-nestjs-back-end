import { Controller, Post, Body, Patch, Param, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { LocalCarrierService } from './local-carrier.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalCarrier } from './local-carrier.entity';
import { CreateLocalCarrierDto } from './dto/create-local-carrier.dto';
import { VerfyOtpDto } from 'src/utils/otp/dto/verify-otp.dto';
import { LoginUserDto } from 'src/utils/otp/dto/login-user.dto';
import { UpdateLocalCarrierDto } from './dto/update-local-carrier.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
@ApiTags('Local Carrier')
@Controller('local-carrier')
export class LocalCarrierController {
  constructor(private readonly localCarrierService: LocalCarrierService) {}
  @ApiOperation({
    description: 'A successful hit can return local carrier object',
    summary: 'Register Local Carrier',
  })
  @ApiResponse({
    status: 201,
    description: ' Successfully created Local Carrier.',
    type: LocalCarrier,
  })
  // @ApiBearerAuth(process.env.X_ACCESS_TOKEN)
  // @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(@Body() body: CreateLocalCarrierDto): Promise<LocalCarrier> {
    return await this.localCarrierService.createLocalCarrier(body);
  }
  @ApiOperation({
    description: 'A successful hit can return local carrier jwt',
    summary: 'Verify Otp',
  })
  @ApiResponse({
    status: 201,
    description: 'Please verify Otp Now.',
    type: LocalCarrier,
  })
  @Post('verify-otp')
  async verifyOtp(@Body() body: VerfyOtpDto): Promise<string> {
    return await this.localCarrierService.verifyOtp(body);
  }

  @ApiOperation({
    description: 'A successful hit can return local carrier object',
    summary: 'Login Local Carrier',
  })
  @ApiResponse({
    status: 201,
    description: 'Please Logged in',
    type: LocalCarrier,
  })
  @Post('login')
  async login(@Body() body: LoginUserDto): Promise<LocalCarrier> {
    return await this.localCarrierService.login(body);
  }

  @ApiOperation({
    description: 'A successful hit can Update Local Carrier',
    summary: 'Update LocalCarrier',
  })
  @ApiResponse({
    status: 201,
    description: 'Update Pickup Carrier',
    type: LocalCarrier,
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateLocalCarrierDto,
  ): Promise<LocalCarrier> {
    return await this.localCarrierService.update(id, body);
  }

  @ApiOperation({
    description: 'A SUCCESSFUL HIT CAN SAVE MULTIPLE FILES ON S3 WITH OTHER DATA',
    summary: 'MULTIPLE FILES S3 UPLOAD',
  })
  @ApiResponse({
    status: 201,
    description: 'MULTIPLE FILES S3 UPLOAD',
    type: LocalCarrier, // Update this type if necessary to match your new response structure
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Multiple files upload with additional data',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        company_name: { type: 'string' },
        doing_business_as_name: { type: 'string' },
        street_address: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        zip_code: { type: 'string' },
        dot_number: { type: 'string' },
        mc_number: { type: 'string' },
        company_license: {
          type: 'string',
          format: 'binary',
        },
        w9_form: {
          type: 'string',
          format: 'binary',
        },
        owner_driver_license: {
          type: 'string',
          format: 'binary',
        },
        owner_phone_number: { type: 'string' },
        arbitrationCounty: { type: 'string' },
        arbitrationState: { type: 'string' },
        owner_email: { type: 'string' },
        owner_office_phone: { type: 'string' },
        trucks_in_operatiion: { type: 'number' },
        years_in_business: { type: 'number' },
        owner_name: { type: 'string' },
        insurances: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              insurance_type: { type: 'string' },
              insurance_amount: { type: 'string' },
            },
          },
        },
        insurance_company: { type: 'string' },
        phone_number: { type: 'string' },
        insurance_document: {
          type: 'string',
          format: 'binary',
        },
        states: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              pickup_service_state: { type: 'string' },
              zip_codes: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    zip_code: { type: 'string' },
                  },
                },
              },
              point_of_contact_name: { type: 'string' },
              point_of_contact_phone_number: { type: 'string' },
            },
          },
        },
        delivery_approximations: {
          type: 'object',
          properties: {
            estimation_0_to_500_miles: { type: 'string' },
            estimation_501_to_1000_miles: { type: 'string' },
            estimation_1001_to_1500_miles: { type: 'string' },
            estimation_1501_to_4000_miles: { type: 'string' },
          },
        },
      },
    },
  })
  @Post('register-with-files')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'company_license', maxCount: 1 },
    { name: 'w9_form', maxCount: 1 },
    { name: 'owner_driver_license', maxCount: 1 },
    { name: 'insurance_document', maxCount: 1 },
  ]))
  async registerWithFiles(
    @UploadedFiles() files: {
      company_license?: any,
      w9_form?: any,
      owner_driver_license?: any,
      insurance_document?: any
    },
    @Body() body: any
  ): Promise<void> {
    // Handle file and text data here
    // For example, you can use files.company_license[0], body.company_name, etc.
    // console.log('body', body);
    // console.log('files', files);
    await this.localCarrierService.uploadFiles(files, body);
  }

  @Post('checkIfExists')
  async checkIfExists(
    @Body() body: any,
  ): Promise<any> {
    return await this.localCarrierService.checkIfAccountExists(body)
  }

  @Post('resendOTP')
  async resendVerificationCode(@Body() body: any):Promise<any>{
    return await this.localCarrierService.resendOTPCode(body)
  }
}
