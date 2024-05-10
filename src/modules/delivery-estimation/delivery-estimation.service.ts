import {
  HttpException,
    HttpStatus,
    Injectable,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
import { DeliveryEstimation } from './delivery-estimation.entity';
import { PickupCarrier } from '../pickup-carrier/pickup-carrier.entity';
import { DeliveryCarrier } from '../delivery-carrier/delivery-carrier.entity';
  
  @Injectable()
  export class DeliveryEstimationService {
    constructor(
      @InjectRepository(DeliveryEstimation) private deliveryEstimationRepository: Repository<DeliveryEstimation>,


    ) {}
 
  }
  