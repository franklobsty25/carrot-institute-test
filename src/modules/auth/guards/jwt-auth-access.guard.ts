import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { STATUS_CODE_RESPONSE } from 'src/common/constants/schemas';

@Injectable()
export class JwtAuthAccessGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(err: Error, user: TUser, info: Error): TUser {
    if (err || !user) {
      throw new UnauthorizedException({
        statusCode: STATUS_CODE_RESPONSE,
        message: 'Unauthorized token',
        error: err ? err.message : info.message,
      });
    }

    return user;
  }
}
