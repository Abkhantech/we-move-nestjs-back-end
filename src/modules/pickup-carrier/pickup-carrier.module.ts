import { Module } from '@nestjs/common';
import { PickupCarrierService } from './pickup-carrier.service';
import { PickupCarrierController } from './pickup-carrier.controller';
import { PickupCarrier } from './pickup-carrier.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TwilioModule } from 'src/utils/twilio/twilio.module';
import { Insurance } from '../insurance/insurance.entity';
import { InsuranceService } from '../insurance/insurance.service';
import { InsuranceModule } from '../insurance/insurance.module';
import { State } from '../state/entities/state.entity';
import { MailerModule } from 'src/utils/mailer/mailer.module';
import { OtpModule } from 'src/utils/otp/otp.module';
import { Driver } from '../driver/driver.entity';
import { DeliveryEstimationModule } from '../delivery-estimation/delivery-estimation.module';
import { DeliveryEstimation } from '../delivery-estimation/delivery-estimation.entity';
import { DeliveryCarrier } from '../delivery-carrier/delivery-carrier.entity';
import { DeliveryCarrierModule } from '../delivery-carrier/delivery-carrier.module';
import { S3Service } from 'src/utils/s3/s3.service';
import { MoveRequest } from '../move-request/move-request.entity';
import { MoveRequestModule } from '../move-request/move-request.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PickupCarrier,
      Insurance,
      State,
      Driver,
      DeliveryEstimation,
      DeliveryCarrier,
      MoveRequest,
    ]),
    AuthModule,
    TwilioModule,
    InsuranceModule,
    MailerModule,
    OtpModule,
    DeliveryEstimationModule,
    DeliveryCarrierModule,
  ],
  exports: [PickupCarrierService],
  controllers: [PickupCarrierController],
  providers: [PickupCarrierService, InsuranceService, S3Service],
})
export class PickupCarrierModule {}
