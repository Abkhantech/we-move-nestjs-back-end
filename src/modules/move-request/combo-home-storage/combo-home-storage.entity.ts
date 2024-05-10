import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
  } from 'typeorm';
  import { IsString } from 'class-validator';
import { MoveRequest } from '../move-request.entity';
import { Storage } from '../storage/storage.entity';
  @Entity('combo-home-storage')
  export class ComboHomeStorage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Storage)
    @JoinColumn() 
    storage: Storage;

    @IsString()
    @Column({default:null})
    home_address: string;

    @OneToOne(() => MoveRequest, moveRequest => moveRequest.combo_home_storage)
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
  