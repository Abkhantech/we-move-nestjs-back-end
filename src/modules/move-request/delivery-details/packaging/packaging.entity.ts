import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { IsString } from 'class-validator';
import { DeliveryDetails } from '../delivery-details.entity';

@Entity('packaging')
export class Packaging extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
 
  @IsString()
  @Column()
  packaging_type: string;

  @IsString()
  @Column({default:null, nullable:true})
  custom_packaging_preference: string;

  @IsString()
  @Column({default:0})
  packaging_payment: number;

  @IsString()
  @Column({default:0})
  dish_boxes: number;

  @IsString()
  @Column({default:0})
  wardrobe_boxes: number;

  @IsString()
  @Column({default:0})
  medium_boxes: number;

  @IsString()
  @Column({default:0})
  large_boxes: number;

  @IsString()
  @Column({default:0})
  small_book_boxes: number;

  @IsString()
  @Column({default:0})
  packing_tapes: number;

  @IsString()
  @Column({default:0})
  small_picture_boxes: number;

  @IsString()
  @Column({default:0})
  medium_picture_boxes: number;

  @IsString()
  @Column({default:0})
  large_picture_boxes: number;

  @IsString()
  @Column({default:0})
  extra_large_picture_boxes: number;

  @IsString()
  @Column({default:0})
  mattress_covers: number;

  @IsString()
  @Column({default:0})
  tv_boxes: number;

  @OneToOne(() => DeliveryDetails, (deliveryDetails) => deliveryDetails.packaging, {
    onDelete: 'CASCADE',
  })
  deliveryDetails: DeliveryDetails;

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
