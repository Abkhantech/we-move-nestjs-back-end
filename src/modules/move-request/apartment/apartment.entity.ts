import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { IsString } from 'class-validator';
import { MoveRequest } from '../move-request.entity';
import { ComboApartmentStorage } from '../combo-apartment-storage/combo-apartment-storage.entity';
@Entity('apartment')
export class Apartment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column({ default: null })
  floor_no: number;

  @IsString()
  @Column({ default: false })
  is_elevator_available: boolean;

  @IsString()
  @Column({ default: false })
  is_elevator_accessible: boolean;

  @IsString()
  @Column({ default: null })
  elevator_type: string;

  @IsString()
  @Column({ default: null })
  apt_address: string;

  @OneToOne(() => MoveRequest, (moveRequest) => moveRequest.apartment)
  moveRequest: MoveRequest;

  @OneToOne(
    () => ComboApartmentStorage,
    (comboApartmentStorage) => comboApartmentStorage.apartment,
  )
  comboApartmentStorage: ComboApartmentStorage;

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
