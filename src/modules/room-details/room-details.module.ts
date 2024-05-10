import { Module } from '@nestjs/common';
import { RoomDetailsController } from './room-details.constroller';
import { RoomDetailsService } from './room-details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomDetails } from './room-details.entity';
import { MoveRequest } from '../move-request/move-request.entity';
import { MovingItem } from '../move-request/moving-item/moving-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomDetails,MoveRequest,MovingItem])],
  controllers: [RoomDetailsController],
  providers: [RoomDetailsService],
  exports: [RoomDetailsService],
})
export class RoomDetailsModule {}
