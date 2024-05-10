import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Storage } from './storage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Storage,
    ]),
  ],
  controllers: [],
  providers: [],
  exports:[]
})
export class StorageModule {}
