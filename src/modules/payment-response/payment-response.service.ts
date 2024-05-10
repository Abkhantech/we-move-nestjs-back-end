import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import axios from "axios";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PaymentResponse } from "./payment-response.entity";
import { MoveRequest } from "../move-request/move-request.entity";
import { MailerService } from "src/utils/mailer/mailer.service";
import { GatewayService } from "../gateway/gateway.service";

@Injectable()
export class PaymentResponseService {
  constructor(
    @InjectRepository(PaymentResponse)
    private paymentResponseRepository: Repository<PaymentResponse>,
    @InjectRepository(MoveRequest)
    private moveRequestRepository: Repository<MoveRequest>,
    private mailService: MailerService,
    private gatewayService: GatewayService
  ) {}

  async createPaymentResponseObject(
    response: any,
    moveRequestCanonicalId: string
  ): Promise<any> {
    const paymentConfirmedDate = (dateString: any) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      // Convert UTC to EST
      const estDate = new Date(
        date.toLocaleString("en-US", { timeZone: "America/New_York" })
      );

      const estYear = estDate.getFullYear();
      const estMonth = String(estDate.getMonth() + 1).padStart(2, "0");
      const estDay = String(estDate.getDate()).padStart(2, "0");
      const estHours = String(estDate.getHours()).padStart(2, "0");
      const estMinutes = String(estDate.getMinutes()).padStart(2, "0");

      return `(EST: ${estYear}-${estMonth}-${estDay} ${estHours}:${estMinutes})`;
    };
    const moveRequest = await this.moveRequestRepository.findOne({
      where: {
        canonical_id: moveRequestCanonicalId,
      },
      relations: [ 'payment_response', 'user' ],
    });
    if (response && moveRequest) {
      if (!moveRequest.payment_response) {
        moveRequest.initial_deposit =
          Number(response.data.object.amount_total) / 100;
        await this.moveRequestRepository.save(moveRequest);
        const milliseconds = response.data.object.created * 1000;
        const date = new Date(milliseconds);
        const paymentResponse = await this.paymentResponseRepository.save(
          this.paymentResponseRepository.create({
            object_id: response.data.object.id,
            amount_in_cents: response.data.object.amount_total,
            checkout_time: date,
            move_request: moveRequest,
          })
        );
        const updatedMoveRequest = await this.moveRequestRepository.findOne({
          where: {
        canonical_id: moveRequestCanonicalId,
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
            'payment_response'
          ],
        })

        await this.gatewayService.notifyNewMoveRequest(updatedMoveRequest);
        await this.mailService.sendMoveRequestConfirmationToAdmin(
          `
  A new Move has been confirmed.<br/>
  <strong>ORDER-ID:</strong> ${moveRequest.move_order_number}<br/>
  <strong>CUSTOMER INFO</strong><br/>
  <strong>NAME:</strong> ${moveRequest.user.first_name} ${
            moveRequest.user.last_name
          }<br/>
  <strong>EMAIL:</strong> ${moveRequest.user.email}<br/>
  <strong>PHONE NUMBER:</strong> ${moveRequest.user.phone_number}<br/>
  <strong>PAYMENT RECEIVED:</strong> $ ${moveRequest.initial_deposit}<br/>
  <strong>CONFIRMATION TIME:</strong> ${paymentConfirmedDate(
    paymentResponse.created_at
  )}
  <br/><br/>
  Please visit Admin Dashboard to view details.
  <br/>
  <p>
  <img width="210" height="50" src="https://we-move-staging.s3.amazonaws.com/Frame+1000001165.png" alt="WeMove Logo">
</p>
`
        );

        return paymentResponse;
      }
    }
  }
}
