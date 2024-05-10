import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SkipTraceService } from './skip-trace.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateSkipTraceDto } from './dto/create-skip-trace.dto';

@ApiTags('Skip Trace')
@Controller('skip-trace')
export class SkipTraceController {
  constructor(private skipTraceService: SkipTraceService) {}

  @Post(':id/search')
  async getSkipTrace(@Param('id')id:number, @Body() body: CreateSkipTraceDto): Promise<any> {
    return this.skipTraceService.getSkipTraceData(id,body);
  }

  @Get(':date/getAllSkipTraceRecords')
  async getAllRecords(
    @Param('date') date: string,
    @Query('offset') offset: number = 0,
    @Query('limit') limit: number = 10,
  ) {
    return await this.skipTraceService.getAllSkipTraceRecords(date, offset, limit);
  }
}
