import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  BadRequestException,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VerifyPasswordDto } from 'src/utils/otp/dto/verify-password.dto';
import { VerfyOtpDto } from 'src/utils/otp/dto/verify-otp.dto';
import { Admin } from 'typeorm';
import { LoadRequest } from '../load-request/load-request.entity';
import { LoadRequestService } from '../load-request/load-request.service';
import { UpdateLoadRequestDto } from '../load-request/dto/update-load-request.dto';
import { MoveRequestDto } from '../move-request/dto/create-move-request.dto';
import { MoveRequest } from '../move-request/move-request.entity';
import { MoveRequestService } from '../move-request/move-request.service';
import { JwtAuthGuard } from '../auth/auth-guards/jwt-auth.guard';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private loadRequestService: LoadRequestService,
    private moveRequestService: MoveRequestService,
  ) {}
  @ApiOperation({
    description: 'A successful hit can return Admin object',
    summary: 'Register Admin',
  })
  @ApiResponse({
    status: 201,
    description: ' Successfully created Admin.',
    type: Admin,
  })
  @Post('register')
  register(@Body() body: CreateAdminDto) {
    return this.adminService.register(body);
  }
  @ApiOperation({
    description: 'A successful hit can return Jwt token',
    summary: 'Login Admin',
  })
  @ApiResponse({ status: 200, description: 'Login successfuly' })
  @Post('login')
  login(@Body() body: VerifyPasswordDto) {
    return this.adminService.login(body);
  }
  @ApiOperation({
    description: 'A successful hit can return Admin jwt',
    summary: 'Verify Otp',
  })
  @ApiResponse({
    status: 201,
    description: 'Please verify Otp Now.',
    type: Admin,
  })
  @Post('verify-otp')
  verifyOtp(@Body() body: VerfyOtpDto) {
    return this.adminService.verifyOtp(body);
  }

  @ApiOperation({
    description: 'A successful hit can return LoadRequest against id',
    summary: 'Update LoadRequest Against Id',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully update load request against id.',
    type: LoadRequest,
  })
  @Patch('update_loadRequest/:id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateLoadRequestDto,
  ): Promise<LoadRequest> {
    try {
      return this.loadRequestService.update(+id, body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'A successful hit can return Move Request',
    summary: 'Update Move Request',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully update Move Request.',
    type: LoadRequest,
  })
  @Patch('updateMoveRequest')
  async updateMove(
    @Body() moveRequestDto: MoveRequestDto,
  ): Promise<MoveRequest> {
    return await this.moveRequestService.updateMoveRequest(moveRequestDto);
  }

  @Get('delivery_carriers')
  async getAllDeliveryCarriers(): Promise<any> {
    return await this.adminService.findAllDeliveryCarriers();
  }

  @Get('pickup_carriers')
  async getAllPickupCarriers(): Promise<any> {
    return await this.adminService.findAllPickupCarriers();
  }

  @Get('local_carriers')
  async getAllLocalCarriers(): Promise<any> {
    return await this.adminService.findAllLocalCarriers();
  }

  // @ApiBearerAuth(process.env.X_ACCESS_TOKEN)
  // @UseGuards(JwtAuthGuard)
  @Get('display-move-requests-for-admin')
  async getAllMoveRequestsForAdmin(
    @Query('offset') offset: number = 0,
    @Query('limit') limit: number = 10,
  ): Promise<any> {
    return await this.moveRequestService.findAllMoveRequestsForAdmin(offset, limit);
  }
}
