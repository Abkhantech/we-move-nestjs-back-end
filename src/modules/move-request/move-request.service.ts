import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoveRequest } from './move-request.entity';
import { MoveRequestDto } from './dto/create-move-request.dto';
import { User } from '../user/user.entity';
import { Apartment } from './apartment/apartment.entity';
import { ComboApartmentStorage } from './combo-apartment-storage/combo-apartment-storage.entity';
import { Storage } from './storage/storage.entity';
import { ComboHomeStorage } from './combo-home-storage/combo-home-storage.entity';
import { DeliveryDetails } from './delivery-details/delivery-details.entity';
import { Packaging } from './delivery-details/packaging/packaging.entity';
import { DeliveryAddress } from './delivery-details/delivery-address/delivery-address.entity';
import { CreateDeliveryAddressDto } from './delivery-details/delivery-address/create-delivery-address.dto';
import { CreateMovingItemDto } from './moving-item/create-moving-item.dto';
import { MovingItem } from './moving-item/moving-item.entity';
import { PickupCarrierService } from '../pickup-carrier/pickup-carrier.service';
import { GatewayService } from '../gateway/gateway.service';
import * as crypto from 'crypto';


@Injectable()
export class MoveRequestService {
  constructor(
    @InjectRepository(MoveRequest)
    private moveRequestRepository: Repository<MoveRequest>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Apartment)
    private apartmentRepository: Repository<Apartment>,
    @InjectRepository(ComboApartmentStorage)
    private comboApartmentStorageRepository: Repository<ComboApartmentStorage>,
    @InjectRepository(Storage)
    private storageRepository: Repository<Storage>,
    @InjectRepository(ComboHomeStorage)
    private comboHomeStorageRepository: Repository<ComboHomeStorage>,
    @InjectRepository(DeliveryDetails)
    private deliveryDetailsRepository: Repository<DeliveryDetails>,
    @InjectRepository(Packaging)
    private packagingRepository: Repository<Packaging>,
    @InjectRepository(DeliveryAddress)
    private deliveryAddressRepository: Repository<DeliveryAddress>,
    @InjectRepository(MovingItem)
    private movingItemRepository: Repository<MovingItem>,
    private readonly pickupCarrierService: PickupCarrierService,
    private readonly socketGateway: GatewayService,
  ) {}
  async createMoveRequest(
    moveRequestDto: MoveRequestDto,
    userId: number,
  ): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (user) {
      let {
        id,
        apartment,
        combo_apartment_storage,
        storage,
        combo_home_storage,
        delivery_details,
        // items,
        // roomDetails,
        home_address,
        ...body
      } = moveRequestDto;
      console.log(body,'<<<<')
      let thisMoveRequest
      if(id){
        const moveRequest = await this.moveRequestRepository.findOne({
          where:{
            id: id
          }
        })
        if(moveRequest){
          await this.moveRequestRepository.update(id,body)
      thisMoveRequest = moveRequest;
        }
      }else{

      const moveRequest = await this.moveRequestRepository.save(
        this.moveRequestRepository.create({...body, user:user
        }),
      );
      const hash = crypto.createHash('sha256');
      hash.update(moveRequest.id.toString());
      const canonicalID = hash.digest('hex');
      moveRequest.canonical_id = canonicalID;
      await this.moveRequestRepository.save(moveRequest);
      thisMoveRequest = moveRequest;
    }
    console.log(thisMoveRequest,'------>>>>>>>')
      if (thisMoveRequest) {
        if (apartment) {
          const thisApartment = await this.apartmentRepository.save(
            this.apartmentRepository.create({
              floor_no: apartment.floor_no,
              is_elevator_available: apartment.is_elevator_available,
              is_elevator_accessible: apartment.is_elevator_accessible,
              elevator_type: apartment.elevator_type,
              apt_address: apartment.apt_address,
            }),
          );
          thisMoveRequest.apartment = thisApartment;
          thisMoveRequest.home_address=null;
          thisMoveRequest.combo_apartment_storage=null;
          thisMoveRequest.combo_home_storage=null;
          thisMoveRequest.storage=null;
          await this.moveRequestRepository.save(thisMoveRequest);
        }
        if (combo_apartment_storage) {
          if (
            combo_apartment_storage.apartment &&
            combo_apartment_storage.storage
          ) {
            const thisApartment = await this.apartmentRepository.save(
              this.apartmentRepository.create({
                floor_no: combo_apartment_storage.apartment.floor_no,
                is_elevator_available:
                  combo_apartment_storage.apartment.is_elevator_available,
                is_elevator_accessible:
                  combo_apartment_storage.apartment.is_elevator_accessible,
                elevator_type: combo_apartment_storage.apartment.elevator_type,
                apt_address: combo_apartment_storage.apartment.apt_address,
              }),
            );
            const thisStorage = await this.storageRepository.save(
              this.storageRepository.create({
                storage_size: combo_apartment_storage.storage.storage_size,
                storage_filled: combo_apartment_storage.storage.storage_filled,
                zip_code: combo_apartment_storage.storage.zip_code,
                address: combo_apartment_storage.storage.address,
                floor_no: combo_apartment_storage.storage.floor_no,
                is_elevator_available: combo_apartment_storage.storage.is_elevator_accessible,
                are_stairs_present: combo_apartment_storage.storage.are_stairs_present,
                storage_cubic_feet: (Number(combo_apartment_storage.storage.storage_filled)/100)*Number(combo_apartment_storage.storage.storage_size)
              }),
            );
            // thisMoveRequest.total_cubic_feet = (Number(combo_apartment_storage.storage.storage_filled)/100)*Number(combo_apartment_storage.storage.storage_size)
            // await this.moveRequestRepository.save(thisMoveRequest)
            const thisComboApartmentStorage =
              await this.comboApartmentStorageRepository.save(
                this.comboApartmentStorageRepository.create({
                  storage: thisStorage,
                  apartment: thisApartment,
                }),
              );
              thisMoveRequest.combo_apartment_storage = thisComboApartmentStorage;
              thisMoveRequest.apartment = null;
              thisMoveRequest.home_address=null;
              thisMoveRequest.combo_home_storage=null;
              thisMoveRequest.storage=null;
            await this.moveRequestRepository.save(thisMoveRequest);
          }
        }
        if (storage) {
          const thisStorage = await this.storageRepository.save(
            this.storageRepository.create({
              storage_size: storage.storage_size,
              storage_filled: storage.storage_filled,
              zip_code: storage.zip_code,
              address: storage.address,
              floor_no: storage.floor_no,
              is_elevator_available: storage.is_elevator_accessible,
              are_stairs_present: storage.are_stairs_present,
              storage_cubic_feet: (Number(storage.storage_filled)/100)*Number(storage.storage_size)
            }),
          );
          // thisMoveRequest.total_cubic_feet = (Number(storage.storage_filled)/100)*Number(storage.storage_size)
          //   await this.moveRequestRepository.save(thisMoveRequest)
          thisMoveRequest.storage = thisStorage;
          thisMoveRequest.combo_apartment_storage = null;
          thisMoveRequest.apartment = null;
          thisMoveRequest.home_address=null;
          thisMoveRequest.combo_home_storage=null;
          await this.moveRequestRepository.save(thisMoveRequest);
        }
        if (combo_home_storage) {
          if (combo_home_storage.storage && combo_home_storage.home_address) {
            const thisStorage = await this.storageRepository.save(
              this.storageRepository.create({
                storage_size: combo_home_storage.storage.storage_size,
                storage_filled: combo_home_storage.storage.storage_filled,
                zip_code: combo_home_storage.storage.zip_code,
                address: combo_home_storage.storage.address,
                floor_no: combo_home_storage.storage.floor_no,
                is_elevator_available: combo_home_storage.storage.is_elevator_accessible,
                are_stairs_present: combo_home_storage.storage.are_stairs_present,
                storage_cubic_feet: (Number(combo_home_storage.storage.storage_filled)/100)*Number(combo_home_storage.storage.storage_size)
              }),
            );
            // thisMoveRequest.total_cubic_feet = (Number(combo_home_storage.storage.storage_filled)/100)*Number(combo_home_storage.storage.storage_size)
            // await this.moveRequestRepository.save(thisMoveRequest)
            const thisComboHomeStorage =
              await this.comboHomeStorageRepository.save(
                this.comboHomeStorageRepository.create({
                  home_address: combo_home_storage.home_address,
                  storage: thisStorage,
                }),
              );
              thisMoveRequest.combo_home_storage = thisComboHomeStorage;
              thisMoveRequest.storage = thisStorage;
              thisMoveRequest.combo_apartment_storage = null;
              thisMoveRequest.apartment = null;
              thisMoveRequest.home_address=null;
            await this.moveRequestRepository.save(thisMoveRequest);
          }
        }
        if (home_address) {
          thisMoveRequest.home_address = home_address;
          await this.moveRequestRepository.save(thisMoveRequest);
        }

        const updatedMoveRequest = await this.moveRequestRepository.findOne({
          where: {
            id: thisMoveRequest.id,
          },
          relations: [
            'apartment',
            'roomDetails',
            'roomDetails.items',
            'storage',
            'combo_home_storage',
            'combo_home_storage.storage',
            'delivery_details',
            'delivery_details.packaging',
            'delivery_details.delivery_addresses',
            'combo_apartment_storage',
            'user',
            'combo_apartment_storage.storage',
            'combo_apartment_storage.apartment',
          ],
        });

        return updatedMoveRequest;
      }

    }
  }
  async updateMoveRequest(
    moveRequestDto: MoveRequestDto,
  ): Promise<MoveRequest> {
    let {
      id,
      apartment,
      combo_apartment_storage,
      storage,
      home_address,
      combo_home_storage,
      delivery_details,
      pickup_carrier_id,
      // items,
      // roomDetails,
      ...body
    } = moveRequestDto;
    if (id) {
      const moveRequest = await this.moveRequestRepository.findOne({
        where: {
          id: id,
        },
        relations: [
          'apartment',
          'roomDetails',
          'roomDetails.items',
          'storage',
          'combo_home_storage',
          'combo_home_storage.storage',
          'delivery_details',
          'delivery_details.packaging',
          'delivery_details.delivery_addresses',
          'combo_apartment_storage',
          'user',
          'combo_apartment_storage.storage',
          'combo_apartment_storage.apartment',
        ],
      });
      if (moveRequest) {
        console.log(moveRequest);
        if (moveRequestDto.first_available_date_of_delivery) {
          moveRequest.first_available_date_of_delivery =
            moveRequestDto.first_available_date_of_delivery;
          await this.moveRequestRepository.save(moveRequest);
        }
        if (moveRequestDto.pickup_date_from && moveRequestDto.pickup_date_to) {
          console.log('Pickup Date range updated!');
          moveRequest.pickup_date_from = moveRequestDto.pickup_date_from;
          moveRequest.pickup_date_to = moveRequestDto.pickup_date_to;
          await this.moveRequestRepository.save(moveRequest);
        }
        if(moveRequestDto.initial_deposit){
          moveRequest.initial_deposit = Number(moveRequestDto.initial_deposit);
          await this.moveRequestRepository.save(moveRequest)
        }
        if(moveRequestDto.move_payment){
          moveRequest.move_payment = Number(moveRequestDto.move_payment);
          await this.moveRequestRepository.save(moveRequest)
        }
        console.log(moveRequest.delivery_details, '-----DELIVERY DETAILS----');
        if (delivery_details) {
          if (moveRequest.delivery_details !== null) {
            const deliveryDetails =
              await this.deliveryDetailsRepository.findOne({
                where: {
                  id: moveRequest.delivery_details.id,
                },
                relations: ['packaging', 'delivery_addresses'],
              });
              console.log('>>>>>',deliveryDetails)
            if (deliveryDetails) {
              console.log(delivery_details, '>>>>>>>>>>>>');
              if(delivery_details.determined_delivery_address!==undefined){
                deliveryDetails.determined_delivery_address =
                delivery_details.determined_delivery_address;
              }
              if(delivery_details.packagaing_required!==undefined){
                deliveryDetails.packagaing_required =
                delivery_details.packagaing_required;
              }
              if(delivery_details.open_location!==undefined){
                deliveryDetails.open_location = delivery_details.open_location;
              }
              if(delivery_details.additional_stops!==undefined){
                deliveryDetails.additional_stops =
                delivery_details.additional_stops;
              }
              if(delivery_details.shuttle_required!==undefined){
                deliveryDetails.shuttle_required =
                delivery_details.shuttle_required;
              }
              await this.deliveryDetailsRepository.save(deliveryDetails);

              if (delivery_details.packaging) {
                if (deliveryDetails.packaging) {
                  const thisPackaging = await this.packagingRepository.findOne({
                    where: {
                      id: deliveryDetails.packaging.id,
                    },
                  });
                  if (thisPackaging) {
                    thisPackaging.small_book_boxes =
                      delivery_details.packaging.book_boxes;
                    thisPackaging.dish_boxes =
                      delivery_details.packaging.dish_boxes;
                    thisPackaging.large_boxes =
                      delivery_details.packaging.large_boxes;
                    thisPackaging.medium_boxes =
                      delivery_details.packaging.med_boxes;
                    thisPackaging.wardrobe_boxes =
                      delivery_details.packaging.wardrobe_boxes;
                    thisPackaging.small_picture_boxes =
                      delivery_details.packaging.small_picture_boxes;
                      thisPackaging.medium_picture_boxes =
                      delivery_details.packaging.medium_picture_boxes;
                      thisPackaging.large_picture_boxes =
                      delivery_details.packaging.large_picture_boxes;
                      thisPackaging.extra_large_picture_boxes =
                      delivery_details.packaging.extra_large_picture_boxes;
                      thisPackaging.mattress_covers =
                      delivery_details.packaging.mattress_covers;
                      thisPackaging.packing_tapes =
                      delivery_details.packaging.packing_tapes;
                    thisPackaging.tv_boxes =
                      delivery_details.packaging.tv_boxes;
                    thisPackaging.packaging_type =
                      delivery_details.packaging.packaging_type;
                    thisPackaging.packaging_payment =
                      delivery_details.packaging.packaging_payment;
                      thisPackaging.custom_packaging_preference = delivery_details.packaging.custom_packaging_preference;
                    await this.packagingRepository.save(thisPackaging);
                  }
                } else {
                  const thisPackaging = await this.packagingRepository.save(
                    this.packagingRepository.create(delivery_details.packaging),
                  );
                  deliveryDetails.packaging = thisPackaging;
                  deliveryDetails.packagaing_required = true;
                  await this.deliveryDetailsRepository.save(deliveryDetails);
                }
              }
              if (delivery_details.delivery_addresses) {
                console.log('Got Address DTO');
                const deliveryAddresses =
                  await this.deliveryAddressRepository.find({
                    where: {
                      deliveryDetails: {
                        id: deliveryDetails.id,
                      },
                    },
                  });
                if (deliveryAddresses) {
                  console.log('updating addresses');
                  deliveryAddresses.map(async (add: DeliveryAddress) => {
                    add.stiars_present =
                      delivery_details.delivery_addresses[0].stiars_present;
                    add.is_elevator_accessible =
                      delivery_details.delivery_addresses[0].is_elevator_accessible;
                    add.no_of_flights =
                      delivery_details.delivery_addresses[0].no_of_flights;
                    add.floor_no =
                      delivery_details.delivery_addresses[0].floor_no;
                    await this.deliveryAddressRepository.save(add);
                  });
                  console.log(delivery_details.delivery_addresses[0],'---<><><><>---')
                  if(delivery_details.delivery_addresses[0].delivery_location_type){
                    deliveryAddresses[0].delivery_location_type = delivery_details.delivery_addresses[0].delivery_location_type;
                  }
                  await this.deliveryAddressRepository.save(deliveryAddresses);
                  deliveryDetails.delivery_addresses = deliveryAddresses
                  await this.deliveryDetailsRepository.save(deliveryDetails)
                }
                console.log(deliveryDetails.delivery_addresses,'>>>>>DELIVERY ADDS')
              }
            }
          } else {
            console.log('Creating new delivery details!!!');
            const deliveryDetails = await this.deliveryDetailsRepository.save(
              this.deliveryDetailsRepository.create({
                determined_delivery_address:
                  delivery_details.determined_delivery_address,
                packagaing_required: delivery_details.packagaing_required,
                open_location: delivery_details.open_location,
                additional_stops: delivery_details.additional_stops,
                shuttle_required: delivery_details.shuttle_required
              }),
            );
            console.log(delivery_details, '-------');
            if (delivery_details.packaging) {
              const thisPackaging = await this.packagingRepository.save(
                this.packagingRepository.create(delivery_details.packaging),
              );
              deliveryDetails.packaging = thisPackaging;
              await this.deliveryDetailsRepository.save(deliveryDetails);
            }
            if (delivery_details.delivery_addresses) {
            const addressPromises =  delivery_details.delivery_addresses.map(
                async (address: CreateDeliveryAddressDto) => {
                  return await this.deliveryAddressRepository.save(
                    this.deliveryAddressRepository.create({
                      complete_address: address.complete_address,
                      stiars_present: address.stiars_present,
                      is_elevator_accessible: address.is_elevator_accessible,
                      no_of_flights: address.no_of_flights,
                      floor_no: address.floor_no,
                      deliveryDetails: deliveryDetails,
                    }),
                  );
                },
              );
              const newAddresses = await Promise.all(addressPromises);
              deliveryDetails.delivery_addresses = newAddresses
              await this.deliveryDetailsRepository.save(deliveryDetails)
            }
            moveRequest.delivery_details = deliveryDetails;
            await this.moveRequestRepository.save(moveRequest);
          }
        }
        // if (items) {
        //   console.log('ITEMS DTO RECEIVED!!!');
        //   const movingItems = await this.movingItemRepository.find({
        //     where: {
        //       moveRequest: {
        //         id: moveRequest.id,
        //       },
        //     },
        //   });
        //   if (movingItems.length !== 0) {
        //     console.log('Got some items');
        //     await this.movingItemRepository.remove(movingItems);
        //   } else {
        //     console.log('NO ITEMS!');
        //   }
        //   items.map(async (item: CreateMovingItemDto) => {
        //     console.log(item,'--')
        //     return await this.movingItemRepository.save(
        //       this.movingItemRepository.create({
        //         item_name: item.item_name,
        //         item_width: item.item_width,
        //         item_length: item.item_length,
        //         item_height: item.item_height,
        //         moveRequest: moveRequest,
        //       }),
        //     );
        //   });
        //   let total_cubic_feet = 0;

        //   items.map((thisItem: any) => {
        //     total_cubic_feet +=
        //       thisItem.item_width * thisItem.item_height * thisItem.item_length;
        //   });
        //   // let roundedValue = Math.round(total_cubic_feet);
        //   moveRequest.total_cubic_feet = total_cubic_feet;
        //   moveRequest.item_count = items.length;
        //   await this.moveRequestRepository.save(moveRequest);
        // }
        
        if (id && pickup_carrier_id) {
          const moveRequest = await this.findMoveRequestById(id);
          const pickup_carrier =
            await this.pickupCarrierService.findPickupCarrierById(
              pickup_carrier_id,
            );
          moveRequest.pickup_carrier = pickup_carrier;
          const newMoveRequest = await this.moveRequestRepository.save(
            moveRequest,
          );
          this.socketGateway.notifyNewMoveRequest(newMoveRequest);
        }
        const updatedMoveRequest = await this.moveRequestRepository.findOne({
          where: {
            id: id,
          },
          relations: [
            'apartment',
            'roomDetails',
            'roomDetails.items',
            'storage',
            'combo_home_storage',
            'combo_home_storage.storage',
            'delivery_details',
            'delivery_details.packaging',
            'delivery_details.delivery_addresses',
            'combo_apartment_storage',
            'user',
            'combo_apartment_storage.storage',
            'combo_apartment_storage.apartment',
          ],
        });
        return updatedMoveRequest;
      }
    }
  }

  async findMoveRequestByCanonicalId(moveRequestId: string): Promise<MoveRequest> {
    const moveRequest = await this.moveRequestRepository.findOne({
      where: {
        canonical_id:moveRequestId
      },
      relations: [
        'apartment',
        'roomDetails',
        'roomDetails.items',
        'storage',
        'combo_home_storage',
        'combo_home_storage.storage',
        'delivery_details',
        'delivery_details.packaging',
        'delivery_details.delivery_addresses',
        'combo_apartment_storage',
        'user',
        'combo_apartment_storage.storage',
        'combo_apartment_storage.apartment',
      ],
    });
    if (moveRequest) {
      return moveRequest;
    } else {
      throw new HttpException(
        {
          message: 'Move Request Not Found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findMoveRequestById(moveRequestId: number): Promise<MoveRequest> {
    const moveRequest = await this.moveRequestRepository.findOne({
      where: {
        id:moveRequestId
      },
      relations: [
        'apartment',
        'roomDetails',
        'roomDetails.items',
        'storage',
        'combo_home_storage',
        'combo_home_storage.storage',
        'delivery_details',
        'delivery_details.packaging',
        'delivery_details.delivery_addresses',
        'combo_apartment_storage',
        'user',
        'combo_apartment_storage.storage',
        'combo_apartment_storage.apartment',
      ],
    });
    if (moveRequest) {
      return moveRequest;
    } else {
      throw new HttpException(
        {
          message: 'Move Request Not Found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllMoveRequestsByUserId(userId: number): Promise<any> {
    const moveRequests = await this.moveRequestRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: [
        'apartment',
        'roomDetails',
        'roomDetails.items',
        'storage',
        'combo_home_storage',
        'combo_home_storage.storage',
        'delivery_details',
        'delivery_details.packaging',
        'delivery_details.delivery_addresses',
        'combo_apartment_storage',
        'user',
        'combo_apartment_storage.storage',
        'combo_apartment_storage.apartment',
      ],
    });
    return moveRequests;
  }

  async findAllMoveRequestsForAdmin(offset: number, limit: number): Promise<any> {
    const moveRequests = await this.moveRequestRepository.find({
      skip: offset,
      take: limit,
      relations: [
        'apartment',
        'roomDetails',
        'roomDetails.items',
        'storage',
        'combo_home_storage',
        'combo_home_storage.storage',
        'delivery_details',
        'delivery_details.packaging',
        'delivery_details.delivery_addresses',
        'combo_apartment_storage',
        'user',
        'combo_apartment_storage.storage',
        'combo_apartment_storage.apartment',
        'payment_response'
      ],
    });
    return moveRequests;
  }
}
