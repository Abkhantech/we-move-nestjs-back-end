import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { dataSourceOptions } from '../db/data-source';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Logger } from './utils/logger/logger';
import { DeliveryCarrierModule } from './modules/delivery-carrier/delivery-carrier.module';
import { DriverModule } from './modules/driver/driver.module';
import { PickupCarrierModule } from './modules/pickup-carrier/pickup-carrier.module';
import { InsuranceModule } from './modules/insurance/insurance.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { TwilioModule } from './utils/twilio/twilio.module';
import { MailerModule } from './utils/mailer/mailer.module';
import { StateModule } from './modules/state/state.module';
import { OtpModule } from './utils/otp/otp.module';
import { LoadRequestModule } from './modules/load-request/load-request.module';
import { MoveRequestModule } from './modules/move-request/move-request.module';
import { CompanyClaimModule } from './modules/company-claim/company-claim.module';
import { LocalCarrierModule } from './modules/local-carrier/local-carrier.module';
import { ZipCodeModule } from './modules/zip-code/zip-code.module';
import { MLSModule } from './modules/mls/mls.module';
import { GatewayModule } from './modules/gateway/gateway.module';
import { SkipTraceModule } from './modules/skip-trace/skip-trace.module';
import { RoomDetailsModule } from './modules/room-details/room-details.module';
import { PaymentResponseModule } from './modules/payment-response/payment-response.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    DeliveryCarrierModule,
    DriverModule,
    PickupCarrierModule,
    InsuranceModule,
    AdminModule,
    AuthModule,
    TwilioModule,
    UserModule,
    MailerModule,
    StateModule,
    OtpModule,
    LoadRequestModule,
    MoveRequestModule,
    CompanyClaimModule,
    LocalCarrierModule,
    ZipCodeModule,
    MLSModule,
    GatewayModule,
    SkipTraceModule,
    RoomDetailsModule,
    PaymentResponseModule
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: Logger }],
})
export class AppModule {}
