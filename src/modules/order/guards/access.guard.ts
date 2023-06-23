import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RoleEnum } from 'src/common/constants/schemas';
import { OrderService } from '../order.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private orderService: OrderService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, __order } = request;

    const order = await this.orderService.getOrderById(__order);

    const isBuyerOrAdmin = user.role == RoleEnum.Admin || user.id == order.user;

    if (!isBuyerOrAdmin)
      throw new ForbiddenException('Order does not belong to user');

    return isBuyerOrAdmin;
  }
}
