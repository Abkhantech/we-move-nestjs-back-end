import { Controller, Post, Body, Patch, Param, Get, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { DeliveryCarrierService } from './delivery-carrier.service';
import { CreateDeliveryCarrierDto } from './dto/create-delivery-carrier.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from 'src/utils/otp/dto/login-user.dto';
import { VerfyOtpDto } from 'src/utils/otp/dto/verify-otp.dto';
import { DeliveryCarrier } from './delivery-carrier.entity';
import { UpdateDeliveryCarrierDto } from './dto/update-delivery-carrier.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('Delivery Carrier')
@Controller('delivery-carrier')
export class DeliveryCarrierController {
  constructor(
    private readonly deliveryCarrierService: DeliveryCarrierService,
  ) {}

  @ApiOperation({
    description: 'A successful hit can return Delivery Carrier object',
    summary: 'Register Delivery Carrier',
  })
  @ApiResponse({
    status: 201,
    description: ' Successfully created Delivery Carrier.',
    type: DeliveryCarrier,
  })
  // @ApiBearerAuth(process.env.X_ACCESS_TOKEN)
  // @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(
    @Body() body: CreateDeliveryCarrierDto,
  ): Promise<DeliveryCarrier> {
    return await this.deliveryCarrierService.createDeliveryCarrier(body);
  }
  @ApiOperation({
    description: 'A successful hit can return Delivery Carrier jwt',
    summary: 'Verify Otp',
  })
  @ApiResponse({
    status: 201,
    description: 'Please verify Otp Now.',
    type: DeliveryCarrier,
  })
  @Post('verify-otp')
  async verifyOtp(@Body() body: VerfyOtpDto): Promise<string> {
    return await this.deliveryCarrierService.verifyOtp(body);
  }

  @ApiOperation({
    description: 'A successful hit can return Delivery Carrier object',
    summary: 'Login Delivery Carrier',
  })
  @ApiResponse({
    status: 201,
    description: 'Please Logged in',
    type: DeliveryCarrier,
  })
  @Post('login')
  async login(@Body() body: LoginUserDto): Promise<DeliveryCarrier> {
    return await this.deliveryCarrierService.login(body);
  }

  @ApiOperation({
    description: 'A successful hit can Update Delivery Carrier',
    summary: 'Update Delivery Carrier',
  })
  @ApiResponse({
    status: 201,
    description: 'Update Delivery Carrier',
    type: DeliveryCarrier,
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateDeliveryCarrierDto,
  ): Promise<DeliveryCarrier> {
    return await this.deliveryCarrierService.update(id, body);
  }
  @ApiOperation({
    description: 'A successful hit can Update Delivery Carrier',
    summary: 'Update Delivery Carrier',
  })
  @ApiResponse({
    status: 201,
    description: 'Update Delivery Carrier',
    type: DeliveryCarrier,
  })
  @Get(':id')
  async getDeliveryCarrierWithId(
    @Param('id') id: string,
  ): Promise<DeliveryCarrier> {
    return await this.deliveryCarrierService.findDeliveryCarrierWithRelations(id);
  }

  // FILES WITH DATA
  @ApiOperation({
    description: 'A SUCCESSFUL HIT CAN SAVE MULTIPLE FILES ON S3 WITH OTHER DATA',
    summary: 'MULTIPLE FILES S3 UPLOAD',
  })
  @ApiResponse({
    status: 201,
    description: 'MULTIPLE FILES S3 UPLOAD',
    type: DeliveryCarrier, // Update this type if necessary to match your new response structure
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
        company_phone_number: { type: 'string' },
        street_address: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        zip_code: { type: 'string' },
        dot_number: { type: 'string' },
        mc_number: { type: 'string' },
        hhg_license: { type: 'boolean' },
        both: { type: 'boolean' },
        // company_license: {
        //   type: 'string',
        //   format: 'binary',
        // },
        owner_driver_license: {
          type: 'string',
          format: 'binary',
        },
        owner_name: { type: 'string' },
        owner_phone_number: { type: 'string' },
        primary_contact: { type: 'string' },
        company_email: { type: 'string' },
        count_of_53_foot_trailers: { type: 'number' },
        count_of_drivers: { type: 'number' },
        insurances: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              insurance_type: { type: 'string' },
              phone_number: { type: 'string' },
            },
          },
        },
        insurance_document: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('register-with-files')
  @UseInterceptors(FileFieldsInterceptor([
    // { name: 'company_license', maxCount: 1 },
    { name: 'owner_driver_license', maxCount: 1 },
    { name: 'insurance_document', maxCount: 1 },
  ]))
  async registerWithFiles(
    @UploadedFiles() files: {
      // company_license?: any,
      owner_driver_license?: any,
      insurance_document?: any
    },
    @Body() body: any
  ): Promise<void> {
    console.log(body)
    // Handle file and text data here
    // For example, you can use files.company_license[0], body.company_name, etc.
    // console.log('body', body);
    // console.log('files', files);
    await this.deliveryCarrierService.uploadFiles(files, body);

  }

  @Post('checkIfExists')
  async checkIfExists(
    @Body() body: any,
  ): Promise<any> {
    return await this.deliveryCarrierService.checkIfAccountExists(body)
  }

  @Post('resendOTP')
  async resendVerificationCode(@Body() body: any):Promise<any>{
    return await this.deliveryCarrierService.resendOTPCode(body)
  }
}
