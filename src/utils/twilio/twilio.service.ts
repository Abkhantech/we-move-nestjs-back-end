import { Injectable } from '@nestjs/common';

const twilio = require('twilio');

@Injectable()
export class TwilioService {
  private readonly twilioClient;

  constructor() {
    this.twilioClient = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
  }

  async sendOtp(phoneNumber: string, otp: string): Promise<void> {
    try {
      const data = await this.twilioClient.messages.create({
        body: `WeMove-AI verification code: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      });
    } catch (error) {
      throw new Error('Failed to send OTP. Please try again later.');
    }
  }
  
  async sendTestMessage(phoneNumber: string, otp: string): Promise<void> {
    try {
      const data = await this.twilioClient.messages.create({
        body: `WeMove-AI verification code: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      });
    } catch (error) {
      throw new Error('Failed to send OTP. Please try again later.');
    }
  }
}
