import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from 'src/common/constants/schemas';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    return user.role === Role.Seller || user.role === Role.Admin;
  }
}
