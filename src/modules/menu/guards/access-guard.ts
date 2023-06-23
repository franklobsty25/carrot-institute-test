import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { MenuDocument } from '../schema/menu.schema';
import { Model } from 'mongoose';
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

    const menu: MenuDocument = await this.menuModel.findById(params.menuId);

    return user.restaurant == menu.restaurant;
  }
}
