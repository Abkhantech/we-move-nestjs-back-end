import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoadRequest } from './load-request.entity';
import { LoadRequestService } from './load-request.service';
import { LoadRequestController } from './load-request.controller';
import { PickupCarrier } from '../pickup-carrier/pickup-carrier.entity';
import { DeliveryCarrier } from '../delivery-carrier/delivery-carrier.entity';
import { MoveRequest } from '../move-request/move-request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LoadRequest,PickupCarrier,DeliveryCarrier,MoveRequest
    ]),
  ],
  controllers: [LoadRequestController],
  providers: [LoadRequestService],
  exports:[LoadRequestService]
})
export class LoadRequestModule {}
