import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComboHomeStorage } from './combo-home-storage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ComboHomeStorage,
    ]),
  ],
  controllers: [],
  providers: [],
  exports:[]
})
export class ComboHomeStorageModule {}
