import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePickupCarrierDto } from './dto/create-pickup-carrier.dto';
import { PickupCarrier } from './pickup-carrier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Insurance } from '../insurance/insurance.entity';
import { CreateStateDto } from '../state/dto/create-state.dto';
import { State } from '../state/entities/state.entity';
import { VerfyOtpDto } from '../../utils/otp/dto/verify-otp.dto';
import { MailerService } from 'src/utils/mailer/mailer.service';
import { AuthService } from '../auth/auth.service';
import { OtpService } from 'src/utils/otp/otp.service';
import { LoginUserDto } from 'src/utils/otp/dto/login-user.dto';
import { Driver } from '../driver/driver.entity';
import { UpdatePickupCarrierDto } from './dto/update-pickup-carrier.dto';
import { DeliveryEstimation } from '../delivery-estimation/delivery-estimation.entity';
import * as crypto from 'crypto';
import { DeliveryCarrier } from '../delivery-carrier/delivery-carrier.entity';
import { S3Service } from 'src/utils/s3/s3.service';
import { dataSourceOptions } from '../../../db/data-source';
import { MoveRequest } from '../move-request/move-request.entity';
@Injectable()
export class PickupCarrierService {
  constructor(
    @InjectRepository(PickupCarrier)
    private pickupCarrierRepository: Repository<PickupCarrier>,
    @InjectRepository(MoveRequest)
    private moveRequestRepository: Repository<MoveRequest>,
    @InjectRepository(Insurance)
    private insuranceRepository: Repository<Insurance>,
    @InjectRepository(State)
    private stateRepository: Repository<State>,
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    @InjectRepository(DeliveryEstimation)
    private deliveryEstimationRepository: Repository<DeliveryEstimation>,
    @InjectRepository(DeliveryCarrier)
    private deliveryCarrierRepository: Repository<DeliveryCarrier>,
    private mailService: MailerService,
    private authService: AuthService,
    private otpService: OtpService,
    private s3Service: S3Service,
  ) {}

  async createPickupCarrier(createPickupCarrierDto: CreatePickupCarrierDto) {
    let { insurances, states, delivery_approximations, ...body } =
      createPickupCarrierDto;
    const otp = this.otpService.generateOTP();
    const pickupCarrier = await this.pickupCarrierRepository
      .save(this.pickupCarrierRepository.create({ ...body, otp: otp }))
      .catch((err) => {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      });

    const hash = crypto.createHash('sha256');
    hash.update(pickupCarrier.id.toString());
    const canonicalID = hash.digest('hex');
    pickupCarrier.canonical_id = canonicalID;
    await this.pickupCarrierRepository.save(pickupCarrier);

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
        }),
      );
      pickupCarrier.delivery_estimation = delivery_estimation;
      await this.pickupCarrierRepository.save(pickupCarrier);
    }

    if (insurances) {
      insurances.map(async (insurance: Insurance) => {
        await this.insuranceRepository.save(
          this.insuranceRepository.create({
            insurance_company: insurance.insurance_company,
            phone_number: insurance.phone_number,
            insurance_document: insurance.insurance_document,
            pickup_carrier: pickupCarrier,
          }),
        );
      });
    }
    // if (states) {
    //   states.map(async (pickup: CreateStateDto) => {
    //     await this.stateRepository.save(
    //       this.stateRepository.create({
    //         pickup_service_state: pickup.pickup_service_states,
    //         pickup_carrier: pickupCarrier,
    //       })
    //     );
    //   });
    // }
    this.otpService.SendOTP(body.owner_phone_number, otp);
    return pickupCarrier;
  }
  async findPickupCarrierByPhoneNumber(
    phoneNumber: string,
  ): Promise<PickupCarrier> {
    try {
      return this.pickupCarrierRepository.findOne({
        where: {
          owner_phone_number: phoneNumber,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async findPickupCarrierById(id: number): Promise<PickupCarrier> {
    try {
      return this.pickupCarrierRepository.findOne({
        where: {
          id: id,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async login(body: LoginUserDto): Promise<PickupCarrier> {
    try {
      const pickup_carrier = await this.findPickupCarrierByPhoneNumber(
        body.phone_number,
      );
      if (pickup_carrier) {
        const otp = this.otpService.generateOTP();
        // this.otpService.SendOTP(body.phone_number, otp);
        pickup_carrier.otp = otp;
        return await this.pickupCarrierRepository.save(pickup_carrier);
      }
      throw new UnauthorizedException('Invalid phone number');
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async verifyOtp(body: VerfyOtpDto): Promise<any> {
    try {
      const pickupCarrier = await this.findPickupCarrierByPhoneNumber(
        body.phone_number,
      );
      if (body.otp === pickupCarrier.otp) {
        if (!pickupCarrier.email_verified && !pickupCarrier.phone_verified) {
          pickupCarrier.email_verified = true;
          const delivery_carrier = await this.deliveryCarrierRepository.findOne(
            {
              where: {
                owner_phone_number: body.phone_number,
              },
            },
          );
          if (delivery_carrier !== null) {
            delivery_carrier.email_verified = true;
            await this.deliveryCarrierRepository.save(delivery_carrier);
          }
          // const otp = this.otpService.generateOTP();
          // this.mailService.sendMail(
          //   pickupCarrier.owner_email,
          //   `<div>
          // <p>Your WeMove-ai OTP is:${otp}</p>
          // </div>`
          // );
          // pickupCarrier.otp = otp;
          await this.pickupCarrierRepository.save(pickupCarrier);
          return true;
        } else {
          // pickupCarrier.email_verified = true;
          pickupCarrier.otp = null;
          await this.pickupCarrierRepository.save(pickupCarrier);
          const jwt = this.authService.generateTokenForPickupCarrier({
            id: pickupCarrier.id,
            phonenumber: pickupCarrier.owner_phone_number,
            email: pickupCarrier.owner_email,
          });
          return jwt;
        }
      }
      throw new UnauthorizedException('Invalid code');
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async findCarrier(id: number): Promise<PickupCarrier> {
    try {
      return this.pickupCarrierRepository.findOne({ where: { id } });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async update(
    id: number,
    body: UpdatePickupCarrierDto,
  ): Promise<PickupCarrier> {
    try {
      const pickup_carrier = await this.findCarrier(id);
      if (pickup_carrier) {
        if(body.activation_status===true){
          await this.mailService.sendActivationMailToCarrier(
            pickup_carrier.owner_email,
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
   
                  <p>Dear ${pickup_carrier.company_name},</p>
                  
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
        this.pickupCarrierRepository.merge(pickup_carrier, body);
        await this.pickupCarrierRepository.save(pickup_carrier);
        return pickup_carrier;
      } else {
        throw new UnauthorizedException('No pickup carrier Found!!');
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
          files["company_license"][0], 'pickup-carrier'+'/a11b22c33'+body.owner_phone_number+'d44e55f66'+'/company-tariff'
        );
        company_license = company_license_url.Location;
      }
      let w9Form;
      if (files["w9_form"][0]) {
        const w9_form_url = await this.s3Service.uploadFile(
          files["w9_form"][0], 'pickup-carrier/'+'/a11b22c33'+body.owner_phone_number+'d44e55f66'+'/w9-Form'
        );
        w9Form = w9_form_url.Location;
      }
      let driver_license;
      if (files["owner_driver_license"][0]) {
        const owner_driver_license_url = await this.s3Service.uploadFile(
          files["owner_driver_license"][0], 'pickup-carrier/'+'/a11b22c33'+body.owner_phone_number+'d44e55f66'+'/owner-driver-license'
        );
        driver_license = owner_driver_license_url.Location;
      }
      let insurance_url;
      if (files["insurance_document"][0]) {
        const insurance_document_url = await this.s3Service.uploadFile(
          files["insurance_document"][0], 'pickup-carrier/'+'/a11b22c33'+body.owner_phone_number+'d44e55f66'+'/insurance-document'
        );
        insurance_url = insurance_document_url.Location;
      }

      const otp = this.otpService.generateOTP();
      const pickupCarrier = await this.pickupCarrierRepository
        .save(
          this.pickupCarrierRepository.create({
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
          }),
        )
        .catch((err) => {
          throw new HttpException(
            {
              message: err.message,
            },
            HttpStatus.BAD_REQUEST,
          );
        });
      if (pickupCarrier) {
        const hash = crypto.createHash('sha256');
        hash.update(pickupCarrier.id.toString());
        const canonicalID = hash.digest('hex');
        pickupCarrier.canonical_id = canonicalID;
        await this.pickupCarrierRepository.save(pickupCarrier);
        this.mailService.sendRegistrationMailToCarrier(
          pickupCarrier.owner_email,
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
 
                 <p>Dear ${pickupCarrier.company_name},</p>
                 
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
           </html>`,
        );
      }
      if (body.delivery_approximations) {
        const delivery_estimation =
          await this.deliveryEstimationRepository.save(
            this.deliveryEstimationRepository.create({
              estimation_0_to_500_miles:
                body.delivery_approximations.estimation_0_to_500_miles,
              estimation_501_to_1000_miles:
                body.delivery_approximations.estimation_501_to_1000_miles,
              estimation_1001_to_1500_miles:
                body.delivery_approximations.estimation_1001_to_1500_miles,
              estimation_1501_to_4000_miles:
                body.delivery_approximations.estimation_1501_to_4000_miles,
            }),
          );
        pickupCarrier.delivery_estimation = delivery_estimation;
        await this.pickupCarrierRepository.save(pickupCarrier);
      }

      if (body.insurances) {
        body.insurances.map(async (insurance: Insurance) => {
          await this.insuranceRepository.save(
            this.insuranceRepository.create({
              insurance_company: insurance.insurance_company,
              phone_number: insurance.phone_number,
              insurance_document: insurance_url,
              pickup_carrier: pickupCarrier,
            }),
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
              pickup_carrier: pickupCarrier,
            }),
          );
        });
      }
      // this.otpService.SendOTP(body.owner_phone_number, otp);
      if (pickupCarrier) {
        dataSourceOptions.mixpanelClient.track('Register Pickup Carrier', {
          distinct_id: pickupCarrier.canonical_id,
          pickup_carrier_id: pickupCarrier.id,
          pickup_carrier_name: pickupCarrier.company_name,
          company_phone: pickupCarrier.owner_office_phone,
          owner_name: pickupCarrier.owner_name,
          owner_email: pickupCarrier.owner_email,
          owner_phone: pickupCarrier.owner_phone_number,
          carrier_type: pickupCarrier.carrier_type,
          mp_country_code: 'US',
          $city: pickupCarrier.city,
        });
      }
      return pickupCarrier;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async checkIfAccountExists(body: any): Promise<any> {
    const { phoneNumber, email, ownerOfficePhone } = body;
    const pickupCarrier = await this.pickupCarrierRepository
      .createQueryBuilder('pickupCarrier')
      .where('pickupCarrier.owner_phone_number = :phoneNumber', { phoneNumber })
      .orWhere('pickupCarrier.owner_office_phone = :ownerOfficePhone', {
        ownerOfficePhone,
      })
      .orWhere('pickupCarrier.owner_email = :email', { email })
      .getOne();
    return !!pickupCarrier;
  }

  async resendOTPCode(body:any):Promise<any>{
    const {phoneNumber} = body;
    const pickup_carrier = await this.pickupCarrierRepository.findOne({
      where:{
        owner_phone_number:phoneNumber
      }
    })
    if(pickup_carrier){
      const otp  = await this.otpService.generateOTP()
      pickup_carrier.otp = otp;
      await this.pickupCarrierRepository.save(pickup_carrier);
      this.mailService.resendCodeToCarrier(
        pickup_carrier.owner_email,
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

             <p>Dear ${pickup_carrier.company_name},</p>
             
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
      // await this.otpService.SendOTP(pickup_carrier.owner_phone_number, otp);
      return pickup_carrier;
    }
  }

  async getAllMoveRequests(id: string): Promise<MoveRequest[]> {
    try {
      const pickup_carrier = await this.pickupCarrierRepository.findOne({
        where: { canonical_id: id },
      });
      return this.moveRequestRepository.find({
        where: {
          pickup_carrier: {
            id: pickup_carrier.id,
          },
        },
        relations: ['user', 'loadRequest'],
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
