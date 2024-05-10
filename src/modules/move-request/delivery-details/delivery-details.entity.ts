import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
  } from 'typeorm';
  import { IsString } from 'class-validator';
import { DeliveryAddress } from './delivery-address/delivery-address.entity';
import { Packaging } from './packaging/packaging.entity';
import { MoveRequest } from '../move-request.entity';
  @Entity('delivery-details')
  export class DeliveryDetails extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @IsString()
    @Column({ default: null })
    determined_delivery_address: boolean;

    @OneToMany(() => DeliveryAddress, (delivery_address) => delivery_address.deliveryDetails, {onDelete:'CASCADE'})
    delivery_addresses: DeliveryAddress[];

    @OneToOne(() => MoveRequest, moveRequest => moveRequest.delivery_details)
    moveRequest: MoveRequest;

    @OneToOne(() => Packaging, {onDelete:'CASCADE'})
    @JoinColumn() 
    packaging: Packaging;

    @Column({ default: null })
    additional_stops: boolean;

    @Column({ default: null })
    packagaing_required: boolean;

    @Column({ default: null })
    open_location: string; //Can we get a large truck infront of your house?

    @Column({ default: null })
    shuttle_required: string; //Do you require a shuttle service?
  
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
  