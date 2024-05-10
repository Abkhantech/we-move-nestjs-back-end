import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
  } from 'typeorm';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { MoveRequest } from '../move-request.entity';
import { ComboApartmentStorage } from '../combo-apartment-storage/combo-apartment-storage.entity';
import { ComboHomeStorage } from '../combo-home-storage/combo-home-storage.entity';
  @Entity('storage')
  export class Storage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @IsString()
    @Column({default:null})
    storage_size: number;

    @IsString()
    @Column({default:null})
    storage_filled: number;

    @IsString()
    @Column({default:false})
    zip_code: string;

    @IsNumber()
    @Column({ nullable: true, default: null, type: 'decimal', precision: 10, scale: 2 })
    storage_cubic_feet: number;

    @IsString()
    @Column({default:null})
    address: string;

    @IsString()
    @Column({ default: null })
    floor_no: number;

    @IsBoolean()
    @Column({ default: false })
    is_elevator_available: boolean;

    @IsBoolean()
    @Column({ default: false })
    are_stairs_present: boolean;

    @OneToOne(() => MoveRequest, moveRequest => moveRequest.storage)
    moveRequest: MoveRequest;

    @OneToOne(() => ComboApartmentStorage, comboApartmentStorage => comboApartmentStorage.storage)
    comboApartmentStorage: ComboApartmentStorage;

    @OneToOne(() => ComboHomeStorage, comboHometStorage => comboHometStorage.storage)
    comboHometStorage: ComboHomeStorage;
  
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
  