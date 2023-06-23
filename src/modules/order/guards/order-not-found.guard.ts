import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class OrderNotFoundGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { __order } = context.switchToHttp().getRequest();

    if (!__order) throw new NotFoundException('Order does not exist');

    return true;
  }
}
