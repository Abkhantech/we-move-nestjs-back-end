import { Injectable } from "@nestjs/common";
import { PaymentResponseService } from "src/modules/payment-response/payment-response.service";
import Stripe from "stripe";

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private paymentResponseService: PaymentResponseService
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  async createCheckoutSession(price: number,canonical_id:string): Promise<{ sessionId: string }> {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Move Payment',
          },
          unit_amount: price, // Price in cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.STRIPE_SUCCESS_URL}/contract/${canonical_id}`,
      cancel_url: 'https://wemove.ai',
    });

    return { sessionId: session.id };
  }

  async getStripeResponse(response: any): Promise<any> {
    const url = response.data.object.success_url;
    if(url){
      const parts = url.split('/');
      if(parts){
        const canonicalId = parts[parts.length - 1];
        if(canonicalId){
        const paymentResponse = await this.paymentResponseService.createPaymentResponseObject(response, canonicalId)
        }
      }
    }
    return { response,message: 'Webhook received successfully' };
}


}
