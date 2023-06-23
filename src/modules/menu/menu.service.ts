import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MENU, RESTAURANT } from 'src/common/constants/schemas';
import { MenuDocument } from './schema/menu.schema';
import { FilterQuery, Model, PaginateModel, PaginateResult } from 'mongoose';
import { CreateMenuDTO, FilterMenuDTO, UpdateMenuDTO } from './dto';
import { UserDocument } from '../user/schema/user.schema';
import { RestaurantDocument } from '../restaurant/schema/restaurant.schema';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(MENU) private readonly menuModel: PaginateModel<MenuDocument>,
    @InjectModel(RESTAURANT)
    private readonly restaurantModel: Model<RestaurantDocument>,
  ) {}

  async fetchMenus(
    filter?: FilterMenuDTO,
  ): Promise<PaginateResult<MenuDocument>> {
    const { page = 1, limit = 10, search } = filter;

    const query: FilterQuery<MenuDocument> = {
      softDelete: false,
    };

    if (search) {
      query.$or = [
        { name: { $regrex: search, $options: 'i' } },
        { category: { $regrex: search, $options: 'i' } },
        { ingredients: { $regrex: search, $options: 'i' } },
        { prices: { $regrex: search, $options: 'i' } },
      ];
    }

    return await this.menuModel.paginate(query, {
      page,
      limit,
      sort: { name: -1 },
      populate: [{ path: 'restaurant' }],
    });
  }

  async createMenu(
    user: UserDocument,
    menuDTO: CreateMenuDTO,
  ): Promise<MenuDocument> {
    const [menu, restaurant] = await Promise.all([
      this.menuModel.create({ ...menuDTO, restaurant: user.restaurant }),
      this.restaurantModel.findById(user.restaurant),
    ]);

    restaurant.menus.push(menu);

    await restaurant.save();

    return menu;
  }

  async updateMenu(
    menuId: string,
    updateMenuDTO: UpdateMenuDTO,
  ): Promise<MenuDocument> {
    const query: FilterQuery<MenuDocument> = {
      _id: menuId,
      softDelete: false,
    };

    return await this.menuModel.findOneAndUpdate(
      query,
      { $set: updateMenuDTO },
      {
        new: true,
      },
    );
  }

  async softDeleteMenu(menuId: string): Promise<MenuDocument> {
    return await this.menuModel.findOneAndUpdate(
      { _id: menuId, softDelete: false },
      { $set: { softDelete: true } },
      { new: true },
    );
  }
}
