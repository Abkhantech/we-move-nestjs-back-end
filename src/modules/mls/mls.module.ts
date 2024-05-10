import { Module } from '@nestjs/common';
import { MLSController } from './mls.constroller';
import { MLSService } from './mls.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MLS } from './mls.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MLS])],
  controllers: [MLSController],
  providers: [MLSService],
  exports: [MLSService],
})
export class MLSModule {}
