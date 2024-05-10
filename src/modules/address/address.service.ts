import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Address } from './address.entity';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private addressRepository: Repository<Address>,
  ) {}

  async create(user: User, body: CreateAddressDto): Promise<Address> {
    const address = await this.addressRepository
      .save(
        this.addressRepository.create({
          user: {
            id: user.id,
          },
          ...body,
        }),
      )
      .catch((err) => {
        throw new HttpException(
          {
            message: 'Could not create new address',
          },
          HttpStatus.CONFLICT,
        );
      });

    return address;
  }
}
