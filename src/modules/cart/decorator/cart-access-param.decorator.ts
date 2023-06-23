import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { CartDocument } from '../schema/cart.schema';
import { CartPutToRequestGuard } from '../guards/cart-put-to-request.guard';
import { CartNotFoundGuard } from '../guards/cart-not-found.guard';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { AccessGuard } from '../guards/access-guard';

export function CartAccessGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(
      JwtAuthGuard,
      CartPutToRequestGuard,
      CartNotFoundGuard,
      AccessGuard,
    ),
  );
}

export const GetCartFromParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CartDocument => {
    const request = ctx.switchToHttp().getRequest();
    const { __cart } = request;

    return __cart;
  },
);
