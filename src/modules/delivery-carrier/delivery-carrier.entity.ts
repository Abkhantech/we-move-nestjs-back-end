import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Driver } from '../driver/driver.entity';
import { MoveRequest } from '../move-request/move-request.entity';
import { LoadRequest } from '../load-request/load-request.entity';
import { Insurance } from '../insurance/insurance.entity';
@Entity('delivery-carrier')
export class DeliveryCarrier extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  company_name: string;

  @IsString()
  @IsNotEmpty()
  @Column({nullable:true})
  doing_business_as_name: string;

  @IsString()
  @IsOptional()
  @Column({default: null, unique:true})
  canonical_id: string

  @IsString()
  @IsNotEmpty()
  @Column({default:'delivery-carrier',nullable:true})
  carrier_type: string;

  @IsNotEmpty()
  @Column()
  company_license: string; //document upload

  @IsString()
  @IsNotEmpty()
  @Column()
  street_address: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  city: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  state: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  zip_code: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  dot_number: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  mc_number: string;

  @IsBoolean()
  @IsNotEmpty()
  @Column()
  hhg_license: boolean;

  @IsString()
  @IsNotEmpty()
  @Column()
  owner_name: string;

  @IsNotEmpty()
  @Column()
  owner_driver_license: string; //document upload

  @IsString()
  @IsNotEmpty()
  @Column()
  primary_contact: string;

  @IsString()
  @IsNotEmpty()
  @Column({unique:true})
  owner_phone_number: string;

  @IsString()
  @IsNotEmpty()
  @Column({unique:true})
  company_phone_number: string;

  @IsString()
  @IsNotEmpty()
  @Column({unique:true})
  company_email: string;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  count_of_53_foot_trailers: number;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  count_of_drivers: number;

  @OneToMany(() => Insurance, (insurance) => insurance.delivery_carrier)
  insurance: Insurance[];

  @OneToMany(() => Driver, (driver) => driver.delivery_carrier)
  drivers: Driver[];

  @OneToMany(() => LoadRequest, loadRequest => loadRequest.delivery_carrier)
  loadRequests: LoadRequest[];

  @IsNotEmpty()
  @Column({ default: false })
  phone_verified: boolean;

  @IsNotEmpty()
  @Column({ default: false })
  email_verified: boolean;

  @IsString()
  @Column({ default: null })
  otp: string;

  @IsOptional()
  @Column({ default: false })
  activation_status: boolean;

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
