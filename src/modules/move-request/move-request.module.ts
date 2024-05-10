import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoveRequest } from './move-request.entity';
import { User } from '../user/user.entity';
import { Storage } from './storage/storage.entity';
import { Apartment } from './apartment/apartment.entity';
import { ComboApartmentStorage } from './combo-apartment-storage/combo-apartment-storage.entity';
import { ComboHomeStorage } from './combo-home-storage/combo-home-storage.entity';
import { DeliveryAddress } from './delivery-details/delivery-address/delivery-address.entity';
import { DeliveryDetails } from './delivery-details/delivery-details.entity';
import { Packaging } from './delivery-details/packaging/packaging.entity';
import { MovingItem } from './moving-item/moving-item.entity';
import { MoveRequestController } from './move-request.controller';
import { MoveRequestService } from './move-request.service';
import { PickupCarrierModule } from '../pickup-carrier/pickup-carrier.module';
import { GatewayModule } from '../gateway/gateway.module';
import { RoomDetails } from '../room-details/room-details.entity';
import { StripeService } from 'src/utils/stripe/stripe.service';
import { PaymentResponseService } from '../payment-response/payment-response.service';
import { PaymentResponse } from '../payment-response/payment-response.entity';
import { MailerModule } from 'src/utils/mailer/mailer.module';
import { MailerService } from 'src/utils/mailer/mailer.service';
import { TwilioService } from 'src/utils/twilio/twilio.service';
import { TwilioModule } from 'src/utils/twilio/twilio.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MoveRequest,
      User,
      Storage,
      Apartment,
      ComboApartmentStorage,
      ComboHomeStorage,
      DeliveryAddress,
      DeliveryDetails,
      Packaging,
      MovingItem,
      RoomDetails,
      PaymentResponse,
      MailerModule,
      TwilioModule
    ]),
    PickupCarrierModule,
    GatewayModule
  ],
  controllers: [MoveRequestController],
  providers: [MoveRequestService, StripeService,PaymentResponseService, MailerService, TwilioService],
  exports: [MoveRequestService],
})
export class MoveRequestModule { }
