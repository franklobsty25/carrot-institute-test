import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TABLE } from 'src/common/constants/schemas';
import { Model } from 'mongoose';
import { TableDocument } from '../schema/table.schema';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    @InjectModel(TABLE) private readonly tabelModel: Model<TableDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, params } = request;

    const table: TableDocument = await this.tabelModel.findOne(params.tableId);

    return user.restaurant == table.restaurant;
  }
}
