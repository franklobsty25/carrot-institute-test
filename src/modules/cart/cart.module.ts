import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CART, MENU, ORDER } from 'src/common/constants/schemas';
import { CartSchema } from './schema/cart.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { OrderSchema } from '../order/schema/order.schema';
import { MenuSchema } from '../menu/schema/menu.schema';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CART, schema: CartSchema },
      { name: ORDER, schema: OrderSchema },
      { name: MENU, schema: MenuSchema },
    ]),
    ScheduleModule.forRoot(),
    OrderModule,
  ],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
