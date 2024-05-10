import {
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { DeliveryDetails } from "../delivery-details.entity";

export enum DeliveryAddressType {
  Apartment = "Apartment",
  Home = "Home",
  Storage = "Storage",
}
@Entity("delivery-address")
export class DeliveryAddress extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: DeliveryAddressType,
    default: null,
  })
  delivery_location_type: DeliveryAddressType;

  @Column({ default: null })
  complete_address: string;

  @Column({ default: null })
  stiars_present: boolean;

  @Column({ default: null })
  is_elevator_accessible: boolean;

  @Column({ default: 0 })
  no_of_flights: number;

  @Column({ default: 0 })
  floor_no: number;

  @ManyToOne(
    () => DeliveryDetails,
    (deliveryDetails) => deliveryDetails.delivery_addresses,
    {
      onDelete: "CASCADE",
    }
  )
  deliveryDetails: DeliveryDetails;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updated_at: Date;
}
