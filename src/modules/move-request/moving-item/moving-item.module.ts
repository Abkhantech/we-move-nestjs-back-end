import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovingItem } from './moving-item.entity';
import { MoveRequestController } from '../move-request.controller';
import { MoveRequestService } from '../move-request.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MovingItem,
    ]),
  ],
  controllers: [MoveRequestController],
  providers: [MoveRequestService],
  exports:[MoveRequestService]
})
export class MovingItemModule {}
