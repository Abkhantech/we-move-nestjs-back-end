import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
  } from 'typeorm';
  import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { PickupCarrier } from '../pickup-carrier/pickup-carrier.entity';
import { DeliveryCarrier } from '../delivery-carrier/delivery-carrier.entity';
import { MoveRequest } from '../move-request/move-request.entity';

export enum MoveStatus {
    NotStarted = 'Not Started',
    InProgress = 'In Progress',
    Completed = 'Completed',
  }

  @Entity('load-request')
  export class LoadRequest extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: MoveStatus,
        default: MoveStatus.NotStarted,
      })
      delivery_status: MoveStatus;
  
    @IsString()
    @IsNotEmpty()
    @Column()
    loading_state: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    loading_zip_code: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    delivery_state: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    delivery_zip_code: string;

    @IsNumber()
    @IsNotEmpty()
    @Column()
    cubic_feet: number;

    @IsNumber()
    @IsNotEmpty()
    @Column()
    balance_at_delivery: number;

    @IsNumber()
    @IsNotEmpty()
    @Column()
    price_per_cubic_feet: number;

    @ManyToOne(() => PickupCarrier)
    @JoinColumn() 
    pickup_carrier: PickupCarrier;

    @ManyToOne(() => DeliveryCarrier)
    @JoinColumn() 
    delivery_carrier: DeliveryCarrier;

    @OneToOne(() => MoveRequest, moveRequest => moveRequest.loadRequest)
    @JoinColumn() 
    moveRequest: MoveRequest;

    @IsNotEmpty()
    @Column()
    first_available_date_of_delivery: Date;
  
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
  