import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { TwilioModule } from 'src/utils/twilio/twilio.module';
import { MailerModule } from 'src/utils/mailer/mailer.module';
import { OtpModule } from 'src/utils/otp/otp.module';
import { Address } from '../address/address.entity';
import { MoveRequest } from '../move-request/move-request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,Address, MoveRequest
    ]),
    AuthModule,
    TwilioModule,
    MailerModule,
    OtpModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
