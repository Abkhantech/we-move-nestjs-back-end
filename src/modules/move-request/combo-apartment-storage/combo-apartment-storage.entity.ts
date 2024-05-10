import {
    PrimaryGeneratedColumn,
    Entity,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
  } from 'typeorm';
import { MoveRequest } from '../move-request.entity';
import { Apartment } from '../apartment/apartment.entity';
import { Storage } from '../storage/storage.entity';
import { IsOptional } from 'class-validator';
  @Entity('combo-apartment-storage')
  export class ComboApartmentStorage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Apartment)
    @IsOptional()
    @JoinColumn() 
    apartment: Apartment;

    @OneToOne(() => Storage)
    @IsOptional()
    @JoinColumn() 
    storage: Storage;

    @OneToOne(() => MoveRequest, moveRequest => moveRequest.combo_apartment_storage)
    moveRequest: MoveRequest;
  
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
  