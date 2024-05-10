import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  BeforeInsert,
} from "typeorm";
import { IsString, IsNumber, IsOptional } from "class-validator";
import { Apartment } from "./apartment/apartment.entity";
import { ComboApartmentStorage } from "./combo-apartment-storage/combo-apartment-storage.entity";
import { ComboHomeStorage } from "./combo-home-storage/combo-home-storage.entity";
import { Storage } from "./storage/storage.entity";
import { DeliveryDetails } from "./delivery-details/delivery-details.entity";
import { MovingItem } from "./moving-item/moving-item.entity";
import { PickupCarrier } from "../pickup-carrier/pickup-carrier.entity";
import { User } from "../user/user.entity";
import { LoadRequest } from "../load-request/load-request.entity";
import { LocalCarrier } from "../local-carrier/local-carrier.entity";
import { RoomDetails } from "../room-details/room-details.entity";
import { PaymentResponse } from "../payment-response/payment-response.entity";

enum MoveStatus {
  NotStarted = "Not Started",
  InProgress = "In Progress",
  Completed = "Completed",
}
@Entity("move-request")
export class MoveRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  move_order_number: string;

  @BeforeInsert()
  generateMoveOrderNumber() {
    const capitalLetter = String.fromCharCode(
      65 + Math.floor(Math.random() * 26)
    );
    const sixDigits = Math.floor(100000 + Math.random() * 900000);
    this.move_order_number = `${capitalLetter}${sixDigits}`;
  }

  @IsString()
  @Column({ default: null })
  move_type: string;

  @IsString()
  @IsOptional()
  @Column({default: null, unique:true})
  canonical_id: string

  @IsNumber()
  @IsOptional()
  @Column({default:null})
  number_of_rooms: number

  @Column({
    type: "enum",
    enum: MoveStatus,
    default: MoveStatus.NotStarted,
  })
  move_status: MoveStatus;

  @Column({
    type: "enum",
    enum: MoveStatus,
    default: MoveStatus.NotStarted,
  })
  pickup_status: MoveStatus;

  @IsString()
  @Column({ default: null })
  location_type: string;

  @OneToOne(() => Apartment, { onDelete: "CASCADE" })
  @IsOptional()
  @JoinColumn()
  apartment: Apartment;

  @OneToOne(() => ComboApartmentStorage, { onDelete: "CASCADE" })
  @IsOptional()
  @JoinColumn()
  combo_apartment_storage: ComboApartmentStorage;

  @ManyToOne(() => User, (user) => user.move_requests, {
    onDelete: "CASCADE",
  })
  user: User;

  @IsString()
  @IsOptional()
  @Column({ default: null })
  home_address: string;

  @OneToOne(() => ComboHomeStorage, { onDelete: "CASCADE" })
  @IsOptional()
  @JoinColumn()
  combo_home_storage: ComboHomeStorage;

  @OneToOne(() => Storage, { onDelete: "CASCADE" })
  @IsOptional()
  @JoinColumn()
  storage: Storage;

  @OneToOne(() => DeliveryDetails, { onDelete: "CASCADE" })
  @JoinColumn()
  delivery_details: DeliveryDetails;

  @Column({ nullable: true })
  pickup_date_from: Date;

  @Column({ nullable: true })
  pickup_date_to: Date;

  // @OneToMany(() => MovingItem, (movingItem) => movingItem.moveRequest, {
  //   onDelete: "CASCADE",
  // })
  // items: MovingItem[];

  @OneToMany(() => RoomDetails, (roomDetails) => roomDetails.moveRequest, {
    onDelete: "CASCADE",
  })
  roomDetails: RoomDetails[];

  @IsNumber()
  @Column({ nullable: true })
  item_count: number;

  @IsNumber()
  @Column({ nullable: true, default: null, type: 'decimal', precision: 10, scale: 2 })
  total_cubic_feet: number;

  @IsNumber()
  @Column({ nullable: true, default: null })
  price_per_cubic_feet: number;

  @IsNumber()
  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  move_payment: number;

  @IsNumber()
  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  move_distance: number;

  @IsNumber()
  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  initial_deposit: number;

  @Column({default:null, nullable:true})
  first_available_date_of_delivery: Date;

  @ManyToOne(() => PickupCarrier)
  @JoinColumn()
  pickup_carrier: PickupCarrier;

  @ManyToOne(() => LocalCarrier)
  @JoinColumn()
  local_carrier: LocalCarrier;

  @OneToOne(() => PaymentResponse, (payment_response) => payment_response.move_request)
  payment_response: PaymentResponse;

  @OneToOne(() => LoadRequest, (loadRequest) => loadRequest.moveRequest, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  loadRequest: LoadRequest;

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
