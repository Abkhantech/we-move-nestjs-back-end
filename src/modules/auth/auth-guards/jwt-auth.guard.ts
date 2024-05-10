import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];
    // console.log('authorizationHeader',authorizationHeader);
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Invalid or missing Authorization header',
      );
    }
    const token = authorizationHeader.split(' ')[1];
    // if (this.authService.isTokenRevoked(token)) {
    //   throw new UnauthorizedException('Token has been revoked');
    // }
    return super.canActivate(context);
  }
}
