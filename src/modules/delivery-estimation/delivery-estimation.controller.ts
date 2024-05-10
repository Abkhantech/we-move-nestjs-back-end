import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeliveryEstimationService } from './delivery-estimation.service';

@ApiTags('Delivery-Estimation')
@Controller('delivery-estimation')
export class DeliveryEstimationController {
  constructor(private deliveryEstimationService: DeliveryEstimationService) {}

  
}
