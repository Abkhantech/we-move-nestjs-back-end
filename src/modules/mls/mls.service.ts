import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { MLS } from './mls.entity';
import { Repository } from 'typeorm';
import { CreateMlsRequestDto } from './dto/create-mls-request.dto';

Injectable();
export class MLSService {
  constructor(@InjectRepository(MLS) private mlsRepository: Repository<MLS>) {}

  async mlsListing(body: CreateMlsRequestDto): Promise<any> {
    // const apiKey = process.env.REAPI_API_KEY;
    const apiKey = 'WEMOVEAI-dcfb-744a-8f25-00b584a0ed26';

    let extraAPIOptions: any = {};
    if(body.beds_min){
      console.log('in the beds')
      if (body.mls_active) {
        if (body.city) {
          if (body.mls_listing_min ) {
            extraAPIOptions = {
              mls_active: body.mls_active,
              city: body.city,
              mls_listing_price_min: body.mls_listing_min,
              beds_min: body.beds_min
            };
            console.log(
              extraAPIOptions,
              'city and mls_active and mls_listing_min',
            );
          } else {
            extraAPIOptions = {
              mls_active: body.mls_active,
              city: body.city,
              beds_min: body.beds_min
            };
            console.log('city and mls_active', extraAPIOptions);
          }
        } else if (body.state) {
          if (body.mls_listing_min) {
            extraAPIOptions = {
              mls_active: body.mls_active,
              state: body.state,
              mls_listing_price_min: body.mls_listing_min,
              beds_min: body.beds_min
            };
            console.log('state and mls_active and mls_listing_min',extraAPIOptions);
          } else {
            extraAPIOptions = {
              mls_active: body.mls_active,
              state: body.state,
              beds_min: body.beds_min
            };
            console.log('state and mls_active', extraAPIOptions);
          }
        }
      } else if (body.mls_pending) {
        if (body.city) {
          if (body.mls_listing_min) {
            extraAPIOptions = {
              mls_pending: body.mls_pending,
              city: body.city,
              mls_listing_price_min: body.mls_listing_min,
              beds_min: body.beds_min
            };
            console.log('city and mls_pending and mls_listing',extraAPIOptions);
          } else {
            extraAPIOptions = {
              mls_pending: body.mls_pending,
              city: body.city,
              beds_min: body.beds_min
            };
            console.log('city and mls_pending',extraAPIOptions);
          }
        } else if (body.state) {
          if (body.mls_listing_min) {
            extraAPIOptions = {
              mls_pending: body.mls_pending,
              state: body.state,
              mls_listing_price_min: body.mls_listing_min,
              beds_min: body.beds_min
            };
            console.log('state and mls_pending and mls_listing_min',extraAPIOptions);
          } else {
            extraAPIOptions = {
              mls_pending: body.mls_pending,
              state: body.state,
              beds_min: body.beds_min
            };
            console.log('state and mls_pending',extraAPIOptions);
          }
        }
      }
    }else{
    if (body.mls_active) {
      if (body.city) {
        if (body.mls_listing_min ) {
          extraAPIOptions = {
            mls_active: body.mls_active,
            city: body.city,
            mls_listing_price_min: body.mls_listing_min,
          };
          console.log(
            extraAPIOptions,
            'city and mls_active and mls_listing_min',
          );
        } else {
          extraAPIOptions = {
            mls_active: body.mls_active,
            city: body.city,
          };
          console.log('city and mls_active', extraAPIOptions);
        }
      } else if (body.state) {
        if (body.mls_listing_min) {
          extraAPIOptions = {
            mls_active: body.mls_active,
            state: body.state,
            mls_listing_price_min: body.mls_listing_min,
          };
          console.log('state and mls_active and mls_listing_min',extraAPIOptions);
        } else {
          extraAPIOptions = {
            mls_active: body.mls_active,
            state: body.state,
          };
          console.log('state and mls_active', extraAPIOptions);
        }
      }
    } else if (body.mls_pending) {
      if (body.city) {
        if (body.mls_listing_min) {
          extraAPIOptions = {
            mls_pending: body.mls_pending,
            city: body.city,
            mls_listing_price_min: body.mls_listing_min,
          };
          console.log('city and mls_pending and mls_listing',extraAPIOptions);
        } else {
          extraAPIOptions = {
            mls_pending: body.mls_pending,
            city: body.city,
          };
          console.log('city and mls_pending',extraAPIOptions);
        }
      } else if (body.state) {
        if (body.mls_listing_min) {
          extraAPIOptions = {
            mls_pending: body.mls_pending,
            state: body.state,
            mls_listing_price_min: body.mls_listing_min,
          };
          console.log('state and mls_pending and mls_listing_min',extraAPIOptions);
        } else {
          extraAPIOptions = {
            mls_pending: body.mls_pending,
            state: body.state,
          };
          console.log('state and mls_pending',extraAPIOptions);
        }
      }
    }
  }
    const options = {
      method: 'POST',
      url: 'https://api.realestateapi.com/v2/PropertySearch',
      headers: {
        accept: 'application/json',
        'x-api-key': 'WEMOVEAI-dcfb-744a-8f25-00b584a0ed26',
        'x-user-id': 'UniqueUserIdentifier',
        'content-type': 'application/json',
      },
      data: {
        ids_only: false,
        obfuscate: false,
        summary: false,
        size: Number(body.no_of_records),
        ...extraAPIOptions,
        resultIndex: body.result_index,
        corporate_owned:false,
        // city: 'New York',
        // mls_active: true,
        // mls_pending: true,
      },
    };

    console.log('data:', options.data);
    // return options.data;

    let mlsListingResponse: any = [];

    try {
      const response = await axios.request(options);
      const mlsListingResponse = response.data.data;
      console.log(response.data.data,'--')
      if(mlsListingResponse.length===0){
      throw new Error('Unable to fetch records ');
      }

      if (mlsListingResponse.length !== 0) {
        mlsListingResponse.map(async (thisObject: any) => {
          await this.mlsRepository.save(
            this.mlsRepository.create({
              object: thisObject,
            }),
          );
          console.log('saving>>', thisObject);
        });
        console.log('Data saved to the database successfully');
        return true;
      }
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error('Unable to fetch records: ' + error.message);
    }

    // return mlsListingResponse;
    // return true;
  }

  async getAllMLSRecords(offset: number, limit: number): Promise<any> {
    try {
      const MLSRecords = await this.mlsRepository.find({
        where: {
          is_searched: false
        },
        skip: offset,
        take: limit,
      });
      return MLSRecords;
    } catch (error) {
      throw new Error('Unable to fetch users: ' + error.message);
    }
  }
}
