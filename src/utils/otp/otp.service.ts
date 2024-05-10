import { HttpException, Injectable } from "@nestjs/common";
import { TwilioService } from "../twilio/twilio.service";

@Injectable()
export class OtpService {
  constructor(private readonly twilioService: TwilioService) {}
  SendOTP(phoneNumber: string, otp: string): string {
    try {
      if (
        process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "staging"
      ) {
        this.twilioService.sendOtp(phoneNumber, otp);
      }
      return otp;
    } catch (e) {
      throw new HttpException(e.message, e.statusCode);
    }
  }
  generateOTP(): string {
    try {
      let otp = "123456";
      if (
        process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "staging"
      ) {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear() % 100;
        const calculatedValue = day + month + year;
        const randomPart = Math.floor(Math.random() * 9000) + 1000;
        otp = (calculatedValue.toString() + randomPart.toString()).slice(-6);
      }
      return otp;
    } catch (e) {
      throw new HttpException(e.message, e.statusCode);
    }
  }
}
