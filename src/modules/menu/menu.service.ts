import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MENU } from 'src/common/constants/schemas';
import { MenuDocument } from './schema/menu.schema';
import { PaginateModel, PaginateResult } from 'mongoose';

@Injectable()
export class MenuService {
    constructor(@InjectModel(MENU) private readonly menuModel: PaginateModel<MenuDocument>) {}

    async fetchAllMenus(): Promise<PaginateResult<MenuDocument>> {
        return await this.menuModel.paginate({softDelete: false});
    }
}
