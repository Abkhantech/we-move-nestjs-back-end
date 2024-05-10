import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MLSService } from './mls.service';
import { CreateMlsRequestDto } from './dto/create-mls-request.dto';

@ApiTags('MLS')
@Controller('mls')
export class MLSController {
  constructor(private reapiService: MLSService) {}

  @Post('/property-scouting')
  async getMls(@Body() body: CreateMlsRequestDto): Promise<any> {
    return this.reapiService.mlsListing(body);
  }

  @Get('getAllMLSRecords')
  async getAllRecords(
    @Query('offset') offset: number = 0,
    @Query('limit') limit: number = 10,
  ) {
    return await this.reapiService.getAllMLSRecords(offset, limit);
  }
}
