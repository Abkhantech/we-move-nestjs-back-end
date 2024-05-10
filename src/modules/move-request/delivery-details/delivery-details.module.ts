import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryDetails } from './delivery-details.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DeliveryDetails,
    ]),
  ],
  controllers: [],
  providers: [],
  exports:[]
})
export class DeliveryDetailsModule {}
