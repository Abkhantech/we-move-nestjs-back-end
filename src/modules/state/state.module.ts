import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { State } from './entities/state.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  providers: [StateService],
  exports: [StateService],
})
export class StateModule {}
