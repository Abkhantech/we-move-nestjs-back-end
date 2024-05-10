import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryAddress } from './delivery-address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DeliveryAddress,
    ]),
  ],
  controllers: [],
  providers: [],
  exports:[]
})
export class DeliveryAddressModule {}
