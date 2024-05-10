import { IsNotEmpty, IsString } from "class-validator";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PickupCarrier } from "../pickup-carrier/pickup-carrier.entity";
import { LocalCarrier } from "../local-carrier/local-carrier.entity";

@Entity('company-claim')
export class CompanyClaim extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  chat_support_url: string

  @Column()
  @IsString()
  @IsNotEmpty()
  post_claim_customer_support_representative: string

  @Column()
  @IsString()
  @IsNotEmpty()
  phone_support: string

  @Column()
  @IsString()
  @IsNotEmpty()
  website: string

  @OneToOne(() => PickupCarrier, pickupCarrier => pickupCarrier.company_claim)
  @JoinColumn()
  pickupCarrier: PickupCarrier;

  @OneToOne(() => LocalCarrier, local_carrier => local_carrier.company_claim)
  @JoinColumn()
  local_carrier: LocalCarrier;

}