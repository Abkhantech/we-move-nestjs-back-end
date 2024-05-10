import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyClaimService } from './company-claim.service';
import { CreateClaimDto } from './dto/create-company-claim.dto';
import { UpdateClaimDto } from './dto/update-company-claim.dto';
import { ApiTags } from '@nestjs/swagger';



@ApiTags('CompanyClaim')
@Controller('company-claim')
export class CompanyClaimController {
  constructor(private readonly companyClaimService: CompanyClaimService) {}

  @Post(':pickupCarrierId')
  create(@Param('pickupCarrierId') pickupCarrierId: number, @Body() createCompanyClaimDto: CreateClaimDto) {
    return this.companyClaimService.create(pickupCarrierId, createCompanyClaimDto);
  }

  @Get()
  findAll() {
    return this.companyClaimService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyClaimService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyClaimDto: UpdateClaimDto) {
    return this.companyClaimService.update(+id, updateCompanyClaimDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyClaimService.remove(+id);
  }
}
