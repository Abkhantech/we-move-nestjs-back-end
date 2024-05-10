import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PickupCarrier } from '../pickup-carrier/pickup-carrier.entity';
import { DeliveryCarrier } from '../delivery-carrier/delivery-carrier.entity';
import { LocalCarrier } from '../local-carrier/local-carrier.entity';

@Entity('insurance')
export class Insurance {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column()
  insurance_company: string;

  @IsNotEmpty()
  @IsString()
  @Column({nullable:true})
  phone_number: string;

  @IsNotEmpty()
  @Column()
  insurance_document: string; //document upload

  @ManyToOne(
    () => PickupCarrier,
    (pickup_carrier) => pickup_carrier.insurance,
    {
      onDelete: 'CASCADE',
    },
  )
  pickup_carrier: PickupCarrier;

  @ManyToOne(
    () => LocalCarrier,
    (local_carrier) => local_carrier.insurance,
    {
      onDelete: 'CASCADE',
    },
  )
  local_carrier: LocalCarrier;

  @ManyToOne(
    () => DeliveryCarrier,
    (delivery_carrier) => delivery_carrier.insurance,
    {
      onDelete: 'CASCADE',
    },
  )
  delivery_carrier: DeliveryCarrier;

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
