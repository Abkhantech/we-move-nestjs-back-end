import {
  HttpException,
    HttpStatus,
    Injectable,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
import { Driver } from './driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
import { PickupCarrier } from '../pickup-carrier/pickup-carrier.entity';
import { DeliveryCarrier } from '../delivery-carrier/delivery-carrier.entity';
  
  @Injectable()
  export class DriverService {
    constructor(
      @InjectRepository(Driver) private driverRepository: Repository<Driver>,
      @InjectRepository(PickupCarrier) private pickupCarrierRepository: Repository<PickupCarrier>,
      @InjectRepository(DeliveryCarrier) private deliveryCarrierRepository: Repository<DeliveryCarrier>,


    ) {}
  async createPickupDriver(pickupCarrierId: number ,driverDto:CreateDriverDto):Promise<Driver>{
    const pickupCarrier = await this.pickupCarrierRepository.findOne({
      where:{
        id:pickupCarrierId
      }
    })
    if(pickupCarrier){
      const driver = await this.driverRepository.save(
        this.driverRepository.create({
          first_name:driverDto.first_name,
          last_name:driverDto.last_name,
          phone_number:driverDto.phone_number,
          pickup_carrier:pickupCarrier
        })
      ).catch(err => {
        throw new HttpException({
          message: err.message
        }, HttpStatus.BAD_REQUEST);
      })
      return driver;
    }
  }

  async createDeliveryDriver(deliveryCarrierId: number ,driverDto:CreateDriverDto):Promise<Driver>{
    console.log('here----')
    const deliveryCarrier = await this.deliveryCarrierRepository.findOne({
      where:{
        id:deliveryCarrierId
      }
    })
    if(deliveryCarrier){
      const driver = await this.driverRepository.save(
        this.driverRepository.create({
          first_name:driverDto.first_name,
          last_name:driverDto.last_name,
          phone_number:driverDto.phone_number,
          delivery_carrier:deliveryCarrier
        })
      ).catch(err => {
        throw new HttpException({
          message: err.message
        }, HttpStatus.BAD_REQUEST);
      })
      return driver;
    }
  }
  
  }
  