import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CompanyClaim } from 'src/modules/company-claim/company-claim.entity';
import { DeliveryEstimation } from 'src/modules/delivery-estimation/delivery-estimation.entity';
import { Driver } from 'src/modules/driver/driver.entity';
import { Insurance } from 'src/modules/insurance/insurance.entity';
import { MoveRequest } from 'src/modules/move-request/move-request.entity';
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
// import { StateZipCode } from '../zip-code/zip-code.entity';
import { State } from '../state/entities/state.entity';

@Entity('local-carrier')
export class LocalCarrier extends BaseEntity {
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
  @Column({default:'local-carrier',nullable:true})
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

  @OneToMany(() => State, (state) => state.local_carrier)
  states: State[];

  @IsString()
  @IsOptional()
  @Column({ unique: true , default: null, nullable: true})
  owner_phone_number: string;

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

  @IsString()
  @IsOptional()
  @Column({nullable: true, unique:true})
  canonical_id: string

  @IsNumber()
  @IsOptional()
  @Column({default:0, nullable:true})
  years_in_business: number;

  @IsOptional()
  @Column({ default: false })
  activation_status: boolean;

  // @OneToMany(() => StateZipCode, (state_zip_code) => state_zip_code.local_carrier)
  // state_zip_codes: StateZipCode[];

  @OneToMany(() => Driver, (driver) => driver.local_carrier)
  drivers: Driver[];

  @OneToMany(() => Insurance, (insurance) => insurance.local_carrier)
  insurance: Insurance[];

  @OneToMany(() => MoveRequest, (moveRequest) => moveRequest.local_carrier)
  moveRequests: MoveRequest[];


  @OneToOne(()=> DeliveryEstimation, delivery_estimation => delivery_estimation.local_carrier)
  @JoinColumn()
  delivery_estimation: DeliveryEstimation

  @OneToOne(() => CompanyClaim, company_claim => company_claim.local_carrier)
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
