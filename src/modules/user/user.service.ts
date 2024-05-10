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
import { User } from "./user.entity";
import { RegisterUserDto } from "./dto/register-user.dto";
import { AuthService } from "../auth/auth.service";
import { LoginUserDto } from "../../utils/otp/dto/login-user.dto";
import { VerfyOtpDto } from "../../utils/otp/dto/verify-otp.dto";
import { MailerService } from "src/utils/mailer/mailer.service";
import { OtpService } from "src/utils/otp/otp.service";
import { Address } from "../address/address.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { dataSourceOptions } from "../../../db/data-source";
import { FindDistanceDto } from "./dto/find-distance.dto";
import { CreateAddressDto } from "../address/dto/create-address.dto";
import { MoveRequest } from "../move-request/move-request.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    @InjectRepository(MoveRequest)
    private moveRequestRepository: Repository<MoveRequest>,
    private authService: AuthService,
    private mailService: MailerService,
    private otpService: OtpService
  ) {}
  async create(registerUserDto: RegisterUserDto): Promise<User> {
    let { addresses, ...body } = registerUserDto;

    const otp = this.otpService.generateOTP();
    const user = await this.userRepository
      .save(
        this.userRepository.create({
          first_name: body.first_name,
          last_name: body.last_name,
          email: body.email,
          phone_number: body.phone_number,
          otp: otp,
        })
      )
      .catch((err: any) => {
        throw new HttpException(
          {
            message: `${err}`,
          },
          HttpStatus.CONFLICT
        );
      });

    if (user) {
      if (addresses) {
        addresses.map(async (address: CreateAddressDto) => {
          await this.addressRepository.save(
            this.addressRepository.create({
              city: address.city,
              state: address.state,
              street_address: address.street_address,
              zip_code: address.zip_code,
              user: user,
            })
          );
        });
      }
      // this.otpService.SendOTP(registerUserDto.phone_number, otp);
      return user;
    }
  }
  async findUserByPhoneNumber(phoneNumber: string): Promise<User> {
    try {
      return this.userRepository.findOne({
        where: {
          phone_number: phoneNumber,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async login(body: LoginUserDto): Promise<User> {
    try {
      const user = await this.findUserByPhoneNumber(body.phone_number);
      if (user) {
        if (user.phone_verified && user.email_verified) {
          const otp = this.otpService.generateOTP();
          // this.otpService.SendOTP(body.phone_number, otp);
          user.otp = otp;
        } else if (!user.phone_verified && !user.email_verified) {
          const otp = this.otpService.generateOTP();
          // this.otpService.SendOTP(body.phone_number, otp);
          user.otp = otp;
        } else if (user.phone_verified && !user.email_verified) {
          const otp = this.otpService.generateOTP();
          // this.otpService.SendOTP(body.phone_number, otp);
          user.otp = otp;

          //  this.mailService.sendMail(
          //   user.email,
          //   `<div>
          // <p>Your WeMove-ai OTP is:${user.otp}</p>
          // </div>`,
          // );
        }
        return await this.userRepository.save(user);
      }

      throw new UnauthorizedException("Invalid phone number");
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async verifyOtp(body: VerfyOtpDto): Promise<string> {
    try {
      const user = await this.findUserByPhoneNumber(body.phone_number);

      if (user) {
        if (user.otp === body.otp) {
          const jwt = this.authService.generateTokenForUser({
            id: user.id,
            phone_number: user.phone_number,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
          });
          if (!user.phone_verified && !user.email_verified) {
            user.phone_verified = true;
            user.otp = null;
            await this.userRepository.save(user);
          } else if (user.phone_verified && user.email_verified) {
            user.phone_verified = true;
            user.otp = null;
            await this.userRepository.save(user);
          } else if (user.phone_verified && !user.email_verified) {
            user.email_verified = true;
            user.otp = null;
            await this.userRepository.save(user);
          }
          return jwt;
        }
        throw new UnauthorizedException("Invalid OTP");
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async findOne(id: number): Promise<User> {
    try {
      return this.userRepository.findOne({ where: { id } });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async update(id: number, body: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOne(id);
      if (user) {
        this.userRepository.merge(user, body);
        return this.userRepository.save(user);
      } else {
        throw new UnauthorizedException("No User Found!!");
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async fetchConsumerById(consumerId: number): Promise<User> {
    const consumer = await this.userRepository.findOne({
      where: {
        id: consumerId,
      },
    });
    if (consumer) {
      return consumer;
    }
  }
  async getDistance(body: FindDistanceDto): Promise<any> {

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${body.pickup_address}&key=AIzaSyAk8hBHGztX6M9UX2MdZlRQS3HbdqINzp8`;
    const Newurl = `https://maps.googleapis.com/maps/api/geocode/json?address=${body.delivery_address}&key=AIzaSyAk8hBHGztX6M9UX2MdZlRQS3HbdqINzp8`;
    try{
      const pickup_response = await axios.get(url);
      const pickup_results = pickup_response.data.results;
      console.log(pickup_response.data,'---->')
      const pickup_placeID = pickup_results[0].place_id;
      const pickup_latitude = pickup_results[0].geometry.location.lat;
      const pickup_longitude = pickup_results[0].geometry.location.lng;

      const delivery_response = await axios.get(Newurl);
      const delivery_results = delivery_response.data.results;
      console.log(delivery_response.data,'---->')
      const delivery_placeID = delivery_results[0].place_id;
      const delivery_latitude = delivery_results[0].geometry.location.lat;
      const delivery_longitude = delivery_results[0].geometry.location.lng;


    console.log(pickup_latitude, pickup_longitude, delivery_latitude, delivery_longitude)



    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/distancematrix/json",
      {
        params: {
          destinations: `${delivery_latitude}, ${delivery_longitude}`,
          origins: `${pickup_latitude}, ${pickup_longitude}`,
          units: "imperial",
          key: "AIzaSyAk8hBHGztX6M9UX2MdZlRQS3HbdqINzp8", // Replace 'YOUR_API_KEY' with your actual API key
        },
        headers: {
          Accept: "application/json",
        },
      }
    );


    console.log(response.data.rows[0], "--->>");
    const extractDistance = (inputString: string) => {
      const numericPattern: RegExp = /\d+(\.\d+)?/g;

      // Find all matches of numeric characters in the string
      const numericCharacters: string[] | null = inputString.match(
        numericPattern
      );

      // Check if any numeric characters were found
      if (numericCharacters) {
        // Convert the array of numeric characters to a single string
        const numericString: string = numericCharacters.join("");

        console.log(numericString); // Output: 5.1
        return Number(numericString);
      } else {
        console.log("No numeric characters found.");
      }
    };

    if(response.data?.rows[0]?.elements[0]?.distance?.text!==undefined){

      const distance = extractDistance(response.data.rows[0].elements[0].distance.text);
    console.log('THE FINAL DISTANCE IS ---->>>',distance)
      const move_request = await this.moveRequestRepository.findOne({
        where:{
          id: body.moveRequestId
        }
      })
      console.log(distance,'----->>>DISTANCE--->>')
      move_request.move_distance = Math.ceil(Number(distance));
      await this.moveRequestRepository.save(move_request)
      return distance;
    }else{
      console.log('Distance not found')
      return 0;
    }
    
    }catch (error){
      console.log(error)
    }

    // try {
    //   console.log(body,'----BODY FOR DISTANCE')
    //   const response = await axios.get(
    //     "https://maps.googleapis.com/maps/api/distancematrix/json",
    //     {
    //       params: {
    //         destinations: body.delivery_address,
    //         origins: body.pickup_address,
    //         units: "imperial",
    //         key: "AIzaSyAk8hBHGztX6M9UX2MdZlRQS3HbdqINzp8", // Replace 'YOUR_API_KEY' with your actual API key
    //       },
    //       headers: {
    //         Accept: "application/json",
    //       },
    //     }
    //   );

    //   // Handle the response data
    //   console.log(response.data.rows[0], "--->>");
    //   const extractDistance = (inputString: string) => {
    //     const numericPattern: RegExp = /\d+(\.\d+)?/g;

    //     // Find all matches of numeric characters in the string
    //     const numericCharacters: string[] | null = inputString.match(
    //       numericPattern
    //     );

    //     // Check if any numeric characters were found
    //     if (numericCharacters) {
    //       // Convert the array of numeric characters to a single string
    //       const numericString: string = numericCharacters.join("");

    //       console.log(numericString); // Output: 5.1
    //       return Number(numericString);
    //     } else {
    //       console.log("No numeric characters found.");
    //     }
    //   };
    //  const distance = extractDistance(response.data.rows[0].elements[0].distance.text);
    //   const move_request = await this.moveRequestRepository.findOne({
    //     where:{
    //       id: body.moveRequestId
    //     }
    //   })
    //   console.log(distance,'----->>>DISTANCE--->>')
    //   move_request.move_distance = Number(distance);
    //   await this.moveRequestRepository.save(move_request)
    //   return true;
    // } catch (error) {
    //   // Handle errors
    //   console.log(error, "---->");
    //   console.error("Error fetching distance matrix:", error);
    // }
  }

  async getTestDistance(body: FindDistanceDto): Promise<any> {
    console.log(body,'--->body')
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${body.pickup_address}&key=AIzaSyAk8hBHGztX6M9UX2MdZlRQS3HbdqINzp8`;
    const Newurl = `https://maps.googleapis.com/maps/api/geocode/json?address=${body.delivery_address}&key=AIzaSyAk8hBHGztX6M9UX2MdZlRQS3HbdqINzp8`;
    try{
      const pickup_response = await axios.get(url);
      const pickup_results = pickup_response.data.results;
      console.log(pickup_response.data,'---->')
      const pickup_placeID = pickup_results[0].place_id;
      const pickup_latitude = pickup_results[0].geometry.location.lat;
      const pickup_longitude = pickup_results[0].geometry.location.lng;

      const delivery_response = await axios.get(Newurl);
      const delivery_results = delivery_response.data.results;
      console.log(delivery_response.data,'---->')
      const delivery_placeID = delivery_results[0].place_id;
      const delivery_latitude = delivery_results[0].geometry.location.lat;
      const delivery_longitude = delivery_results[0].geometry.location.lng;


    console.log(pickup_latitude, pickup_longitude, delivery_latitude, delivery_longitude)



    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/distancematrix/json",
      {
        params: {
          destinations: `${delivery_latitude}, ${delivery_longitude}`,
          origins: `${pickup_latitude}, ${pickup_longitude}`,
          units: "imperial",
          key: "AIzaSyAk8hBHGztX6M9UX2MdZlRQS3HbdqINzp8", // Replace 'YOUR_API_KEY' with your actual API key
        },
        headers: {
          Accept: "application/json",
        },
      }
    );


    console.log(response.data.rows[0], "--->>");
    const extractDistance = (inputString: string) => {
      const numericPattern: RegExp = /\d+(\.\d+)?/g;

      // Find all matches of numeric characters in the string
      const numericCharacters: string[] | null = inputString.match(
        numericPattern
      );

      // Check if any numeric characters were found
      if (numericCharacters) {
        // Convert the array of numeric characters to a single string
        const numericString: string = numericCharacters.join("");

        console.log(numericString); // Output: 5.1
        return Number(numericString);
      } else {
        console.log("No numeric characters found.");
      }
    };
    
    if(response.data?.rows[0]?.elements[0]?.distance?.text!==undefined){

      const distance = extractDistance(response.data.rows[0].elements[0]?.distance?.text);
      return distance;
    }else{
      console.log('Distance not found')
return 0;
      // const pickup_parts = body.pickup_address.split(", ");

      // // Extract the relevant parts based on their positions
      // const pickup_zip = pickup_parts.pop(); // Value after the last comma and space
      // const pickup_country = pickup_parts.pop(); // Value after the second last comma and space
      // const pickup_state = pickup_parts.pop(); // Value after the third last comma and space
      // const pickup_city = pickup_parts.pop(); // Value after fourth last comma and space

      // console.log("City:", pickup_city);
      // console.log("State:", pickup_state);
      // console.log("Country:", pickup_country);
      // console.log("Zip:", pickup_zip);


      // const delivery_parts = body.delivery_address.split(", ");
      // // Extract the relevant parts based on their positions
      // const delivery_zip = delivery_parts.pop(); // Value after the last comma and space
      // const delivery_country = delivery_parts.pop(); // Value after the second last comma and space
      // const delivery_state = delivery_parts.pop(); // Value after the third last comma and space
      // const delivery_city = delivery_parts.pop(); // Value after fourth last comma and space

      // console.log("City:", delivery_city);
      // console.log("State:", delivery_state);
      // console.log("Country:", delivery_country);
      // console.log("Zip:", delivery_zip);
      // const p_address = pickup_city+', '+pickup_state
      // const d_address = delivery_city+', '+delivery_state
      // console.log(p_address,'----',d_address)
      // const newResponse = await axios.get(
      //   "https://maps.googleapis.com/maps/api/distancematrix/json",
      //   {
      //     params: {
      //       destinations: `${p_address}`,
      //       origins: `${d_address}`,
      //       units: "imperial",
      //       key: "AIzaSyAk8hBHGztX6M9UX2MdZlRQS3HbdqINzp8", // Replace 'YOUR_API_KEY' with your actual API key
      //     },
      //     headers: {
      //       Accept: "application/json",
      //     },
      //   }
      // );
      // const distance = newResponse.data.rows[0].elements[0]
      // console.log(distance)
      // return distance;
          }
      // const distance = extractDistance(response.data.rows[0].elements[0]?.distance?.text);
    // console.log('THE FINAL DISTANCE IS ---->>>',distance)
    //   const move_request = await this.moveRequestRepository.findOne({
    //     where:{
    //       id: body.moveRequestId
    //     }
    //   })
    //   console.log(distance,'----->>>DISTANCE--->>')
    //   move_request.move_distance = Number(distance);
    //   await this.moveRequestRepository.save(move_request)
    }catch (error){
      console.log(error)
    }

    // try {
    //   console.log(body,'----BODY FOR DISTANCE')
    //   const response = await axios.get(
    //     "https://maps.googleapis.com/maps/api/distancematrix/json",
    //     {
    //       params: {
    //         destinations: body.delivery_address,
    //         origins: body.pickup_address,
    //         units: "imperial",
    //         key: "AIzaSyAk8hBHGztX6M9UX2MdZlRQS3HbdqINzp8", // Replace 'YOUR_API_KEY' with your actual API key
    //       },
    //       headers: {
    //         Accept: "application/json",
    //       },
    //     }
    //   );

    //   // Handle the response data
    //   console.log(response.data.rows[0], "--->>");
    //   const extractDistance = (inputString: string) => {
    //     const numericPattern: RegExp = /\d+(\.\d+)?/g;

    //     // Find all matches of numeric characters in the string
    //     const numericCharacters: string[] | null = inputString.match(
    //       numericPattern
    //     );

    //     // Check if any numeric characters were found
    //     if (numericCharacters) {
    //       // Convert the array of numeric characters to a single string
    //       const numericString: string = numericCharacters.join("");

    //       console.log(numericString); // Output: 5.1
    //       return Number(numericString);
    //     } else {
    //       console.log("No numeric characters found.");
    //     }
    //   };
    //  const distance = extractDistance(response.data.rows[0].elements[0].distance.text);
    //   const move_request = await this.moveRequestRepository.findOne({
    //     where:{
    //       id: body.moveRequestId
    //     }
    //   })
    //   console.log(distance,'----->>>DISTANCE--->>')
    //   move_request.move_distance = Number(distance);
    //   await this.moveRequestRepository.save(move_request)
    //   return true;
    // } catch (error) {
    //   // Handle errors
    //   console.log(error, "---->");
    //   console.error("Error fetching distance matrix:", error);
    // }
  }
}
