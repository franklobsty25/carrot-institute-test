import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { OrderPutToRequestGuard } from '../guards/order-put-to-request.guard';
import { OrderNotFoundGuard } from '../guards/order-not-found.guard';
import { OrderDocument } from '../schema/order.schema';
import { AccessGuard } from '../guards/access.guard';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/modules/auth/guards/role.guard';

export function OrderAccessGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(
      JwtAuthGuard,
      OrderPutToRequestGuard,
      OrderNotFoundGuard,
      AccessGuard,
    ),
  );
}

export function OrderDeliveryGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(
      JwtAuthGuard,
      RoleGuard,
      OrderPutToRequestGuard,
      OrderNotFoundGuard,
    ),
  );
}

export const GetOrderFromParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): OrderDocument => {
    const request = ctx.switchToHttp().getRequest();
    const { __order } = request;

    return __order;
  },
);
