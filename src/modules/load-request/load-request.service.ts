import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { LoadRequest } from './load-request.entity';
import { CreateLoadRequestDto } from './dto/create-load-request.dto';
import { UpdateLoadRequestDto } from './dto/update-load-request.dto';
import { PickupCarrier } from '../pickup-carrier/pickup-carrier.entity';
import { MoveRequest } from '../move-request/move-request.entity';
import { DeliveryCarrier } from '../delivery-carrier/delivery-carrier.entity';
import { startOfMonth, endOfMonth, parseISO } from 'date-fns';
@Injectable()
export class LoadRequestService {
  constructor(
    @InjectRepository(LoadRequest)
    private loadRequesRepository: Repository<LoadRequest>,
    @InjectRepository(PickupCarrier)
    private pickupCarrierRepository: Repository<PickupCarrier>,
    @InjectRepository(MoveRequest)
    private moveRequestRepository: Repository<MoveRequest>,
    @InjectRepository(DeliveryCarrier)
    private deliveryCarrierRepository: Repository<DeliveryCarrier>,
  ) {}

  async createLoadRequest(body: CreateLoadRequestDto) {
    try {
      const pickupCarrier = await this.pickupCarrierRepository.findOne({
        where: {
          canonical_id: body.pickup_crrier_id,
        },
      });
      const moveRequest = await this.moveRequestRepository.findOne({
        where: {
          id: body.move_request_id,
        },
      });
      const loadRequest=await this.loadRequesRepository.save(
        this.loadRequesRepository.create({
          delivery_state: body.delivery_state,
          loading_state: body.loading_state,
          loading_zip_code: body.loading_zip_code,
          delivery_status: body.delivery_status,
          delivery_zip_code: body.delivery_zip_code,
          cubic_feet: body.cubic_feet,
          balance_at_delivery: body.balance_at_delivery,
          price_per_cubic_feet: body.price_per_cubic_feet,
          pickup_carrier: pickupCarrier,
          moveRequest: moveRequest,
          first_available_date_of_delivery:
            body.first_available_date_of_delivery,
        }),
      );
      moveRequest.loadRequest=loadRequest;
      await this.moveRequestRepository.save(moveRequest);
      return loadRequest;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async findOne(id: number): Promise<LoadRequest> {
    try {
      return this.loadRequesRepository.findOne({ where: { id } });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async update(id: number, body: UpdateLoadRequestDto): Promise<LoadRequest> {
    try {
      const loadRequest = await this.findOne(id);
      this.loadRequesRepository.merge(loadRequest, body);
      return this.loadRequesRepository.save(loadRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async assignDeliveryCarrier(
    loadRequestId: number,
    deliveryCarrierId: number,
  ): Promise<LoadRequest> {
    try {
      const loadRequest = await this.findOne(loadRequestId);
      const deliveryCarrier = await this.deliveryCarrierRepository.findOne({
        where: {
          id: deliveryCarrierId,
        },
      });
      this.loadRequesRepository.merge(loadRequest, {
        delivery_carrier: deliveryCarrier,
      });
      return this.loadRequesRepository.save(loadRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async getDeliveryCarrier(id: number, date: any) {
    try {
      let loadRequests: any;
      console.log(id, date);
      if (date !== 'undefined') {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
          throw new BadRequestException('Invalid date format');
        }

        const startOfTheMonth = startOfMonth(parsedDate);
        const endOfTheMonth = endOfMonth(parsedDate);
        console.log(startOfTheMonth, 'start', endOfTheMonth, 'end');

        loadRequests = await this.loadRequesRepository.find({
          where: {
            delivery_carrier: {
              id: id,
            },
            created_at: Between(startOfTheMonth, endOfTheMonth),
          },
        });
      } else {
        loadRequests = await this.loadRequesRepository.find({
          where: {
            delivery_carrier: {
              id: id,
            },
          },
        });
      }
console.log(loadRequests);
      return loadRequests;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
