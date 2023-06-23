import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RoleEnum } from 'src/common/constants/schemas';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    return user.role === RoleEnum.Seller || user.role === RoleEnum.Admin;
  }
}
