import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComboApartmentStorage } from './combo-apartment-storage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ComboApartmentStorage,
    ]),
  ],
  controllers: [],
  providers: [],
  exports:[]
})
export class ComboApartmentStoragetModule {}
