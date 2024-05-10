import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { TwilioModule } from '../twilio/twilio.module';

@Module({
  imports:[TwilioModule],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
