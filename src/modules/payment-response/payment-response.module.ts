import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentResponseController } from './payment-response.controller';
import { PaymentResponse } from './payment-response.entity';
import { PaymentResponseService } from './payment-response.service';
import { AuthModule } from '../auth/auth.module';
import { TwilioModule } from 'src/utils/twilio/twilio.module';
import { MailerModule } from 'src/utils/mailer/mailer.module';
import { OtpModule } from 'src/utils/otp/otp.module';
import { Address } from '../address/address.entity';
import { MoveRequest } from '../move-request/move-request.entity';
import { MailerService } from 'src/utils/mailer/mailer.service';
import { GatewayModule } from '../gateway/gateway.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentResponse,
      MoveRequest,
    ]),
    GatewayModule
  ],
  controllers: [PaymentResponseController],
  providers: [PaymentResponseService,MailerService],
  exports: [PaymentResponseService],
})
export class PaymentResponseModule {}
