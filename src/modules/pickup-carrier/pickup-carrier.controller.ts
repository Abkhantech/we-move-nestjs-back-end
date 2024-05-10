import { Controller, Post, Body, Patch, Param, UseInterceptors, UploadedFile, UploadedFiles, Get, UseGuards } from '@nestjs/common';
import { PickupCarrierService } from './pickup-carrier.service';
import { CreatePickupCarrierDto } from './dto/create-pickup-carrier.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PickupCarrier } from './pickup-carrier.entity';
import { VerfyOtpDto } from '../../utils/otp/dto/verify-otp.dto';
import { LoginUserDto } from '../../utils/otp/dto/login-user.dto';
import { UpdatePickupCarrierDto } from './dto/update-pickup-carrier.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { MoveRequest } from '../move-request/move-request.entity';
import { JwtAuthGuard } from '../auth/auth-guards/jwt-auth.guard';


@ApiTags('Pickup Carrier')
@Controller('pickup-carrier')
export class PickupCarrierController {
  constructor(private readonly pickupCarrierService: PickupCarrierService) { }

  @ApiOperation({
    description: 'A successful hit can return pickupCarrier object',
    summary: 'Register PickupCarrier',
  })
  @ApiResponse({
    status: 201,
    description: ' Successfully created PickupCarrier.',
    type: PickupCarrier,
  })
  // @ApiBearerAuth(process.env.X_ACCESS_TOKEN)
  // @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(
    @Body() createPickupCarrierDto: CreatePickupCarrierDto,
  ): Promise<PickupCarrier> {
    return await this.pickupCarrierService.createPickupCarrier(
      createPickupCarrierDto,
    );
  }

  @ApiOperation({
    description: 'A successful hit can return pickupCarrier jwt',
    summary: 'Verify Otp',
  })
  @ApiResponse({
    status: 201,
    description: 'Please verify Otp Now.',
    type: PickupCarrier,
  })
  @Post('verify-otp')
  async verifyOtp(@Body() body: VerfyOtpDto): Promise<string> {
    return await this.pickupCarrierService.verifyOtp(body);
  }

  @ApiOperation({
    description: 'A successful hit can return pickupCarrier object',
    summary: 'Login pickupCarrier',
  })
  @ApiResponse({
    status: 201,
    description: 'Please Logged in',
    type: PickupCarrier,
  })
  @Post('login')
  async login(@Body() body: LoginUserDto): Promise<PickupCarrier> {
    return await this.pickupCarrierService.login(body);
  }

  @ApiOperation({
    description: 'A successful hit can Update pickupCarrier',
    summary: 'Update pickupCarrier',
  })
  @ApiResponse({
    status: 201,
    description: 'Update Pickup Carrier',
    type: PickupCarrier,
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdatePickupCarrierDto,
  ): Promise<PickupCarrier> {
    return await this.pickupCarrierService.update(id, body);
  }

  // FILES WITH DATA
  @ApiOperation({
    description: 'A SUCCESSFUL HIT CAN SAVE MULTIPLE FILES ON S3 WITH OTHER DATA',
    summary: 'MULTIPLE FILES S3 UPLOAD',
  })
  @ApiResponse({
    status: 201,
    description: 'MULTIPLE FILES S3 UPLOAD',
    type: PickupCarrier, // Update this type if necessary to match your new response structure
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
    await this.pickupCarrierService.uploadFiles(files, body);
  }

  @Post('checkIfExists')
  async checkIfExists(
    @Body() body: any,
  ): Promise<any> {
    return await this.pickupCarrierService.checkIfAccountExists(body)
  }

  @Post('resendOTP')
  async resendVerificationCode(@Body() body: any):Promise<any>{
    return await this.pickupCarrierService.resendOTPCode(body)
  }

  @ApiOperation({
    description: 'A successful hit can return move requests assigned to pickupCarrier ',
    summary: 'Get Move Requests Assigned To Pickup Carrier',
  })
  @ApiResponse({
    status: 201,
    description: ' Successfully fetch Move Requests.',
    type: MoveRequest,
  })
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @Get('/moveRequests/:id')
  async getMoveRequests(
    @Param('id') id: string,
  ): Promise<MoveRequest[]> {
    return await this.pickupCarrierService.getAllMoveRequests(id);
  }

}
