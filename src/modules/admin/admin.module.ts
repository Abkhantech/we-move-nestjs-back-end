import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpModule } from 'src/utils/otp/otp.module';
import { MailerModule } from 'src/utils/mailer/mailer.module';
import { AuthModule } from '../auth/auth.module';
import { LoadRequestModule } from '../load-request/load-request.module';
import { MoveRequestModule } from '../move-request/move-request.module';
import { DeliveryCarrier } from '../delivery-carrier/delivery-carrier.entity';
import { PickupCarrier } from '../pickup-carrier/pickup-carrier.entity';
import { LocalCarrier } from '../local-carrier/local-carrier.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin,DeliveryCarrier,PickupCarrier,LocalCarrier]),
    OtpModule,
    MailerModule,
    AuthModule,
    LoadRequestModule,
    MoveRequestModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
