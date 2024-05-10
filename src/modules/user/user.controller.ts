import { BadRequestException, Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './user.entity';
import { LoginUserDto } from '../../utils/otp/dto/login-user.dto';
import { VerfyOtpDto } from '../../utils/otp/dto/verify-otp.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindDistanceDto } from './dto/find-distance.dto';
import { JwtAuthGuard } from '../auth/auth-guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    description: 'A successful hit can return user object',
    summary: 'Register User',
  })
  @ApiResponse({
    status: 201,
    description: ' Successfully created user.',
    type: User,
  })
  @Post('/register')
  async create(@Body() body: RegisterUserDto): Promise<User> {
    try {
      return this.userService.create(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  @ApiOperation({
    description: 'A successful hit can return user object',
    summary: 'Login User',
  })
  @ApiResponse({
    status: 201,
    description: 'Please Logged in',
    type: User,
  })
  @Post('/login')
  async login(@Body() body: LoginUserDto): Promise<User> {
    try {
      return this.userService.login(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  @ApiOperation({
    description: 'A successful hit can return user jwt',
    summary: 'Verify Otp',
  })
  @ApiResponse({
    status: 201,
    description: 'Please verify Otp Now.',
    type: User,
  })
  @Post('/verifyOtp')
  async verifyOtp(@Body() body: VerfyOtpDto): Promise<string> {
    try {
      return this.userService.verifyOtp(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'A successful hit can Update User',
    summary: 'Update User',
  })
  @ApiResponse({
    status: 201,
    description: 'Update Pickup Carrier',
    type: User,
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(id, body);
  }

  @ApiOperation({
    description: 'A successful hit can return user object',
    summary: 'Get User',
  })
  @ApiResponse({
    status: 201,
    description: ' Successfully fetched user.',
    type: User,
  })
  @ApiBearerAuth(process.env.X_ACCESS_TOKEN)
  @UseGuards(JwtAuthGuard)
  @Get('/getUser/:consumerId')
  async getConsumerById(@Param('consumerId') consumerId: number): Promise<User> {
    try {
      return this.userService.fetchConsumerById(consumerId);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('Distance')
  async getTheDistance(@Body() body:FindDistanceDto): Promise<any> {
    try {
      return this.userService.getDistance(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('test-Distance')
  async fetchTestDistance(@Body() body:FindDistanceDto): Promise<any> {
    try {
      return this.userService.getTestDistance(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

}
