import { Module } from '@nestjs/common';
import { DeliveryCarrierService } from './delivery-carrier.service';
import { DeliveryCarrierController } from './delivery-carrier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryCarrier } from './delivery-carrier.entity';
import { OtpModule } from 'src/utils/otp/otp.module';
import { AuthModule } from '../auth/auth.module';
import { MailerModule } from 'src/utils/mailer/mailer.module';
import { Insurance } from '../insurance/insurance.entity';
import { Driver } from '../driver/driver.entity';
import { S3Service } from 'src/utils/s3/s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryCarrier,Insurance,Driver]),OtpModule,AuthModule,MailerModule],
  controllers: [DeliveryCarrierController],
  providers: [DeliveryCarrierService,S3Service],
})
export class DeliveryCarrierModule {}
