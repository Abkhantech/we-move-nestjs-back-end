import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateLocalCarrierDto } from "./dto/create-local-carrier.dto";
import { UpdateLocalCarrierDto } from "./dto/update-local-carrier.dto";
import { LocalCarrier } from "./local-carrier.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Insurance } from "../insurance/insurance.entity";
import { Driver } from "../driver/driver.entity";
import { DeliveryEstimation } from "../delivery-estimation/delivery-estimation.entity";
import { MailerService } from "src/utils/mailer/mailer.service";
import { AuthService } from "../auth/auth.service";
import { OtpService } from "src/utils/otp/otp.service";
import { LoginUserDto } from "src/utils/otp/dto/login-user.dto";
import { VerfyOtpDto } from "src/utils/otp/dto/verify-otp.dto";
import { S3Service } from "src/utils/s3/s3.service";
import * as crypto from "crypto";
import { State } from "../state/entities/state.entity";
import { CreateStateDto } from "../state/dto/create-state.dto";
import { CreateZipCodeDto } from "../zip-code/dto/create-state-zip-code.dto";
import { ZipCode } from "../zip-code/zip-code.entity";
import { dataSourceOptions } from "../../../db/data-source";
@Injectable()
export class LocalCarrierService {
  constructor(
    @InjectRepository(LocalCarrier)
    private localCarrierRepository: Repository<LocalCarrier>,
    @InjectRepository(Insurance)
    private insuranceRepository: Repository<Insurance>,
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    @InjectRepository(DeliveryEstimation)
    private deliveryEstimationRepository: Repository<DeliveryEstimation>,
    @InjectRepository(State)
    private stateRepository: Repository<State>,
    @InjectRepository(ZipCode)
    private zipCodeRepository: Repository<ZipCode>,
    private mailService: MailerService,
    private authService: AuthService,
    private otpService: OtpService,
    private s3Service: S3Service
  ) {}

  async createLocalCarrier(createLocalCarrierDto: CreateLocalCarrierDto) {
    let {
      insurances,
      states,
      delivery_approximations,
      ...body
    } = createLocalCarrierDto;
    const otp = this.otpService.generateOTP();
    const localCarrier = await this.localCarrierRepository
      .save(this.localCarrierRepository.create({ ...body, otp: otp }))
      .catch((err) => {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST
        );
      });

    if (delivery_approximations) {
      const delivery_estimation = await this.deliveryEstimationRepository.save(
        this.deliveryEstimationRepository.create({
          estimation_0_to_500_miles:
            delivery_approximations.estimation_0_to_500_miles,
          estimation_501_to_1000_miles:
            delivery_approximations.estimation_501_to_1000_miles,
          estimation_1001_to_1500_miles:
            delivery_approximations.estimation_1001_to_1500_miles,
          estimation_1501_to_4000_miles:
            delivery_approximations.estimation_1501_to_4000_miles,
        })
      );
      localCarrier.delivery_estimation = delivery_estimation;
      await this.localCarrierRepository.save(localCarrier);
    }

    if (insurances) {
      insurances.map(async (insurance: Insurance) => {
        await this.insuranceRepository.save(
          this.insuranceRepository.create({
            insurance_company: insurance.insurance_company,
            phone_number: insurance.phone_number,
            insurance_document: insurance.insurance_document,
            local_carrier: localCarrier,
          })
        );
      });
    }
    // if (state_zip_codes) {
    //   state_zip_codes.map(async (local: CreateStateZipCodeDto) => {
    //     await this.stateRepository.save(
    //       this.stateRepository.create({
    //         service_state: local.service_state,
    //         zip_code: local.zip_code,
    //         point_of_contact_name: local.point_of_contact_name,
    //         point_of_contact_phone_number: local.point_of_contact_phone_number,
    //         local_carrier: localCarrier,
    //       })
    //     );
    //   });
    // }
    this.otpService.SendOTP(body.owner_phone_number, otp);
    return localCarrier;
  }
  async findLocalCarrierByPhoneNumber(
    phoneNumber: string
  ): Promise<LocalCarrier> {
    try {
      return this.localCarrierRepository.findOne({
        where: {
          owner_phone_number: phoneNumber,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async login(body: LoginUserDto): Promise<LocalCarrier> {
    try {
      const local_carrier = await this.findLocalCarrierByPhoneNumber(
        body.phone_number
      );
      if (local_carrier) {
        const otp = this.otpService.generateOTP();
        // this.otpService.SendOTP(body.phone_number, otp);
        local_carrier.otp = otp;
        return await this.localCarrierRepository.save(local_carrier);
      }
      throw new UnauthorizedException("Invalid phone number");
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async verifyOtp(body: VerfyOtpDto): Promise<any> {
    try {
      const local_carrier = await this.findLocalCarrierByPhoneNumber(
        body.phone_number
      );
      if (body.otp === local_carrier.otp) {
        if (!local_carrier.email_verified && !local_carrier.phone_verified) {
          local_carrier.email_verified = true;
          // const otp = this.otpService.generateOTP();
          // this.mailService.sendMail(
          //   local_carrier.owner_email,
          //   `<div>
          // <p>Your WeMove-ai OTP is:${otp}</p>
          // </div>`,
          // );
          // local_carrier.otp = otp;
          await this.localCarrierRepository.save(local_carrier);
          return true;
        } else {
          // local_carrier.email_verified = true;
          local_carrier.otp = null;
          await this.localCarrierRepository.save(local_carrier);
          const jwt = this.authService.generateTokenForLocalCarrier({
            id: local_carrier.id,
            phonenumber: local_carrier.owner_phone_number,
            email: local_carrier.owner_email,
          });
          return jwt;
        }
      }
      throw new UnauthorizedException("Invalid code");
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async findOne(id: number): Promise<LocalCarrier> {
    try {
      return this.localCarrierRepository.findOne({ where: { id } });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async update(id: number, body: UpdateLocalCarrierDto): Promise<LocalCarrier> {
    try {
      const local_carrier = await this.findOne(id);
      if (local_carrier) {
        if(body.activation_status===true){
         await this.mailService.sendActivationMailToCarrier(
          local_carrier.owner_email,
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
  
                 <p>Dear ${local_carrier.company_name},</p>
                 
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
        this.localCarrierRepository.merge(local_carrier, body);
        return this.localCarrierRepository.save(local_carrier);
      } else {
        throw new UnauthorizedException("No local carrier Found!!");
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async uploadFiles(files: any, body: any) {
    try {
      // Use s3Service to save the file on S3
      let company_license;
      if (files["company_license"][0]) {
        const company_license_url = await this.s3Service.uploadFile(
          files["company_license"][0], 'local-carrier'+'/a11b22c33'+body.owner_phone_number+'d44e55f66'+'/company-tariff'
        );
        company_license = company_license_url.Location;
      }
      let w9Form;
      if (files["w9_form"][0]) {
        const w9_form_url = await this.s3Service.uploadFile(
          files["w9_form"][0], 'local-carrier/'+'/a11b22c33'+body.owner_phone_number+'d44e55f66'+'/w9-Form'
        );
        w9Form = w9_form_url.Location;
      }
      let driver_license;
      if (files["owner_driver_license"][0]) {
        const owner_driver_license_url = await this.s3Service.uploadFile(
          files["owner_driver_license"][0], 'local-carrier/'+'/a11b22c33'+body.owner_phone_number+'d44e55f66'+'/owner-driver-license'
        );
        driver_license = owner_driver_license_url.Location;
      }
      let insurance_url;
      if (files["insurance_document"][0]) {
        const insurance_document_url = await this.s3Service.uploadFile(
          files["insurance_document"][0], 'local-carrier/'+'/a11b22c33'+body.owner_phone_number+'d44e55f66'+'/insurance-document'
        );
        insurance_url = insurance_document_url.Location;
      }

      const otp = this.otpService.generateOTP();
      const localCarrier = await this.localCarrierRepository
        .save(
          this.localCarrierRepository.create({
            company_name: body.company_name,
            doing_business_as_name:body.doing_business_as_name,
            street_address: body.street_address,
            city: body.city,
            state: body.state,
            zip_code: body.zip_code,
            dot_number: body.dot_number,
            mc_number: body.mc_number,
            owner_phone_number: body.owner_phone_number,
            arbitrationCounty: body.arbitrationCounty,
            arbitrationState: body.arbitrationState,
            owner_email: body.owner_email,
            owner_office_phone: body.owner_office_phone,
            trucks_in_operatiion: body.trucks_in_operatiion,
            years_in_business: body.years_in_business,
            owner_name: body.owner_name,
            otp: otp,
            company_license: company_license,
            owner_driver_license: driver_license,
            w9_form: w9Form,
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
      if (localCarrier) {
        const hash = crypto.createHash("sha256");
        hash.update(localCarrier.id.toString());
        const canonicalID = hash.digest("hex");
        localCarrier.canonical_id = canonicalID;
        await this.localCarrierRepository.save(localCarrier);

        this.mailService.sendRegistrationMailToCarrier(
          localCarrier.owner_email,
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

               <p>Dear ${localCarrier.company_name},</p>
               
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

        if (body.delivery_approximations) {
          const delivery_estimation = await this.deliveryEstimationRepository.save(
            this.deliveryEstimationRepository.create({
              estimation_0_to_500_miles:
                body.delivery_approximations.estimation_0_to_500_miles,
              estimation_501_to_1000_miles:
                body.delivery_approximations.estimation_501_to_1000_miles,
              estimation_1001_to_1500_miles:
                body.delivery_approximations.estimation_1001_to_1500_miles,
              estimation_1501_to_4000_miles:
                body.delivery_approximations.estimation_1501_to_4000_miles,
            })
          );
          localCarrier.delivery_estimation = delivery_estimation;
          await this.localCarrierRepository.save(localCarrier);
        }

        if (body.insurances) {
          body.insurances.map(async (insurance: Insurance) => {
            await this.insuranceRepository.save(
              this.insuranceRepository.create({
                insurance_company: insurance.insurance_company,
                phone_number: insurance.phone_number,
                insurance_document: insurance_url,
                local_carrier: localCarrier,
              })
            );
          });
        }
        if (body.states) {
          body.states.map(async (thisState: CreateStateDto) => {
            const newState = await this.stateRepository.save(
              this.stateRepository.create({
                pickup_service_state: thisState.pickup_service_state,
                point_of_contact_name: thisState.point_of_contact_name,
                point_of_contact_phone_number:
                  thisState.point_of_contact_phone_number,
                local_carrier: localCarrier,
              })
            );
            if (thisState.zip_codes) {
              await Promise.all(
                thisState.zip_codes.map(async (zipCode: CreateZipCodeDto) => {
                  return this.zipCodeRepository.save(
                    this.zipCodeRepository.create({
                      zip_code: zipCode.zip_code,
                      state: newState,
                    })
                  );
                })
              );
            }
          });
        }
        if (localCarrier) {
          dataSourceOptions.mixpanelClient.track("Register Local Carrier", {
            distinct_id: localCarrier.canonical_id,
            local_carrier_id: localCarrier.id,
            local_carrier_name: localCarrier.company_name,
            company_phone: localCarrier.owner_office_phone,
            owner_name: localCarrier.owner_name,
            owner_email: localCarrier.owner_email,
            owner_phone: localCarrier.owner_phone_number,
            carrier_type: localCarrier.carrier_type,
            mp_country_code: "US",
            $city: localCarrier.city,
          });
        }

        // this.otpService.SendOTP(body.owner_phone_number, otp);
        return localCarrier;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async checkIfAccountExists(body: any): Promise<any> {
    const { phoneNumber, email, ownerOfficePhone } = body;
    const localCarrier = await this.localCarrierRepository.createQueryBuilder('localCarrier')
    .where('localCarrier.owner_phone_number = :phoneNumber', { phoneNumber })
    .orWhere('localCarrier.owner_office_phone = :ownerOfficePhone', { ownerOfficePhone })
    .orWhere('localCarrier.owner_email = :email', { email })
    .getOne();
    return !!localCarrier;
  }

  async resendOTPCode(body:any):Promise<any>{
    const {phoneNumber} = body;
    const local_carrier = await this.localCarrierRepository.findOne({
      where:{
        owner_phone_number:phoneNumber
      }
    })
    if(local_carrier){
      const otp  = await this.otpService.generateOTP()
      local_carrier.otp = otp;
      await this.localCarrierRepository.save(local_carrier);
      this.mailService.resendCodeToCarrier(
        local_carrier.owner_email,
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

             <p>Dear ${local_carrier.company_name},</p>
             
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
      // await this.otpService.SendOTP(local_carrier.owner_phone_number, otp);
      return local_carrier;
    }
  }
}
