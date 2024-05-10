import { IsNotEmpty, IsString } from 'class-validator';
import { LocalCarrier } from 'src/modules/local-carrier/local-carrier.entity';
import { PickupCarrier } from 'src/modules/pickup-carrier/pickup-carrier.entity';
import { ZipCode } from 'src/modules/zip-code/zip-code.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('state')
export class State extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column({nullable:true})
  pickup_service_state: string;

  @ManyToOne(() => PickupCarrier, (pickup_carrier) => pickup_carrier.states, {
    onDelete: 'CASCADE',
  })
  pickup_carrier: PickupCarrier;

  @ManyToOne(() => LocalCarrier, (local_carrier) => local_carrier.states, {
    onDelete: 'CASCADE',
  })
  local_carrier: LocalCarrier;

  @OneToMany(()=> ZipCode, (zip_code)=> zip_code.state)
  zip_codes: ZipCode[]

  @IsString()
  @Column({nullable:true})
  point_of_contact_name: string;

  @IsString()
  @Column({nullable:true})
  point_of_contact_phone_number: string;




}
