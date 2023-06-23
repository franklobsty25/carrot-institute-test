import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { OrderService } from '../order.service';
import { OrderDocument } from '../schema/order.schema';

@Injectable()
export class OrderPutToRequestGuard implements CanActivate {
  constructor(private readonly orderService: OrderService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    const order: OrderDocument = await this.orderService.getOrderById(
      params.orderId,
    );

    request.__order = order;

    return true;
  }
}
