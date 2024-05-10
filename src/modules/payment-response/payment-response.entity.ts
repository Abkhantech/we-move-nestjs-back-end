import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { Address } from '../address/address.entity';
import { MoveRequest } from '../move-request/move-request.entity';
@Entity('payment-response')
export class PaymentResponse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column({ unique: true })
  object_id: string;

  @IsString()
  @Column({ unique: true })
  amount_in_cents: number;

  @Column({ default: null })
  checkout_time: Date;

  @OneToOne(() => MoveRequest, (moveRequest) => moveRequest.payment_response)
  @JoinColumn()
  move_request: MoveRequest;

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
