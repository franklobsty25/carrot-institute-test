import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { RestaurantDocument } from '../schema/restaurant.schema';
import { RestaurantPutToRequestGuard } from '../guards/restaurant-put-to-request.guard';
import { RestaurantNotFoundGuard } from '../guards/restaurant-not-found.guard';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { AccessGuard } from '../guards/access.guard';
import { RoleGuard } from 'src/modules/auth/guards/role.guard';

export function RestaurantAccessGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(
      JwtAuthGuard,
      RoleGuard,
      RestaurantPutToRequestGuard,
      RestaurantNotFoundGuard,
      AccessGuard,
    ),
  );
}

export function RestaurantParamGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(
      JwtAuthGuard,
      RoleGuard,
      RestaurantPutToRequestGuard,
      RestaurantNotFoundGuard,
    ),
  );
}

export const GetRestaurantFromParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): RestaurantDocument => {
    const request = ctx.switchToHttp().getRequest();
    const { __restaurant } = request;

    return __restaurant;
  },
);
