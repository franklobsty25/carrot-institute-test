import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PaginateModel, PaginateResult } from 'mongoose';
import { RESTAURANT, USER } from 'src/common/constants/schemas';
import { RestaurantDocument } from './schema/restaurant.schema';
import {
  CreateRestaurantDTO,
  FilterRestaurantDTO,
  UpdateRestaurantDTO,
} from './dto';
import { UserDocument } from '../user/schema/user.schema';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(RESTAURANT)
    private readonly restaurantModel: PaginateModel<RestaurantDocument>,
    @InjectModel(USER) private readonly userMOdel: Model<UserDocument>,
  ) {}

  async fetchRestaurants(
    filter?: FilterRestaurantDTO,
  ): Promise<PaginateResult<RestaurantDocument>> {
    const { page = 1, limit = 10, search } = filter;

    const query: FilterQuery<RestaurantDocument> = {
      softDelete: false,
    };

    if (search) {
      query.$or = [
        { companyName: { $regrex: search, $options: 'i' } },
        { companyEmail: { $regrex: search, $options: 'i' } },
        { phoneNumber: { $regrex: search, $options: 'i' } },
      ];
    }

    return await this.restaurantModel.paginate(query, {
      page,
      limit,
      sort: { companyName: -1 },
      populate: [{ path: 'user' }, { path: 'menus' }, { path: 'tables' }],
    });
  }

  async getSingleResaurant(restaurantId: string) {
    const restaurantDocument = await this.restaurantModel.findOne({
      _id: restaurantId,
      softDelete: false,
    });

    if (!restaurantDocument)
      throw new NotFoundException(
        `Restaurant with ${restaurantId} does not exist`,
      );

    return restaurantDocument;
  }

  async createRestaurant(
    user: UserDocument,
    createRestaurantDTO: CreateRestaurantDTO,
  ): Promise<RestaurantDocument> {
    const [restaurant, queryUser] = await Promise.all([
      this.restaurantModel.create(createRestaurantDTO),
      this.userMOdel.findById(user.id),
    ]);

    queryUser.restaurant = restaurant;

    await queryUser.save();

    return restaurant;
  }

  async updateRestaurant(
    restaurantId: string,
    updateRestaurantDTO: UpdateRestaurantDTO,
  ): Promise<RestaurantDocument> {
    const query: FilterQuery<RestaurantDocument> = {
      _id: restaurantId,
      softDelete: false,
    };

    return await this.restaurantModel.findOneAndUpdate(
      query,
      { $set: updateRestaurantDTO },
      {
        new: true,
      },
    );
  }

  async softDeleteRestaurant(
    restaurantId: string,
  ): Promise<RestaurantDocument> {
    return await this.restaurantModel.findOneAndUpdate(
      { _id: restaurantId, softDelete: false },
      { $set: { softDelete: true } },
      { new: true },
    );
  }
}
