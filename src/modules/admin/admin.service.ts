import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { MailerService } from 'src/utils/mailer/mailer.service';
import { OtpService } from 'src/utils/otp/otp.service';
import { VerfyOtpDto } from 'src/utils/otp/dto/verify-otp.dto';
import { VerifyPasswordDto } from 'src/utils/otp/dto/verify-password.dto';
import * as bcrypt from 'bcrypt';
import { DeliveryCarrier } from '../delivery-carrier/delivery-carrier.entity';
import { PickupCarrier } from '../pickup-carrier/pickup-carrier.entity';
import { LocalCarrier } from '../local-carrier/local-carrier.entity';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(DeliveryCarrier)
    private deliveryCarrierRepository: Repository<DeliveryCarrier>,
    @InjectRepository(PickupCarrier)
    private pickupCarrierRepository: Repository<PickupCarrier>,
    @InjectRepository(LocalCarrier)
    private localCarrierRepository: Repository<LocalCarrier>,
    private authService: AuthService,
    private mailService: MailerService,
    private otpService: OtpService,
  ) {}
  async register(body: CreateAdminDto): Promise<Admin> {
    const otp = this.otpService.generateOTP();
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const admin = this.adminRepository
      .save(
        this.adminRepository.create({
          otp: otp,
          last_name: body.last_name,
          first_name: body.first_name,
          email: body.email,
          password: hashedPassword,
          phone_number: body.phone_number,
          street_address: body.street_address,
          state: body.state,
          city: body.city,
        }),
      )
      .catch((err: any) => {
        throw new HttpException(
          {
            message: `${err}`,
          },
          HttpStatus.CONFLICT,
        );
      });
    return admin;
  }
  async verifyOtp(body: VerfyOtpDto): Promise<string> {
    try {
      const admin = await this.findAdminByPhoneNumber(body.phone_number);
      if (body.otp === admin.otp) {
        if (!admin.email_verified && !admin.phone_verified) {
          admin.phone_verified = true;
          const otp = this.otpService.generateOTP();
          this.mailService.sendMail(
            admin.email,
            `<div>
        <p>Your WeMove-ai OTP is:${otp}</p>
        </div>`,
          );
          admin.otp = otp;
          await this.adminRepository.save(admin);
          return null;
        } else {
          admin.email_verified = true;
          admin.otp = null;
          await this.adminRepository.save(admin);
          const jwt = this.authService.generateTokenForPickupCarrier({
            id: admin.id,
            phonenumber: body.phone_number,
            email: admin.email,
          });
          return jwt;
        }
      }

      throw new UnauthorizedException('Invalid OTP');
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async login(body: VerifyPasswordDto): Promise<string> {
    try {
      const admin = await this.adminRepository.findOne({
        where: {
          email: body.email,
        },
      });
      if (admin && (await bcrypt.compare(body.password, admin.password))) {
        const jwt = this.authService.generateTokenForPickupCarrier({
          id: admin.id,
          phonenumber: admin.phone_number,
          email: admin.email,
        });
        return jwt;
      }
      throw new UnauthorizedException('Invalid Email or Password');
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async findAdminByPhoneNumber(phoneNumber: string): Promise<Admin> {
    try {
      return this.adminRepository.findOne({
        where: {
          phone_number: phoneNumber,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findAllDeliveryCarriers(): Promise<any> {
    try {
      return await this.deliveryCarrierRepository.find({
        order: {
          id: 'DESC',
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findAllPickupCarriers(): Promise<any> {
    try {
      return await this.pickupCarrierRepository.find({
        order: {
          id: 'DESC',
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findAllLocalCarriers(): Promise<any> {
    try {
      return await this.localCarrierRepository.find({
        order: {
          id: 'DESC',
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
