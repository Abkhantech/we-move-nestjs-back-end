import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoveRequest } from '../move-request/move-request.entity';
import { MoveRequestService } from '../move-request/move-request.service';
import { GatewayService } from './gateway.service';


@Module({

  providers: [GatewayService],
  exports:[GatewayService]
})
export class GatewayModule {}
