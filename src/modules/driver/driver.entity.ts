import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { DeliveryCarrier } from '../delivery-carrier/delivery-carrier.entity';
import { PickupCarrier } from '../pickup-carrier/pickup-carrier.entity';
import { LocalCarrier } from '../local-carrier/local-carrier.entity';
@Entity('driver')
export class Driver extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @Column({ unique: true })
  phone_number: string;

  @ManyToOne(
    () => DeliveryCarrier,
    (delivery_carrier) => delivery_carrier.drivers,
    {
      onDelete: 'CASCADE',
    },
  )
  delivery_carrier: DeliveryCarrier;

  @ManyToOne(() => PickupCarrier, (pickup_carrier) => pickup_carrier.drivers, {
    onDelete: 'CASCADE',
  })
  pickup_carrier: PickupCarrier;

  @ManyToOne(() => LocalCarrier, (local_carrier) => local_carrier.drivers, {
    onDelete: 'CASCADE',
  })
  local_carrier: LocalCarrier;

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
