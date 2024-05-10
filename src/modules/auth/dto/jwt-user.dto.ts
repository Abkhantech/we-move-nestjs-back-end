import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class JwtUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsNumber()
  @IsNotEmpty()
  id:number

}
