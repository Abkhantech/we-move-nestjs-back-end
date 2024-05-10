import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne
} from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { DeliveryCarrier } from '../delivery-carrier/delivery-carrier.entity';
import { PickupCarrier } from '../pickup-carrier/pickup-carrier.entity';
import { LocalCarrier } from '../local-carrier/local-carrier.entity';
@Entity('delivery-estimation')
export class DeliveryEstimation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  estimation_0_to_500_miles: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  estimation_501_to_1000_miles: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  estimation_1001_to_1500_miles: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  estimation_1501_to_4000_miles: string;

  @OneToOne(()=> PickupCarrier, pickupCarrier => pickupCarrier.delivery_estimation)
  pickupCarrier: PickupCarrier

  @OneToOne(()=> LocalCarrier, local_carrier => local_carrier.delivery_estimation)
  local_carrier: LocalCarrier


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
