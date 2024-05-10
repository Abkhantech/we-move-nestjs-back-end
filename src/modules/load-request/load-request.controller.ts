import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoadRequestService } from './load-request.service';
import { LoadRequest } from './load-request.entity';
import { CreateLoadRequestDto } from './dto/create-load-request.dto';
import { UpdateLoadRequestDto } from './dto/update-load-request.dto';
import { DeliveryCarrier } from '../delivery-carrier/delivery-carrier.entity';

@ApiTags('Load Request')
@Controller('load-request')
export class LoadRequestController {
  constructor(private loadRequestService: LoadRequestService) {}
  @ApiOperation({
    description: 'A successful hit can return LoadRequest object',
    summary: 'Create LoadRequest',
  })
  @ApiResponse({
    status: 201,
    description: ' Successfully created LoadRequest.',
    type: LoadRequest,
  })
  @Post()
  async createLoadRequest(
    @Body() body: CreateLoadRequestDto,
  ): Promise<LoadRequest> {
    return await this.loadRequestService.createLoadRequest(body);
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
  @Patch(':id')
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
    description: 'A successful hit can Assign Delivery Carrier',
    summary: 'Assign Delivery Carrier to LoadRequest',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully update load request.',
    type: LoadRequest,
  })
  @Patch(':loadRequestId/:deliveryCarrierId')
  async assignDeliveryCarrier(
    @Param('loadRequestId') loadRequestId: number,
    @Param('deliveryCarrierId') deliveryCarrierId: number,
  ): Promise<LoadRequest> {
    try {
      return this.loadRequestService.assignDeliveryCarrier(
        loadRequestId,
        deliveryCarrierId,
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'A successful hit can get Delivery Carriers',
    summary: 'Get LoadRequests to Delivery Carriers',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully get LoadRequests.',
    type: LoadRequest,
  })
  @Get('getLoadrequestAgainstDc/:deliveryCarrierId/:date')
  async getDeliveryCarrierAssignedToLoadRequest(
    @Param('deliveryCarrierId') deliveryCarrierId: number,
    @Param('date') date: any,
  ): Promise<LoadRequest[]> {
    try {
      return this.loadRequestService.getDeliveryCarrier(deliveryCarrierId,date);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  
}
