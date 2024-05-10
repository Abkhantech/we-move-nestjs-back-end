import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtUserDto } from './dto/jwt-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  private readonly revokedTokens: string[] = [];
  generateTokenForPickupCarrier(payload: any): string {
    try {
      return this.jwtService.sign(payload);
    } catch (e) {
      throw new HttpException(e.message, e.statusCode);
    }
  }

  generateTokenForLocalCarrier(payload: any): string {
    try {
      return this.jwtService.sign(payload);
    } catch (e) {
      throw new HttpException(e.message, e.statusCode);
    }
  }

  generateTokenForDeliveryCarrier(payload: any): string {
    try {
      return this.jwtService.sign(payload);
    } catch (e) {
      throw new HttpException(e.message, e.statusCode);
    }
  }

  generateTokenForUser(payload: JwtUserDto): string {
    try {
      return this.jwtService.sign(payload);
    } catch (e) {
      throw new HttpException(e.message, e.statusCode);
    }
  }

  generateTokenForAdmin(payload: any): string {
    try {
      return this.jwtService.sign(payload);
    } catch (e) {
      throw new HttpException(e.message, e.statusCode);
    }
  }

  generateTokenForDriver(payload: any): string {
    try {
      return this.jwtService.sign(payload);
    } catch (e) {
      throw new HttpException(e.message, e.statusCode);
    }
  }
  revokeToken(token: string): void { 
    this.revokedTokens.push(token);
  }

  isTokenRevoked(token: string): boolean {
    return this.revokedTokens.includes(token);
  }
}
