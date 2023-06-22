import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PaginateModel, PaginateResult } from 'mongoose';
import { RESTAURANT, TABLE } from 'src/common/constants/schemas';
import { TableDocument } from './schema/table.schema';
import { CreateTableDTO, FilterTableDTO, UpdateTableDTO } from './dto';
import { UserDocument } from '../user/schema/user.schema';
import { RestaurantService } from '../restaurant/restaurant.service';
import { RestaurantDocument } from '../restaurant/schema/restaurant.schema';

@Injectable()
export class TableService {
  constructor(
    @InjectModel(TABLE)
    private readonly tableModel: PaginateModel<TableDocument>,
    @InjectModel(RESTAURANT)
    private readonly restaurantModel: Model<RestaurantDocument>,
  ) {}

  async fetchTables(
    filter?: FilterTableDTO,
  ): Promise<PaginateResult<TableDocument>> {
    const { page = 1, limit = 10, search } = filter;

    const query: FilterQuery<TableDocument> = {
      softDelete: false,
    };

    if (search) {
      query.$or = [
        { name: { $regrex: search, $options: 'i' } },
        { quantity: { $regrex: search, $options: 'i' } },
      ];
    }

    return await this.tableModel.paginate(query, {
      page,
      limit,
      sort: { name: -1 },
    });
  }

  async createTable(
    user: UserDocument,
    createTableDTO: CreateTableDTO,
  ): Promise<TableDocument> {
    const [restaurant, table] = await Promise.all([
      this.restaurantModel.findById(user.restaurant),
      this.tableModel.create(createTableDTO),
    ]);
    
    restaurant.tables.push(table);

    await restaurant.save();

    return table;
  }

  async updateTable(
    tableId: string,
    updateTableDTO: UpdateTableDTO,
  ): Promise<TableDocument> {
    const query: FilterQuery<TableDocument> = {
      _id: tableId,
      softDelete: false,
    };

    return await this.tableModel.findOneAndUpdate(
      query,
      { $set: updateTableDTO },
      {
        new: true,
      },
    );
  }

  async softDeleteTable(tableId: string): Promise<TableDocument> {
    return await this.tableModel.findOneAndUpdate(
      { _id: tableId, softDelete: false },
      { $set: { softDelete: true } },
      { new: true },
    );
  }
}
