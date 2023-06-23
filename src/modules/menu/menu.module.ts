import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuSchema } from './schema/menu.schema';
import { MENU, RESTAURANT } from 'src/common/constants/schemas';
import { RestaurantSchema } from '../restaurant/schema/restaurant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MENU, schema: MenuSchema },
      { name: RESTAURANT, schema: RestaurantSchema },
    ]),
  ],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
