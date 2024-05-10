import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Driver } from '../driver/driver.entity';
import { Insurance } from '../insurance/insurance.entity';
import { MoveRequest } from '../move-request/move-request.entity';
import { LoadRequest } from '../load-request/load-request.entity';
import { State } from '../state/entities/state.entity';
import { DeliveryEstimation } from '../delivery-estimation/delivery-estimation.entity';
import { CompanyClaim } from '../company-claim/company-claim.entity';

@Entity('pickup-carrier')
export class PickupCarrier extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column({nullable:true})
  company_name: string;

  @IsString()
  @IsNotEmpty()
  @Column({nullable:true})
  doing_business_as_name: string;

  @IsString()
  @IsNotEmpty()
  @Column({default:'pickup-carrier',nullable:true})
  carrier_type: string;

  @IsString()
  @IsNotEmpty()
  @Column({nullable:true})
  street_address: string;

  @IsString()
  @IsOptional()
  @Column({default:null, nullable:true})
  city: string;

  @IsString()
  @IsOptional()
  @Column({default:null, nullable:true})
  state: string;

  @IsString()
  @IsOptional()
  @Column({default:null, nullable:true})
  zip_code: string;

  @IsString()
  @IsOptional()
  @Column({default:null, nullable:true})
  dot_number: string;

  @IsString()
  @IsOptional()
  @Column({default:null, nullable:true})
  mc_number: string;

  @IsOptional()
  @Column({default:null, nullable:true})
  company_license: string; //document upload

  @IsOptional()
  @Column({default:null, nullable:true})
  owner_driver_license: string; //document upload

  @IsString()
  @IsOptional()
  @Column({default:null, nullable:true})
  owner_name: string;

  @IsString()
  @IsOptional()
  @Column({ unique: true , default: null, nullable: true})
  owner_phone_number: string;

  @IsString()
  @IsOptional()
  @Column({default: null, unique:true})
  canonical_id: string

  @IsString()
  @IsOptional()
  @Column({ unique: true , default: null, nullable: true})
  owner_email: string;

  @IsString()
  @IsOptional()
  @Column({ unique: true , default: null, nullable: true})
  owner_office_phone: string;

  // @IsNotEmpty()
  @Column({default:null, nullable: true })
  w9_form: string; //upload document

  @IsOptional()
  @Column({ default: false })
  phone_verified: boolean;

  @IsOptional()
  @Column({ default: false })
  email_verified: boolean;

  @IsString()
  @IsOptional()
  @Column({ default: null })
  otp: string;

  @OneToMany(() => State, (state) => state.pickup_carrier)
  states: State[];

  @IsNumber()
  @IsOptional()
  @Column({default:0})
  trucks_in_operatiion: number;

  @IsString()
  @IsOptional()
  @Column({default:null, nullable:true})
  arbitrationCounty: string

  @IsString()
  @IsOptional()
  @Column({default:null, nullable:true})
  arbitrationState: string

  @IsNumber()
  @IsOptional()
  @Column({default:0, nullable:true})
  years_in_business: number;

  @IsOptional()
  @Column({ default: false })
  activation_status: boolean;

  @OneToMany(() => Driver, (driver) => driver.pickup_carrier)
  drivers: Driver[];

  @OneToMany(() => Insurance, (insurance) => insurance.pickup_carrier)
  insurance: Insurance[];

  @OneToMany(() => MoveRequest, (moveRequest) => moveRequest.pickup_carrier)
  moveRequests: MoveRequest[];

  @OneToMany(() => LoadRequest, (loadRequest) => loadRequest.pickup_carrier)
  loadRequests: LoadRequest[];

  @OneToOne(()=> DeliveryEstimation, delivery_estimation => delivery_estimation.pickupCarrier)
  @JoinColumn()
  delivery_estimation: DeliveryEstimation

  @OneToOne(() => CompanyClaim, company_claim => company_claim.pickupCarrier)
  company_claim: CompanyClaim

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
