import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RoleEnum } from 'src/common/constants/schemas';
import { OrderService } from '../order.service';

@Injectable()
export class OrderCompleteGuard implements CanActivate {
  constructor(private orderService: OrderService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, __order } = request;

    const order = await this.orderService.getOrderById(__order);

    return user.role == RoleEnum.Buyer && user.id == order.user;
  }
}
