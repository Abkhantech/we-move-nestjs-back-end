import { Module } from '@nestjs/common';
import { SkipTraceService } from './skip-trace.service';
import { SkipTraceController } from './skip-trace.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkipTrace } from './skip-trace.entity';
import { MLS } from '../mls/mls.entity';
import { MLSService } from '../mls/mls.service';

@Module({
  imports: [TypeOrmModule.forFeature([SkipTrace,MLS])],
  controllers: [SkipTraceController],
  providers: [SkipTraceService, MLSService],
})
export class SkipTraceModule {}
