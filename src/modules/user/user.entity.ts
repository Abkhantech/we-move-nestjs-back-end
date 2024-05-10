import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { Address } from '../address/address.entity';
import { MoveRequest } from '../move-request/move-request.entity';
@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column({ unique: true })
  email: string;

  @IsString()
  @Column({ default: null })
  otp: string;

  @IsNotEmpty()
  @Column({ default: false })
  phone_verified: boolean;

  @IsNotEmpty()
  @Column({ default: false })
  email_verified: boolean;

  @IsString()
  @IsNotEmpty()
  @Column()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  last_name: string;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => MoveRequest, (moveRequest) => moveRequest.user)
  move_requests: MoveRequest[];

  @IsString()
  @IsNotEmpty()
  @Column({ unique: true })
  phone_number: string;

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
