import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth-guards/jwt-auth.guard';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

@ApiTags('Addresses')
@Controller('addresses')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Req() user: any, @Body() body: CreateAddressDto) {
    return await this.addressService.create(user.user, body);
  }
}
