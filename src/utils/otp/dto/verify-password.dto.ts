import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class VerifyPasswordDto {
  @ApiProperty({
    description: 'Email',
    example: 'abc@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'abc@gmail',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
