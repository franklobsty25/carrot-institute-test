import { UseGuards, applyDecorators } from '@nestjs/common';
import { OrderCompleteGuard } from '../guards/order-complete.guard';
import { OrderPutToRequestGuard } from '../guards/order-put-to-request.guard';
import { OrderNotFoundGuard } from '../guards/order-not-found.guard';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

export function OrderCompletionGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(
      JwtAuthGuard,
      OrderPutToRequestGuard,
      OrderNotFoundGuard,
      OrderCompleteGuard,
    ),
  );
}
