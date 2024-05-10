import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class OtpDto {
  @ApiProperty({
    description: 'phoneNumber',
    example: '+13137513130',
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
}
