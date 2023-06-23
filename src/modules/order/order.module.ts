import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MENU, ORDER } from 'src/common/constants/schemas';
import { OrderSchema } from './schema/order.schema';
import { MenuSchema } from '../menu/schema/menu.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ORDER, schema: OrderSchema },
      { name: MENU, schema: MenuSchema },
    ]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
