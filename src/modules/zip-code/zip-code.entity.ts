import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LocalCarrier } from '../local-carrier/local-carrier.entity';
import { State } from '../state/entities/state.entity';

@Entity('zip-code')
export class ZipCode {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column({nullable:true})
  zip_code: string;

  @ManyToOne(() => State, (state) => state.zip_codes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  state: State;
}
