import { Module } from '@nestjs/common';
import { ZipCode } from './zip-code.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([ZipCode])],
})
export class ZipCodeModule {}
