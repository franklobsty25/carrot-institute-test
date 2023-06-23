import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { MenuDocument } from '../schema/menu.schema';
import { Model, ObjectId } from 'mongoose';
import { MENU } from 'src/common/constants/schemas';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    @InjectModel(MENU) private readonly menuModel: Model<MenuDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, params } = request;

    const menu: MenuDocument = await this.menuModel.findOne({
      _id: params.menuId,
      softDelete: false,
    });

    const isUserMenu = user.restaurant.toString() == menu.restaurant.toString();

    if (!isUserMenu)
      throw new ForbiddenException('Menu does not belong to user');

    return isUserMenu;
  }
}
