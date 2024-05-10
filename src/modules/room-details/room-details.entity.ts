import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MoveRequest } from '../move-request/move-request.entity';
import { MovingItem } from '../move-request/moving-item/moving-item.entity';

@Entity('room-details')
export class RoomDetails extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column({ nullable: true })
  video_url: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  title: string;
  
  @IsNumber()
  @Column({ nullable: true, default: null, type: 'decimal', precision: 10, scale: 2 })
  room_cubic_feet: number;

  @ManyToOne(() => MoveRequest, (moveRequest) => moveRequest.roomDetails, {
    onDelete: 'CASCADE',
  })
  moveRequest: MoveRequest;

  @OneToMany(() => MovingItem, (movingItem) => movingItem.roomDetails, {
    onDelete: "CASCADE",
  })
  items: MovingItem[];


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
