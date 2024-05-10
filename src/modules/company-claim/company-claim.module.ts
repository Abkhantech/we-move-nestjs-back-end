import { Module } from '@nestjs/common';
import { CompanyClaimService } from './company-claim.service';
import { CompanyClaimController } from './company-claim.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickupCarrierModule } from '../pickup-carrier/pickup-carrier.module';
import { PickupCarrier } from '../pickup-carrier/pickup-carrier.entity';
import { CompanyClaim } from './company-claim.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PickupCarrier, CompanyClaim]),
    PickupCarrierModule
  ],
  controllers: [CompanyClaimController],
  providers: [CompanyClaimService]
})
export class CompanyClaimModule {}
