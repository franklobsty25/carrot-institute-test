import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RoleEnum } from 'src/common/constants/schemas';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    const isSellOrAdmin =
      user.role === RoleEnum.Seller || user.role === RoleEnum.Admin;

    if (!isSellOrAdmin)
      throw new ForbiddenException('User not a seller or administrator');

    return isSellOrAdmin;
  }
}
