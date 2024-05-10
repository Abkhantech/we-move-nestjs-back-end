import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { PickupCarrier } from '../pickup-carrier/pickup-carrier.entity';
import { DeliveryCarrier } from '../delivery-carrier/delivery-carrier.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Driver, PickupCarrier, DeliveryCarrier
    ]),
  ],
  controllers: [DriverController],
  providers: [DriverService],
  exports:[DriverService]
})
export class DriverModule {}
