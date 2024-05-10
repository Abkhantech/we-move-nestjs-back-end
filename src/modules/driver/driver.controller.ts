import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';

@ApiTags('Drivers')
@Controller('drivers')
export class DriverController {
  constructor(private driverService: DriverService) {}

  @Get()
  findAll(): string[] {
    return ['User1', 'User2'];
  }

  @Post(':pickupCarrierId/createPickupDriver')
  async createDriverForPickup(@Param('pickupCarrierId')pickupCarrierId: number, @Body() driverDto: CreateDriverDto):Promise<any> {
    return await this.driverService.createPickupDriver(pickupCarrierId,driverDto);
  }

  @Post(':deliveryCarrierId/createDeliveryDriver')
  async createDriverForDelivery(@Param('deliveryCarrierId')deliveryCarrierId: number, @Body() driverDto: CreateDriverDto):Promise<any> {
    return await this.driverService.createDeliveryDriver(deliveryCarrierId,driverDto);
  }
}
