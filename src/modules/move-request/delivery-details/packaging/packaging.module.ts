import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Packaging } from './packaging.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Packaging,
    ]),
  ],
  controllers: [],
  providers: [],
  exports:[]
})
export class PackagingModule {}
