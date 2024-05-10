import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { IsString, IsNumber } from 'class-validator';
import { MoveRequest } from '../move-request.entity';
import { RoomDetails } from 'src/modules/room-details/room-details.entity';
  @Entity('moving-item')
  export class MovingItem extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @IsString()
    @Column()
    item_name: string;

    @IsNumber()
    @Column({ type: 'decimal', precision: 10, scale: 1, nullable:true })
    item_width: number;

    @IsNumber()
    @Column({ type: 'decimal', precision: 10, scale: 1, nullable:true })
    item_length: number;

    @IsNumber()
    @Column({ type: 'decimal', precision: 10, scale: 1, nullable:true })
    item_height: number;
  
    @ManyToOne(() => RoomDetails, (roomDetails) => roomDetails.items, {
        onDelete: 'CASCADE',
      })
      roomDetails: RoomDetails;
  
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
  