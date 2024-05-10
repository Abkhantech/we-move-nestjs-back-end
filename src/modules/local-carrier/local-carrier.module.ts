import { Module } from '@nestjs/common';
import { LocalCarrierService } from './local-carrier.service';
import { LocalCarrierController } from './local-carrier.controller';
import { LocalCarrier } from './local-carrier.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { MailerModule } from 'src/utils/mailer/mailer.module';
import { OtpModule } from 'src/utils/otp/otp.module';
import { TwilioModule } from 'src/utils/twilio/twilio.module';
import { InsuranceModule } from '../insurance/insurance.module';
import { DeliveryEstimationModule } from '../delivery-estimation/delivery-estimation.module';
import { Insurance } from '../insurance/insurance.entity';
import { Driver } from '../driver/driver.entity';
import { DeliveryEstimation } from '../delivery-estimation/delivery-estimation.entity';
import { S3Service } from 'src/utils/s3/s3.service';
import { State } from '../state/entities/state.entity';
import { ZipCode } from '../zip-code/zip-code.entity';
import { ZipCodeModule } from '../zip-code/zip-code.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LocalCarrier,
      Insurance,
      State,
      Driver,
      DeliveryEstimation,
      ZipCode
    ]),
    AuthModule,
    TwilioModule,
    InsuranceModule,
    MailerModule,
    OtpModule,
    DeliveryEstimationModule,
    ZipCodeModule,
  ],
  controllers: [LocalCarrierController],
  providers: [LocalCarrierService, S3Service],
})
export class LocalCarrierModule {}
