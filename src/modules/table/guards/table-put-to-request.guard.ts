import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TABLE } from 'src/common/constants/schemas';
import { Model } from 'mongoose';
import { TableDocument } from '../schema/table.schema';

@Injectable()
export class TablePutToRequestGuard implements CanActivate {
  constructor(
    @InjectModel(TABLE) private readonly tabelModel: Model<TableDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    const table: TableDocument = await this.tabelModel.findOne({
      _id: params.tableId,
      softDelete: false,
    });
    
    request.__table = table;

    return true;
  }
}
