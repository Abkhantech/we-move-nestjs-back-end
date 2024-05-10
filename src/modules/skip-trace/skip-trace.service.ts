import { Injectable } from '@nestjs/common';
import { CreateSkipTraceDto } from './dto/create-skip-trace.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SkipTrace } from './skip-trace.entity';
import { Between, Repository } from 'typeorm';
import axios from 'axios';
import { MLS } from '../mls/mls.entity';

@Injectable()
export class SkipTraceService {
  constructor(
    @InjectRepository(SkipTrace)
    private skipTraceRepository: Repository<SkipTrace>,
    @InjectRepository(MLS) private mlsRepository: Repository<MLS>
  ) {}

  async getSkipTraceData(id:number, body: CreateSkipTraceDto): Promise<any> {
    // const apiKey = process.env.REAPI_API_KEY;
    const apiKey = '';

    const options = {
      method: 'POST',
      url: 'https://api.realestateapi.com/v1/SkipTrace',
      headers: {
        accept: 'application/json',
        'x-user-id': 'UniqueUserIdentifier',
        'content-type': 'application/json',
        'x-api-key': 'WEMOVEAI-dcfb-744a-8f25-00b584a0ed26',
        // 'x-api-key': apiKey,
      },
      data: {
        address: body.address,
        city: body.city,
        state: body.state,
        zip: body.zip,
      },
    };

    console.log('data:', options.data);
    try {
      const response = await axios.request(options);
      console.log('response data', response.data);
      const skipTraceResponse = response.data;

      if (skipTraceResponse) {
        await this.skipTraceRepository.save(
          this.skipTraceRepository.create({
            object: skipTraceResponse,
          }),
        );
      }
      const mlsObject = await this.mlsRepository.findOne({
        where:{
          id: id
        }
      })
      if(mlsObject){
        mlsObject.is_searched=true;
        await this.mlsRepository.save(mlsObject)
      }
      console.log('Data saved to the database successfully');
      // return skipTraceResponse;
      return true;
    } catch (error) {
      console.error('Error performing SkipTrace:');
      throw new Error('Failed to perform SkipTrace');
    }
  }

  async getAllSkipTraceRecords(date: string, offset: number, limit: number): Promise<any> {
    if(date!=="00"){
      try {
      const startDate = new Date(date);
      const endDate = new Date(new Date(date).setDate(startDate.getDate() + 1)); // Increment date by 1 to cover the whole day
  
      const SkipTraceRecords = await this.skipTraceRepository.find({
        where: {
          created_at: Between(startDate, endDate) // Use Between operator to filter records for the specified date
        },
        skip: offset,
        take: limit
      });
  
      return SkipTraceRecords;
    } catch (error) {
      throw new Error('Unable to fetch users: ' + error.message);
    }
    }else{
      console.log('gettingAllRecords')
    try {
      const SkipTraceRecords = await this.skipTraceRepository.find({
        skip: offset,
        take: limit
      });
      return SkipTraceRecords;
    } catch (error) {
      throw new Error('Unable to fetch users: ' + error.message);
    }
  }
  }
}
