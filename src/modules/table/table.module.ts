import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RESTAURANT, TABLE } from 'src/common/constants/schemas';
import { TableSchema } from './schema/table.schema';
import { RestaurantSchema } from '../restaurant/schema/restaurant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TABLE, schema: TableSchema },
      { name: RESTAURANT, schema: RestaurantSchema },
    ]),
  ],
  providers: [TableService],
  controllers: [TableController],
  exports: [TableService],
})
export class TableModule {}
