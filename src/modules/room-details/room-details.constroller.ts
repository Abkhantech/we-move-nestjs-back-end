import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoomDetailsService } from './room-details.service';
import { CreateRoomDetailsDto } from './dto/create-room-details.dto';
import { JwtAuthGuard } from '../auth/auth-guards/jwt-auth.guard';

@ApiTags('Room-Details')
@Controller('room-details')
export class RoomDetailsController {
  constructor(private roomDetailsService: RoomDetailsService) {}

  @ApiBearerAuth(process.env.X_ACCESS_TOKEN)
  @UseGuards(JwtAuthGuard)
  @Post('create-room-details')
  async createMove(
    @Body() body: CreateRoomDetailsDto,
  ): Promise<any> {
    console.log(body)
    return await this.roomDetailsService.saveRoomVideoToS3(body)
  }

  @ApiBearerAuth(process.env.X_ACCESS_TOKEN)
  @UseGuards(JwtAuthGuard)
  @Patch('update-room-details')
  async update(
    @Body() body: CreateRoomDetailsDto,
  ): Promise<any> {
    return await this.roomDetailsService.updateRoomDetails(body);
  }

  @ApiBearerAuth(process.env.X_ACCESS_TOKEN)
  @UseGuards(JwtAuthGuard)
  @Get('calculate-total-cubic-feet/:moveRequestId')
  async calculateInventoryVolume(
    @Param('moveRequestId') moveRequestId: string,
  ): Promise<any> {
    return await this.roomDetailsService.calculateTotalCubicFeet(moveRequestId);
  }
}
