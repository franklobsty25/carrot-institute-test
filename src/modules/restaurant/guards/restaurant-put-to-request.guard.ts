import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RESTAURANT } from 'src/common/constants/schemas';
import { Model } from 'mongoose';
import { RestaurantDocument } from '../schema/restaurant.schema';

@Injectable()
export class RestaurantPutToRequestGuard implements CanActivate {
  constructor(
    @InjectModel(RESTAURANT)
    private readonly restaurantModel: Model<RestaurantDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;
    
    const restaurant: RestaurantDocument = await this.restaurantModel.findOne({
      _id: params.restaurantId,
      softDelete: false
      });

    request.__restaurant = restaurant;

    return true;
  }
}
