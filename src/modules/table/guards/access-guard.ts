import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
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

    const isUserTable = user.restaurant == table.restaurant;

    if (!isUserTable)
      throw new ForbiddenException('Table does not belong to user');

    return isUserTable;
  }
}
