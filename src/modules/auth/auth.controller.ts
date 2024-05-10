import {
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth-guards/jwt-auth.guard';
import { Request } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('logout')
  @ApiBearerAuth(process.env.X_ACCESS_TOKEN)
  @UseGuards(JwtAuthGuard)
  async logout(@Req() request: Request) {
    const authorizationHeader = request.headers['authorization'];
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Invalid or missing Authorization header',
      );
    }
    const token = authorizationHeader.split(' ')[1];
    this.authService.revokeToken(token);
    return 'Successfully Logout';
  }
}
