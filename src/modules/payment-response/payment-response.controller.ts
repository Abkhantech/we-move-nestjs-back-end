import { BadRequestException, Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentResponseService } from './payment-response.service';

@ApiTags('Payment-Response')
@Controller('payment-response')
export class PaymentResponseController {
  constructor(private paymentResponseService: PaymentResponseService) {}

 
}
