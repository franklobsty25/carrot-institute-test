import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
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

    return user.restaurant == restaurant.id;
  }
}
