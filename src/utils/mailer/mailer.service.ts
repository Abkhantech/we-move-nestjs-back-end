import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAILER_FROM_EMAIL,
        pass: process.env.MAILER_PASSWORD,
      },
    });
  }

  async sendMail(to: string, body: string) {
      await this.transporter.sendMail({
      from: process.env.MAILER_FROM_EMAIL,
      to,
      subject: 'WeMove-ai email-verification',
      html: body,
    });
  }

  async sendRegistrationMailToCarrier(to: string, body: string) {
    await this.transporter.sendMail({
    from: process.env.MAILER_FROM_EMAIL,
    to,
    bcc: process.env.BCC_EMAIL,
    subject: 'Welcome to WeMove - Your Moving Marketplace!',
    html: body,
  });
}

async resendCodeToCarrier(to: string, body: string) {
  await this.transporter.sendMail({
  from: process.env.MAILER_FROM_EMAIL,
  to,
  bcc: process.env.BCC_EMAIL,
  subject: 'Welcome to WeMove - Your Moving Marketplace!',
  html: body,
});
}

async sendActivationMailToCarrier(to: string, body: string) {
  await this.transporter.sendMail({
  from: process.env.MAILER_FROM_EMAIL,
  to,
  bcc: process.env.BCC_EMAIL,
  subject: 'Activation of Your WeMove Mover Account',
  html: body,
});
}


private createTransporter(email: string, password: string): nodemailer.Transporter {
  return nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: 587,
    secure: false,
    auth: {
      user: email,
      pass: password,
    },
  });
}
async sendMoveRequestConfirmationToAdmin(body: string) {
  const email = process.env.CONSUMER_EMAIL_FROM;
  const password = process.env.CONSUMER_EMAIL_FROM_PASSWORD;
  const transporter = this.createTransporter(email, password);
  await transporter.sendMail({
  from: process.env.MAILER_FROM_EMAIL,
  to : process.env.BCC_EMAIL,
  // bcc: process.env.BCC_EMAIL,
  subject: 'WeMove-AI: NEW MOVE CONFIRMATION',
  html: body,
});
}

}
