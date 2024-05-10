import {
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { User } from '../user/user.entity';

@Entity('address')
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  street_address: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  city: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  state: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  zip_code: string;

  @ManyToOne(() => User, (user) => user.addresses, {
    onDelete: 'CASCADE',
  })
  user: User;

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
