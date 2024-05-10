import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column({ unique: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Column({ nullable: false })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  last_name: string;

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
  @Column({ unique: true })
  phone_number: string;

  @IsNotEmpty()
  @Column({ default: false })
  phone_verified: boolean;

  @IsNotEmpty()
  @Column({ default: false })
  email_verified: boolean;

  @IsString()
  @Column({ default: null })
  otp: string;
}
