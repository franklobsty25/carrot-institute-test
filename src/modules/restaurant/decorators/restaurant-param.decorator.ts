import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { RestaurantDocument } from '../schema/restaurant.schema';
import { RestaurantPutToRequestGuard } from '../guards/restaurant-put-to-request.guard';
import { RestaurantNotFoundGuard } from '../guards/restaurant-not-found.guard';

export function RestaurantParamGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(RestaurantPutToRequestGuard, RestaurantNotFoundGuard),
  );
}

export const GetRestaurantFromParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): RestaurantDocument => {
    const request = ctx.switchToHttp().getRequest();
    const { __restaurant } = request;

    return __restaurant;
  },
);
