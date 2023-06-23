import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RESTAURANT } from 'src/common/constants/schemas';
import { Model } from 'mongoose';
import { RestaurantDocument } from '../schema/restaurant.schema';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    @InjectModel(RESTAURANT)
    private readonly restaurantModel: Model<RestaurantDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, params } = request;

    const restaurant: RestaurantDocument = await this.restaurantModel.findById(
      params.restaurantId,
    );

    const isUserRestaurant = user.restaurant == restaurant.id;

    if (!isUserRestaurant)
      throw new ForbiddenException('Restaurant does not belong to user');

    return isUserRestaurant;
  }
}
