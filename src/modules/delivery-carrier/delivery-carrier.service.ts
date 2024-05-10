import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateDeliveryCarrierDto } from "./dto/create-delivery-carrier.dto";
import { DeliveryCarrier } from "./delivery-carrier.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MailerService } from "src/utils/mailer/mailer.service";
import { AuthService } from "../auth/auth.service";
import { OtpService } from "src/utils/otp/otp.service";
import { LoginUserDto } from "src/utils/otp/dto/login-user.dto";
import { VerfyOtpDto } from "src/utils/otp/dto/verify-otp.dto";
import { Insurance } from "../insurance/insurance.entity";
import { Driver } from "../driver/driver.entity";
import * as crypto from "crypto";
import { UpdateDeliveryCarrierDto } from "./dto/update-delivery-carrier.dto";
import { S3Service } from "src/utils/s3/s3.service";
import { dataSourceOptions } from "../../../db/data-source";

@Injectable()
export class DeliveryCarrierService {
  constructor(
    @InjectRepository(DeliveryCarrier)
    private deliveryCarrierRepository: Repository<DeliveryCarrier>,
    @InjectRepository(Insurance)
    private insuranceRepository: Repository<Insurance>,
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    private mailService: MailerService,
    private authService: AuthService,
    private otpService: OtpService,
    private s3Service: S3Service
  ) {}

  async createDeliveryCarrier(
    createDeliveryCarrierDto: CreateDeliveryCarrierDto
  ) {
    let { insurances, both, ...body } = createDeliveryCarrierDto;
    const otp = this.otpService.generateOTP();
    const deliveryCarrier = await this.deliveryCarrierRepository
      .save(this.deliveryCarrierRepository.create({ ...body, otp: otp }))
      .catch((err) => {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST
        );
      });
    if (both === false) {
      if (insurances) {
        insurances.map(async (insurance: Insurance) => {
          await this.insuranceRepository.save(
            this.insuranceRepository.create({
              insurance_company: insurance.insurance_company,
              phone_number: insurance.phone_number,
              insurance_document: insurance.insurance_document,
              delivery_carrier: deliveryCarrier,
            })
          );
        });
      }
    }
    if (both === true) {
      return deliveryCarrier;
    } else {
      this.otpService.SendOTP(body.owner_phone_number, otp);
      return deliveryCarrier;
    }
  }

  async findDeliveryCarrierByPhoneNumber(
    phoneNumber: string
  ): Promise<DeliveryCarrier> {
    try {
      return this.deliveryCarrierRepository.findOne({
        where: {
          owner_phone_number: phoneNumber,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async login(body: LoginUserDto): Promise<DeliveryCarrier> {
    try {
      const delivery_carrier = await this.findDeliveryCarrierByPhoneNumber(
        body.phone_number
      );
      if (delivery_carrier) {
        const otp = this.otpService.generateOTP();
        // this.otpService.SendOTP(body.phone_number, otp);
        delivery_carrier.otp = otp;
        return await this.deliveryCarrierRepository.save(delivery_carrier);
      }
      throw new UnauthorizedException("Invalid phone number");
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async verifyOtp(body: VerfyOtpDto): Promise<any> {
    try {
      const delivery_carrier = await this.findDeliveryCarrierByPhoneNumber(
        body.phone_number
      );
      if (body.otp === delivery_carrier.otp) {
        if (
          !delivery_carrier.email_verified &&
          !delivery_carrier.phone_verified
        ) {
          delivery_carrier.email_verified = true;
          // const otp = this.otpService.generateOTP();
          // this.mailService.sendMail(
          //   delivery_carrier.company_email,
          //   `<div>
          // <p>Your WeMove-ai OTP is:${otp}</p>
          // </div>`,
          // );
          // delivery_carrier.otp = otp;
          await this.deliveryCarrierRepository.save(delivery_carrier);
          return true;
        } else {
          delivery_carrier.email_verified = true;
          delivery_carrier.otp = null;
          await this.deliveryCarrierRepository.save(delivery_carrier);
          const jwt = this.authService.generateTokenForPickupCarrier({
            id: delivery_carrier.id,
            phone_number: delivery_carrier.owner_phone_number,
            email: delivery_carrier.company_email,
          });
          return jwt;
        }
      }
      throw new UnauthorizedException("Invalid code");
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async findDeliveryCarrierWithRelations(id: string): Promise<DeliveryCarrier> {
    try {
      return this.deliveryCarrierRepository.findOne({
        where: { 
          canonical_id: id
         },
        relations: ["drivers", "loadRequests"],
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async update(
    id: number,
    body: UpdateDeliveryCarrierDto
  ): Promise<DeliveryCarrier> {
    try {
      const delivery_carrier = await this.deliveryCarrierRepository.findOne({
        where:{
          id: id
        }
      });
      if (delivery_carrier) {
        if(body.activation_status===true){
          await this.mailService.sendActivationMailToCarrier(
            delivery_carrier.company_email,
            `<html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Welcome to WeMove</title>
                <style>
                     .contentStyle {
                        border: 3px solid #5858E0; 
                        padding: 10px;
                        margin: 0;
                        border-radius: 12px;
                        background: linear-gradient(to bottom, #5858E0 0.5%, #ffffff 8%);
                        background-attachment: fixed;
                    }
                    .verification-code {
                        border: 5px solid #5858E0;
                        display: inline-block;
                        padding: 10px;
                        margin-top: 10px;
                        font-weight: bold;
                    }
                    .textStyle{
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
              <div class="contentStyle">
   
                  <p>Dear ${delivery_carrier.company_name},</p>
                  
                  <p>We hope this message finds you well. We are excited to inform you that your WeMove Marketplace seller account has been successfully activated, and it is now live!</p>
                  
                  <p>This means that you are now ready to receive job requests as consumers navigate through the WeMove platform seeking reliable moving services.</p>
                  
                  <p>Should you have any questions, need assistance, or require further information about your account or the platform in general, please feel free to reach out to us at carrier@wemove.ai.</p>
                  
                  <p>Thank you for being a part of our growing community of movers, and we look forward to a successful partnership.</p>
                  
                  <p>Best regards,</p>
                  <p>The WeMove Team<br>
                      <a href="mailto:carrier@wemove.ai">carrier@wemove.ai</a></p>
                      <p>
                          <img width="210" height="50" src="https://we-move-staging.s3.amazonaws.com/Frame+1000001165.png" alt="WeMove Logo">
                      </p>
                  </div>
            </body>
            </html>`
           );
         }
        this.deliveryCarrierRepository.merge(delivery_carrier, body);
        await this.deliveryCarrierRepository.save(delivery_carrier);
        return delivery_carrier;
      } else {
        throw new UnauthorizedException("No delivery carrier Found!!");
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async uploadFiles(files: any, body: any) {
    try {
        // let company_license;
      // if (files["company_license"][0]) {
      //   const company_license_url = await this.s3Service.uploadFile(
      //     files["company_license"][0]
      //   );
      //   company_license = company_license_url.Location;
      // }
      let driver_license;
      if (files["owner_driver_license"][0]) {
        console.log(files["owner_driver_license"][0],'---')
        const owner_driver_license_url = await this.s3Service.uploadFile(
          files["owner_driver_license"][0], 'delivery-carrier'+'/a11b22c33'+body.company_phone_number+'d44e55f66'+'/owner-driver-license'
        );
        driver_license = owner_driver_license_url.Location;
      }
      let insurance_url;
      if (files["insurance_document"][0]) {
        const insurance_document_url = await this.s3Service.uploadFile(
          files["insurance_document"][0], 'delivery-carrier'+'/a11b22c33'+body.company_phone_number+'d44e55f66'+'/insurance-document'
        );
        insurance_url = insurance_document_url.Location;
      }
      const otp = this.otpService.generateOTP();
      const deliveryCarrier = await this.deliveryCarrierRepository
        .save(
          this.deliveryCarrierRepository.create({
            company_name: body.company_name,
            doing_business_as_name:body.doing_business_as_name,
            street_address: body.street_address,
            company_email: body.company_email,
            city: body.city,
            state: body.state,
            zip_code: body.zip_code,
            dot_number: body.dot_number,
            mc_number: body.mc_number,
            owner_phone_number: body.owner_phone_number,
            owner_name: body.owner_name,
            primary_contact: body.owner_name,
            hhg_license: body.hhg_license,
            count_of_53_foot_trailers: body.count_of_53_foot_trailers,
            count_of_drivers: body.count_of_drivers,
            company_phone_number: body.company_phone_number,
            owner_driver_license: driver_license,
            company_license: "",
            otp: otp,
            activation_status: false,
          })
        )
        .catch((err) => {
          throw new HttpException(
            {
              message: err.message,
            },
            HttpStatus.BAD_REQUEST
          );
        });
      if (deliveryCarrier) {
        const hash = crypto.createHash("sha256");
        hash.update(deliveryCarrier.id.toString());
        const canonicalID = hash.digest("hex");
        deliveryCarrier.canonical_id = canonicalID;
        await this.deliveryCarrierRepository.save(deliveryCarrier);
        if (body.both === "false") {
          this.mailService.sendRegistrationMailToCarrier(
            deliveryCarrier.company_email,
           `<html lang="en">
           <head>
               <meta charset="UTF-8" />
               <meta name="viewport" content="width=device-width, initial-scale=1.0" />
               <title>Welcome to WeMove</title>
               <style>
                    .contentStyle {
                       border: 3px solid #5858E0; 
                       padding: 10px;
                       margin: 0;
                       border-radius: 12px;
                       background: linear-gradient(to bottom, #5858E0 0.5%, #ffffff 8%);
                       background-attachment: fixed;
                   }
                   .verification-code {
                       border: 5px solid #5858E0;
                       display: inline-block;
                       padding: 10px;
                       margin-top: 10px;
                       font-weight: bold;
                   }
                   .textStyle{
                       font-weight: bold;
                   }
               </style>
           </head>
           <body>
             <div class="contentStyle">
 
                 <p>Dear ${deliveryCarrier.company_name},</p>
                 
                 <!-- Start of the Verification Code Container -->
                 <div>
                     <p class="textStyle">Your WeMove-AI verification code: <span class="verification-code">${otp}</span></p>
                 </div>
                 <!-- End of the Verification Code Container -->
                 
                 <p>We are thrilled to welcome you to the WeMove family! As one of our esteemed moving carriers, you play a crucial role in helping people transition seamlessly to their new homes. You will undergo a brief due diligence and shortly thereafter you will be contacted by a WeMove representative to answer any questions and discuss the next steps.</p>
                 
                 <p>Here at WeMove, we believe in creating a community of reliable and professional movers, and we are delighted to have you on board. Your dedication to delivering exceptional service aligns perfectly with our mission to make moving a stress-free and positive experience for everyone involved.</p>
                 
                 <p>We understand that every move is unique, and your expertise will contribute to the success of each relocation. As you embark on this exciting journey with WeMove, know that your hard work is valued and appreciated.</p>
                 
                 <p>Thank you for choosing WeMove as your partner in the moving industry. We look forward to achieving great milestones together. Please expect additional information to follow.</p>
                 
                 <p>Welcome aboard, and happy moving!</p>
                 
                 <p>Best regards,</p>
                 <p>The WeMove Team<br>
                     <a href="mailto:carrier@wemove.ai">carrier@wemove.ai</a></p>
                     <p>
                         <img width="210" height="50" src="https://we-move-staging.s3.amazonaws.com/Frame+1000001165.png" alt="WeMove Logo">
                     </p>
                 </div>
           </body>
           </html>`
          );
        }
      }
      if (body.both === "false") {
        if (body.insurances) {
          body.insurances.map(async (insurance: Insurance) => {
            await this.insuranceRepository.save(
              this.insuranceRepository.create({
                insurance_company: insurance.insurance_company,
                phone_number: insurance.phone_number,
                insurance_document: insurance_url,
                delivery_carrier: deliveryCarrier,
              })
            );
          });
        }
      }
      if (deliveryCarrier) {
        dataSourceOptions.mixpanelClient.track("Register Delivery Carrier", {
          distinct_id: deliveryCarrier.canonical_id,
          delivery_carrier_id: deliveryCarrier.id,
          delivery_carrier_name: deliveryCarrier.company_name,
          company_phone: deliveryCarrier.company_phone_number,
          owner_name: deliveryCarrier.owner_name,
          owner_email: deliveryCarrier.company_email,
          owner_phone: deliveryCarrier.owner_phone_number,
          carrier_type: deliveryCarrier.carrier_type,
          mp_country_code: "US",
          $city: deliveryCarrier.city,
        });
      }
      if (body.both === "false") {
        // this.otpService.SendOTP(body.owner_phone_number, otp);
        return deliveryCarrier;
      } else {
        return deliveryCarrier;
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async checkIfAccountExists(body: any): Promise<any> {
    const { phoneNumber, email, ownerOfficePhone } = body;
    const deliveryCarrier = await this.deliveryCarrierRepository
      .createQueryBuilder("deliveryCarrier")
      .where("deliveryCarrier.owner_phone_number = :phoneNumber", {
        phoneNumber,
      })
      .orWhere("deliveryCarrier.company_phone_number = :ownerOfficePhone", {
        ownerOfficePhone,
      })
      .orWhere("deliveryCarrier.company_email = :email", { email })
      .getOne();
    return !!deliveryCarrier;
  }

  async resendOTPCode(body:any):Promise<any>{
    const {phoneNumber} = body;
    const delivery_carrier = await this.deliveryCarrierRepository.findOne({
      where:{
        owner_phone_number:phoneNumber
      }
    })
    if(delivery_carrier){
      const otp  = await this.otpService.generateOTP()
      delivery_carrier.otp = otp;
      await this.deliveryCarrierRepository.save(delivery_carrier);
      // await this.otpService.SendOTP(delivery_carrier.owner_phone_number, otp);
      this.mailService.resendCodeToCarrier(
        delivery_carrier.company_email,
       `<html lang="en">
       <head>
           <meta charset="UTF-8" />
           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
           <title>Welcome to WeMove</title>
           <style>
                .contentStyle {
                   border: 3px solid #5858E0; 
                   padding: 10px;
                   margin: 0;
                   border-radius: 12px;
                   background: linear-gradient(to bottom, #5858E0 0.5%, #ffffff 8%);
                   background-attachment: fixed;
               }
               .verification-code {
                   border: 5px solid #5858E0;
                   display: inline-block;
                   padding: 10px;
                   margin-top: 10px;
                   font-weight: bold;
               }
               .textStyle{
                   font-weight: bold;
               }
           </style>
       </head>
       <body>
         <div class="contentStyle">

             <p>Dear ${delivery_carrier.company_name},</p>
             
             <!-- Start of the Verification Code Container -->
             <div>
                 <p class="textStyle">Your WeMove-AI verification code: <span class="verification-code">${otp}</span></p>
             </div>
             <!-- End of the Verification Code Container -->
             
             <p>Best regards,</p>
             <p>The WeMove Team<br>
                 <a href="mailto:carrier@wemove.ai">carrier@wemove.ai</a></p>
                 <p>
                     <img width="210" height="50" src="https://we-move-staging.s3.amazonaws.com/Frame+1000001165.png" alt="WeMove Logo">
                 </p>
             </div>
       </body>
       </html>`
      );
      return delivery_carrier;
    }
  }
}
