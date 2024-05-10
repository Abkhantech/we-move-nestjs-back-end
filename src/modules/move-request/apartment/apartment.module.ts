import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from './apartment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Apartment,
    ]),
  ],
  controllers: [],
  providers: [],
  exports:[]
})
export class ApartmentModule {}
