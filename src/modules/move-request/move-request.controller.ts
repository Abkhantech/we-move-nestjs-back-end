import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { MoveRequestService } from "./move-request.service";
import { MoveRequestDto } from "./dto/create-move-request.dto";
import { MoveRequest } from "./move-request.entity";
import { CheckoutSessionDto } from "./dto/checkout-session.dto";
import { StripeService } from "src/utils/stripe/stripe.service";
import { GatewayService } from "../gateway/gateway.service";
import { TwilioService } from "src/utils/twilio/twilio.service";
import { JwtAuthGuard } from "../auth/auth-guards/jwt-auth.guard";

@ApiTags("Move Request")
@Controller("move-request")
export class MoveRequestController {
  constructor(
    private readonly twilioService: TwilioService,
    private moveRequestService: MoveRequestService,
    private stripeService: StripeService,
    private gatewayService: GatewayService
  ) {}

  @ApiBearerAuth(process.env.X_ACCESS_TOKEN)
  @UseGuards(JwtAuthGuard)
  @Post("createMoveRequest/:userId")
  async createMove(
    @Body() moveRequestDto: MoveRequestDto,
    @Param("userId") userId: number
  ): Promise<MoveRequest> {
    return await this.moveRequestService.createMoveRequest(
      moveRequestDto,
      userId
    );
  }

  @ApiBearerAuth(process.env.X_ACCESS_TOKEN)
  @UseGuards(JwtAuthGuard)
  @Patch("updateMoveRequest")
  async updateMove(
    @Body() moveRequestDto: MoveRequestDto
  ): Promise<MoveRequest> {
    return await this.moveRequestService.updateMoveRequest(moveRequestDto);
  }

  @ApiBearerAuth(process.env.X_ACCESS_TOKEN)
  @UseGuards(JwtAuthGuard)
  @Get(":moveRequestId")
  async fetchMoveRequestById(
    @Param("moveRequestId") moveRequestId: string
  ): Promise<MoveRequest> {
    return await this.moveRequestService.findMoveRequestByCanonicalId(
      moveRequestId
    );
  }

  @ApiBearerAuth(process.env.X_ACCESS_TOKEN)
  @UseGuards(JwtAuthGuard)
  @Get("getAllMoveRequests/:userId")
  async fetchAllMoveRequestsByUserId(
    @Param("userId") userId: number
  ): Promise<any> {
    return await this.moveRequestService.findAllMoveRequestsByUserId(userId);
  }

  @Post("checkoutSession")
  async createCheckoutSession(
    @Body() checkoutSessionDto: CheckoutSessionDto
  ): Promise<{ sessionId: string }> {
    console.log("idhr aaya haiiiii", checkoutSessionDto);
    return await this.stripeService.createCheckoutSession(
      checkoutSessionDto.price,
      checkoutSessionDto.canonical_id
    );
  }

  @Post("stripe-response")
  @HttpCode(200)
  async receiveStripeResponse(@Body() stripeResponse: any): Promise<any> {
    // console.log(stripeResponse,'---->Stripe Response--->')
    const response = await this.stripeService.getStripeResponse(stripeResponse);
  }

  @Post("pandadoc-response")
  async receivePandadocResponse(@Body() pandaDocResponse: any): Promise<any> {
    console.log(pandaDocResponse, "---->Pandadoc Response--->");
    this.gatewayService.notifyContractCompletion(true);
  }

  @Post("twilio-message/:phoneNumber/:otp")
  async sendTwilioText(@Param('phoneNumber') phoneNumber:string, @Param('otp')otp: string): Promise<any> {
    return await this.twilioService.sendTestMessage(phoneNumber, otp)
  }
}
