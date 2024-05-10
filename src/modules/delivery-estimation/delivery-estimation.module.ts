import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryEstimation } from './delivery-estimation.entity';
import { DeliveryEstimationController } from './delivery-estimation.controller';
import { DeliveryEstimationService } from './delivery-estimation.service';
import { PickupCarrier } from '../pickup-carrier/pickup-carrier.entity';
import { DeliveryCarrier } from '../delivery-carrier/delivery-carrier.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DeliveryEstimation
    ]),
  ],
  controllers: [DeliveryEstimationController],
  providers: [DeliveryEstimationService],
  exports:[DeliveryEstimationService]
})
export class DeliveryEstimationModule {}
