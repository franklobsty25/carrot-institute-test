import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuSchema } from './schema/menu.schema';
import { COMMENT, MENU, RESTAURANT } from 'src/common/constants/schemas';
import { RestaurantSchema } from '../restaurant/schema/restaurant.schema';
import { CommentSchema } from '../comment/schema/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MENU, schema: MenuSchema },
      { name: RESTAURANT, schema: RestaurantSchema },
      { name: COMMENT, schema: CommentSchema },
    ]),
  ],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
