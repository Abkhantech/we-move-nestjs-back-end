import { Injectable } from '@nestjs/common';
import { CreateClaimDto } from './dto/create-company-claim.dto';
import { UpdateClaimDto } from './dto/update-company-claim.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PickupCarrier } from '../pickup-carrier/pickup-carrier.entity';
import { Repository } from 'typeorm';
import { CompanyClaim } from './company-claim.entity';


@Injectable()
export class CompanyClaimService {
  constructor(
    @InjectRepository(PickupCarrier)
    private pickupCarrierRepository: Repository<PickupCarrier>,
    @InjectRepository(CompanyClaim)
    private companyClaimRepository: Repository<CompanyClaim>,
  ) {}

  async create(pickupCarrierId: number, createCompanyClaimDto: CreateClaimDto):Promise<any> {
    const pickupCarrier = await this.pickupCarrierRepository.findOne({
      where:{
        id: pickupCarrierId
      },
      relations:['company_claim']
    })
    if(pickupCarrier){
      const companyClaim = await this.companyClaimRepository.save(
        this.companyClaimRepository.create({
          chat_support_url:createCompanyClaimDto.chat_support_url,
          post_claim_customer_support_representative:createCompanyClaimDto.post_claim_customer_support_representative,
          phone_support:createCompanyClaimDto.phone_support,
          website:createCompanyClaimDto.website,
          pickupCarrier:pickupCarrier
        })
      )
      return pickupCarrier;
    }
  }

  findAll() {
    return `This action returns all companyClaim`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyClaim`;
  }

  update(id: number, updateCompanyClaimDto: UpdateClaimDto) {
    return `This action updates a #${id} companyClaim`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyClaim`;
  }
}
